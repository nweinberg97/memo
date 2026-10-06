/* Memo illustration system.
   Every piece of content gets a poster built from the deck's motifs:
   layered wave bands, bubble clusters, and a line-drawn activity glyph. */

const GLYPHS = {
  strength: '<path d="M37 44 Q37 22 50 22 Q63 22 63 44"/><circle cx="50" cy="64" r="21"/><path d="M42 64 h16"/>',
  boxing: '<path d="M33 46 Q31 26 50 25 L60 25 Q76 25 76 44 L76 60 Q76 74 61 74 L44 74 Q33 74 33 62 Z"/><path d="M33 50 Q23 51 26 61 Q28 66 36 64"/><path d="M41 74 L41 84 L69 84 L69 74"/><path d="M47 38 Q56 34 66 38"/>',
  running: '<circle cx="61" cy="20" r="7"/><path d="M57 31 L46 54"/><path d="M38 38 L54 34 L68 46"/><path d="M46 54 L61 66 L55 84"/><path d="M46 54 L35 70 L21 70"/>',
  yoga: '<circle cx="50" cy="18" r="7"/><path d="M50 28 L50 58"/><path d="M50 36 L36 14 M50 36 L64 14"/><path d="M50 58 L50 86"/><path d="M50 62 L62 70 L50 76"/>',
  pilates: '<circle cx="31" cy="38" r="7"/><path d="M36 47 L52 68"/><path d="M52 68 L80 44"/><path d="M42 54 L70 40"/><path d="M14 80 H86"/>',
  cycling: '<circle cx="28" cy="64" r="16"/><circle cx="74" cy="64" r="16"/><path d="M28 64 L44 38 L66 38 L74 64 M44 38 L52 64 L28 64 M52 64 L66 38"/><path d="M40 32 H50 M62 30 L68 30"/>',
  hiking: '<path d="M8 82 L36 36 L50 56 L64 38 L92 82"/><path d="M28 50 L36 44 L42 52"/><circle cx="74" cy="20" r="8"/>',
  dance: '<circle cx="46" cy="18" r="7"/><path d="M47 28 L52 56"/><path d="M50 36 L28 26 M50 36 L72 42"/><path d="M52 56 L40 84"/><path d="M52 56 L78 62"/>',
  mobility: '<circle cx="62" cy="20" r="7"/><path d="M58 30 Q44 46 48 62"/><path d="M54 38 Q70 30 80 14"/><path d="M48 62 L30 84 M48 62 L66 84"/><path d="M14 84 H86"/>',
  recovery: '<path d="M30 70 Q24 58 30 48 Q36 38 30 26"/><path d="M50 70 Q44 58 50 48 Q56 38 50 26"/><path d="M70 70 Q64 58 70 48 Q76 38 70 26"/><path d="M14 82 Q32 74 50 82 Q68 90 86 82"/>',
  sports: '<circle cx="50" cy="50" r="30"/><path d="M50 20 V80 M20 50 H80"/><path d="M29 29 Q42 50 29 71 M71 29 Q58 50 71 71"/>',
  nutrition: '<path d="M16 52 H84 Q82 80 50 82 Q18 80 16 52 Z"/><path d="M50 50 Q42 30 56 16 Q66 32 50 50"/><path d="M50 50 L54 30"/>',
};

function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return Math.abs(h); }
function rng(seed) { let s = seed % 2147483647; if (s <= 0) s += 2147483646; return () => (s = s * 16807 % 2147483647) / 2147483647; }

function wavePath(w, y, amp, len, phase) {
  let d = `M -20 ${y}`;
  for (let x = -20; x <= w + 40; x += len) {
    d += ` Q ${x + len / 4 + phase} ${y - amp} ${x + len / 2 + phase} ${y} T ${x + len + phase} ${y}`;
  }
  return d;
}

/* poster(seed, cat, opts) -> SVG string, 400x300 viewBox, scales to fill */
function poster(seed, cat, opts = {}) {
  const [deep, bright] = PALETTES[cat] || PALETTES.running;
  const r = rng(hashStr(seed + cat));
  const W = opts.wide ? 1000 : 400, H = opts.tall ? 500 : 300;
  const id = 'p' + hashStr(seed).toString(36);
  const ang = Math.round(r() * 60 + 20);
  // waves
  let waves = '';
  const bands = 3;
  for (let i = 0; i < bands; i++) {
    const y = H * (0.35 + i * 0.22) + r() * 30;
    const amp = 18 + r() * 26;
    const len = 150 + r() * 110;
    const ph = r() * 80;
    const op = (0.12 + i * 0.09).toFixed(2);
    waves += `<path d="${wavePath(W, y, amp, len, ph)} L ${W + 40} ${H + 20} L -20 ${H + 20} Z" fill="${bright}" opacity="${op}"/>`;
  }
  // bubbles
  let bubbles = '';
  const cx = r() < 0.5 ? 40 + r() * 90 : W - 130 + r() * 90, cy = 30 + r() * 60;
  const sizes = [11, 7, 5, 4, 3, 2.5];
  sizes.forEach((s, i) => {
    const bx = cx + Math.cos(i * 1.9 + r()) * (12 + i * 7), by = cy + Math.sin(i * 1.9 + r()) * (10 + i * 6);
    bubbles += `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="${s}" fill="${bright}" opacity="${(0.55 + r() * 0.35).toFixed(2)}"/>`;
  });
  // glyph
  const gs = (opts.tall ? 2.1 : 1.45) + r() * 0.3;
  const gx = W * (opts.wide ? 0.78 : 0.52 + (r() - 0.5) * 0.22) - 50 * gs, gy = H * (opts.tall ? 0.4 : 0.4) - 50 * gs + (r() - 0.5) * 16;
  const glyph = `<g transform="translate(${gx.toFixed(1)} ${gy.toFixed(1)}) scale(${gs.toFixed(2)})" fill="none" stroke="#fff" stroke-opacity=".94" stroke-width="${(6 / gs * 1.4).toFixed(2)}" stroke-linecap="round" stroke-linejoin="round">${GLYPHS[cat] || GLYPHS.running}</g>`;
  return `<svg class="poster" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs><linearGradient id="${id}" gradientTransform="rotate(${ang} .5 .5)"><stop offset="0" stop-color="${deep}"/><stop offset="1" stop-color="${mix(deep, bright, 0.45)}"/></linearGradient></defs>
<rect width="${W}" height="${H}" fill="url(#${id})"/>${waves}${bubbles}${glyph}</svg>`;
}

function mix(a, b, t) {
  const pa = [1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16)), pb = [1, 3, 5].map(i => parseInt(b.slice(i, i + 2), 16));
  return '#' + pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, '0')).join('');
}

/* The Memo mark, rebuilt from the deck: a teal speech-bubble form with three
   echo layers trailing left (motion), and the dark zig-zag "M" line. */
function logoMark(size = 32) {
  const body = 'M66 8 C92 8 112 27 112 52 C112 77 92 96 66 96 L44 96 C26 96 18 78 18 52 C18 27 34 8 54 8 Z';
  return `<svg class="mark" width="${Math.round(size * 1.2)}" height="${size}" viewBox="0 0 120 100" aria-hidden="true">
<path d="${body}" transform="translate(-14 0)" fill="#2CC6B4" opacity=".18"/>
<path d="${body}" transform="translate(-9 0)" fill="#2CC6B4" opacity=".3"/>
<path d="${body}" transform="translate(-4.5 0)" fill="#2CC6B4" opacity=".5"/>
<path d="${body}" fill="#2CC6B4"/>
<path d="M36 64 L52 42 L66 60 L80 42 L94 64" fill="none" stroke="#0B6F67" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
function logo(size = 30) {
  return `<span class="logo">${logoMark(size)}<span class="wordmark" style="font-size:${Math.round(size * 0.82)}px">MEMO</span></span>`;
}

/* Decorative bubble cluster, as in the deck footer */
function bubbleCluster(cls = '') {
  return `<svg class="bubbles ${cls}" viewBox="0 0 120 90" aria-hidden="true"><circle cx="54" cy="46" r="15"/><circle cx="26" cy="30" r="8"/><circle cx="86" cy="54" r="10"/><circle cx="22" cy="72" r="10"/><circle cx="70" cy="14" r="5"/><circle cx="64" cy="82" r="5"/><circle cx="60" cy="42" r="3" class="hi"/><circle cx="90" cy="51" r="2" class="hi"/></svg>`;
}
