/* Memo prototype — core: state, routing, helpers, icons, shared components. */

const ICONS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  bookmark: '<path d="M6 4h12v17l-6-4-6 4z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/>',
  heart: '<path d="M12 20s-7-4.4-8.6-9A4.7 4.7 0 0 1 12 6.4 4.7 4.7 0 0 1 20.6 11C19 15.6 12 20 12 20z"/>',
  share: '<path d="M12 3v12"/><path d="m7 8 5-5 5 5"/><path d="M5 13v7h14v-7"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  right: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  left: '<path d="M19 12H5"/><path d="m11 6-6 6 6 6"/>',
  chevR: '<path d="m9 6 6 6-6 6"/>',
  chevL: '<path d="m15 6-6 6 6 6"/>',
  play: '<path d="M7 4.5v15l12.5-7.5z" fill="currentColor" stroke="none"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  spark: '<path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7z"/>',
  upload: '<path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M4 16v4h16v-4"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/>',
  store: '<path d="M4 9 5.5 4h13L20 9"/><path d="M4 9h16v11H4z"/><path d="M9 20v-6h6v6"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c1.8.7 3 2.5 3.5 5.2"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  gift: '<rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v8h14v-8M12 8v13M12 8S10.5 3 8 4s1 4 4 4zM12 8s1.5-5 4-4-1 4-4 4z"/>',
  link: '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
  shield: '<path d="M12 3 4 6v6c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V6z"/>',
  thumbsDown: '<path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H6.7a2 2 0 0 0-2 1.7L3.3 12a2 2 0 0 0 2 2.3z"/><path d="M17 2h3v11h-3"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  inbox: '<path d="M3 13h5l1.5 3h5L16 13h5"/><path d="M5.5 5h13L21 13v6H3v-6z"/>',
  wand: '<path d="m4 20 11-11M14 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1zM19 11l.6 1.4L21 13l-1.4.6L19 15l-.6-1.4L17 13l1.4-.6z"/>',
};
function ic(name, cls = '') { return `<svg class="${cls}" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`; }

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = n => n >= 10000 ? (n / 1000).toFixed(n >= 100000 ? 0 : 1).replace(/\.0$/, '') + 'k' : n.toLocaleString('en-CA');
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------------- State ---------------- */
const STORE_KEY = 'memo-prototype-v1';
function freshState() {
  return {
    mode: 'landing',            // landing | member | business
    route: { name: 'landing', params: {} },
    stack: [],
    user: { name: 'Jordan', onboarded: false, interests: [], level: 'some', setting: 'mix', company: 'either', time: 'mid', account: false, email: 'jordan.lee@example.com' },
    ob: { step: 0, draft: { interests: [], level: 'some', setting: 'mix', company: 'either', time: 'mid' } },
    saved: [], following: [], plans: [], hidden: [], swiped: [], boosts: {}, watched: [],
    privacy: { personalize: true, location: true, shareWithBiz: true },
    explore: { cat: null, coll: null, types: [], setting: null, beginner: false, sort: 'match' },
    published: [],              // items uploaded in the business demo
    bizEdits: {},               // item overrides from the business side (tags, status)
    biz: { onboarded: false, step: 0, plan: 'basic', account: { name: 'Ringside Kitsilano', email: 'hello@ringsidekits.ca' }, picked: ['IMG_4021.MOV', 'insta_reel_0312.mp4', 'class schedule FALL final v3.pdf', 'saturday open gym poster.png'], recDone: [], period: 30, libFilter: 'all', libQuery: '', dim: 'activity', confirmed: [], profile: null, earned: 186 },
    up: null,
  };
}
let state = freshState();
function load() {
  try { const raw = localStorage.getItem(STORE_KEY); if (raw) { const s = JSON.parse(raw); state = Object.assign(freshState(), s); state.biz = Object.assign(freshState().biz, s.biz || {}); state.user = Object.assign(freshState().user, s.user || {}); } } catch (e) { /* storage unavailable */ }
}
function save() {
  try {
    const copy = { ...state, up: null, published: state.published.map(p => (p.img && p.img.length > 1500000) ? { ...p, img: null } : p) };
    localStorage.setItem(STORE_KEY, JSON.stringify(copy));
  } catch (e) { /* storage full or blocked; demo still works in memory */ }
}

/* ---------------- Items ---------------- */
function allItems() {
  const base = [...ITEMS, ...DRAFTS, ...state.published];
  return base.map(it => state.bizEdits[it.id] ? { ...it, ...state.bizEdits[it.id] } : it);
}
function liveItems() { return allItems().filter(i => (i.status || 'live') === 'live'); }
function item(id) { return allItems().find(i => i.id === id); }
function biz(id) {
  const b = BUSINESSES[id];
  if (id === 'ringside' && state.biz.profile) return { ...b, ...state.biz.profile };
  return b;
}

/* ---------------- Personalization ---------------- */
function score(it) {
  const u = state.user; let s = 0;
  if (!state.privacy.personalize) return it.trend + it.views / 20000;
  it.cats.forEach((c, i) => { if (u.interests.includes(c)) s += i === 0 ? 5 : 2.5; s += (state.boosts[c] || 0) * 1.4; });
  if (u.company === 'social' && it.social === 'group') s += 1.6;
  if (u.company === 'solo' && it.social === 'solo') s += 1.6;
  if (u.setting === 'outdoors' && it.setting === 'outdoor') s += 2.2;
  if (u.setting === 'outdoors' && it.setting === 'indoor') s -= .6;
  if (u.setting === 'indoors' && it.setting === 'indoor') s += 1.2;
  if (u.setting === 'home' && it.setting === 'online') s += 2.2;
  if (u.level === 'new' && it.level === 'beginner') s += 2.2;
  if (u.level === 'new' && it.level === 'intermediate') s -= 2;
  if (u.level === 'regular' && it.level === 'intermediate') s += 1.2;
  if (u.time === 'short' && it.dur && it.dur <= 20) s += 1.2;
  if (u.time === 'long' && it.dur >= 60) s += 1;
  if (it.isNew) s += 1.5;
  s += it.trend * 0.12;
  if (state.hidden.includes(it.id)) s -= 100;
  return s;
}
function ranked(list = liveItems()) { return list.map(i => [i, score(i)]).sort((a, b) => b[1] - a[1]).map(x => x[0]); }
function distOf(it) { const b = biz(it.biz); return it.setting === 'online' ? null : b.dist; }
function reasons(it) {
  const u = state.user, r = [];
  it.cats.forEach(c => { if (u.interests.includes(c)) r.push(CAT[c].name); });
  if ((state.boosts[it.cats[0]] || 0) > 0 && !u.interests.includes(it.cats[0])) r.push('You kept similar picks');
  if (u.level === 'new' && it.level === 'beginner') r.push('Beginner-friendly');
  if (u.setting === 'outdoors' && it.setting === 'outdoor') r.push('Outdoors');
  if (u.setting === 'home' && it.setting === 'online') r.push('At home');
  if (u.company === 'social' && it.social === 'group') r.push('With people');
  const d = distOf(it); if (d !== null && d < 1.5) r.push(`${d} km away`);
  return r;
}

/* ---------------- Router ---------------- */
function go(name, params = {}, opts = {}) {
  if (!opts.replace && state.route) state.stack.push(state.route);
  if (state.stack.length > 40) state.stack.shift();
  state.route = { name, params };
  if (name.startsWith('u/')) state.mode = 'member';
  else if (name.startsWith('b/')) state.mode = 'business';
  else state.mode = 'landing';
  closeLayer();
  render();
  if (!opts.keepScroll) window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  save();
}
function back(fallback = 'u/home') {
  const prev = state.stack.pop();
  if (prev) { state.route = prev; state.mode = prev.name.startsWith('u/') ? 'member' : prev.name.startsWith('b/') ? 'business' : 'landing'; render(); window.scrollTo(0, 0); }
  else go(fallback, {}, { replace: true });
}
function switchMode(mode) {
  if (mode === 'member') go(state.user.onboarded ? 'u/home' : 'u/onboard');
  else if (mode === 'business') go(state.biz.onboarded ? 'b/overview' : 'b/start');
  else go('landing');
}

/* ---------------- Layers: overlays, sheets, toasts ---------------- */
function openLayer(html) { const l = $('#layer'); l.innerHTML = html; document.body.style.overflow = 'hidden'; const f = l.querySelector('[autofocus]'); if (f) setTimeout(() => f.focus(), 30); }
function closeLayer() { const l = $('#layer'); if (l) l.innerHTML = ''; document.body.style.overflow = ''; }
function toast(msg, action) {
  const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status');
  t.innerHTML = `<span>${msg}</span>` + (action ? `<button data-act="${action.act}" ${Object.entries(action.data || {}).map(([k, v]) => `data-${k}="${esc(v)}"`).join(' ')}>${action.label}</button>` : '');
  $('#toasts').appendChild(t);
  setTimeout(() => { t.style.transition = 'opacity .3s'; t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3600);
}

/* ---------------- Shared components ---------------- */
function demobar() {
  const m = state.mode;
  return `<div class="demobar"><div class="wrap in">
    <button data-act="home" aria-label="Memo prototype home">${logo(24)}</button>
    <span class="tag">Product prototype</span>
    <span class="spacer"></span>
    <span class="hide-sm" style="opacity:.6;font-size:12.5px">Explore as</span>
    <div class="seg" role="group" aria-label="Choose demo">
      <button data-act="mode" data-mode="member" aria-pressed="${m === 'member'}">Member</button>
      <button data-act="mode" data-mode="business" aria-pressed="${m === 'business'}">Business</button>
    </div>
    <button class="link hide-sm" data-act="reset">Reset demo</button>
  </div></div>`;
}

function media(it, opts = {}) {
  const t = TYPES[it.type];
  const art = it.img ? `<img src="${it.img}" alt="">` : poster(it.id, it.art || it.cats[0], { tall: opts.tall });
  let extra = '';
  if (!opts.bare) {
    extra += `<span class="badge">${t.label}</span>`;
    if (it.isNew) extra += `<span class="badge badge-r" style="background:var(--coral)">New</span>`;
    if (it.type === 'video') extra += `<span class="play">${ic('play')}</span>`;
    const m = /([A-Z][a-z]{2}) (\d{1,2})/.exec(it.when || '');
    if ((it.type === 'event') && m) extra += `<span class="datebox"><small>${m[1]}</small><b>${m[2]}</b></span>`;
  }
  if (opts.save) extra += saveFab(it.id);
  return `<div class="media ${opts.cls || ''}">${art}${extra}</div>`;
}
function saveFab(id) { const on = state.saved.includes(id); return `<button class="save-fab ${on ? 'on' : ''}" data-act="save" data-id="${id}" aria-pressed="${on}" aria-label="${on ? 'Remove from saved' : 'Save'}">${ic('bookmark')}</button>`; }
function bizLine(b) { return `<span class="biz-line"><span class="mono" style="background:${b.color}">${b.mono}</span>${esc(b.name)}</span>`; }

function card(it, opts = {}) {
  const b = biz(it.biz); const d = distOf(it);
  const rs = opts.reason ? reasons(it).slice(0, 2) : [];
  return `<article class="card ${opts.tall ? 'tall' : ''}" data-act="open" data-id="${it.id}" tabindex="0" role="link" aria-label="${esc(it.title)}">
    ${media(it, { save: true, tall: opts.tall })}
    <div>
      ${rs.length ? `<div class="reason" style="margin-bottom:5px">${ic('spark')}${rs.join(' · ')}</div>` : ''}
      <h3>${esc(it.title)}</h3>
      <div class="meta" style="margin-top:4px"><span>${esc(it.when)}</span>${d !== null ? `<span>${d} km</span>` : ''}</div>
      <div style="margin-top:8px">${bizLine(b)}</div>
    </div>
  </article>`;
}

function emptyState(title, body, btn) {
  return `<div class="empty-state"><h3>${title}</h3><p>${body}</p>${btn ? `<div style="margin-top:16px">${btn}</div>` : ''}</div>`;
}

/* ---------------- Landing ---------------- */
function engineSVG() {
  const files = ['IMG_4021.MOV', 'schedule_v3.pdf', 'reel_0312.mp4'];
  const people = [['Ava', 'Likes strength'], ['Raj', 'Lives in Kits'], ['Jen', 'New to boxing']];
  const ys = [70, 170, 270];
  const dot = (path, dur, delay, color) => `<circle r="4.5" fill="${color}"><animateMotion dur="${dur}s" begin="-${delay}s" repeatCount="indefinite" path="${path}"/></circle>`;
  let g = '';
  ys.forEach((y, i) => {
    const p1 = `M150 ${y} C 200 ${y}, 200 170, 232 170`;
    const p2 = `M308 170 C 340 170, 340 ${y}, 386 ${y}`;
    g += `<path d="${p1}" stroke="rgba(116,229,214,.28)" stroke-width="1.5" fill="none" stroke-dasharray="3 5"/>`;
    g += `<path d="${p2}" stroke="rgba(116,229,214,.28)" stroke-width="1.5" fill="none" stroke-dasharray="3 5"/>`;
    g += dot(p1, 2.4, i * 0.8, '#F2A93B') + dot(p2, 2.4, 1.2 + i * 0.8, '#74E5D6');
    g += `<g transform="translate(10 ${y - 17})"><rect width="140" height="34" rx="9" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.14)"/><text x="14" y="21.5" fill="#E9FAF7" font-size="11.5" font-family="ui-monospace,Menlo,monospace">${files[i]}</text></g>`;
    const [nm, why] = people[i];
    g += `<g transform="translate(386 ${y - 22})"><rect width="124" height="44" rx="12" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.14)"/><circle cx="22" cy="22" r="13" fill="#2CC6B4"/><text x="22" y="26.5" text-anchor="middle" fill="#032A3A" font-size="11" font-weight="800" font-family="Raleway,sans-serif">${nm[0]}</text><text x="42" y="19" fill="#fff" font-size="12.5" font-weight="700" font-family="Figtree,sans-serif">${nm}</text><text x="42" y="33" fill="rgba(233,250,247,.65)" font-size="10.5" font-family="Figtree,sans-serif">${why}</text></g>`;
  });
  const tags = ['Boxing', 'Beginner', 'Kitsilano'];
  let tg = ''; let tx = 270 - (tags.reduce((a, t) => a + t.length * 6.6 + 18, 0) + 12) / 2;
  tags.forEach((t, i) => { const w = t.length * 6.6 + 18; tg += `<g transform="translate(${tx.toFixed(1)} 228)"><rect width="${w}" height="22" rx="11" fill="rgba(116,229,214,.16)" stroke="rgba(116,229,214,.5)"/><text x="${w / 2}" y="15" text-anchor="middle" fill="#74E5D6" font-size="11" font-weight="700" font-family="Figtree,sans-serif">${t}<animate attributeName="opacity" values="0;1;1;0" dur="4.8s" begin="${i * .4}s" repeatCount="indefinite"/></text></g>`; tx += w + 6; });
  return `<svg class="flow" viewBox="0 0 520 330" role="img" aria-label="Business files flow into Memo, get tagged, and reach the people they suit">
    ${g}
    <circle cx="270" cy="170" r="50" fill="rgba(44,198,180,.12)"><animate attributeName="r" values="44;54;44" dur="3s" repeatCount="indefinite"/></circle>
    <circle cx="270" cy="170" r="38" fill="#073246" stroke="#2CC6B4" stroke-width="1.5"/>
    <g transform="translate(244 148) scale(.44)"><path d="M66 8 C92 8 112 27 112 52 C112 77 92 96 66 96 L44 96 C26 96 18 78 18 52 C18 27 34 8 54 8 Z" fill="#2CC6B4"/><path d="M36 64 L52 42 L66 60 L80 42 L94 64" fill="none" stroke="#0B6F67" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/></g>
    ${tg}
    <text x="80" y="318" text-anchor="middle" fill="rgba(233,250,247,.55)" font-size="10.5" font-weight="700" letter-spacing="1.4" font-family="Figtree,sans-serif">WHAT YOU HAVE</text>
    <text x="270" y="318" text-anchor="middle" fill="rgba(233,250,247,.55)" font-size="10.5" font-weight="700" letter-spacing="1.4" font-family="Figtree,sans-serif">MEMO ORGANIZES</text>
    <text x="448" y="318" text-anchor="middle" fill="rgba(233,250,247,.55)" font-size="10.5" font-weight="700" letter-spacing="1.4" font-family="Figtree,sans-serif">WHO IT REACHES</text>
  </svg>`;
}

function viewLanding() {
  return `<main class="landing">
  <div class="wrap">
    <section class="land-hero">
      <div class="fade-in">
        <span class="eyebrow">Marketing experiences, movement opportunities</span>
        <h1 style="margin-top:16px">Find the thing that makes you <em>want to move.</em></h1>
        <p class="lede">Memo gathers the classes, clubs, videos and local studios scattered across a dozen apps and tabs, and turns them into one feed built around what you like. For businesses, it turns the content you already have into customers.</p>
        <div class="ctas">
          <button class="btn btn-primary btn-lg" data-act="mode" data-mode="member">Try the member app ${ic('right')}</button>
          <button class="btn btn-ghost btn-lg" data-act="mode" data-mode="business">See the business side</button>
        </div>
      </div>
      <div class="engine fade-in" style="animation-delay:.1s">
        <div class="cap"><span>The Memo engine</span><span>Live sample</span></div>
        ${engineSVG()}
      </div>
    </section>
    <section class="doors">
      <button class="door" data-act="mode" data-mode="member">
        <div>
          <span class="eyebrow">For people who want to move more</span>
          <h2>Explore as a member</h2>
          <p>Pick a few things you’re curious about. Get a feed of local classes, clubs and short videos chosen for you, then book in a tap.</p>
          <div class="steps"><span>Personalize</span><span>Discover</span><span>Engage</span><span>Book</span></div>
        </div>
        <span class="go">${ic('right')}</span>
      </button>
      <button class="door" data-act="mode" data-mode="business">
        <div>
          <span class="eyebrow">For studios, coaches and clubs</span>
          <h2>Explore as a business</h2>
          <p>Upload what’s already on your phone and your Instagram. Memo tags it, organizes it and puts it in front of people nearby who’ll love it.</p>
          <div class="steps"><span>Upload</span><span>Organize</span><span>Distribute</span><span>See results</span></div>
        </div>
        <span class="go">${ic('right')}</span>
      </button>
    </section>
    <section class="loop" aria-label="How Memo works">
      ${[['Upload', 'Studios add what they already have'], ['Organize', 'Memo tags and sorts it'], ['Personalize', 'Members say what they like'], ['Discover', 'The right content finds them'], ['Engage', 'Save, watch, follow'], ['Book', 'A new regular walks in']].map(([b, s], i) => `<div><i>Step ${i + 1}</i><b>${b}</b><span>${s}</span></div>`).join('')}
    </section>
    <section class="mission">
      ${bubbleCluster()}
      <div><q>Move together, move the world.</q><p style="margin-top:8px">Helping people find creative ways to move, and helping small businesses thrive while they do it.</p></div>
    </section>
  </div>
  </main>`;
}
