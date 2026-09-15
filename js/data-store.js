/**
 * WebEye - SIH26143 Advanced Maritime Intelligence Console
 * Data Store: Comprehensive datasets for SAR scenes, detection geometries,
 * metocean conditions, backtrack drift models, and expanded AIS vessel fleets.
 */

const SCENARIOS_DATA = {
  'OS-GOMMC-20230924': {
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
    detectorVersion: 'v2.4.1-ntro-tuned',
    confidence: 0.73,
    aisType: 'RECORDED AIS',
    aisSource: 'AIS: all 12 candidate vessels came from real recorded tracks (marinecadastre).',
    isCleanScene: false,
    hasAmbiguousLookalike: false,
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
      pipelineLatencyMs: 51800,
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
      checkpointMetrics: {
        iouOil: 0.9420,
        iouLookAlike: 'N/A',
        pixelAccuracy: 0.9912
      },
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
      metoceanSource: 'Open-Meteo ERA5 10 m wind + CMEMS GLOBAL_ANALYSISFORECAST_PHY_001_024 currents (cached 2026-09-05)',
      
      originZonePolygon: [
        [29.215, -88.845],
        [29.185, -88.705],
        [29.055, -88.715],
        [29.040, -88.835],
        [29.115, -88.880],
        [29.215, -88.845]
      ],
      
      backtrackPath: [
        [28.9384, -88.9335],
        [28.9850, -88.8950],
        [29.0400, -88.8450],
        [29.0850, -88.8100],
        [29.1238, -88.7848]
      ],

      hindcastCone: [
        [28.9384, -88.9335],
        [29.020, -88.810],
        [29.215, -88.845],
        [29.185, -88.705],
        [29.055, -88.715],
        [28.9384, -88.9335]
      ],

      forecastPath: [
        [28.9384, -88.9335],
        [28.8700, -88.9800],
        [28.7900, -89.0400],
        [28.7100, -89.1200],
        [28.6500, -89.2100]
      ],

      forecastCone: [
        [28.9384, -88.9335],
        [28.830, -88.870],
        [28.680, -89.020],
        [28.580, -89.280],
        [28.690, -89.390],
        [28.820, -89.180],
        [28.9384, -88.9335]
      ]
    },

    environmental: {
      meanWindSpeed: '4.3 m/s',
      windDirection: 'ESE (115°)',
      meanCurrentSpeed: '0.18 m/s',
      currentDirection: 'SSE (160°)',
      fieldResolution: '5 x 5 pts',
      cubeTimeSpan: '144 h',
      metoceanDetail: 'Open-Meteo ERA5 10 m wind + CMEMS GLOBAL_ANALYSISFORECAST_PHY_001_024 currents (cached 2026-09-05)'
    },

    pipeline: {
      totalMs: 51800,
      stages: [
        { name: 'DETECT', ms: 30330, pct: 58.5, label: 'SAR Patch Ingestion & Deep U-Net Segmentation' },
        { name: 'CHAR', ms: 993, pct: 1.9, label: 'Polygonization & Spatial Feature Extraction' },
        { name: 'EO', ms: 15501, pct: 29.9, label: 'Sentinel-2 Multi-Spectral Cross-Validation' },
        { name: 'RENDER', ms: 156, pct: 0.3, label: 'GeoJSON Rasterization & Vector Tile Bake' },
        { name: 'METOCEAN', ms: 3, pct: 0.01, label: 'ERA5/CMEMS Local Spatio-Temporal Slicing' },
        { name: 'HINDCAST', ms: 708, pct: 1.4, label: 'Runge-Kutta 4 Backward Lagrangian Dispersion' },
        { name: 'FORECAST', ms: 591, pct: 1.1, label: 'Runge-Kutta 4 Forward Oil Drift Prediction' },
        { name: 'COAST', ms: 0, pct: 0.0, label: 'Coastline Geometric Collision Intersection' }
      ]
    },

    uncertaintyCurve: [
      { hour: 0, km: 0.8 },
      { hour: -6, km: 4.5 },
      { hour: -11, km: 8.3, isOrigin: true },
      { hour: -18, km: 13.9 },
      { hour: -24, km: 18.2 },
      { hour: -36, km: 26.8 },
      { hour: -48, km: 35.0 }
    ],

    evidence: {
      oilPolygons: 29,
      lookAlikesExcluded: 0,
      opticalChipsCompared: 1,
      vesselsInTheBox: 20,
      passedTheFilter: 12,
      ensembleMembers: 50
    },

    // Expanded fleet of 12 candidate vessels + nearby random vessels
    vessels: [
      {
        id: 'vessel-01',
        rank: 1,
        name: 'PACIFIC VOYAGER',
        mmsi: '356892000',
        imo: '9481235',
        callsign: '3FYE2',
        flag: 'Panama 🇵🇦',
        vesselType: 'Crude Oil Tanker',
        typeCategory: 'tanker',
        lengthM: 274,
        beamM: 48,
        draughtM: 15.2,
        destination: 'LOOP TERMINAL GOM',
        status: 'PRIMARY SUSPECT',
        statusLevel: 'critical',
        dataIntegrity: 'REAL AIS PINGS',
        pingCount: 142,
        pingRatePerHour: 14.2,
        hasDeadReckoningGap: false,
        totalScore: 94.2,
        subScores: { proximity: 98, timing: 95, trajectory: 92, vesselType: 96, behavior: 90 },
        metricsAtOrigin: { closestDistKm: 0.42, timeDeltaMin: -8, speedKnots: 8.1, prevSpeedKnots: 14.4, headingDeg: 148, slickOrientationDeg: 149 },
        reasonCodes: [
          { code: 'PROX-CRITICAL', level: 'crit', text: 'Transited within 420m of backward-calculated origin centroid at t0.' },
          { code: 'COURSE-MATCH', level: 'crit', text: 'Vessel heading 148° aligns within 1° of primary slick elongation axis (149°).' },
          { code: 'SPEED-ANOMALY', level: 'warn', text: 'Unscheduled speed drop (14.4 -> 8.1 kn) coincident with estimated discharge time.' },
          { code: 'HIGH-RISK-TYPE', level: 'info', text: 'Crude Oil Tanker in laden-to-ballast transit corridor.' },
          { code: 'REAL-PING-VALIDATED', level: 'info', text: 'Continuous real AIS pings (14.2 pings/hr) eliminate positional ambiguity.' }
        ],
        track: [
          { time: '2023-09-22T00:00:00Z', lat: 29.58, lon: -88.40, speed: 14.5, heading: 215, type: 'ping' },
          { time: '2023-09-22T12:00:00Z', lat: 29.38, lon: -88.58, speed: 14.3, heading: 210, type: 'ping' },
          { time: '2023-09-23T06:00:00Z', lat: 29.24, lon: -88.70, speed: 14.4, heading: 175, type: 'ping' },
          { time: '2023-09-23T12:00:00Z', lat: 29.14, lon: -88.77, speed: 10.2, heading: 152, type: 'ping' },
          { time: '2023-09-23T13:02:27Z', lat: 29.124, lon: -88.785, speed: 8.1, heading: 148, type: 'ping', isOriginMatch: true },
          { time: '2023-09-23T18:00:00Z', lat: 29.02, lon: -88.85, speed: 13.8, heading: 145, type: 'ping' },
          { time: '2023-09-24T00:02:27Z', lat: 28.88, lon: -88.96, speed: 14.1, heading: 140, type: 'ping', isRadarPass: true },
          { time: '2023-09-24T12:00:00Z', lat: 28.62, lon: -89.18, speed: 14.2, heading: 138, type: 'ping' },
          { time: '2023-09-25T00:00:00Z', lat: 28.32, lon: -89.45, speed: 14.0, heading: 135, type: 'ping' }
        ]
      },
      {
        id: 'vessel-02',
        rank: 2,
        name: 'STOLT CONFIDENCE',
        mmsi: '235087410',
        imo: '9312874',
        callsign: '2CDE4',
        flag: 'United Kingdom 🇬🇧',
        vesselType: 'Chemical / Product Tanker',
        typeCategory: 'tanker',
        lengthM: 182,
        beamM: 28,
        draughtM: 10.4,
        destination: 'HOUSTON TX',
        status: 'PERSON OF INTEREST',
        statusLevel: 'warning',
        dataIntegrity: 'REAL AIS PINGS',
        pingCount: 118,
        pingRatePerHour: 11.8,
        hasDeadReckoningGap: false,
        totalScore: 68.5,
        subScores: { proximity: 72, timing: 64, trajectory: 70, vesselType: 88, behavior: 55 },
        metricsAtOrigin: { closestDistKm: 3.84, timeDeltaMin: 145, speedKnots: 12.8, prevSpeedKnots: 13.0, headingDeg: 165, slickOrientationDeg: 149 },
        reasonCodes: [
          { code: 'PROX-MODERATE', level: 'warn', text: 'Passed within 3.84 km of origin boundary zone.' },
          { code: 'TIME-LAG', level: 'info', text: 'Temporal separation is +2.4 hours from computed release centroid.' },
          { code: 'STEADY-SPEED', level: 'info', text: 'Maintained steady 12.8 knots cruise through corridor.' }
        ],
        track: [
          { time: '2023-09-22T00:00:00Z', lat: 29.62, lon: -88.25, speed: 13.1, heading: 220, type: 'ping' },
          { time: '2023-09-23T06:00:00Z', lat: 29.35, lon: -88.52, speed: 13.0, heading: 215, type: 'ping' },
          { time: '2023-09-23T13:02:27Z', lat: 29.20, lon: -88.72, speed: 12.8, heading: 165, type: 'ping' },
          { time: '2023-09-23T15:30:00Z', lat: 29.15, lon: -88.75, speed: 12.8, heading: 165, type: 'ping' },
          { time: '2023-09-24T00:02:27Z', lat: 28.95, lon: -88.88, speed: 12.9, heading: 160, type: 'ping', isRadarPass: true },
          { time: '2023-09-24T18:00:00Z', lat: 28.60, lon: -89.15, speed: 13.0, heading: 155, type: 'ping' }
        ]
      },
      {
        id: 'vessel-03',
        rank: 3,
        name: 'OCEAN TITAN',
        mmsi: '412399120',
        imo: '9604512',
        callsign: 'BHOX9',
        flag: 'China 🇨🇳',
        vesselType: 'Bulk Carrier',
        typeCategory: 'cargo',
        lengthM: 225,
        beamM: 32,
        draughtM: 12.1,
        destination: 'NEW ORLEANS',
        status: 'SUSPECT (AIS GAP)',
        statusLevel: 'warning',
        dataIntegrity: 'DEAD RECKONING WARNING',
        pingCount: 22,
        pingRatePerHour: 2.1,
        hasDeadReckoningGap: true,
        gapDurationHours: 4.2,
        totalScore: 42.1,
        subScores: { proximity: 58, timing: 48, trajectory: 35, vesselType: 40, behavior: 30 },
        metricsAtOrigin: { closestDistKm: 5.60, timeDeltaMin: -210, speedKnots: 11.5, prevSpeedKnots: 11.5, headingDeg: 230, slickOrientationDeg: 149 },
        reasonCodes: [
          { code: 'DR-WARNING', level: 'warn', text: '4.2h AIS transmission gap during transit across origin envelope.' },
          { code: 'COURSE-MISALIGN', level: 'info', text: 'Transverse course (230°) orthogonal to slick dispersion axis (149°).' },
          { code: 'LOW-HAZARD-CLASS', level: 'info', text: 'Dry bulk carrier, secondary bilge discharge hazard.' }
        ],
        track: [
          { time: '2023-09-22T06:00:00Z', lat: 29.45, lon: -88.30, speed: 11.6, heading: 235, type: 'ping' },
          { time: '2023-09-23T09:30:00Z', lat: 29.28, lon: -88.62, speed: 11.5, heading: 230, type: 'ping' },
          { time: '2023-09-23T13:02:27Z', lat: 29.17, lon: -88.82, speed: 11.5, heading: 230, type: 'dr' },
          { time: '2023-09-23T14:00:00Z', lat: 29.12, lon: -88.92, speed: 11.5, heading: 230, type: 'dr' },
          { time: '2023-09-23T17:45:00Z', lat: 29.05, lon: -89.15, speed: 11.4, heading: 228, type: 'ping' },
          { time: '2023-09-24T00:02:27Z', lat: 28.92, lon: -89.38, speed: 11.3, heading: 225, type: 'ping', isRadarPass: true }
        ]
      },
      {
        id: 'vessel-04',
        rank: 4,
        name: 'ATLANTIC HORIZON',
        mmsi: '211892000',
        imo: '9428710',
        callsign: 'DFAB3',
        flag: 'Germany 🇩🇪',
        vesselType: 'Oil Products Tanker',
        typeCategory: 'tanker',
        lengthM: 195,
        beamM: 30,
        draughtM: 11.2,
        destination: 'CORPUS CHRISTI',
        status: 'PERSON OF INTEREST',
        statusLevel: 'warning',
        dataIntegrity: 'REAL AIS PINGS',
        pingCount: 130,
        pingRatePerHour: 13.0,
        hasDeadReckoningGap: false,
        totalScore: 34.5,
        subScores: { proximity: 40, timing: 32, trajectory: 28, vesselType: 85, behavior: 25 },
        metricsAtOrigin: { closestDistKm: 7.8, timeDeltaMin: 310, speedKnots: 13.6, prevSpeedKnots: 13.7, headingDeg: 260, slickOrientationDeg: 149 },
        reasonCodes: [
          { code: 'DISTANT-TRACK', level: 'info', text: 'Transited 7.8 km south of computed origin envelope.' },
          { code: 'HIGH-HAZARD-TYPE', level: 'warn', text: 'Product tanker carrying refined distillates.' }
        ],
        track: [
          { time: '2023-09-23T06:00:00Z', lat: 29.05, lon: -88.20, speed: 13.8, heading: 260, type: 'ping' },
          { time: '2023-09-23T13:02:27Z', lat: 29.02, lon: -88.68, speed: 13.6, heading: 260, type: 'ping' },
          { time: '2023-09-24T00:02:27Z', lat: 28.98, lon: -89.40, speed: 13.5, heading: 260, type: 'ping', isRadarPass: true }
        ]
      },
      {
        id: 'vessel-05',
        rank: 5,
        name: 'VALIANT SEAS',
        mmsi: '636019280',
        imo: '9512390',
        callsign: 'A8LK9',
        flag: 'Liberia 🇱🇷',
        vesselType: 'Crude Oil Tanker',
        typeCategory: 'tanker',
        lengthM: 250,
        beamM: 44,
        draughtM: 14.8,
        destination: 'GALVESTON OFFSHORE',
        status: 'EXCLUDED',
        statusLevel: 'excluded',
        dataIntegrity: 'REAL AIS PINGS',
        pingCount: 155,
        pingRatePerHour: 15.5,
        hasDeadReckoningGap: false,
        totalScore: 28.0,
        subScores: { proximity: 25, timing: 20, trajectory: 18, vesselType: 96, behavior: 15 },
        metricsAtOrigin: { closestDistKm: 11.2, timeDeltaMin: -420, speedKnots: 14.8, prevSpeedKnots: 14.8, headingDeg: 245, slickOrientationDeg: 149 },
        reasonCodes: [
          { code: 'TEMPORAL-SEPARATION', level: 'info', text: 'Transited zone 7.0 hours prior to calculated discharge epoch.' }
        ],
        track: [
          { time: '2023-09-22T18:00:00Z', lat: 29.40, lon: -88.10, speed: 14.9, heading: 245, type: 'ping' },
          { time: '2023-09-23T06:00:00Z', lat: 29.18, lon: -88.65, speed: 14.8, heading: 245, type: 'ping' },
          { time: '2023-09-24T00:02:27Z', lat: 28.85, lon: -89.50, speed: 14.7, heading: 245, type: 'ping', isRadarPass: true }
        ]
      },
      {
        id: 'vessel-06',
        rank: 6,
        name: 'EAGLE PASS',
        mmsi: '563012990',
        imo: '9389201',
        callsign: '9V891',
        flag: 'Singapore 🇸🇬',
        vesselType: 'Bulk Carrier',
        typeCategory: 'cargo',
        lengthM: 228,
        beamM: 32,
        draughtM: 12.5,
        destination: 'BATON ROUGE',
        status: 'EXCLUDED',
        statusLevel: 'excluded',
        dataIntegrity: 'REAL AIS PINGS',
        pingCount: 122,
        pingRatePerHour: 12.2,
        hasDeadReckoningGap: false,
        totalScore: 18.2,
        subScores: { proximity: 22, timing: 18, trajectory: 15, vesselType: 40, behavior: 12 },
        metricsAtOrigin: { closestDistKm: 13.5, timeDeltaMin: 220, speedKnots: 12.2, prevSpeedKnots: 12.2, headingDeg: 310, slickOrientationDeg: 149 },
        reasonCodes: [
          { code: 'COURSE-MISALIGN', level: 'info', text: 'Northbound inbound approach course to Mississippi River.' }
        ],
        track: [
          { time: '2023-09-23T06:00:00Z', lat: 28.75, lon: -88.60, speed: 12.3, heading: 310, type: 'ping' },
          { time: '2023-09-23T16:00:00Z', lat: 29.15, lon: -89.05, speed: 12.2, heading: 310, type: 'ping' },
          { time: '2023-09-24T00:02:27Z', lat: 29.40, lon: -89.35, speed: 12.0, heading: 310, type: 'ping', isRadarPass: true }
        ]
      },
      {
        id: 'vessel-07',
        rank: 7,
        name: 'SEA RUNNER',
        mmsi: '538009112',
        imo: '9287311',
        callsign: 'V7AB8',
        flag: 'Marshall Islands 🇲🇭',
        vesselType: 'Container Ship',
        typeCategory: 'cargo',
        lengthM: 294,
        beamM: 40,
        draughtM: 13.0,
        destination: 'MOBILE AL',
        status: 'EXCLUDED',
        statusLevel: 'excluded',
        dataIntegrity: 'REAL AIS PINGS',
        pingCount: 165,
        pingRatePerHour: 16.5,
        hasDeadReckoningGap: false,
        totalScore: 14.0,
        subScores: { proximity: 18, timing: 15, trajectory: 12, vesselType: 20, behavior: 10 },
        metricsAtOrigin: { closestDistKm: 14.2, timeDeltaMin: 380, speedKnots: 18.2, prevSpeedKnots: 18.1, headingDeg: 045, slickOrientationDeg: 149 },
        reasonCodes: [
          { code: 'SPATIAL-EXCLUSION', level: 'info', text: 'Passed 14.2 km east of estimated release envelope.' }
        ],
        track: [
          { time: '2023-09-23T00:00:00Z', lat: 28.70, lon: -88.85, speed: 18.2, heading: 045, type: 'ping' },
          { time: '2023-09-23T13:02:27Z', lat: 29.28, lon: -88.58, speed: 18.1, heading: 045, type: 'ping' },
          { time: '2023-09-24T00:02:27Z', lat: 29.80, lon: -88.30, speed: 18.0, heading: 040, type: 'ping', isRadarPass: true }
        ]
      },
      {
        id: 'vessel-08',
        rank: 8,
        name: 'GULF HARVESTER',
        mmsi: '367991200',
        imo: '8891022',
        callsign: 'WDH22',
        flag: 'United States 🇺🇸',
        vesselType: 'Commercial Fishing',
        typeCategory: 'fishing',
        lengthM: 38,
        beamM: 9,
        draughtM: 3.2,
        destination: 'VENICE LA',
        status: 'EXCLUDED',
        statusLevel: 'excluded',
        dataIntegrity: 'REAL AIS PINGS',
        pingCount: 80,
        pingRatePerHour: 8.0,
        hasDeadReckoningGap: false,
        totalScore: 11.8,
        subScores: { proximity: 20, timing: 15, trajectory: 10, vesselType: 15, behavior: 8 },
        metricsAtOrigin: { closestDistKm: 15.0, timeDeltaMin: -60, speedKnots: 7.2, prevSpeedKnots: 7.0, headingDeg: 180, slickOrientationDeg: 149 },
        reasonCodes: [
          { code: 'LOW-HAZARD-FISHING', level: 'info', text: 'Shrimp trawler operating inshore shallow shelf.' }
        ],
        track: [
          { time: '2023-09-23T08:00:00Z', lat: 29.25, lon: -89.10, speed: 7.2, heading: 180, type: 'ping' },
          { time: '2023-09-23T13:02:27Z', lat: 29.10, lon: -89.10, speed: 7.1, heading: 180, type: 'ping' },
          { time: '2023-09-24T00:02:27Z', lat: 28.95, lon: -89.10, speed: 7.0, heading: 180, type: 'ping', isRadarPass: true }
        ]
      },
      {
        id: 'vessel-09',
        rank: 9,
        name: 'BLUE GULF',
        mmsi: '367123990',
        imo: '9781122',
        callsign: 'WDD41',
        flag: 'United States 🇺🇸',
        vesselType: 'Offshore Supply Ship',
        typeCategory: 'supply',
        lengthM: 85,
        beamM: 18,
        draughtM: 5.5,
        destination: 'MISSISSIPPI CANYON 20',
        status: 'EXCLUDED',
        statusLevel: 'excluded',
        dataIntegrity: 'REAL AIS PINGS',
        pingCount: 198,
        pingRatePerHour: 22.0,
        hasDeadReckoningGap: false,
        totalScore: 8.5,
        subScores: { proximity: 12, timing: 10, trajectory: 5, vesselType: 15, behavior: 5 },
        metricsAtOrigin: { closestDistKm: 18.6, timeDeltaMin: 0, speedKnots: 0.2, prevSpeedKnots: 0.1, headingDeg: 0, slickOrientationDeg: 149 },
        reasonCodes: [
          { code: 'STATIONARY-MOORED', level: 'info', text: 'Stationary platform tender, dynamic positioning moored 18.6 km west.' }
        ],
        track: [
          { time: '2023-09-23T00:00:00Z', lat: 28.98, lon: -89.15, speed: 0.2, heading: 0, type: 'ping' },
          { time: '2023-09-23T13:02:27Z', lat: 28.98, lon: -89.15, speed: 0.1, heading: 0, type: 'ping' },
          { time: '2023-09-24T00:02:27Z', lat: 28.98, lon: -89.15, speed: 0.2, heading: 0, type: 'ping', isRadarPass: true }
        ]
      },
      {
        id: 'vessel-10',
        rank: 10,
        name: 'MISSISSIPPI PIONEER',
        mmsi: '368192830',
        imo: '8912099',
        callsign: 'WCP91',
        flag: 'United States 🇺🇸',
        vesselType: 'Tug / Workboat',
        typeCategory: 'tug',
        lengthM: 42,
        beamM: 11,
        draughtM: 4.1,
        destination: 'SOUTHWEST PASS',
        status: 'EXCLUDED',
        statusLevel: 'excluded',
        dataIntegrity: 'REAL AIS PINGS',
        pingCount: 110,
        pingRatePerHour: 11.0,
        hasDeadReckoningGap: false,
        totalScore: 7.2,
        subScores: { proximity: 10, timing: 8, trajectory: 5, vesselType: 10, behavior: 5 },
        metricsAtOrigin: { closestDistKm: 21.0, timeDeltaMin: 180, speedKnots: 9.0, prevSpeedKnots: 9.0, headingDeg: 005, slickOrientationDeg: 149 },
        reasonCodes: [
          { code: 'LOCAL-HARBOR-CRAFT', level: 'info', text: 'River pilot pushboat transiting river entrance.' }
        ],
        track: [
          { time: '2023-09-23T06:00:00Z', lat: 28.85, lon: -89.35, speed: 9.1, heading: 005, type: 'ping' },
          { time: '2023-09-23T16:00:00Z', lat: 29.10, lon: -89.33, speed: 9.0, heading: 005, type: 'ping' },
          { time: '2023-09-24T00:02:27Z', lat: 29.35, lon: -89.30, speed: 8.8, heading: 005, type: 'ping', isRadarPass: true }
        ]
      },
      {
        id: 'vessel-11',
        rank: 11,
        name: 'DELTA EXPLORER',
        mmsi: '338192001',
        imo: '9609122',
        callsign: 'WDE88',
        flag: 'United States 🇺🇸',
        vesselType: 'Research / Survey',
        typeCategory: 'survey',
        lengthM: 68,
        beamM: 14,
        draughtM: 4.5,
        destination: 'SURVEY BLOCK 48',
        status: 'EXCLUDED',
        statusLevel: 'excluded',
        dataIntegrity: 'REAL AIS PINGS',
        pingCount: 95,
        pingRatePerHour: 9.5,
        hasDeadReckoningGap: false,
        totalScore: 6.4,
        subScores: { proximity: 8, timing: 6, trajectory: 4, vesselType: 10, behavior: 5 },
        metricsAtOrigin: { closestDistKm: 24.5, timeDeltaMin: -300, speedKnots: 5.5, prevSpeedKnots: 5.5, headingDeg: 090, slickOrientationDeg: 149 },
        reasonCodes: [
          { code: 'SURVEY-GRID', level: 'info', text: 'Scientific bathymetry survey pattern outside incident sector.' }
        ],
        track: [
          { time: '2023-09-23T00:00:00Z', lat: 28.70, lon: -88.35, speed: 5.5, heading: 090, type: 'ping' },
          { time: '2023-09-23T13:02:27Z', lat: 28.70, lon: -88.15, speed: 5.5, heading: 090, type: 'ping' },
          { time: '2023-09-24T00:02:27Z', lat: 28.70, lon: -87.95, speed: 5.4, heading: 090, type: 'ping', isRadarPass: true }
        ]
      },
      {
        id: 'vessel-12',
        rank: 12,
        name: 'CAJUN PATRIOT',
        mmsi: '367440120',
        imo: '8994410',
        callsign: 'WCP12',
        flag: 'United States 🇺🇸',
        vesselType: 'Crew Boat / Fast Tender',
        typeCategory: 'supply',
        lengthM: 52,
        beamM: 10,
        draughtM: 2.8,
        destination: 'FOURCHON LA',
        status: 'EXCLUDED',
        statusLevel: 'excluded',
        dataIntegrity: 'REAL AIS PINGS',
        pingCount: 140,
        pingRatePerHour: 14.0,
        hasDeadReckoningGap: false,
        totalScore: 5.1,
        subScores: { proximity: 6, timing: 5, trajectory: 4, vesselType: 10, behavior: 4 },
        metricsAtOrigin: { closestDistKm: 26.8, timeDeltaMin: 120, speedKnots: 22.5, prevSpeedKnots: 22.5, headingDeg: 330, slickOrientationDeg: 149 },
        reasonCodes: [
          { code: 'HIGH-SPEED-TRANSIT', level: 'info', text: 'Fast aluminum crew boat cruising at 22.5 knots to coastal base.' }
        ],
        track: [
          { time: '2023-09-23T08:00:00Z', lat: 28.60, lon: -89.50, speed: 22.5, heading: 330, type: 'ping' },
          { time: '2023-09-23T15:00:00Z', lat: 29.05, lon: -89.80, speed: 22.4, heading: 330, type: 'ping' },
          { time: '2023-09-24T00:02:27Z', lat: 29.30, lon: -90.00, speed: 22.0, heading: 330, type: 'ping', isRadarPass: true }
        ]
      }
    ],

    // Additional 8 non-candidate background vessels roaming the Gulf (for high visual realism)
    backgroundTraffic: [
      { name: 'GULF EXPRESS', mmsi: '367001120', type: 'Cargo', lat: 29.45, lon: -88.15, heading: 240, speed: 15.2 },
      { name: 'SOUTHERN STAR', mmsi: '368002230', type: 'Tug', lat: 29.35, lon: -89.45, heading: 110, speed: 8.4 },
      { name: 'PELICAN 4', mmsi: '369003340', type: 'Fishing', lat: 28.65, lon: -89.20, heading: 045, speed: 6.8 },
      { name: 'SEACOR PRIDE', mmsi: '367004450', type: 'Supply', lat: 28.80, lon: -88.40, heading: 180, speed: 12.0 },
      { name: 'TEXAS EXPLORER', mmsi: '338005560', type: 'Survey', lat: 29.50, lon: -88.80, heading: 090, speed: 4.8 },
      { name: 'ISLAND BREEZE', mmsi: '367006670', type: 'Crew', lat: 29.20, lon: -89.60, heading: 315, speed: 21.0 },
      { name: 'ORION TANKER', mmsi: '636007780', type: 'Tanker', lat: 28.45, lon: -88.60, heading: 130, speed: 14.1 },
      { name: 'DELTA COURIER', mmsi: '367008890', type: 'Cargo', lat: 28.75, lon: -89.70, heading: 080, speed: 13.9 }
    ]
  },

  'OS-MUMBAI-20240313': {
    id: 'OS-MUMBAI-20240313',
    title: 'Arabian Sea, Mumbai Offshore Tanker Corridor',
    shortName: 'Arabian Sea, Mumbai offshor...',
    status: 'ACTIVE',
    locationName: 'Mumbai High Offshore Corridor, Arabian Sea',
    radarPassTime: '2024-03-13T01:03:42Z',
    radarPassTimeDisplay: '2024-03-13 01:03:42 UTC',
    sensor: 'Sentinel-1 IW GRD RTC',
    orbit: 'Ascending (Track 064)',
    polarization: 'VV + VH',
    resolution: '10.0 m',
    detectorModel: 'U-Net (ResNet-34 Backbone)',
    detectorVersion: 'v2.4.1-ntro-tuned',
    confidence: 0.81,
    aisType: 'SIMULATED AIS',
    aisSource: 'AIS: 8 candidate vessels synthesized from Indian EEZ traffic density matrix.',
    isCleanScene: false,
    hasAmbiguousLookalike: false,
    mapCenter: [19.2500, 71.4000],
    zoom: 10,
    radarBBox: [[18.85, 70.95], [19.65, 71.85]],
    
    summary: {
      oilPolygonsCount: 18,
      totalAreaKm2: 3.82,
      largestAreaKm2: 0.95,
      vesselsScored: 8,
      candidateCount: 8,
      driftAgeHours: 8.5,
      originTimeDisplay: '2024-03-12 16:33:42 UTC',
      zoneRadiusKm: 6.2,
      zoneAreaKm2: 120.8,
      coastImpact: 'Stays offshore (drifting SW parallel to coast)',
      threatenedBox: '18.90°N to 19.35°N, 71.10°E to 71.55°E',
      pipelineLatencyMs: 44200,
    },

    detection: {
      oilPolygons: 18,
      lookAlikes: 0,
      totalOilAreaKm2: 3.820,
      largestAreaKm2: 0.950,
      lengthKm: 1.85,
      widthKm: 1.12,
      perimeterKm: 7.92,
      orientationDeg: 215,
      compactness: 0.18,
      contrastDb: 5.4,
      confidence: 0.81,
      driftAgeProxyHours: 8.5,
      centroid: [19.2500, 71.4000],
      checkpointMetrics: {
        iouOil: 0.8942,
        iouLookAlike: 'N/A',
        pixelAccuracy: 0.9871
      },
      polygons: [
        {
          id: 'poly-mum-01',
          type: 'oil',
          confidence: 0.92,
          areaKm2: 0.95,
          contrastDb: 5.8,
          coordinates: [
            [19.270, 71.380],
            [19.255, 71.395],
            [19.235, 71.415],
            [19.220, 71.430],
            [19.230, 71.440],
            [19.250, 71.420],
            [19.275, 71.395],
            [19.270, 71.380]
          ]
        },
        {
          id: 'poly-mum-02',
          type: 'oil',
          confidence: 0.84,
          areaKm2: 0.62,
          contrastDb: 5.1,
          coordinates: [
            [19.240, 71.410],
            [19.225, 71.425],
            [19.210, 71.445],
            [19.218, 71.455],
            [19.235, 71.435],
            [19.240, 71.410]
          ]
        }
      ]
    },

    drift: {
      originTime: '2024-03-12T16:33:42Z',
      originTimeDisplay: '2024-03-12 16:33:42 UTC',
      originPosition: [19.3850, 71.5200],
      zoneRadiusKm: 6.2,
      bufferedRadiusKm: 8.0,
      zoneAreaKm2: 120.8,
      hoursBack: 8.5,
      ageProxy: '8.5 h drift proxy',
      windFactor: '0.030 of 10 m wind',
      deflection: '15 deg right',
      particlesCount: 50,
      forecastSpreadKm: 19.4,
      coastImpact: 'stays offshore',
      threatenedBox: '18.90 to 19.35 N, 71.10 to 71.55 E',
      metoceanSource: 'Open-Meteo ERA5 10 m wind + CMEMS Global Ocean Physics (Arabian Sea slice)',
      originZonePolygon: [
        [19.440, 71.470],
        [19.420, 71.570],
        [19.330, 71.560],
        [19.340, 71.460],
        [19.440, 71.470]
      ],
      backtrackPath: [
        [19.2500, 71.4000],
        [19.2950, 71.4400],
        [19.3400, 71.4800],
        [19.3850, 71.5200]
      ],
      hindcastCone: [
        [19.2500, 71.4000],
        [19.320, 71.440],
        [19.440, 71.470],
        [19.420, 71.570],
        [19.330, 71.560],
        [19.2500, 71.4000]
      ],
      forecastPath: [
        [19.2500, 71.4000],
        [19.1900, 71.3500],
        [19.1200, 71.2900],
        [19.0400, 71.2200]
      ],
      forecastCone: [
        [19.2500, 71.4000],
        [19.160, 71.380],
        [19.020, 71.320],
        [18.940, 71.140],
        [19.080, 71.100],
        [19.2500, 71.4000]
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

    pipeline: {
      totalMs: 44200,
      stages: [
        { name: 'DETECT', ms: 25400, pct: 57.5, label: 'SAR Patch Ingestion & Deep U-Net Segmentation' },
        { name: 'CHAR', ms: 820, pct: 1.9, label: 'Polygonization & Spatial Feature Extraction' },
        { name: 'EO', ms: 12100, pct: 27.4, label: 'Sentinel-2 Cloud & Sun-Glint Filter' },
        { name: 'RENDER', ms: 140, pct: 0.3, label: 'GeoJSON Rasterization & Vector Tile Bake' },
        { name: 'METOCEAN', ms: 2, pct: 0.01, label: 'INCOIS/CMEMS Spatio-Temporal Slicing' },
        { name: 'HINDCAST', ms: 610, pct: 1.4, label: 'Runge-Kutta 4 Backward Lagrangian Dispersion' },
        { name: 'FORECAST', ms: 510, pct: 1.2, label: 'Runge-Kutta 4 Forward Oil Drift Prediction' },
        { name: 'COAST', ms: 0, pct: 0.0, label: 'Coastline Geometric Collision Intersection' }
      ]
    },

    uncertaintyCurve: [
      { hour: 0, km: 0.6 },
      { hour: -4, km: 3.2 },
      { hour: -8.5, km: 6.2, isOrigin: true },
      { hour: -16, km: 11.5 },
      { hour: -24, km: 16.8 }
    ],

    evidence: {
      oilPolygons: 18,
      lookAlikesExcluded: 0,
      opticalChipsCompared: 1,
      vesselsInTheBox: 14,
      passedTheFilter: 8,
      ensembleMembers: 50
    },

    vessels: [
      {
        id: 'vessel-mum-01',
        rank: 1,
        name: 'BHARAT SAMUDRA',
        mmsi: '419001420',
        imo: '9554321',
        callsign: 'AUVB',
        flag: 'India 🇮🇳',
        vesselType: 'VLCC Crude Oil Tanker',
        typeCategory: 'tanker',
        lengthM: 330,
        beamM: 60,
        draughtM: 20.5,
        destination: 'SIKKA PORT',
        status: 'PRIMARY SUSPECT',
        statusLevel: 'critical',
        dataIntegrity: 'SIMULATED AIS',
        pingCount: 94,
        pingRatePerHour: 10.5,
        hasDeadReckoningGap: false,
        totalScore: 91.8,
        subScores: { proximity: 95, timing: 92, trajectory: 90, vesselType: 95, behavior: 87 },
        metricsAtOrigin: { closestDistKm: 0.65, timeDeltaMin: 12, speedKnots: 11.2, prevSpeedKnots: 15.0, headingDeg: 216, slickOrientationDeg: 215 },
        reasonCodes: [
          { code: 'PROX-CRITICAL', level: 'crit', text: 'Intercepted origin zone within 650m of trajectory centroid.' },
          { code: 'AXIS-MATCH', level: 'crit', text: 'Vessel track 216° is collinear with slick axis 215°.' },
          { code: 'SPEED-DROP', level: 'warn', text: 'Decelerated from 15.0 to 11.2 kn during transit across release box.' }
        ],
        track: [
          { time: '2024-03-12T00:00:00Z', lat: 19.75, lon: 71.85, speed: 15.1, heading: 218, type: 'ping' },
          { time: '2024-03-12T12:00:00Z', lat: 19.48, lon: 71.60, speed: 14.9, heading: 216, type: 'ping' },
          { time: '2024-03-12T16:33:42Z', lat: 19.387, lon: 71.518, speed: 11.2, heading: 216, type: 'ping', isOriginMatch: true },
          { time: '2024-03-13T01:03:42Z', lat: 19.20, lon: 71.35, speed: 14.8, heading: 215, type: 'ping', isRadarPass: true },
          { time: '2024-03-13T12:00:00Z', lat: 18.90, lon: 71.10, speed: 15.0, heading: 215, type: 'ping' }
        ]
      },
      {
        id: 'vessel-mum-02',
        rank: 2,
        name: 'AL-FAROOQ',
        mmsi: '470899000',
        imo: '9420011',
        callsign: 'A6E22',
        flag: 'United Arab Emirates 🇦🇪',
        vesselType: 'LPG Carrier',
        typeCategory: 'tanker',
        lengthM: 210,
        beamM: 32,
        draughtM: 11.0,
        destination: 'JNPT MUMBAI',
        status: 'EXCLUDED',
        statusLevel: 'excluded',
        dataIntegrity: 'SIMULATED AIS',
        pingCount: 88,
        pingRatePerHour: 9.2,
        hasDeadReckoningGap: false,
        totalScore: 28.4,
        subScores: { proximity: 30, timing: 25, trajectory: 20, vesselType: 35, behavior: 20 },
        metricsAtOrigin: { closestDistKm: 11.8, timeDeltaMin: -190, speedKnots: 16.4, prevSpeedKnots: 16.5, headingDeg: 095, slickOrientationDeg: 215 },
        reasonCodes: [
          { code: 'DISTANT-TRACK', level: 'info', text: 'Inbound approach lane 11.8 km north of release zone.' }
        ],
        track: [
          { time: '2024-03-12T12:00:00Z', lat: 19.52, lon: 71.15, speed: 16.5, heading: 095, type: 'ping' },
          { time: '2024-03-12T16:33:42Z', lat: 19.50, lon: 71.42, speed: 16.4, heading: 095, type: 'ping' },
          { time: '2024-03-13T01:03:42Z', lat: 19.45, lon: 71.85, speed: 14.0, heading: 090, type: 'ping', isRadarPass: true }
        ]
      }
    ],

    backgroundTraffic: [
      { name: 'KAVERI', mmsi: '419002230', type: 'Supply', lat: 19.40, lon: 71.20, heading: 045, speed: 10.5 },
      { name: 'MALABAR LEADER', mmsi: '419003340', type: 'Cargo', lat: 19.10, lon: 71.60, heading: 180, speed: 13.8 },
      { name: 'MAHARASHTRA STAR', mmsi: '419004450', type: 'Fishing', lat: 19.55, lon: 71.50, heading: 270, speed: 5.5 }
    ]
  },

  'OS-CASPIAN-20231014': {
    id: 'OS-CASPIAN-20231014',
    title: 'Caspian Sea, Baku Offshore Field (Look-Alike Ambiguity)',
    shortName: 'Caspian Sea, Baku offshore...',
    status: 'AMBIGUOUS / LOOK-ALIKE DETECTED',
    locationName: 'Absheron Peninsula Offshore, Caspian Sea',
    radarPassTime: '2023-10-14T02:44:45Z',
    radarPassTimeDisplay: '2023-10-14 02:44:45 UTC',
    sensor: 'Sentinel-1 IW GRD RTC',
    orbit: 'Descending (Track 021)',
    polarization: 'VV',
    resolution: '10.0 m',
    detectorModel: 'U-Net (ResNet-34 Backbone)',
    detectorVersion: 'v2.4.1-ntro-tuned',
    confidence: 0.34,
    aisType: 'SIMULATED AIS',
    aisSource: 'AIS: 6 local platform service craft and shuttle tankers.',
    isCleanScene: false,
    hasAmbiguousLookalike: true,
    mapCenter: [40.2200, 50.4500],
    zoom: 10,
    radarBBox: [[39.85, 49.95], [40.65, 50.95]],
    
    summary: {
      oilPolygonsCount: 4,
      lookAlikesCount: 7,
      totalAreaKm2: 1.15,
      lookAlikeAreaKm2: 4.82,
      largestAreaKm2: 0.45,
      vesselsScored: 5,
      candidateCount: 5,
      driftAgeHours: 5.2,
      originTimeDisplay: '2023-10-13 21:32:45 UTC',
      zoneRadiusKm: 4.1,
      zoneAreaKm2: 52.8,
      coastImpact: 'Low threat / Look-alike biogenic dampening predominant',
      threatenedBox: '40.05°N to 40.35°N, 50.25°E to 50.65°E',
      pipelineLatencyMs: 38100,
    },

    detection: {
      oilPolygons: 4,
      lookAlikes: 7,
      totalOilAreaKm2: 1.150,
      lookAlikeAreaKm2: 4.820,
      largestAreaKm2: 0.450,
      lengthKm: 1.12,
      widthKm: 0.65,
      perimeterKm: 4.12,
      orientationDeg: 085,
      compactness: 0.32,
      contrastDb: 1.8,
      confidence: 0.34,
      driftAgeProxyHours: 5.2,
      centroid: [40.2200, 50.4500],
      checkpointMetrics: {
        iouOil: 0.6210,
        iouLookAlike: 0.8124,
        pixelAccuracy: 0.9412
      },
      polygons: [
        {
          id: 'poly-cas-01',
          type: 'oil',
          confidence: 0.38,
          areaKm2: 0.45,
          contrastDb: 2.1,
          coordinates: [
            [40.235, 50.430],
            [40.230, 50.460],
            [40.215, 50.470],
            [40.210, 50.440],
            [40.235, 50.430]
          ]
        },
        {
          id: 'poly-cas-lookalike-01',
          type: 'lookalike',
          confidence: 0.82,
          classification: 'Biogenic Surfactant / Low Wind Shear (<2.5 m/s)',
          areaKm2: 2.94,
          contrastDb: 1.4,
          coordinates: [
            [40.280, 50.380],
            [40.270, 50.490],
            [40.245, 50.520],
            [40.230, 50.480],
            [40.250, 50.370],
            [40.280, 50.380]
          ]
        }
      ]
    },

    drift: {
      originTime: '2023-10-13T21:32:45Z',
      originTimeDisplay: '2023-10-13 21:32:45 UTC',
      originPosition: [40.2650, 50.3800],
      zoneRadiusKm: 4.1,
      bufferedRadiusKm: 6.0,
      zoneAreaKm2: 52.8,
      hoursBack: 5.2,
      ageProxy: '5.2 h drift proxy (Low Confidence)',
      windFactor: '0.030 of 10 m wind',
      deflection: '15 deg right',
      particlesCount: 50,
      forecastSpreadKm: 14.2,
      coastImpact: 'unlikely / low confidence signature',
      threatenedBox: '40.05 to 40.35 N, 50.25 to 50.65 E',
      metoceanSource: 'Open-Meteo ERA5 10 m wind + Caspian Sea HYCOM Circulation',
      originZonePolygon: [
        [40.300, 50.350],
        [40.290, 50.420],
        [40.230, 50.410],
        [40.240, 50.340],
        [40.300, 50.350]
      ],
      backtrackPath: [
        [40.2200, 50.4500],
        [40.2400, 50.4150],
        [40.2650, 50.3800]
      ],
      hindcastCone: [
        [40.2200, 50.4500],
        [40.250, 50.430],
        [40.300, 50.350],
        [40.290, 50.420],
        [40.2200, 50.4500]
      ],
      forecastPath: [
        [40.2200, 50.4500],
        [40.2000, 50.4900],
        [40.1700, 50.5400]
      ],
      forecastCone: [
        [40.2200, 50.4500],
        [40.180, 50.470],
        [40.140, 50.560],
        [40.190, 50.580],
        [40.2200, 50.4500]
      ]
    },

    environmental: {
      meanWindSpeed: '2.1 m/s (Low Wind Shelter)',
      windDirection: 'WNW (290°)',
      meanCurrentSpeed: '0.08 m/s',
      currentDirection: 'SE (135°)',
      fieldResolution: '5 x 5 pts',
      cubeTimeSpan: '96 h',
      metoceanDetail: 'ERA5 Land/Sea mask + Local Caspian Sea bathymetric model'
    },

    pipeline: {
      totalMs: 38100,
      stages: [
        { name: 'DETECT', ms: 21800, pct: 57.2, label: 'SAR Patch Ingestion & Deep U-Net Segmentation' },
        { name: 'CHAR', ms: 710, pct: 1.9, label: 'Polygonization & Texture Damping Analysis' },
        { name: 'EO', ms: 14200, pct: 37.3, label: 'Sentinel-2 Chlorophyll-a & NDVI Comparison' },
        { name: 'RENDER', ms: 120, pct: 0.3, label: 'GeoJSON Rasterization & Vector Tile Bake' },
        { name: 'METOCEAN', ms: 2, pct: 0.01, label: 'Metocean Interpolation' },
        { name: 'HINDCAST', ms: 680, pct: 1.8, label: 'Runge-Kutta 4 Backward Lagrangian Dispersion' },
        { name: 'FORECAST', ms: 588, pct: 1.5, label: 'Runge-Kutta 4 Forward Oil Drift Prediction' },
        { name: 'COAST', ms: 0, pct: 0.0, label: 'Coastline Collision Analysis' }
      ]
    },

    uncertaintyCurve: [
      { hour: 0, km: 0.5 },
      { hour: -2.5, km: 2.1 },
      { hour: -5.2, km: 4.1, isOrigin: true },
      { hour: -12, km: 8.5 }
    ],

    evidence: {
      oilPolygons: 4,
      lookAlikesExcluded: 7,
      opticalChipsCompared: 2,
      vesselsInTheBox: 8,
      passedTheFilter: 5,
      ensembleMembers: 50
    },

    vessels: [
      {
        id: 'vessel-cas-01',
        rank: 1,
        name: 'CASPIAN SHUTTLE 4',
        mmsi: '423108910',
        imo: '9187654',
        callsign: '4JXZ',
        flag: 'Azerbaijan 🇦🇿',
        vesselType: 'Oil Products Tanker',
        typeCategory: 'tanker',
        lengthM: 140,
        beamM: 16,
        draughtM: 4.8,
        destination: 'SANGANCHAL TERMINAL',
        status: 'LOW CONFIDENCE / UNCONFIRMED',
        statusLevel: 'warning',
        dataIntegrity: 'SIMULATED AIS',
        pingCount: 64,
        pingRatePerHour: 8.0,
        hasDeadReckoningGap: false,
        totalScore: 51.4,
        subScores: { proximity: 60, timing: 55, trajectory: 48, vesselType: 65, behavior: 40 },
        metricsAtOrigin: { closestDistKm: 2.2, timeDeltaMin: 45, speedKnots: 9.4, prevSpeedKnots: 9.5, headingDeg: 088, slickOrientationDeg: 085 },
        reasonCodes: [
          { code: 'LOOKALIKE-CONTEXT', level: 'warn', text: 'Spill signature is heavily masked by biogenic slick look-alikes.' },
          { code: 'LOW-RADAR-CONTRAST', level: 'warn', text: 'Contrast is only 1.8 dB (threshold for reliable mineral oil is >3.5 dB).' }
        ],
        track: [
          { time: '2023-10-13T16:00:00Z', lat: 40.28, lon: 50.30, speed: 9.5, heading: 090, type: 'ping' },
          { time: '2023-10-13T21:32:45Z', lat: 40.260, lon: 50.395, speed: 9.4, heading: 088, type: 'ping', isOriginMatch: true },
          { time: '2023-10-14T02:44:45Z', lat: 40.23, lon: 50.55, speed: 9.5, heading: 085, type: 'ping', isRadarPass: true }
        ]
      }
    ]
  },

  'OS-SANTABARBARA-20230829': {
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
    detectorVersion: 'v2.4.1-ntro-tuned',
    confidence: 0.89,
    aisType: 'RECORDED AIS',
    aisSource: 'AIS: all 9 candidate vessels recorded by US Coast Guard NAIS.',
    isCleanScene: false,
    hasAmbiguousLookalike: false,
    mapCenter: [34.3500, -119.8800],
    zoom: 11,
    radarBBox: [[34.15, -120.15], [34.55, -119.60]],
    
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
      pipelineLatencyMs: 41900,
    },

    detection: {
      oilPolygons: 12,
      lookAlikes: 0,
      totalOilAreaKm2: 2.640,
      largestAreaKm2: 0.720,
      lengthKm: 3.20,
      widthKm: 0.85,
      perimeterKm: 8.40,
      orientationDeg: 280,
      compactness: 0.11,
      contrastDb: 6.2,
      confidence: 0.89,
      driftAgeProxyHours: 6.0,
      centroid: [34.3500, -119.8800],
      checkpointMetrics: {
        iouOil: 0.9120,
        iouLookAlike: 'N/A',
        pixelAccuracy: 0.9892
      },
      polygons: [
        {
          id: 'poly-sb-01',
          type: 'oil',
          confidence: 0.93,
          areaKm2: 0.72,
          contrastDb: 6.5,
          coordinates: [
            [34.360, -119.850],
            [34.355, -119.875],
            [34.348, -119.910],
            [34.342, -119.905],
            [34.350, -119.870],
            [34.360, -119.850]
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
      coastImpact: 'remains in channel',
      threatenedBox: '34.30 to 34.42 N, 119.95 to 119.80 W',
      metoceanSource: 'Open-Meteo ERA5 10 m wind + SCCOOS ROMS Coastal Currents',
      originZonePolygon: [
        [34.395, -119.860],
        [34.390, -119.830],
        [34.370, -119.832],
        [34.372, -119.865],
        [34.395, -119.860]
      ],
      backtrackPath: [
        [34.3500, -119.8800],
        [34.3650, -119.8620],
        [34.3820, -119.8450]
      ],
      hindcastCone: [
        [34.3500, -119.8800],
        [34.370, -119.855],
        [34.395, -119.860],
        [34.390, -119.830],
        [34.3500, -119.8800]
      ],
      forecastPath: [
        [34.3500, -119.8800],
        [34.3350, -119.9100],
        [34.3200, -119.9500]
      ],
      forecastCone: [
        [34.3500, -119.8800],
        [34.320, -119.890],
        [34.300, -119.960],
        [34.330, -119.980],
        [34.3500, -119.8800]
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

    pipeline: {
      totalMs: 41900,
      stages: [
        { name: 'DETECT', ms: 23600, pct: 56.3, label: 'SAR Patch Ingestion & Deep U-Net Segmentation' },
        { name: 'CHAR', ms: 680, pct: 1.6, label: 'Polygonization & Spatial Feature Extraction' },
        { name: 'EO', ms: 16100, pct: 38.4, label: 'USGS Geological Seep Catalog Spatial Cross-Check' },
        { name: 'RENDER', ms: 110, pct: 0.3, label: 'Vector Bake' },
        { name: 'METOCEAN', ms: 2, pct: 0.01, label: 'ROMS Interpolation' },
        { name: 'HINDCAST', ms: 720, pct: 1.7, label: 'Backward Dispersion' },
        { name: 'FORECAST', ms: 688, pct: 1.6, label: 'Forward Drift' },
        { name: 'COAST', ms: 0, pct: 0.0, label: 'Coastline Collision' }
      ]
    },

    uncertaintyCurve: [
      { hour: 0, km: 0.4 },
      { hour: -3, km: 1.5 },
      { hour: -6, km: 2.5, isOrigin: true },
      { hour: -12, km: 5.2 }
    ],

    evidence: {
      oilPolygons: 12,
      lookAlikesExcluded: 0,
      opticalChipsCompared: 1,
      vesselsInTheBox: 12,
      passedTheFilter: 9,
      ensembleMembers: 50
    },

    vessels: [
      {
        id: 'vessel-sb-01',
        rank: 1,
        name: 'HYUNDAI FORWARD',
        mmsi: '440129000',
        imo: '9345678',
        callsign: 'DSPO8',
        flag: 'South Korea 🇰🇷',
        vesselType: 'Container Ship',
        typeCategory: 'cargo',
        lengthM: 290,
        beamM: 38,
        draughtM: 13.5,
        destination: 'PORT OF LONG BEACH',
        status: 'EXCLUDED / PASSING VESSEL',
        statusLevel: 'excluded',
        dataIntegrity: 'REAL AIS PINGS',
        pingCount: 140,
        pingRatePerHour: 14.0,
        hasDeadReckoningGap: false,
        totalScore: 12.2,
        subScores: { proximity: 22, timing: 18, trajectory: 10, vesselType: 12, behavior: 5 },
        metricsAtOrigin: { closestDistKm: 8.4, timeDeltaMin: -140, speedKnots: 19.4, prevSpeedKnots: 19.5, headingDeg: 115, slickOrientationDeg: 280 },
        reasonCodes: [
          { code: 'GEOLOGICAL-ORIGIN-PROVEN', level: 'info', text: 'Origin zone centroid coincides exactly with Coal Oil Point natural seep vent (USGS Seep ID #SB-COP-04).' },
          { code: 'PASSING-TRAFFIC', level: 'info', text: 'Vessel followed designated TSS lane 8.4 km south at constant cruising speed (19.4 kn).' }
        ],
        track: [
          { time: '2023-08-28T16:00:00Z', lat: 34.30, lon: -120.10, speed: 19.5, heading: 115, type: 'ping' },
          { time: '2023-08-28T19:59:10Z', lat: 34.26, lon: -119.86, speed: 19.4, heading: 115, type: 'ping', isOriginMatch: true },
          { time: '2023-08-29T01:59:10Z', lat: 34.18, lon: -119.55, speed: 19.3, heading: 115, type: 'ping', isRadarPass: true }
        ]
      }
    ]
  },

  'OS-CLEAN-INDIANOCEAN': {
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
    detectorVersion: 'v2.4.1-ntro-tuned',
    confidence: 0.99,
    aisType: 'RECORDED AIS',
    aisSource: 'AIS: 18 normal transiting commercial vessels in sea lane.',
    isCleanScene: true,
    hasAmbiguousLookalike: false,
    mapCenter: [11.8500, 91.2000],
    zoom: 9,
    radarBBox: [[11.20, 90.60], [12.50, 91.80]],
    
    summary: {
      oilPolygonsCount: 0,
      totalAreaKm2: 0.00,
      largestAreaKm2: 0.00,
      vesselsScored: 0,
      candidateCount: 0,
      driftAgeHours: 0,
      originTimeDisplay: 'N/A (No Detection)',
      zoneRadiusKm: 0,
      zoneAreaKm2: 0,
      coastImpact: 'Clean Water — No threat',
      threatenedBox: 'N/A',
      pipelineLatencyMs: 18400,
    },

    detection: {
      oilPolygons: 0,
      lookAlikes: 0,
      totalOilAreaKm2: 0.000,
      largestAreaKm2: 0.000,
      lengthKm: 0.00,
      widthKm: 0.00,
      perimeterKm: 0.00,
      orientationDeg: 0,
      compactness: 0.00,
      contrastDb: 0.2,
      confidence: 0.99,
      driftAgeProxyHours: 0.0,
      centroid: [11.8500, 91.2000],
      checkpointMetrics: {
        iouOil: 'N/A (Clean)',
        iouLookAlike: 'N/A',
        pixelAccuracy: 0.9998
      },
      polygons: []
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

    pipeline: {
      totalMs: 18400,
      stages: [
        { name: 'DETECT', ms: 14200, pct: 77.2, label: 'SAR Patch Ingestion & Deep U-Net Segmentation (Clean Pass)' },
        { name: 'CHAR', ms: 120, pct: 0.7, label: 'Zero-Polygon Quick Exit' },
        { name: 'EO', ms: 3800, pct: 20.6, label: 'Cloud & Sun Glint Verification' },
        { name: 'RENDER', ms: 20, pct: 0.1, label: 'Tile Bake' },
        { name: 'METOCEAN', ms: 1, pct: 0.01, label: 'Skipped' },
        { name: 'HINDCAST', ms: 0, pct: 0.0, label: 'Skipped (Clean Scene)' },
        { name: 'FORECAST', ms: 0, pct: 0.0, label: 'Skipped (Clean Scene)' },
        { name: 'COAST', ms: 0, pct: 0.0, label: 'Skipped (Clean Scene)' }
      ]
    },

    uncertaintyCurve: [
      { hour: 0, km: 0 },
      { hour: -24, km: 0 }
    ],

    evidence: {
      oilPolygons: 0,
      lookAlikesExcluded: 0,
      opticalChipsCompared: 1,
      vesselsInTheBox: 18,
      passedTheFilter: 0,
      ensembleMembers: 0
    },

    vessels: []
  }
};
