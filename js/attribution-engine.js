/**
 * TideTrace - SIH26143 Maritime Intelligence Console
 * Attribution Engine: Spatio-Temporal Multi-Factor Bayesian Scoring
 * Computes proximity, temporal overlap, trajectory collinearity,
 * vessel hazard ratings, and behavioral anomalies with full audit trail.
 */

class AttributionEngine {
  constructor() {
    // Default weights
    this.weights = {
      proximity: 0.35,
      timing: 0.25,
      trajectory: 0.20,
      vesselType: 0.10,
      behavior: 0.10
    };

    // Standard deviation parameters for decay functions
    this.sigmaDistKm = 3.0; // Distance scale
    this.sigmaTimeHours = 2.0; // Time scale

    // Hazard weights by vessel category
    this.typeHazardMap = {
      'Crude Oil Tanker': 96,
      'VLCC Crude Oil Tanker': 96,
      'Chemical / Product Tanker': 88,
      'Oil Products Tanker': 85,
      'Bunker Barge': 82,
      'LPG Carrier': 45,
      'Bulk Carrier': 40,
      'Container Ship': 20,
      'Cargo Vessel': 18,
      'Offshore Supply Ship': 15,
      'Fishing Vessel': 15,
      'Tug / Workboat': 10,
      'Pleasure Craft / Yacht': 5
    };
  }

  /**
   * Set custom weights matrix from Method UI
   */
  setWeights(newWeights) {
    this.weights = { ...this.weights, ...newWeights };
  }

  /**
   * Get current active weights
   */
  getWeights() {
    return { ...this.weights };
  }

  /**
   * Calculate proximity score based on closest distance in km
   */
  calcProximityScore(distKm) {
    if (distKm == null || isNaN(distKm)) return 0;
    // Gaussian decay from 0km to 20km
    const score = 100 * Math.exp(-Math.pow(distKm, 2) / (2 * Math.pow(this.sigmaDistKm, 2)));
    return Math.max(0, Math.min(100, Math.round(score * 10) / 10));
  }

  /**
   * Calculate timing score based on delta minutes from release epoch
   */
  calcTimingScore(deltaMin) {
    if (deltaMin == null || isNaN(deltaMin)) return 0;
    const deltaHours = Math.abs(deltaMin) / 60.0;
    const score = 100 * Math.exp(-Math.pow(deltaHours, 2) / (2 * Math.pow(this.sigmaTimeHours, 2)));
    return Math.max(0, Math.min(100, Math.round(score * 10) / 10));
  }

  /**
   * Calculate trajectory alignment score between vessel course and slick orientation
   */
  calcTrajectoryScore(vesselHeadingDeg, slickOrientationDeg) {
    if (vesselHeadingDeg == null || slickOrientationDeg == null) return 50;
    const diffRad = Math.abs(vesselHeadingDeg - slickOrientationDeg) * (Math.PI / 180.0);
    // Collinear alignment (cosine)
    const score = 100 * Math.abs(Math.cos(diffRad));
    return Math.max(0, Math.min(100, Math.round(score * 10) / 10));
  }

  /**
   * Calculate hazard rating based on ship type
   */
  calcTypeHazardScore(vesselType) {
    return this.typeHazardMap[vesselType] || 25;
  }

  /**
   * Calculate behavioral anomaly score based on speed change during zone transit
   */
  calcBehaviorScore(currentSpeedKn, prevSpeedKn) {
    if (currentSpeedKn == null || prevSpeedKn == null) return 20;
    const speedDrop = prevSpeedKn - currentSpeedKn;
    if (speedDrop > 3.0) {
      // Significant deceleration (e.g. slowdown for illegal bilge/sludge discharge)
      return Math.min(100, 70 + Math.round(speedDrop * 4));
    } else if (speedDrop < -2.0) {
      // Speed up
      return 35;
    } else {
      // Constant cruising speed
      return 15;
    }
  }

  /**
   * Score and rank an array of vessels for a given scene detection
   */
  rankVessels(vesselList, slickOrientationDeg = 149) {
    if (!vesselList || vesselList.length === 0) {
      return [];
    }

    const totalWeight = Object.values(this.weights).reduce((a, b) => a + b, 0);

    const scoredList = vesselList.map(v => {
      const metrics = v.metricsAtOrigin || {};
      
      const sProx = v.subScores?.proximity != null ? v.subScores.proximity : this.calcProximityScore(metrics.closestDistKm);
      const sTime = v.subScores?.timing != null ? v.subScores.timing : this.calcTimingScore(metrics.timeDeltaMin);
      const sTraj = v.subScores?.trajectory != null ? v.subScores.trajectory : this.calcTrajectoryScore(metrics.headingDeg, slickOrientationDeg);
      const sType = v.subScores?.vesselType != null ? v.subScores.vesselType : this.calcTypeHazardScore(v.vesselType);
      const sBehav = v.subScores?.behavior != null ? v.subScores.behavior : this.calcBehaviorScore(metrics.speedKnots, metrics.prevSpeedKnots);

      const weightedSum = (
        sProx * this.weights.proximity +
        sTime * this.weights.timing +
        sTraj * this.weights.trajectory +
        sType * this.weights.vesselType +
        sBehav * this.weights.behavior
      );

      const calculatedScore = totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 10) / 10 : 0;

      // Determine suspect status level
      let status = v.status;
      let statusLevel = v.statusLevel;
      if (calculatedScore >= 80) {
        status = 'PRIMARY SUSPECT';
        statusLevel = 'critical';
      } else if (calculatedScore >= 50) {
        status = v.hasDeadReckoningGap ? 'SUSPECT (AIS GAP)' : 'PERSON OF INTEREST';
        statusLevel = 'warning';
      } else {
        status = 'EXCLUDED';
        statusLevel = 'excluded';
      }

      return {
        ...v,
        totalScore: calculatedScore,
        subScores: {
          proximity: sProx,
          timing: sTime,
          trajectory: sTraj,
          vesselType: sType,
          behavior: sBehav
        },
        status,
        statusLevel
      };
    });

    // Sort descending by totalScore
    scoredList.sort((a, b) => b.totalScore - a.totalScore);

    // Assign rank 1, 2, 3...
    return scoredList.map((item, index) => ({
      ...item,
      rank: index + 1
    }));
  }
}

// Global instance
window.attributionEngine = new AttributionEngine();
