export const generateStyles = () => `
  /* ==========================================================================
     SUBLINK WORKER — "AURORA PRO" UI KIT
     Dark-first glassmorphism. Indigo -> violet -> fuchsia accent system.
     Rebuilt for a cleaner hierarchy, sharper contrast and refined motion.
     ========================================================================== */

  :root {
    --bg: #06070b;
    --bg-2: #0b0d14;
    --surface: rgba(255, 255, 255, 0.038);
    --surface-2: rgba(255, 255, 255, 0.065);
    --surface-3: rgba(255, 255, 255, 0.10);
    --surface-solid: #10121b;
    --border: rgba(255, 255, 255, 0.085);
    --border-strong: rgba(255, 255, 255, 0.17);
    --text: #f2f4fa;
    --text-2: #aab0c3;
    --text-3: #6e7488;
    --primary: #6366f1;
    --primary-2: #818cf8;
    --primary-3: #a5b4fc;
    --primary-soft: rgba(99, 102, 241, 0.15);
    --violet: #8b5cf6;
    --cyan: #22d3ee;
    --emerald: #10b981;
    --amber: #f59e0b;
    --rose: #f43f5e;
    --grad: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%);
    --grad-2: linear-gradient(100deg, #818cf8, #c084fc, #e879f9, #818cf8);
    --grad-soft: linear-gradient(135deg, rgba(99,102,241,0.18), rgba(217,70,239,0.10));
    --radius: 20px;
    --radius-sm: 13px;
    --radius-xs: 10px;
    --shadow: 0 20px 55px -20px rgba(0, 0, 0, 0.78);
    --shadow-soft: 0 8px 26px -14px rgba(0, 0, 0, 0.6);
    --shadow-glow: 0 0 0 1px rgba(99,102,241,0.38), 0 16px 44px -14px rgba(99,102,241,0.6);
    --ring: 0 0 0 3px var(--primary-soft);
    --mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
    --ease: cubic-bezier(0.22, 1, 0.36, 1);
  }

  body[data-theme="light"] {
    --bg: #eef1f8;
    --bg-2: #e6eaf5;
    --surface: rgba(255, 255, 255, 0.74);
    --surface-2: rgba(255, 255, 255, 0.92);
    --surface-3: #ffffff;
    --surface-solid: #ffffff;
    --border: rgba(15, 23, 42, 0.10);
    --border-strong: rgba(15, 23, 42, 0.20);
    --text: #0f1425;
    --text-2: #47506a;
    --text-3: #7a8399;
    --primary-soft: rgba(99, 102, 241, 0.12);
    --shadow: 0 20px 55px -24px rgba(30, 41, 90, 0.38);
    --shadow-soft: 0 8px 26px -16px rgba(30, 41, 90, 0.30);
    --grad-soft: linear-gradient(135deg, rgba(99,102,241,0.13), rgba(217,70,239,0.08));
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  html, body { margin: 0; padding: 0; }
  .hidden { display: none !important; }

  body {
    font-family: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
    color: var(--text);
    background: var(--bg);
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    transition: background 0.4s var(--ease), color 0.4s var(--ease);
  }

  /* ------------------------------------------------------------------ */
  /* Ambient background                                                  */
  /* ------------------------------------------------------------------ */
  .bg-layer {
    position: fixed; inset: 0; z-index: -2; overflow: hidden;
    background:
      radial-gradient(120% 80% at 50% -20%, rgba(99,102,241,0.16), transparent 60%),
      var(--bg);
  }
  .bg-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(127, 132, 165, 0.055) 1px, transparent 1px),
      linear-gradient(90deg, rgba(127, 132, 165, 0.055) 1px, transparent 1px);
    background-size: 46px 46px;
    mask-image: radial-gradient(ellipse 95% 72% at 50% 0%, #000 32%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 95% 72% at 50% 0%, #000 32%, transparent 100%);
  }
  .orb {
    position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.5;
    animation: float 20s var(--ease) infinite alternate;
  }
  .orb-1 { width: 540px; height: 540px; top: -200px; left: -140px; background: radial-gradient(circle, #6366f1, transparent 70%); }
  .orb-2 { width: 470px; height: 470px; top: 120px; right: -170px; background: radial-gradient(circle, #d946ef, transparent 70%); animation-delay: -7s; }
  .orb-3 { width: 400px; height: 400px; bottom: -170px; left: 34%; background: radial-gradient(circle, #22d3ee, transparent 70%); opacity: 0.3; animation-delay: -13s; }
  body[data-theme="light"] .orb { opacity: 0.26; }
  @keyframes float {
    from { transform: translate3d(0, 0, 0) scale(1); }
    to   { transform: translate3d(34px, -44px, 0) scale(1.12); }
  }

  /* ------------------------------------------------------------------ */
  /* Layout                                                              */
  /* ------------------------------------------------------------------ */
  .container { max-width: 960px; padding-bottom: 110px; }

  .topbar {
    position: sticky; top: 0; z-index: 900;
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px; padding: 14px 4px; margin-bottom: 6px;
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    background: linear-gradient(to bottom, var(--bg) 58%, transparent);
  }
  .brand { display: flex; align-items: center; gap: 12px; }
  .brand-logo {
    width: 42px; height: 42px; border-radius: 13px; display: grid; place-items: center;
    background: var(--grad); color: #fff; font-size: 18px;
    box-shadow: 0 10px 26px -8px rgba(99,102,241,0.85);
    position: relative;
  }
  .brand-logo::after {
    content: ""; position: absolute; inset: 0; border-radius: inherit;
    background: linear-gradient(180deg, rgba(255,255,255,0.35), transparent 55%);
    pointer-events: none;
  }
  .brand-text { line-height: 1.15; }
  .brand-text b { font-size: 15.5px; letter-spacing: -0.015em; display: block; }
  .brand-text span { font-size: 11px; color: var(--text-3); letter-spacing: 0.08em; text-transform: uppercase; }
  .topbar-actions { display: flex; align-items: center; gap: 8px; }

  .icon-btn {
    width: 42px; height: 42px; border-radius: 13px; display: grid; place-items: center;
    background: var(--surface); border: 1px solid var(--border); color: var(--text-2);
    cursor: pointer; font-size: 15px; transition: all 0.25s var(--ease); text-decoration: none;
  }
  .icon-btn:hover { color: var(--text); border-color: var(--border-strong); background: var(--surface-2); transform: translateY(-2px); }
  .icon-btn:active { transform: translateY(0); }

  /* ------------------------------------------------------------------ */
  /* Hero                                                                */
  /* ------------------------------------------------------------------ */
  .hero { text-align: center; padding: 30px 8px 28px; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 600;
    color: var(--primary-3); background: var(--primary-soft);
    border: 1px solid rgba(99,102,241,0.30); margin-bottom: 18px;
    box-shadow: 0 0 24px -10px rgba(99,102,241,0.7);
  }
  .hero-badge .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--emerald); box-shadow: 0 0 10px var(--emerald); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
  .hero h1 {
    font-size: clamp(30px, 5.2vw, 46px); font-weight: 800; letter-spacing: -0.035em;
    margin: 0 0 14px; line-height: 1.06;
  }
  .hero h1 .grad {
    background: var(--grad-2); background-size: 220% auto;
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent; color: transparent;
    animation: gradMove 7s linear infinite;
  }
  @keyframes gradMove { to { background-position: 220% center; } }
  .hero p { color: var(--text-2); font-size: 15px; max-width: 580px; margin: 0 auto 24px; line-height: 1.65; }
  .hero-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
  .chip {
    display: inline-flex; align-items: center; gap: 7px; padding: 7px 14px;
    border-radius: 999px; font-size: 12.5px; font-weight: 500; color: var(--text-2);
    background: var(--surface); border: 1px solid var(--border);
    transition: all 0.22s var(--ease);
  }
  .chip:hover { border-color: var(--border-strong); color: var(--text); transform: translateY(-1px); }
  .chip i { color: var(--primary-2); }

  /* ------------------------------------------------------------------ */
  /* Stepper                                                             */
  /* ------------------------------------------------------------------ */
  .stepper { display: flex; align-items: center; justify-content: center; gap: 8px; margin: 0 auto 24px; flex-wrap: wrap; }
  .step {
    display: flex; align-items: center; gap: 9px; padding: 8px 15px;
    border-radius: 999px; border: 1px solid var(--border); background: var(--surface);
    color: var(--text-3); font-size: 12.5px; font-weight: 600;
    transition: all 0.3s var(--ease);
  }
  .step .step-num {
    width: 20px; height: 20px; border-radius: 50%; display: grid; place-items: center;
    background: var(--surface-2); color: var(--text-2); font-size: 11px; font-weight: 700;
    transition: all 0.3s var(--ease);
  }
  .step.active { color: var(--text); border-color: rgba(99,102,241,0.5); background: var(--primary-soft); box-shadow: var(--shadow-glow); }
  .step.active .step-num { background: var(--grad); color: #fff; }
  .step.done { color: var(--text-2); border-color: rgba(16,185,129,0.4); }
  .step.done .step-num { background: rgba(16,185,129,0.9); color: #04231a; }
  .step-line { width: 28px; height: 2px; border-radius: 2px; background: var(--border); }

  /* ------------------------------------------------------------------ */
  /* Card / sections                                                     */
  /* ------------------------------------------------------------------ */
  .card {
    position: relative;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); box-shadow: var(--shadow);
    backdrop-filter: blur(22px); -webkit-backdrop-filter: blur(22px);
    margin-bottom: 22px; overflow: hidden;
  }
  .card::before {
    content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1px;
    background: linear-gradient(165deg, rgba(255,255,255,0.20), rgba(255,255,255,0.02) 42%, rgba(99,102,241,0.30));
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    pointer-events: none; z-index: 1;
  }
  body[data-theme="light"] .card::before {
    background: linear-gradient(165deg, rgba(255,255,255,0.9), rgba(255,255,255,0.2) 45%, rgba(99,102,241,0.35));
  }
  .card-body { padding: 26px; position: relative; z-index: 2; }
  @media (max-width: 600px) { .card-body { padding: 16px; } }

  .form-section {
    padding: 20px; margin-bottom: 16px;
    border: 1px solid var(--border); border-radius: var(--radius-sm);
    background: var(--surface);
    transition: border-color 0.25s var(--ease), background 0.25s var(--ease);
  }
  .form-section:hover { border-color: var(--border-strong); }
  .form-section:last-child { margin-bottom: 0; }
  .form-section-title {
    display: flex; align-items: center; gap: 9px;
    font-size: 12.5px; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase;
    color: var(--text-2); margin-bottom: 15px;
  }
  .form-section-title .sec-ico {
    width: 27px; height: 27px; border-radius: 9px; display: grid; place-items: center;
    background: var(--primary-soft); color: var(--primary-2); font-size: 12px;
    border: 1px solid rgba(99,102,241,0.25);
  }

  .section-hint { color: var(--text-3); font-size: 12.5px; line-height: 1.55; margin: -6px 0 14px; }

  /* ------------------------------------------------------------------ */
  /* Inputs                                                              */
  /* ------------------------------------------------------------------ */
  .form-control, .form-select {
    background-color: var(--surface-2);
    border: 1px solid var(--border);
    color: var(--text);
    border-radius: var(--radius-xs);
    padding: 0.72rem 0.95rem;
    font-size: 14px;
    transition: border-color 0.2s var(--ease), box-shadow 0.2s var(--ease), background 0.2s var(--ease);
  }
  .form-control:focus, .form-select:focus {
    background-color: var(--surface-2);
    color: var(--text);
    border-color: var(--primary);
    box-shadow: var(--ring);
    outline: none;
  }
  .form-control::placeholder { color: var(--text-3); opacity: 1; }
  .form-label { font-weight: 600; font-size: 13px; color: var(--text-2); margin-bottom: 8px; }
  textarea.form-control { line-height: 1.65; resize: vertical; }

  .form-select {
    appearance: none; -webkit-appearance: none; -moz-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a7adc0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 0.75rem center; background-size: 1em;
    padding-right: 2.4em;
  }
  .form-select option { background: var(--surface-solid); color: var(--text); }

  .input-group { box-shadow: none; border-radius: var(--radius-xs); }
  .input-group-text {
    background-color: var(--surface); border: 1px solid var(--border);
    color: var(--text-3); font-size: 12.5px; font-family: var(--mono);
  }

  .char-counter { display: flex; justify-content: space-between; margin-top: 9px; font-size: 12px; color: var(--text-3); }
  .char-counter .ok { color: var(--emerald); }

  /* ------------------------------------------------------------------ */
  /* Buttons                                                             */
  /* ------------------------------------------------------------------ */
  .btn {
    border-radius: var(--radius-xs); font-weight: 600; font-size: 14px;
    padding: 0.68rem 1.25rem; transition: all 0.22s var(--ease);
    border: 1px solid transparent;
  }
  .btn-primary {
    position: relative; overflow: hidden;
    background: var(--grad); color: #fff; border: none;
    box-shadow: 0 12px 32px -12px rgba(99,102,241,0.95);
  }
  .btn-primary::after {
    content: ""; position: absolute; top: 0; left: -120%; width: 60%; height: 100%;
    background: linear-gradient(100deg, transparent, rgba(255,255,255,0.35), transparent);
    transform: skewX(-18deg); transition: left 0.6s var(--ease);
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 18px 42px -14px rgba(139,92,246,1); color: #fff; }
  .btn-primary:hover::after { left: 130%; }
  .btn-primary:active { transform: translateY(0); }
  .btn-secondary {
    background: var(--surface-2); color: var(--text); border: 1px solid var(--border);
  }
  .btn-secondary:hover { background: var(--surface-3); border-color: var(--border-strong); color: var(--text); }
  .btn-outline-secondary {
    background: transparent; color: var(--text-2); border: 1px solid var(--border);
  }
  .btn-outline-secondary:hover { color: var(--text); border-color: var(--border-strong); background: var(--surface-2); }
  .btn-outline-primary { background: transparent; color: var(--primary-2); border: 1px solid rgba(99,102,241,0.4); }
  .btn-outline-primary:hover { background: var(--primary-soft); color: var(--primary-3); border-color: var(--primary); }
  .btn-outline-danger { background: transparent; color: var(--rose); border: 1px solid rgba(244,63,94,0.35); }
  .btn-outline-danger:hover { background: rgba(244,63,94,0.12); color: #fda4af; border-color: var(--rose); }
  .btn-outline-info { background: transparent; color: var(--cyan); border: 1px solid rgba(34,211,238,0.35); }
  .btn-outline-info:hover { background: rgba(34,211,238,0.12); color: var(--cyan); border-color: var(--cyan); }
  .btn-danger { background: var(--rose); border-color: var(--rose); color: #fff; }
  .btn-danger:hover { background: #fb7185; border-color: #fb7185; color: #fff; }
  .btn-success { background: var(--emerald); border-color: var(--emerald); color: #04231a; }
  .btn-success:hover { background: #34d399; border-color: #34d399; color: #04231a; }
  .btn-lg { padding: 0.9rem 1.5rem; font-size: 15px; }
  .btn-sm { padding: 0.42rem 0.8rem; font-size: 12.5px; }

  /* ------------------------------------------------------------------ */
  /* Advanced options toggle                                             */
  /* ------------------------------------------------------------------ */
  .adv-toggle {
    display: flex; align-items: center; justify-content: space-between; gap: 14px;
    padding: 15px 18px; border-radius: var(--radius-sm);
    border: 1px solid var(--border); background: var(--surface);
    cursor: pointer; margin-bottom: 16px; transition: all 0.22s var(--ease);
  }
  .adv-toggle:hover { border-color: var(--border-strong); background: var(--surface-2); }
  .adv-toggle-left { display: flex; align-items: center; gap: 12px; }
  .adv-toggle-left .ico {
    width: 36px; height: 36px; border-radius: 11px; display: grid; place-items: center;
    background: var(--grad-soft); color: var(--primary-2); border: 1px solid rgba(99,102,241,0.25);
    flex: none;
  }
  .adv-toggle-left b { display: block; font-size: 14px; color: var(--text); }
  .adv-toggle-left small { color: var(--text-3); font-size: 12px; }

  .switch { position: relative; width: 46px; height: 26px; flex: none; }
  .switch input { opacity: 0; width: 0; height: 0; }
  .switch .track {
    position: absolute; inset: 0; border-radius: 999px; background: var(--surface-2);
    border: 1px solid var(--border-strong); transition: all 0.25s var(--ease);
  }
  .switch .track::after {
    content: ""; position: absolute; top: 3px; left: 3px; width: 18px; height: 18px;
    border-radius: 50%; background: var(--text-2); transition: all 0.25s var(--ease);
  }
  .switch input:checked + .track { background: var(--grad); border-color: transparent; }
  .switch input:checked + .track::after { left: 23px; background: #fff; }

  #advancedOptions {
    max-height: 0; opacity: 0; overflow: hidden; transform: translateY(-12px);
    transition: max-height 0.5s var(--ease), opacity 0.35s var(--ease), transform 0.35s var(--ease);
  }
  #advancedOptions.show { max-height: none; opacity: 1; transform: translateY(0); overflow: visible; }

  /* ------------------------------------------------------------------ */
  /* Preset chips                                                        */
  /* ------------------------------------------------------------------ */
  .preset-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-bottom: 18px; }
  .preset-card {
    position: relative; text-align: left; cursor: pointer;
    padding: 15px; border-radius: var(--radius-sm);
    background: var(--surface); border: 1px solid var(--border);
    transition: all 0.22s var(--ease);
  }
  .preset-card:hover { border-color: var(--border-strong); transform: translateY(-3px); box-shadow: var(--shadow-soft); }
  .preset-card.active {
    border-color: var(--primary); background: var(--primary-soft);
    box-shadow: var(--shadow-glow);
  }
  .preset-card .p-ico {
    font-size: 17px; margin-bottom: 9px; display: grid; place-items: center;
    width: 34px; height: 34px; border-radius: 10px;
    background: var(--surface-2); border: 1px solid var(--border);
  }
  .preset-card.active .p-ico { background: var(--surface-3); border-color: rgba(99,102,241,0.35); }
  .preset-card b { display: block; font-size: 13.5px; margin-bottom: 3px; }
  .preset-card small { color: var(--text-3); font-size: 11.5px; line-height: 1.45; display: block; }
  .preset-card.active small { color: var(--text-2); }
  .preset-card .p-check {
    position: absolute; top: 13px; right: 13px; width: 19px; height: 19px; border-radius: 50%;
    border: 1.5px solid var(--border-strong); display: grid; place-items: center; font-size: 9px;
    color: transparent; transition: all 0.2s var(--ease);
  }
  .preset-card.active .p-check { background: var(--primary); border-color: var(--primary); color: #fff; }

  /* ------------------------------------------------------------------ */
  /* Rule cards                                                          */
  /* ------------------------------------------------------------------ */
  .rule-toolbar {
    display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 14px;
  }
  .rule-search { position: relative; flex: 1 1 180px; }
  .rule-search i { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: var(--text-3); font-size: 13px; }
  .rule-search input { padding-left: 35px; }
  .rule-count {
    font-size: 12px; color: var(--text-3); padding: 6px 13px; border-radius: 999px;
    background: var(--surface); border: 1px solid var(--border); white-space: nowrap;
  }
  .rule-count b { color: var(--primary-2); }

  .rule-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(215px, 1fr)); gap: 9px; }
  .rule-card {
    display: flex; align-items: flex-start; gap: 10px; cursor: pointer;
    padding: 12px; border-radius: var(--radius-xs);
    background: var(--surface); border: 1px solid var(--border);
    transition: all 0.18s var(--ease);
  }
  .rule-card:hover { border-color: var(--border-strong); background: var(--surface-2); transform: translateY(-1px); }
  .rule-card.checked { border-color: var(--primary); background: var(--primary-soft); }
  .rule-card .r-ico { font-size: 15px; line-height: 1.2; flex: none; margin-top: 1px; }
  .rule-card .r-body { min-width: 0; }
  .rule-card .r-name { font-size: 13px; font-weight: 600; display: block; }
  .rule-card .r-desc { font-size: 11px; color: var(--text-3); line-height: 1.35; display: block; margin-top: 2px; }
  .rule-card .r-check {
    margin-left: auto; flex: none; width: 18px; height: 18px; border-radius: 6px;
    border: 1.5px solid var(--border-strong); display: grid; place-items: center;
    font-size: 9px; color: transparent; transition: all 0.18s var(--ease);
  }
  .rule-card.checked .r-check { background: var(--primary); border-color: var(--primary); color: #fff; }
  .rule-card.hidden-by-search { display: none; }

  /* Native checkbox kept for form submission compatibility */
  .rule-checkbox { position: absolute; opacity: 0; pointer-events: none; }

  /* ------------------------------------------------------------------ */
  /* Custom rules                                                        */
  /* ------------------------------------------------------------------ */
  .custom-rules-section-header {
    display: flex; align-items: center; gap: 9px; margin: 22px 0 14px;
    padding-top: 18px; border-top: 1px solid var(--border);
  }
  .custom-rules-section-title {
    font-size: 12.5px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--text-2); margin: 0;
  }
  .custom-rules-container {
    border: 1px solid var(--border); border-radius: var(--radius-sm);
    background: var(--surface); overflow: hidden;
  }
  #customRules, #customRulesJSON {
    max-height: 560px; overflow-y: auto; overflow-x: hidden;
    padding: 14px; background: transparent;
  }
  #customRules:empty, #customRulesJSON:empty { padding: 0; }

  .custom-rules-tabs { display: flex; border-bottom: 1px solid var(--border); background: var(--surface); }
  .custom-rules-tab {
    flex: 1; padding: 12px; background: none; border: none; cursor: pointer;
    font-weight: 600; font-size: 13px; color: var(--text-3);
    transition: all 0.2s var(--ease); border-bottom: 2px solid transparent;
  }
  .custom-rules-tab:hover { color: var(--text); background: var(--surface-2); }
  .custom-rules-tab.active { color: var(--primary-2); border-bottom-color: var(--primary); background: var(--primary-soft); }

  .custom-rules-content { min-height: 160px; }
  .custom-rules-view { display: none; }
  .custom-rules-view.active { display: block; }

  .conversion-controls {
    display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px;
    padding: 12px; background: var(--surface); border-radius: var(--radius-xs);
    border: 1px solid var(--border);
  }
  .conversion-controls .btn { font-size: 12.5px; padding: 0.45rem 0.8rem; }

  .empty-state {
    text-align: center; padding: 30px 16px; color: var(--text-3);
    background: var(--surface); border-radius: var(--radius-xs); margin: 8px;
    border: 1px dashed var(--border-strong);
  }
  .empty-state i { color: var(--text-3); margin-bottom: 10px; display: block; }
  .empty-state p { margin: 0; font-size: 13px; }

  .custom-rule, .custom-rule-json {
    margin-bottom: 12px; border: 1px solid var(--border); border-radius: var(--radius-xs);
    background: var(--surface-2); padding: 14px;
    transition: all 0.2s var(--ease); animation: slideIn 0.3s var(--ease) both;
  }
  .custom-rule:hover, .custom-rule-json:hover { border-color: var(--border-strong); }
  .custom-rule.removing { animation: slideOut 0.3s var(--ease) both; }
  @keyframes slideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideOut { to { opacity: 0; transform: translateY(-12px); } }

  .custom-rule h6, .custom-rule-json h6 { color: var(--text); font-weight: 700; font-size: 13.5px; margin: 0; }
  .custom-rule .form-label, .custom-rule-json .form-label { color: var(--text-2); }
  .custom-rule .form-control, .custom-rule-json .form-control { background: var(--surface); }

  .json-textarea-container { position: relative; }
  .json-textarea { font-family: var(--mono); font-size: 12.5px; line-height: 1.6; }
  .json-valid { border-color: var(--emerald) !important; box-shadow: 0 0 0 3px rgba(16,185,129,0.15) !important; }
  .json-invalid { border-color: var(--rose) !important; box-shadow: 0 0 0 3px rgba(244,63,94,0.15) !important; }
  .json-validation-message { font-size: 12.5px; margin-top: 8px; padding: 8px 12px; border-radius: 8px; font-weight: 600; }
  .json-validation-message.valid { color: #6ee7b7; background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.3); }
  .json-validation-message.invalid { color: #fda4af; background: rgba(244,63,94,0.12); border: 1px solid rgba(244,63,94,0.3); }

  /* ------------------------------------------------------------------ */
  /* Tooltips                                                            */
  /* ------------------------------------------------------------------ */
  .tooltip-icon {
    position: relative; display: inline-grid; place-items: center; cursor: pointer;
    width: 17px; height: 17px; border-radius: 50%; font-size: 10px;
    color: var(--text-3); background: var(--surface-2); border: 1px solid var(--border);
    flex: none;
  }
  .tooltip-icon:hover { color: var(--primary-2); border-color: var(--primary); }
  .tooltip-content {
    visibility: hidden; opacity: 0; pointer-events: none;
    position: absolute; bottom: calc(100% + 10px); left: 50%; transform: translateX(-50%) translateY(6px);
    background: var(--surface-solid); color: var(--text-2); border: 1px solid var(--border-strong);
    border-radius: 11px; padding: 10px 12px; width: 230px; max-width: 78vw;
    font-size: 12px; font-weight: 400; line-height: 1.5; text-align: left;
    box-shadow: var(--shadow); z-index: 1200; transition: all 0.2s var(--ease);
  }
  .tooltip-content::after {
    content: ""; position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
    border: 6px solid transparent; border-top-color: var(--border-strong);
  }
  .tooltip-icon:hover .tooltip-content, .tooltip-icon.open .tooltip-content {
    visibility: visible; opacity: 1; transform: translateX(-50%) translateY(0);
  }

  /* ------------------------------------------------------------------ */
  /* Sticky action bar                                                   */
  /* ------------------------------------------------------------------ */
  .action-bar {
    position: sticky; bottom: 0; z-index: 800; margin-top: 20px;
    display: flex; gap: 10px; padding: 14px 0 calc(14px + env(safe-area-inset-bottom, 0px));
    background: linear-gradient(to top, var(--bg) 62%, transparent);
  }
  .action-bar .btn { flex: 1; }
  .action-bar .btn-clear { flex: 0 0 auto; }

  /* ------------------------------------------------------------------ */
  /* Result / subscribe links                                            */
  /* ------------------------------------------------------------------ */
  #subscribeLinksContainer {
    max-height: 0; opacity: 0; overflow: hidden; transform: translateY(14px);
    transition: max-height 0.55s var(--ease), opacity 0.4s var(--ease), transform 0.4s var(--ease);
    padding: 0 2px;
  }
  #subscribeLinksContainer.show { max-height: 4000px; opacity: 1; transform: translateY(0); }

  .result-panel {
    margin-top: 6px; padding: 20px;
    border: 1px solid rgba(16,185,129,0.28); border-radius: var(--radius-sm);
    background: linear-gradient(180deg, rgba(16,185,129,0.07), transparent 42%), var(--surface);
  }
  body[data-theme="light"] .result-panel { border-color: rgba(16,185,129,0.35); }

  .result-head { display: flex; align-items: center; gap: 12px; margin: 0 0 18px; }
  .result-head .ico {
    width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center;
    background: rgba(16,185,129,0.16); color: var(--emerald); font-size: 14px;
    border: 1px solid rgba(16,185,129,0.32); flex: none;
  }
  .result-head b { font-size: 15.5px; display: block; }
  .result-head small { color: var(--text-3); font-size: 12px; display: block; margin-top: 1px; }
  .result-head .result-toolbar { margin-left: auto; display: flex; gap: 8px; }

  .link-card {
    --proto: var(--primary-2);
    --proto-soft: var(--primary-soft);
    padding: 14px 15px; border-radius: var(--radius-sm); margin-bottom: 12px;
    background: linear-gradient(180deg, var(--proto-soft), transparent 70%), var(--surface);
    border: 1px solid var(--border); border-left: 2px solid var(--proto);
    transition: all 0.2s var(--ease);
  }
  .link-card:hover { border-color: var(--border-strong); transform: translateY(-1px); box-shadow: var(--shadow-soft); }
  .link-card[data-proto="xray"]    { --proto: #22d3ee; --proto-soft: rgba(34,211,238,0.10); }
  .link-card[data-proto="singbox"] { --proto: #a78bfa; --proto-soft: rgba(167,139,250,0.12); }
  .link-card[data-proto="clash"]   { --proto: #fbbf24; --proto-soft: rgba(251,191,36,0.10); }
  .link-card[data-proto="surge"]   { --proto: #fb7185; --proto-soft: rgba(251,113,133,0.10); }

  .link-card .lc-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
  .link-card .lc-label { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; letter-spacing: 0.01em; }
  .link-card .lc-label i { color: var(--proto); }
  .link-card .lc-label .badge-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--proto); box-shadow: 0 0 9px var(--proto); }
  .link-card .lc-label small { color: var(--text-3); font-weight: 400; }
  .link-card .protocol-badge {
    font-size: 10.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--proto); background: var(--proto-soft); border: 1px solid var(--proto);
    border-radius: 999px; padding: 3px 9px; opacity: 0.9;
  }
  .link-card .input-group { flex-wrap: nowrap; }
  .link-card input.form-control { font-family: var(--mono); font-size: 12.5px; }

  .base-url-label {
    background: var(--surface); color: var(--text-3); border: 1px solid var(--border);
    border-radius: var(--radius-xs); padding: 0.6rem 0.7rem; font-size: 12.5px;
    font-family: var(--mono); max-width: 340px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  @media (max-width: 600px) {
    .link-card .input-group { flex-wrap: wrap; }
    .base-url-label { max-width: 100%; }
    .result-head .result-toolbar { display: none; }
  }

  /* ------------------------------------------------------------------ */
  /* QR modal                                                            */
  /* ------------------------------------------------------------------ */
  .qr-modal {
    position: fixed; inset: 0; display: flex; justify-content: center; align-items: center;
    background: rgba(4,5,10,0.74); backdrop-filter: blur(9px); -webkit-backdrop-filter: blur(9px);
    opacity: 0; visibility: hidden; transition: all 0.3s var(--ease); z-index: 1400; padding: 20px;
  }
  .qr-modal.show { opacity: 1; visibility: visible; }
  .qr-card {
    background: #fff; padding: 24px; border-radius: 20px; text-align: center;
    box-shadow: 0 30px 70px -20px rgba(0,0,0,0.8); transform: scale(0.92) translateY(16px); transition: transform 0.3s var(--ease);
    max-width: 330px;
  }
  .qr-modal.show .qr-card { transform: scale(1) translateY(0); }
  .qr-card img { max-width: 100%; height: auto; border-radius: 8px; }
  .qr-card p { margin: 14px 0 0; color: #1f2430; font-size: 14px; font-weight: 700; }

  /* ------------------------------------------------------------------ */
  /* Toasts                                                              */
  /* ------------------------------------------------------------------ */
  .toast-host {
    position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%);
    z-index: 1600; display: flex; flex-direction: column; align-items: center; gap: 10px;
    pointer-events: none; width: max-content; max-width: 92vw;
  }
  .toast {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 17px; border-radius: 13px;
    background: var(--surface-solid); border: 1px solid var(--border-strong);
    color: var(--text); box-shadow: var(--shadow); font-size: 13.5px; font-weight: 600;
    animation: toastIn 0.36s var(--ease) both; pointer-events: auto;
  }
  .toast i { color: var(--emerald); font-size: 14px; }
  .toast.error i { color: var(--rose); }
  .toast.out { animation: toastOut 0.3s var(--ease) both; }
  @keyframes toastIn { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: none; } }
  @keyframes toastOut { to { opacity: 0; transform: translateY(10px) scale(0.97); } }

  /* ------------------------------------------------------------------ */
  /* Misc                                                                */
  /* ------------------------------------------------------------------ */
  .explanation-text { color: var(--text-2); font-size: 13px; line-height: 1.6; }
  .form-check-input {
    background-color: var(--surface-2); border: 1.5px solid var(--border-strong);
    width: 1.15em; height: 1.15em; margin-top: 0.15em;
  }
  .form-check-input:checked { background-color: var(--primary); border-color: var(--primary); }
  .form-check-input:focus { box-shadow: var(--ring); border-color: var(--primary); }
  .form-check-label { color: var(--text-2); font-size: 13.5px; }
  .form-switch .form-check-input { width: 2.4em; height: 1.25em; }

  h2, h4, h5 { color: var(--text); font-weight: 700; }

  ::-webkit-scrollbar { width: 10px; height: 10px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 99px; border: 2px solid transparent; background-clip: padding-box; }
  ::-webkit-scrollbar-thumb:hover { background: var(--text-3); background-clip: padding-box; }

  .footer-note {
    text-align: center; color: var(--text-3); font-size: 12px; padding: 10px 0 4px;
    display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap;
  }
  .footer-note a { color: var(--text-2); text-decoration: none; transition: color 0.2s var(--ease); }
  .footer-note a:hover { color: var(--primary-2); }
  .footer-note .sep { opacity: 0.45; }

  @media (max-width: 600px) {
    .hero { padding: 18px 4px 22px; }
    .rule-grid { grid-template-columns: 1fr; }
    .preset-grid { grid-template-columns: repeat(2, 1fr); }
    .topbar { padding: 10px 2px; }
    .step .step-label { display: none; }
    .step-line { width: 16px; }
    .brand-text span { display: none; }
  }
`;
