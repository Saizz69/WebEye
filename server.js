/**
 * WebEye - Maritime SAR Satellite Oil Spill Detection & AIS Attribution Console
 * SIH26143 Production Backend Server & REST API Gateway
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Import Backend Domain Engines
const scenarioService = require('./backend/scenario-service');
const trafficGenerator = require('./backend/traffic-generator');
const bayesianEngine = require('./backend/bayesian-forensic-engine');
const statutoryEngine = require('./backend/indian-statutory-engine');
const darkDetector = require('./backend/dark-vessel-detector');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.geojson': 'application/geo+json; charset=utf-8'
};

/**
 * Helper to send JSON responses
 */
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Cache-Control': 'no-cache'
  });
  res.end(JSON.stringify(data, null, 2));
}

/**
 * Helper to parse request JSON body
 */
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 10 * 1024 * 1024) { // 10MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        const parsed = body ? JSON.parse(body) : {};
        resolve(parsed);
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  // Handle CORS Pre-flight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    });
    res.end();
    return;
  }

  // ==========================================
  // REST API ENDPOINTS
  // ==========================================

  // 1. Health & Status
  if (pathname === '/api/health' && method === 'GET') {
    return sendJSON(res, 200, {
      status: 'ONLINE',
      system: 'WebEye Maritime Intelligence Platform',
      problemStatement: 'SIH26143',
      serverTimeUtc: new Date().toISOString(),
      usps: [
        '01 Explainable Forensic Scoring (Bayesian Multi-Factor Attribution)',
        '02 Indian Statutory Alignment (ICG NOS-DCP & Merchant Shipping Act Part XI-A)',
        '03 AIS Dropout / Dark Vessel Flags (Deliberate Transponder Shut-off Detection)',
        '04 Zero-Hardware Commodity Stack (Copernicus Sentinel-1/2 + Open Metocean)'
      ]
    });
  }

  // 2. List All Scenarios
  if (pathname === '/api/scenarios' && method === 'GET') {
    const scenarios = scenarioService.getAllScenarios();
    return sendJSON(res, 200, { success: true, scenarios });
  }

  // 3. Get Specific Scenario Details
  if (pathname.startsWith('/api/scenarios/') && method === 'GET') {
    const scenarioId = pathname.replace('/api/scenarios/', '').split('/')[0];
    const scenario = scenarioService.getScenarioById(scenarioId);
    if (scenario) {
      return sendJSON(res, 200, { success: true, scenario });
    } else {
      return sendJSON(res, 404, { success: false, error: 'Scenario not found' });
    }
  }

  // 4. Run Analysis Pipeline (Hindcast/Forecast + Bayesian Re-scoring)
  if (pathname === '/api/analyze' && method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      const scenarioId = body.scenarioId || 'OS-GOMMC-20230924';
      const updatedScenario = scenarioService.runAnalysis(scenarioId, body);
      if (updatedScenario) {
        return sendJSON(res, 200, { success: true, scenario: updatedScenario });
      } else {
        return sendJSON(res, 404, { success: false, error: 'Scenario not found' });
      }
    } catch (err) {
      return sendJSON(res, 500, { success: false, error: err.message });
    }
  }

  // 5. Probe Arbitrary Ocean Point
  if (pathname === '/api/probe' && method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      const lat = parseFloat(body.lat);
      const lon = parseFloat(body.lon);
      const hindcastH = parseFloat(body.hindcastHours || 48);
      const forecastH = parseFloat(body.forecastHours || 36);

      if (isNaN(lat) || isNaN(lon)) {
        return sendJSON(res, 400, { success: false, error: 'Invalid coordinates' });
      }

      const probeResult = scenarioService.probePoint(lat, lon, hindcastH, forecastH);
      return sendJSON(res, 200, { success: true, ...probeResult });
    } catch (err) {
      return sendJSON(res, 500, { success: false, error: err.message });
    }
  }

  // 6. Generate Dynamic Random Background Ships & Traffic
  if (pathname === '/api/vessels/simulate-traffic' && method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      const scenarioId = body.scenarioId || 'OS-GOMMC-20230924';
      const scenario = scenarioService.getScenarioById(scenarioId);
      
      if (!scenario) {
        return sendJSON(res, 404, { success: false, error: 'Scenario not found' });
      }

      const center = scenario.mapCenter;
      const count = parseInt(body.count || 35);
      const backgroundTraffic = trafficGenerator.generateBackgroundTraffic(center[0], center[1], count, 60);
      scenario.backgroundTraffic = backgroundTraffic;

      return sendJSON(res, 200, {
        success: true,
        scenarioId,
        count: backgroundTraffic.length,
        backgroundTraffic
      });
    } catch (err) {
      return sendJSON(res, 500, { success: false, error: err.message });
    }
  }

  // 7. Get Full Audit Dossier (USPs 01, 02, 03, 04)
  if (pathname.startsWith('/api/vessels/') && pathname.includes('/dossier') && method === 'GET') {
    const parts = pathname.replace('/api/vessels/', '').split('/');
    const scenarioId = parts[0];
    const vesselId = parts[1];

    const dossier = scenarioService.getVesselDossier(scenarioId, vesselId);
    if (dossier) {
      return sendJSON(res, 200, { success: true, dossier });
    } else {
      return sendJSON(res, 404, { success: false, error: 'Vessel or scenario not found' });
    }
  }

  // 8. Stream SAR Satellite Image Overlay (Picture36-2-1.png)
  if (pathname.startsWith('/api/imagery/') && pathname.endsWith('/sar') && method === 'GET') {
    const sarFilePath = path.join(__dirname, 'Picture36-2-1.png');
    if (fs.existsSync(sarFilePath)) {
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(sarFilePath).pipe(res);
      return;
    } else {
      return sendJSON(res, 404, { success: false, error: 'SAR image not found' });
    }
  }

  // 9. Stream Sentinel-2 Optical Satellite Image Overlay
  if (pathname.startsWith('/api/imagery/') && pathname.endsWith('/optical') && method === 'GET') {
    const optFilePath = path.join(__dirname, '2026-04-07-00-00-2026-04-07-23-59-sentinel-2-l2a-highlight-optimized-natural-color.jpg');
    if (fs.existsSync(optFilePath)) {
      res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(optFilePath).pipe(res);
      return;
    } else {
      return sendJSON(res, 404, { success: false, error: 'Optical image not found' });
    }
  }

  // ==========================================
  // STATIC ASSET SERVER
  // ==========================================
  let reqPath = pathname;
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = path.join(__dirname, reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found - WebEye Server');
    } else {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`======================================================`);
  console.log(`🚀 WebEye Maritime AI Backend Server Active`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🛡️  USPs Loaded: [Bayesian Scoring, NOS-DCP/MSA, Dark Vessel, Zero-Hardware]`);
  console.log(`🛰️  Satellite Chips: Sentinel-1 SAR & Sentinel-2 L2A Ingested`);
  console.log(`======================================================`);
});
