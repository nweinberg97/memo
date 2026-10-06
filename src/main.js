/* Memo prototype — rendering, actions and boot */

const VIEWS = {
  'landing': viewLanding,
  'u/onboard': viewOnboard, 'u/home': viewHome, 'u/item': viewItem, 'u/biz': viewBiz, 'u/explore': viewExplore, 'u/saved': viewSaved, 'u/me': viewMe,
  'b/start': viewBizStart, 'b/onboard': viewBizOnboard, 'b/overview': viewBizOverview, 'b/content': viewBizContent, 'b/organize': viewBizOrganize, 'b/upload': viewBizUpload, 'b/profile': viewBizProfile, 'b/plan': viewBizPlan,
};
function render() {
  const r = state.route.name;
  if (r.startsWith('u/') && r !== 'u/onboard' && !state.user.onboarded) state.route = { name: 'u/onboard', params: {} };
  const v = VIEWS[state.route.name] || viewLanding;
  $('#app').innerHTML = demobar() + v();
  if (state.route.name === 'u/home') bindSwipe();
  if (state.route.name === 'b/upload') bindUpload();
  if (state.route.name === 'u/onboard' && state.ob.step === 2) {
    clearTimeout(window.__tune); window.__tune = setTimeout(() => { if (state.route.name === 'u/onboard' && state.ob.step === 2) finishOnboarding(); }, 2300);
  }
}

function setPersona(id) {
  const p = PERSONAS.find(x => x.id === id);
  Object.assign(state.user, { interests: [...p.interests], level: p.level, setting: p.setting, company: p.company, time: p.time, onboarded: true });
  state.ob.draft = { interests: [...p.interests], level: p.level, setting: p.setting, company: p.company, time: p.time };
  state.boosts = {}; state.swiped = []; state.hidden = [];
}

const A = {
  home: () => go('landing'),
  mode: d => switchMode(d.mode),
  reset: () => { try { localStorage.removeItem(STORE_KEY); } catch (e) { } state = freshState(); render(); window.scrollTo(0, 0); toast('Demo reset to a fresh start'); },
  go: d => { const p = {}; if (d.tab) p.tab = d.tab; go(d.to, p, { replace: !!d.replace, keepScroll: !!d.replace }); },
  back: () => back(state.mode === 'business' ? 'b/overview' : 'u/home'),
  scroll: d => { const el = document.getElementById(d.target); if (el) el.scrollBy({ left: +d.dir * el.clientWidth * .8, behavior: 'smooth' }); },

  /* onboarding */
  'ob-interest': (d, el) => { const L = state.ob.draft.interests; const i = L.indexOf(d.id); i >= 0 ? L.splice(i, 1) : L.push(d.id); el.classList.toggle('on'); el.setAttribute('aria-pressed', L.includes(d.id)); const b = $('[data-act="ob-next"]'); if (b) b.disabled = L.length < 2; const n = $('.ob-foot .muted'); if (n) n.textContent = `${L.length} selected`; },
  'ob-next': () => { state.ob.step++; render(); window.scrollTo(0, 0); },
  'ob-back': () => { state.ob.step--; render(); },
  'ob-opt': d => { state.ob.draft[d.key] = d.val; render(); },
  'ob-skip': () => { if (!state.ob.draft.interests.length) state.ob.draft.interests = ['running', 'strength', 'yoga']; state.ob.step = 2; render(); },
  persona: d => { setPersona(d.id); state.ob.step = 2; render(); },
  'persona-live': d => { setPersona(d.id); go('u/home'); toast(`Now viewing as: ${PERSONAS.find(p => p.id === d.id).label}`); },
  'redo-ob': () => { state.ob = { step: 0, draft: { ...state.ob.draft, interests: [...state.user.interests] } }; state.user.onboarded = false; go('u/onboard'); },

  /* content */
  open: d => openItem(d.id),
  'open-top': () => { const t = $$('#stack .scard').pop(); if (t) openItem(t.dataset.id); },
  'open-biz': d => go('u/biz', { id: d.id }),
  'biz-tab': d => go('u/biz', { id: d.id, tab: d.tab }, { replace: true, keepScroll: true }),
  save: (d) => {
    const i = state.saved.indexOf(d.id); const on = i < 0;
    on ? state.saved.push(d.id) : state.saved.splice(i, 1);
    const it = item(d.id); if (on) it.cats.forEach(c => state.boosts[c] = (state.boosts[c] || 0) + .5);
    $$(`[data-act="save"][data-id="${d.id}"]`).forEach(b => { b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
    toast(on ? 'Saved' : 'Removed from saved', on ? { label: 'View saved', act: 'go', data: { to: 'u/saved' } } : null); save();
  },
  share: d => { const it = item(d.id); copyText(`${it.title} · ${biz(it.biz).name} on Memo`); },
  'share-biz': d => copyText(`${biz(d.id).name} on Memo`),
  follow: d => { const i = state.following.indexOf(d.id); i < 0 ? state.following.push(d.id) : state.following.splice(i, 1); save(); render(); toast(i < 0 ? `Following ${biz(d.id).name}. Their new content will show up first.` : `Unfollowed ${biz(d.id).name}`); },
  less: d => { state.hidden.push(d.id); const it = item(d.id); state.boosts[it.cats[0]] = (state.boosts[it.cats[0]] || 0) - 1; save(); toast('Got it. You’ll see less like this.', { label: 'Undo', act: 'undo-less', data: { id: d.id } }); back(); },
  'undo-less': d => { state.hidden = state.hidden.filter(x => x !== d.id); const it = item(d.id); state.boosts[it.cats[0]] = (state.boosts[it.cats[0]] || 0) + 1; save(); render(); },
  play: d => playVideo(d.id),
  cta: d => {
    const it = item(d.id); if (!it) return;
    if (it.type === 'video') { if (state.route.name !== 'u/item' || state.route.params.id !== d.id) { go('u/item', { id: d.id }); setTimeout(() => playVideo(d.id), 250); } else playVideo(d.id); return; }
    if (it.type === 'article') { if (state.route.name !== 'u/item') { go('u/item', { id: d.id }); } setTimeout(() => { const b = $('#article-body'); if (b) { b.hidden = false; b.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }, 60); return; }
    ctaSheet(d.id);
  },
  slot: d => { ctaSheet(d.id, +d.i); },
  close: () => closeLayer(),
  'close-bg': (d, el, ev) => { if (ev.target === el) closeLayer(); },
  'cancel-plan': d => { state.plans = state.plans.filter(p => !(p.id === d.id && String(p.day) === d.day)); save(); render(); toast('Booking cancelled'); },
  swipe: d => swipeTop(d.dir),
  'picks-reset': () => { state.swiped = []; $('#picks-wrap').innerHTML = picksSection(); bindSwipe(); },

  /* explore */
  'explore-cat': d => { state.explore = { ...state.explore, cat: d.id, coll: null }; go('u/explore'); },
  'ex-coll': d => { state.explore = { ...state.explore, coll: d.id, cat: null }; go('u/explore'); },
  'ex-clear': () => { state.explore = { ...state.explore, cat: null, coll: null }; go('u/explore', {}, { replace: true }); },
  'ex-type': d => { const t = state.explore.types; const i = t.indexOf(d.t); i < 0 ? t.push(d.t) : t.splice(i, 1); rerenderKeep(); },
  'ex-setting': d => { state.explore.setting = state.explore.setting === d.v ? null : d.v; rerenderKeep(); },
  'ex-beginner': () => { state.explore.beginner = !state.explore.beginner; rerenderKeep(); },
  'ex-reset-filters': () => { Object.assign(state.explore, { types: [], setting: null, beginner: false }); rerenderKeep(); },
  'toggle-interest': d => { const L = state.user.interests; const i = L.indexOf(d.id); if (i >= 0 && L.length <= 1) return toast('Keep at least one interest'); i < 0 ? L.push(d.id) : L.splice(i, 1); save(); rerenderKeep(); toast(i < 0 ? `${CAT[d.id].name} added. Your feed has been updated.` : `${CAT[d.id].name} removed from your feed`, { label: 'See feed', act: 'go', data: { to: 'u/home' } }); },
  'me-opt': d => { state.user[d.key] = d.val; save(); rerenderKeep(); toast('Feed updated'); },
  privacy: d => { state.privacy[d.k] = !state.privacy[d.k]; save(); rerenderKeep(); },

  /* search */
  search: () => openSearch(),
  'search-fill': d => { const q = $('#q'); q.value = d.q; $('#sr').innerHTML = searchResults(d.q); q.focus(); },

  /* business: onboarding */
  'bo-begin': () => { state.biz.step = 0; go('b/onboard'); },
  'bo-skip': () => { state.biz.onboarded = true; go('b/overview'); },
  'bo-next': () => { state.biz.step++; render(); window.scrollTo(0, 0); save(); },
  'bo-prev': () => { state.biz.step--; render(); window.scrollTo(0, 0); },
  'bo-plan': d => { state.biz.plan = d.id; render(); },
  'bo-pick': d => { const L = state.biz.picked; const i = L.indexOf(d.f); i < 0 ? L.push(d.f) : L.splice(i, 1); render(); },
  'bo-finish': () => {
    const gen = SAMPLE_FILES.filter(f => state.biz.picked.includes(f.file)).map(genFromFile);
    gen.forEach(g => { if (!state.published.find(p => p.id === g.id)) state.published.push(g); });
    state.biz.onboarded = true; if (state.biz.plan === 'trial') state.biz.earned = 186;
    go('b/overview'); toast(`${gen.length} items are live on Memo`, { label: 'See as a member', act: 'see-as-member', data: { id: gen[0].id } });
  },
  'chip-one': (d, el) => { $$('.chip', el.parentElement).forEach(c => c.classList.remove('on')); el.classList.add('on'); },
  'chip-toggle': (d, el) => el.classList.toggle('on'),
  'toggle-sw': (d, el) => el.setAttribute('aria-checked', el.getAttribute('aria-checked') !== 'true'),

  /* business: dashboard & library */
  rec: d => {
    state.biz.recDone.push(d.id);
    if (d.id === 'cross') { const e = state.bizEdits.r3 || {}; state.bizEdits.r3 = { ...e, cats: ['strength', 'boxing', 'running'] }; toast('Fight Camp Conditioning now appears in Running feeds', { label: 'See as a runner', act: 'see-as-runner', data: { id: 'r3' } }); }
    if (d.id === 'draft') { state.bizEdits.rd1 = { status: 'live', views: 0, saves: 0, isNew: true }; toast('Published “Hand wraps in 90 seconds”'); }
    if (d.id === 'pin') toast('Pinned to the top of your profile');
    save(); render();
  },
  'see-as-runner': d => { setPersona('social-runner'); go('u/item', { id: d.id }); toast('Viewing as a member who likes running'); },
  'see-as-member': d => {
    if (!state.user.onboarded) { setPersona('boxing-curious'); toast('Viewing as a boxing-curious member in Kitsilano'); }
    else if (!state.user.interests.some(c => item(d.id).cats.includes(c))) state.user.interests.push(item(d.id).cats[0]);
    go('u/item', { id: d.id });
  },
  'go-member-biz': () => { if (!state.user.onboarded) setPersona('boxing-curious'); go('u/biz', { id: 'ringside' }); },
  'lib-filter': d => { state.biz.libFilter = d.k; rerenderKeep(); },
  'lib-open': d => libSheet(d.id),
  'set-status': d => { state.bizEdits[d.id] = { ...(state.bizEdits[d.id] || {}), status: d.v }; const p = state.published.find(x => x.id === d.id); if (p) p.status = d.v; save(); closeLayer(); rerenderKeep(); toast(d.v === 'live' ? 'Published to member feeds' : 'Unpublished. Members won’t see it.'); },
  dim: d => { state.biz.dim = d.k; rerenderKeep(); },
  'confirm-q': d => { state.biz.confirmed.push(d.id); save(); rerenderKeep(); toast('Thanks. Memo will remember that for similar content.'); },
  'set-plan': d => { if (state.biz.plan === d.id) return; state.biz.plan = d.id; save(); render(); toast(`Switched to ${PLANS.find(p => p.id === d.id).name}. Prototype: no charge.`); },

  /* business: upload */
  'up-sample': d => { const f = SAMPLE_FILES[+d.i]; newUpload({ name: f.file, size: f.size, kind: f.kind, guess: f.guess }); render(); window.scrollTo(0, 0); },
  'up-reset': () => { newUpload(); render(); },
  'up-again': () => { newUpload(); render(); window.scrollTo(0, 0); },
  'up-type': d => { state.up.type = d.t; render(); },
  'up-tag': d => { const t = state.up.tags[d.d][+d.i]; t.on = !t.on; refreshUploadPreview(); },
  'up-publish': () => publishUpload(false),
  'up-draft': () => publishUpload(true),

  /* business: profile */
  'pf-amen': (d, el) => { const b = Object.assign({}, biz('ringside')); const L = [...b.amenities]; const i = L.indexOf(d.a); i < 0 ? L.push(d.a) : L.splice(i, 1); state.biz.profile = { ...(state.biz.profile || {}), amenities: L }; el.classList.toggle('on'); $('#prof-preview').innerHTML = profPreview(biz('ringside')); },
  'pf-reset': () => { state.biz.profile = null; save(); render(); toast('Profile reset'); },
};

function rerenderKeep() { const y = window.scrollY; const f = document.activeElement && document.activeElement.id; render(); window.scrollTo(0, y); if (f) { const el = document.getElementById(f); if (el) { el.focus(); if (el.setSelectionRange && el.value) el.setSelectionRange(el.value.length, el.value.length); } } save(); }

function copyText(t) {
  const done = () => toast('Link copied');
  try { navigator.clipboard.writeText(t).then(done, () => toast('Copy isn’t available here. Share from the address bar instead.')); } catch (e) { toast('Copy isn’t available here.'); }
}

function bindUpload() {
  const inp = $('#file-in'); const drop = $('#drop');
  const take = file => {
    if (!file) return;
    const kind = file.type.startsWith('image') ? 'image' : file.type.startsWith('video') ? 'video' : 'doc';
    const size = file.size > 1e6 ? (file.size / 1e6).toFixed(1) + ' MB' : Math.round(file.size / 1e3) + ' KB';
    const f = { name: file.name, size, kind };
    if (kind === 'image' && file.size < 12e6) {
      const r = new FileReader(); r.onload = () => { f.img = r.result; newUpload(f); render(); }; r.readAsDataURL(file);
    } else { newUpload(f); render(); }
  };
  if (inp) inp.addEventListener('change', () => take(inp.files[0]));
  if (drop) {
    ['dragenter', 'dragover'].forEach(e => drop.addEventListener(e, ev => { ev.preventDefault(); drop.classList.add('over'); }));
    ['dragleave', 'drop'].forEach(e => drop.addEventListener(e, ev => { ev.preventDefault(); drop.classList.remove('over'); }));
    drop.addEventListener('drop', ev => take(ev.dataTransfer.files[0]));
  }
}

/* ---------- Global events ---------- */
document.addEventListener('click', ev => {
  const el = ev.target.closest('[data-act]'); if (!el) return;
  const fn = A[el.dataset.act]; if (!fn) return;
  if (el.tagName === 'A') return;
  if (el.dataset.act !== 'close-bg') ev.preventDefault();
  fn({ ...el.dataset }, el, ev);
});
document.addEventListener('keydown', ev => {
  const tag = (ev.target.tagName || '').toLowerCase();
  if (ev.key === 'Escape') { closeLayer(); return; }
  if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.matches('article[data-act]')) { ev.preventDefault(); A.open(ev.target.dataset); return; }
  if (tag === 'input' || tag === 'textarea' || tag === 'select') {
    if (ev.key === 'Enter' && ev.target.id === 'up-custom' && ev.target.value.trim()) { state.up.tags.goal.push({ l: ev.target.value.trim(), on: true, custom: true }); ev.target.value = ''; refreshUploadPreview(); }
    if (ev.key === 'Enter' && ev.target.id === 'q') { const first = $('#sr .sr'); if (first) first.click(); }
    return;
  }
  if (ev.key === '/' && state.mode === 'member' && state.user.onboarded) { ev.preventDefault(); openSearch(); }
  if (state.route.name === 'u/home' && !$('#layer').innerHTML) { if (ev.key === 'ArrowRight' && $('#stack .scard')) swipeTop('keep'); if (ev.key === 'ArrowLeft' && $('#stack .scard')) swipeTop('skip'); }
});
let upTimer;
document.addEventListener('input', ev => {
  const t = ev.target;
  if (t.id === 'q') { $('#sr').innerHTML = searchResults(t.value); return; }
  if (t.dataset.up) { state.up[t.dataset.up] = t.value; clearTimeout(upTimer); upTimer = setTimeout(refreshUploadPreview, 220); return; }
  if (t.dataset.pf) { state.biz.profile = { ...(state.biz.profile || {}), [t.dataset.pf]: t.value }; $('#prof-preview').innerHTML = profPreview(biz('ringside')); return; }
  if (t.id === 'lib-q') { state.biz.libQuery = t.value; clearTimeout(upTimer); upTimer = setTimeout(rerenderKeep, 150); }
});
document.addEventListener('change', ev => { const t = ev.target; if (t.dataset.actChange === 'ex-sort') { state.explore.sort = t.value; rerenderKeep(); } });
document.addEventListener('submit', ev => {
  ev.preventDefault(); const f = ev.target;
  if (f.id === 'cta-form') confirmCta(f.dataset.id);
  if (f.id === 'bo-acct') { state.biz.account = { name: $('#bo-name').value || 'Ringside Kitsilano', email: $('#bo-email').value }; state.biz.step = 1; render(); window.scrollTo(0, 0); }
  if (f.id === 'prof-form') { save(); toast('Profile saved. Members see the update right away.', { label: 'View', act: 'go-member-biz' }); }
});

/* ---------- Boot ---------- */
load();
render();
