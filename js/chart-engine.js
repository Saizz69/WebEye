/**
 * TideTrace - SIH26143 Maritime Intelligence Console
 * Chart Engine: High-performance Canvas charts for Hindcast Uncertainty Curves,
 * pipeline stage latency graphs, and vessel multi-factor score radar charts.
 */

class ChartEngine {
  constructor() {}

  /**
   * Render Hindcast Uncertainty Curve on Canvas
   * Shows spatial dispersion error (radius km) increasing back in time.
   */
  renderUncertaintyChart(canvasId, curveData, activeOriginHour = -11, activeRadiusKm = 8.3) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    const padding = { top: 20, right: 30, bottom: 25, left: 35 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    if (!curveData || curveData.length < 2) {
      // Empty state
      ctx.fillStyle = '#64748b';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No hindcast dispersion (Clean scene)', width / 2, height / 2);
      return;
    }

    const maxKm = 40;
    const minHour = -48;
    const maxHour = 0;

    const getX = (hour) => padding.left + ((hour - minHour) / (maxHour - minHour)) * chartW;
    const getY = (km) => padding.top + chartH - (km / maxKm) * chartH;

    // Background grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    [0, 17, 35].forEach(km => {
      const y = getY(km);
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartW, y);
    });
    ctx.stroke();

    // Y Axis Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px Inter, monospace';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText('0', padding.left - 8, getY(0));
    ctx.fillText('17', padding.left - 8, getY(17));
    ctx.fillText('35', padding.left - 8, getY(35));

    // X Axis Labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('-48h', getX(-48), padding.top + chartH + 6);
    ctx.fillText('-24h', getX(-24), padding.top + chartH + 6);
    ctx.fillText('-0h', getX(0), padding.top + chartH + 6);

    // Area Gradient Fill
    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
    gradient.addColorStop(0, 'rgba(245, 158, 11, 0.25)');
    gradient.addColorStop(1, 'rgba(245, 158, 11, 0.02)');

    ctx.beginPath();
    curveData.forEach((pt, idx) => {
      const x = getX(pt.hour);
      const y = getY(pt.km);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(getX(-48), getY(0));
    ctx.lineTo(getX(0), getY(0));
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Curve Stroke Line
    ctx.beginPath();
    curveData.forEach((pt, idx) => {
      const x = getX(pt.hour);
      const y = getY(pt.km);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Active Origin Vertical Dash line & Marker
    const originX = getX(activeOriginHour);
    const originY = getY(activeRadiusKm);

    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(originX, padding.top);
    ctx.lineTo(originX, padding.top + chartH);
    ctx.stroke();
    ctx.setLineDash([]);

    // Origin Circle Marker
    ctx.beginPath();
    ctx.arc(originX, originY, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#38bdf8';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Annotation text box
    const labelText = `origin ${activeOriginHour}h • ${activeRadiusKm} km`;
    ctx.font = '600 11px Inter, sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillText(labelText, originX + 8, Math.max(padding.top + 12, originY - 4));
  }

  /**
   * Render Score Comparison Bars HTML
   */
  renderSubScoresHTML(subScores) {
    if (!subScores) return '';
    const items = [
      { label: 'Proximity', val: subScores.proximity, color: '#38bdf8' },
      { label: 'Timing', val: subScores.timing, color: '#f59e0b' },
      { label: 'Trajectory', val: subScores.trajectory, color: '#10b981' },
      { label: 'Hazard Rating', val: subScores.vesselType, color: '#ec4899' },
      { label: 'Behavioral Anomaly', val: subScores.behavior, color: '#8b5cf6' }
    ];

    return `
      <div class="sub-score-grid">
        ${items.map(i => `
          <div class="sub-score-item">
            <div class="sub-score-header">
              <span class="sub-score-label">${i.label}</span>
              <span class="sub-score-val" style="color: ${i.color}">${i.val}%</span>
            </div>
            <div class="sub-score-track">
              <div class="sub-score-fill" style="width: ${i.val}%; background-color: ${i.color}"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

// Global instance
window.chartEngine = new ChartEngine();
