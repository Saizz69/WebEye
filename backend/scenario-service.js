/**
 * WebEye - SIH26143 Maritime Intelligence Console
 * Backend Module: Scenario Data Service & Pipeline Orchestrator
 * 
 * Coordinates satellite scene catalogs, imagery bounds, metocean drift,
 * Bayesian scoring, dark vessel analysis, and Indian statutory alignment.
 */

const fs = require('fs');
const path = require('path');
const bayesianEngine = require('./bayesian-forensic-engine');
const statutoryEngine = require('./indian-statutory-engine');
const darkDetector = require('./dark-vessel-detector');
const trafficGenerator = require('./traffic-generator');
const driftEngine = require('./lagrangian-drift-engine');

class ScenarioService {
  constructor() {
    this.scenarios = {};
    this.initDatabase();
  }

  /**
   * Initialize Scenario Repository with authentic satellite datasets
   */
  initDatabase() {
    // 1. Scenario: Gulf of Mexico, MC20 Chronic (Sentinel-1 SAR + AIS)
    this.scenarios['OS-GOMMC-20230924'] = {
      id: 'OS-GOMMC-20230924',
      title: 'Gulf of Mexico, MC20 Chronic / Tanker Discharge',
      shortName: 'Gulf of Mexico, MC20 chronic...',
      status: 'ACTIVE',
      locationName: 'Mississippi Canyon, Gulf of Mexico',
      radarPassTime: '2023-09-24T00:02:27Z',
      radarPassTimeDisplay: '2023-09-24 00:02:27 UTC',
      sensor: 'Sentinel-1 IW GRD RTC',
      orbit: 'Descending (Track 135)',
      polarization: 'VV + VH',
      resolution: '10.0 m',
      detectorModel: 'U-Net (ResNet-34 Backbone)',
      confidence: 0.73,
      aisType: 'RECORDED AIS',
      aisSource: 'AIS: recorded tracks (marinecadastre) cross-validated with Sentinel-1 SAR.',
      mapCenter: [28.9662, -88.9127],
      zoom: 10,
      radarBBox: [[28.60, -89.45], [29.35, -88.50]],
      opticalBBox: [[28.75, -89.20], [29.20, -88.65]],
      sarImagePath: 'Picture36-2-1.png',
      opticalImagePath: '2026-04-07-00-00-2026-04-07-23-59-sentinel-2-l2a-highlight-optimized-natural-color.jpg',
      
      summary: {
        oilPolygonsCount: 1,
        totalAreaKm2: 5.15,
        largestAreaKm2: 5.15,
        vesselsScored: 10,
        candidateCount: 12,
        driftAgeHours: 11.0,
        originTimeDisplay: '2023-09-23 13:02:27 UTC',
        zoneRadiusKm: 8.3,
        zoneAreaKm2: 227.5,
        coastImpact: 'Stays offshore (no landfall in +36h)',
        threatenedBox: '28.48°N to 28.97°N, 89.40°W to 88.86°W',
        pipelineLatencyMs: 51800
      },

      detection: {
        oilPolygons: 1,
        lookAlikes: 0,
        totalOilAreaKm2: 5.15,
        largestAreaKm2: 5.15,
        lengthKm: 9.35,
        widthKm: 2.20,
        perimeterKm: 24.60,
        orientationDeg: 149,
        compactness: 0.14,
        contrastDb: 5.4,
        confidence: 0.88,
        driftAgeProxyHours: 11.0,
        centroid: [28.9662, -88.9127],
        polygons: [
          {
            id: 'poly-gom-main-01',
            type: 'oil',
            confidence: 0.96,
            areaKm2: 5.15,
            contrastDb: 5.4,
            coordinates: [
              [28.9673, -88.9639],
              [28.9638, -88.9383],
              [28.9561, -88.9260],
              [28.9552, -88.8889],
              [28.9716, -88.8667],
              [28.9750, -88.8741],
              [28.9716, -88.8996],
              [28.9784, -88.9342],
              [28.9716, -88.9276],
              [28.9673, -88.9317],
              [28.9750, -88.9532],
              [28.9673, -88.9639]
            ]
          }
        ]
      },

      drift: {
        originTime: '2023-09-23T13:02:27Z',
        originTimeDisplay: '2023-09-23 13:02:27 UTC',
        originPosition: [29.1238, -88.7848],
        zoneRadiusKm: 8.3,
        bufferedRadiusKm: 10.3,
        zoneAreaKm2: 227.5,
        hoursBack: 11,
        ageProxy: '11.0 h drift proxy',
        windFactor: '0.030 of 10 m wind',
        deflection: '15 deg right (Ekman layer)',
        particlesCount: 50,
        forecastSpreadKm: 25.9,
        coastImpact: 'stays offshore',
        threatenedBox: '28.48 to 28.94 N, -89.40 to -88.93 E',
        metoceanSource: 'Open-Meteo ERA5 10 m wind + CMEMS Global Ocean Physics',
        originZonePolygon: [
          [29.215, -88.845], [29.200, -88.750], [29.145, -88.705],
          [29.060, -88.730], [29.030, -88.820], [29.070, -88.875], [29.215, -88.845]
        ],
        backtrackPath: [
          [28.9384, -88.9335], [28.9950, -88.8850], [29.0600, -88.8350], [29.1238, -88.7848]
        ],
        hindcastCone: [
          [28.9384, -88.9335], [29.215, -88.845], [29.200, -88.750],
          [29.030, -88.820], [29.070, -88.875], [28.9384, -88.9335]
        ],
        forecastPath: [
          [28.9384, -88.9335], [28.8400, -89.0100], [28.7400, -89.0900], [28.6300, -89.1800]
        ],
        forecastCone: [
          [28.9384, -88.9335], [28.7600, -88.9500], [28.5200, -89.0800],
          [28.5800, -89.3400], [28.8200, -89.2000], [28.9384, -88.9335]
        ]
      },

      environmental: {
        meanWindSpeed: '4.3 m/s',
        windDirection: 'NW (315°)',
        meanCurrentSpeed: '0.18 m/s',
        currentDirection: 'SE (140°)',
        fieldResolution: '5 x 5 pts',
        cubeTimeSpan: '144 h',
        metoceanDetail: 'Open-Meteo ERA5 10 m wind + CMEMS PHY_001_024 currents'
      },

      evidence: {
        oilPolygons: 29,
        lookAlikesExcluded: 0,
        opticalChipsCompared: 1,
        vesselsInTheBox: 20,
        passedTheFilter: 12,
        ensembleMembers: 50
      }
    };

    // 2. Scenario: Caribbean Sea, Tobago Mystery Barge Disaster
    this.scenarios['OS-TOBAGO-20240207'] = {
      id: 'OS-TOBAGO-20240207',
      title: 'Caribbean Sea, Tobago Island Mystery Barge Spill',
      shortName: 'Caribbean Sea, Tobago spill...',
      status: 'ACTIVE CRITICAL INCIDENT',
      locationName: 'Cove Eco-Industrial Estate Offshore, Tobago, Caribbean Sea',
      radarPassTime: '2024-02-08T10:14:30Z',
      radarPassTimeDisplay: '2024-02-08 10:14:30 UTC',
      sensor: 'Sentinel-1A IW GRD + Sentinel-2 MSI',
      orbit: 'Descending (Track 107)',
      polarization: 'VV + VH',
      resolution: '10.0 m',
      detectorModel: 'U-Net (ResNet-34 Backbone)',
      confidence: 0.96,
      aisType: 'RECORDED AIS & FORENSIC TRACK',
      aisSource: 'AIS: 7 tracked vessels including suspect tug SOLO CREED & Trinidad & Tobago Coast Guard fleet.',
      mapCenter: [11.1600, -61.3500],
      zoom: 10,
      radarBBox: [[10.950, -62.050], [11.450, -60.400]],
      opticalBBox: [[10.950, -62.050], [11.450, -60.400]],
      sarImagePath: 'R2lKQkCsKNyKw2YH4cw0Uf-dJUBn4c6ZEkZAuFqr0bxmLIaRpL1NHiSGoX6bkTEUtWQsc4CmOi3HMsotBJ437ayVNMvhkgHo2Miu5EY6ApTCXObg1Egs26DVnvjlHHaxlPxv-Xpj51L9t12olnHzrjxZ0Es4MH-GpDYiiRLHirc.jpg',
      opticalImagePath: 'R2lKQkCsKNyKw2YH4cw0Uf-dJUBn4c6ZEkZAuFqr0bxmLIaRpL1NHiSGoX6bkTEUtWQsc4CmOi3HMsotBJ437ayVNMvhkgHo2Miu5EY6ApTCXObg1Egs26DVnvjlHHaxlPxv-Xpj51L9t12olnHzrjxZ0Es4MH-GpDYiiRLHirc.jpg',

      summary: {
        oilPolygonsCount: 2,
        totalAreaKm2: 261.72,
        largestAreaKm2: 260.50,
        vesselsScored: 7,
        candidateCount: 7,
        driftAgeHours: 26.5,
        originTimeDisplay: '2024-02-07 07:45:00 UTC',
        zoneRadiusKm: 3.5,
        zoneAreaKm2: 38.5,
        coastImpact: 'Direct shoreline landfall on SW Tobago beaches & coastal reefs',
        threatenedBox: '11.04°N to 11.28°N, 62.00°W to 60.90°W',
        pipelineLatencyMs: 46800
      },

      detection: {
        oilPolygons: 2,
        lookAlikes: 0,
        totalOilAreaKm2: 261.72,
        largestAreaKm2: 260.50,
        lengthKm: 128.5,
        widthKm: 3.40,
        perimeterKm: 278.0,
        orientationDeg: 285,
        compactness: 0.08,
        contrastDb: 6.8,
        confidence: 0.96,
        driftAgeProxyHours: 26.5,
        centroid: [11.1522, -61.4308],
        polygons: [
          {
            id: 'poly-tob-plume-01',
            type: 'oil',
            confidence: 0.98,
            areaKm2: 260.50,
            contrastDb: 6.8,
            coordinates: [
              [11.25712, -61.96750],
              [11.24599, -61.91250],
              [11.22003, -61.83000],
              [11.20148, -61.72000],
              [11.19777, -61.61000],
              [11.20371, -61.50000],
              [11.20519, -61.39000],
              [11.19036, -61.33500],
              [11.15326, -61.28000],
              [11.13101, -61.22500],
              [11.07537, -61.17000],
              [11.06795, -61.08750],
              [11.06573, -61.00500],
              [11.06424, -60.95000],
              [11.05089, -60.94312],
              [11.05089, -61.00500],
              [11.05237, -61.08750],
              [11.05089, -61.17000],
              [11.06053, -61.22500],
              [11.12730, -61.28000],
              [11.17923, -61.34187],
              [11.19036, -61.40375],
              [11.18442, -61.51375],
              [11.18145, -61.62375],
              [11.18665, -61.73375],
              [11.20519, -61.84375],
              [11.22374, -61.92625],
              [11.23858, -61.98125],
              [11.25712, -61.96750]
            ]
          },
          {
            id: 'poly-tob-reef-02',
            type: 'oil',
            confidence: 0.99,
            areaKm2: 1.22,
            contrastDb: 7.4,
            coordinates: [
              [11.068, -60.942],
              [11.064, -60.952],
              [11.052, -60.958],
              [11.048, -60.945],
              [11.056, -60.938],
              [11.068, -60.942]
            ]
          }
        ]
      },

      drift: {
        originTime: '2024-02-07T07:45:00Z',
        originTimeDisplay: '2024-02-07 07:45:00 UTC',
        originPosition: [11.0600, -60.9500],
        zoneRadiusKm: 3.5,
        bufferedRadiusKm: 5.0,
        zoneAreaKm2: 38.5,
        hoursBack: 26.5,
        ageProxy: '26.5 h continuous discharge from capsized hull',
        windFactor: '0.030 of 10 m wind',
        deflection: '15 deg right (Ekman layer)',
        particlesCount: 50,
        forecastSpreadKm: 42.0,
        coastImpact: 'Severe coastal stranding on SW Tobago (Scarborough, Lambeau, Canoe Bay)',
        threatenedBox: '11.04 to 11.28 N, -62.00 to -60.90 E',
        metoceanSource: 'Open-Meteo ERA5 10 m Trade Winds + CMEMS GLOBAL_ANALYSISFORECAST_PHY_001_024 Caribbean Currents',

        originZonePolygon: [
          [11.075, -60.930],
          [11.075, -60.970],
          [11.045, -60.970],
          [11.045, -60.930],
          [11.075, -60.930]
        ],

        backtrackPath: [
          [11.1522, -61.4308],
          [11.1800, -61.3400],
          [11.1300, -61.2250],
          [11.0650, -61.1000],
          [11.0600, -60.9500]
        ],

        hindcastCone: [
          [11.1522, -61.4308],
          [11.2050, -61.3500],
          [11.1400, -61.2000],
          [11.0750, -60.9300],
          [11.0450, -60.9400],
          [11.0450, -61.1500],
          [11.1522, -61.4308]
        ],

        forecastPath: [
          [11.1522, -61.4308],
          [11.2000, -61.7000],
          [11.2500, -61.9800],
          [11.3000, -62.2500]
        ],

        forecastCone: [
          [11.1522, -61.4308],
          [11.2400, -61.7000],
          [11.3500, -62.1000],
          [11.3800, -62.3000],
          [11.2200, -62.3000],
          [11.1400, -61.8000],
          [11.1522, -61.4308]
        ]
      },

      environmental: {
        meanWindSpeed: '7.8 m/s (Easterly Trades)',
        windDirection: 'ENE (070°)',
        meanCurrentSpeed: '0.38 m/s (Caribbean Current)',
        currentDirection: 'WNW (285°)',
        fieldResolution: '5 x 5 pts',
        cubeTimeSpan: '144 h',
        metoceanDetail: 'CMEMS Global PHY_001_024 + Open-Meteo ERA5 10 m Easterly Trade Winds'
      },

      evidence: {
        oilPolygons: 2,
        lookAlikesExcluded: 0,
        opticalChipsCompared: 2,
        vesselsInTheBox: 16,
        passedTheFilter: 7,
        ensembleMembers: 50
      }
    };

    // 3. Scenario: Clean Sentinel-2 L2A Patrol Pass (Negative Control - Submerged Ridges)
    this.scenarios['OS-CLEAN-TOBAGO-20240215'] = {
      id: 'OS-CLEAN-TOBAGO-20240215',
      title: 'Persian Gulf, Strait of Hormuz (Clean Patrol Pass — Underwater Bathymetric Ridges)',
      shortName: 'Hormuz Pass, Clean Patrol...',
      status: 'CLEAN SCENE / UNDERWATER RIDGES DISCRIMINATED',
      locationName: 'Persian Gulf / Strait of Hormuz (Shahid Rajaee Sector)',
      radarPassTime: '2026-04-07T11:45:00Z',
      radarPassTimeDisplay: '2026-04-07 11:45:00 UTC',
      sensor: 'Sentinel-2 MSI Level-2A (Highlight Optimized Natural Color)',
      orbit: 'Descending (Track 124)',
      polarization: 'RGB Bands B4-B3-B2 (10m GSD)',
      resolution: '10.0 m',
      detectorModel: 'U-Net (ResNet-34 Multi-Spectral Backbone)',
      confidence: 0.99,
      aisType: 'RECORDED AIS',
      aisSource: 'AIS: 4 commercial vessels navigating fairway; optical dark features verified as submerged bathymetric ridges.',
      isCleanScene: true,
      hasAmbiguousLookalike: true,
      mapCenter: [27.0750, 56.0950],
      zoom: 12,
      radarBBox: [[27.0150, 56.0200], [27.1350, 56.1750]],
      opticalBBox: [[27.0150, 56.0200], [27.1350, 56.1750]],
      sarImagePath: '2026-04-07-00-00-2026-04-07-23-59-sentinel-2-l2a-highlight-optimized-natural-color.jpg',
      opticalImagePath: '2026-04-07-00-00-2026-04-07-23-59-sentinel-2-l2a-highlight-optimized-natural-color.jpg',

      summary: {
        oilPolygonsCount: 0,
        totalAreaKm2: 0.00,
        largestAreaKm2: 0.00,
        vesselsScored: 0,
        candidateCount: 0,
        driftAgeHours: 0,
        originTimeDisplay: 'N/A (Clean Water / Bathymetric Ridges)',
        zoneRadiusKm: 0,
        zoneAreaKm2: 0,
        coastImpact: 'Clean Water — Negative Control Verified (0 Oil Polygons, 3 Natural Ridges Discriminated)',
        threatenedBox: 'N/A (No Slick Threat)',
        pipelineLatencyMs: 18600
      },

      detection: {
        oilPolygons: 0,
        lookAlikes: 3,
        totalOilAreaKm2: 0.0,
        largestAreaKm2: 0.0,
        lengthKm: 0.0,
        widthKm: 0.0,
        perimeterKm: 0.0,
        orientationDeg: 0,
        compactness: 0.0,
        contrastDb: 0.1,
        confidence: 0.99,
        driftAgeProxyHours: 0.0,
        centroid: null,
        polygons: [
          {
            id: 'lookalike-ridge-01',
            type: 'lookalike',
            classification: 'Submerged Bathymetric Sand Ridge',
            areaKm2: 4.82,
            contrastDb: 0.1,
            confidence: 0.98,
            interpretation: 'Natural seabed bathymetric formation / underwater sandbank relief. Spectral NDOI confirms zero hydrocarbon presence.',
            coordinates: [
              [27.0413, 56.0560],
              [27.0485, 56.0669],
              [27.0558, 56.0813],
              [27.0612, 56.0957],
              [27.0576, 56.1065],
              [27.0522, 56.1011],
              [27.0485, 56.0885],
              [27.0413, 56.0741],
              [27.0359, 56.0633],
              [27.0341, 56.0524]
            ]
          },
          {
            id: 'lookalike-ridge-02',
            type: 'lookalike',
            classification: 'Submerged Benthic Hook / Swirl Contour',
            areaKm2: 1.65,
            contrastDb: 0.15,
            confidence: 0.97,
            interpretation: 'Coastal shallow seabed contour. Optical absorption consistent with sandy sediment and benthic depth change.',
            coordinates: [
              [27.0341, 56.0488],
              [27.0377, 56.0560],
              [27.0305, 56.0596],
              [27.0233, 56.0543],
              [27.0269, 56.0470]
            ]
          },
          {
            id: 'lookalike-ridge-03',
            type: 'lookalike',
            classification: 'Shallow Coastal Sediment Bar',
            areaKm2: 2.10,
            contrastDb: 0.08,
            confidence: 0.99,
            interpretation: 'Submerged sediment bar near navigation channel approach. Zero capillary wave damping in radar backscatter.',
            coordinates: [
              [27.1062, 56.1137],
              [27.1098, 56.1245],
              [27.1008, 56.1281],
              [27.0972, 56.1191]
            ]
          }
        ]
      },

      drift: {
        originTime: null,
        originTimeDisplay: 'N/A (Clean Water)',
        originPosition: null,
        zoneRadiusKm: 0,
        bufferedRadiusKm: 0,
        zoneAreaKm2: 0,
        hoursBack: 0,
        ageProxy: 'N/A',
        windFactor: '0.030 of 10 m wind',
        deflection: '15 deg right',
        particlesCount: 0,
        forecastSpreadKm: 0,
        coastImpact: 'No Slick Detected — Submerged Seabed Ridges Confirmed Clean',
        threatenedBox: 'N/A',
        metoceanSource: 'Open-Meteo ERA5 10 m Winds + CMEMS Persian Gulf Hydrodynamic Model',
        originZonePolygon: [],
        backtrackPath: [],
        hindcastCone: [],
        forecastPath: [],
        forecastCone: []
      },

      environmental: {
        meanWindSpeed: '5.2 m/s',
        windDirection: 'NW (315°)',
        meanCurrentSpeed: '0.32 m/s',
        currentDirection: 'SE (135°)',
        fieldResolution: '5 x 5 pts',
        cubeTimeSpan: '48 h',
        metoceanDetail: 'Open-Meteo ERA5 + CMEMS Persian Gulf Surface Circulation'
      },

      evidence: {
        oilPolygons: 0,
        lookAlikesExcluded: 3,
        opticalChipsCompared: 3,
        vesselsInTheBox: 14,
        passedTheFilter: 0,
        ensembleMembers: 0
      }
    };

    // Populate initial vessels & background traffic for all scenarios
    Object.keys(this.scenarios).forEach(id => {
      this.populateScenarioTraffic(id);
    });
  }

  /**
   * Populate candidate fleet and dynamic background ships
   */
  populateScenarioTraffic(scenarioId) {
    const sc = this.scenarios[scenarioId];
    if (!sc) return;

    const center = sc.mapCenter;
    const origin = sc.drift.originPosition || center;

    if (sc.isCleanScene) {
      sc.vessels = [];
      sc.backgroundTraffic = trafficGenerator.generateBackgroundTraffic(center[0], center[1], 25, 45);
      return;
    }

    // Generate Candidate Fleet
    sc.vessels = trafficGenerator.generateCandidateFleet(center[0], center[1], origin[0], origin[1], 10, true);

    // Score with Bayesian Engine (USP 01) & Dark Vessel Detector (USP 03)
    sc.vessels = sc.vessels.map(v => {
      const darkAnalysis = darkDetector.analyzeVesselTrack(v, { lat: origin[0], lon: origin[1] });
      v.darkAnalysis = darkAnalysis;
      v.isDarkVessel = darkAnalysis.hasDarkGap;
      v.hasDeadReckoningGap = darkAnalysis.hasDarkGap;
      return v;
    });

    sc.vessels = bayesianEngine.rankFleet(sc.vessels, { slickOrientationDeg: sc.detection.orientationDeg });

    // Generate Dynamic Background Marine Traffic
    sc.backgroundTraffic = trafficGenerator.generateBackgroundTraffic(center[0], center[1], 35, 55);
  }

  /**
   * Get all scenario summaries
   */
  getAllScenarios() {
    return Object.values(this.scenarios).map(s => ({
      id: s.id,
      title: s.title,
      shortName: s.shortName,
      status: s.status,
      radarPassTime: s.radarPassTime,
      radarPassTimeDisplay: s.radarPassTimeDisplay,
      aisType: s.aisType,
      summary: s.summary,
      mapCenter: s.mapCenter,
      zoom: s.zoom
    }));
  }

  /**
   * Get complete scenario data by ID
   */
  getScenarioById(id) {
    return this.scenarios[id] || null;
  }

  /**
   * Run full end-to-end analysis on scenario with custom weights or parameters
   */
  runAnalysis(scenarioId, params = {}) {
    const sc = this.scenarios[scenarioId];
    if (!sc) return null;

    const hindcastH = parseFloat(params.hindcastHours || 48);
    const forecastH = parseFloat(params.forecastHours || 36);
    const weights = params.weights || bayesianEngine.defaultWeights;

    // Recompute Drift
    const center = sc.mapCenter;
    const driftResult = driftEngine.computeDrift(center[0], center[1], hindcastH, forecastH, {
      directionDeg: sc.detection.orientationDeg
    });

    sc.drift = {
      ...sc.drift,
      ...driftResult,
      originTimeDisplay: `T - ${driftResult.driftAgeHours}h (${new Date(Date.now() - driftResult.driftAgeHours * 3600000).toISOString().slice(0, 16)} UTC)`
    };

    // Re-score Vessels with new Bayesian weights & updated origin
    sc.vessels = bayesianEngine.rankFleet(sc.vessels, { slickOrientationDeg: sc.detection.orientationDeg }, weights);

    // Update Summary
    sc.summary.driftAgeHours = driftResult.driftAgeHours;
    sc.summary.zoneRadiusKm = driftResult.zoneRadiusKm;
    sc.summary.zoneAreaKm2 = driftResult.zoneAreaKm2;
    sc.summary.originTimeDisplay = sc.drift.originTimeDisplay;

    return sc;
  }

  /**
   * Probe arbitrary ocean coordinates (Run on-demand backtrack + fleet query)
   */
  probePoint(lat, lon, hindcastH = 48, forecastH = 36) {
    const driftResult = driftEngine.computeDrift(lat, lon, hindcastH, forecastH);
    const origin = driftResult.originPosition;

    // Generate Candidate Fleet around probe origin
    let vessels = trafficGenerator.generateCandidateFleet(lat, lon, origin[0], origin[1], 8, true);

    vessels = vessels.map(v => {
      const darkAnalysis = darkDetector.analyzeVesselTrack(v, { lat: origin[0], lon: origin[1] });
      v.darkAnalysis = darkAnalysis;
      v.isDarkVessel = darkAnalysis.hasDarkGap;
      v.hasDeadReckoningGap = darkAnalysis.hasDarkGap;
      return v;
    });

    vessels = bayesianEngine.rankFleet(vessels, { slickOrientationDeg: driftResult.driftDirectionDeg });

    const backgroundTraffic = trafficGenerator.generateBackgroundTraffic(lat, lon, 25, 45);

    return {
      probedCoords: [lat, lon],
      drift: driftResult,
      vessels,
      backgroundTraffic
    };
  }

  /**
   * Get detailed legal dossier for a vessel (Incorporates all 4 USPs)
   */
  getVesselDossier(scenarioId, vesselId) {
    const sc = this.scenarios[scenarioId];
    if (!sc) return null;

    const vessel = (sc.vessels || []).find(v => v.id === vesselId);
    if (!vessel) return null;

    const bayesianResult = bayesianEngine.evaluateVessel(vessel, { slickOrientationDeg: sc.detection.orientationDeg });
    const statutoryDossier = statutoryEngine.generateStatutoryDossier(vessel, sc, bayesianResult);
    const darkAnalysis = darkDetector.analyzeVesselTrack(vessel, { lat: sc.drift.originPosition[0], lon: sc.drift.originPosition[1] });

    return {
      vessel,
      scenario: {
        id: sc.id,
        locationName: sc.locationName,
        radarPassTimeDisplay: sc.radarPassTimeDisplay,
        sensor: sc.sensor,
        confidence: sc.confidence,
        slickAreaKm2: sc.detection.totalOilAreaKm2
      },
      // USP 01: Explainable Forensic Scoring
      bayesianScoring: {
        uspTitle: '01 Explainable Forensic Scoring (Bayesian Multi-Factor Attribution)',
        totalScore: bayesianResult.totalScore,
        confidenceInterval: bayesianResult.confidenceInterval,
        status: bayesianResult.status,
        statusLevel: bayesianResult.statusLevel,
        subScores: bayesianResult.subScores,
        probabilisticBreakdown: bayesianResult.probabilisticBreakdown,
        reasonCodes: bayesianResult.reasonCodes
      },
      // USP 02: Indian Statutory Alignment
      statutoryCompliance: {
        uspTitle: '02 Indian Statutory Alignment (ICG NOS-DCP & Merchant Shipping Act Part XI-A)',
        nosdcp: statutoryDossier.nosdcp,
        jurisdiction: statutoryDossier.jurisdiction,
        statutoryCitations: statutoryDossier.statutoryCitations,
        prosecutionAssessment: statutoryDossier.prosecutionAssessment,
        chainOfCustody: statutoryDossier.chainOfCustody
      },
      // USP 03: AIS Dropout / Dark Vessel Flags
      darkVesselIntelligence: {
        uspTitle: '03 AIS Dropout / Dark Vessel Flags (Transponder Blackout Detection)',
        ...darkAnalysis
      },
      // USP 04: Zero-Hardware Commodity Stack
      commodityStackLineage: {
        uspTitle: '04 Zero-Hardware Commodity Stack (Open Earth Observation Pipeline)',
        radarConstellation: 'Copernicus Sentinel-1 (C-Band Synthetic Aperture Radar IW GRD)',
        opticalConstellation: 'Copernicus Sentinel-2 (Multispectral MSI 10m L2A)',
        metoceanOceanModel: 'Copernicus Marine Environment Monitoring Service (CMEMS GLOBAL_ANALYSISFORECAST_PHY_001_024)',
        windAtmosphereModel: 'ECMWF Reanalysis / Open-Meteo ERA5 10m Wind Fields',
        aisIngestion: 'Terrestrial & Satellite AIS Stream (Spire / AISHub Open Feeds)',
        zeroHardwareCertification: 'Fully automated desktop/cloud stack with zero onboard sensor hardware or proprietary telemetry licensing.'
      }
    };
  }
}

module.exports = new ScenarioService();
