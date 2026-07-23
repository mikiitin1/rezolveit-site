// RezolveIT theme switcher — three explicit modes: 'light', 'dark', or
// 'system' (follows the OS prefers-color-scheme). The chosen mode is saved in
// localStorage under 'rz-theme'. Default (nothing saved) is 'dark', matching
// the site's dark-first design. The :root palette in Base.astro is the dark
// palette; paint() overlays the light palette when light is effective.
window.RZTheme = {
  KEY: 'rz-theme',
  light: {
    '--bg':'#F3F4F9','--panel':'#FFFFFF','--panel-deep':'#F7F8FC','--inset':'#EDEFF6',
    '--cta1':'#FFFFFF','--cta2':'#F1F3FA',
    '--text':'#12142A','--text2':'#262A40','--text3':'#3B3F55',
    '--muted':'#5B5F73','--muted2':'#7C8095','--muted3':'#A0A4B8','--line2':'#D9DBE7',
    '--accent-strong':'#0B8A78','--accent-strong2':'#0B8A78',
    '--card-bg':'rgba(18,20,42,.03)','--card-bg2':'rgba(18,20,42,.04)',
    '--border0':'rgba(18,20,42,.07)','--border':'rgba(18,20,42,.1)','--border2':'rgba(18,20,42,.18)',
    '--nav-bg':'rgba(247,248,252,.85)',
    '--shadow':'rgba(30,35,70,.16)','--shadow2':'rgba(30,35,70,.14)','--shadow3':'rgba(30,35,70,.12)'
  },
  media: null,
  // The saved mode, defaulting to 'dark' when nothing is stored.
  getMode() {
    var m = null;
    try { m = localStorage.getItem(this.KEY); } catch (e) {}
    return (m === 'light' || m === 'dark' || m === 'system') ? m : 'dark';
  },
  // Whether the OS currently prefers a light color scheme.
  systemPrefersLight() {
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches);
  },
  // Resolve a mode to an effective light/dark boolean.
  isLight(mode) {
    var m = mode || this.getMode();
    if (m === 'light') return true;
    if (m === 'dark') return false;
    return this.systemPrefersLight(); // 'system'
  },
  // Apply or remove the light palette and update the toolbar icon/segments.
  paint(useLight) {
    var rs = document.documentElement.style;
    var self = this;
    if (useLight) Object.keys(this.light).forEach(function (k) { rs.setProperty(k, self.light[k]); });
    else Object.keys(this.light).forEach(function (k) { rs.removeProperty(k); });
    // Legacy single-icon toggle (if still present anywhere).
    document.querySelectorAll('[data-theme-icon]').forEach(function (el) {
      el.textContent = useLight ? '☾' : '☀';
    });
  },
  // Reflect the active mode on the segmented control.
  syncSegments(mode) {
    var m = mode || this.getMode();
    document.querySelectorAll('[data-theme-seg]').forEach(function (btn) {
      var on = btn.getAttribute('data-theme-seg') === m;
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.classList.toggle('is-active', on);
    });
  },
  // Apply a mode (or the saved one) and wire the system listener once.
  apply(mode) {
    var m = mode || this.getMode();
    this.mode = m;
    this.paint(this.isLight(m));
    this.syncSegments(m);
    if (!this.media && window.matchMedia) {
      this.media = window.matchMedia('(prefers-color-scheme: light)');
      var self = this;
      var onChange = function () { if (self.getMode() === 'system') self.paint(self.isLight('system')); };
      if (this.media.addEventListener) this.media.addEventListener('change', onChange);
      else if (this.media.addListener) this.media.addListener(onChange); // older Safari
    }
  },
  // Persist and apply a user choice.
  set(mode) {
    if (mode !== 'light' && mode !== 'dark' && mode !== 'system') return;
    try { localStorage.setItem(this.KEY, mode); } catch (e) {}
    this.apply(mode);
  }
};

// Paint as early as possible (this file loads blocking in <head>) to avoid a
// flash. The segmented control is wired up later, once the DOM is ready.
try { window.RZTheme.apply(); } catch (e) {}
