import { UNIFIED_RULES, PREDEFINED_RULE_SETS } from './config.js';
import { generateStyles } from './style.js';
import { iconSvg } from './icons.js';
import { t, getCurrentLang } from './i18n/index.js';

// Icon + short description for every rule group, so the picker reads like a
// product instead of a wall of checkboxes.
const RULE_META = {
  'Ad Block':       { icon: 'shield-x', id: 'Blokir iklan & tracker', en: 'Block ads & trackers' },
  'AI Services':    { icon: 'sparkles', id: 'ChatGPT, Gemini, Claude, dll', en: 'ChatGPT, Gemini, Claude, etc.' },
  'Bilibili':       { icon: 'monitor-play', id: 'Bilibili & video CN', en: 'Bilibili & CN video' },
  'Youtube':        { icon: 'youtube', id: 'YouTube & video', en: 'YouTube & video' },
  'Google':         { icon: 'search', id: 'Google, Gmail, Drive', en: 'Google, Gmail, Drive' },
  'Private':        { icon: 'home', id: 'Jaringan lokal / LAN', en: 'Local network / LAN' },
  'Indonesia':      { icon: 'flag', id: 'Situs & IP Indonesia (langsung)', en: 'Indonesian sites & IPs (direct)' },
  'Location:CN':    { icon: 'lock', id: 'Layanan Tiongkok', en: 'China services' },
  'Telegram':       { icon: 'send', id: 'Telegram', en: 'Telegram' },
  'Github':         { icon: 'code', id: 'GitHub & GitLab', en: 'GitHub & GitLab' },
  'Microsoft':      { icon: 'grid', id: 'Microsoft & Office', en: 'Microsoft & Office' },
  'Apple':          { icon: 'apple', id: 'Apple, iCloud, App Store', en: 'Apple, iCloud, App Store' },
  'Social Media':   { icon: 'users', id: 'IG, FB, X, TikTok', en: 'IG, FB, X, TikTok' },
  'Communication':  { icon: 'message', id: 'WhatsApp, LINE, Discord', en: 'WhatsApp, LINE, Discord' },
  'Streaming':      { icon: 'film', id: 'Netflix, Disney+, HBO, Spotify', en: 'Netflix, Disney+, HBO, Spotify' },
  'Streaming ID':   { icon: 'popcorn', id: 'Vidio, Viu, WeTV, iQIYI', en: 'Vidio, Viu, WeTV, iQIYI' },
  'Gaming':         { icon: 'gamepad', id: 'Steam, Epic, game mobile', en: 'Steam, Epic, mobile games' },
  'E-commerce':     { icon: 'shopping-bag', id: 'Shopee, Tokopedia, Lazada', en: 'Shopee, Tokopedia, Lazada' },
  'Education':      { icon: 'graduation-cap', id: 'Coursera, Udemy, kampus', en: 'Coursera, Udemy, campus' },
  'Financial':      { icon: 'credit-card', id: 'PayPal, kartu, fintech', en: 'PayPal, cards, fintech' },
  'Cloud Services': { icon: 'cloud', id: 'AWS, Azure, Cloudflare', en: 'AWS, Azure, Cloudflare' },
  'Non-China':      { icon: 'globe', id: 'Semua situs luar negeri', en: 'All foreign sites' }
};

// Decorative UI copy (self-contained, falls back to English).
const UI_TEXT = {
  stepPaste:        { en: 'Paste nodes', id: 'Tempel node' },
  stepConfigure:    { en: 'Configure', id: 'Atur' },
  stepGetLinks:     { en: 'Get links', id: 'Ambil link' },
  copyAll:          { en: 'Copy all', id: 'Salin semua' },
  linkCopied:       { en: 'Link copied', id: 'Link disalin' },
  copyAllDone:      { en: 'All links copied', id: 'Semua link disalin' },
  copyFailed:       { en: 'Copy failed', id: 'Gagal menyalin' },
  noLink:           { en: 'No link yet', id: 'Belum ada link' },
  alreadyShortened: { en: 'Links are already shortened', id: 'Link sudah dipendekkan' },
  shortenFailed:    { en: 'Failed to shorten links', id: 'Gagal memendekkan link' },
  brandTagline:        { en: 'Serverless subscription converter', id: 'Konverter langganan tanpa server', zh: '\u65E0\u670D\u52A1\u5668\u8BA2\u9605\u8F6C\u6362\u5DE5\u5177' },
  toggleTheme:         { en: 'Toggle theme', id: 'Ganti tema', zh: '\u5207\u6362\u4E3B\u9898' },
  heroBadge:           { en: 'Online \u00B7 Cloudflare Workers', id: 'Online \u00B7 Cloudflare Workers', zh: '\u5728\u7EBF \u00B7 Cloudflare Workers' },
  heroTitle1:          { en: 'Convert any subscription into', id: 'Ubah langganan apa pun jadi', zh: '\u628A\u4EFB\u610F\u8BA2\u9605\u8F6C\u6362\u4E3A' },
  heroTitle2:          { en: 'one clean link', id: 'satu link rapi', zh: '\u4E00\u6761\u5E72\u51C0\u94FE\u63A5' },
  heroSubtitle:        { en: 'Paste your nodes, pick a routing preset, and get ready-to-use links for Sing-Box, Clash, Xray and Surge in seconds.', id: 'Tempel node kamu, pilih preset routing, lalu dapatkan link siap pakai untuk Sing-Box, Clash, Xray, dan Surge dalam hitungan detik.', zh: '\u7C98\u8D34\u8282\u70B9\uFF0C\u9009\u62E9\u8DEF\u7531\u9884\u8BBE\uFF0C\u51E0\u79D2\u5185\u83B7\u5F97 Sing-Box\u3001Clash\u3001Xray \u548C Surge \u94FE\u63A5\u3002' },
  chipProtocols:       { en: '6 protocols', id: '6 protokol', zh: '6 \u79CD\u534F\u8BAE' },
  chipRules:           { en: 'Smart routing', id: 'Routing pintar', zh: '\u667A\u80FD\u5206\u6D41' },
  chipServerless:      { en: 'Serverless', id: 'Tanpa server', zh: '\u65E0\u670D\u52A1\u5668' },
  chipQr:              { en: 'QR & short links', id: 'QR & link pendek', zh: '\u4E8C\u7EF4\u7801\u548C\u77ED\u94FE' },
  footerNote:          { en: 'Built for speed and privacy', id: 'Dibuat untuk cepat & privat', zh: '\u4E3A\u901F\u5EA6\u4E0E\u9690\u79C1\u800C\u751F' },
  pasteHint:           { en: 'One link per line', id: 'Satu link per baris', zh: '\u6BCF\u884C\u4E00\u4E2A\u94FE\u63A5' },
  lines:               { en: 'lines', id: 'baris', zh: '\u884C' },
  advancedOptionsHint: { en: 'Routing rules, custom config, User-Agent', id: 'Aturan routing, config kustom, User-Agent', zh: '\u8DEF\u7531\u89C4\u5219\u3001\u81EA\u5B9A\u4E49\u914D\u7F6E\u3001User-Agent' },
  ruleSelectionHint:   { en: 'Pick a ready-made preset, or fine-tune each category. Local traffic stays direct; foreign traffic uses your nodes.', id: 'Pilih preset siap pakai, atau atur tiap kategori. Trafik lokal langsung; trafik luar negeri lewat node kamu.', zh: '\u9009\u62E9\u73B0\u6210\u9884\u8BBE\uFF0C\u6216\u9010\u9879\u5FAE\u8C03\u3002' },
  presetIndonesia:     { en: 'Indonesia', id: 'Indonesia', zh: '\u5370\u5EA6\u5C3C\u897F\u4E9A' },
  presetIndonesiaDesc: { en: 'Local direct \u00B7 streaming \u00B7 gaming', id: 'Lokal langsung \u00B7 streaming \u00B7 game', zh: '\u672C\u5730\u76F4\u8FDE \u00B7 \u6D41\u5A92\u4F53 \u00B7 \u6E38\u620F' },
  presetBalancedDesc:  { en: 'Daily driver, moderate rules', id: 'Sehari-hari, aturan sedang', zh: '\u65E5\u5E38\u4F7F\u7528' },
  presetMinimalDesc:   { en: 'Lightest, fastest to load', id: 'Paling ringan & cepat', zh: '\u6700\u8F7B\u91CF' },
  presetComprehensiveDesc: { en: 'Every category enabled', id: 'Semua kategori aktif', zh: '\u5168\u90E8\u542F\u7528' },
  presetCustomDesc:    { en: 'Choose categories manually', id: 'Pilih kategori manual', zh: '\u624B\u52A8\u9009\u62E9' },
  searchRules:         { en: 'Search rules\u2026', id: 'Cari aturan\u2026', zh: '\u641C\u7D22\u89C4\u5219\u2026' },
  selected:            { en: 'selected', id: 'dipilih', zh: '\u5DF2\u9009' },
  selectAll:           { en: 'All', id: 'Semua', zh: '\u5168\u9009' },
  selectNone:          { en: 'None', id: 'Kosong', zh: '\u6E05\u7A7A' },
  resultTitle:         { en: 'Your links are ready', id: 'Link kamu sudah siap', zh: '\u94FE\u63A5\u5DF2\u751F\u6210' },
  resultSubtitle:      { en: 'Copy, scan, or shorten \u2014 pick your client.', id: 'Salin, scan, atau pendekkan \u2014 pilih klienmu.', zh: '\u590D\u5236\u3001\u626B\u7801\u6216\u7F29\u77ED\u3002' },
  copy:                { en: 'Copy', id: 'Salin', zh: '\u590D\u5236' },
  customRulesHint:     { en: 'Advanced routing rules \u2014 optional', id: 'Aturan routing lanjutan \u2014 opsional', zh: '\u9AD8\u7EA7\u8DEF\u7531\u89C4\u5219\uFF08\u53EF\u9009\uFF09' }
};

const ui = (key) => {
  const e = UI_TEXT[key] || {};
  const l = String(getCurrentLang() || 'en');
  if (l.startsWith('id')) return e.id || e.en || key;
  if (l.startsWith('zh')) return e.zh || e.en || key;
  return e.en || key;
};

const ruleMeta = (name) => RULE_META[name] || { icon: 'link', id: '', en: '' };
const ruleDesc = (name) => {
  const m = ruleMeta(name);
  return String(getCurrentLang() || 'en').startsWith('id') ? m.id : m.en;
};

// The rule labels in the i18n packs ship with emoji prefixes (useful inside the
// generated client configs). The web UI uses real SVG icons instead, so strip
// any leading/embedded pictographs from the labels shown on screen.
const EMOJI_RE = /[\u{1F000}-\u{1FAFF}\u{2190}-\u{2BFF}\u{2460}-\u{24FF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}\u{20E3}\u{1F3FB}-\u{1F3FF}]/gu;
const cleanLabel = (value) => String(value == null ? '' : value)
  .replace(EMOJI_RE, '')
  .replace(/\s{2,}/g, ' ')
  .trim();

export function generateHtml(xrayUrl, singboxUrl, clashUrl, surgeUrl, baseUrl) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      ${generateHead()}
      ${generateBody(xrayUrl, singboxUrl, clashUrl, surgeUrl, baseUrl)}
    </html>
  `;
}

const generateHead = () => `
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${t('pageDescription')}">
    <meta name="keywords" content="${t('pageKeywords')}">
    <meta name="theme-color" content="#07080c">
    <title>${t('pageTitle')}</title>
    <meta property="og:title" content="${t('ogTitle')}">
    <meta property="og:description" content="${t('ogDescription')}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://sublink-worker.sageer.me/">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js"></script>
    <style>
      ${generateStyles()}
    </style>
  </head>
`;

const generateBody = (xrayUrl, singboxUrl, clashUrl, surgeUrl, baseUrl) => `
  <body data-theme="dark">
    <div class="bg-layer">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="bg-grid"></div>
    </div>
    <div class="container">
      ${generateTopbar()}
      ${generateHero()}
      ${generateStepper()}
      <div class="card">
        <div class="card-body">
          ${generateForm()}
          <div id="subscribeLinksContainer">
            ${generateSubscribeLinks(xrayUrl, singboxUrl, clashUrl, surgeUrl, baseUrl)}
          </div>
        </div>
      </div>
      ${generateFooter()}
    </div>
    <div class="toast-host" id="toastHost"></div>
    ${generateScripts()}
  </body>
`;

const generateTopbar = () => `
  <div class="topbar">
    <div class="brand">
      <div class="brand-logo"><i class="fas fa-bolt"></i></div>
      <div class="brand-text">
        <b>Sublink Worker</b>
        <span>${ui('brandTagline')}</span>
      </div>
    </div>
    <div class="topbar-actions">
      <a href="https://t.me/Bleszh" target="_blank" rel="noopener noreferrer" class="icon-btn" title="Telegram">
        <i class="fab fa-telegram"></i>
      </a>
      <button id="darkModeToggle" class="icon-btn" title="${ui('toggleTheme')}">
        <i class="fas fa-moon"></i>
      </button>
    </div>
  </div>
`;

const generateHero = () => `
  <div class="hero">
    <div class="hero-badge"><span class="dot"></span>${ui('heroBadge')}</div>
    <h1>${ui('heroTitle1')} <span class="grad">${ui('heroTitle2')}</span></h1>
    <p>${ui('heroSubtitle')}</p>
    <div class="hero-chips">
      <span class="chip"><i class="fas fa-globe"></i>${ui('chipProtocols')}</span>
      <span class="chip"><i class="fas fa-shield-halved"></i>${ui('chipRules')}</span>
      <span class="chip"><i class="fas fa-bolt"></i>${ui('chipServerless')}</span>
      <span class="chip"><i class="fas fa-qrcode"></i>${ui('chipQr')}</span>
    </div>
  </div>
`;

const generateStepper = () => `
  <div class="stepper" id="stepper">
    <div class="step active" data-step="1"><span class="step-num">1</span><span class="step-label">${ui('stepPaste')}</span></div>
    <span class="step-line"></span>
    <div class="step" data-step="2"><span class="step-num">2</span><span class="step-label">${ui('stepConfigure')}</span></div>
    <span class="step-line"></span>
    <div class="step" data-step="3"><span class="step-num">3</span><span class="step-label">${ui('stepGetLinks')}</span></div>
  </div>
`;

const generateFooter = () => `
  <div class="footer-note">
    <span>${ui('footerNote')}</span>
    <span class="sep">&middot;</span>
    <a href="https://t.me/Bleszh" target="_blank" rel="noopener noreferrer"><i class="fab fa-telegram"></i> Telegram</a>
  </div>
`;

// Form Components
const generateForm = () => `
  <form method="POST" id="encodeForm">
    ${generateShareUrlsSection()}
    ${generateAdvancedOptionsToggle()}
    ${generateAdvancedOptions()}
    ${generateButtonContainer()}
  </form>
`;

const generateShareUrlsSection = () => `
  <div class="form-section">
    <div class="form-section-title">
      <span class="sec-ico"><i class="fas fa-link"></i></span>
      ${t('shareUrls')}
    </div>
    <textarea class="form-control" id="inputTextarea" name="input" required placeholder="${t('urlPlaceholder')}" rows="4" oninput="updateInputCounter()"></textarea>
    <div class="char-counter">
      <span>${ui('pasteHint')}</span>
      <span id="inputCounter"><b>0</b> ${ui('lines')}</span>
    </div>
  </div>
`;

const generateAdvancedOptionsToggle = () => `
  <label class="adv-toggle" for="advancedToggle">
    <span class="adv-toggle-left">
      <span class="ico"><i class="fas fa-sliders"></i></span>
      <span>
        <b>${t('advancedOptions')}</b>
        <small>${ui('advancedOptionsHint')}</small>
      </span>
    </span>
    <span class="switch">
      <input type="checkbox" id="advancedToggle">
      <span class="track"></span>
    </span>
  </label>
`;

const generateAdvancedOptions = () => `
  <div id="advancedOptions">
    ${generateRuleSetSelection()}
    ${generateBaseConfigSection()}
    ${generateUASection()}
  </div>
`;

const generateButtonContainer = () => `
  <div class="action-bar">
    <button type="submit" class="btn btn-primary">
      <i class="fas fa-wand-magic-sparkles me-2"></i>${t('convert')}
    </button>
    <button type="button" class="btn btn-outline-secondary btn-clear" id="clearFormBtn">
      <i class="fas fa-trash-alt"></i>
    </button>
  </div>
`;

const generateSubscribeLinks = (xrayUrl, singboxUrl, clashUrl, surgeUrl, baseUrl) => `
  <div class="result-panel">
    <div class="result-head">
      <span class="ico"><i class="fas fa-circle-check"></i></span>
      <span>
        <b>${ui('resultTitle')}</b>
        <small>${ui('resultSubtitle')}</small>
      </span>
      <span class="result-toolbar">
        <button type="button" class="btn btn-outline-secondary btn-sm" onclick="copyAllLinks()" title="${ui('copyAll')}">
          <i class="fas fa-copy me-1"></i>${ui('copyAll')}
        </button>
      </span>
    </div>
    ${generateLinkInput('Xray', 'xrayLink', xrayUrl, 'fa-cube', 'xray')}
    ${generateLinkInput('Sing-Box', 'singboxLink', singboxUrl, 'fa-star', 'singbox')}
    ${generateLinkInput('Clash', 'clashLink', clashUrl, 'fa-layer-group', 'clash')}
    ${generateLinkInput('Surge', 'surgeLink', surgeUrl, 'fa-bolt', 'surge')}
    ${generateCustomPathSection(baseUrl)}
    ${generateShortenButton()}
  </div>
`;

const generateLinkInput = (label, id, value, icon, proto) => `
  <div class="link-card" data-proto="${proto}">
    <div class="lc-top">
      <span class="lc-label">
        <span class="badge-dot"></span>
        <i class="fas ${icon}"></i>
        ${label}
      </span>
      <span class="protocol-badge">${proto === 'singbox' ? 'sing-box' : proto}</span>
    </div>
    <div class="input-group">
      <input type="text" class="form-control" id="${id}" value="${value}" readonly>
      <button class="btn btn-outline-secondary" type="button" onclick="copyToClipboard('${id}')" title="${ui('copy')}">
        <i class="fas fa-copy"></i>
      </button>
      <button class="btn btn-outline-secondary" type="button" onclick="generateQRCode('${id}')" title="QR">
        <i class="fas fa-qrcode"></i>
      </button>
    </div>
  </div>
`;

const generateCustomPathSection = (baseUrl) => `
  <div class="mb-4 mt-3">
    <label for="customShortCode" class="form-label">${t('customPath')}</label>
    <div class="input-group flex-nowrap">
      <span class="input-group-text text-truncate" style="max-width: 400px;" title="${baseUrl}/s/">
        ${baseUrl}/s/
      </span>
      <input type="text" class="form-control" id="customShortCode" placeholder="e.g. my-custom-link">
      <select id="savedCustomPaths" class="form-select" style="max-width: 200px;">
        <option value="">${t('savedPaths')}</option>
      </select>
      <button class="btn btn-outline-danger" type="button" onclick="deleteSelectedPath()">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </div>
`;

const generateShortenButton = () => `
  <div class="d-grid mt-3">
    <button class="btn btn-primary btn-lg" type="button" onclick="shortenAllUrls()">
      <i class="fas fa-compress-alt me-2"></i>${t('shortenLinks')}
    </button>
  </div>
`;

const generateScripts = () => `
  <script>
    ${copyToClipboardFunction()}
    ${shortenAllUrlsFunction()}
    ${darkModeToggleFunction()}
    ${advancedOptionsToggleFunction()}
    ${applyPredefinedRulesFunction()}
    ${tooltipFunction()}
    ${submitFormFunction()}
    ${customRuleFunctions()}
    ${generateQRCodeFunction()}
    ${customPathFunctions()}
    ${saveConfig()}
    ${clearConfig()}
  </script>
`;

const customPathFunctions = () => `
  function saveCustomPath() {
    const customPath = document.getElementById('customShortCode').value;
    if (customPath) {
      let savedPaths = JSON.parse(localStorage.getItem('savedCustomPaths') || '[]');
      if (!savedPaths.includes(customPath)) {
        savedPaths.push(customPath);
        localStorage.setItem('savedCustomPaths', JSON.stringify(savedPaths));
        updateSavedPathsDropdown();
      }
    }
  }

  function updateSavedPathsDropdown() {
    const savedPaths = JSON.parse(localStorage.getItem('savedCustomPaths') || '[]');
    const dropdown = document.getElementById('savedCustomPaths');
    dropdown.innerHTML = '<option value="">Saved paths</option>';
    savedPaths.forEach(path => {
      const option = document.createElement('option');
      option.value = path;
      option.textContent = path;
      dropdown.appendChild(option);
    });
  }

  function loadSavedCustomPath() {
    const dropdown = document.getElementById('savedCustomPaths');
    const customShortCode = document.getElementById('customShortCode');
    if (dropdown.value) {
      customShortCode.value = dropdown.value;
    }
  }

  function deleteSelectedPath() {
    const dropdown = document.getElementById('savedCustomPaths');
    const selectedPath = dropdown.value;
    if (selectedPath) {
      let savedPaths = JSON.parse(localStorage.getItem('savedCustomPaths') || '[]');
      savedPaths = savedPaths.filter(path => path !== selectedPath);
      localStorage.setItem('savedCustomPaths', JSON.stringify(savedPaths));
      updateSavedPathsDropdown();
      document.getElementById('customShortCode').value = '';
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    updateSavedPathsDropdown();
    document.getElementById('savedCustomPaths').addEventListener('change', loadSavedCustomPath);
  });
`;

const advancedOptionsToggleFunction = () => `
  document.getElementById('advancedToggle').addEventListener('change', function() {
    const advancedOptions = document.getElementById('advancedOptions');
    if (this.checked) {
      advancedOptions.classList.add('show');
    } else {
      advancedOptions.classList.remove('show');
    }
  });
`;

const copyToClipboardFunction = () => `
  function showToast(message, isError) {
    const host = document.getElementById('toastHost');
    if (!host) { return; }
    const toast = document.createElement('div');
    toast.className = 'toast' + (isError ? ' error' : '');
    toast.innerHTML = '<i class="fas ' + (isError ? 'fa-circle-exclamation' : 'fa-circle-check') + '"></i><span></span>';
    toast.querySelector('span').textContent = message;
    host.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('out');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    }, 2400);
  }

  function setStepper(active) {
    document.querySelectorAll('.stepper .step').forEach(s => {
      const n = parseInt(s.dataset.step, 10);
      s.classList.toggle('active', n === active);
      s.classList.toggle('done', n < active);
    });
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (!element || !element.value) { showToast(${JSON.stringify(ui('noLink'))}, true); return; }
    copyText(element.value).then(ok => {
      if (!ok) { showToast(${JSON.stringify(ui('copyFailed'))}, true); return; }
      const button = element.nextElementSibling;
      const originalText = button.innerHTML;
      button.innerHTML = '<i class="fas fa-check"></i>';
      button.classList.remove('btn-outline-secondary');
      button.classList.add('btn-success');
      showToast(${JSON.stringify(ui('linkCopied'))}, false);
      setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('btn-success');
        button.classList.add('btn-outline-secondary');
      }, 1800);
    });
  }

  function copyAllLinks() {
    const ids = ['xrayLink', 'singboxLink', 'clashLink', 'surgeLink'];
    const text = ids.map(id => document.getElementById(id).value).filter(Boolean).join('\\n');
    if (!text) { showToast(${JSON.stringify(ui('noLink'))}, true); return; }
    copyText(text).then(ok => showToast(ok ? ${JSON.stringify(ui('copyAllDone'))} : ${JSON.stringify(ui('copyFailed'))}, !ok));
  }
`;

const shortenAllUrlsFunction = () => `
  let isShortening = false;

  async function shortenUrl(url, customShortCode) {
    saveCustomPath();
    const response = await fetch(\`/shorten-v2?url=\${encodeURIComponent(url)}&shortCode=\${encodeURIComponent(customShortCode || '')}\`);
    if (response.ok) {
      const data = await response.text();
      return data;
    }
    throw new Error('Failed to shorten URL');
  }

  async function shortenAllUrls() {
    if (isShortening) {
      return;
    }

    const shortenButton = document.querySelector('button[onclick="shortenAllUrls()"]');
    
    try {
      isShortening = true;
      shortenButton.disabled = true;
      shortenButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Shortening...';

      const singboxLink = document.getElementById('singboxLink');
      const customShortCode = document.getElementById('customShortCode').value;

      if (singboxLink.value.includes('/b/')) {
        showToast(${JSON.stringify(ui('alreadyShortened'))}, true);
        return;
      }

      const shortCode = await shortenUrl(singboxLink.value, customShortCode);

      const xrayLink = document.getElementById('xrayLink');
      const clashLink = document.getElementById('clashLink');
      const surgeLink = document.getElementById('surgeLink');

      xrayLink.value = window.location.origin + '/x/' + shortCode;
      singboxLink.value = window.location.origin + '/b/' + shortCode;
      clashLink.value = window.location.origin + '/c/' + shortCode;
      surgeLink.value = window.location.origin + '/s/' + shortCode;
    } catch (error) {
      console.error('Error:', error);
      showToast(${JSON.stringify(ui('shortenFailed'))}, true);
    } finally {
      isShortening = false;
      shortenButton.disabled = false;
      shortenButton.innerHTML = '<i class="fas fa-compress-alt me-2"></i>Shorten Links';
    }
  }
`;

const darkModeToggleFunction = () => `
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  darkModeToggle.addEventListener('click', () => {
    body.setAttribute('data-theme', body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    darkModeToggle.innerHTML = body.getAttribute('data-theme') === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    darkModeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  } else if (systemDarkMode) {
    body.setAttribute('data-theme', 'dark');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Save theme preference when changed
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
        localStorage.setItem('theme', body.getAttribute('data-theme'));
      }
    });
  });

  observer.observe(body, { attributes: true });
`;

const generateRuleSetSelection = () => `
  <div class="form-section">
    <div class="form-section-title">
      <span class="sec-ico"><i class="fas fa-shield-halved"></i></span>
      ${t('ruleSelection')}
      <span class="tooltip-icon"><i class="fas fa-question"></i>
        <span class="tooltip-content">${t('ruleSelectionTooltip')}</span>
      </span>
    </div>
    <p class="section-hint">${ui('ruleSelectionHint')}</p>

    <!-- Hidden select kept for backwards-compatible form submission -->
    <select class="hidden" id="predefinedRules">
      <option value="custom">${t('custom')}</option>
      <option value="indonesia">${ui('presetIndonesia')}</option>
      <option value="minimal">${t('minimal')}</option>
      <option value="balanced">${t('balanced')}</option>
      <option value="comprehensive">${t('comprehensive')}</option>
    </select>

    <div class="preset-grid" id="presetGrid">
      ${generatePresetCard('indonesia', 'flag', ui('presetIndonesia'), ui('presetIndonesiaDesc'))}
      ${generatePresetCard('balanced', 'scale', t('balanced'), ui('presetBalancedDesc'))}
      ${generatePresetCard('minimal', 'feather', t('minimal'), ui('presetMinimalDesc'))}
      ${generatePresetCard('comprehensive', 'layers', t('comprehensive'), ui('presetComprehensiveDesc'))}
      ${generatePresetCard('custom', 'wrench', t('custom'), ui('presetCustomDesc'))}
    </div>

    <div class="rule-toolbar">
      <div class="rule-search">
        <i class="fas fa-magnifying-glass"></i>
        <input type="text" class="form-control" id="ruleSearch" placeholder="${ui('searchRules')}" oninput="filterRuleCards(this.value)">
      </div>
      <span class="rule-count"><b id="ruleCount">0</b> ${ui('selected')}</span>
      <button type="button" class="btn btn-outline-secondary btn-sm" onclick="selectAllRules(true)">${ui('selectAll')}</button>
      <button type="button" class="btn btn-outline-secondary btn-sm" onclick="selectAllRules(false)">${ui('selectNone')}</button>
    </div>

    <div class="rule-grid" id="ruleCheckboxes">
      ${UNIFIED_RULES.map(rule => generateRuleCheckbox(rule)).join('')}
    </div>
    ${generateCustomRulesSection()}
  </div>
`;

const generatePresetCard = (value, icon, name, desc) => `
  <button type="button" class="preset-card" data-preset="${value}" onclick="applyPredefinedRules('${value}')">
    <span class="p-check"><i class="fas fa-check"></i></span>
    <span class="p-ico">${iconSvg(icon)}</span>
    <b>${name}</b>
    <small>${desc}</small>
  </button>
`;

const generateRuleCheckbox = (rule) => {
  const meta = ruleMeta(rule.name);
  return `
  <label class="rule-card" for="${rule.name}">
    <input class="rule-checkbox" type="checkbox" value="${rule.name}" id="${rule.name}" name="selectedRules">
    <span class="r-ico">${iconSvg(meta.icon)}</span>
    <span class="r-body">
      <span class="r-name">${cleanLabel(t('outboundNames.' + rule.name))}</span>
      <span class="r-desc">${ruleDesc(rule.name)}</span>
    </span>
    <span class="r-check"><i class="fas fa-check"></i></span>
  </label>`;
};

const generateCustomRulesSection = () => `
  <div class="custom-rules-panel" id="customRulesPanel">
    <div class="custom-rules-section-header">
      <button type="button" class="custom-rules-toggle" id="customRulesToggle" onclick="toggleCustomRulesPanel()" aria-expanded="false">
        <span class="crt-ico">${iconSvg('sliders')}</span>
        <span class="crt-text">
          <b>${t('customRulesSection')}</b>
          <small>${ui('customRulesHint')}</small>
        </span>
        <span class="crt-badge" id="customRulesBadge">0</span>
        <i class="fas fa-chevron-down crt-chevron"></i>
      </button>
      <span class="tooltip-icon">
        <i class="fas fa-question-circle"></i>
        <span class="tooltip-content">
          ${t('customRulesSectionTooltip')}
        </span>
      </span>
    </div>
    <div class="custom-rules-container" id="customRulesContainer">
      ${generateCustomRulesTabs()}
      ${generateCustomRulesContent()}
    </div>
  </div>
`;

const generateCustomRulesTabs = () => `
  <div class="custom-rules-tabs">
    <button type="button" class="custom-rules-tab active" onclick="switchCustomRulesTab('form')" id="formTab">
      <i class="fas fa-edit me-2"></i>${t('customRulesForm')}
    </button>
    <button type="button" class="custom-rules-tab" onclick="switchCustomRulesTab('json')" id="jsonTab">
      <i class="fas fa-code me-2"></i>${t('customRulesJSON')}
    </button>
  </div>
`;

const generateCustomRulesContent = () => `
  <div class="custom-rules-content">
    ${generateFormView()}
    ${generateJSONView()}
  </div>
`;

const generateFormView = () => `
  <div id="formView" class="custom-rules-view active">
    <div class="conversion-controls">
      <button type="button" class="btn btn-outline-primary btn-sm" onclick="addCustomRule()">
        <i class="fas fa-plus me-1"></i>${t('addCustomRule')}
      </button>
      <button type="button" class="btn btn-outline-danger btn-sm" onclick="clearAllCustomRules()">
        <i class="fas fa-trash me-1"></i>${t('clearAll')}
      </button>
    </div>
    <div id="customRules">
      <!-- Custom rules will be dynamically added here -->
    </div>
    <div id="emptyFormMessage" class="empty-state" style="display: none;">
      <i class="fas fa-plus-circle fa-2x mb-2"></i>
      <p>${t('noCustomRulesForm')}</p>
    </div>
  </div>
`;

const generateJSONView = () => `
  <div id="jsonView" class="custom-rules-view">
    <div class="conversion-controls">
      <button type="button" class="btn btn-outline-danger btn-sm" onclick="clearAllCustomRules()">
        <i class="fas fa-trash me-1"></i>${t('clearAll')}
      </button>
    </div>
    <div id="customRulesJSON">
      <div class="mb-2">
        <label class="form-label">${t('customRuleJSON')}</label>
        <div class="json-textarea-container">
          <textarea class="form-control json-textarea" name="customRuleJSON[]" rows="8"
                    oninput="validateJSONRealtime(this)"></textarea>
          <div class="json-validation-message" style="display: none;"></div>
        </div>
      </div>
    </div>
  </div>
`;

const generateBaseConfigSection = () => `
  <div class="form-section">
    <div class="form-section-title d-flex align-items-center">
      ${t('baseConfigSettings')}
      <span class="tooltip-icon ms-2">
        <i class="fas fa-question-circle"></i>
        <span class="tooltip-content">
          ${t('baseConfigTooltip')}
        </span>
      </span>
    </div>
    <div class="mb-3">
      <select class="form-select" id="configType">
        <option value="singbox">SingBox (JSON)</option>
        <option value="clash">Clash (YAML)</option>
      </select>
    </div>
    <div class="mb-3">
      <textarea class="form-control" id="configEditor" rows="3" placeholder="Paste your custom config here..."></textarea>
    </div>
    <div class="d-flex gap-2">
      <button type="button" class="btn btn-secondary" onclick="saveConfig()">${t('saveConfig')}</button>
      <button type="button" class="btn btn-outline-danger" onclick="clearConfig()">
        <i class="fas fa-trash-alt me-2"></i>${t('clearConfig')}
      </button>
    </div>
  </div>
`;

const generateUASection = () => `
  <div class="form-section">
    <div class="form-section-title d-flex align-items-center">
      ${t('UASettings')}
      <span class="tooltip-icon ms-2">
        <i class="fas fa-question-circle"></i>
        <span class="tooltip-content">
          ${t('UAtip')}
        </span>
      </span>
    </div>
    <input type="text" class="form-control" id="customUA" placeholder="curl/7.74.0">
  </div>
`;

const applyPredefinedRulesFunction = () => `
  const PRESET_RULES = ${JSON.stringify(PREDEFINED_RULE_SETS)};

  function syncRuleCards() {
    let count = 0;
    document.querySelectorAll('.rule-card').forEach(card => {
      const cb = card.querySelector('.rule-checkbox');
      if (!cb) return;
      card.classList.toggle('checked', cb.checked);
      if (cb.checked) count++;
    });
    const counter = document.getElementById('ruleCount');
    if (counter) counter.textContent = count;
  }

  function setActivePreset(value) {
    document.querySelectorAll('.preset-card').forEach(card => {
      card.classList.toggle('active', card.dataset.preset === value);
    });
  }

  function setPresetValue(value) {
    const select = document.getElementById('predefinedRules');
    if (select) select.value = value;
    setActivePreset(value);
  }

  function applyPredefinedRules(value) {
    const select = document.getElementById('predefinedRules');
    if (value === undefined) value = select ? select.value : 'custom';
    setPresetValue(value);

    if (value === 'custom') { syncRuleCards(); return; }

    const rules = PRESET_RULES[value] || [];
    document.querySelectorAll('.rule-checkbox').forEach(cb => {
      cb.checked = rules.includes(cb.value);
    });
    syncRuleCards();
  }

  function selectAllRules(state) {
    document.querySelectorAll('.rule-checkbox').forEach(cb => { cb.checked = !!state; });
    setPresetValue('custom');
    syncRuleCards();
  }

  function filterRuleCards(query) {
    const q = (query || '').trim().toLowerCase();
    document.querySelectorAll('.rule-card').forEach(card => {
      const text = (card.textContent || '').toLowerCase();
      card.classList.toggle('hidden-by-search', q !== '' && !text.includes(q));
    });
  }

  function updateInputCounter() {
    const el = document.getElementById('inputTextarea');
    const counter = document.getElementById('inputCounter');
    if (!el || !counter) return;
    const lines = el.value.split('\\n').filter(l => l.trim() !== '').length;
    counter.innerHTML = '<b>' + lines + '</b> ' + ${JSON.stringify(ui('lines'))};
  }

  // Manual edits switch the preset to custom
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.rule-checkbox').forEach(cb => {
      cb.addEventListener('change', function() {
        setPresetValue('custom');
        syncRuleCards();
      });
    });
    const select = document.getElementById('predefinedRules');
    applyPredefinedRules(select ? select.value : 'custom');
    updateInputCounter();
  });
`;

const tooltipFunction = () => `
  function initTooltips() {
    document.querySelectorAll('.tooltip-icon').forEach(tooltip => {
      tooltip.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        tooltip.classList.toggle('open');
      });
    });
    document.addEventListener('click', () => {
      document.querySelectorAll('.tooltip-icon.open').forEach(t => t.classList.remove('open'));
    });
  }

  document.addEventListener('DOMContentLoaded', initTooltips);
`;

const submitFormFunction = () => `
  function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const inputString = formData.get('input');

    const userAgent = document.getElementById('customUA').value;
    
    // Save form data to localStorage
    localStorage.setItem('inputTextarea', inputString);
    localStorage.setItem('advancedToggle', document.getElementById('advancedToggle').checked);

    // Save UserAgent data to localStorage
    localStorage.setItem('userAgent', document.getElementById('customUA').value);
    
    // Save configEditor and configType to localStorage
    localStorage.setItem('configEditor', document.getElementById('configEditor').value);
    localStorage.setItem('configType', document.getElementById('configType').value);
    
    let selectedRules;
    const predefinedRules = document.getElementById('predefinedRules').value;
    if (predefinedRules !== 'custom') {
      selectedRules = predefinedRules;
    } else {
      selectedRules = Array.from(document.querySelectorAll('input[name="selectedRules"]:checked'))
        .map(checkbox => checkbox.value);
    }
    
    const configEditor = document.getElementById('configEditor');
    const configId = new URLSearchParams(window.location.search).get('configId') || '';

    const customRules = parseCustomRules();

    const configParam = configId ? \`&configId=\${configId}\` : '';
    const xrayUrl = \`\${window.location.origin}/xray?config=\${encodeURIComponent(inputString)}&ua=\${encodeURIComponent(userAgent)}\${configParam}\`;
    const singboxUrl = \`\${window.location.origin}/singbox?config=\${encodeURIComponent(inputString)}&ua=\${encodeURIComponent(userAgent)}&selectedRules=\${encodeURIComponent(JSON.stringify(selectedRules))}&customRules=\${encodeURIComponent(JSON.stringify(customRules))}\${configParam}\`;
    const clashUrl = \`\${window.location.origin}/clash?config=\${encodeURIComponent(inputString)}&ua=\${encodeURIComponent(userAgent)}&selectedRules=\${encodeURIComponent(JSON.stringify(selectedRules))}&customRules=\${encodeURIComponent(JSON.stringify(customRules))}\${configParam}\`;
    const surgeUrl = \`\${window.location.origin}/surge?config=\${encodeURIComponent(inputString)}&ua=\${encodeURIComponent(userAgent)}&selectedRules=\${encodeURIComponent(JSON.stringify(selectedRules))}&customRules=\${encodeURIComponent(JSON.stringify(customRules))}\${configParam}\`;
    document.getElementById('xrayLink').value = xrayUrl;
    document.getElementById('singboxLink').value = singboxUrl;
    document.getElementById('clashLink').value = clashUrl;
    document.getElementById('surgeLink').value = surgeUrl;
    // Show the subscribe part
    const subscribeLinksContainer = document.getElementById('subscribeLinksContainer');
    subscribeLinksContainer.classList.remove('hide');
    subscribeLinksContainer.classList.add('show');

    // Advance the stepper and scroll to the subscribe part
    setStepper(3);
    subscribeLinksContainer.scrollIntoView({ behavior: 'smooth' });
  }

  function parseUrlAndFillForm(url) {
    try {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      
      // Parse base configuration
      const config = params.get('config');
      if (config) {
        const decodedConfig = decodeURIComponent(config);
        document.getElementById('inputTextarea').value = decodedConfig;
      }

      // Parse UserAgent
      const ua = params.get('ua');
      if (ua) {
        document.getElementById('customUA').value = decodeURIComponent(ua);
      }

      // Parse rule selection
      const selectedRules = params.get('selectedRules');
      if (selectedRules) {
        try {
          const decodedRules = decodeURIComponent(selectedRules).replace(/^"|"$/g, '');
          // Check if it's a predefined rule set
          if (['indonesia', 'minimal', 'balanced', 'comprehensive'].includes(decodedRules)) {
            const predefinedRules = document.getElementById('predefinedRules');
            predefinedRules.value = decodedRules;
            // Apply predefined rules to checkboxes
            const rulesToApply = ${JSON.stringify(PREDEFINED_RULE_SETS)};
            const checkboxes = document.querySelectorAll('.rule-checkbox');
            checkboxes.forEach(checkbox => {
              checkbox.checked = rulesToApply[decodedRules].includes(checkbox.value);
            });
            setPresetValue(decodedRules);
            syncRuleCards();
          } else {
            // Handle custom rules (JSON array)
            const rules = JSON.parse(decodedRules);
            if (Array.isArray(rules)) {
              document.getElementById('predefinedRules').value = 'custom';
              const checkboxes = document.querySelectorAll('.rule-checkbox');
              checkboxes.forEach(checkbox => {
                checkbox.checked = rules.includes(checkbox.value);
              });
              setPresetValue('custom');
              syncRuleCards();
            }
          }
        } catch (e) {
          console.error('Error parsing selected rules:', e);
        }
      }

      // Parse custom rules
      const customRules = params.get('customRules');
      if (customRules) {
        try {
          const rules = JSON.parse(decodeURIComponent(customRules));
          if (Array.isArray(rules) && rules.length > 0) {
            // Clear existing custom rules
            document.querySelectorAll('.custom-rule').forEach(rule => rule.remove());
            
            // Switch to JSON view and write rules
            switchCustomRulesTab('json');
            const jsonTextarea = document.querySelector('#customRulesJSON textarea');
            if (jsonTextarea) {
              jsonTextarea.value = JSON.stringify(rules, null, 2);
              validateJSONRealtime(jsonTextarea);
            }
            toggleCustomRulesPanel(true);
          }
        } catch (e) {
          console.error('Error parsing custom rules:', e);
        }
      }

      // Parse configuration ID
      const configId = params.get('configId');
      if (configId) {
        // Fetch configuration content
        fetch(\`/config?type=singbox&id=\${configId}\`)
          .then(response => response.json())
          .then(data => {
            if (data.content) {
              document.getElementById('configEditor').value = data.content;
              document.getElementById('configType').value = data.type || 'singbox';
            }
          })
          .catch(error => console.error('Error fetching config:', error));
      }

      // Show advanced options
      document.getElementById('advancedToggle').checked = true;
      document.getElementById('advancedOptions').classList.add('show');
    } catch (e) {
      console.error('Error parsing URL:', e);
    }
  }

  // 检测是否是短链
  function isShortUrl(url) {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      return pathParts.length >= 3 && ['b', 'c', 'x', 's'].includes(pathParts[1]) && pathParts[2];
    } catch (error) {
      return false;
    }
  }

  // 自动解析短链
  async function autoResolveShortUrl(shortUrl) {
    try {
      const response = await fetch(\`/resolve?url=\${encodeURIComponent(shortUrl)}\`);
      
      if (response.ok) {
        const data = await response.json();
        const originalUrl = data.originalUrl;
        
        // 用原始URL替换输入框中的短链
        document.getElementById('inputTextarea').value = originalUrl;
        
        // 解析原始URL到表单
        parseUrlAndFillForm(originalUrl);
        
        return true;
      } else {
        console.error('Failed to resolve short URL:', await response.text());
        return false;
      }
    } catch (error) {
      console.error('Error resolving short URL:', error);
      return false;
    }
  }

  // Add input box event listener
  document.addEventListener('DOMContentLoaded', function() {
    const inputTextarea = document.getElementById('inputTextarea');
    let lastValue = '';
    
    inputTextarea.addEventListener('input', async function() {
      const currentValue = this.value.trim();
      
      if (currentValue && currentValue !== lastValue) {
        // 首先检查是否是短链
        if (isShortUrl(currentValue)) {
          await autoResolveShortUrl(currentValue);
        }
        // 然后检查是否是项目生成的完整链接
        else if (currentValue.includes('/singbox?') || 
                 currentValue.includes('/clash?') || 
                 currentValue.includes('/surge?') || 
                 currentValue.includes('/xray?')) {
          parseUrlAndFillForm(currentValue);
        }
      }
      
      lastValue = currentValue;
    });
  });

  function loadSavedFormData() {
    const savedInput = localStorage.getItem('inputTextarea');
    if (savedInput) {
      document.getElementById('inputTextarea').value = savedInput;
    }

    const advancedToggle = localStorage.getItem('advancedToggle');
    if (advancedToggle) {
      document.getElementById('advancedToggle').checked = advancedToggle === 'true';
      if (advancedToggle === 'true') {
        document.getElementById('advancedOptions').classList.add('show');
      }
    }
    
    // Load userAgent
    const savedUA = localStorage.getItem('userAgent');
    if (savedUA) {
      document.getElementById('customUA').value = savedUA;
    }
    
    // Load configEditor and configType
    const savedConfig = localStorage.getItem('configEditor');
    const savedConfigType = localStorage.getItem('configType');
    
    if (savedConfig) {
      document.getElementById('configEditor').value = savedConfig;
    }
    if (savedConfigType) {
      document.getElementById('configType').value = savedConfigType;
    }
    
    const savedCustomPath = localStorage.getItem('customPath');
    if (savedCustomPath) {
      document.getElementById('customShortCode').value = savedCustomPath;
    }

    loadSelectedRules();
  }

  function saveSelectedRules() {
    const selectedRules = Array.from(document.querySelectorAll('input[name="selectedRules"]:checked'))
      .map(checkbox => checkbox.value);
    localStorage.setItem('selectedRules', JSON.stringify(selectedRules));
    localStorage.setItem('predefinedRules', document.getElementById('predefinedRules').value);
  }

  function loadSelectedRules() {
    const savedRules = localStorage.getItem('selectedRules');
    if (savedRules) {
      const rules = JSON.parse(savedRules);
      rules.forEach(rule => {
        const checkbox = document.querySelector(\`input[name="selectedRules"][value="\${rule}"]\`);
        if (checkbox) {
          checkbox.checked = true;
        }
      });
    }

    const savedPredefinedRules = localStorage.getItem('predefinedRules');
    if (savedPredefinedRules) {
      document.getElementById('predefinedRules').value = savedPredefinedRules;
    }
  }

  function clearFormData() {
    localStorage.removeItem('inputTextarea');
    localStorage.removeItem('advancedToggle');
    localStorage.removeItem('selectedRules');
    localStorage.removeItem('predefinedRules');
    localStorage.removeItem('configEditor'); 
    localStorage.removeItem('configType');
    localStorage.removeItem('userAgent');
    
    document.getElementById('inputTextarea').value = '';
    document.getElementById('advancedToggle').checked = false;
    document.getElementById('advancedOptions').classList.remove('show');
    document.getElementById('configEditor').value = '';
    document.getElementById('configType').value = 'singbox'; 
    document.getElementById('customUA').value = '';
    
    localStorage.removeItem('customPath');
    document.getElementById('customShortCode').value = '';

    const subscribeLinksContainer = document.getElementById('subscribeLinksContainer');
    subscribeLinksContainer.classList.remove('show');
    subscribeLinksContainer.classList.add('hide');

    document.getElementById('xrayLink').value = '';
    document.getElementById('singboxLink').value = '';
    document.getElementById('clashLink').value = '';

    // wait to reset the container
    setTimeout(() => {
      subscribeLinksContainer.classList.remove('hide');
    }, 500);
  }

  document.addEventListener('DOMContentLoaded', function() {
    loadSavedFormData();
    document.getElementById('encodeForm').addEventListener('submit', submitForm);
    document.getElementById('clearFormBtn').addEventListener('click', clearFormData);
  });
`;

const customRuleFunctions = () => `
  let customRuleCount = 0;
  let currentTab = 'form';

  function switchCustomRulesTab(tab) {
    try {
      currentTab = tab;

      // Update tab buttons
      document.querySelectorAll('.custom-rules-tab').forEach(btn => btn.classList.remove('active'));
      document.getElementById(tab + 'Tab').classList.add('active');

      // Update views
      document.querySelectorAll('.custom-rules-view').forEach(view => view.classList.remove('active'));
      document.getElementById(tab + 'View').classList.add('active');

      // Automatic view conversion
      if (tab === 'json') {
        convertFormToJSON();
      } else {
        convertJSONToForm();
      }

      updateEmptyMessages();
    } catch (error) {
      console.error('Error switching tabs:', error);
      // Ensure the view is correctly displayed if an error occurs during the switch
      document.querySelectorAll('.custom-rules-view').forEach(view => view.classList.remove('active'));
      document.getElementById(tab + 'View').classList.add('active');
    }
  }

  function countCustomRules() {
    let total = document.querySelectorAll('.custom-rule').length;
    const jsonTextarea = document.querySelector('#customRulesJSON textarea');
    if (jsonTextarea && jsonTextarea.value.trim()) {
      try {
        const parsed = JSON.parse(jsonTextarea.value.trim());
        if (Array.isArray(parsed)) {
          total = parsed.filter(r => r && r.name && String(r.name).trim()).length;
        }
      } catch (e) { /* invalid JSON is ignored for the badge */ }
    }
    return total;
  }

  function updateEmptyMessages() {
    const hasFormRules = document.querySelectorAll('.custom-rule').length > 0;
    const emptyMessage = document.getElementById('emptyFormMessage');
    if (emptyMessage) emptyMessage.style.display = hasFormRules ? 'none' : 'block';
    const badge = document.getElementById('customRulesBadge');
    if (badge) {
      const count = countCustomRules();
      badge.textContent = count;
      badge.classList.toggle('has-rules', count > 0);
    }
  }

  function toggleCustomRulesPanel(force) {
    const panel = document.getElementById('customRulesPanel');
    if (!panel) return;
    const open = typeof force === 'boolean' ? force : !panel.classList.contains('open');
    panel.classList.toggle('open', open);
    const toggle = document.getElementById('customRulesToggle');
    if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function addCustomRule() {
    const customRulesDiv = document.getElementById('customRules');
    const newRuleDiv = document.createElement('div');
    newRuleDiv.className = 'custom-rule mb-3 p-3 border rounded';
    newRuleDiv.dataset.ruleId = customRuleCount++;
    newRuleDiv.innerHTML = \`
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h6 class="mb-0">${t('customRule')} #\${getNextRuleNumber()}</h6>
        <button type="button" class="btn btn-danger btn-sm" onclick="removeRule(this)">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="row">
        <div class="col-md-6 mb-2">
          <label class="form-label">${t('customRuleOutboundName')}</label>
          <input type="text" class="form-control" name="customRuleName[]" placeholder="${t('customRuleOutboundName')}" required>
        </div>
        <div class="col-md-6 mb-2">
          <label class="form-label">${t('customRuleGeoSite')}</label>
          <span class="tooltip-icon">
            <i class="fas fa-question-circle"></i>
            <span class="tooltip-content">
              ${t('customRuleGeoSiteTooltip')}
            </span>
          </span>
          <input type="text" class="form-control" name="customRuleSite[]" placeholder="${t('customRuleGeoSitePlaceholder')}">
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-2">
          <label class="form-label">${t('customRuleGeoIP')}</label>
          <span class="tooltip-icon">
            <i class="fas fa-question-circle"></i>
            <span class="tooltip-content">
              ${t('customRuleGeoIPTooltip')}
            </span>
          </span>
          <input type="text" class="form-control" name="customRuleIP[]" placeholder="${t('customRuleGeoIPPlaceholder')}">
        </div>
        <div class="col-md-6 mb-2">
          <label class="form-label">${t('customRuleDomainSuffix')}</label>
          <input type="text" class="form-control" name="customRuleDomainSuffix[]" placeholder="${t('customRuleDomainSuffixPlaceholder')}">
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-2">
          <label class="form-label">${t('customRuleDomainKeyword')}</label>
          <input type="text" class="form-control" name="customRuleDomainKeyword[]" placeholder="${t('customRuleDomainKeywordPlaceholder')}">
        </div>
        <div class="col-md-6 mb-2">
          <label class="form-label">${t('customRuleIPCIDR')}</label>
          <input type="text" class="form-control" name="customRuleIPCIDR[]" placeholder="${t('customRuleIPCIDRPlaceholder')}">
        </div>
      </div>
      <div class="mb-2">
        <label class="form-label">${t('customRuleProtocol')}</label>
        <span class="tooltip-icon">
          <i class="fas fa-question-circle"></i>
          <span class="tooltip-content">
            ${t('customRuleProtocolTooltip')}
          </span>
        </span>
        <input type="text" class="form-control" name="customRuleProtocol[]" placeholder="${t('customRuleProtocolPlaceholder')}">
      </div>
    \`;
    customRulesDiv.appendChild(newRuleDiv);
    updateEmptyMessages();

    // Switch to form tab if not already there
    if (currentTab !== 'form') {
      switchCustomRulesTab('form');
    }
  }

  function clearAllCustomRules() {
    if (confirm('${t('confirmClearAllRules')}')) {
      document.querySelectorAll('.custom-rule').forEach(rule => rule.remove());
      document.querySelectorAll('.custom-rule-json').forEach(rule => rule.remove());
      customRuleCount = 0; 
      updateEmptyMessages();
    }
  }

  // Add a function to get the next rule number
  function getNextRuleNumber() {
    const existingRules = document.querySelectorAll('.custom-rule');
    return existingRules.length + 1;
  }

  // Modify the remove rule function to update the sequence number
  function removeRule(button) {
    const ruleDiv = button.closest('.custom-rule, .custom-rule-json');
    if (ruleDiv) {
      ruleDiv.remove();
      // Update the sequence number of the remaining rules
      document.querySelectorAll('.custom-rule').forEach((rule, index) => {
        const titleElement = rule.querySelector('h6');
        if (titleElement) {
          titleElement.textContent = \`${t('customRule')} #\${index + 1}\`;
        }
      });
      updateEmptyMessages();
    }
  }

  function convertFormToJSON() {
    const formRules = [];
    document.querySelectorAll('.custom-rule').forEach(rule => {
      const ruleData = {
        name: rule.querySelector('input[name="customRuleName[]"]').value || '',
        site: rule.querySelector('input[name="customRuleSite[]"]').value || '',
        ip: rule.querySelector('input[name="customRuleIP[]"]').value || '',
        domain_suffix: rule.querySelector('input[name="customRuleDomainSuffix[]"]').value || '',
        domain_keyword: rule.querySelector('input[name="customRuleDomainKeyword[]"]').value || '',
        ip_cidr: rule.querySelector('input[name="customRuleIPCIDR[]"]').value || '',
        protocol: rule.querySelector('input[name="customRuleProtocol[]"]').value || ''
      };

      // Only add rules that have at least a name
      if (ruleData.name.trim()) {
        formRules.push(ruleData);
      }
    });

    // Update JSON editor content
    const jsonTextarea = document.querySelector('#customRulesJSON textarea');
    if (jsonTextarea) {
      jsonTextarea.value = JSON.stringify(formRules, null, 2);
      validateJSONRealtime(jsonTextarea);
    }
  }

  function convertJSONToForm() {
    const jsonTextarea = document.querySelector('#customRulesJSON textarea');
    if (!jsonTextarea || !jsonTextarea.value.trim()) {
      return;
    }

    try {
      const rules = JSON.parse(jsonTextarea.value.trim());
      if (!Array.isArray(rules)) {
        throw new Error('${t('mustBeArray')}');
      }

      // Clear existing form rules
      document.querySelectorAll('.custom-rule').forEach(rule => rule.remove());

      // Convert each JSON rule to form
      rules.forEach((ruleData, index) => {
        if (ruleData && ruleData.name) {
          const customRulesDiv = document.getElementById('customRules');
          const newRuleDiv = document.createElement('div');
          newRuleDiv.className = 'custom-rule mb-3 p-3 border rounded';
          newRuleDiv.innerHTML = \`
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h6 class="mb-0">${t('customRule')} #\${index + 1}</h6>
              <button type="button" class="btn btn-danger btn-sm" onclick="removeRule(this)">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="row">
              <div class="col-md-6 mb-2">
                <label class="form-label">${t('customRuleOutboundName')}</label>
                <input type="text" class="form-control" name="customRuleName[]" value="\${ruleData.name || ''}" required>
              </div>
              <div class="col-md-6 mb-2">
                <label class="form-label">${t('customRuleGeoSite')}</label>
                <input type="text" class="form-control" name="customRuleSite[]" value="\${ruleData.site || ''}">
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-2">
                <label class="form-label">${t('customRuleGeoIP')}</label>
                <input type="text" class="form-control" name="customRuleIP[]" value="\${ruleData.ip || ''}">
              </div>
              <div class="col-md-6 mb-2">
                <label class="form-label">${t('customRuleDomainSuffix')}</label>
                <input type="text" class="form-control" name="customRuleDomainSuffix[]" value="\${ruleData.domain_suffix || ''}">
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-2">
                <label class="form-label">${t('customRuleDomainKeyword')}</label>
                <input type="text" class="form-control" name="customRuleDomainKeyword[]" value="\${ruleData.domain_keyword || ''}">
              </div>
              <div class="col-md-6 mb-2">
                <label class="form-label">${t('customRuleIPCIDR')}</label>
                <input type="text" class="form-control" name="customRuleIPCIDR[]" value="\${ruleData.ip_cidr || ''}">
              </div>
            </div>
            <div class="mb-2">
              <label class="form-label">${t('customRuleProtocol')}</label>
              <input type="text" class="form-control" name="customRuleProtocol[]" value="\${ruleData.protocol || ''}">
            </div>
          \`;
          customRulesDiv.appendChild(newRuleDiv);
        }
      });
    } catch (error) {
      console.error('Error converting JSON to form:', error);
      // If an error occurs during the conversion, clear the form view
      document.querySelectorAll('.custom-rule').forEach(rule => rule.remove());
    }

    updateEmptyMessages();
  }

  function validateJSONRealtime(textarea) {
    const messageDiv = textarea.parentNode.querySelector('.json-validation-message');
    const jsonText = textarea.value.trim();
    // Clear previous validation state
    textarea.classList.remove('json-valid', 'json-invalid');
    messageDiv.style.display = 'none';
    messageDiv.classList.remove('valid', 'invalid');
    if (!jsonText) {
      return; // Don't validate empty textarea
    }
    try {
      const rules = JSON.parse(jsonText);
      if (!Array.isArray(rules)) {
        throw new Error('${t('mustBeArray')}');
      }
      const errors = [];
      rules.forEach((ruleData, ruleIndex) => {
        if (!ruleData.name || !ruleData.name.trim()) {
          errors.push(\`${t('rule')} #\${ruleIndex + 1}: ${t('nameRequired')}\`);
        }
      });
      if (errors.length > 0) {
        throw new Error(errors.join('; '));
      }
      // Valid JSON
      textarea.classList.add('json-valid');
      messageDiv.textContent = \`${t('validJSON')} (\${rules.length} ${t('rules')})\`;
      messageDiv.classList.add('valid');
      messageDiv.style.display = 'block';
    } catch (error) {
      // Invalid JSON
      textarea.classList.add('json-invalid');
      messageDiv.textContent = \`${t('invalidJSON')}: \${error.message}\`;
      messageDiv.classList.add('invalid');
      messageDiv.style.display = 'block';
    }
    updateEmptyMessages();
  }

  function validateJSON() {
    let allValid = true;
    let errorMessages = [];
    document.querySelectorAll('.custom-rule-json').forEach((rule, index) => {
      const textarea = rule.querySelector('textarea[name="customRuleJSON[]"]');
      validateJSONRealtime(textarea);
      if (textarea.classList.contains('json-invalid')) {
        allValid = false;
        const messageDiv = textarea.parentNode.querySelector('.json-validation-message');
        errorMessages.push(\`JSON #\${index + 1}: \${messageDiv.textContent}\`);
      }
    });
    if (allValid) {
      alert('${t('allJSONValid')}');
    } else {
      alert('${t('jsonValidationErrors')}:\\n\\n' + errorMessages.join('\\n'));
    }
  }

  function parseCustomRules() {
    const customRules = [];

    // Process ordinary form rules
    document.querySelectorAll('.custom-rule').forEach(rule => {
      const ruleData = {
        name: rule.querySelector('input[name="customRuleName[]"]').value || '',
        site: rule.querySelector('input[name="customRuleSite[]"]').value || '',
        ip: rule.querySelector('input[name="customRuleIP[]"]').value || '',
        domain_suffix: rule.querySelector('input[name="customRuleDomainSuffix[]"]').value || '',
        domain_keyword: rule.querySelector('input[name="customRuleDomainKeyword[]"]').value || '',
        ip_cidr: rule.querySelector('input[name="customRuleIPCIDR[]"]').value || '',
        protocol: rule.querySelector('input[name="customRuleProtocol[]"]').value || ''
      };

      if (ruleData.name.trim()) {
        customRules.push(ruleData);
      }
    });

    // Process JSON rules
    const jsonTextarea = document.querySelector('#customRulesJSON textarea');
    if (jsonTextarea && jsonTextarea.value.trim()) {
      try {
        const jsonRules = JSON.parse(jsonTextarea.value.trim());
        if (Array.isArray(jsonRules)) {
          customRules.push(...jsonRules.filter(r => r.name && r.name.trim()));
        }
      } catch (error) {
        console.error('Error parsing JSON rules:', error);
      }
    }

    return customRules;
  }

  // Initialize interface state
  document.addEventListener('DOMContentLoaded', function() {
    updateEmptyMessages();

    // Initialize real-time validation for JSON textarea
    const jsonTextarea = document.querySelector('#customRulesJSON textarea');
    if (jsonTextarea && jsonTextarea.value.trim()) {
      validateJSONRealtime(jsonTextarea);
    }

    // Initialize tooltips for dynamically added content
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1 && node.querySelectorAll) {
              initTooltips();
            }
          });
        }
      });
    });

    observer.observe(document.getElementById('customRules'), { childList: true, subtree: true });
  });

  function addCustomRuleJSON() {
    const customRulesJSONDiv = document.getElementById('customRulesJSON');
    const newRuleDiv = document.createElement('div');
    newRuleDiv.className = 'custom-rule-json mb-3 p-3 border rounded';
    newRuleDiv.dataset.ruleId = customRuleCount++;
    newRuleDiv.innerHTML = \`
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h6 class="mb-0">${t('customRuleJSON')}</h6>
        <button type="button" class="btn btn-danger btn-sm" onclick="removeRule(this)">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="mb-2">
        <label class="form-label">${t('customRuleJSON')}</label>
        <div class="json-textarea-container">
          <textarea class="form-control json-textarea" name="customRuleJSON[]" rows="8"
                    oninput="validateJSONRealtime(this)"></textarea>
          <div class="json-validation-message" style="display: none;"></div>
        </div>
      </div>
    \`;
    customRulesJSONDiv.appendChild(newRuleDiv);
    updateEmptyMessages();
  }
`;

const generateQRCodeFunction = () => `
  function generateQRCode(id) {
    const input = document.getElementById(id);
    const text = input.value;
    if (!text) {
      showToast(${JSON.stringify(ui('noLink'))}, true);
      return;
    }
    try {
      const qr = qrcode(0, 'M');
      qr.addData(text);
      qr.make();

      const moduleCount = qr.getModuleCount();
      const cellSize = Math.max(2, Math.min(8, Math.floor(300 / moduleCount)));
      const margin = Math.floor(cellSize * 0.5);

      const qrImage = qr.createDataURL(cellSize, margin);
      
      const modal = document.createElement('div');
      modal.className = 'qr-modal';
      modal.innerHTML = \`
        <div class="qr-card">
          <img src="\${qrImage}" alt="QR Code">
          <p>Scan QR Code</p>
        </div>
      \`;

      document.body.appendChild(modal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeQRModal();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeQRModal();
        }
      });

      requestAnimationFrame(() => {
        modal.classList.add('show');
      });
    } catch (error) {
      console.error('Error in generating:', error);
      showToast(${JSON.stringify(ui('shortenFailed'))}, true);
    }
  }

  function closeQRModal() {
    const modal = document.querySelector('.qr-modal');
    if (modal) {
      modal.classList.remove('show');
      modal.addEventListener('transitionend', () => {
        document.body.removeChild(modal);
      }, { once: true });
    }
  }
`;

const saveConfig = () => `
  function saveConfig() {
    const configEditor = document.getElementById('configEditor');
    const configType = document.getElementById('configType').value;
    const config = configEditor.value;

    localStorage.setItem('configEditor', config);
    localStorage.setItem('configType', configType);
    
    fetch('/config?type=' + configType, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: configType,
        content: config
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to save configuration');
      }
      return response.text();
    })
    .then(configId => {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('configId', configId);
      window.history.pushState({}, '', currentUrl);
      alert('Configuration saved successfully!');
    })
    .catch(error => {
      alert('Error: ' + error.message);
    });
  }
`;

const clearConfig = () => `
  function clearConfig() {
    document.getElementById('configEditor').value = '';
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete('configId');
    window.history.pushState({}, '', currentUrl);
    localStorage.removeItem('configEditor');
  }
`;
