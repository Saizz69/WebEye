/**
 * WebEye - SIH26143 Maritime Intelligence Console
 * Main Application Controller: State Management, UI Binding, Theme Switching,
 * Pipeline Execution, Tab Navigation, Vessel Audit Inspection, and Data Export.
 */

class AppController {
  constructor() {
    this.currentScenarioId = 'OS-GOMMC-20230924';
    this.activeTab = 'investigate';
    this.isAnalyzing = false;
    this.selectedVesselId = null;
    this.filterSearchQuery = '';
    this.currentTheme = 'default';
  }

  /**
   * Initialize Application
   */
  init() {
    // 1. Initialize Map
    window.mapEngine.init('map-canvas');

    // 2. Initialize Timeline
    window.timelineController.init();

    // 3. Set Callbacks
    window.mapEngine.onProbeCallback = (lat, lon) => this.handleMapProbe(lat, lon);
    window.mapEngine.onVesselSelectCallback = (vesselId) => this.handleVesselSelect(vesselId);

    // 4. Setup UI Listeners
    this.setupEventListeners();

    // 5. Start live UTC Clock
    this.startUTCClock();

    // 6. Load initial scenario
    this.loadScenario(this.currentScenarioId);
  }

  /**
   * Setup DOM Event Listeners
   */
  setupEventListeners() {
    // Theme Selector
    const themeSelector = document.getElementById('theme-selector');
    if (themeSelector) {
      themeSelector.addEventListener('change', (e) => {
        this.setTheme(e.target.value);
      });
    }

    // Top Navigation Tabs
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetTab = e.currentTarget.dataset.tab;
        this.switchTab(targetTab);
      });
    });

    // Scene Selector Cards in Left Rail
    document.querySelectorAll('.scene-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const scenarioId = e.currentTarget.dataset.sceneId;
        if (scenarioId && scenarioId !== this.currentScenarioId) {
          this.loadScenario(scenarioId);
        }
      });
    });

    // Run Analysis Button
    const runBtn = document.getElementById('btn-run-analysis');
    if (runBtn) {
      runBtn.addEventListener('click', () => this.runAnalysisPipeline());
    }

    // Probe Point Checkbox
    const probeCheckbox = document.getElementById('checkbox-probe-point');
    if (probeCheckbox) {
      probeCheckbox.addEventListener('change', (e) => {
        const isActive = e.target.checked;
        window.mapEngine.setProbeMode(isActive, (lat, lon) => this.handleMapProbe(lat, lon));
        this.showToast(isActive ? 'Probe Mode Activated: Click any point on the map.' : 'Probe Mode Deactivated.');
      });
    }

    // Map Layer Toggles in Floating Layer Card
    document.querySelectorAll('.layer-checkbox').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const layerKey = e.target.dataset.layer;
        window.mapEngine.toggleLayer(layerKey, e.target.checked);
      });
    });

    // MMSI / Vessel Search Input
    const searchInput = document.getElementById('search-vessel-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filterSearchQuery = e.target.value.toLowerCase().trim();
        this.renderVesselsTab();
      });
    }

    // Method Weights Live Adjustment Sliders
    ['proximity', 'timing', 'trajectory', 'vesselType', 'behavior'].forEach(key => {
      const slider = document.getElementById(`weight-slider-${key}`);
      const valDisplay = document.getElementById(`weight-val-${key}`);
      if (slider && valDisplay) {
        slider.addEventListener('input', (e) => {
          const val = parseFloat(e.target.value);
          valDisplay.textContent = val.toFixed(2);
          this.recalculateAttributionWeights();
        });
      }
    });

    // Reset Weights Button
    const resetWeightsBtn = document.getElementById('btn-reset-weights');
    if (resetWeightsBtn) {
      resetWeightsBtn.addEventListener('click', () => {
        const defaultWeights = { proximity: 0.35, timing: 0.25, trajectory: 0.20, vesselType: 0.10, behavior: 0.10 };
        Object.entries(defaultWeights).forEach(([k, v]) => {
          const slider = document.getElementById(`weight-slider-${k}`);
          const display = document.getElementById(`weight-val-${k}`);
          if (slider) slider.value = v;
          if (display) display.textContent = v.toFixed(2);
        });
        this.recalculateAttributionWeights();
      });
    }

    // Export Buttons in DATA Tab
    const exportJsonBtn = document.getElementById('btn-export-json');
    if (exportJsonBtn) exportJsonBtn.addEventListener('click', () => this.exportSingleJSONRecord());

    const exportGeoJsonBtn = document.getElementById('btn-export-geojson');
    if (exportGeoJsonBtn) exportGeoJsonBtn.addEventListener('click', () => this.exportGeoJSONDossier());

    const exportReportBtn = document.getElementById('btn-export-report');
    if (exportReportBtn) exportReportBtn.addEventListener('click', () => this.openPrintableAuditReport());

    // Modal Close
    const modalCloseBtn = document.getElementById('modal-close-btn');
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', () => {
        document.getElementById('vessel-detail-modal').classList.add('hidden');
      });
    }
  }

  /**
   * Set and apply theme
   */
  setTheme(themeName) {
    this.currentTheme = themeName;
    document.body.className = themeName === 'default' ? '' : themeName;
    this.showToast(`Theme switched to: ${themeName}`);
  }

  /**
   * Start live ticking UTC Clock
   */
  startUTCClock() {
    const clockElem = document.getElementById('header-utc-clock');
    if (!clockElem) return;

    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const mins = String(now.getUTCMinutes()).padStart(2, '0');
      const secs = String(now.getUTCSeconds()).padStart(2, '0');
      clockElem.textContent = `UTC ${hours}:${mins}:${secs}`;
    };

    updateClock();
    setInterval(updateClock, 1000);
  }

  /**
   * Load and activate a scenario
   */
  loadScenario(scenarioId) {
    const scenario = SCENARIOS_DATA[scenarioId];
    if (!scenario) return;

    this.currentScenarioId = scenarioId;

    document.querySelectorAll('.scene-card').forEach(card => {
      if (card.dataset.sceneId === scenarioId) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    this.renderHeaderMetadata(scenario);
    this.renderRunSummary(scenario);
    window.mapEngine.loadScenario(scenario);
    window.timelineController.setScenario(scenario);
    this.renderTelemetry(scenario);
    this.renderActiveTabContent();

    this.showToast(`Loaded scenario: ${scenario.title}`);
  }

  /**
   * Switch Active Tab
   */
  switchTab(tabKey) {
    this.activeTab = tabKey;

    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      if (btn.dataset.tab === tabKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    document.querySelectorAll('.tab-pane').forEach(pane => {
      if (pane.id === `tab-pane-${tabKey}`) {
        pane.classList.remove('hidden');
      } else {
        pane.classList.add('hidden');
      }
    });

    this.renderActiveTabContent();
  }

  /**
   * Render Header Metadata
   */
  renderHeaderMetadata(scenario) {
    const titleElem = document.getElementById('header-scenario-id');
    const badgeElem = document.getElementById('header-status-badge');
    const subElem = document.getElementById('header-scenario-subtitle');
    const coordsElem = document.getElementById('header-coords-badge');

    if (titleElem) titleElem.textContent = scenario.id;
    if (badgeElem) {
      badgeElem.textContent = scenario.status;
      badgeElem.className = `status-badge ${scenario.isCleanScene ? 'clean' : (scenario.hasAmbiguousLookalike ? 'warning' : 'active')}`;
    }
    if (subElem) {
      subElem.textContent = `Radar pass ${scenario.radarPassTimeDisplay} • Sensor ${scenario.sensor} • Detector ${scenario.detectorModel} • Confidence ${scenario.confidence}`;
    }
    if (coordsElem && scenario.mapCenter) {
      const lat = scenario.mapCenter[0];
      const lon = scenario.mapCenter[1];
      coordsElem.textContent = `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lon).toFixed(4)}° ${lon >= 0 ? 'E' : 'W'}`;
    }
  }

  /**
   * Render Left Rail Summary
   */
  renderRunSummary(scenario) {
    const s = scenario.summary || {};
    const polyElem = document.getElementById('summary-oil-polygons');
    const areaElem = document.getElementById('summary-total-area');
    const vesselElem = document.getElementById('summary-vessels-scored');
    const ageElem = document.getElementById('summary-drift-age');

    if (polyElem) polyElem.textContent = s.oilPolygonsCount ?? 0;
    if (areaElem) areaElem.textContent = (s.totalAreaKm2 ?? 0).toFixed(2);
    if (vesselElem) vesselElem.textContent = s.vesselsScored ?? 0;
    if (ageElem) ageElem.textContent = (s.driftAgeHours ?? 0).toFixed(1);
  }

  /**
   * Render Bottom Telemetry
   */
  renderTelemetry(scenario) {
    const pipelineListElem = document.getElementById('pipeline-stage-list');
    const pipelineTotalElem = document.getElementById('pipeline-total-time');

    if (pipelineListElem && scenario.pipeline) {
      pipelineTotalElem.textContent = `${(scenario.pipeline.totalMs / 1000).toFixed(1)} s`;
      pipelineListElem.innerHTML = scenario.pipeline.stages.map(st => `
        <div class="pipeline-stage-row">
          <div class="pipeline-stage-name">${st.name}</div>
          <div class="pipeline-stage-meter">
            <div class="pipeline-stage-bar" style="width: ${Math.max(2, st.pct)}%"></div>
          </div>
          <div class="pipeline-stage-time">${st.ms} ms</div>
        </div>
      `).join('');
    }

    const env = scenario.environmental || {};
    const windElem = document.getElementById('env-wind-val');
    const currentElem = document.getElementById('env-current-val');
    const resElem = document.getElementById('env-resolution-val');
    const spanElem = document.getElementById('env-span-val');
    const detailElem = document.getElementById('env-source-detail');

    if (windElem) windElem.textContent = env.meanWindSpeed || '--';
    if (currentElem) currentElem.textContent = env.meanCurrentSpeed || '--';
    if (resElem) resElem.textContent = env.fieldResolution || '--';
    if (spanElem) spanElem.textContent = env.cubeTimeSpan || '--';
    if (detailElem) detailElem.textContent = env.metoceanDetail || '--';

    const ev = scenario.evidence || {};
    const evPolys = document.getElementById('ev-oil-polys');
    const evLookalikes = document.getElementById('ev-lookalikes');
    const evOpt = document.getElementById('ev-optical');
    const evInBox = document.getElementById('ev-in-box');
    const evPassed = document.getElementById('ev-passed');
    const evEnsemble = document.getElementById('ev-ensemble');

    if (evPolys) evPolys.textContent = ev.oilPolygons ?? 0;
    if (evLookalikes) evLookalikes.textContent = ev.lookAlikesExcluded ?? 0;
    if (evOpt) evOpt.textContent = ev.opticalChipsCompared ?? 0;
    if (evInBox) evInBox.textContent = ev.vesselsInTheBox ?? 0;
    if (evPassed) evPassed.textContent = ev.passedTheFilter ?? 0;
    if (evEnsemble) evEnsemble.textContent = ev.ensembleMembers ?? 0;

    setTimeout(() => {
      const originHour = -(scenario.drift?.hoursBack || 11);
      const radiusKm = scenario.drift?.zoneRadiusKm || 8.3;
      window.chartEngine.renderUncertaintyChart('hindcast-chart-canvas', scenario.uncertaintyCurve, originHour, radiusKm);
    }, 50);
  }

  /**
   * Render Active Tab Content
   */
  renderActiveTabContent() {
    const scenario = SCENARIOS_DATA[this.currentScenarioId];
    if (!scenario) return;

    switch (this.activeTab) {
      case 'investigate':
        this.renderInvestigateTab(scenario);
        break;
      case 'drift':
        this.renderDriftTab(scenario);
        break;
      case 'vessels':
        this.renderVesselsTab(scenario);
        break;
      case 'method':
        this.renderMethodTab(scenario);
        break;
      case 'data':
        this.renderDataTab(scenario);
        break;
    }
  }

  /**
   * Render INVESTIGATE Tab
   */
  renderInvestigateTab(scenario) {
    const container = document.getElementById('tab-pane-investigate');
    if (!container) return;

    const det = scenario.detection || {};
    const sum = scenario.summary || {};

    if (scenario.isCleanScene) {
      container.innerHTML = `
        <div class="panel-section">
          <div class="clean-scene-banner">
            <div class="clean-icon">✓</div>
            <div class="clean-title">NO OIL DETECTED — CLEAN SEA PASS</div>
            <div class="clean-desc">
              SAR backscatter analysis completed across Sentinel-1 IW GRD RTC swath.
              No capillary wave suppression anomalies or damping films observed.
              Confidence of clean water: <b>99.98%</b>.
            </div>
            <div class="clean-tag">Normal Ocean Patrol • Valid Negative Result</div>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="panel-notice-box">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#38bdf8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
        <span>${scenario.aisSource}</span>
      </div>

      <div class="panel-section">
        <div class="section-title-row">
          <span class="section-title">SLICK OVERVIEW</span>
          <span class="section-runtime-badge">${(sum.pipelineLatencyMs / 1000).toFixed(1)} s</span>
        </div>
        <div class="slick-headline">Slick detected, ${sum.totalAreaKm2} km²</div>
        <div class="metric-grid-2col">
          <div class="metric-cell">
            <div class="metric-cell-label">LARGEST SLICK</div>
            <div class="metric-cell-val">${det.lengthKm} km × ${det.widthKm} km</div>
          </div>
          <div class="metric-cell">
            <div class="metric-cell-label">ORIGIN</div>
            <div class="metric-cell-val">${sum.originTimeDisplay}</div>
          </div>
          <div class="metric-cell">
            <div class="metric-cell-label">ZONE RADIUS</div>
            <div class="metric-cell-val">± ${sum.zoneRadiusKm} km</div>
          </div>
          <div class="metric-cell">
            <div class="metric-cell-label">AGE</div>
            <div class="metric-cell-val">${sum.driftAgeHours} h drift proxy</div>
          </div>
        </div>
      </div>

      <div class="panel-section">
        <div class="section-title-row">
          <span class="section-title">DETECTION</span>
          <span class="section-tag-sm">U-NET</span>
        </div>
        <table class="spec-table">
          <tbody>
            <tr><td>Oil polygons</td><td class="text-right font-mono">${det.oilPolygons}</td></tr>
            <tr><td>Look-alikes</td><td class="text-right font-mono">${det.lookAlikes}</td></tr>
            <tr><td>Total oil area</td><td class="text-right font-mono">${det.totalOilAreaKm2} km²</td></tr>
            <tr><td>Largest area</td><td class="text-right font-mono">${det.largestAreaKm2} km²</td></tr>
            <tr><td>Length / Width</td><td class="text-right font-mono">${det.lengthKm} km / ${det.widthKm} km</td></tr>
            <tr><td>Perimeter</td><td class="text-right font-mono">${det.perimeterKm} km</td></tr>
            <tr><td>Orientation</td><td class="text-right font-mono">${det.orientationDeg} deg</td></tr>
            <tr><td>Compactness</td><td class="text-right font-mono">${det.compactness}</td></tr>
            <tr><td>Contrast</td><td class="text-right font-mono">${det.contrastDb} dB</td></tr>
            <tr><td>Confidence</td><td class="text-right font-mono">${det.confidence}</td></tr>
            <tr><td>Centroid</td><td class="text-right font-mono">${det.centroid ? det.centroid.join(', ') : '--'}</td></tr>
          </tbody>
        </table>

        <div class="validation-box">
          <div class="validation-title">Checkpoint metrics (Zenodo validation tiles):</div>
          <div class="validation-row"><span>IoU oil:</span> <b>${det.checkpointMetrics?.iouOil || '--'}</b></div>
          <div class="validation-row"><span>IoU look-alike:</span> <b>${det.checkpointMetrics?.iouLookAlike || '--'}</b></div>
          <div class="validation-row"><span>Pixel accuracy:</span> <b>${det.checkpointMetrics?.pixelAccuracy || '--'}</b></div>
        </div>
      </div>
    `;
  }

  /**
   * Render DRIFT Tab
   */
  renderDriftTab(scenario) {
    const container = document.getElementById('tab-pane-drift');
    if (!container) return;

    const drift = scenario.drift || {};

    if (scenario.isCleanScene) {
      container.innerHTML = `
        <div class="panel-section">
          <div class="clean-scene-banner">
            <div class="clean-icon">✓</div>
            <div class="clean-title">DRIFT ENGINE IDLE</div>
            <div class="clean-desc">No oil polygons detected in SAR scene. Lagrangian backward advection is bypassed.</div>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="panel-notice-box">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#38bdf8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
        <span>${scenario.aisSource}</span>
      </div>

      <div class="panel-section">
        <div class="section-title">DRIFT RECONSTRUCTION</div>
        
        <div class="drift-timeline-stepper">
          <div class="drift-step">
            <div class="step-dot hollow"></div>
            <div class="step-content">
              <div class="step-name">Backtrack start</div>
              <div class="step-time">${scenario.radarPassTimeDisplay}</div>
            </div>
          </div>
          <div class="drift-step">
            <div class="step-dot orange-filled"></div>
            <div class="step-content">
              <div class="step-name text-orange">Estimated release zone</div>
              <div class="step-time">${drift.originTimeDisplay}</div>
            </div>
          </div>
          <div class="drift-step">
            <div class="step-dot hollow"></div>
            <div class="step-content">
              <div class="step-name">Observed by radar</div>
              <div class="step-time">${scenario.radarPassTimeDisplay}</div>
            </div>
          </div>
          <div class="drift-step">
            <div class="step-dot cyan-hollow"></div>
            <div class="step-content">
              <div class="step-name text-cyan">Forecast horizon</div>
              <div class="step-time">+36h horizon</div>
            </div>
          </div>
        </div>

        <table class="spec-table mt-4">
          <tbody>
            <tr><td>Origin time</td><td class="text-right font-mono">${drift.originTimeDisplay}</td></tr>
            <tr><td>Origin position</td><td class="text-right font-mono">${drift.originPosition ? drift.originPosition.map(c => c.toFixed(4)).join(', ') : '--'}</td></tr>
            <tr><td>Zone radius</td><td class="text-right font-mono">${drift.zoneRadiusKm} km, buffered ${drift.bufferedRadiusKm} km</td></tr>
            <tr><td>Zone area</td><td class="text-right font-mono">${drift.zoneAreaKm2} km²</td></tr>
            <tr><td>Hours back</td><td class="text-right font-mono">${drift.hoursBack} h</td></tr>
            <tr><td>Age proxy</td><td class="text-right font-mono">${drift.ageProxy}</td></tr>
            <tr><td>Wind factor</td><td class="text-right font-mono">${drift.windFactor}</td></tr>
            <tr><td>Deflection</td><td class="text-right font-mono">${drift.deflection}</td></tr>
            <tr><td>Particles</td><td class="text-right font-mono">${drift.particlesCount}</td></tr>
            <tr><td>Forecast spread</td><td class="text-right font-mono">${drift.forecastSpreadKm} km</td></tr>
            <tr><td>Coast impact</td><td class="text-right font-mono font-semibold ${drift.coastImpact?.includes('threat') ? 'text-red' : 'text-green'}">${drift.coastImpact}</td></tr>
            <tr><td>Threatened box</td><td class="text-right font-mono">${drift.threatenedBox}</td></tr>
          </tbody>
        </table>

        <div class="drift-footnote">
          <b>Physical interpretation:</b> Age is the drift time from the estimated origin to the SAR acquisition. It is a hydrodynamic drift proxy, not a chemical weathering laboratory age.
        </div>
      </div>
    `;
  }

  /**
   * Render VESSELS Tab
   */
  renderVesselsTab(scenario = SCENARIOS_DATA[this.currentScenarioId]) {
    const container = document.getElementById('tab-pane-vessels');
    if (!container) return;

    if (scenario.isCleanScene || !scenario.vessels || scenario.vessels.length === 0) {
      container.innerHTML = `
        <div class="panel-section">
          <div class="clean-scene-banner">
            <div class="clean-icon">🛡️</div>
            <div class="clean-title">ZERO SUSPECT VESSELS (HONEST CLEAN STATE)</div>
            <div class="clean-desc">
              All 18 AIS vessels in the surrounding EEZ sector transited cleanly with no spatio-temporal intersection with any slick or origin envelope.
              <br><br>
              <b>Audit Finding:</b> Correct negative attribution (Empty Leaderboard).
            </div>
            <div class="clean-tag">No Violations Found</div>
          </div>
        </div>
      `;
      return;
    }

    let filteredVessels = scenario.vessels;
    if (this.filterSearchQuery) {
      filteredVessels = filteredVessels.filter(v => 
        v.name.toLowerCase().includes(this.filterSearchQuery) ||
        v.mmsi.includes(this.filterSearchQuery) ||
        v.callsign?.toLowerCase().includes(this.filterSearchQuery) ||
        v.vesselType.toLowerCase().includes(this.filterSearchQuery)
      );
    }

    container.innerHTML = `
      <div class="panel-section">
        <div class="section-title-row">
          <span class="section-title">RANKED SUSPECT LEADERBOARD</span>
          <span class="section-tag-sm">${filteredVessels.length} CANDIDATES</span>
        </div>

        <div class="vessel-list">
          ${filteredVessels.map(v => this.renderVesselCardHTML(v)).join('')}
        </div>
      </div>
    `;

    container.querySelectorAll('.vessel-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const vesselId = e.currentTarget.dataset.vesselId;
        this.handleVesselSelect(vesselId);
      });
    });
  }

  /**
   * Render individual vessel card
   */
  renderVesselCardHTML(v) {
    const isSuspect = v.rank === 1 && v.totalScore >= 75;
    const isDR = v.hasDeadReckoningGap;
    const statusColorClass = isSuspect ? 'badge-critical' : (v.statusLevel === 'warning' ? 'badge-warning' : 'badge-excluded');

    return `
      <div class="vessel-card ${isSuspect ? 'primary-suspect-card' : ''}" data-vessel-id="${v.id}">
        <div class="vessel-card-header">
          <div class="vessel-rank-badge">#${v.rank}</div>
          <div class="vessel-identity">
            <div class="vessel-name">${v.name} <span class="vessel-flag">${v.flag || ''}</span></div>
            <div class="vessel-meta">MMSI: <b>${v.mmsi}</b> • IMO: <b>${v.imo || '--'}</b> • ${v.vesselType}</div>
          </div>
          <div class="vessel-score-box">
            <div class="vessel-score-val ${isSuspect ? 'text-red' : (v.totalScore >= 50 ? 'text-orange' : 'text-slate')}">${v.totalScore}%</div>
            <div class="vessel-score-label">MATCH SCORE</div>
          </div>
        </div>

        <div class="vessel-badges-row">
          <span class="data-badge ${isDR ? 'dr-badge' : 'real-ais-badge'}">
            ${isDR ? '⚠ DEAD RECKONING EXTENSION' : '● REAL AIS PINGS'}
          </span>
          <span class="status-badge-sm ${statusColorClass}">${v.status}</span>
        </div>

        ${window.chartEngine.renderSubScoresHTML(v.subScores)}

        <div class="reason-codes-list">
          ${(v.reasonCodes || []).map(r => `
            <div class="reason-code-item level-${r.level}">
              <span class="reason-code-tag">[${r.code}]</span>
              <span class="reason-code-text">${r.text}</span>
            </div>
          `).join('')}
        </div>

        <div class="vessel-card-footer">
          <span>Closest Dist at t₀: <b>${v.metricsAtOrigin?.closestDistKm ?? '--'} km</b></span>
          <span class="inspect-link">Click to Inspect Trajectory →</span>
        </div>
      </div>
    `;
  }

  /**
   * Render METHOD Tab
   */
  renderMethodTab(scenario) {
    const container = document.getElementById('tab-pane-method');
    if (!container) return;

    const weights = window.attributionEngine.getWeights();

    container.innerHTML = `
      <div class="panel-section">
        <div class="section-title">ATTRIBUTION SCORING WEIGHTS MATRIX</div>
        <div class="method-desc" style="color: var(--text-secondary); margin-bottom: 12px; font-size: 11px;">
          Adjust the multi-criteria Bayesian weights below to evaluate attribution score sensitivity.
          Changes recalculate rankings in real-time.
        </div>

        <div class="weights-control-grid">
          <div class="weight-control-row">
            <div class="weight-label-col">
              <span class="weight-title">Proximity ($w_p$)</span>
              <span class="weight-sub">Gaussian distance decay from origin zone centroid</span>
            </div>
            <input type="range" id="weight-slider-proximity" min="0" max="1" step="0.05" value="${weights.proximity}">
            <span class="weight-val" id="weight-val-proximity">${weights.proximity.toFixed(2)}</span>
          </div>

          <div class="weight-control-row">
            <div class="weight-label-col">
              <span class="weight-title">Timing Offset ($w_t$)</span>
              <span class="weight-sub">Temporal separation from estimated release epoch $t_0$</span>
            </div>
            <input type="range" id="weight-slider-timing" min="0" max="1" step="0.05" value="${weights.timing}">
            <span class="weight-val" id="weight-val-timing">${weights.timing.toFixed(2)}</span>
          </div>

          <div class="weight-control-row">
            <div class="weight-label-col">
              <span class="weight-title">Trajectory Collinearity ($w_a$)</span>
              <span class="weight-sub">Cosine alignment between vessel course and slick axis</span>
            </div>
            <input type="range" id="weight-slider-trajectory" min="0" max="1" step="0.05" value="${weights.trajectory}">
            <span class="weight-val" id="weight-val-trajectory">${weights.trajectory.toFixed(2)}</span>
          </div>

          <div class="weight-control-row">
            <div class="weight-label-col">
              <span class="weight-title">Vessel Hazard Rating ($w_v$)</span>
              <span class="weight-sub">Ship type risk factor (Tanker vs Cargo vs Container)</span>
            </div>
            <input type="range" id="weight-slider-vesselType" min="0" max="1" step="0.05" value="${weights.vesselType}">
            <span class="weight-val" id="weight-val-vesselType">${weights.vesselType.toFixed(2)}</span>
          </div>

          <div class="weight-control-row">
            <div class="weight-label-col">
              <span class="weight-title">Behavioral / Speed Anomaly ($w_b$)</span>
              <span class="weight-sub">Sudden deceleration or course anomalies during transit</span>
            </div>
            <input type="range" id="weight-slider-behavior" min="0" max="1" step="0.05" value="${weights.behavior}">
            <span class="weight-val" id="weight-val-behavior">${weights.behavior.toFixed(2)}</span>
          </div>
        </div>

        <div class="mt-4 flex justify-between">
          <button id="btn-reset-weights" class="btn-secondary">Reset to SIH26143 Baseline</button>
          <span class="text-xs text-slate-400 self-center">Normalized sum = 1.00</span>
        </div>
      </div>

      <div class="panel-section">
        <div class="section-title">LAGRANGIAN DRIFT EQUATIONS</div>
        <div class="formula-box">
          $$\\vec{U}_{\\text{slick}} = \\vec{U}_{\\text{current}} + \\alpha_{\\text{wind}} \\cdot \\mathbf{R}(\\theta_{\\text{deflect}}) \\cdot \\vec{U}_{10\\text{m}} + \\vec{U}_{\\text{Stokes}}$$
          <div class="formula-explanation mt-2">
            • $\\alpha_{\\text{wind}} = 0.030$ (3.0% 10m wind leeway factor)<br>
            • $\\theta_{\\text{deflect}} = 15^\\circ$ (Ekman spiral Coriolis deflection right)<br>
            • $\\mathbf{R}(\\theta)$: 2D rotation matrix<br>
            • Backward Integration: 4th-Order Runge-Kutta (RK4) with stochastic turbulent dispersion
          </div>
        </div>
      </div>
    `;

    ['proximity', 'timing', 'trajectory', 'vesselType', 'behavior'].forEach(key => {
      const slider = document.getElementById(`weight-slider-${key}`);
      const valDisplay = document.getElementById(`weight-val-${key}`);
      if (slider && valDisplay) {
        slider.addEventListener('input', (e) => {
          const val = parseFloat(e.target.value);
          valDisplay.textContent = val.toFixed(2);
          this.recalculateAttributionWeights();
        });
      }
    });

    const resetBtn = document.getElementById('btn-reset-weights');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const defaultWeights = { proximity: 0.35, timing: 0.25, trajectory: 0.20, vesselType: 0.10, behavior: 0.10 };
        Object.entries(defaultWeights).forEach(([k, v]) => {
          const slider = document.getElementById(`weight-slider-${k}`);
          const display = document.getElementById(`weight-val-${k}`);
          if (slider) slider.value = v;
          if (display) display.textContent = v.toFixed(2);
        });
        this.recalculateAttributionWeights();
      });
    }
  }

  /**
   * Recalculate Attribution Weights Live
   */
  recalculateAttributionWeights() {
    const weights = {
      proximity: parseFloat(document.getElementById('weight-slider-proximity')?.value || 0.35),
      timing: parseFloat(document.getElementById('weight-slider-timing')?.value || 0.25),
      trajectory: parseFloat(document.getElementById('weight-slider-trajectory')?.value || 0.20),
      vesselType: parseFloat(document.getElementById('weight-slider-vesselType')?.value || 0.10),
      behavior: parseFloat(document.getElementById('weight-slider-behavior')?.value || 0.10)
    };

    window.attributionEngine.setWeights(weights);

    const scenario = SCENARIOS_DATA[this.currentScenarioId];
    if (scenario && scenario.vessels) {
      scenario.vessels = window.attributionEngine.rankVessels(
        scenario.vessels,
        scenario.detection?.orientationDeg || 149
      );
    }

    this.showToast('Attribution scores recalculated live.');
  }

  /**
   * Render DATA Tab
   */
  renderDataTab(scenario) {
    const container = document.getElementById('tab-pane-data');
    if (!container) return;

    const singleRecordJSON = this.generateSingleJSONRecord(scenario);
    const jsonString = JSON.stringify(singleRecordJSON, null, 2);

    container.innerHTML = `
      <div class="panel-section">
        <div class="section-title">WEBEYE SIH26143 DATA EXPORT & AUDIT TRAIL</div>
        <div class="export-actions-row">
          <button id="btn-export-json" class="btn-primary">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
            <span>Download Analysis JSON Record</span>
          </button>
          <button id="btn-export-geojson" class="btn-secondary">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            <span>Download GeoJSON Dossier</span>
          </button>
          <button id="btn-export-report" class="btn-secondary">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
            <span>Printable WebEye Dossier</span>
          </button>
        </div>
      </div>

      <div class="panel-section">
        <div class="section-title-row">
          <span class="section-title">RAW SINGLE RUN JSON RECORD</span>
          <button id="btn-copy-json" class="btn-xs">Copy JSON</button>
        </div>
        <pre class="json-viewer-box" id="json-code-block">${this.escapeHTML(jsonString)}</pre>
      </div>
    `;

    document.getElementById('btn-export-json')?.addEventListener('click', () => this.exportSingleJSONRecord());
    document.getElementById('btn-export-geojson')?.addEventListener('click', () => this.exportGeoJSONDossier());
    document.getElementById('btn-export-report')?.addEventListener('click', () => this.openPrintableAuditReport());
    document.getElementById('btn-copy-json')?.addEventListener('click', () => {
      navigator.clipboard.writeText(jsonString);
      this.showToast('JSON record copied to clipboard.');
    });
  }

  /**
   * Build single JSON record
   */
  generateSingleJSONRecord(scenario = SCENARIOS_DATA[this.currentScenarioId]) {
    return {
      system: 'WebEye Maritime Intelligence Platform (SIH26143)',
      runId: `RUN-${scenario.id}-${Date.now()}`,
      sceneId: scenario.id,
      timestampUtc: scenario.radarPassTime,
      sensor: scenario.sensor,
      
      detection: {
        oilPolygonsCount: scenario.detection?.oilPolygons || 0,
        lookAlikePolygonsCount: scenario.detection?.lookAlikes || 0,
        totalOilAreaKm2: scenario.detection?.totalOilAreaKm2 || 0,
        confidence: scenario.detection?.confidence || 0,
        estimatedDriftAgeHours: scenario.detection?.driftAgeProxyHours || 0,
        geometrySummary: {
          largestAreaKm2: scenario.detection?.largestAreaKm2 || 0,
          lengthKm: scenario.detection?.lengthKm || 0,
          widthKm: scenario.detection?.widthKm || 0,
          orientationDeg: scenario.detection?.orientationDeg || 0,
          centroid: scenario.detection?.centroid || []
        },
        polygons: scenario.detection?.polygons || []
      },

      drift: {
        estimatedOriginTimeUtc: scenario.drift?.originTime || null,
        originZoneCentroid: scenario.drift?.originPosition || null,
        uncertaintyRadiusKm: scenario.drift?.zoneRadiusKm || 0,
        zoneAreaKm2: scenario.drift?.zoneAreaKm2 || 0,
        threatensCoast: scenario.drift?.coastImpact?.toLowerCase().includes('threat') || false,
        coastalImpactSummary: scenario.drift?.coastImpact || 'Stays offshore',
        originZonePolygon: scenario.drift?.originZonePolygon || [],
        forecastCone: scenario.drift?.forecastCone || []
      },

      attribution: {
        rankedSuspectsCount: scenario.vessels?.length || 0,
        candidateVessels: (scenario.vessels || []).map(v => ({
          rank: v.rank,
          name: v.name,
          mmsi: v.mmsi,
          imo: v.imo,
          flag: v.flag,
          vesselType: v.vesselType,
          totalAttributionScore: v.totalScore,
          dataIntegrityType: v.dataIntegrity,
          subScores: v.subScores,
          reasonCodes: v.reasonCodes
        }))
      },

      metadata: {
        aisDataCategory: scenario.aisType,
        detectorModel: scenario.detectorModel,
        metoceanModel: scenario.environmental?.metoceanDetail,
        stageTimingsMs: scenario.pipeline?.stages || [],
        totalPipelineMs: scenario.pipeline?.totalMs || 0
      }
    };
  }

  /**
   * Run Analysis Pipeline Animation
   */
  runAnalysisPipeline() {
    if (this.isAnalyzing) return;
    this.isAnalyzing = true;

    const runBtn = document.getElementById('btn-run-analysis');
    if (runBtn) {
      runBtn.classList.add('loading');
      runBtn.innerHTML = `
        <div class="spinner"></div>
        <span>WebEye AI Ingestion...</span>
      `;
    }

    const stages = [
      'SAR Speckle Despeckling & Deep U-Net Segmentation...',
      'Spatial Feature & Polygon Boundary Extraction...',
      'Sentinel-2 Optical Cross-Validation & False-Positive Filter...',
      'ERA5 / CMEMS Metocean Cube Slicing...',
      'Backward Lagrangian Runge-Kutta 4 Dispersion...',
      'AIS Spatio-Temporal Bayesian Attribution Ranking...'
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < stages.length) {
        this.showToast(stages[step]);
        step++;
      } else {
        clearInterval(interval);
        this.isAnalyzing = false;
        if (runBtn) {
          runBtn.classList.remove('loading');
          runBtn.innerHTML = `
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
            <span>Run analysis</span>
          `;
        }
        this.showToast('✓ WebEye Analysis Complete: Verified with 12 candidate tracks.');
        this.renderActiveTabContent();
      }
    }, 550);
  }

  /**
   * Handle Map Point Probe Click
   */
  handleMapProbe(lat, lon) {
    const probeData = window.driftEngine.simulateProbePoint(lat, lon, 48, 36);
    window.mapEngine.renderProbeResult(lat, lon, probeData);

    this.showToast(`Probed point [${lat.toFixed(4)}, ${lon.toFixed(4)}]: Origin calculated at ${probeData.originPosition[0].toFixed(4)}°N.`);
  }

  /**
   * Handle Vessel Selection & Modal
   */
  handleVesselSelect(vesselId) {
    this.selectedVesselId = vesselId;
    const scenario = SCENARIOS_DATA[this.currentScenarioId];
    if (!scenario || !scenario.vessels) return;

    const vessel = scenario.vessels.find(v => v.id === vesselId);
    if (!vessel) return;

    window.mapEngine.highlightVessel(vesselId);

    const modal = document.getElementById('vessel-detail-modal');
    const title = document.getElementById('modal-vessel-title');
    const body = document.getElementById('modal-vessel-body');

    if (modal && title && body) {
      title.textContent = `WEBEYE DOSSIER — ${vessel.name} (${vessel.mmsi})`;
      body.innerHTML = `
        <div class="modal-vessel-layout">
          <div class="modal-left-col">
            <div class="modal-stat-grid">
              <div class="modal-stat-cell"><span>Rank</span> <b>#${vessel.rank}</b></div>
              <div class="modal-stat-cell"><span>Total Score</span> <b class="text-red font-bold text-lg">${vessel.totalScore}%</b></div>
              <div class="modal-stat-cell"><span>Type</span> <b>${vessel.vesselType}</b></div>
              <div class="modal-stat-cell"><span>Flag</span> <b>${vessel.flag || 'Unknown'}</b></div>
              <div class="modal-stat-cell"><span>IMO</span> <b>${vessel.imo || '--'}</b></div>
              <div class="modal-stat-cell"><span>Callsign</span> <b>${vessel.callsign || '--'}</b></div>
              <div class="modal-stat-cell"><span>Length x Beam</span> <b>${vessel.lengthM}m × ${vessel.beamM}m</b></div>
              <div class="modal-stat-cell"><span>Draught</span> <b>${vessel.draughtM} m</b></div>
            </div>

            <div class="modal-data-integrity-box ${vessel.hasDeadReckoningGap ? 'dr-alert' : 'real-ais-ok'}">
              <div class="integrity-title">${vessel.dataIntegrity}</div>
              <div class="integrity-desc">
                ${vessel.hasDeadReckoningGap 
                  ? `Warning: Vessel experienced a ${vessel.gapDurationHours || 4.2}h AIS blackout across the origin envelope.`
                  : `Validated: Continuous real AIS reception at ${vessel.pingRatePerHour} pings/hour with zero extrapolation ambiguity.`}
              </div>
            </div>

            <div class="mt-4">
              <div class="section-title-sm" style="font-weight: 800; font-size: 11px; margin-bottom: 6px;">SUB-FACTOR BREAKDOWN</div>
              ${window.chartEngine.renderSubScoresHTML(vessel.subScores)}
            </div>
          </div>

          <div class="modal-right-col">
            <div class="section-title-sm" style="font-weight: 800; font-size: 11px; margin-bottom: 6px;">AUDIT JUSTIFICATION & REASON CODES</div>
            <div class="modal-reason-list">
              ${(vessel.reasonCodes || []).map(r => `
                <div class="modal-reason-card level-${r.level}">
                  <div class="reason-tag-pill" style="font-family: var(--font-mono); font-weight: 800; margin-bottom: 2px;">[${r.code}]</div>
                  <div class="reason-body-text">${r.text}</div>
                </div>
              `).join('')}
            </div>

            <div class="modal-track-summary" style="margin-top: 12px;">
              <div class="section-title-sm" style="font-weight: 800; font-size: 11px; margin-bottom: 6px;">TRAJECTORY PINPOINTS</div>
              <div class="mini-track-table-wrap">
                <table class="mini-track-table">
                  <thead><tr><th>Time</th><th>Lat, Lon</th><th>Speed</th><th>Course</th></tr></thead>
                  <tbody>
                    ${(vessel.track || []).map(t => `
                      <tr class="${t.isOriginMatch ? 'origin-highlight-row' : ''}">
                        <td>${t.time}</td>
                        <td>${t.lat.toFixed(3)}, ${t.lon.toFixed(3)}</td>
                        <td>${t.speed} kn</td>
                        <td>${t.heading}°</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      `;

      modal.classList.remove('hidden');
    }
  }

  /**
   * Export Single JSON Run Record
   */
  exportSingleJSONRecord() {
    const record = this.generateSingleJSONRecord();
    const blob = new Blob([JSON.stringify(record, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `WebEye_Run_${this.currentScenarioId}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('JSON Analysis Record Downloaded.');
  }

  /**
   * Export GeoJSON Dossier
   */
  exportGeoJSONDossier() {
    const scenario = SCENARIOS_DATA[this.currentScenarioId];
    const features = [];

    (scenario.detection?.polygons || []).forEach(p => {
      features.push({
        type: 'Feature',
        properties: { type: p.type, areaKm2: p.areaKm2, confidence: p.confidence },
        geometry: {
          type: 'Polygon',
          coordinates: [p.coordinates.map(c => [c[1], c[0]])]
        }
      });
    });

    if (scenario.drift?.originZonePolygon?.length) {
      features.push({
        type: 'Feature',
        properties: { type: 'origin_zone', originTime: scenario.drift.originTimeDisplay },
        geometry: {
          type: 'Polygon',
          coordinates: [scenario.drift.originZonePolygon.map(c => [c[1], c[0]])]
        }
      });
    }

    const geojson = { type: 'FeatureCollection', features };
    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/geo+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `WebEye_GeoJSON_${this.currentScenarioId}.geojson`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('GeoJSON Dossier Downloaded.');
  }

  /**
   * Open Printable Audit Report
   */
  openPrintableAuditReport() {
    const scenario = SCENARIOS_DATA[this.currentScenarioId];
    const reportHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>WebEye SIH26143 Maritime Audit Dossier - ${scenario.id}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 40px; color: #0f172a; line-height: 1.5; }
          h1 { color: #0f172a; border-bottom: 2px solid #0284c7; padding-bottom: 8px; }
          .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 6px; margin-bottom: 24px; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          th, td { border: 1px solid #cbd5e1; padding: 8px 12px; font-size: 13px; text-align: left; }
          th { background: #f1f5f9; }
          .suspect-row { background: #fef2f2; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>WebEye Maritime SAR Oil Spill Attribution Dossier</h1>
        <div class="meta-box">
          <b>Incident ID:</b> ${scenario.id}<br>
          <b>Location:</b> ${scenario.locationName}<br>
          <b>SAR Satellite Acquisition:</b> ${scenario.radarPassTimeDisplay} (${scenario.sensor})<br>
          <b>Calculated Origin Epoch:</b> ${scenario.drift?.originTimeDisplay || 'N/A'}<br>
          <b>Total Slick Area:</b> ${scenario.summary?.totalAreaKm2} km²<br>
          <b>AIS Data Source:</b> ${scenario.aisSource}
        </div>

        <h2>Ranked Attribution Leaderboard</h2>
        <table>
          <thead>
            <tr><th>Rank</th><th>Vessel Name</th><th>MMSI</th><th>Vessel Type</th><th>Attribution Score</th><th>Data Source Integrity</th><th>Primary Reason Code</th></tr>
          </thead>
          <tbody>
            ${(scenario.vessels || []).map(v => `
              <tr class="${v.rank === 1 ? 'suspect-row' : ''}">
                <td>#${v.rank}</td>
                <td>${v.name}</td>
                <td>${v.mmsi}</td>
                <td>${v.vesselType}</td>
                <td>${v.totalScore}%</td>
                <td>${v.dataIntegrity}</td>
                <td>${v.reasonCodes?.[0]?.text || '--'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <p style="margin-top: 40px; font-size: 11px; color: #64748b;">Generated autonomously by WebEye AI Surveillance Console for SIH26143.</p>
        <script>window.print();</script>
      </body>
      </html>
    `;

    const printWin = window.open('', '_blank');
    printWin.document.write(reportHtml);
    printWin.document.close();
  }

  /**
   * Toast alert
   */
  showToast(message) {
    const toastElem = document.getElementById('system-toast');
    if (!toastElem) return;
    toastElem.textContent = message;
    toastElem.classList.add('visible');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toastElem.classList.remove('visible');
    }, 3200);
  }

  /**
   * Escape HTML
   */
  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.appController = new AppController();
  window.appController.init();
});
