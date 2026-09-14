/**
 * WebEye - SIH26143 Advanced Maritime Intelligence Console
 * Map Engine: Tactical Leaflet Map Controller, Sentinel-1 SAR Chip Texture,
 * Lagrangian Drift Trajectories, Fleet Tracking, and Background Vessel AIS Pings.
 */

class MapEngine {
  constructor() {
    this.map = null;
    this.currentScenario = null;
    this.activeLayers = {
      optical: false,
      sarImage: true,
      classMask: false,
      oilPolygons: true,
      lookAlikes: true,
      backtrack: true,
      hindcastCone: true,
      releaseZone: true,
      forecastTrack: true,
      forecastCone: true,
      aisTracks: true,
      vesselMarks: true,
      backgroundTraffic: true
    };

    this.layerGroups = {
      sarOverlay: null,
      opticalOverlay: null,
      classMaskOverlay: null,
      oilPolygons: null,
      lookAlikes: null,
      backtrack: null,
      hindcastCone: null,
      releaseZone: null,
      forecastTrack: null,
      forecastCone: null,
      aisTracks: null,
      vesselMarks: null,
      backgroundTraffic: null,
      probeGroup: null
    };

    this.vesselMarkers = new Map();
    this.backgroundMarkers = [];
    this.isProbeMode = false;
    this.onProbeCallback = null;
    this.onVesselSelectCallback = null;
  }

  /**
   * Initialize Leaflet map instance
   */
  init(containerId = 'map-canvas') {
    if (this.map) return;

    this.map = L.map(containerId, {
      center: [28.9384, -88.9335],
      zoom: 10,
      zoomControl: false,
      attributionControl: false
    });

    L.control.zoom({ position: 'topright' }).addTo(this.map);

    this.setupBasemap();

    Object.keys(this.layerGroups).forEach(key => {
      this.layerGroups[key] = L.layerGroup().addTo(this.map);
    });

    this.map.on('mousemove', (e) => {
      const latElem = document.getElementById('cursor-lat');
      const lonElem = document.getElementById('cursor-lon');
      if (latElem && lonElem) {
        const lat = e.latlng.lat;
        const lon = e.latlng.lng;
        latElem.textContent = `lat ${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? 'N' : 'S'}`;
        lonElem.textContent = `lon ${Math.abs(lon).toFixed(4)}° ${lon >= 0 ? 'E' : 'W'}`;
      }
    });

    this.map.on('click', (e) => {
      if (this.isProbeMode && this.onProbeCallback) {
        this.onProbeCallback(e.latlng.lat, e.latlng.lng);
      }
    });
  }

  /**
   * Setup Dark Ocean Basemap
   */
  setupBasemap() {
    const darkTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      subdomains: 'abcd',
      errorTileUrl: ''
    });
    darkTileLayer.addTo(this.map);
  }

  /**
   * Set Probe Point Mode active or inactive
   */
  setProbeMode(isActive, callback) {
    this.isProbeMode = isActive;
    this.onProbeCallback = callback;
    const container = this.map.getContainer();
    if (isActive) {
      container.classList.add('cursor-crosshair');
    } else {
      container.classList.remove('cursor-crosshair');
      if (this.layerGroups.probeGroup) {
        this.layerGroups.probeGroup.clearLayers();
      }
    }
  }

  /**
   * Load and render a scenario
   */
  loadScenario(scenario) {
    this.currentScenario = scenario;
    this.clearAllLayers();

    if (!scenario) return;

    this.map.setView(scenario.mapCenter, scenario.zoom, { animate: true });

    // 1. Render Sentinel-1 Synthetic Aperture Radar Chip (Grayscale texture)
    this.renderSARImageOverlay(scenario);

    // 2. Render Detections (Oil & Lookalike Polygons)
    this.renderDetections(scenario.detection);

    // 3. Render Drift Backtrack & Forecast
    this.renderDriftModels(scenario.drift);

    // 4. Render Tracked AIS Candidate Fleet
    this.renderAISTracks(scenario.vessels);

    // 5. Render Background Nearby Vessels
    this.renderBackgroundTraffic(scenario.backgroundTraffic);

    // 6. Update Layer Visibility based on active checkboxes
    this.updateLayersVisibility();
  }

  /**
   * Clear all dynamic layer groups
   */
  clearAllLayers() {
    Object.values(this.layerGroups).forEach(group => {
      if (group) group.clearLayers();
    });
    this.vesselMarkers.clear();
    this.backgroundMarkers = [];
  }

  /**
   * Generate realistic Sentinel-1 Grayscale SAR Radar Chip
   */
  renderSARImageOverlay(scenario) {
    if (!scenario.radarBBox) return;

    const bbox = scenario.radarBBox;
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(600, 600);
    const data = imgData.data;

    // Generate high-resolution Sentinel-1 radar backscatter noise (Rayleigh/Gamma speckle)
    for (let i = 0; i < data.length; i += 4) {
      // Speckle noise variation
      const r1 = Math.random();
      const r2 = Math.random();
      const speckle = Math.sqrt(-2 * Math.log(r1 + 0.0001)) * Math.cos(2 * Math.PI * r2);
      const intensity = Math.max(25, Math.min(240, 115 + speckle * 38));

      data[i] = intensity;     // R
      data[i + 1] = intensity; // G (Grayscale radar backscatter)
      data[i + 2] = intensity; // B
      data[i + 3] = 220;       // Alpha
    }

    ctx.putImageData(imgData, 0, 0);

    // Darken oil slick low-backscatter dampening zones
    if (scenario.detection && scenario.detection.polygons) {
      ctx.fillStyle = 'rgba(12, 16, 24, 0.92)';
      scenario.detection.polygons.forEach(poly => {
        if (poly.type === 'oil' && poly.coordinates.length > 2) {
          ctx.beginPath();
          poly.coordinates.forEach((pt, idx) => {
            const x = ((pt[1] - bbox[0][1]) / (bbox[1][1] - bbox[0][1])) * 600;
            const y = (1 - (pt[0] - bbox[0][0]) / (bbox[1][0] - bbox[0][0])) * 600;
            if (idx === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          });
          ctx.closePath();
          ctx.fill();
        }
      });

      // Bright point scatterers (Hard radar returns from ship steel structures)
      ctx.fillStyle = '#ffffff';
      if (scenario.vessels) {
        scenario.vessels.forEach(v => {
          if (v.track && v.track[0]) {
            const pt = v.track[0];
            const x = ((pt.lon - bbox[0][1]) / (bbox[1][1] - bbox[0][1])) * 600;
            const y = (1 - (pt.lat - bbox[0][0]) / (bbox[1][0] - bbox[0][0])) * 600;
            if (x >= 0 && x <= 600 && y >= 0 && y <= 600) {
              ctx.beginPath();
              ctx.arc(x, y, 3, 0, Math.PI * 2);
              ctx.fill();
              // Star diffraction spike
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(x - 6, y); ctx.lineTo(x + 6, y);
              ctx.moveTo(x, y - 6); ctx.lineTo(x, y + 6);
              ctx.stroke();
            }
          }
        });
      }
    }

    const dataUrl = canvas.toDataURL();
    const imageOverlay = L.imageOverlay(dataUrl, bbox, {
      opacity: 0.85,
      interactive: false,
      className: 'sar-radar-chip'
    });

    this.layerGroups.sarOverlay.addLayer(imageOverlay);
  }

  /**
   * Render Oil and Lookalike Polygons
   */
  renderDetections(detection) {
    if (!detection || !detection.polygons) return;

    detection.polygons.forEach(poly => {
      if (poly.type === 'oil') {
        const polygonLayer = L.polygon(poly.coordinates, {
          color: '#f97316',
          weight: 2.2,
          opacity: 0.98,
          fillColor: '#ea580c',
          fillOpacity: 0.45,
          className: 'oil-slick-polygon'
        });

        polygonLayer.bindPopup(`
          <div class="map-popup">
            <div class="popup-title">OIL SLICK POLYGON</div>
            <div class="popup-row"><span>Area:</span> <b>${poly.areaKm2} km²</b></div>
            <div class="popup-row"><span>Confidence:</span> <b>${Math.round(poly.confidence * 100)}%</b></div>
            <div class="popup-row"><span>Radar Contrast:</span> <b>${poly.contrastDb} dB</b></div>
            <div class="popup-tag danger">U-Net Segmented Oil</div>
          </div>
        `);

        this.layerGroups.oilPolygons.addLayer(polygonLayer);
      } else if (poly.type === 'lookalike') {
        const lookalikeLayer = L.polygon(poly.coordinates, {
          color: '#94a3b8',
          dashArray: '5, 5',
          weight: 2,
          opacity: 0.85,
          fillColor: '#475569',
          fillOpacity: 0.25,
          className: 'lookalike-polygon'
        });

        lookalikeLayer.bindPopup(`
          <div class="map-popup">
            <div class="popup-title">LOOK-ALIKE FEATURE</div>
            <div class="popup-row"><span>Type:</span> <b>${poly.classification || 'Biogenic Surfactant'}</b></div>
            <div class="popup-row"><span>Area:</span> <b>${poly.areaKm2} km²</b></div>
            <div class="popup-row"><span>Contrast:</span> <b>${poly.contrastDb} dB</b></div>
            <div class="popup-tag warning">Look-Alike Excluded</div>
          </div>
        `);

        this.layerGroups.lookAlikes.addLayer(lookalikeLayer);
      }
    });

    if (detection.centroid && detection.oilPolygons > 0) {
      const centroidIcon = L.divIcon({
        className: 'centroid-marker-icon',
        html: `<div class="radar-centroid-dot"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      const centroidMarker = L.marker(detection.centroid, { icon: centroidIcon });
      centroidMarker.bindPopup(`<b>Observation Centroid</b><br>${detection.centroid[0].toFixed(4)}°N, ${detection.centroid[1].toFixed(4)}°W`);
      this.layerGroups.oilPolygons.addLayer(centroidMarker);
    }
  }

  /**
   * Render Drift Backtrack, Origin Zone, and Forecast Cones
   */
  renderDriftModels(drift) {
    if (!drift || !drift.originPosition) return;

    // 1. Backtrack Trajectory Line
    if (drift.backtrackPath && drift.backtrackPath.length > 1) {
      const backtrackLine = L.polyline(drift.backtrackPath, {
        color: '#f59e0b',
        weight: 3,
        dashArray: '6, 6',
        opacity: 0.95
      });
      this.layerGroups.backtrack.addLayer(backtrackLine);
    }

    // 2. Hindcast Cone
    if (drift.hindcastCone && drift.hindcastCone.length > 2) {
      const hindcastConePoly = L.polygon(drift.hindcastCone, {
        color: '#d97706',
        weight: 1.5,
        opacity: 0.7,
        fillColor: '#b45309',
        fillOpacity: 0.15
      });
      this.layerGroups.hindcastCone.addLayer(hindcastConePoly);
    }

    // 3. Origin Zone Polygon
    if (drift.originZonePolygon && drift.originZonePolygon.length > 2) {
      const originZonePoly = L.polygon(drift.originZonePolygon, {
        color: '#f97316',
        weight: 2.5,
        opacity: 0.95,
        fillColor: '#ea580c',
        fillOpacity: 0.25
      });

      originZonePoly.bindPopup(`
        <div class="map-popup">
          <div class="popup-title">ESTIMATED ORIGIN ZONE</div>
          <div class="popup-row"><span>Origin Time:</span> <b>${drift.originTimeDisplay}</b></div>
          <div class="popup-row"><span>Zone Radius:</span> <b>± ${drift.zoneRadiusKm} km</b></div>
          <div class="popup-row"><span>Drift Age Proxy:</span> <b>${drift.ageProxy}</b></div>
          <div class="popup-tag info">Backward Lagrangian Envelope</div>
        </div>
      `);

      this.layerGroups.releaseZone.addLayer(originZonePoly);

      const originIcon = L.divIcon({
        className: 'origin-marker-icon',
        html: `<div class="origin-target-pulse"><div class="origin-inner-dot"></div></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const originMarker = L.marker(drift.originPosition, { icon: originIcon });
      originMarker.bindPopup(`<b>Estimated Release Origin</b><br>${drift.originTimeDisplay}`);
      this.layerGroups.releaseZone.addLayer(originMarker);
    }

    // 4. Forecast Trajectory Line
    if (drift.forecastPath && drift.forecastPath.length > 1) {
      const forecastLine = L.polyline(drift.forecastPath, {
        color: '#06b6d4',
        weight: 3,
        dashArray: '4, 6',
        opacity: 0.95
      });
      this.layerGroups.forecastTrack.addLayer(forecastLine);
    }

    // 5. Forecast Cone
    if (drift.forecastCone && drift.forecastCone.length > 2) {
      const forecastConePoly = L.polygon(drift.forecastCone, {
        color: '#0891b2',
        weight: 1.8,
        opacity: 0.85,
        fillColor: '#0e7490',
        fillOpacity: 0.18
      });

      forecastConePoly.bindPopup(`
        <div class="map-popup">
          <div class="popup-title">FORWARD FORECAST CONE (+36h)</div>
          <div class="popup-row"><span>Spread:</span> <b>${drift.forecastSpreadKm} km</b></div>
          <div class="popup-row"><span>Coastline Impact:</span> <b>${drift.coastImpact}</b></div>
          <div class="popup-tag info">Runge-Kutta 4 Surface Drift</div>
        </div>
      `);

      this.layerGroups.forecastCone.addLayer(forecastConePoly);
    }
  }

  /**
   * Render AIS Vessel Trajectories & Markers
   */
  renderAISTracks(vessels) {
    if (!vessels || vessels.length === 0) return;

    // Distinct palette for multiple vessel lines as shown in screenshot
    const trackColors = [
      '#ef4444', // Red (#1 Primary suspect)
      '#f59e0b', // Amber (#2 Stolt Confidence)
      '#38bdf8', // Cyan (#3 Ocean Titan)
      '#a855f7', // Purple (#4 Atlantic Horizon)
      '#ec4899', // Pink (#5 Valiant Seas)
      '#10b981', // Emerald (#6 Eagle Pass)
      '#06b6d4', // Teal (#7 Sea Runner)
      '#eab308', // Yellow (#8 Gulf Harvester)
      '#64748b', // Slate (#9 Blue Gulf)
      '#818cf8', // Indigo (#10 Mississippi Pioneer)
      '#14b8a6', // Turquoise (#11 Delta Explorer)
      '#f43f5e'  // Rose (#12 Cajun Patriot)
    ];

    vessels.forEach((v, idx) => {
      if (!v.track || v.track.length < 2) return;

      const trackLatLons = v.track.map(pt => [pt.lat, pt.lon]);
      const isSuspect = v.rank === 1 && v.totalScore >= 75;
      const isDR = v.hasDeadReckoningGap;
      const color = trackColors[idx % trackColors.length];

      const trackLine = L.polyline(trackLatLons, {
        color: color,
        weight: isSuspect ? 3.5 : 2.2,
        dashArray: isDR ? '6, 6' : undefined,
        opacity: 0.85
      });

      trackLine.bindPopup(`
        <div class="map-popup">
          <div class="popup-title">${v.name} (${v.vesselType})</div>
          <div class="popup-row"><span>MMSI:</span> <b>${v.mmsi}</b></div>
          <div class="popup-row"><span>Rank:</span> <b>#${v.rank} (${v.totalScore}%)</b></div>
          <div class="popup-row"><span>Data Source:</span> <b>${v.dataIntegrity}</b></div>
          <div class="popup-tag ${isSuspect ? 'danger' : 'info'}">${v.status}</div>
        </div>
      `);

      this.layerGroups.aisTracks.addLayer(trackLine);

      const initialPos = v.track.find(p => p.isRadarPass) || v.track[Math.floor(v.track.length / 2)];
      if (initialPos) {
        const marker = this.createVesselMarker(v, [initialPos.lat, initialPos.lon], initialPos.heading, color);
        this.layerGroups.vesselMarks.addLayer(marker);
        this.vesselMarkers.set(v.id, { marker, vessel: v, track: v.track });
      }
    });
  }

  /**
   * Render Background Ambient Maritime Traffic
   */
  renderBackgroundTraffic(trafficList) {
    if (!trafficList || trafficList.length === 0) return;

    trafficList.forEach(v => {
      const iconHtml = `
        <div class="bg-vessel-wrapper" style="transform: rotate(${v.heading}deg);">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="#64748b">
            <polygon points="8,1 13,14 8,11 3,14"/>
          </svg>
        </div>
      `;

      const icon = L.divIcon({
        className: 'bg-vessel-icon',
        html: iconHtml,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      const marker = L.marker([v.lat, v.lon], { icon });
      marker.bindPopup(`
        <div class="map-popup">
          <div class="popup-title">${v.name}</div>
          <div class="popup-row"><span>Type:</span> <b>${v.type}</b></div>
          <div class="popup-row"><span>MMSI:</span> <b>${v.mmsi}</b></div>
          <div class="popup-row"><span>Speed:</span> <b>${v.speed} kn</b></div>
          <div class="popup-tag info">Ambient EEZ Traffic</div>
        </div>
      `);

      this.layerGroups.backgroundTraffic.addLayer(marker);
      this.backgroundMarkers.push(marker);
    });
  }

  /**
   * Create custom SVG ship icon marker
   */
  createVesselMarker(vessel, latlon, headingDeg = 0, color = '#38bdf8') {
    const isSuspect = vessel.rank === 1 && vessel.totalScore >= 75;
    const isDR = vessel.hasDeadReckoningGap;

    const iconHtml = `
      <div class="ship-marker-wrapper" style="transform: rotate(${headingDeg}deg);">
        <svg viewBox="0 0 24 24" width="22" height="22" class="ship-marker-svg ${isSuspect ? 'suspect-glow' : ''}">
          <path d="M12 2 L18 19 L12 16 L6 19 Z" fill="${color}" stroke="#ffffff" stroke-width="${isDR ? '1.5' : '1'}" stroke-dasharray="${isDR ? '2,2' : 'none'}" />
        </svg>
        ${isSuspect ? '<div class="suspect-ping-ring"></div>' : ''}
      </div>
    `;

    const icon = L.divIcon({
      className: 'custom-vessel-icon',
      html: iconHtml,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const marker = L.marker(latlon, { icon });
    marker.on('click', () => {
      if (this.onVesselSelectCallback) {
        this.onVesselSelectCallback(vessel.id);
      }
    });

    return marker;
  }

  /**
   * Update vessel marker positions during timeline scrubbing
   */
  updateVesselPositionsAtProgress(progress) {
    this.vesselMarkers.forEach(({ marker, vessel, track }) => {
      if (!track || track.length === 0) return;

      const targetIndex = progress * (track.length - 1);
      const lowIndex = Math.floor(targetIndex);
      const highIndex = Math.min(track.length - 1, Math.ceil(targetIndex));
      const fraction = targetIndex - lowIndex;

      const p1 = track[lowIndex];
      const p2 = track[highIndex];

      const curLat = p1.lat + (p2.lat - p1.lat) * fraction;
      const curLon = p1.lon + (p2.lon - p1.lon) * fraction;
      const curHeading = p1.heading + (p2.heading - p1.heading) * fraction;

      marker.setLatLng([curLat, curLon]);

      const iconElem = marker.getElement();
      if (iconElem) {
        const wrapper = iconElem.querySelector('.ship-marker-wrapper');
        if (wrapper) {
          wrapper.style.transform = `rotate(${Math.round(curHeading)}deg)`;
        }
      }
    });
  }

  /**
   * Render probed point simulation
   */
  renderProbeResult(lat, lon, probeData) {
    this.layerGroups.probeGroup.clearLayers();

    const probeIcon = L.divIcon({
      className: 'probe-marker-icon',
      html: `<div class="probe-target-pin"><div class="probe-pin-dot"></div></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    const probeMarker = L.marker([lat, lon], { icon: probeIcon });
    probeMarker.bindPopup(`<b>Probed Ocean Coordinate</b><br>${lat.toFixed(4)}°N, ${lon.toFixed(4)}°W`);
    this.layerGroups.probeGroup.addLayer(probeMarker);

    this.renderDriftModels(probeData);
    this.renderAISTracks(probeData.vessels);
  }

  /**
   * Highlight a specific vessel on map and zoom/pan
   */
  highlightVessel(vesselId) {
    const entry = this.vesselMarkers.get(vesselId);
    if (entry) {
      const latlng = entry.marker.getLatLng();
      this.map.panTo(latlng, { animate: true, duration: 0.5 });
      entry.marker.openPopup();
    }
  }

  /**
   * Toggle layer visibility
   */
  toggleLayer(layerKey, isVisible) {
    this.activeLayers[layerKey] = isVisible;
    this.updateLayersVisibility();
  }

  updateLayersVisibility() {
    if (this.layerGroups.sarOverlay) {
      if (this.activeLayers.sarImage) this.map.addLayer(this.layerGroups.sarOverlay);
      else this.map.removeLayer(this.layerGroups.sarOverlay);
    }
    if (this.layerGroups.oilPolygons) {
      if (this.activeLayers.oilPolygons) this.map.addLayer(this.layerGroups.oilPolygons);
      else this.map.removeLayer(this.layerGroups.oilPolygons);
    }
    if (this.layerGroups.lookAlikes) {
      if (this.activeLayers.lookAlikes) this.map.addLayer(this.layerGroups.lookAlikes);
      else this.map.removeLayer(this.layerGroups.lookAlikes);
    }
    if (this.layerGroups.backtrack) {
      if (this.activeLayers.backtrack) this.map.addLayer(this.layerGroups.backtrack);
      else this.map.removeLayer(this.layerGroups.backtrack);
    }
    if (this.layerGroups.hindcastCone) {
      if (this.activeLayers.hindcastCone) this.map.addLayer(this.layerGroups.hindcastCone);
      else this.map.removeLayer(this.layerGroups.hindcastCone);
    }
    if (this.layerGroups.releaseZone) {
      if (this.activeLayers.releaseZone) this.map.addLayer(this.layerGroups.releaseZone);
      else this.map.removeLayer(this.layerGroups.releaseZone);
    }
    if (this.layerGroups.forecastTrack) {
      if (this.activeLayers.forecastTrack) this.map.addLayer(this.layerGroups.forecastTrack);
      else this.map.removeLayer(this.layerGroups.forecastTrack);
    }
    if (this.layerGroups.forecastCone) {
      if (this.activeLayers.forecastCone) this.map.addLayer(this.layerGroups.forecastCone);
      else this.map.removeLayer(this.layerGroups.forecastCone);
    }
    if (this.layerGroups.aisTracks) {
      if (this.activeLayers.aisTracks) this.map.addLayer(this.layerGroups.aisTracks);
      else this.map.removeLayer(this.layerGroups.aisTracks);
    }
    if (this.layerGroups.vesselMarks) {
      if (this.activeLayers.vesselMarks) this.map.addLayer(this.layerGroups.vesselMarks);
      else this.map.removeLayer(this.layerGroups.vesselMarks);
    }
    if (this.layerGroups.backgroundTraffic) {
      if (this.activeLayers.backgroundTraffic) this.map.addLayer(this.layerGroups.backgroundTraffic);
      else this.map.removeLayer(this.layerGroups.backgroundTraffic);
    }
  }
}

// Global instance
window.mapEngine = new MapEngine();
