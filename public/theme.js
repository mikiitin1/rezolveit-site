// RezolveIT theme switcher — light by day (07:00–19:00), dark by night, or a
// user-chosen mode saved in localStorage (overrides the clock).
window.RZTheme = {
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
  timer: null,
  // resolves the *effective* light/dark given the configured mode
  isLight(mode) {
    const saved = localStorage.getItem('rz-theme'); // 'light' | 'dark' | null
    const m = saved || mode || 'auto';
    if (m === 'light') return true;
    if (m === 'dark') return false;
    const h = new Date().getHours();
    return h >= 7 && h < 19;
  },
  paint(useLight) {
    const rs = document.documentElement.style;
    if (useLight) Object.keys(this.light).forEach(k => rs.setProperty(k, this.light[k]));
    else Object.keys(this.light).forEach(k => rs.removeProperty(k));
    document.querySelectorAll('[data-theme-icon]').forEach(el => { el.textContent = useLight ? '☾' : '☀'; });
  },
  apply(mode) {
    clearInterval(this.timer);
    this.mode = mode || 'auto';
    this.paint(this.isLight(this.mode));
    // keep tracking the clock only while in auto (no saved override)
    if (!localStorage.getItem('rz-theme')) {
      this.timer = setInterval(() => this.paint(this.isLight(this.mode)), 60000);
    }
  },
  toggle() {
    const nowLight = this.isLight(this.mode);
    localStorage.setItem('rz-theme', nowLight ? 'dark' : 'light');
    clearInterval(this.timer);
    this.paint(!nowLight);
  }
};
