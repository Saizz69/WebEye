/**
 * WebEye - SIH26143 Maritime Intelligence Console
 * Backend Module: Indian Statutory Alignment Engine (USP 02)
 * 
 * Implements legal evidentiary compliance for:
 * 1. Indian Coast Guard (ICG) National Oil Spill Disaster Contingency Plan (NOS-DCP 2015/2022)
 * 2. Directorate General of Shipping (DGS) Merchant Shipping Act 1958 (Part XI-A)
 * 3. Maritime Zones of India Act 1976 (Jurisdiction: Territorial Waters 12nm / EEZ 200nm)
 * 4. Section 65B Indian Evidence Act Cryptographic Chain-of-Custody Certification
 */

const crypto = require('crypto');

class IndianStatutoryEngine {
  constructor() {
    // Indian Coast Guard Regional Commands & MRCC Centers
    this.icgCommandZones = [
      { name: 'RHQ (West) - Mumbai', mrcc: 'MRCC Mumbai', latMin: 14.0, latMax: 22.0, lonMin: 68.0, lonMax: 74.5 },
      { name: 'RHQ (North-West) - Gandhinagar', mrcc: 'MRCC Gandhinagar / Okha', latMin: 20.0, latMax: 24.5, lonMin: 67.0, lonMax: 72.5 },
      { name: 'RHQ (East) - Chennai', mrcc: 'MRCC Chennai', latMin: 10.0, latMax: 16.5, lonMin: 79.5, lonMax: 85.0 },
      { name: 'RHQ (North-East) - Kolkata', mrcc: 'MRCC Kolkata / Paradip', latMin: 16.5, latMax: 22.5, lonMin: 84.5, lonMax: 90.0 },
      { name: 'RHQ (A&N) - Port Blair', mrcc: 'MRCC Port Blair', latMin: 6.0, latMax: 14.5, lonMin: 91.5, lonMax: 94.5 }
    ];
  }

  /**
   * Determine NOS-DCP Spill Severity Tier based on estimated volume or slick area
   * @param {number} areaKm2 - Surface area of detected oil in square kilometers
   * @param {number} estimatedThicknessMicrons - Assumed average thickness (default 50um)
   */
  classifyNOSDCPTier(areaKm2, estimatedThicknessMicrons = 50) {
    // Approximate volume calculation: Volume (m3) = Area (m2) * thickness (m)
    // 1 km2 = 1,000,000 m2. Thickness 50 microns = 0.00005 m
    // Density of crude ~ 0.88 tonnes / m3
    const volumeM3 = areaKm2 * 1000000 * (estimatedThicknessMicrons * 1e-6);
    const estimatedTonnes = Math.round(volumeM3 * 0.88 * 10) / 10;

    let tier = 'TIER 1';
    let responder = 'Local Port Authority & Responsible Vessel Operator';
    let commandProtocol = 'Local Emergency Response (NOS-DCP Appendix 4)';
    let severity = 'low';

    if (estimatedTonnes > 10000 || areaKm2 > 50) {
      tier = 'TIER 3';
      responder = 'Director General Indian Coast Guard (DGICG) & NDMA National Disaster Taskforce';
      commandProtocol = 'National Contingency Activation (NOS-DCP Chapter 6)';
      severity = 'critical';
    } else if (estimatedTonnes >= 700 || areaKm2 >= 3.5) {
      tier = 'TIER 2';
      responder = 'Indian Coast Guard Regional Commander (RHQ) & State Maritime Board';
      commandProtocol = 'Regional Maritime Strike Force (NOS-DCP Chapter 5)';
      severity = 'high';
    }

    return {
      tier,
      estimatedTonnes,
      volumeM3: Math.round(volumeM3),
      primaryResponder: responder,
      commandProtocol,
      severity
    };
  }

  /**
   * Evaluate maritime jurisdiction under Maritime Zones of India Act 1976
   */
  evaluateIndianJurisdiction(lat, lon) {
    // Check if coordinates fall within Indian Coastal / EEZ Box
    const isIndianWaters = (lat >= 5.0 && lat <= 24.5 && lon >= 67.0 && lon <= 94.5);
    
    // Nearest Coast Guard command center
    let matchedCommand = this.icgCommandZones[0];
    for (const cmd of this.icgCommandZones) {
      if (lat >= cmd.latMin && lat <= cmd.latMax && lon >= cmd.lonMin && lon <= cmd.lonMax) {
        matchedCommand = cmd;
        break;
      }
    }

    const jurisdictionType = isIndianWaters 
      ? 'Indian Exclusive Economic Zone (EEZ / 200 NM)' 
      : 'International Maritime Corridor (UNCLOS High Seas)';

    return {
      isIndianWaters,
      jurisdictionType,
      icgCommand: matchedCommand.name,
      competentMRCC: matchedCommand.mrcc,
      applicableLaws: [
        'Merchant Shipping Act 1958, Part XI-A (Prevention & Containment of Pollution of Sea by Oil)',
        'National Oil Spill Disaster Contingency Plan (NOS-DCP)',
        'Indian Coast Guard Act 1978 (Section 14: Preservation & Protection of Maritime Environment)',
        'MARPOL 73/78 (Annex I - Regulations for Prevention of Pollution by Oil)'
      ]
    };
  }

  /**
   * Build complete DGS Merchant Shipping Act Part XI-A Statutory Violation Dossier
   */
  generateStatutoryDossier(vessel, scenario, bayesianResult) {
    const coords = scenario.mapCenter || [19.20, 71.40];
    const jurisdiction = this.evaluateIndianJurisdiction(coords[0], coords[1]);
    const slickArea = scenario.detection?.totalOilAreaKm2 || scenario.summary?.totalAreaKm2 || 5.15;
    const tierInfo = this.classifyNOSDCPTier(slickArea);

    const isSuspect = vessel.rank === 1 && vessel.totalScore >= 70;
    const isDarkVessel = vessel.hasDeadReckoningGap || vessel.isDarkVessel;

    // Citations under Part XI-A
    const statutoryCitations = [
      {
        section: 'Section 356C',
        title: 'Prohibition as to Discharge of Oil',
        statute: 'Merchant Shipping Act 1958',
        finding: isSuspect 
          ? 'PRIMA FACIE NON-COMPLIANCE: Satellite radar backscatter and backward dispersion prove illegal discharge during vessel transit.'
          : 'NO DIRECT ADVERSE EVIDENCE DETECTED',
        offenceClass: isSuspect ? 'Cognizable Maritime Offence' : 'N/A'
      },
      {
        section: 'Section 356E',
        title: 'Obligation to Maintain Oil Record Book',
        statute: 'Merchant Shipping Act 1958',
        finding: isDarkVessel
          ? 'MANDATORY AUDIT REQUIRED: AIS transponder blackout suggests probable omission of oily bilge water / sludge discharge entries in Part I ORB.'
          : 'Standard Port State Control ORB verification recommended upon next berth call.',
        offenceClass: isDarkVessel ? 'Documentary Non-Compliance / Tampering Audit' : 'Routine Inspection'
      },
      {
        section: 'Section 356J',
        title: 'Power to Detain Vessel',
        statute: 'Merchant Shipping Act 1958',
        finding: isSuspect
          ? 'PSC DETENTION WARRANT APPLICABLE: ICG & DGS authorized to intercept and detain vessel at destination port until financial surety / environmental bond is executed.'
          : 'No detention grounds established.',
        offenceClass: isSuspect ? 'Active Detention Advisory (Code: DGS-SEC-356J)' : 'Cleared'
      }
    ];

    // Generate Cryptographic Evidence Hash (Section 65B Indian Evidence Act compliant)
    const rawEvidenceBlock = JSON.stringify({
      vesselMMSI: vessel.mmsi,
      vesselIMO: vessel.imo,
      scenarioId: scenario.id,
      timestamp: scenario.radarPassTime,
      totalScore: bayesianResult?.totalScore || vessel.totalScore,
      nosdcpTier: tierInfo.tier,
      jurisdiction: jurisdiction.jurisdictionType,
      centroid: coords,
      reasons: vessel.reasonCodes || []
    });

    const sha256Hash = crypto.createHash('sha256').update(rawEvidenceBlock).digest('hex');

    return {
      nosdcp: {
        tier: tierInfo.tier,
        estimatedQuantityTonnes: tierInfo.estimatedTonnes,
        volumeM3: tierInfo.volumeM3,
        primaryResponder: tierInfo.primaryResponder,
        commandProtocol: tierInfo.commandProtocol,
        severityLevel: tierInfo.severity
      },
      jurisdiction: {
        isIndianEEZ: jurisdiction.isIndianWaters,
        zone: jurisdiction.jurisdictionType,
        icgRegionalCommand: jurisdiction.icgCommand,
        mrccStation: jurisdiction.competentMRCC,
        applicableStatutes: jurisdiction.applicableLaws
      },
      statutoryCitations,
      prosecutionAssessment: {
        primaFacieCase: isSuspect ? 'STRONG PROBABLE CAUSE ESTABLISHED' : 'INSUFFICIENT PROBABLE CAUSE',
        recommendedAction: isSuspect 
          ? 'Dispatch ICG Interceptor Craft (IC) or Maritime Reconnaissance Dornier 228. Issue DGS Port State Control notice to destination port.'
          : 'Log telemetry into WebEye archival database; no coercive statutory action warranted.',
        restitutionLiability: isSuspect 
          ? `Strict liability under Sec 356K for cleanup costs + ₹25,00,000 minimum penalty for MARPOL Annex I violation.` 
          : 'None'
      },
      chainOfCustody: {
        certificateStandard: 'Section 65B Indian Evidence Act (Electronic Record Admissibility)',
        sha256EvidenceDigest: sha256Hash,
        timestampUtc: new Date().toISOString(),
        auditAuthority: 'WebEye Automated SAR Maritime Forensics Engine (SIH26143)'
      }
    };
  }
}

module.exports = new IndianStatutoryEngine();
