/**
 * NayanX - SIH26143 Advanced Maritime Intelligence Console
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

  'OS-TOBAGO-20240207': {
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
    detectorVersion: 'v2.4.1-ntro-tuned',
    confidence: 0.94,
    aisType: 'RECORDED AIS & FORENSIC TRACK',
    aisSource: 'AIS: 7 tracked vessels including suspect tug SOLO CREED & Trinidad & Tobago Coast Guard fleet.',
    isCleanScene: false,
    hasAmbiguousLookalike: false,
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
      pipelineLatencyMs: 46800,
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
      checkpointMetrics: {
        iouOil: 0.9680,
        iouLookAlike: 'N/A',
        pixelAccuracy: 0.9942
      },
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

    pipeline: {
      totalMs: 46800,
      stages: [
        { name: 'DETECT', ms: 27200, pct: 58.1, label: 'SAR Patch Ingestion & Deep U-Net Segmentation' },
        { name: 'CHAR', ms: 890, pct: 1.9, label: 'Spill Geometry & Radiometric Contrast Extraction' },
        { name: 'EO', ms: 14500, pct: 31.0, label: 'Sentinel-2 Multi-Spectral Cross-Validation' },
        { name: 'RENDER', ms: 140, pct: 0.3, label: 'GeoJSON Rasterization & Vector Tile Bake' },
        { name: 'METOCEAN', ms: 3, pct: 0.01, label: 'ERA5/CMEMS Caribbean Data Slicing' },
        { name: 'HINDCAST', ms: 750, pct: 1.6, label: 'Runge-Kutta 4 Backward Lagrangian Dispersion' },
        { name: 'FORECAST', ms: 640, pct: 1.4, label: 'Runge-Kutta 4 Forward Oil Drift Prediction' },
        { name: 'COAST', ms: 677, pct: 1.4, label: 'Coastline Geometric Collision Intersection (SW Tobago Landfall)' }
      ]
    },

    uncertaintyCurve: [
      { hour: 0, km: 0.9 },
      { hour: -6, km: 1.8 },
      { hour: -12, km: 2.5 },
      { hour: -20, km: 3.1 },
      { hour: -26.5, km: 3.5, isOrigin: true },
      { hour: -36, km: 5.2 }
    ],

    evidence: {
      oilPolygons: 2,
      lookAlikesExcluded: 0,
      opticalChipsCompared: 2,
      vesselsInTheBox: 16,
      passedTheFilter: 7,
      ensembleMembers: 50
    },

    // Strict open-water tracks navigating around Tobago island (0° heading to trajectory)
    vessels: [
      {
        id: 'vessel-tob-01',
        rank: 1,
        name: 'SOLO CREED (TUG) & GULFSTREAM (BARGE)',
        mmsi: '370124000',
        imo: '7500322',
        callsign: 'HP2910',
        flag: 'Panama 🇵🇦 / Unflagged',
        vesselType: 'Tug & Abandoned Bunker Barge',
        typeCategory: 'tanker',
        lengthM: 110,
        beamM: 22,
        draughtM: 7.5,
        destination: 'ARUBA / ST. KITTS',
        status: 'PRIMARY CULPRIT (ABANDONED TOW / AIS DROPOUT)',
        statusLevel: 'critical',
        dataIntegrity: 'DEAD RECKONING FORENSIC TRACK',
        pingCount: 38,
        pingRatePerHour: 2.2,
        hasDeadReckoningGap: true,
        gapDurationHours: 18.5,
        totalScore: 96.8,
        subScores: { proximity: 99, timing: 98, trajectory: 95, vesselType: 98, behavior: 94 },
        metricsAtOrigin: { closestDistKm: 0.08, timeDeltaMin: 0, speedKnots: 2.1, prevSpeedKnots: 7.8, headingDeg: 265, slickOrientationDeg: 285 },
        reasonCodes: [
          { code: 'GROUNDING-SITE-MATCH', level: 'crit', text: 'Towed unflagged barge Gulfstream grounded on Cove Reef (11.060°N, 60.950°W) on 7 Feb at 07:45 UTC.' },
          { code: 'AIS-BLACKOUT', level: 'crit', text: 'Tug SOLO CREED switched off AIS transponder for 18.5 hours immediately after tow separation.' },
          { code: 'ABRUPT-SPEED-CHANGE', level: 'warn', text: 'Vessel speed dropped from 7.8 to 2.1 kn at grounding, then spiked to 9.8 kn fleeing south-west towards Aruba.' },
          { code: 'CARGO-MATCH', level: 'crit', text: 'Heavy bunker fuel oil (HFO) discharged matches chemical signature of barge cargo tanks.' },
          { code: 'COLLINEAR-TRACK', level: 'info', text: 'Discharge trajectory matches 285° drift axis driven by trade winds.' }
        ],
        track: [
          { time: '2024-02-06T12:00:00Z', lat: 10.850, lon: -60.600, speed: 8.5, heading: 298, type: 'ping' },
          { time: '2024-02-06T20:00:00Z', lat: 10.950, lon: -60.780, speed: 7.8, heading: 298, type: 'ping' },
          { time: '2024-02-07T04:00:00Z', lat: 11.020, lon: -60.880, speed: 4.5, heading: 295, type: 'ping' },
          { time: '2024-02-07T07:45:00Z', lat: 11.060, lon: -60.950, speed: 2.1, heading: 265, type: 'ping', isOriginMatch: true },
          { time: '2024-02-07T12:00:00Z', lat: 11.050, lon: -61.120, speed: 9.8, heading: 250, type: 'dr', isDeadReckoning: true },
          { time: '2024-02-07T18:00:00Z', lat: 11.100, lon: -61.400, speed: 10.2, heading: 278, type: 'dr', isDeadReckoning: true },
          { time: '2024-02-08T00:00:00Z', lat: 11.150, lon: -61.700, speed: 10.5, heading: 276, type: 'dr', isDeadReckoning: true },
          { time: '2024-02-08T10:14:30Z', lat: 11.220, lon: -62.050, speed: 10.8, heading: 275, type: 'ping', isRadarPass: true }
        ]
      },
      {
        id: 'vessel-tob-02',
        rank: 2,
        name: 'TTS SCARBOROUGH (CG 25)',
        mmsi: '362002500',
        imo: '9789011',
        callsign: '9YSC',
        flag: 'Trinidad & Tobago 🇹🇹',
        vesselType: 'Coast Guard Patrol Vessel (Own Ship)',
        typeCategory: 'supply',
        lengthM: 79,
        beamM: 13,
        draughtM: 3.8,
        destination: 'TOBAGO SPILL SECTOR (COMMAND)',
        status: 'ON-SCENE COMMAND / RESPONDER',
        statusLevel: 'info',
        dataIntegrity: 'REAL AIS PINGS',
        pingCount: 168,
        pingRatePerHour: 18.2,
        hasDeadReckoningGap: false,
        totalScore: 14.2,
        subScores: { proximity: 25, timing: 15, trajectory: 10, vesselType: 10, behavior: 8 },
        metricsAtOrigin: { closestDistKm: 0.15, timeDeltaMin: 495, speedKnots: 2.2, prevSpeedKnots: 5.5, headingDeg: 050, slickOrientationDeg: 285 },
        reasonCodes: [
          { code: 'GOVERNMENT-RESPONDER', level: 'info', text: 'Trinidad and Tobago Coast Guard capital patrol vessel acting as on-scene incident commander.' },
          { code: 'BOOM-CORDON', level: 'info', text: 'Deployed containment booms to protect Scarborough port and Lambeau fishing ground.' }
        ],
        track: [
          { time: '2024-02-07T08:30:00Z', lat: 10.680, lon: -61.550, speed: 22.0, heading: 062, type: 'ping' },
          { time: '2024-02-07T11:00:00Z', lat: 10.850, lon: -61.200, speed: 21.5, heading: 064, type: 'ping' },
          { time: '2024-02-07T13:30:00Z', lat: 10.980, lon: -61.050, speed: 14.0, heading: 058, type: 'ping' },
          { time: '2024-02-07T16:00:00Z', lat: 11.050, lon: -60.960, speed: 5.5, heading: 050, type: 'ping' },
          { time: '2024-02-08T10:14:30Z', lat: 11.055, lon: -60.955, speed: 2.2, heading: 050, type: 'ping', isRadarPass: true }
        ]
      },
      {
        id: 'vessel-tob-03',
        rank: 3,
        name: 'TTS SPEYSIDE (CG 26)',
        mmsi: '362002600',
        imo: '9789023',
        callsign: '9YSP',
        flag: 'Trinidad & Tobago 🇹🇹',
        vesselType: 'Fast Patrol Craft (Own Ship)',
        typeCategory: 'supply',
        lengthM: 42,
        beamM: 9,
        draughtM: 2.4,
        destination: 'WEST PLUME MONITORING',
        status: 'PLUME SURVEILLANCE / PATROL',
        statusLevel: 'info',
        dataIntegrity: 'REAL AIS PINGS',
        pingCount: 144,
        pingRatePerHour: 16.0,
        hasDeadReckoningGap: false,
        totalScore: 11.5,
        subScores: { proximity: 20, timing: 12, trajectory: 10, vesselType: 10, behavior: 5 },
        metricsAtOrigin: { closestDistKm: 3.2, timeDeltaMin: 255, speedKnots: 24.5, prevSpeedKnots: 26.0, headingDeg: 288, slickOrientationDeg: 285 },
        reasonCodes: [
          { code: 'COAST-GUARD-INTERCEPTOR', level: 'info', text: 'Tracking westward oil plume drift towards Venezuelan maritime boundary.' }
        ],
        track: [
          { time: '2024-02-07T12:00:00Z', lat: 11.050, lon: -61.020, speed: 26.0, heading: 288, type: 'ping' },
          { time: '2024-02-07T16:00:00Z', lat: 11.100, lon: -61.250, speed: 24.5, heading: 288, type: 'ping' },
          { time: '2024-02-07T22:00:00Z', lat: 11.160, lon: -61.550, speed: 18.0, heading: 282, type: 'ping' },
          { time: '2024-02-08T10:14:30Z', lat: 11.220, lon: -61.850, speed: 12.0, heading: 278, type: 'ping', isRadarPass: true }
        ]
      },
      {
        id: 'vessel-tob-04',
        rank: 4,
        name: 'CLEAN SEAS TOBAGO',
        mmsi: '362008800',
        imo: '9456123',
        callsign: '9YCS',
        flag: 'Trinidad & Tobago 🇹🇹',
        vesselType: 'Oil Spill Response Vessel (Own Ship)',
        typeCategory: 'supply',
        lengthM: 55,
        beamM: 12,
        draughtM: 3.2,
        destination: 'CANOE BAY SKIMMING',
        status: 'OIL SKIMMING / BOOM TENDER',
        statusLevel: 'info',
        dataIntegrity: 'REAL AIS PINGS',
        pingCount: 152,
        pingRatePerHour: 15.2,
        hasDeadReckoningGap: false,
        totalScore: 9.8,
        subScores: { proximity: 18, timing: 10, trajectory: 8, vesselType: 10, behavior: 5 },
        metricsAtOrigin: { closestDistKm: 1.1, timeDeltaMin: 135, speedKnots: 3.2, prevSpeedKnots: 6.5, headingDeg: 245, slickOrientationDeg: 285 },
        reasonCodes: [
          { code: 'SPILL-RESPONSE-SKIMMER', level: 'info', text: 'Specialized environmental recovery vessel skimming heavy bunker residue.' }
        ],
        track: [
          { time: '2024-02-07T10:00:00Z', lat: 11.070, lon: -60.920, speed: 6.5, heading: 240, type: 'ping' },
          { time: '2024-02-07T14:00:00Z', lat: 11.055, lon: -60.960, speed: 3.2, heading: 245, type: 'ping' },
          { time: '2024-02-08T02:00:00Z', lat: 11.060, lon: -61.050, speed: 2.8, heading: 248, type: 'ping' },
          { time: '2024-02-08T10:14:30Z', lat: 11.080, lon: -61.150, speed: 2.5, heading: 245, type: 'ping', isRadarPass: true }
        ]
      },
      {
        id: 'vessel-tob-05',
        rank: 5,
        name: 'CARIBBEAN HIGHWAY',
        mmsi: '371882000',
        imo: '9518830',
        callsign: '3FYH9',
        flag: 'Panama 🇵🇦',
        vesselType: 'Vehicles Carrier (Car Carrier)',
        typeCategory: 'cargo',
        lengthM: 199,
        beamM: 32,
        draughtM: 9.2,
        destination: 'BRIDGETOWN BARBADOS',
        status: 'EXCLUDED (TRANSIT ROUTE)',
        statusLevel: 'excluded',
        dataIntegrity: 'REAL AIS PINGS',
        pingCount: 110,
        pingRatePerHour: 11.0,
        hasDeadReckoningGap: false,
        totalScore: 18.5,
        subScores: { proximity: 22, timing: 18, trajectory: 15, vesselType: 18, behavior: 12 },
        metricsAtOrigin: { closestDistKm: 16.5, timeDeltaMin: 0, speedKnots: 16.5, prevSpeedKnots: 16.8, headingDeg: 055, slickOrientationDeg: 285 },
        reasonCodes: [
          { code: 'CROSS-CHANNEL-TRANSIT', level: 'info', text: 'Maintained 16.5 kn cruise through designated deepwater TSS lane south of Tobago.' }
        ],
        track: [
          { time: '2024-02-07T04:00:00Z', lat: 10.750, lon: -61.350, speed: 16.8, heading: 055, type: 'ping' },
          { time: '2024-02-07T07:45:00Z', lat: 10.880, lon: -61.050, speed: 16.5, heading: 055, type: 'ping' },
          { time: '2024-02-07T12:00:00Z', lat: 10.980, lon: -60.750, speed: 16.6, heading: 055, type: 'ping' },
          { time: '2024-02-08T10:14:30Z', lat: 11.350, lon: -60.150, speed: 16.5, heading: 055, type: 'ping', isRadarPass: true }
        ]
      },
      {
        id: 'vessel-tob-06',
        rank: 6,
        name: 'PETRO TRINIDAD',
        mmsi: '362001140',
        imo: '9320011',
        callsign: '9YPT',
        flag: 'Trinidad & Tobago 🇹🇹',
        vesselType: 'Oil Products Tanker',
        typeCategory: 'tanker',
        lengthM: 145,
        beamM: 24,
        draughtM: 8.1,
        destination: 'POINT FORTIN',
        status: 'EXCLUDED (SOUTH COAST ROUTE)',
        statusLevel: 'excluded',
        dataIntegrity: 'REAL AIS PINGS',
        pingCount: 96,
        pingRatePerHour: 9.6,
        hasDeadReckoningGap: false,
        totalScore: 16.2,
        subScores: { proximity: 14, timing: 15, trajectory: 10, vesselType: 35, behavior: 10 },
        metricsAtOrigin: { closestDistKm: 78.0, timeDeltaMin: 0, speedKnots: 11.0, prevSpeedKnots: 11.2, headingDeg: 180, slickOrientationDeg: 285 },
        reasonCodes: [
          { code: 'GEOGRAPHIC-SEPARATION', level: 'info', text: 'Transited south of Trinidad, 78 km outside Tobago incident sector.' }
        ],
        track: [
          { time: '2024-02-07T02:00:00Z', lat: 10.450, lon: -60.600, speed: 11.2, heading: 180, type: 'ping' },
          { time: '2024-02-07T07:45:00Z', lat: 10.200, lon: -60.600, speed: 11.0, heading: 180, type: 'ping' },
          { time: '2024-02-08T10:14:30Z', lat: 9.800, lon: -60.600, speed: 11.5, heading: 180, type: 'ping', isRadarPass: true }
        ]
      },
      {
        id: 'vessel-tob-07',
        rank: 7,
        name: 'APT JAMES (FAST FERRY)',
        mmsi: '362004410',
        imo: '9892014',
        callsign: '9YAJ',
        flag: 'Trinidad & Tobago 🇹🇹',
        vesselType: 'High Speed Passenger Ferry',
        typeCategory: 'cargo',
        lengthM: 94,
        beamM: 26,
        draughtM: 3.5,
        destination: 'SCARBOROUGH PORT',
        status: 'EXCLUDED (SCHEDULED FERRY)',
        statusLevel: 'excluded',
        dataIntegrity: 'REAL AIS PINGS',
        pingCount: 180,
        pingRatePerHour: 22.5,
        hasDeadReckoningGap: false,
        totalScore: 7.4,
        subScores: { proximity: 15, timing: 10, trajectory: 5, vesselType: 8, behavior: 4 },
        metricsAtOrigin: { closestDistKm: 8.5, timeDeltaMin: 75, speedKnots: 33.5, prevSpeedKnots: 34.0, headingDeg: 058, slickOrientationDeg: 285 },
        reasonCodes: [
          { code: 'SCHEDULED-PASSENGER-SERVICE', level: 'info', text: 'Normal inter-island passenger schedule arriving at Scarborough port from Galleons Passage.' }
        ],
        track: [
          { time: '2024-02-07T06:00:00Z', lat: 10.660, lon: -61.520, speed: 34.0, heading: 058, type: 'ping' },
          { time: '2024-02-07T07:45:00Z', lat: 10.900, lon: -61.050, speed: 33.5, heading: 058, type: 'ping' },
          { time: '2024-02-07T08:45:00Z', lat: 11.030, lon: -60.850, speed: 20.0, heading: 035, type: 'ping' },
          { time: '2024-02-07T09:15:00Z', lat: 11.070, lon: -60.760, speed: 4.0, heading: 035, type: 'ping' },
          { time: '2024-02-08T10:14:30Z', lat: 11.070, lon: -60.760, speed: 0.0, heading: 035, type: 'ping', isRadarPass: true }
        ]
      }
    ],

    backgroundTraffic: [
      { name: 'CARIBBEAN SPIRIT', mmsi: '362009110', type: 'Tug', lat: 11.080, lon: -60.720, heading: 240, speed: 7.5 },
      { name: 'GRENADA STAR', mmsi: '377001220', type: 'Cargo', lat: 11.420, lon: -61.450, heading: 310, speed: 13.8 },
      { name: 'TOBAGO DIVER', mmsi: '362009330', type: 'Fishing', lat: 11.350, lon: -60.480, heading: 045, speed: 5.2 },
      { name: 'ORINOCO EXPLORER', mmsi: '775001440', type: 'Supply', lat: 10.880, lon: -61.850, heading: 095, speed: 11.4 },
      { name: 'CARIBBEAN EXPRESS', mmsi: '370002550', type: 'Tanker', lat: 11.380, lon: -61.820, heading: 275, speed: 14.6 }
    ],

    coastalVillages: [
      { name: 'Canoe Bay / Lowlands', latitude: 11.148, longitude: -60.795, distance_km: 1.9, bearing_deg: 265, population: 3800, place_type: 'Shoreline Settlement & Lagoon' },
      { name: 'Lambeau Fishing Village', latitude: 11.165, longitude: -60.760, distance_km: 2.8, bearing_deg: 45, population: 2400, place_type: 'Coastal Fishing Community' },
      { name: 'Rockly Bay Coastal Estuary', latitude: 11.175, longitude: -60.748, distance_km: 3.7, bearing_deg: 52, population: 1900, place_type: 'Coastal Marine Estuary' },
      { name: 'Scarborough Port & Town', latitude: 11.180, longitude: -60.735, distance_km: 4.5, bearing_deg: 58, population: 17500, place_type: 'Port Capital & Fishery Harbor' },
      { name: 'Crown Point & Pigeon Point', latitude: 11.155, longitude: -60.840, distance_km: 6.5, bearing_deg: 275, population: 5200, place_type: 'Marine Park & Tourism Hub' },
      { name: 'Plymouth / Great Courland Bay', latitude: 11.218, longitude: -60.780, distance_km: 8.2, bearing_deg: 355, population: 2100, place_type: 'Fishery Landing Bay' }
    ]
  },

  'OS-CLEAN-TOBAGO-20240215': {
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
    detectorVersion: 'v2.4.1-ntro-tuned',
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
      pipelineLatencyMs: 18600,
    },

    detection: {
      oilPolygons: 0,
      lookAlikes: 3,
      totalOilAreaKm2: 0.000,
      largestAreaKm2: 0.000,
      lengthKm: 0.00,
      widthKm: 0.00,
      perimeterKm: 0.00,
      orientationDeg: 0,
      compactness: 0.00,
      contrastDb: 0.1,
      confidence: 0.99,
      driftAgeProxyHours: 0.0,
      centroid: null,
      checkpointMetrics: {
        iouOil: 'N/A (Clean Pass)',
        iouLookAlike: '0.94 (Bathymetric Discrimination)',
        pixelAccuracy: 0.9998
      },
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

    pipeline: {
      totalMs: 18600,
      stages: [
        { name: 'DETECT', ms: 14400, pct: 77.4, label: 'Optical Patch Ingestion & Look-Alike Discriminator (Clean Pass)' },
        { name: 'CHAR', ms: 110, pct: 0.6, label: 'Bathymetric Feature Filter' },
        { name: 'EO', ms: 3900, pct: 21.0, label: 'Sentinel-2 Multi-Spectral Cross-Check (NDOI: -0.14)' },
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
      lookAlikesExcluded: 3,
      opticalChipsCompared: 3,
      vesselsInTheBox: 14,
      passedTheFilter: 0,
      ensembleMembers: 0
    },

    vessels: [],

    backgroundTraffic: [
      { name: 'MT HORMUZ VOYAGER', mmsi: '636019234', type: 'Container Vessel', lat: 27.0850, lon: 56.1200, heading: 125, speed: 14.5 },
      { name: 'BANDAR PILOT 04', mmsi: '422004040', type: 'Harbor Pilot Craft', lat: 27.0980, lon: 56.0650, heading: 180, speed: 9.2 },
      { name: 'GULF HORIZON', mmsi: '352001880', type: 'Bulk Carrier', lat: 27.0600, lon: 56.1400, heading: 110, speed: 12.0 },
      { name: 'AL-MAJED PATROL', mmsi: '422009110', type: 'Coast Guard Patrol', lat: 27.0400, lon: 56.0800, heading: 290, speed: 22.0 }
    ],

    coastalVillages: [
      { name: 'Shahid Rajaee Port Complex', latitude: 27.1050, longitude: 56.0600, distance_km: 3.2, bearing_deg: 320, population: 14500, place_type: 'Major Container Terminal Hub' },
      { name: 'Qeshm Channel Marine Passage', latitude: 27.0200, longitude: 56.1000, distance_km: 6.1, bearing_deg: 175, population: 3200, place_type: 'Coastal Waterway & Mangrove Buffer' },
      { name: 'Bandar Abbas Outer Anchorage', latitude: 27.0650, longitude: 56.1600, distance_km: 6.8, bearing_deg: 95, population: 0, place_type: 'Deep-Draft Anchorage Fairway' }
    ]
  }
};

// Export to window for global browser availability
if (typeof window !== 'undefined') {
  window.SCENARIOS_DATA = SCENARIOS_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SCENARIOS_DATA;
}

