/* Memo prototype — business studio (sample business: Ringside Kitsilano) */

const PUB_DATES = { r1: 'Aug 14', r2: 'Sep 2', r3: 'Aug 14', r4: 'Sep 28', r5: 'Oct 1', r6: 'Jul 30', r7: 'Sep 9', r8: 'Sep 30', rd1: '—' };
const BOOKINGS = { r1: 34, r3: 12, r4: 9, r5: 6, r8: 0, r2: 0, r6: 0, r7: 0 };

function bizItems() { return allItems().filter(i => i.biz === 'ringside'); }
function goalsOf(it) {
  const g = [];
  if (it.cats.includes('strength')) g.push('Get stronger');
  if (/fundamental|basic|combo|wrap|first|drill|footwork|101/i.test(it.title) || it.type === 'article') g.push('Learn a skill');
  if (it.social === 'group' && it.type !== 'class') g.push('Meet people');
  if (it.dur && it.dur <= 15) g.push('Quick sessions');
  if (it.type === 'program' || it.type === 'challenge') g.push('Stay consistent');
  if (/confidence|nervous|first/i.test(it.title + it.desc)) g.push('Build confidence');
  return g.length ? g : ['Get moving'];
}
function audienceOf(it) {
  const a = [];
  if (/teen/i.test(it.title)) a.push('Teens (13–17)');
  if (/ladies|women/i.test(it.title + it.desc)) a.push('Women');
  a.push({ beginner: 'Complete beginners', all: 'Everyone', intermediate: 'Some experience' }[it.level]);
  return a;
}
const DIMS = {
  activity: { label: 'Activity', of: it => it.cats.map(c => CAT[c].name) },
  goal: { label: 'Goal', of: goalsOf },
  audience: { label: 'Audience', of: audienceOf },
  difficulty: { label: 'Difficulty', of: it => [{ beginner: 'Beginner', all: 'All levels', intermediate: 'Intermediate' }[it.level]] },
  type: { label: 'Content type', of: it => [TYPES[it.type].label === 'Read' ? 'Article' : TYPES[it.type].label] },
  location: { label: 'Location', of: it => [it.setting === 'online' ? 'At home / online' : 'At the studio · W 4th Ave'] },
  purpose: { label: 'Purpose', of: it => [(!/free/i.test(it.price) ? 'Sales' : (it.type === 'class' || it.type === 'event') ? 'Classes' : 'Socials')] },
  team: { label: 'Instructor', of: it => [it.host] },
};

/* ---------- Shell ---------- */
function bizShell(inner) {
  const r = state.route.name;
  const nav = [['b/overview', 'Overview', 'chart'], ['b/content', 'Content', 'grid'], ['b/organize', 'Organize', 'layers'], ['b/profile', 'Business profile', 'store'], ['b/plan', 'Plan & billing', 'card']];
  const plan = PLANS.find(p => p.id === state.biz.plan);
  const n = bizItems().length;
  return `<div class="b-shell">
    <aside class="b-side">
      <div class="b-brand">${logo(24)}<span class="sub">Business</span></div>
      <div class="b-acct"><span class="mono md" style="background:#F0604E">RK</span><span><b>Ringside Kitsilano</b><span>Kitsilano · Owner</span></span></div>
      <button class="btn btn-primary" data-act="go" data-to="b/upload" style="width:100%">${ic('upload')} Upload content</button>
      <nav class="b-nav" aria-label="Business">${nav.map(([to, l, i]) => `<button data-act="go" data-to="${to}" ${r === to ? 'aria-current="page"' : ''}>${ic(i)}${l}${to === 'b/content' ? `<span class="count num">${n}</span>` : ''}</button>`).join('')}</nav>
      <div class="b-foot">
        <div class="b-planbox"><span style="opacity:.7">Current plan</span><b>${plan.name}</b>${state.biz.plan === 'trial' ? `<span class="num">$${state.biz.earned} of $250 earned</span><div class="meter"><i style="width:${Math.min(100, state.biz.earned / 2.5)}%"></i></div>` : `<span>${plan.price} ${plan.per}</span>`}</div>
        <button class="btn btn-ghost btn-sm" data-act="go-member-biz">${ic('eye')} View as a member</button>
      </div>
    </aside>
    <main class="b-main">${inner}</main>
  </div>`;
}

/* ---------- Entry ---------- */
function viewBizStart() {
  return `<div class="entry fade-in">
    <span class="eyebrow">Memo for Business</span>
    <h1 style="margin-top:12px">Turn the content you already have into customers.</h1>
    <p class="sub">Studios, coaches and clubs upload the videos, schedules and posts already on their phones. Memo tags them, organizes them and shows them to nearby people who are looking for exactly that.</p>
    <div class="doors">
      <button class="door" data-act="bo-begin"><div><span class="eyebrow">About 2 minutes</span><h2>Join as a new business</h2><p>Walk through sign-up, choosing a plan, uploading and watching Memo organize and distribute your content.</p><div class="steps"><span>Account</span><span>Plan</span><span>Upload</span><span>Organize</span><span>Distribute</span></div></div><span class="go">${ic('right')}</span></button>
      <button class="door" data-act="bo-skip"><div><span class="eyebrow">Sample data</span><h2>Open Ringside’s dashboard</h2><p>Jump straight into a boxing studio in Kitsilano that has been on Memo for four months.</p><div class="steps"><span>Overview</span><span>Content</span><span>Organize</span><span>Leads</span></div></div><span class="go">${ic('right')}</span></button>
    </div>
  </div>`;
}

/* ---------- Onboarding ---------- */
const BO_STEPS = ['Account', 'Business', 'Plan', 'Upload', 'Organize', 'Distribute'];
function genFromFile(f, i) {
  const g = f.guess;
  return {
    id: 'pub-' + hashStr(f.file + i).toString(36), biz: 'ringside', type: g.type, title: g.title, cats: g.cats, level: g.level,
    setting: g.type === 'video' || g.type === 'article' ? 'online' : 'indoor', social: g.type === 'video' || g.type === 'article' ? 'solo' : 'group',
    dur: g.type === 'video' ? 3 + (i % 4) * 2 : g.type === 'article' ? 5 : 50,
    when: { video: `${3 + (i % 4) * 2} min video`, article: '5 min read', class: 'Sun · 10:00 am', event: 'Sat, Oct 31 · 11:00 am' }[g.type] || 'This week',
    price: g.type === 'class' ? '$28 · first class free' : g.type === 'event' ? '$15' : 'Free', host: /leo/i.test(f.file) ? 'Leo Fontaine' : /maya|4021/i.test(f.file) ? 'Maya Okafor' : 'Hana Sato',
    views: 0, saves: 0, trend: 6, desc: g.desc, isNew: true, status: 'live', from: f.file,
  };
}
function viewBizOnboard() {
  const s = state.biz.step; const B = state.biz;
  const steps = `<div class="bo-steps">${BO_STEPS.map((l, i) => `${i ? '<span class="sep"></span>' : ''}<span class="${i === s ? 'on' : i < s ? 'done' : ''}"><i>${i < s ? '✓' : i + 1}</i>${l}</span>`).join('')}</div>`;
  let body = '', nav = '', art = '';
  const generated = SAMPLE_FILES.filter(f => B.picked.includes(f.file)).map(genFromFile);
  if (s === 0) {
    body = `<div><h1>Create your business account</h1><p class="sub">Free to start. You won’t need a card until Memo has earned you more than it costs.</p></div>
      <form class="form-card" id="bo-acct" style="max-width:520px">
        <div class="field-l"><label for="bo-name">Business name</label><input class="inp" id="bo-name" value="${esc(B.account.name)}"></div>
        <div class="field-l"><label for="bo-email">Work email</label><input class="inp" id="bo-email" type="email" value="${esc(B.account.email)}"></div>
        <div class="field-l"><label for="bo-pw">Password</label><input class="inp" id="bo-pw" type="password" value="memo-demo-2026"></div>
        <button class="btn btn-primary btn-lg" type="submit">Create account</button>
        <small class="faint">By creating an account you agree to the Terms. Prototype: nothing is sent anywhere.</small>
      </form>`;
    art = ['Most of our new members found us through a 90-second video we’d already posted.', 'Maya Okafor, Ringside Kitsilano'];
  } else if (s === 1) {
    body = `<div><h1>Tell us about ${esc(B.account.name)}</h1><p class="sub">This helps Memo show you to the right people. Everything here can be changed later.</p></div>
      <div class="form-card" style="max-width:620px">
        <div class="field-l"><span class="lbl-s">What kind of business?</span><div class="segc">${['Studio or gym', 'Coach or trainer', 'Club or league', 'Wellness', 'Product or brand'].map((x, i) => `<button class="chip ${i === 0 ? 'on' : ''}" data-act="chip-one">${x}</button>`).join('')}</div></div>
        <div class="field-l"><span class="lbl-s">What do you offer?</span><div class="segc">${CATS.map(c => `<button class="chip ${['boxing', 'strength'].includes(c.id) ? 'on' : ''}" data-act="chip-toggle">${c.name}</button>`).join('')}</div></div>
        <div class="two"><div class="field-l"><label for="bo-addr">Address</label><input class="inp" id="bo-addr" value="2190 W 4th Ave, Vancouver"></div><div class="field-l"><label for="bo-ig">Instagram</label><input class="inp" id="bo-ig" value="@ringsidekits"></div></div>
        <div class="set-row" style="border:0;padding:0"><span><b>Import my public Instagram posts</b><span>Memo will pull in your last 18 posts as drafts for you to review.</span></span><button class="toggle" role="switch" aria-checked="true" data-act="toggle-sw" aria-label="Import Instagram posts"></button></div>
      </div>`;
    nav = `<button class="btn btn-ghost" data-act="bo-prev">${ic('left')} Back</button><button class="btn btn-primary btn-lg" data-act="bo-next">Continue ${ic('right')}</button>`;
    art = ['Memo reads your neighbourhood, your schedule and your style, so you never have to learn a taxonomy.', 'How Memo organizes content'];
  } else if (s === 2) {
    body = `<div><h1>Choose a plan</h1><p class="sub">Every plan includes content organization, distribution to member feeds and live analytics.</p></div>
      <div class="plans compact">${PLANS.map(p => planCard2(p, B.plan === p.id)).join('')}</div>`;
    nav = `<button class="btn btn-ghost" data-act="bo-prev">${ic('left')} Back</button><button class="btn btn-primary btn-lg" data-act="bo-next">Continue with ${PLANS.find(p => p.id === B.plan).name} ${ic('right')}</button>`;
    art = ['Trial Run costs nothing until bookings through Memo pass $250. Then you move to Basic automatically.', 'Pay when it works'];
  } else if (s === 3) {
    body = `<div><h1>Upload what you already have</h1><p class="sub">Videos from your phone, last season’s schedule, the poster on your door. Messy file names are fine.</p></div>
      <div class="form-card"><div class="drop" style="padding:20px"><span class="ic">${ic('upload')}</span><b>Drop files here, or pick from your recent files</b><small class="faint">Video, images, PDFs and docs up to 2 GB each</small></div>
      <div class="file-pick">${SAMPLE_FILES.map(f => { const on = B.picked.includes(f.file); return `<button class="fp ${on ? 'on' : ''}" data-act="bo-pick" data-f="${esc(f.file)}" aria-pressed="${on}"><span class="fi">${ic(f.kind === 'video' ? 'video' : f.kind === 'image' ? 'image' : 'doc')}</span><div><b>${esc(f.file)}</b><small>${f.size}</small></div></button>`; }).join('')}</div></div>`;
    nav = `<button class="btn btn-ghost" data-act="bo-prev">${ic('left')} Back</button><button class="btn btn-primary btn-lg" data-act="bo-next" ${B.picked.length ? '' : 'disabled'}>Organize ${B.picked.length} file${B.picked.length === 1 ? '' : 's'} ${ic('right')}</button>`;
    art = ['You make great content. Memo makes sure the right people see it.', 'Upload once, discovered everywhere'];
  } else if (s === 4) {
    body = `<div><h1>Memo organized your content</h1><p class="sub">Each file became a titled, tagged item. Review anything you like, or carry on.</p></div>
      <div class="orgz">${generated.map((g, i) => `<div class="srow" style="animation-delay:${i * .25}s;grid-template-columns:56px 1fr">${media(g, { bare: true })}<div><small class="faint" style="font-family:ui-monospace,Menlo,monospace">${esc(g.from)} →</small><b>${esc(g.title)}</b><div class="chips">${[TYPES[g.type].label === 'Read' ? 'Article' : TYPES[g.type].label, ...g.cats.map(c => CAT[c].name), DIMS.difficulty.of(g)[0], ...goalsOf(g).slice(0, 1), 'Kitsilano'].map((t, j) => `<span class="pill" style="animation:tagIn .3s ${i * .25 + .2 + j * .08}s both">${esc(t)}</span>`).join('')}</div></div></div>`).join('')}</div>
      <p class="muted num" style="font-size:14px">${generated.length} items · ${generated.length * 5} tags · sorted into ${new Set(generated.flatMap(g => [...g.cats, ...goalsOf(g)])).size} collections</p>`;
    nav = `<button class="btn btn-ghost" data-act="bo-prev">${ic('left')} Back</button><button class="btn btn-primary btn-lg" data-act="bo-next">Looks good ${ic('right')}</button>`;
    art = ['No folders, no spreadsheets. Activity, level, goal, audience and location are filled in for you.', 'Organized automatically'];
  } else {
    const surf = [['pin', 'Near you · Kitsilano', 'People within 3 km', 2400], ['spark', 'Because you like boxing', 'Members who chose Boxing', 1850], ['users', 'Beginner-friendly picks', 'Members who are new to this', 1320], ['bell', 'Your followers', 'Notified about new content', 3412]];
    body = `<div><h1>Here’s where you’ll show up</h1><p class="sub">Memo places each item in the feeds of people likely to love it. Estimated weekly reach, based on similar studios:</p></div>
      <div class="dist-feed">${surf.map(([i, t, s2, n], k) => `<div class="dist" style="animation-delay:${k * .15}s"><span class="ic">${ic(i === 'bell' ? 'users' : i)}</span><span><b>${t}</b><small>${s2}</small></span><span class="reach num">${fmt(n)}<small>per week</small></span></div>`).join('')}</div>`;
    nav = `<button class="btn btn-ghost" data-act="bo-prev">${ic('left')} Back</button><button class="btn btn-primary btn-lg" data-act="bo-finish">Go live ${ic('bolt')}</button>`;
    art = ['Relevant people encounter your content. They save it, follow you, and book.', 'Distribution'];
  }
  if (s === 0) nav = '';
  return `<div class="bo">
    <div class="bo-form fade-in">${steps}${body}${nav ? `<div class="bo-nav">${nav}</div>` : ''}</div>
    <div class="bo-art on-deep">
      <svg class="wv" style="top:0" viewBox="0 0 600 160" preserveAspectRatio="none"><path d="M0 0H600V70Q525 120 450 80T300 80T150 80T0 70Z" opacity=".55"/></svg>
      <div class="quote-b">${logoMark(54)}<q style="display:block;margin-top:22px">${art[0]}</q><p>${art[1]}</p></div>
      <svg class="wv" style="bottom:0" viewBox="0 0 600 160" preserveAspectRatio="none"><path d="M0 160H600V90Q525 40 450 80T300 80T150 80T0 90Z" opacity=".55"/></svg>
      ${bubbleCluster()}
    </div>
  </div>`;
}
function planCard2(p, on, opts = {}) {
  return `<button class="plan ${on ? 'on' : ''}" data-act="${opts.act || 'bo-plan'}" data-id="${p.id}" aria-pressed="${on}">
    ${p.id === 'trial' && !opts.current ? '<span class="rec-tag">Most new studios start here</span>' : ''}
    <span class="pn">${p.name}${opts.current === p.id ? ' <span class="pill live" style="vertical-align:3px">Current</span>' : ''}</span>
    <span class="pp num">${p.price} <small>${p.per}</small></span>
    <p>${p.summary}</p>
    <ul>${p.features.map(f => `<li>${ic('check')}${f}</li>`).join('')}</ul>
  </button>`;
}

/* ---------- Overview ---------- */
function sparkPath(vals, w = 120, h = 26) {
  const mx = Math.max(...vals), mn = Math.min(...vals);
  return vals.map((v, i) => `${i ? 'L' : 'M'}${(i / (vals.length - 1) * w).toFixed(1)} ${(h - 2 - (v - mn) / (mx - mn || 1) * (h - 4)).toFixed(1)}`).join(' ');
}
function lineChart() {
  const { views, saves } = BIZ_SERIES; const W = 640, H = 220, L = 40, R = 10, T = 10, Bt = 26;
  const max = 1000; const x = i => L + i / (views.length - 1) * (W - L - R); const y = v => T + (1 - v / max) * (H - T - Bt);
  const vp = views.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
  const sp = saves.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
  let grid = ''; [0, 250, 500, 750, 1000].forEach(v => grid += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)" stroke-dasharray="${v ? '3 4' : ''}"/><text x="${L - 8}" y="${y(v) + 4}" text-anchor="end">${v ? fmt(v) : '0'}</text>`);
  const labels = [[0, 'Sep 7'], [7, 'Sep 14'], [14, 'Sep 21'], [21, 'Sep 28'], [29, 'Oct 6']].map(([i, l]) => `<text x="${x(i)}" y="${H - 6}" text-anchor="${i === 0 ? 'start' : i === 29 ? 'end' : 'middle'}">${l}</text>`).join('');
  const last = views.length - 1;
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Daily views and saves over the last 30 days">${grid}${labels}
    <path d="${vp} L${x(last)} ${y(0)} L${x(0)} ${y(0)} Z" fill="var(--accent)" opacity=".14"/>
    <path d="${vp}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="${sp}" fill="none" stroke="var(--coral)" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="${x(last)}" cy="${y(views[last])}" r="5" fill="var(--accent)" stroke="var(--surface)" stroke-width="2"/>
    <text x="${x(last) - 10}" y="${y(views[last]) - 10}" text-anchor="end" style="fill:var(--ink);font-weight:700">${views[last]} views today</text>
  </svg>`;
}
function viewBizOverview() {
  const B = state.biz; const items = bizItems();
  const live = items.filter(i => (i.status || 'live') === 'live');
  const newOnes = state.published.length;
  const trial = B.plan === 'trial';
  const kp = [
    ['Views', 18420 + newOnes * 140, '+12%', BIZ_SERIES.views],
    ['Saves', 1212 + newOnes * 11, '+18%', BIZ_SERIES.saves],
    ['Profile visits', 2340, '+9%', BIZ_SERIES.views.map(v => v * .13)],
    ['Leads', 146, '+22%', BIZ_SERIES.saves.map((v, i) => v * .1 + (i % 4))],
    ['Bookings', trial ? 7 : 61, '+15%', BIZ_SERIES.saves.map((v, i) => v * .05 + (i % 3))],
    ['Earned through Memo', trial ? '$' + B.earned : '$1,830', '+31%', BIZ_SERIES.views.map((v, i) => v + i * 20)],
  ];
  const surfaces = [['Near you · Kitsilano', 7940], ['Because you like boxing', 4620], ['Beginner-friendly picks', 2880], ['Trending in Vancouver', 1610], ['Search', 1370]];
  const audience = [['Strength', 38], ['Running', 24], ['Boxing', 21], ['Dance', 9], ['Yoga', 8]];
  const topViewed = [...live].sort((a, b) => b.views - a.views).slice(0, 3);
  const topBooked = Object.entries(BOOKINGS).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([id, n]) => [item(id), n]);
  const recs = [
    { id: 'cross', ic: 'spark', t: 'Runners keep saving Fight Camp Conditioning', p: '27% of its saves came from people who chose Running. Show it in Running feeds too?', btn: 'Add to Running feeds' },
    { id: 'draft', ic: 'doc', t: '“Hand wraps in 90 seconds” is still a draft', p: 'Beginners search Memo for “hand wraps” about 120 times a month.', btn: 'Publish now' },
    { id: 'pin', ic: 'bolt', t: 'Your jump rope video brings in the most new followers', p: '41% of this month’s followers saw it first. Pin it to the top of your profile.', btn: 'Pin to profile' },
  ];
  return bizShell(`<div class="fade-in">
    <div class="b-head"><div><h1>Good afternoon, Maya</h1><p>Here’s how Ringside did on Memo over the last 30 days. <span class="sample-note">Sample data</span></p></div>
      <div class="acts"><button class="btn btn-ghost" data-act="go-member-biz">${ic('eye')} Your public profile</button><button class="btn btn-dark" data-act="go" data-to="b/upload">${ic('upload')} Upload</button></div></div>
    ${trial ? `<div class="trial"><div><span class="eyebrow" style="color:var(--mint)">Trial Run</span><h3 style="margin-top:4px">Memo has earned you $${B.earned} so far</h3><p>Basic ($250/month) starts automatically once bookings through Memo pass $250. Until then, it’s free.</p><div class="meter"><i style="width:${Math.min(100, B.earned / 2.5)}%"></i></div></div><div class="big num">$${B.earned}<small> / $250</small></div></div>`
      : `<div class="trial"><div><span class="eyebrow" style="color:var(--mint)">${PLANS.find(p => p.id === B.plan).name} plan</span><h3 style="margin-top:4px">Memo drove $1,830 in bookings this month</h3><p>That’s ${(1830 / (B.plan === 'premium' ? 1000 : 250)).toFixed(1)}× your plan cost. 61 bookings from 146 leads.</p></div><div class="big num">${(1830 / (B.plan === 'premium' ? 1000 : 250)).toFixed(1)}×<small> return</small></div></div>`}
    ${newOnes ? `<div class="rec" style="margin-bottom:20px;border-color:var(--accent);background:var(--accent-soft)"><span class="ic" style="background:var(--surface)">${ic('bolt')}</span><div><b>${newOnes} new item${newOnes > 1 ? 's are' : ' is'} live in member feeds</b><p>${state.published.slice(-3).map(p => esc(p.title)).join(' · ')}</p><button class="btn btn-sm btn-dark" data-act="see-as-member" data-id="${state.published[state.published.length - 1].id}">See it as a member</button></div></div>` : ''}
    <div class="kpis">${kp.map(([l, v, d, s], i) => `<div class="kpi ${i === 5 ? 'hl' : ''}"><small>${l}</small><b>${typeof v === 'number' ? v.toLocaleString('en-CA') : v}</b><span class="delta">${d} vs last month</span><svg viewBox="0 0 120 26" preserveAspectRatio="none"><path d="${sparkPath(s)}" fill="none" stroke="${i === 5 ? 'var(--accent-ink)' : 'var(--accent)'}" stroke-width="1.6"/></svg></div>`).join('')}</div>
    <div class="b-grid">
      <div class="panel chart"><div class="ph"><h3>Views and saves</h3><div class="legend-row"><span><i style="background:var(--accent)"></i>Views</span><span><i style="background:var(--coral)"></i>Saves</span></div></div>${lineChart()}</div>
      <div class="panel"><div class="ph"><h3>Memo recommends</h3><span class="faint" style="font-size:12.5px">Updated daily</span></div>
        <div class="recs">${recs.map(r => { const done = B.recDone.includes(r.id); return `<div class="rec ${done ? 'done' : ''}"><span class="ic">${ic(r.ic)}</span><div><b>${r.t}</b><p>${r.p}</p>${done ? `<span class="pill live" style="margin-top:10px">${ic('check')} Done</span>` : `<button class="btn btn-sm btn-ghost" data-act="rec" data-id="${r.id}">${r.btn}</button>`}</div></div>`; }).join('')}</div></div>
    </div>
    <div class="b-grid three">
      <div class="panel"><div class="ph"><h3>Where people found you</h3><span class="faint num" style="font-size:12.5px">Impressions</span></div>${surfaces.map(([l, v]) => `<div class="hbar"><span>${l}</span><b>${fmt(v)}</b><div class="meter"><i style="width:${v / 79.4}%"></i></div></div>`).join('')}</div>
      <div class="panel"><div class="ph"><h3>Who’s discovering you</h3><span class="faint" style="font-size:12.5px">Interests of engaged members</span></div>${audience.map(([l, v]) => `<div class="hbar"><span>${l}</span><b>${v}%</b><div class="meter"><i style="width:${v / .38}%;background:var(--sun)"></i></div></div>`).join('')}<p class="faint" style="font-size:12.5px">Mostly Kitsilano, Fairview and Point Grey. Totals only; Memo never shows you who browsed.</p></div>
      <div class="panel"><div class="ph"><h3>New leads</h3><span class="pill live"><span class="dot"></span>Live</span></div>${LEADS.map(l => `<div class="lead"><span class="avatar">${l.who[0]}</span><div><b>${l.who}</b><p>${l.what}</p><p class="faint">via ${l.from}</p></div><span class="when">${l.when}</span></div>`).join('')}</div>
    </div>
    <div class="b-grid two">
      <div class="panel"><div class="ph"><h3>Most viewed</h3></div>${topViewed.map(i => `<div class="top-c" data-act="lib-open" data-id="${i.id}">${media(i, { bare: true })}<span><b>${esc(i.title)}</b><small>${TYPES[i.type].label}</small></span><span class="v">${fmt(i.views)}<small class="faint">views</small></span></div>`).join('')}</div>
      <div class="panel"><div class="ph"><h3>Drove the most bookings</h3></div>${topBooked.map(([i, n]) => `<div class="top-c" data-act="lib-open" data-id="${i.id}">${media(i, { bare: true })}<span><b>${esc(i.title)}</b><small class="num">$${(n * 28).toLocaleString()} in bookings</small></span><span class="v">${n}<small class="faint">bookings</small></span></div>`).join('')}</div>
    </div>
  </div>`);
}

/* ---------- Content library ---------- */
function viewBizContent() {
  const B = state.biz; let items = bizItems();
  const q = B.libQuery.toLowerCase();
  if (B.libFilter !== 'all') items = items.filter(i => (i.status || 'live') === B.libFilter);
  if (q) items = items.filter(i => (i.title + i.cats.join(' ') + i.type).toLowerCase().includes(q));
  items = [...items].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  const all = bizItems(); const counts = { all: all.length, live: all.filter(i => (i.status || 'live') === 'live').length, draft: all.filter(i => i.status === 'draft').length };
  return bizShell(`<div class="fade-in">
    <div class="b-head"><div><h1>Content</h1><p>Everything Ringside has on Memo. Click any item to edit tags or preview it.</p></div><div class="acts"><button class="btn btn-dark" data-act="go" data-to="b/upload">${ic('upload')} Upload</button></div></div>
    <div class="toolbar"><div class="segc">${[['all', 'All'], ['live', 'Live'], ['draft', 'Drafts']].map(([k, l]) => `<button class="chip ${B.libFilter === k ? 'on' : ''}" data-act="lib-filter" data-k="${k}">${l} <span class="num" style="opacity:.6">${counts[k]}</span></button>`).join('')}</div><input class="inp" id="lib-q" placeholder="Search your content" value="${esc(B.libQuery)}" aria-label="Search your content"></div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Content</th><th>Type</th><th>Memo tags</th><th>Status</th><th class="n">Views</th><th class="n">Saves</th><th class="n">Bookings</th><th>Published</th></tr></thead>
    <tbody>${items.map(i => { const st = i.status || 'live'; return `<tr data-act="lib-open" data-id="${i.id}" class="${i.isNew ? 'flash' : ''}"><td><div class="tt">${media(i, { bare: true })}<span><b>${esc(i.title)}</b><small>${esc(i.host)}${i.from ? ` · from ${esc(i.from)}` : ''}</small></span></div></td><td>${TYPES[i.type].label === 'Read' ? 'Article' : TYPES[i.type].label}</td><td><div class="tags">${[...i.cats.map(c => CAT[c].name), DIMS.difficulty.of(i)[0]].slice(0, 3).map(t => `<span class="pill">${esc(t)}</span>`).join('')}</div></td><td><span class="pill ${st}"><span class="dot"></span>${st === 'live' ? 'Live' : 'Draft'}</span>${i.isNew ? ' <span class="pill new">New</span>' : ''}${B.recDone.includes('pin') && i.id === 'r6' ? ' <span class="pill">Pinned</span>' : ''}</td><td class="n">${st === 'live' ? fmt(i.views) : '—'}</td><td class="n">${st === 'live' ? fmt(i.saves) : '—'}</td><td class="n">${BOOKINGS[i.id] ?? 0}</td><td class="num">${i.isNew ? 'Today' : PUB_DATES[i.id] || '—'}</td></tr>`; }).join('') || `<tr><td colspan="8" class="muted" style="text-align:center;padding:40px">No content matches.</td></tr>`}</tbody></table></div>
  </div>`);
}
function libSheet(id) {
  const it = item(id); const st = it.status || 'live';
  const dims = ['activity', 'goal', 'audience', 'difficulty', 'location'];
  openLayer(`<div class="sheet-wrap" data-act="close-bg"><div class="sheet" style="width:min(620px,100%)" role="dialog" aria-modal="true" aria-label="Edit ${esc(it.title)}">
    <div class="s-head">${it.img ? `<img src="${it.img}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">` : poster(it.id + 's', it.cats[0])}<button class="icon-btn close" data-act="close" aria-label="Close">${ic('x')}</button></div>
    <div class="s-body">
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:start"><div><span class="eyebrow">${TYPES[it.type].label === 'Read' ? 'Article' : TYPES[it.type].label}</span><h3 style="margin-top:4px">${esc(it.title)}</h3></div><span class="pill ${st}"><span class="dot"></span>${st === 'live' ? 'Live' : 'Draft'}</span></div>
      <p class="muted" style="font-size:14px">${esc(it.desc)}</p>
      <div style="display:grid;gap:10px">${dims.map(d => `<div class="tag-dim"><span>${DIMS[d].label}</span><div class="chips">${DIMS[d].of(it).map(t => `<span class="stag" style="animation:none">${esc(t)}</span>`).join('')}</div></div>`).join('')}</div>
      ${st === 'live' ? `<div class="facts" style="grid-template-columns:repeat(3,1fr);margin:0"><div><small>Views</small><b class="num">${fmt(it.views)}</b></div><div><small>Saves</small><b class="num">${fmt(it.saves)}</b></div><div><small>Bookings</small><b class="num">${BOOKINGS[it.id] ?? 0}</b></div></div>` : ''}
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        ${st === 'live' ? `<button class="btn btn-primary" data-act="see-as-member" data-id="${it.id}">${ic('eye')} How customers see this</button><button class="btn btn-ghost" data-act="set-status" data-id="${it.id}" data-v="draft">Unpublish</button>` : `<button class="btn btn-primary" data-act="set-status" data-id="${it.id}" data-v="live">Publish</button>`}
      </div>
    </div></div></div>`);
}

/* ---------- Organize ---------- */
function viewBizOrganize() {
  const B = state.biz; const items = bizItems().filter(i => (i.status || 'live') === 'live'); const dim = DIMS[B.dim];
  const groups = {}; items.forEach(i => dim.of(i).forEach(g => (groups[g] = groups[g] || []).push(i)));
  const sorted = Object.entries(groups).sort((a, b) => b[1].length - a[1].length);
  const queue = [
    { id: 'q1', item: 'r8', q: 'Is the 1,000 Punch Challenge good for complete beginners?', guess: 'Memo thinks yes, 82% sure', yes: 'Yes, beginners welcome', no: 'No, some experience' },
    { id: 'q2', item: 'r4', q: 'Should Open Gym + Pad Work appear for people looking to meet others?', guess: 'Memo thinks yes, 76% sure', yes: 'Yes, it’s social', no: 'No' },
  ].filter(x => !B.confirmed.includes(x.id));
  const raw = ['IMG_3801.MOV', 'reel_final_FINAL.mp4', 'Schedule Fall (1).pdf', 'IMG_3988.jpg', 'leo notes.docx'];
  const showcase = [item('r2'), item('r1'), item('r6')];
  return bizShell(`<div class="fade-in">
    <div class="b-head"><div><h1>Organize</h1><p>Memo sorts everything you upload so people can find it by what they care about.</p></div></div>
    <div class="panel before-after" style="margin-bottom:22px">
      <div><div class="lbl-s" style="margin-bottom:10px">What you uploaded</div><div class="files">${raw.map(f => `<div class="file">${ic(/mov|mp4/i.test(f) ? 'video' : /jpg|png/i.test(f) ? 'image' : 'doc')}<span>${f}</span></div>`).join('')}</div></div>
      <span class="arrow-c">${ic('right')}</span>
      <div><div class="lbl-s" style="margin-bottom:10px">What members can discover</div><div class="structured">${showcase.map(i => `<div class="srow">${media(i, { bare: true })}<div><b>${esc(i.title)}</b><div class="chips">${[...i.cats.map(c => CAT[c].name), DIMS.difficulty.of(i)[0], goalsOf(i)[0]].map(t => `<span class="pill">${esc(t)}</span>`).join('')}</div></div></div>`).join('')}</div></div>
    </div>
    ${queue.length ? `<div class="panel" style="margin-bottom:22px"><div class="ph"><h3>Needs a quick look</h3><span class="faint" style="font-size:12.5px">${queue.length} question${queue.length > 1 ? 's' : ''}, about 10 seconds</span></div><div class="queue">${queue.map(x => { const i = item(x.item); return `<div class="rec" style="grid-template-columns:56px 1fr">${media(i, { bare: true })}<div><b>${x.q}</b><p>${x.guess}</p><div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap"><button class="btn btn-sm btn-primary" data-act="confirm-q" data-id="${x.id}">${x.yes}</button><button class="btn btn-sm btn-ghost" data-act="confirm-q" data-id="${x.id}">${x.no}</button></div></div></div>`; }).join('')}</div></div>` : ''}
    <div class="ph" style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:12px"><h3 style="font-size:18px;font-weight:800">Browse your library by</h3><span class="faint num" style="font-size:13px">${items.length} live items · ${sorted.length} ${dim.label.toLowerCase()} groups</span></div>
    <div class="dim-tabs">${Object.entries(DIMS).map(([k, d]) => `<button class="chip ${B.dim === k ? 'on' : ''}" data-act="dim" data-k="${k}">${d.label}</button>`).join('')}</div>
    <div class="board">${sorted.map(([g, its]) => `<div class="coll-col"><h4>${esc(g)}<span class="num">${its.length}</span></h4>${its.slice(0, 4).map(i => `<div class="it" data-act="lib-open" data-id="${i.id}">${media(i, { bare: true })}<span>${esc(i.title)}</span></div>`).join('')}${its.length > 4 ? `<span class="more num">+ ${its.length - 4} more</span>` : ''}</div>`).join('')}</div>
  </div>`);
}

/* ---------- Upload studio ---------- */
const KW = [
  [/box|jab|punch|pad|bag|spar|glove|wrap|combo/i, 'activity', 'Boxing'], [/hiit|condition|circuit|strength|kettlebell|lift|rope/i, 'activity', 'Strength'],
  [/run|5k|10k|jog/i, 'activity', 'Running'], [/yoga|flow|vinyasa/i, 'activity', 'Yoga'], [/stretch|mobility|footwork|hip|ladder/i, 'activity', 'Mobility'],
  [/dance|choreo/i, 'activity', 'Dance'], [/recover|sauna|plunge/i, 'activity', 'Recovery'],
  [/begin|basic|fundamental|intro|first|101|how to|learn|new to/i, 'level', 'Beginner-friendly'], [/advanced|camp|spar|intense/i, 'level', 'Some experience'],
  [/ladies|women/i, 'audience', 'Women'], [/teen|youth|13/i, 'audience', 'Teens (13–17)'],
  [/strength|condition|hiit|circuit/i, 'goal', 'Get stronger'], [/technique|drill|basic|fundamental|how/i, 'goal', 'Learn a skill'],
  [/party|social|open gym|together|friends|halloween/i, 'goal', 'Meet people'], [/minute|quick|90 sec|second/i, 'goal', 'Quick sessions'],
];
function suggest(up) {
  const text = `${up.title} ${up.desc} ${up.file ? up.file.name : ''}`;
  const out = { activity: [], level: [], goal: [], audience: [], location: [] };
  const add = (d, l, c) => { if (!out[d].find(x => x.l === l)) out[d].push({ l, c, on: true }); };
  KW.forEach(([re, d, l]) => { if (re.test(text)) add(d, l, 86 + (l.length % 10)); });
  if (!out.activity.length) add('activity', 'Boxing', 71);
  if (!out.level.length) add('level', 'All levels', 74);
  if (!out.audience.length) add('audience', 'Adults', 80);
  if (!out.goal.length) add('goal', 'Get moving', 70);
  add('location', 'Kitsilano', 99); add('location', 'Vancouver', 99);
  if (up.type === 'video' || up.type === 'article') add('location', 'At home', 90);
  // keep user toggles from previous suggestion
  if (up.tags) Object.keys(out).forEach(d => out[d].forEach(t => { const prev = (up.tags[d] || []).find(x => x.l === t.l); if (prev) t.on = prev.on; }));
  if (up.tags) Object.keys(up.tags).forEach(d => up.tags[d].filter(t => t.custom).forEach(t => out[d].push(t)));
  return out;
}
function newUpload(file) {
  const f = file || null;
  state.up = { stage: f ? 'details' : 'pick', file: f, title: f && f.guess ? f.guess.title : f ? cleanName(f.name) : '', desc: f && f.guess ? f.guess.desc : '', type: f && f.guess ? f.guess.type : f ? (f.kind === 'video' ? 'video' : f.kind === 'image' ? 'event' : 'article') : 'video', when: '', price: '', analyzing: !!f, tags: null, published: null };
  if (f) { state.up.tags = suggest(state.up); setTimeout(() => { if (state.up) { state.up.analyzing = false; render(); } }, 1300); }
}
function cleanName(n) { return n.replace(/\.[a-z0-9]+$/i, '').replace(/[_-]+/g, ' ').replace(/\b(img|final|v\d|copy)\b/gi, '').replace(/\s+/g, ' ').trim().replace(/^./, c => c.toUpperCase()) || 'Untitled'; }
function upItem() {
  const up = state.up; const t = up.tags || suggest(up);
  const on = d => (t[d] || []).filter(x => x.on).map(x => x.l);
  const catMap = Object.fromEntries(CATS.map(c => [c.name, c.id]));
  const cats = on('activity').map(l => catMap[l]).filter(Boolean);
  const lv = on('level');
  return {
    id: up.published || 'preview', biz: 'ringside', type: up.type, title: up.title || 'Untitled', desc: up.desc || 'Add a description so members know what to expect.',
    cats: cats.length ? cats : ['boxing'], level: lv.includes('Beginner-friendly') ? 'beginner' : lv.includes('Some experience') ? 'intermediate' : 'all',
    setting: (up.type === 'video' || up.type === 'article') ? 'online' : 'indoor', social: (up.type === 'video' || up.type === 'article') ? 'solo' : 'group',
    dur: up.type === 'video' ? 4 : up.type === 'article' ? 5 : 50, when: up.when || { video: '4 min video', article: '5 min read', class: 'Sun · 10:00 am', event: 'Sat, Oct 31 · 11:00 am', program: 'Starts Nov 2', challenge: 'Nov 1–30', product: 'Pickup at the studio' }[up.type] || 'This week',
    price: up.price || (up.type === 'class' ? '$28 · first class free' : up.type === 'event' ? '$15' : 'Free'), host: 'Maya Okafor', views: 0, saves: 0, trend: 6,
    tags: [...on('goal'), ...on('audience').filter(a => a !== 'Adults')], img: up.file && up.file.img, isNew: true, status: 'live', from: up.file && up.file.name,
  };
}
function surfacesFor(it) {
  const s = [['Near you · Kitsilano', it.setting === 'online' ? 0 : 2400]];
  it.cats.forEach(c => s.push([`Because you like ${CAT[c].name.toLowerCase()}`, 1850 - s.length * 300]));
  if (it.level === 'beginner') s.push(['Beginner-friendly picks', 1320]);
  if (it.setting === 'online') s.push(['At-home workouts', 1640]);
  if ((it.tags || []).includes('Meet people')) s.push(['Meet people while you move', 980]);
  s.push(['Your 3,412 followers', 3412]);
  return s.filter(x => x[1] > 0);
}
function viewBizUpload() {
  if (!state.up) newUpload();
  const up = state.up;
  if (up.published) return bizShell(uploadDone());
  const it = upItem();
  const left = up.stage === 'pick' ? `
    <div class="form-card"><h3><span class="stepn">1</span>Add your content</h3>
      <label class="drop" id="drop" for="file-in"><span class="ic">${ic('upload')}</span><h3>Drop a photo, video or file</h3><span class="muted" style="font-size:14px">or <span style="color:var(--accent-ink);font-weight:650">browse your computer</span>. Photos show up exactly as you upload them.</span><input type="file" id="file-in" accept="image/*,video/*,.pdf,.doc,.docx" hidden></label>
      <div><div class="lbl-s" style="margin-bottom:8px">Or use something from your camera roll</div><div class="samples">${SAMPLE_FILES.map((f, i) => `<button class="sample" data-act="up-sample" data-i="${i}">${ic(f.kind === 'video' ? 'video' : f.kind === 'image' ? 'image' : 'doc')}<span>${esc(f.file)}</span></button>`).join('')}</div></div>
    </div>` : `
    <div class="picked">${it.img ? `<div class="media"><img src="${it.img}" alt=""></div>` : media(it, { bare: true })}<div style="min-width:0"><b style="font-family:ui-monospace,Menlo,monospace;font-size:13px;word-break:break-all">${esc(up.file.name)}</b><br><small class="faint">${esc(up.file.size || '')}</small></div><button class="btn btn-ghost btn-sm" data-act="up-reset">Replace</button></div>
    <div class="form-card"><h3><span class="stepn">2</span>Describe it</h3>
      <div class="field-l"><span class="lbl-s">Type</span><div class="segc">${['video', 'class', 'event', 'program', 'challenge', 'article', 'product'].map(t => `<button class="chip ${up.type === t ? 'on' : ''}" data-act="up-type" data-t="${t}">${t === 'article' ? 'Article' : TYPES[t].label}</button>`).join('')}</div></div>
      <div class="field-l"><label for="up-title">Title</label><input class="inp" id="up-title" data-up="title" value="${esc(up.title)}" placeholder="What is it, in plain words?"></div>
      <div class="field-l"><label for="up-desc">Description</label><textarea class="inp" id="up-desc" data-up="desc" placeholder="Who is it for, and what will they do?">${esc(up.desc)}</textarea></div>
      ${['class', 'event', 'program', 'product'].includes(up.type) ? `<div class="two"><div class="field-l"><label for="up-when">When</label><input class="inp" id="up-when" data-up="when" value="${esc(up.when)}" placeholder="${esc(it.when)}"></div><div class="field-l"><label for="up-price">Price</label><input class="inp" id="up-price" data-up="price" value="${esc(up.price)}" placeholder="${esc(it.price)}"></div></div>` : ''}
    </div>
    <div class="ai-box" id="ai-box">${aiBox()}</div>
    <div style="display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap"><button class="btn btn-ghost" data-act="up-draft">Save as draft</button><button class="btn btn-primary btn-lg" data-act="up-publish" ${up.analyzing || !up.title ? 'disabled' : ''}>Publish to Memo ${ic('bolt')}</button></div>`;
  return bizShell(`<div class="fade-in">
    <div class="b-head"><div><h1>Upload content</h1><p>Add it once. Memo tags it, organizes it and shows it to the right members.</p></div></div>
    <div class="up-grid"><div style="display:grid;gap:18px;min-width:0">${left}</div>
      <aside class="phone" id="phone">${phonePreview(it)}</aside></div>
  </div>`);
}
function aiBox() {
  const up = state.up;
  if (up.analyzing) return `<div class="thinking">${logoMark(22)}Memo is reading your content<span class="dots"><i></i><i></i><i></i></span></div>`;
  const dl = { activity: 'Activity', level: 'Level', goal: 'Goal', audience: 'Audience', location: 'Location' };
  return `<div class="ai-head"><b>${logoMark(22)}Memo suggested these tags</b><span class="faint" style="font-size:12.5px">Tap to turn off. Updates as you type.</span></div>
    ${Object.entries(up.tags).map(([d, ts]) => `<div class="tag-dim"><span>${dl[d]}</span><div class="chips">${ts.map((t, i) => `<button class="stag ${t.on ? '' : 'off'}" data-act="up-tag" data-d="${d}" data-i="${i}" style="animation-delay:${i * .06}s">${esc(t.l)}${t.custom ? '' : ` <span class="conf num">${t.c}%</span>`}</button>`).join('')}${d === 'goal' ? `<input class="inp" id="up-custom" placeholder="+ Add your own" style="width:140px;padding:6px 12px;border-radius:999px;font-size:13px">` : ''}</div></div>`).join('')}`;
}
function phonePreview(it) {
  const surf = surfacesFor(it);
  return `<div class="lbl-s" style="text-align:center">How customers will see this</div>
    <div class="phone-frame"><div class="phone-screen">
      <div class="ps-top">${logo(20)}<span class="avatar" style="width:28px;height:28px;font-size:11px">A</span></div>
      <div class="ps-body">
        <div class="ps-sec">Near you in Kitsilano</div>
        <div class="hl-card">${card(it, { reason: false })}</div>
        <div class="reason">${ic('spark')}Shown to people who like ${it.cats.map(c => CAT[c].name).join(' & ')}</div>
        <div class="ps-sec" style="margin-top:6px">Picked for you</div>
        ${card(item('t1'))}
      </div>
    </div></div>
    <div class="lbl-s" style="margin-top:6px">Where this will appear</div>
    <div class="surfaces">${surf.map(([l, n]) => `<div class="surface"><b>${l}</b><span>~${fmt(n)}/wk</span></div>`).join('')}</div>`;
}
function refreshUploadPreview() {
  const up = state.up; if (!up || up.stage !== 'details') return;
  up.tags = suggest(up);
  const ai = $('#ai-box'); if (ai) { const f = document.activeElement && document.activeElement.id; ai.innerHTML = aiBox(); if (f === 'up-custom') $('#up-custom')?.focus(); }
  const ph = $('#phone'); if (ph) ph.innerHTML = phonePreview(upItem());
  const pb = $('[data-act="up-publish"]'); if (pb) pb.disabled = !up.title || up.analyzing;
}
function uploadDone() {
  const it = item(state.up.published); const surf = surfacesFor(it);
  return `<div class="fade-in" style="max-width:760px">
    <div class="b-head"><div><span class="pill live"><span class="dot"></span>Live on Memo</span><h1 style="margin-top:10px">${esc(it.title)} is live</h1><p>Memo tagged it, filed it into your library and placed it in ${surf.length} member feeds.</p></div></div>
    <div class="panel publishing">${['Tagged and organized into your library', ...surf.map(([l]) => `Added to “${l}”`)].map((l, i) => `<div class="ln" style="animation-delay:${i * .18}s">${ic('check')}${l}</div>`).join('')}</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:20px"><button class="btn btn-primary btn-lg" data-act="see-as-member" data-id="${it.id}">${ic('eye')} See it in the member app</button><button class="btn btn-ghost btn-lg" data-act="go" data-to="b/content">Go to your library</button><button class="btn btn-ghost btn-lg" data-act="up-again">Upload another</button></div>
  </div>`;
}
function publishUpload(asDraft) {
  const it = upItem(); it.id = 'pub-' + Date.now().toString(36);
  if (asDraft) it.status = 'draft';
  state.published.push(it);
  if (!asDraft) { state.up.published = it.id; state.biz.earned = Math.min(249, state.biz.earned + 0); }
  else { state.up = null; toast('Saved as a draft'); return go('b/content'); }
  save(); render(); window.scrollTo(0, 0);
}

/* ---------- Business profile ---------- */
function viewBizProfile() {
  const b = biz('ringside');
  return bizShell(`<div class="fade-in">
    <div class="b-head"><div><h1>Business profile</h1><p>This is the page members land on from any of your content.</p></div><div class="acts"><button class="btn btn-ghost" data-act="go-member-biz">${ic('eye')} View as a member</button></div></div>
    <div class="prof-edit">
      <form class="form-card" id="prof-form">
        <div class="field-l"><label for="pf-tagline">Tagline</label><input class="inp" id="pf-tagline" data-pf="tagline" value="${esc(b.tagline)}" maxlength="80"></div>
        <div class="field-l"><label for="pf-about">About</label><textarea class="inp" id="pf-about" data-pf="about" rows="5">${esc(b.about)}</textarea></div>
        <div class="field-l"><label for="pf-offer">Offer for new members</label><input class="inp" id="pf-offer" data-pf="offer" value="${esc(b.offer)}"></div>
        <div class="field-l"><span class="lbl-s">Amenities</span><div class="chips">${['Showers', 'Gloves to borrow', 'Bike racks', 'Women-only Sunday session', 'Childminding', 'Parking'].map(a => `<button type="button" class="chip ${b.amenities.includes(a) ? 'on' : ''}" data-act="pf-amen" data-a="${esc(a)}">${esc(a)}</button>`).join('')}</div></div>
        <div style="display:flex;gap:10px"><button class="btn btn-primary" type="submit">Save changes</button><button class="btn btn-ghost" type="button" data-act="pf-reset">Reset</button></div>
      </form>
      <div class="prof-preview" id="prof-preview">${profPreview(b)}</div>
    </div>
  </div>`);
}
function profPreview(b) {
  return `<div class="bp-cover">${poster(b.id + 'cover', b.cats[0], { wide: true })}</div><div class="pp-body"><div class="pp-head"><span class="mono lg" style="background:${b.color}">${b.mono}</span><div><h3>${esc(b.name)}</h3><span class="muted" style="font-size:13px">${esc(b.kind)} · <span class="stars">★</span> ${b.rating}</span></div></div>
    <p class="tl">${esc(b.tagline)}</p><p class="ab">${esc(b.about)}</p>${b.offer ? `<div class="offer">${ic('gift')}${esc(b.offer)}</div>` : ''}<div class="chips" style="margin-top:12px">${b.amenities.map(a => `<span class="pill">${esc(a)}</span>`).join('')}</div></div>`;
}

/* ---------- Plan ---------- */
function viewBizPlan() {
  const B = state.biz;
  return bizShell(`<div class="fade-in">
    <div class="b-head"><div><h1>Plan & billing</h1><p>Simple monthly plans. Storage beyond 15 GB is billed separately at cost.</p></div></div>
    <div class="plans">${PLANS.map(p => planCard2(p, B.plan === p.id, { act: 'set-plan', current: B.plan })).join('')}</div>
    <div class="panel" style="margin-top:22px"><div class="ph"><h3>Storage</h3><span class="num muted" style="font-size:13.5px">9.2 GB of 15 GB used</span></div>
      <div class="meter" style="height:10px;margin-bottom:18px"><i style="width:61%"></i></div>
      <div class="storage">${STORAGE_TIERS.map((t, i) => `<div class="stier ${i === 0 ? 'on' : ''}"><b>${t.name}</b><span>${t.range}</span><em class="num">${t.price}</em></div>`).join('')}</div>
      <p class="faint" style="font-size:12.5px;margin-top:12px">Video is stored at full quality. You’ll get a heads-up before you reach your limit.</p></div>
  </div>`);
}
