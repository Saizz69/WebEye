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

    // 2. Scenario: Mumbai Offshore / Indian Coast Guard Sector (NOS-DCP Target)
    this.scenarios['OS-MUMBAI-20240313'] = {
      id: 'OS-MUMBAI-20240313',
      title: 'Arabian Sea, Mumbai Offshore / ICG Sector',
      shortName: 'Arabian Sea, Mumbai offshor...',
      status: 'ACTIVE',
      locationName: 'Bombay High / Mumbai Offshore Basin, Arabian Sea',
      radarPassTime: '2024-03-13T01:03:42Z',
      radarPassTimeDisplay: '2024-03-13 01:03:42 UTC',
      sensor: 'Sentinel-1A IW GRD RTC',
      orbit: 'Ascending (Track 085)',
      polarization: 'VV + VH',
      resolution: '10.0 m',
      detectorModel: 'U-Net (ResNet-34 Backbone)',
      confidence: 0.81,
      aisType: 'SIMULATED / SATELLITE AIS',
      aisSource: 'AIS: Indian EEZ coastal traffic integrated with INCOIS metocean feeds.',
      mapCenter: [19.2500, 71.4000],
      zoom: 10,
      radarBBox: [[18.85, 70.95], [19.65, 71.85]],
      opticalBBox: [[19.00, 71.15], [19.50, 71.65]],
      sarImagePath: 'Picture36-2-1.png',
      opticalImagePath: '2026-04-07-00-00-2026-04-07-23-59-sentinel-2-l2a-highlight-optimized-natural-color.jpg',

      summary: {
        oilPolygonsCount: 18,
        totalAreaKm2: 4.82,
        largestAreaKm2: 1.65,
        vesselsScored: 8,
        candidateCount: 14,
        driftAgeHours: 8.5,
        originTimeDisplay: '2024-03-12 16:33:42 UTC',
        zoneRadiusKm: 6.2,
        zoneAreaKm2: 120.8,
        coastImpact: 'High-seas EEZ drift (No immediate shoreline threat)',
        threatenedBox: '18.90°N to 19.35°N, 71.10°E to 71.55°E',
        pipelineLatencyMs: 44200
      },

      detection: {
        oilPolygons: 18,
        lookAlikes: 0,
        totalOilAreaKm2: 4.82,
        largestAreaKm2: 1.65,
        lengthKm: 3.42,
        widthKm: 1.20,
        perimeterKm: 11.80,
        orientationDeg: 215,
        compactness: 0.12,
        contrastDb: 5.1,
        confidence: 0.81,
        driftAgeProxyHours: 8.5,
        centroid: [19.2500, 71.4000],
        polygons: [
          {
            id: 'poly-mum-01',
            type: 'oil',
            confidence: 0.95,
            areaKm2: 1.65,
            contrastDb: 5.8,
            coordinates: [
              [19.280, 71.425], [19.270, 71.415], [19.250, 71.398],
              [19.230, 71.380], [19.220, 71.370], [19.215, 71.375],
              [19.230, 71.395], [19.255, 71.415], [19.275, 71.435], [19.280, 71.425]
            ]
          }
        ]
      },

      drift: {
        originTime: '2024-03-12T16:33:42Z',
        originTimeDisplay: '2024-03-12 16:33:42 UTC',
        originPosition: [19.3870, 71.5180],
        zoneRadiusKm: 6.2,
        bufferedRadiusKm: 7.8,
        zoneAreaKm2: 120.8,
        hoursBack: 8.5,
        ageProxy: '8.5 h drift proxy',
        windFactor: '0.030 of 10 m wind',
        deflection: '15 deg right (Ekman)',
        particlesCount: 50,
        forecastSpreadKm: 19.4,
        coastImpact: 'Stays offshore (West coast clearance > 65 NM)',
        threatenedBox: '18.90 to 19.35 N, 71.10 to 71.55 E',
        metoceanSource: 'INCOIS Ocean Forecast + ECMWF Reanalysis',
        originZonePolygon: [
          [19.440, 71.480], [19.430, 71.560], [19.380, 71.575],
          [19.330, 71.530], [19.340, 71.460], [19.440, 71.480]
        ],
        backtrackPath: [
          [19.2500, 71.4000], [19.2950, 71.4400], [19.3400, 71.4800], [19.3870, 71.5180]
        ],
        hindcastCone: [
          [19.2500, 71.4000], [19.440, 71.480], [19.430, 71.560],
          [19.330, 71.530], [19.2500, 71.4000]
        ],
        forecastPath: [
          [19.2500, 71.4000], [19.1800, 71.3200], [19.1100, 71.2400], [19.0200, 71.1500]
        ],
        forecastCone: [
          [19.2500, 71.4000], [19.1500, 71.3600], [18.9800, 71.2200],
          [18.9400, 71.1400], [19.0800, 71.1000], [19.2500, 71.4000]
        ]
      },

      environmental: {
        meanWindSpeed: '5.8 m/s',
        windDirection: 'NNE (030°)',
        meanCurrentSpeed: '0.24 m/s',
        currentDirection: 'SW (220°)',
        fieldResolution: '5 x 5 pts',
        cubeTimeSpan: '120 h',
        metoceanDetail: 'INCOIS + ECMWF Reanalysis / CMEMS PHY_001_024'
      },

      evidence: {
        oilPolygons: 18,
        lookAlikesExcluded: 0,
        opticalChipsCompared: 1,
        vesselsInTheBox: 14,
        passedTheFilter: 8,
        ensembleMembers: 50
      }
    };

    // 3. Scenario: Caspian Sea, Baku Offshore Field
    this.scenarios['OS-CASPIAN-20231014'] = {
      id: 'OS-CASPIAN-20231014',
      title: 'Caspian Sea, Baku Offshore Field (Biogenic Look-Alikes)',
      shortName: 'Caspian Sea, Baku offshore field',
      status: 'ACTIVE',
      locationName: 'Absheron Peninsula, South Caspian Basin',
      radarPassTime: '2023-10-14T02:44:45Z',
      radarPassTimeDisplay: '2023-10-14 02:44:45 UTC',
      sensor: 'Sentinel-1 IW GRD RTC',
      orbit: 'Descending (Track 064)',
      polarization: 'VV + VH',
      resolution: '10.0 m',
      detectorModel: 'U-Net (ResNet-34 Backbone)',
      confidence: 0.54,
      aisType: 'SIMULATED / SATELLITE AIS',
      aisSource: 'AIS: Caspian shipping corridor traffic with low radar contrast look-alikes.',
      mapCenter: [40.2500, 50.4000],
      zoom: 10,
      radarBBox: [[39.95, 49.90], [40.55, 50.90]],
      opticalBBox: [[40.10, 50.15], [40.40, 50.65]],
      sarImagePath: 'Picture36-2-1.png',
      opticalImagePath: '2026-04-07-00-00-2026-04-07-23-59-sentinel-2-l2a-highlight-optimized-natural-color.jpg',

      summary: {
        oilPolygonsCount: 4,
        totalAreaKm2: 1.18,
        largestAreaKm2: 0.55,
        vesselsScored: 5,
        candidateCount: 8,
        driftAgeHours: 5.2,
        originTimeDisplay: '2023-10-13 21:32:45 UTC',
        zoneRadiusKm: 4.1,
        zoneAreaKm2: 52.8,
        coastImpact: 'Stays offshore Baku archipelago',
        threatenedBox: '40.10°N to 40.35°N, 50.25°E to 50.60°E',
        pipelineLatencyMs: 38400
      },

      detection: {
        oilPolygons: 4,
        lookAlikes: 7,
        totalOilAreaKm2: 1.18,
        largestAreaKm2: 0.55,
        lengthKm: 1.45,
        widthKm: 0.65,
        perimeterKm: 5.20,
        orientationDeg: 85,
        compactness: 0.18,
        contrastDb: 1.8,
        confidence: 0.54,
        driftAgeProxyHours: 5.2,
        centroid: [40.2500, 50.4000],
        polygons: [
          {
            id: 'poly-cas-01',
            type: 'oil',
            confidence: 0.62,
            areaKm2: 0.55,
            contrastDb: 2.1,
            coordinates: [
              [40.260, 50.380], [40.255, 50.410], [40.245, 50.430],
              [40.235, 50.415], [40.240, 50.385], [40.260, 50.380]
            ]
          }
        ]
      },

      drift: {
        originTime: '2023-10-13T21:32:45Z',
        originTimeDisplay: '2023-10-13 21:32:45 UTC',
        originPosition: [40.2600, 50.3950],
        zoneRadiusKm: 4.1,
        bufferedRadiusKm: 5.5,
        zoneAreaKm2: 52.8,
        hoursBack: 5.2,
        ageProxy: '5.2 h drift proxy',
        windFactor: '0.030 of 10 m wind',
        deflection: '15 deg right',
        particlesCount: 50,
        forecastSpreadKm: 14.2,
        coastImpact: 'Stays offshore',
        threatenedBox: '40.10 to 40.35 N, 50.25 to 50.60 E',
        metoceanSource: 'Open-Meteo ERA5 + Caspian Sea Circulation Model',
        originZonePolygon: [
          [40.290, 50.360], [40.295, 50.430], [40.240, 50.440],
          [40.220, 50.370], [40.290, 50.360]
        ],
        backtrackPath: [
          [40.2500, 50.4000], [40.2550, 50.3980], [40.2600, 50.3950]
        ],
        hindcastCone: [
          [40.2500, 50.4000], [40.290, 50.360], [40.295, 50.430], [40.2500, 50.4000]
        ],
        forecastPath: [
          [40.2500, 50.4000], [40.2400, 50.4500], [40.2300, 50.5200]
        ],
        forecastCone: [
          [40.2500, 50.4000], [40.2600, 50.5000], [40.2100, 50.5500], [40.2500, 50.4000]
        ]
      },

      environmental: {
        meanWindSpeed: '3.6 m/s',
        windDirection: 'W (270°)',
        meanCurrentSpeed: '0.12 m/s',
        currentDirection: 'E (090°)',
        fieldResolution: '5 x 5 pts',
        cubeTimeSpan: '96 h',
        metoceanDetail: 'ERA5 Reanalysis + Caspian ROMS'
      },

      evidence: {
        oilPolygons: 4,
        lookAlikesExcluded: 7,
        opticalChipsCompared: 2,
        vesselsInTheBox: 8,
        passedTheFilter: 5,
        ensembleMembers: 50
      }
    };

    // 4. Scenario: Santa Barbara Natural Seep (Negative False-Positive Benchmark)
    this.scenarios['OS-SANTABARBARA-20230829'] = {
      id: 'OS-SANTABARBARA-20230829',
      title: 'Santa Barbara Channel Natural Seep (Clean Vessel Attribution)',
      shortName: 'Santa Barbara Channel natu...',
      status: 'NATURAL SEEP CONTROL / NO CULPRIT',
      locationName: 'Coal Oil Point Seep Field, Santa Barbara Channel',
      radarPassTime: '2023-08-29T01:59:10Z',
      radarPassTimeDisplay: '2023-08-29 01:59:10 UTC',
      sensor: 'Sentinel-1 IW GRD RTC',
      orbit: 'Ascending (Track 115)',
      polarization: 'VV + VH',
      resolution: '10.0 m',
      detectorModel: 'U-Net (ResNet-34 Backbone)',
      confidence: 0.89,
      aisType: 'RECORDED AIS',
      aisSource: 'AIS: recorded US Coast Guard NAIS with USGS Seep catalog cross-check.',
      mapCenter: [34.3500, -119.8800],
      zoom: 11,
      radarBBox: [[34.15, -120.15], [34.55, -119.60]],
      opticalBBox: [[34.25, -120.00], [34.45, -119.75]],
      sarImagePath: 'Picture36-2-1.png',
      opticalImagePath: '2026-04-07-00-00-2026-04-07-23-59-sentinel-2-l2a-highlight-optimized-natural-color.jpg',

      summary: {
        oilPolygonsCount: 12,
        totalAreaKm2: 2.64,
        largestAreaKm2: 0.72,
        vesselsScored: 9,
        candidateCount: 9,
        driftAgeHours: 6.0,
        originTimeDisplay: '2023-08-28 19:59:10 UTC',
        zoneRadiusKm: 2.5,
        zoneAreaKm2: 19.6,
        coastImpact: 'Natural seep line offshore Goleta',
        threatenedBox: '34.30°N to 34.42°N, 119.95°W to 119.80°W',
        pipelineLatencyMs: 41900
      },

      detection: {
        oilPolygons: 12,
        lookAlikes: 0,
        totalOilAreaKm2: 2.64,
        largestAreaKm2: 0.72,
        lengthKm: 3.20,
        widthKm: 0.85,
        perimeterKm: 8.40,
        orientationDeg: 280,
        compactness: 0.11,
        contrastDb: 6.2,
        confidence: 0.89,
        driftAgeProxyHours: 6.0,
        centroid: [34.3500, -119.8800],
        polygons: [
          {
            id: 'poly-sb-01',
            type: 'oil',
            confidence: 0.93,
            areaKm2: 0.72,
            contrastDb: 6.5,
            coordinates: [
              [34.360, -119.850], [34.355, -119.875], [34.348, -119.910],
              [34.342, -119.905], [34.350, -119.870], [34.360, -119.850]
            ]
          }
        ]
      },

      drift: {
        originTime: '2023-08-28T19:59:10Z',
        originTimeDisplay: '2023-08-28 19:59:10 UTC',
        originPosition: [34.3820, -119.8450],
        zoneRadiusKm: 2.5,
        bufferedRadiusKm: 3.5,
        zoneAreaKm2: 19.6,
        hoursBack: 6.0,
        ageProxy: '6.0 h drift proxy (Geological vent origin)',
        windFactor: '0.030 of 10 m wind',
        deflection: '15 deg right',
        particlesCount: 50,
        forecastSpreadKm: 8.5,
        coastImpact: 'Remains in channel',
        threatenedBox: '34.30 to 34.42 N, 119.95 to 119.80 W',
        metoceanSource: 'Open-Meteo ERA5 + SCCOOS ROMS Coastal Currents',
        originZonePolygon: [
          [34.395, -119.860], [34.390, -119.830], [34.370, -119.832],
          [34.372, -119.865], [34.395, -119.860]
        ],
        backtrackPath: [
          [34.3500, -119.8800], [34.3650, -119.8620], [34.3820, -119.8450]
        ],
        hindcastCone: [
          [34.3500, -119.8800], [34.370, -119.855], [34.395, -119.860], [34.3500, -119.8800]
        ],
        forecastPath: [
          [34.3500, -119.8800], [34.3350, -119.9100], [34.3200, -119.9500]
        ],
        forecastCone: [
          [34.3500, -119.8800], [34.320, -119.890], [34.300, -119.960], [34.3500, -119.8800]
        ]
      },

      environmental: {
        meanWindSpeed: '4.9 m/s',
        windDirection: 'WNW (285°)',
        meanCurrentSpeed: '0.14 m/s',
        currentDirection: 'W (270°)',
        fieldResolution: '5 x 5 pts',
        cubeTimeSpan: '72 h',
        metoceanDetail: 'SCCOOS ROMS + ERA5 10 m wind'
      },

      evidence: {
        oilPolygons: 12,
        lookAlikesExcluded: 0,
        opticalChipsCompared: 1,
        vesselsInTheBox: 12,
        passedTheFilter: 9,
        ensembleMembers: 50
      }
    };

    // 5. Scenario: Clean Indian Ocean Patrol Pass (Negative Baseline)
    this.scenarios['OS-CLEAN-INDIANOCEAN'] = {
      id: 'OS-CLEAN-INDIANOCEAN',
      title: 'Indian Ocean Patrol Pass (Clean Scene / Negative Control)',
      shortName: 'Indian Ocean Patrol, Clean...',
      status: 'CLEAN SCENE / NO OIL DETECTED',
      locationName: 'Bay of Bengal / Andaman Sea Corridor',
      radarPassTime: '2024-05-18T04:12:00Z',
      radarPassTimeDisplay: '2024-05-18 04:12:00 UTC',
      sensor: 'Sentinel-1 IW GRD RTC',
      orbit: 'Descending (Track 088)',
      polarization: 'VV + VH',
      resolution: '10.0 m',
      detectorModel: 'U-Net (ResNet-34 Backbone)',
      confidence: 0.99,
      aisType: 'RECORDED AIS',
      aisSource: 'AIS: normal transiting commercial traffic in sea lane.',
      isCleanScene: true,
      mapCenter: [11.8500, 91.2000],
      zoom: 9,
      radarBBox: [[11.20, 90.60], [12.50, 91.80]],
      opticalBBox: [[11.50, 90.90], [12.20, 91.50]],
      sarImagePath: 'Picture36-2-1.png',
      opticalImagePath: '2026-04-07-00-00-2026-04-07-23-59-sentinel-2-l2a-highlight-optimized-natural-color.jpg',

      summary: {
        oilPolygonsCount: 0,
        totalAreaKm2: 0.00,
        largestAreaKm2: 0.00,
        vesselsScored: 0,
        candidateCount: 0,
        driftAgeHours: 0,
        originTimeDisplay: 'N/A (Clean Water)',
        zoneRadiusKm: 0,
        zoneAreaKm2: 0,
        coastImpact: 'Clean Water — No threat',
        threatenedBox: 'N/A',
        pipelineLatencyMs: 18400
      },

      detection: {
        oilPolygons: 0,
        lookAlikes: 0,
        totalOilAreaKm2: 0.0,
        largestAreaKm2: 0.0,
        lengthKm: 0.0,
        widthKm: 0.0,
        perimeterKm: 0.0,
        orientationDeg: 0,
        compactness: 0.0,
        contrastDb: 0.2,
        confidence: 0.99,
        driftAgeProxyHours: 0.0,
        centroid: [11.8500, 91.2000],
        polygons: []
      },

      drift: {
        originTime: null,
        originTimeDisplay: 'N/A (Clean Water)',
        originPosition: [11.8500, 91.2000],
        zoneRadiusKm: 0,
        bufferedRadiusKm: 0,
        zoneAreaKm2: 0,
        hoursBack: 0,
        ageProxy: 'N/A',
        windFactor: '0.030 of 10 m wind',
        deflection: '15 deg right',
        particlesCount: 0,
        forecastSpreadKm: 0,
        coastImpact: 'No Slick Detected',
        threatenedBox: 'N/A',
        metoceanSource: 'Open-Meteo ERA5 10 m wind + CMEMS Bay of Bengal',
        originZonePolygon: [],
        backtrackPath: [],
        hindcastCone: [],
        forecastPath: [],
        forecastCone: []
      },

      environmental: {
        meanWindSpeed: '6.2 m/s',
        windDirection: 'SW (225°)',
        meanCurrentSpeed: '0.31 m/s',
        currentDirection: 'NE (045°)',
        fieldResolution: '5 x 5 pts',
        cubeTimeSpan: '48 h',
        metoceanDetail: 'Open-Meteo ERA5 + INCOIS Bay of Bengal Model'
      },

      evidence: {
        oilPolygons: 0,
        lookAlikesExcluded: 0,
        opticalChipsCompared: 1,
        vesselsInTheBox: 18,
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
