/**
 * WebEye - SIH26143 Maritime Intelligence Console
 * Backend Module: Dynamic Traffic & Fleet Simulation Engine
 * 
 * Generates realistic background AIS traffic, candidate vessel tracks,
 * navigation telemetry, and deliberate AIS transponder dropout profiles.
 */

class TrafficGenerator {
  constructor() {
    this.flagStates = [
      { name: 'India 🇮🇳', mmsiPrefix: '419', callPrefix: 'AU' },
      { name: 'Panama 🇵🇦', mmsiPrefix: '351', callPrefix: '3E' },
      { name: 'Liberia 🇱🇷', mmsiPrefix: '636', callPrefix: 'D5' },
      { name: 'Marshall Islands 🇲🇭', mmsiPrefix: '538', callPrefix: 'V7' },
      { name: 'Singapore 🇸🇬', mmsiPrefix: '563', callPrefix: '9V' },
      { name: 'Denmark 🇩🇰', mmsiPrefix: '219', callPrefix: 'OX' },
      { name: 'Greece 🇬🇷', mmsiPrefix: '240', callPrefix: 'SZ' },
      { name: 'Bahamas 🇧🇸', mmsiPrefix: '311', callPrefix: 'C6' },
      { name: 'Cyprus 🇨🇾', mmsiPrefix: '209', callPrefix: '5B' },
      { name: 'Malta 🇲🇹', mmsiPrefix: '229', callPrefix: '9H' }
    ];

    this.shipTemplates = [
      { type: 'VLCC Crude Oil Tanker', category: 'tanker', length: [280, 335], beam: [50, 60], draught: [18.0, 22.5], speed: [12.0, 16.5], names: ['OCEAN PRIDE', 'BHARAT SAMUDRA', 'PACIFIC JEWEL', 'NORDIC EMPEROR', 'GULF PHOENIX'] },
      { type: 'Chemical / Product Tanker', category: 'tanker', length: [140, 190], beam: [24, 32], draught: [8.5, 12.0], speed: [11.5, 15.0], names: ['NORDIC TIDE', 'STAR PROTEUS', 'ARABIAN BREEZE', 'SEAMASTER II', 'CHEM STAR'] },
      { type: 'Bulk Carrier', category: 'cargo', length: [180, 290], beam: [28, 45], draught: [11.0, 17.5], speed: [10.5, 14.5], names: ['CORAL STAR', 'GOLDEN TRADER', 'CAPESIZE PIONEER', 'BLUE MARLIN', 'EASTERN VOYAGER'] },
      { type: 'Container Ship', category: 'cargo', length: [220, 360], beam: [32, 52], draught: [11.5, 16.0], speed: [14.0, 21.0], names: ['MAERSK ADRIATIC', 'MSC LEOPARD', 'CMA CGM MONSOON', 'EVER GALLANT', 'ONE HARMONY'] },
      { type: 'Offshore Supply Ship', category: 'support', length: [65, 95], beam: [14, 20], draught: [5.0, 7.2], speed: [9.0, 13.5], names: ['SEACOR DEFENDER', 'TIDEWATER LEADER', 'HAL OFFSHORE IV', 'SAMUDRA SEVAK', 'BOURBON LIBERTY'] },
      { type: 'Fishing Vessel', category: 'fishing', length: [25, 45], beam: [6, 10], draught: [2.5, 4.2], speed: [6.0, 10.0], names: ['SAGAR KANYA', 'MATSYA VAHINI', 'BLUE WAVE 7', 'OCEAN HARVEST', 'SEA HUNTER'] },
      { type: 'Bunker Barge', category: 'tanker', length: [60, 110], beam: [12, 18], draught: [4.5, 7.0], speed: [7.5, 10.5], names: ['BUNKER DELTA', 'PETRO SUPPLY 1', 'FUELSTAR MUMBAI', 'PORT REFUEL II', 'COASTAL BUNKER'] }
    ];
  }

  /**
   * Generate a random integer between min and max
   */
  randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate a random float
   */
  randFloat(min, max, decimals = 1) {
    const val = Math.random() * (max - min) + min;
    return parseFloat(val.toFixed(decimals));
  }

  /**
   * Random item from array
   */
  sample(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Generate dynamic background traffic around a center point
   */
  generateBackgroundTraffic(centerLat, centerLon, count = 25, radiusKm = 40) {
    const traffic = [];
    const kmToDegLat = 1 / 111.32;
    const kmToDegLon = 1 / (111.32 * Math.cos(centerLat * Math.PI / 180));

    for (let i = 0; i < count; i++) {
      const template = this.sample(this.shipTemplates);
      const flag = this.sample(this.flagStates);
      
      const angle = Math.random() * 2 * Math.PI;
      const r = Math.sqrt(Math.random()) * radiusKm;
      const lat = centerLat + (r * Math.cos(angle)) * kmToDegLat;
      const lon = centerLon + (r * Math.sin(angle)) * kmToDegLon;

      const heading = this.randInt(0, 359);
      const speed = this.randFloat(template.speed[0], template.speed[1], 1);
      const mmsi = flag.mmsiPrefix + String(this.randInt(100000, 999999));
      const imo = '9' + String(this.randInt(100000, 999999));

      traffic.push({
        id: `bg-vessel-${Date.now()}-${i + 1}`,
        name: this.sample(template.names) + ' ' + (i + 1),
        mmsi,
        imo,
        callsign: flag.callPrefix + String(this.randInt(100, 999)),
        flag: flag.name,
        vesselType: template.type,
        typeCategory: template.category,
        lat: parseFloat(lat.toFixed(5)),
        lon: parseFloat(lon.toFixed(5)),
        heading,
        speedKnots: speed,
        lengthM: this.randInt(template.length[0], template.length[1]),
        beamM: this.randInt(template.beam[0], template.beam[1]),
        draughtM: this.randFloat(template.draught[0], template.draught[1], 1),
        destination: 'OFFSHORE / COASTAL HUB',
        status: 'Underway using engine'
      });
    }

    return traffic;
  }

  /**
   * Generate an active fleet of candidate vessels for a scenario
   */
  generateCandidateFleet(centerLat, centerLon, originLat, originLon, count = 10, includeDarkSuspect = true) {
    const fleet = [];
    const kmToDegLat = 1 / 111.32;
    const kmToDegLon = 1 / (111.32 * Math.cos(centerLat * Math.PI / 180));

    // 1. Primary Suspect Vessel (Intersecting Origin Point)
    const primeTemplate = this.shipTemplates[0]; // VLCC / Tanker
    const primeFlag = this.flagStates[0]; // India
    const bearingToCenter = Math.atan2(centerLon - originLon, centerLat - originLat) * (180 / Math.PI);
    const normalizedBearing = Math.round((bearingToCenter + 360) % 360);

    const primeTrack = [
      { time: 'T-24h', lat: originLat - 0.22, lon: originLon - 0.18, speed: 15.4, heading: normalizedBearing, type: 'ping' },
      { time: 'T-12h', lat: originLat - 0.11, lon: originLon - 0.09, speed: 14.8, heading: normalizedBearing, type: 'ping' },
      { time: 'T-origin', lat: originLat + 0.002, lon: originLon + 0.001, speed: 9.8, heading: normalizedBearing, type: 'ping', isOriginMatch: true },
      { time: 'T-pass', lat: centerLat + 0.08, lon: centerLon + 0.05, speed: 14.6, heading: normalizedBearing, type: 'ping', isRadarPass: true },
      { time: 'T+12h', lat: centerLat + 0.25, lon: centerLon + 0.18, speed: 15.1, heading: normalizedBearing, type: 'ping' }
    ];

    fleet.push({
      id: `vessel-gen-prime-01`,
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
      destination: 'SIKKA REFINERY TERMINAL',
      status: 'PRIMARY SUSPECT',
      statusLevel: 'critical',
      dataIntegrity: 'SIMULATED / SATELLITE AIS',
      pingCount: 112,
      pingRatePerHour: 11.2,
      hasDeadReckoningGap: false,
      metricsAtOrigin: {
        closestDistKm: 0.38,
        timeDeltaMin: 8,
        speedKnots: 9.8,
        prevSpeedKnots: 14.8,
        headingDeg: normalizedBearing,
        slickOrientationDeg: normalizedBearing
      },
      track: primeTrack
    });

    // 2. Dark Vessel Suspect (Transponder Dropout Gap - USP 03)
    if (includeDarkSuspect) {
      const darkTemplate = this.shipTemplates[1]; // Chemical Tanker
      const darkFlag = this.flagStates[1]; // Panama
      const darkBearing = (normalizedBearing + 25) % 360;

      const darkTrack = [
        { time: 'T-20h', lat: originLat - 0.28, lon: originLon - 0.25, speed: 13.8, heading: darkBearing, type: 'ping' },
        { time: 'T-14h (AIS Cut)', lat: originLat - 0.12, lon: originLon - 0.10, speed: 13.5, heading: darkBearing, type: 'ping' },
        { time: 'T-origin (Dead Reckoned)', lat: originLat + 0.015, lon: originLon + 0.010, speed: 8.2, heading: darkBearing, type: 'gap', isDeadReckoning: true, isOriginMatch: true },
        { time: 'T-pass (AIS Resumed)', lat: centerLat + 0.12, lon: centerLon + 0.08, speed: 14.0, heading: darkBearing, type: 'ping', isRadarPass: true }
      ];

      fleet.push({
        id: `vessel-gen-dark-02`,
        rank: 2,
        name: 'PACIFIC SHADOW',
        mmsi: '351884001',
        imo: '9481230',
        callsign: '3EB9',
        flag: 'Panama 🇵🇦',
        vesselType: 'Chemical / Product Tanker',
        typeCategory: 'tanker',
        lengthM: 182,
        beamM: 28,
        draughtM: 10.4,
        destination: 'HIGH SEAS TRANSIT',
        status: 'SUSPECT (AIS GAP)',
        statusLevel: 'warning',
        dataIntegrity: 'AIS GAP / DARK CORRIDOR',
        pingCount: 42,
        pingRatePerHour: 4.1,
        hasDeadReckoningGap: true,
        gapDurationHours: 4.8,
        metricsAtOrigin: {
          closestDistKm: 1.65,
          timeDeltaMin: 22,
          speedKnots: 8.2,
          prevSpeedKnots: 13.5,
          headingDeg: darkBearing,
          slickOrientationDeg: normalizedBearing
        },
        track: darkTrack
      });
    }

    // 3. Populate Remaining Random Background Candidates
    for (let i = fleet.length; i < count; i++) {
      const template = this.sample(this.shipTemplates.slice(2)); // Non-tankers / cargo
      const flag = this.sample(this.flagStates);
      const heading = this.randInt(0, 359);
      const speed = this.randFloat(template.speed[0], template.speed[1], 1);
      const offsetKm = this.randFloat(7.5, 22.0, 1);
      const offsetAngle = Math.random() * 2 * Math.PI;

      const candLat = originLat + (offsetKm * Math.cos(offsetAngle)) * kmToDegLat;
      const candLon = originLon + (offsetKm * Math.sin(offsetAngle)) * kmToDegLon;

      const candTrack = [
        { time: 'T-24h', lat: candLat - 0.15, lon: candLon - 0.15, speed, heading, type: 'ping' },
        { time: 'T-origin', lat: candLat, lon: candLon, speed, heading, type: 'ping' },
        { time: 'T-pass', lat: candLat + 0.15, lon: candLon + 0.15, speed, heading, type: 'ping', isRadarPass: true }
      ];

      fleet.push({
        id: `vessel-gen-cand-${i + 1}`,
        rank: i + 1,
        name: this.sample(template.names) + ' ' + (i + 1),
        mmsi: flag.mmsiPrefix + String(this.randInt(100000, 999999)),
        imo: '9' + String(this.randInt(100000, 999999)),
        callsign: flag.callPrefix + String(this.randInt(100, 999)),
        flag: flag.name,
        vesselType: template.type,
        typeCategory: template.category,
        lengthM: this.randInt(template.length[0], template.length[1]),
        beamM: this.randInt(template.beam[0], template.beam[1]),
        draughtM: this.randFloat(template.draught[0], template.draught[1], 1),
        destination: 'COMMERCIAL SEAPORT',
        status: 'EXCLUDED',
        statusLevel: 'excluded',
        dataIntegrity: 'SIMULATED AIS',
        pingCount: this.randInt(60, 95),
        pingRatePerHour: 8.5,
        hasDeadReckoningGap: false,
        metricsAtOrigin: {
          closestDistKm: offsetKm,
          timeDeltaMin: this.randInt(90, 480),
          speedKnots: speed,
          prevSpeedKnots: speed,
          headingDeg: heading,
          slickOrientationDeg: normalizedBearing
        },
        track: candTrack
      });
    }

    return fleet;
  }
}

module.exports = new TrafficGenerator();
