/* Memo prototype — member app */

const ARTICLE_BODIES = {
  r7: ['You’ll spend the first ten minutes skipping rope and shadowboxing at whatever pace you like. Nobody is timing you.', 'Then a coach teaches one thing, usually stance or the jab, and you practise it on pads with a partner who is also new. You will not spar. Sparring is opt-in, months later, and only if you want it.', 'Wear gym clothes and running shoes. Bring water. Gloves and wraps are on the wall to borrow.'],
  f3: ['Mat Pilates is cheaper, portable and harder than it looks, because nothing assists you. The reformer’s springs can both add resistance and support you, which makes it friendlier to beginners and people coming back from injury.', 'If budget is the main factor, start on the mat with a good video. If you want feedback and variety, three reformer classes will tell you quickly whether it’s for you.'],
  n3: ['October on the North Shore means shorter days, wet roots and fog that can roll in fast. Pack a headlamp even for a morning hike; it weighs nothing and turns a late finish into a non-event.', 'Add a warm layer and a waterproof shell, two litres of water, a snack you actually want to eat, and a fully charged phone with an offline map. Tell someone your route.', 'Above about 1,000 m, the first snow can arrive in late October. If a trail report mentions ice, choose a lower loop.'],
  c4: ['Long static stretches before exercise don’t prevent injury, and can briefly reduce power. Save them for after, or for a separate relaxation routine.', 'Before you train, use mobility drills instead: controlled movements through a full range, like leg swings, hip circles and thoracic rotations. They warm the joints you’re about to use.'],
  w2: ['Alternating heat and cold reliably makes people feel better, and there’s reasonable evidence it reduces perceived soreness after hard exercise.', 'Claims about boosting immunity or metabolism are much weaker. Enjoy it for what it reliably does: a calm hour, better mood and, for many people, better sleep that night.'],
  g2: ['Eat something small and simple 30 to 60 minutes before: a banana with a spoon of peanut butter, a slice of toast with honey, or a yogurt.', 'Avoid anything high in fat or fibre right before training. Have a proper breakfast afterwards, with some protein, within a couple of hours.'],
};

/* ---------------- Member shell ---------------- */
function memberShell(inner) {
  const r = state.route.name;
  const cur = n => (r === n || r.startsWith(n + '/')) ? 'aria-current="page"' : '';
  const isHome = r === 'u/home';
  return `<header class="m-top"><div class="wrap in">
      <button data-act="go" data-to="u/home" aria-label="Home">${logo(28)}</button>
      <nav class="m-nav" aria-label="Main">
        <button data-act="go" data-to="u/home" ${isHome ? 'aria-current="page"' : ''}>For you</button>
        <button data-act="go" data-to="u/explore" ${cur('u/explore')}>Explore</button>
        <button data-act="go" data-to="u/saved" ${cur('u/saved')}>Saved${state.saved.length ? ` <span class="faint num">${state.saved.length}</span>` : ''}</button>
      </nav>
      <button class="m-search" data-act="search">${ic('search')}<span>Search classes, studios, coaches</span><kbd>/</kbd></button>
      <button class="avatar" data-act="go" data-to="u/me" aria-label="Your profile">${state.user.name[0]}</button>
    </div></header>
    <div class="m-main">${inner}</div>
    <nav class="tabbar" aria-label="Main">
      <button data-act="go" data-to="u/home" ${isHome ? 'aria-current="page"' : ''}>${ic('home')}For you</button>
      <button data-act="go" data-to="u/explore" ${cur('u/explore')}>${ic('compass')}Explore</button>
      <button data-act="search">${ic('search')}Search</button>
      <button data-act="go" data-to="u/saved" ${cur('u/saved')}>${ic('bookmark')}Saved</button>
      <button data-act="go" data-to="u/me" ${cur('u/me')}>${ic('user')}You</button>
    </nav>`;
}

/* ---------------- Onboarding ---------------- */
function viewOnboard() {
  const ob = state.ob, d = ob.draft;
  const prog = `<div class="ob-progress" aria-hidden="true">${[0, 1, 2].map(i => `<span class="${i <= ob.step ? 'on' : ''}"></span>`).join('')}</div>`;
  let body = '', foot = '';
  if (ob.step === 0) {
    body = `<span class="eyebrow">Step 1 of 3 · Personalize</span>
      <h1 style="margin-top:12px">What would you like to try?</h1>
      <p class="sub">Pick at least two. You can change these any time, and your feed updates instantly.</p>
      <div class="interest-grid">${CATS.map(c => `<button class="itile ${d.interests.includes(c.id) ? 'on' : ''}" data-act="ob-interest" data-id="${c.id}" aria-pressed="${d.interests.includes(c.id)}">${poster('cat-' + c.id, c.id)}<span class="tick">${ic('check')}</span><span class="lbl"><b>${c.name}</b><small>${c.blurb}</small></span></button>`).join('')}</div>
      <div class="personas"><span class="faint">In a hurry? Start as</span>${PERSONAS.map(p => `<button class="chip" data-act="persona" data-id="${p.id}">${p.label}</button>`).join('')}</div>`;
    foot = `<span class="muted num">${d.interests.length} selected</span><button class="btn btn-primary btn-lg" data-act="ob-next" ${d.interests.length < 2 ? 'disabled' : ''}>Continue ${ic('right')}</button>`;
  } else if (ob.step === 1) {
    const opt = (key, val, title, sub) => `<button class="opt ${d[key] === val ? 'on' : ''}" data-act="ob-opt" data-key="${key}" data-val="${val}" aria-pressed="${d[key] === val}"><b>${title}</b><span>${sub}</span></button>`;
    body = `<span class="eyebrow">Step 2 of 3 · How you like to move</span>
      <h1 style="margin-top:12px">A few quick taps and we’re done.</h1>
      <div class="pref-grid">
        <div class="pref"><h3>Where are you at right now?</h3><div class="opt-row">${opt('level', 'new', 'Brand new', 'Show me the friendliest starts')}${opt('level', 'some', 'Getting back into it', 'A bit of everything')}${opt('level', 'regular', 'Pretty regular', 'Bring on a challenge')}</div></div>
        <div class="pref"><h3>Where do you like to move?</h3><div class="opt-row">${opt('setting', 'outdoors', 'Outside', 'Seawall, trails, parks')}${opt('setting', 'indoors', 'In a studio', 'Classes and gyms')}${opt('setting', 'home', 'At home', 'Videos and programs')}${opt('setting', 'mix', 'A mix', 'Surprise me')}</div></div>
        <div class="pref"><h3>Solo or with people?</h3><div class="opt-row">${opt('company', 'social', 'With people', 'Clubs, groups, meetups')}${opt('company', 'solo', 'On my own', 'My pace, my time')}${opt('company', 'either', 'Either', 'Depends on the day')}</div></div>
        <div class="pref"><h3>How much time do you usually have?</h3><div class="opt-row">${opt('time', 'short', '15–20 min', 'Quick wins')}${opt('time', 'mid', '30–60 min', 'A proper session')}${opt('time', 'long', 'An hour or more', 'Make a morning of it')}</div></div>
      </div>`;
    foot = `<button class="btn btn-ghost" data-act="ob-back">${ic('left')} Back</button><button class="btn btn-primary btn-lg" data-act="ob-next">Build my feed ${ic('right')}</button>`;
  } else {
    const chips = [...d.interests.map(i => CAT[i].name), { new: 'Brand new', some: 'Easing back in', regular: 'Regular' }[d.level], { outdoors: 'Outdoors', indoors: 'Studios', home: 'At home', mix: 'A mix' }[d.setting], { social: 'With people', solo: 'Solo', either: 'Solo or social' }[d.company]];
    const n = chips.length;
    body = `<div class="tuning">
      <div class="orbit">${chips.map((c, i) => { const a = (i / n) * Math.PI * 2 - Math.PI / 2; const x = 130 + Math.cos(a) * 112, y = 130 + Math.sin(a) * 112; return `<span class="chip on" style="left:${x}px;top:${y}px;transform:translate(-50%,-50%);--fx:${-Math.cos(a) * 80}px;--fy:${-Math.sin(a) * 80}px;animation-delay:${i * .12}s">${esc(c)}</span>`; }).join('')}
        <div class="core">${logoMark(70)}</div></div>
      <span class="eyebrow">Step 3 of 3</span>
      <h1 style="margin-top:10px">Building your feed…</h1>
      <p class="sub" style="margin-inline:auto">Matching ${liveItems().length} classes, clubs, videos and places across Vancouver to what you picked.</p>
      <div class="bar"><i></i></div></div>`;
  }
  return `<main class="ob"><div class="wrap ob-top">${logo(26)}${prog}<button class="link faint" data-act="ob-skip" style="font-size:13px">Skip</button></div>
    <div class="wrap ob-body fade-in" key="${ob.step}">${body}</div>
    ${foot ? `<div class="ob-foot"><div class="wrap in">${foot}</div></div>` : ''}</main>`;
}
function finishOnboarding() {
  const d = state.ob.draft;
  Object.assign(state.user, { interests: [...d.interests], level: d.level, setting: d.setting, company: d.company, time: d.time, onboarded: true });
  state.swiped = []; state.boosts = {};
  go('u/home', {}, { replace: true });
  toast(`Your feed is ready, ${state.user.name}.`);
}

/* ---------------- Home feed ---------------- */
function viewHome() {
  const u = state.user;
  const list = ranked();
  const used = new Set();
  const take = (arr, n) => { const out = []; for (const it of arr) { if (out.length >= n) break; if (!used.has(it.id) && !state.hidden.includes(it.id)) { out.push(it); used.add(it.id); } } return out; };
  const hero = take(list.filter(i => i.type !== 'article' && i.type !== 'product'), 1)[0];
  const side = take(list, 3);
  const picked = take(list, 8);
  const nearPool = ranked(liveItems().filter(i => i.setting !== 'online' && biz(i.biz).dist <= 4));
  const near = nearPool.filter(i => !state.hidden.includes(i.id)).slice(0, 5);
  const topCats = [...u.interests].sort((a, b) => (state.boosts[b] || 0) - (state.boosts[a] || 0)).slice(0, 2);
  const because = topCats.map(c => ({ c, items: ranked(liveItems().filter(i => i.cats.includes(c) && i.id !== (hero && hero.id) && !state.hidden.includes(i.id))).slice(0, 6) })).filter(x => x.items.length >= 3);
  const trending = [...liveItems()].sort((a, b) => (b.trend * 1e5 + b.views) - (a.trend * 1e5 + a.views)).slice(0, 8);
  const outside = [...liveItems()].filter(i => !i.cats.some(c => u.interests.includes(c)) && !state.hidden.includes(i.id)).sort((a, b) => b.views - a.views).slice(0, 3);
  const hr = new Date().getHours();
  const greet = hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening';
  const tuned = u.interests.map(i => CAT[i].name);

  return memberShell(`<div class="wrap">
    <section class="greet fade-in">
      <div><h1>${greet}, ${esc(u.name)}.</h1>
      <div class="tuned">${ic('spark', '')}<span>Tuned to</span>${tuned.map(t => `<span class="pill">${t}</span>`).join('')}<button class="link" data-act="go" data-to="u/me" style="color:var(--accent-ink);font-weight:650;font-size:13px">Edit</button></div></div>
    </section>

    ${hero ? `<section class="hero">
      <article class="hero-main" data-act="open" data-id="${hero.id}" tabindex="0" role="link">
        ${hero.img ? `<img src="${hero.img}" alt="">` : poster(hero.id + 'hero', hero.cats[0], { tall: false })}
        <div class="body">
          <span class="kicker">${ic('spark')}Top pick for you · ${reasons(hero).slice(0, 3).join(' · ') || TYPES[hero.type].label}</span>
          <h2>${esc(hero.title)}</h2>
          <p>${esc(hero.desc)}</p>
          <div class="actions"><button class="btn btn-primary" data-act="cta" data-id="${hero.id}">${TYPES[hero.type].cta}</button><button class="btn btn-ghost" data-act="open-biz" data-id="${hero.biz}">${esc(biz(hero.biz).name)}</button></div>
        </div>
      </article>
      <div class="hero-side">
        ${planCard()}
        <div class="mini-list">${side.map(it => `<article class="mini card" data-act="open" data-id="${it.id}" tabindex="0" role="link">${media(it, { bare: true })}<div><div class="reason">${TYPES[it.type].label}</div><h4>${esc(it.title)}</h4><div class="meta">${esc(biz(it.biz).name)} · ${esc(it.when)}</div></div></article>`).join('')}</div>
      </div>
    </section>` : ''}

    ${row('Picked for you', 'Chosen from what you told us and what you’ve saved.', picked, { reason: true, id: 'picked' })}

    <section class="section">
      <div class="sec-head"><div><h2>Near you in Kitsilano</h2><p>Within a short walk, bike or bus of home.</p></div><button class="btn btn-ghost btn-sm" data-act="go" data-to="u/explore">See all nearby</button></div>
      <div class="near-grid">${mapCard(near)}<div class="near-list">${near.map(it => `<article class="near-row card" data-act="open" data-id="${it.id}" tabindex="0" role="link">${media(it, { bare: true })}<div><h4>${esc(it.title)}</h4><div class="meta">${esc(biz(it.biz).name)} · ${esc(it.when)}</div></div><span class="km num">${biz(it.biz).dist} km</span></article>`).join('')}</div></div>
    </section>

    <section class="section" id="picks-wrap">${picksSection()}</section>

    ${because.map(b => row(`Because you like ${CAT[b.c].name.toLowerCase()}`, CAT[b.c].blurb + '.', b.items, { cols: 3 })).join('')}

    <section class="section">
      <div class="sec-head"><div><h2>Trending in Vancouver</h2><p>What people across the city saved most this week.</p></div></div>
      <div class="trend-list">${trending.map((it, i) => `<article class="trend" data-act="open" data-id="${it.id}" tabindex="0" role="link"><span class="rank num">${i + 1}</span>${media(it, { bare: true })}<div><h4>${esc(it.title)}</h4><div class="meta">${esc(biz(it.biz).name)} · ${TYPES[it.type].label}</div></div><span class="up num">↑ ${fmt(Math.round(it.saves * .18))}</span></article>`).join('')}</div>
    </section>

    ${outside.length ? `<section class="section"><div class="sec-head"><div><h2>Outside your usual</h2><p>Popular with people who like what you like. Worth a look.</p></div></div><div class="serendip">${outside.map(it => card(it)).join('')}</div></section>` : ''}

    <section class="section" style="padding-bottom:60px">
      <div class="sec-head"><div><h2>Explore by activity</h2></div><button class="btn btn-ghost btn-sm" data-act="go" data-to="u/explore">All categories</button></div>
      <div class="cat-strip">${CATS.slice(0, 6).map(c => catTile(c)).join('')}</div>
    </section>
  </div>`);
}
function catTile(c) { return `<button class="itile" data-act="explore-cat" data-id="${c.id}">${poster('cat-' + c.id, c.id)}<span class="lbl"><b>${c.name}</b><small class="num">${liveItems().filter(i => i.cats.includes(c.id)).length} things to try</small></span></button>`; }

function row(title, sub, items, opts = {}) {
  if (!items.length) return '';
  const id = opts.id || 'r' + hashStr(title).toString(36);
  return `<section class="section"><div class="sec-head"><div><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ''}</div>
    <div class="arrows"><button class="icon-btn" data-act="scroll" data-target="${id}" data-dir="-1" aria-label="Scroll left">${ic('chevL')}</button><button class="icon-btn" data-act="scroll" data-target="${id}" data-dir="1" aria-label="Scroll right">${ic('chevR')}</button></div></div>
    <div class="row-scroll cols-${opts.cols || 4}" id="${id}">${items.map(it => card(it, { reason: opts.reason })).join('')}</div></section>`;
}

function planCard() {
  const p = state.plans.slice(0, 2);
  return `<div class="plan-card">${bubbleCluster()}<span class="eyebrow">Your week</span>
    ${p.length ? `<h3 style="margin-top:6px">${p.length === 1 ? 'One plan coming up' : `${state.plans.length} plans coming up`}</h3>${p.map(x => `<div class="plan-item"><div class="when"><small>${x.mon}</small><b>${x.day}</b></div><div><div class="t">${esc(x.title)}</div><div class="s">${esc(x.time)} · ${esc(biz(x.biz).name)}</div></div></div>`).join('')}`
      : `<h3 style="margin-top:6px">Nothing booked yet</h3><p class="empty">Book a class or join an event and it shows up here, with directions and a reminder.</p>`}</div>`;
}

const MAP_POS = { ringside: [47, 60], stillwater: [55, 44], tideline: [40, 36], pitch: [31, 52], coastline: [70, 58], goodfuel: [62, 74], spoke: [80, 40], saltwater: [92, 62], formflow: [88, 22] };
function mapCard(near) {
  const ids = [...new Set(near.map(i => i.biz))].filter(id => MAP_POS[id]);
  let streets = '';
  for (let y = 150; y < 420; y += 34) streets += `<path d="M0 ${y} H600" stroke="var(--surface)" stroke-width="${y === 252 ? 7 : 3}"/>`;
  for (let x = 20; x < 600; x += 46) streets += `<path d="M${x} 120 V400" stroke="var(--surface)" stroke-width="3"/>`;
  return `<div class="mapcard" aria-label="Map of nearby places">
    <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="600" height="400" fill="var(--bg-2)"/>${streets}
      <path d="M0 0 H600 V95 Q540 128 480 112 Q420 96 370 128 Q320 160 260 132 Q190 100 130 126 Q70 150 0 130 Z" fill="var(--accent-soft)"/>
      <path d="M150 140 Q200 128 236 150 Q250 176 214 186 Q170 192 150 172 Z" fill="color-mix(in srgb, var(--good) 22%, transparent)"/>
      <text x="40" y="58" fill="var(--accent-ink)" font-size="15" font-weight="700" font-style="italic" font-family="Figtree,sans-serif" opacity=".8">English Bay</text>
      <text x="430" y="70" fill="var(--accent-ink)" font-size="13" font-weight="700" font-style="italic" font-family="Figtree,sans-serif" opacity=".7">False Creek</text>
      <text x="340" y="246" fill="var(--ink-3)" font-size="11" font-weight="700" letter-spacing="1" font-family="Figtree,sans-serif">W 4TH AVE</text>
    </svg>
    <span class="you" style="left:44%;top:68%" title="You"></span>
    ${ids.map(id => { const b = biz(id); const [x, y] = MAP_POS[id]; return `<button class="pin" style="left:${x}%;top:${y}%" data-act="open-biz" data-id="${id}"><span class="mono" style="background:${b.color}">${b.mono}</span><span class="lab">${esc(b.name.split(' ')[0])}</span></button>`; }).join('')}
    <span class="legend">${ic('pin', '')} Kitsilano · ${ids.length} places</span>
  </div>`;
}

/* ---------------- Quick picks (swipe) ---------------- */
function picksPool() {
  const u = state.user;
  return ranked(liveItems().filter(i => !state.swiped.includes(i.id) && !state.saved.includes(i.id) && !state.hidden.includes(i.id)))
    .filter((it, idx) => idx % 3 === 1 || !it.cats.some(c => u.interests.includes(c))).slice(0, 5);
}
function picksSection() {
  const pool = picksPool();
  const kept = Object.entries(state.boosts).filter(([, v]) => v > 0).map(([k]) => CAT[k].name);
  const done = state.swiped.length;
  return `<div class="picks">
    <div>
      <span class="eyebrow">Quick picks</span>
      <h2 style="margin-top:8px">Keep or skip. Your feed learns as you go.</h2>
      <p>Drag a card, use the buttons, or your arrow keys. Kept picks are saved and nudge similar things up your feed.</p>
      <div class="tally">${done ? `<span class="chip num">${done} sorted</span>` : ''}${kept.slice(0, 4).map(k => `<span class="chip">+ ${k}</span>`).join('')}</div>
    </div>
    <div class="stack" id="stack">
      ${pool.length ? pool.slice(0, 3).reverse().map((it, i, arr) => { const depth = arr.length - 1 - i; return `<div class="scard" data-id="${it.id}" style="transform:translateY(${depth * 10}px) scale(${1 - depth * .04});z-index:${10 - depth};${depth ? 'pointer-events:none;' : ''}">${it.img ? `<img src="${it.img}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">` : poster(it.id + 'sw', it.cats[0], { tall: true })}<span class="stamp keep">KEEP</span><span class="stamp skip">SKIP</span><div class="info"><span class="pill" style="background:rgba(255,255,255,.18);color:#fff">${TYPES[it.type].label} · ${esc(biz(it.biz).name)}</span><h3 style="margin-top:8px">${esc(it.title)}</h3><div class="m">${esc(it.when)}</div></div></div>`; }).join('')
      : `<div class="done"><div><h3 style="color:#fff;font-size:22px">All sorted</h3><p style="margin:8px auto 14px">Your feed has been re-ranked.</p><button class="btn btn-primary btn-sm" data-act="picks-reset">Show me more</button></div></div>`}
      <div class="ctrl"><button data-act="swipe" data-dir="skip" aria-label="Skip">${ic('x')}</button><button data-act="open-top" aria-label="Details">${ic('eye')}</button><button class="keep" data-act="swipe" data-dir="keep" aria-label="Keep">${ic('check')}</button></div>
    </div>
  </div>`;
}
function swipeTop(dir) {
  const top = $$('#stack .scard').pop(); if (!top) return;
  const id = top.dataset.id; const it = item(id);
  top.style.transform = `translateX(${dir === 'keep' ? 420 : -420}px) rotate(${dir === 'keep' ? 18 : -18}deg)`; top.style.opacity = '0';
  state.swiped.push(id);
  if (dir === 'keep') { it.cats.forEach(c => state.boosts[c] = (state.boosts[c] || 0) + 1); if (!state.saved.includes(id)) state.saved.push(id); }
  else { state.boosts[it.cats[0]] = (state.boosts[it.cats[0]] || 0) - 0.3; }
  save();
  setTimeout(() => { const w = $('#picks-wrap'); if (w) { w.innerHTML = picksSection(); bindSwipe(); } }, 260);
}
function bindSwipe() {
  const top = $$('#stack .scard').pop(); if (!top) return;
  let sx = 0, dx = 0, drag = false;
  top.addEventListener('pointerdown', e => { drag = true; sx = e.clientX; dx = 0; top.setPointerCapture(e.pointerId); top.style.transition = 'none'; });
  top.addEventListener('pointermove', e => { if (!drag) return; dx = e.clientX - sx; top.style.transform = `translateX(${dx}px) rotate(${dx / 18}deg)`; top.querySelector('.keep').style.opacity = Math.max(0, dx / 100); top.querySelector('.skip').style.opacity = Math.max(0, -dx / 100); });
  const end = () => { if (!drag) return; drag = false; top.style.transition = ''; if (Math.abs(dx) > 90) swipeTop(dx > 0 ? 'keep' : 'skip'); else if (Math.abs(dx) < 5) openItem(top.dataset.id); else { top.style.transform = ''; $$('.stamp', top).forEach(s => s.style.opacity = 0); } };
  top.addEventListener('pointerup', end); top.addEventListener('pointercancel', end);
}

/* ---------------- Item detail ---------------- */
function openItem(id) { go('u/item', { id }); }
function viewItem() {
  const it = item(state.route.params.id); if (!it) return memberShell(`<div class="wrap">${emptyState('This item is no longer available', 'The business may have unpublished it.', '<button class="btn btn-primary" data-act="go" data-to="u/home">Back to your feed</button>')}</div>`);
  const b = biz(it.biz); const t = TYPES[it.type]; const d = distOf(it);
  const rs = reasons(it);
  const saved = state.saved.includes(it.id); const following = state.following.includes(b.id);
  const related = ranked(liveItems().filter(i => i.id !== it.id && (i.biz === it.biz || i.cats[0] === it.cats[0]))).slice(0, 4);
  const facts = [
    ['When', it.when], [it.setting === 'online' ? 'Where' : 'Where', it.setting === 'online' ? 'Online, anywhere' : `${b.address}, ${b.hood}`],
    ['Level', { beginner: 'Beginner-friendly', all: 'All levels', intermediate: 'Some experience' }[it.level]], ['Price', it.price],
  ];
  if (it.dur) facts.splice(2, 0, ['Length', it.type === 'article' ? `${it.dur} min read` : it.dur >= 120 ? `${(it.dur / 60).toFixed(1).replace('.0', '')} hours` : `${it.dur} min`]);
  if (it.host) facts.push(['With', it.host]);
  const bodyParas = ARTICLE_BODIES[it.id];
  return memberShell(`<div class="wrap detail fade-in">
    <button class="back" data-act="back">${ic('left')} Back</button>
    <div class="det-grid">
      <div>
        <div class="media det-media" id="det-media">${it.img ? `<img src="${it.img}" alt="">` : poster(it.id + 'd', it.cats[0])}<span class="badge">${t.label}</span>
          ${it.type === 'video' ? `<button class="play big" data-act="play" data-id="${it.id}" aria-label="Play video">${ic('play')}</button>` : ''}</div>
        <div class="chips" style="margin-top:16px">${it.cats.map(c => `<button class="chip" data-act="explore-cat" data-id="${c}">${CAT[c].name}</button>`).join('')}<span class="chip" style="pointer-events:none">${b.hood}</span>${it.level === 'beginner' ? '<span class="chip" style="pointer-events:none">Beginner-friendly</span>' : ''}${it.social === 'group' ? '<span class="chip" style="pointer-events:none">Social</span>' : ''}${(it.tags || []).map(x => `<span class="chip" style="pointer-events:none">${esc(x)}</span>`).join('')}</div>
      </div>
      <div class="det-info">
        <span class="eyebrow">${t.label}${d !== null ? ` · ${d} km from you` : ''}</span>
        <h1>${esc(it.title)}</h1>
        <button class="det-biz" data-act="open-biz" data-id="${b.id}"><span class="mono md" style="background:${b.color}">${b.mono}</span><span><span class="n">${esc(b.name)}</span><br><span class="k">${esc(b.kind)} · <span class="stars">★</span> ${b.rating} (${b.reviews})</span></span><span class="arrow">${ic('chevR')}</span></button>
        <p class="det-desc">${esc(it.desc)}</p>
        ${b.offer && it.type !== 'article' ? `<div class="offer">${ic('gift')}${esc(b.offer)}</div>` : ''}
        <div class="facts">${facts.map(([k, v]) => `<div><small>${k}</small><b>${esc(v)}</b></div>`).join('')}</div>
        <div class="cta-row">
          <button class="btn btn-primary btn-lg" data-act="cta" data-id="${it.id}">${t.cta}</button>
          <button class="icon-btn ${saved ? 'on' : ''}" data-act="save" data-id="${it.id}" aria-pressed="${saved}" aria-label="Save">${ic('bookmark')}</button>
          <button class="icon-btn" data-act="share" data-id="${it.id}" aria-label="Share">${ic('share')}</button>
        </div>
        ${bodyParas ? `<div class="article-body" id="article-body" hidden>${bodyParas.map(p => `<p>${esc(p)}</p>`).join('')}<p class="faint" style="font-size:13px">Written by ${esc(it.host)} for ${esc(b.name)}.</p></div>` : ''}
        <div class="why">
          <h4>${ic('spark')}Why you’re seeing this</h4>
          <ul>${(rs.length ? rs : ['Popular with people in Vancouver this week']).map(r => `<li>${esc(r)}</li>`).join('')}</ul>
          <div class="why-foot"><button data-act="less" data-id="${it.id}">Show me less like this</button><button data-act="follow" data-id="${b.id}">${following ? 'Following' : 'Follow'} ${esc(b.name)}</button></div>
        </div>
      </div>
    </div>
    ${related.length ? `<section class="section"><div class="sec-head"><div><h2>More like this</h2></div></div><div class="grid-4">${related.map(r => card(r)).join('')}</div></section>` : ''}
  </div>`);
}

function playVideo(id) {
  const m = $('#det-media'); if (!m) return;
  const btn = m.querySelector('.play'); if (btn) btn.remove();
  const it = item(id);
  const p = document.createElement('div'); p.className = 'player';
  p.innerHTML = `<span class="num" id="pt">0:00</span><span class="track"><i id="pb"></i></span><span class="num">${it.dur}:00</span>`;
  m.appendChild(p);
  let s = 0; const total = 8;
  const iv = setInterval(() => {
    s += 0.1; const f = Math.min(1, s / total);
    const bar = $('#pb'); if (!bar) return clearInterval(iv);
    bar.style.width = (f * 100) + '%';
    const secs = Math.round(f * it.dur * 60); $('#pt').textContent = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;
    if (f >= 1) { clearInterval(iv); if (!state.watched.includes(id)) state.watched.push(id); it.cats.forEach(c => state.boosts[c] = (state.boosts[c] || 0) + .5); save(); toast('Finished. We’ll show you more like this.', { label: `Visit ${biz(it.biz).name.split(' ')[0]}`, act: 'open-biz', data: { id: it.biz } }); }
  }, 100);
}

/* ---------------- CTA sheets ---------------- */
function slotsFor(it) {
  const b = biz(it.biz);
  const rows = (b.schedule || []).filter(s => s.item === it.id);
  const base = new Date(2026, 9, 6);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const out = [];
  if (rows.length) {
    for (let i = 1; i <= 14 && out.length < 6; i++) {
      const dt = new Date(base); dt.setDate(base.getDate() + i);
      rows.forEach(r => { if ((r.day === days[dt.getDay()] || r.day === 'Daily' || (r.day.includes('–') && dt.getDay() > 0)) && out.length < 6) out.push({ day: dt.getDate(), mon: 'Oct', dow: days[dt.getDay()], time: r.time, spots: r.spots - (i % 3) }); });
    }
  }
  if (!out.length) {
    const m = /([A-Z][a-z]{2}), ([A-Z][a-z]{2}) (\d{1,2})/.exec(it.when || '');
    const tm = /(\d{1,2}:\d{2} [ap]m)/.exec(it.when || '');
    if (m) out.push({ day: +m[3], mon: m[2], dow: m[1], time: tm ? tm[1] : '', spots: 12 });
    else [8, 9, 10].forEach((dd, i) => out.push({ day: dd, mon: 'Oct', dow: days[(4 + i) % 7], time: tm ? tm[1] : ['10:00 am', '2:00 pm', '6:00 pm'][i], spots: 8 }));
  }
  return out;
}
function ctaSheet(id, chosen = 0) {
  const it = item(id); const b = biz(it.biz);
  const slots = slotsFor(it);
  const verbs = { class: ['Book', 'Choose a time'], event: ['Join', 'Confirm the date'], program: ['Start', 'Pick a start date'], challenge: ['Join', 'Starts today'], product: ['Reserve', 'Choose pickup day'], place: ['Plan a visit', 'Choose a time'] };
  const [verb, pick] = verbs[it.type] || ['Book', 'Choose a time'];
  const free = /free/i.test(it.price) || /free/i.test(b.offer || '');
  const acct = state.user.account;
  openLayer(`<div class="sheet-wrap" data-act="close-bg"><div class="sheet" role="dialog" aria-modal="true" aria-label="${verb} ${esc(it.title)}">
    <div class="s-head">${poster(it.id + 's', it.cats[0])}<button class="icon-btn close" data-act="close" aria-label="Close">${ic('x')}</button></div>
    <form class="s-body" id="cta-form" data-id="${id}">
      <div><span class="eyebrow">${esc(b.name)}</span><h3 style="margin-top:4px">${esc(it.title)}</h3></div>
      <div class="field-l"><span class="lbl-s">${pick}</span><div class="slots">${slots.map((s, i) => `<button type="button" class="slot ${i === chosen ? 'on' : ''}" data-act="slot" data-i="${i}" data-id="${id}"><b>${s.dow} ${s.mon} ${s.day}</b><small>${s.time || 'Any time'}${it.type === 'class' ? ` · ${s.spots} spots` : ''}</small></button>`).join('')}</div></div>
      ${acct ? `<p class="muted" style="font-size:14px">Booking as <b>${esc(state.user.name)} Lee</b> · ${esc(state.user.email)}</p>` : `<div class="field-l"><span class="lbl-s">Create your free Memo account to ${verb.toLowerCase()}</span>
        <div class="two"><input class="inp" id="acc-name" value="${esc(state.user.name)} Lee" aria-label="Name"><input class="inp" id="acc-email" type="email" value="${esc(state.user.email)}" aria-label="Email"></div>
        <small class="faint">${esc(b.name)} gets your name and email for this booking only. Change this in Privacy.</small></div>`}
      ${free ? `<div class="offer" style="margin:0">${ic('gift')}${esc(b.offer)}</div>` : ''}
      <button class="btn btn-primary btn-lg" type="submit">${verb}${it.price && !/free/i.test(it.price) ? ` · ${esc(it.price.split(' · ')[0])}` : ''}</button>
      <small class="faint" style="text-align:center">Prototype: no payment is taken.</small>
    </form></div></div>`);
  state._slot = chosen;
}
function confirmCta(id) {
  const it = item(id); const b = biz(it.biz); const s = slotsFor(it)[state._slot || 0];
  state.user.account = true;
  if (!state.plans.find(p => p.id === id && p.day === s.day)) state.plans.unshift({ id, title: it.title, biz: it.biz, day: s.day, mon: s.mon, time: `${s.dow} ${s.time}`.trim() });
  if (!state.following.includes(b.id)) state.following.push(b.id);
  save();
  openLayer(`<div class="sheet-wrap" data-act="close-bg"><div class="sheet" role="dialog" aria-modal="true"><div class="success">
    <div class="ok">${ic('check')}</div>
    <h3>You’re in.</h3>
    <p class="muted">${esc(it.title)} · ${s.dow} ${s.mon} ${s.day}${s.time ? ` at ${s.time}` : ''}<br>${it.setting === 'online' ? 'We’ll send the link to your email.' : `${esc(b.address)}, ${esc(b.hood)}`}</p>
    <p class="faint" style="font-size:13px">${esc(b.name)} can now see your booking. You’re following them too, so their new classes appear in your feed.</p>
    <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:8px"><button class="btn btn-ghost" data-act="open-biz" data-id="${b.id}">Visit ${esc(b.name)}</button><button class="btn btn-primary" data-act="go" data-to="u/saved" data-tab="plans">See your plans</button></div>
  </div></div></div>`);
}

/* ---------------- Business profile (member view) ---------------- */
function viewBiz() {
  const b = biz(state.route.params.id); const tab = state.route.params.tab || 'classes';
  const items = ranked(liveItems().filter(i => i.biz === b.id));
  const following = state.following.includes(b.id);
  const panels = {
    classes: b.schedule && b.schedule.length ? `<div class="sched">${b.schedule.map(s => `<div class="sched-row"><span class="d">${s.day}</span><span class="t num">${s.time}</span><span class="n">${esc(s.title)}</span><span class="sp ${s.spots <= 3 ? 'low' : ''} num">${s.spots <= 3 ? `${s.spots} spots left` : `${s.spots} spots`}</span><button class="btn btn-primary btn-sm" data-act="cta" data-id="${s.item}">${item(s.item) && item(s.item).type === 'class' ? 'Book' : 'Join'}</button></div>`).join('')}</div><h3 style="font-size:18px;margin:30px 0 16px">Latest from ${esc(b.name)}</h3><div class="grid-3">${items.slice(0, 3).map(i => card(i)).join('')}</div>` : emptyState('No scheduled classes', `${esc(b.name)} sells products and guides rather than classes. Browse their content instead.`),
    content: `<div class="grid-3">${items.map(i => card(i)).join('')}</div>`,
    reviews: `<div style="display:grid;gap:20px"><div style="display:flex;gap:16px;align-items:baseline"><b style="font:800 44px var(--f-display)" class="num">${b.rating}</b><span><span class="stars">★★★★★</span><br><span class="muted">${b.reviews} reviews from Memo members</span></span></div>${b.quotes.map(q => `<blockquote class="quote" style="margin:0">${esc(q.text)}<cite>${esc(q.who)} · Memo member</cite></blockquote>`).join('')}</div>`,
  };
  return memberShell(`<div class="bp fade-in">
    <div class="bp-cover">${poster(b.id + 'cover', b.cats[0], { wide: true })}<div class="wrap" style="position:relative;padding-top:16px"><button class="back on-cover" data-act="back">${ic('left')} Back</button></div></div>
    <div class="wrap">
      <div class="bp-head">
        <span class="mono lg" style="background:${b.color}">${b.mono}</span>
        <div><h1>${esc(b.name)}</h1><div class="k"><span>${esc(b.kind)}</span><span>${esc(b.hood)}</span><span><span class="stars">★</span> ${b.rating} (${b.reviews})</span><span class="num">${fmt(b.followers + (following ? 1 : 0))} followers</span></div></div>
        <div class="bp-act"><button class="btn ${following ? 'btn-dark' : 'btn-ghost'}" data-act="follow" data-id="${b.id}">${following ? ic('check') + ' Following' : ic('plus') + ' Follow'}</button>${b.schedule.length ? `<button class="btn btn-primary" data-act="cta" data-id="${b.schedule[0].item}">${b.schedule.length ? 'Book a class' : ''}</button>` : ''}<button class="icon-btn" data-act="share-biz" data-id="${b.id}" aria-label="Share">${ic('share')}</button></div>
      </div>
      <div class="bp-grid">
        <div>
          <p style="font:700 clamp(19px,2vw,24px)/1.35 var(--f-display);max-width:36ch">${esc(b.tagline)}</p>
          <div class="tabs" role="tablist" style="margin-top:22px">${[['classes', 'Schedule'], ['content', `Content · ${items.length}`], ['reviews', 'Reviews']].map(([k, l]) => `<button role="tab" aria-selected="${tab === k}" data-act="biz-tab" data-tab="${k}" data-id="${b.id}">${l}</button>`).join('')}</div>
          <div class="tab-panel">${panels[tab]}</div>
        </div>
        <aside style="display:grid;gap:16px">
          ${b.offer ? `<div class="side-card" style="background:var(--accent-soft);border-color:transparent"><div class="offer" style="margin:0">${ic('gift')}${esc(b.offer)}</div></div>` : ''}
          <div class="side-card"><h3>About</h3><p class="muted" style="font-size:14.5px">${esc(b.about)}</p><div class="chips">${b.amenities.map(a => `<span class="pill">${esc(a)}</span>`).join('')}</div></div>
          <div class="side-card"><h3>Team</h3><div class="team">${b.team.map(p => `<div class="person"><span class="avatar" style="background:${b.color}">${p.name.split(' ').map(x => x[0]).join('').slice(0, 2)}</span><div><b>${esc(p.name)}</b><span>${esc(p.role)} · ${esc(p.note)}</span></div></div>`).join('')}</div></div>
          <div class="side-card"><h3>Location</h3><p style="font-size:14.5px">${esc(b.address)}<br><span class="muted">${esc(b.hood)}, Vancouver · ${b.dist} km from you</span></p><a class="btn btn-ghost btn-sm" href="https://www.openstreetmap.org/search?query=${encodeURIComponent(b.hood + ' Vancouver')}" target="_blank" rel="noopener">${ic('pin')} Directions</a></div>
        </aside>
      </div>
    </div>
  </div><div style="height:60px"></div>`);
}

/* ---------------- Explore ---------------- */
const COLLECTIONS = [
  { id: 'free', name: 'Free this week', sub: 'Run clubs, videos, drop-ins', test: i => /free/i.test(i.price) },
  { id: 'quick', name: 'Under 20 minutes', sub: 'For busy days', test: i => i.setting === 'online' && i.dur && i.dur <= 20 },
  { id: 'social', name: 'Meet people while you move', sub: 'Clubs, leagues, group classes', test: i => i.social === 'group' && i.level !== 'intermediate' },
  { id: 'rain', name: 'Rainy-day Vancouver', sub: 'Warm, dry and indoors', test: i => i.setting === 'indoor' && i.type !== 'article' },
];
function exploreResults() {
  const e = state.explore; let list = liveItems();
  if (e.cat) list = list.filter(i => i.cats.includes(e.cat));
  if (e.coll) { const c = COLLECTIONS.find(x => x.id === e.coll); list = list.filter(c.test); }
  if (e.types.length) list = list.filter(i => e.types.includes(i.type));
  if (e.setting) list = list.filter(i => i.setting === e.setting);
  if (e.beginner) list = list.filter(i => i.level === 'beginner');
  if (e.sort === 'near') list = list.sort((a, b) => (distOf(a) ?? 99) - (distOf(b) ?? 99));
  else if (e.sort === 'popular') list = list.sort((a, b) => b.views - a.views);
  else list = ranked(list);
  return list;
}
function viewExplore() {
  const e = state.explore; const res = exploreResults();
  const cat = e.cat ? CAT[e.cat] : null; const coll = e.coll ? COLLECTIONS.find(x => x.id === e.coll) : null;
  const typeChip = (t) => `<button class="chip ${e.types.includes(t) ? 'on' : ''}" data-act="ex-type" data-t="${t}">${TYPES[t].label === 'Read' ? 'Articles' : TYPES[t].label + 's'}</button>`;
  const head = (cat || coll) ? `<div class="ex-head"><button class="back" data-act="ex-clear">${ic('left')} All of Explore</button>
      <div style="display:grid;grid-template-columns:1fr auto;gap:20px;align-items:end;margin-top:10px"><div><span class="eyebrow">${cat ? 'Activity' : 'Collection'}</span><h1 style="margin-top:8px">${cat ? cat.name : coll.name}</h1><p class="muted" style="margin-top:6px">${cat ? cat.blurb : coll.sub} · <span class="num">${res.length}</span> results</p></div>
      ${cat ? `<button class="btn ${state.user.interests.includes(cat.id) ? 'btn-dark' : 'btn-ghost'}" data-act="toggle-interest" data-id="${cat.id}">${state.user.interests.includes(cat.id) ? ic('check') + ' In your feed' : ic('plus') + ' Add to my feed'}</button>` : ''}</div></div>`
    : `<div class="ex-head"><span class="eyebrow">Explore</span><h1 style="margin-top:8px">Wander a little.</h1><p class="muted" style="margin-top:6px;font-size:16px">Everything on Memo, sorted by activity. Try something you’ve never considered.</p>
      <div class="ex-cats">${CATS.map(c => catTile(c)).join('')}</div></div>
      <section class="section"><div class="sec-head"><div><h2>Collections</h2><p>Hand-picked shortcuts through the city.</p></div></div>
      <div class="collections">${COLLECTIONS.map(c => { const its = liveItems().filter(c.test); return `<button class="coll" data-act="ex-coll" data-id="${c.id}"><div class="thumbs">${its.slice(0, 3).map(i => media(i, { bare: true })).join('')}</div><div><b>${c.name}</b><br><span class="num">${c.sub} · ${its.length}</span></div></button>`; }).join('')}</div></section>`;
  return memberShell(`<div class="wrap">${head}
    <div class="filters" role="toolbar" aria-label="Filters">${['class', 'event', 'video', 'program', 'article'].map(typeChip).join('')}<span class="sep"></span>
      <button class="chip ${e.setting === 'outdoor' ? 'on' : ''}" data-act="ex-setting" data-v="outdoor">Outdoors</button><button class="chip ${e.setting === 'online' ? 'on' : ''}" data-act="ex-setting" data-v="online">At home</button><button class="chip ${e.beginner ? 'on' : ''}" data-act="ex-beginner">Beginner-friendly</button>
      <span class="sep"></span><select class="chip" data-act-change="ex-sort" aria-label="Sort" style="padding-right:10px"><option value="match" ${e.sort === 'match' ? 'selected' : ''}>Best match for you</option><option value="near" ${e.sort === 'near' ? 'selected' : ''}>Closest</option><option value="popular" ${e.sort === 'popular' ? 'selected' : ''}>Most popular</option></select>
    </div>
    ${(cat || coll) ? '' : `<div class="sec-head" style="margin-top:8px"><div><h2>Everything</h2><p class="num">${res.length} results, best match first</p></div></div>`}
    ${res.length ? `<div class="grid-4" style="padding-bottom:60px">${res.map(i => card(i, { reason: true })).join('')}</div>` : emptyState('Nothing matches those filters', 'Try removing a filter or two.', '<button class="btn btn-primary" data-act="ex-reset-filters">Clear filters</button>')}
  </div>`);
}

/* ---------------- Search ---------------- */
function openSearch(q = '') {
  openLayer(`<div class="overlay" data-act="close-bg"><div class="search-box" role="dialog" aria-modal="true" aria-label="Search">
    <div class="field">${ic('search')}<input id="q" placeholder="Try “beginner boxing”, “sauna” or “Priya”" value="${esc(q)}" autofocus autocomplete="off"><button class="icon-btn" data-act="close" aria-label="Close search" style="width:32px;height:32px">${ic('x')}</button></div>
    <div class="results" id="sr">${searchResults(q)}</div></div></div>`);
}
function hl(text, q) { if (!q) return esc(text); const i = text.toLowerCase().indexOf(q.toLowerCase()); if (i < 0) return esc(text); return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length)); }
function searchResults(q) {
  q = q.trim();
  if (!q) {
    return `<div class="sr-group"><h5>Popular searches</h5><div class="chips">${['beginner boxing', 'free run club', 'sauna', 'hip mobility', 'pilates', 'hike this weekend'].map(s => `<button class="chip" data-act="search-fill" data-q="${s}">${s}</button>`).join('')}</div></div>
      <div class="sr-group"><h5>Activities</h5>${CATS.slice(0, 6).map(c => `<button class="sr" data-act="explore-cat" data-id="${c.id}">${media({ id: 'cat-' + c.id, cats: [c.id], type: 'class' }, { bare: true })}<span><b>${c.name}</b><small>${c.blurb}</small></span></button>`).join('')}</div>`;
  }
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const syn = { hike: 'hiking', run: 'running', box: 'boxing', stretch: 'mobility', sauna: 'recovery', plunge: 'recovery', bike: 'cycling', spin: 'cycling', soccer: 'sports', ultimate: 'sports', food: 'nutrition', eat: 'nutrition', beginner: 'beginner', weekend: 'sat' };
  const hay = it => `${it.title} ${it.desc} ${it.cats.map(c => CAT[c].name).join(' ')} ${biz(it.biz).name} ${it.host} ${it.level} ${it.when} ${it.price} ${biz(it.biz).hood}`.toLowerCase();
  const match = s => words.every(w => s.includes(w) || (syn[w] && s.includes(syn[w])) || s.includes(w.replace(/s$/, '')));
  const items = liveItems().filter(i => match(hay(i))).slice(0, 6);
  const bizs = Object.values(BUSINESSES).map(b => biz(b.id)).filter(b => match(`${b.name} ${b.kind} ${b.hood} ${b.cats.join(' ')}`.toLowerCase())).slice(0, 4);
  const people = Object.values(BUSINESSES).flatMap(b => b.team.map(p => ({ ...p, b }))).filter(p => match(`${p.name} ${p.role} ${p.b.name}`.toLowerCase())).slice(0, 3);
  const cats = CATS.filter(c => match(`${c.name} ${c.id} ${c.blurb}`.toLowerCase()));
  if (!items.length && !bizs.length && !people.length && !cats.length) return `<div class="sr-group"><p class="muted" style="padding:20px 6px">Nothing for “${esc(q)}” yet. Try an activity like “yoga” or a neighbourhood like “Kitsilano”.</p></div>`;
  return (cats.length ? `<div class="sr-group"><h5>Activities</h5>${cats.map(c => `<button class="sr" data-act="explore-cat" data-id="${c.id}">${media({ id: 'cat-' + c.id, cats: [c.id], type: 'class' }, { bare: true })}<span><b>${hl(c.name, q)}</b><small>${c.blurb}</small></span></button>`).join('')}</div>` : '')
    + (bizs.length ? `<div class="sr-group"><h5>Studios & clubs</h5>${bizs.map(b => `<button class="sr" data-act="open-biz" data-id="${b.id}"><span class="mono md" style="background:${b.color};width:44px;height:44px">${b.mono}</span><span><b>${hl(b.name, words[0])}</b><small>${esc(b.kind)} · ${esc(b.hood)}</small></span><small class="num">${b.dist} km</small></button>`).join('')}</div>` : '')
    + (items.length ? `<div class="sr-group"><h5>Classes, events & content</h5>${items.map(i => `<button class="sr" data-act="open" data-id="${i.id}">${media(i, { bare: true })}<span><b>${hl(i.title, words[0])}</b><small>${TYPES[i.type].label} · ${esc(biz(i.biz).name)}</small></span></button>`).join('')}</div>` : '')
    + (people.length ? `<div class="sr-group"><h5>Coaches & instructors</h5>${people.map(p => `<button class="sr" data-act="open-biz" data-id="${p.b.id}"><span class="avatar" style="background:${p.b.color}">${p.name.split(' ').map(x => x[0]).join('').slice(0, 2)}</span><span><b>${hl(p.name, words[0])}</b><small>${esc(p.role)} · ${esc(p.b.name)}</small></span></button>`).join('')}</div>` : '');
}

/* ---------------- Saved ---------------- */
function viewSaved() {
  const tab = state.route.params.tab || 'saved';
  const saved = state.saved.map(item).filter(Boolean);
  const fol = state.following.map(biz).filter(Boolean);
  let panel;
  if (tab === 'saved') panel = saved.length ? `<div class="grid-4">${saved.map(i => card(i)).join('')}</div>` : emptyState('Nothing saved yet', 'Tap the bookmark on anything in your feed to keep it here.', '<button class="btn btn-primary" data-act="go" data-to="u/home">Back to your feed</button>');
  else if (tab === 'plans') panel = state.plans.length ? `<div class="sched">${state.plans.map(p => { const it = item(p.id); const b = biz(p.biz); return `<div class="sched-row" style="grid-template-columns:70px 1fr auto auto"><span class="d">${p.mon} ${p.day}</span><span><span class="n">${esc(p.title)}</span><br><span class="t">${esc(p.time)} · ${esc(b.name)}</span></span><button class="btn btn-ghost btn-sm" data-act="open" data-id="${p.id}">Details</button><button class="btn btn-ghost btn-sm" data-act="cancel-plan" data-id="${p.id}" data-day="${p.day}">Cancel</button></div>`; }).join('')}</div>` : emptyState('No plans yet', 'Book a class or join an event and it will appear here.', '<button class="btn btn-primary" data-act="go" data-to="u/explore">Find something</button>');
  else panel = fol.length ? `<div class="grid-3">${fol.map(b => `<button class="coll" data-act="open-biz" data-id="${b.id}" style="grid-template-columns:auto 1fr;align-items:center"><span class="mono md" style="background:${b.color}">${b.mono}</span><span><b>${esc(b.name)}</b><br><span>${esc(b.kind)} · ${esc(b.hood)}</span></span></button>`).join('')}</div>` : emptyState('Not following anyone yet', 'Follow studios and clubs to see their new classes first.', '');
  return memberShell(`<div class="wrap"><div class="page-head"><h1>Saved</h1></div>
    <div class="tabs" role="tablist">${[['saved', `Saved · ${saved.length}`], ['plans', `Plans · ${state.plans.length}`], ['following', `Following · ${fol.length}`]].map(([k, l]) => `<button role="tab" aria-selected="${tab === k}" data-act="go" data-to="u/saved" data-tab="${k}" data-replace="1">${l}</button>`).join('')}</div>
    <div class="tab-panel" style="padding-bottom:60px">${panel}</div></div>`);
}

/* ---------------- You ---------------- */
function viewMe() {
  const u = state.user; const p = state.privacy;
  const opt = (key, val, title) => `<button class="chip ${u[key] === val ? 'on' : ''}" data-act="me-opt" data-key="${key}" data-val="${val}">${title}</button>`;
  const tg = (k, t, s) => `<div class="set-row"><span><b>${t}</b><span>${s}</span></span><button class="toggle" role="switch" aria-checked="${p[k]}" data-act="privacy" data-k="${k}" aria-label="${t}"></button></div>`;
  return memberShell(`<div class="wrap"><div class="page-head" style="display:flex;gap:18px;align-items:center"><span class="avatar" style="width:64px;height:64px;font-size:22px">${u.name[0]}</span><div><h1>${esc(u.name)} Lee</h1><p class="muted">Kitsilano, Vancouver · Member since today</p></div></div>
    <div class="you-grid" style="padding-bottom:60px">
      <div class="panel"><div class="ph"><h3>Your interests</h3><span class="faint" style="font-size:13px">Changes apply instantly</span></div>
        <div class="chips">${CATS.map(c => `<button class="chip ${u.interests.includes(c.id) ? 'on' : ''}" data-act="toggle-interest" data-id="${c.id}">${u.interests.includes(c.id) ? ic('check') : ''}${c.name}</button>`).join('')}</div>
        <div style="display:grid;gap:14px;margin-top:22px">
          <div><div class="lbl-s" style="margin-bottom:8px">Level</div><div class="chips">${opt('level', 'new', 'Brand new')}${opt('level', 'some', 'Getting back into it')}${opt('level', 'regular', 'Regular')}</div></div>
          <div><div class="lbl-s" style="margin-bottom:8px">Where</div><div class="chips">${opt('setting', 'outdoors', 'Outside')}${opt('setting', 'indoors', 'Studio')}${opt('setting', 'home', 'At home')}${opt('setting', 'mix', 'A mix')}</div></div>
          <div><div class="lbl-s" style="margin-bottom:8px">Company</div><div class="chips">${opt('company', 'social', 'With people')}${opt('company', 'solo', 'Solo')}${opt('company', 'either', 'Either')}</div></div>
        </div>
        <div style="margin-top:22px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-primary" data-act="go" data-to="u/home">See my feed</button><button class="btn btn-ghost" data-act="redo-ob">Start personalization again</button></div>
      </div>
      <div style="display:grid;gap:20px;align-content:start">
        <div class="panel"><div class="ph"><h3>Try another person’s feed</h3></div><p class="muted" style="font-size:14px;margin-bottom:12px">See how differently Memo looks for someone else.</p><div class="chips">${PERSONAS.map(x => `<button class="chip" data-act="persona-live" data-id="${x.id}">${x.label}</button>`).join('')}</div></div>
        <div class="panel"><div class="ph"><h3>Privacy & your data</h3>${ic('shield', '')}</div>
          ${tg('personalize', 'Personalize my feed', 'Use my interests and saves to rank what I see')}
          ${tg('location', 'Use my neighbourhood', 'Show distances and things near Kitsilano')}
          ${tg('shareWithBiz', 'Share bookings with businesses', 'Only the studio you book with sees your name')}
          <p class="faint" style="font-size:12.5px;margin-top:10px">Memo never sells your data. Businesses see totals, not who browsed.</p>
        </div>
      </div>
    </div></div>`);
}
