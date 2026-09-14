/**
 * TideTrace - SIH26143 Maritime Intelligence Console
 * Timeline Controller: 4D Time Scrubber, Playback Engine, and Vessel Interpolator.
 */

class TimelineController {
  constructor() {
    this.isPlaying = false;
    this.playbackSpeed = 1.0; // 1x, 5x, 20x
    this.progress = 0.57; // 0.0 (-48h) to 1.0 (+36h), 0.57 = Radar pass (0h)
    this.animationTimer = null;
    this.currentScenario = null;

    // Time extent parameters (hours)
    this.hindcastHours = 48;
    this.forecastHours = 36;
    this.totalHours = 84;
    this.radarPassProgress = 48 / 84; // ~0.5714

    // Callbacks
    this.onTickCallback = null;
  }

  /**
   * Initialize DOM event listeners
   */
  init() {
    const playBtn = document.getElementById('btn-play-pause');
    const radarSnapBtn = document.getElementById('btn-snap-radar');
    const slider = document.getElementById('timeline-slider');
    const speedSelect = document.getElementById('playback-speed-select');

    if (playBtn) {
      playBtn.addEventListener('click', () => this.togglePlay());
    }

    if (radarSnapBtn) {
      radarSnapBtn.addEventListener('click', () => this.snapToRadarPass());
    }

    if (slider) {
      slider.addEventListener('input', (e) => {
        this.setProgress(parseFloat(e.target.value) / 100.0);
      });
    }

    if (speedSelect) {
      speedSelect.addEventListener('change', (e) => {
        this.playbackSpeed = parseFloat(e.target.value);
      });
    }
  }

  /**
   * Set current active scenario
   */
  setScenario(scenario) {
    this.currentScenario = scenario;
    this.snapToRadarPass();
  }

  /**
   * Toggle Play / Pause
   */
  togglePlay() {
    this.isPlaying = !this.isPlaying;
    const playBtn = document.getElementById('btn-play-pause');
    if (playBtn) {
      playBtn.innerHTML = this.isPlaying ? `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        <span>PAUSE</span>
      ` : `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
        <span>PLAY</span>
      `;
    }

    if (this.isPlaying) {
      this.startLoop();
    } else {
      this.stopLoop();
    }
  }

  startLoop() {
    if (this.animationTimer) clearInterval(this.animationTimer);
    const step = 0.002 * this.playbackSpeed;
    this.animationTimer = setInterval(() => {
      let nextProgress = this.progress + step;
      if (nextProgress > 1.0) {
        nextProgress = 0.0; // Loop back
      }
      this.setProgress(nextProgress);
    }, 40);
  }

  stopLoop() {
    if (this.animationTimer) {
      clearInterval(this.animationTimer);
      this.animationTimer = null;
    }
  }

  /**
   * Snap timeline directly to Radar Pass epoch (0h)
   */
  snapToRadarPass() {
    this.setProgress(this.radarPassProgress);
  }

  /**
   * Set progress [0.0 to 1.0] and update UI & map markers
   */
  setProgress(val) {
    this.progress = Math.max(0.0, Math.min(1.0, val));

    // Update Slider
    const slider = document.getElementById('timeline-slider');
    if (slider) {
      slider.value = (this.progress * 100).toFixed(1);
    }

    // Calculate relative hour and display string
    const currentRelativeHour = (this.progress * this.totalHours) - this.hindcastHours;
    this.updateTimeDisplay(currentRelativeHour);

    // Update map vessel positions
    if (window.mapEngine) {
      window.mapEngine.updateVesselPositionsAtProgress(this.progress);
    }

    if (this.onTickCallback) {
      this.onTickCallback(this.progress, currentRelativeHour);
    }
  }

  /**
   * Update time display label in UI
   */
  updateTimeDisplay(relativeHour) {
    const timeDisplayElem = document.getElementById('timeline-time-display');
    const relativeBadgeElem = document.getElementById('timeline-relative-badge');
    if (!timeDisplayElem) return;

    if (!this.currentScenario || !this.currentScenario.radarPassTime) {
      timeDisplayElem.textContent = '2023-09-23 18:58 UTC';
      return;
    }

    const baseEpochMs = new Date(this.currentScenario.radarPassTime).getTime();
    const currentEpochMs = baseEpochMs + (relativeHour * 3600 * 1000);
    const dateObj = new Date(currentEpochMs);

    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getUTCDate()).padStart(2, '0');
    const hours = String(dateObj.getUTCHours()).padStart(2, '0');
    const mins = String(dateObj.getUTCMinutes()).padStart(2, '0');
    const secs = String(dateObj.getUTCSeconds()).padStart(2, '0');

    timeDisplayElem.textContent = `${year}-${month}-${day} ${hours}:${mins}:${secs} UTC`;

    if (relativeBadgeElem) {
      if (Math.abs(relativeHour) < 0.15) {
        relativeBadgeElem.textContent = 'RADAR PASS (T0)';
        relativeBadgeElem.className = 'timeline-badge radar-pass';
      } else if (relativeHour < 0) {
        relativeBadgeElem.textContent = `HINDCAST T ${relativeHour.toFixed(1)}h`;
        relativeBadgeElem.className = 'timeline-badge hindcast';
      } else {
        relativeBadgeElem.textContent = `FORECAST T +${relativeHour.toFixed(1)}h`;
        relativeBadgeElem.className = 'timeline-badge forecast';
      }
    }
  }
}

// Global instance
window.timelineController = new TimelineController();
