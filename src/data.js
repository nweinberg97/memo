/* Memo — mock ecosystem.
   Everything here is fictional sample data set in Vancouver, BC.
   Businesses keep one identity everywhere they appear. */

const CATS = [
  { id: 'running',   name: 'Running',   blurb: 'Clubs, routes and form tips' },
  { id: 'strength',  name: 'Strength',  blurb: 'Lift, carry, get capable' },
  { id: 'boxing',    name: 'Boxing',    blurb: 'Pads, bags and footwork' },
  { id: 'yoga',      name: 'Yoga',      blurb: 'Flow, breath, slow down' },
  { id: 'pilates',   name: 'Pilates',   blurb: 'Reformer and mat' },
  { id: 'cycling',   name: 'Cycling',   blurb: 'Studio rides and seawall loops' },
  { id: 'hiking',    name: 'Hiking',    blurb: 'North Shore trails' },
  { id: 'dance',     name: 'Dance',     blurb: 'Cardio you won’t notice' },
  { id: 'mobility',  name: 'Mobility',  blurb: 'Move better, ache less' },
  { id: 'recovery',  name: 'Recovery',  blurb: 'Sauna, plunge, rest' },
  { id: 'sports',    name: 'Rec sports',blurb: 'Drop-in leagues and pickup' },
  { id: 'nutrition', name: 'Nutrition', blurb: 'Fuel for how you move' },
];
const CAT = Object.fromEntries(CATS.map(c => [c.id, c]));

/* Colour pairs for the illustration system: [deep, bright] */
const PALETTES = {
  running:   ['#0D5A75', '#7BE0D4'],
  strength:  ['#17303D', '#2DD4BF'],
  boxing:    ['#2B1A22', '#F0604E'],
  yoga:      ['#352A63', '#E8A5C9'],
  pilates:   ['#6E3B2E', '#F3C9B4'],
  cycling:   ['#123F57', '#F6B83F'],
  hiking:    ['#1B4A37', '#A4D57E'],
  dance:     ['#561D4C', '#FF8F6B'],
  mobility:  ['#0E4F55', '#A9EADF'],
  recovery:  ['#0A2C3B', '#62C6EA'],
  sports:    ['#1A3866', '#F2685A'],
  nutrition: ['#2C5A2A', '#EBCB4E'],
};

const TYPES = {
  class:     { label: 'Class',     cta: 'Book a spot' },
  video:     { label: 'Video',     cta: 'Watch now' },
  event:     { label: 'Event',     cta: 'Join' },
  program:   { label: 'Program',   cta: 'Start program' },
  challenge: { label: 'Challenge', cta: 'Join challenge' },
  article:   { label: 'Read',      cta: 'Read article' },
  product:   { label: 'Product',   cta: 'Reserve' },
  place:     { label: 'Place',     cta: 'Plan a visit' },
};

const BUSINESSES = {
  ringside: {
    id: 'ringside', name: 'Ringside Kitsilano', kind: 'Boxing & conditioning studio',
    hood: 'Kitsilano', address: '2nd floor, 2190 W 4th Ave', cats: ['boxing', 'strength'],
    color: '#F0604E', mono: 'RK', rating: 4.9, reviews: 212, followers: 3412, since: 2019, dist: 0.6,
    tagline: 'Boxing for people who never thought they’d box.',
    about: 'A small, loud, friendly boxing gym above the bakery on West 4th. Most members walked in having never thrown a punch. Coaches teach technique first, conditioning second, and everyone holds pads for everyone.',
    offer: 'First class free for Memo members',
    team: [
      { name: 'Maya Okafor', role: 'Founder & head coach', note: '12 years coaching, ex-provincial team' },
      { name: 'Hana Sato', role: 'Fundamentals coach', note: 'Runs every beginner class' },
      { name: 'Leo Fontaine', role: 'Strength & conditioning', note: 'CSCS, former rugby S&C' },
    ],
    amenities: ['Showers', 'Gloves to borrow', 'Bike racks', 'Women-only Sunday session'],
    schedule: [
      { day: 'Mon', time: '6:00 am', title: 'Fight Camp Conditioning', spots: 4, item: 'r3' },
      { day: 'Tue', time: '6:30 pm', title: 'Boxing Fundamentals', spots: 6, item: 'r1' },
      { day: 'Wed', time: '6:00 am', title: 'Fight Camp Conditioning', spots: 2, item: 'r3' },
      { day: 'Thu', time: '6:30 pm', title: 'Boxing Fundamentals', spots: 3, item: 'r1' },
      { day: 'Fri', time: '6:00 am', title: 'Fight Camp Conditioning', spots: 7, item: 'r3' },
      { day: 'Sat', time: '10:00 am', title: 'Open Gym + Pad Work', spots: 11, item: 'r4' },
    ],
    quotes: [
      { who: 'Priya S.', text: 'I was terrified for about four minutes. Hana makes it feel like everyone started yesterday.' },
      { who: 'Marcus T.', text: 'Best conditioning in Kits, and nobody cares how coordinated you are.' },
      { who: 'Jen W.', text: 'Found them on Memo through a jump rope video. Six months later I’m here three times a week.' },
    ],
  },
  tideline: {
    id: 'tideline', name: 'Tideline Run Club', kind: 'Social run club',
    hood: 'Kits Beach', address: 'Meets at the Kits Beach concession', cats: ['running'],
    color: '#2BB8A8', mono: 'TR', rating: 4.8, reviews: 341, followers: 5120, since: 2017, dist: 1.1,
    tagline: 'Run a little, talk a lot, coffee after.',
    about: 'A free, no-drop run club on the Kits seawall. Pace groups from 7:30/km to 4:45/km, a sweeper at the back every week, and a standing coffee order at the end.',
    offer: 'Always free. Just show up.',
    team: [{ name: 'Sam Whitford', role: 'Club captain', note: 'Has never missed a Thursday' }],
    amenities: ['No-drop pace groups', 'Bag check', 'Post-run coffee'],
    schedule: [
      { day: 'Thu', time: '6:15 pm', title: 'Social 5K + Coffee', spots: 60, item: 't1' },
      { day: 'Sun', time: '7:00 am', title: 'Sunrise Stanley Park Loop', spots: 30, item: 't4' },
    ],
    quotes: [{ who: 'Alex R.', text: 'Moved to Vancouver knowing nobody. Now half my friends are from Thursday nights.' }],
  },
  saltwater: {
    id: 'saltwater', name: 'Saltwater Yoga', kind: 'Yoga & breathwork',
    hood: 'Mount Pleasant', address: '311 E Broadway', cats: ['yoga', 'mobility'],
    color: '#8B6FD6', mono: 'SY', rating: 4.9, reviews: 188, followers: 2870, since: 2016, dist: 3.4,
    tagline: 'Unhurried yoga in a room full of plants.',
    about: 'Small classes, warm room, no mirrors. Saltwater is known for its slow flows and a Friday sound bath that sells out by Tuesday.',
    offer: '$40 for your first two weeks',
    team: [{ name: 'Ana Lucía Reyes', role: 'Founder & lead teacher', note: 'E-RYT 500' }],
    amenities: ['Mats provided', 'Tea after class'],
    schedule: [
      { day: 'Daily', time: '7:30 pm', title: 'Slow Flow & Breath', spots: 8, item: 's1' },
      { day: 'Tue', time: '6:00 am', title: 'Power Vinyasa', spots: 5, item: 's4' },
    ],
    quotes: [{ who: 'Dana K.', text: 'The slow flow is the only hour of my week where my brain goes quiet.' }],
  },
  formflow: {
    id: 'formflow', name: 'Form & Flow Pilates', kind: 'Reformer studio',
    hood: 'Gastown', address: '58 Water St', cats: ['pilates', 'mobility'],
    color: '#D9826A', mono: 'FF', rating: 4.8, reviews: 156, followers: 1990, since: 2020, dist: 4.8,
    tagline: 'Reformer Pilates, taught properly.',
    about: 'Eight reformers, a big window onto Water Street, and instructors who will adjust your springs before you have to ask.',
    offer: 'Intro pack: 3 classes for $75',
    team: [{ name: 'Nora Lindqvist', role: 'Studio lead', note: 'Comprehensively certified, 9 years teaching' }],
    amenities: ['Grip socks for sale', 'Lockers'],
    schedule: [{ day: 'Mon–Sat', time: '7:00 am', title: 'Reformer Foundations', spots: 2, item: 'f1' }],
    quotes: [{ who: 'Sofia L.', text: 'Finally a studio that explains why, not just what.' }],
  },
  northshore: {
    id: 'northshore', name: 'Northshore Trail Collective', kind: 'Guided hikes & trail running',
    hood: 'North Vancouver', address: 'Meets at Lynn Canyon Park lot', cats: ['hiking', 'running'],
    color: '#5FA866', mono: 'NT', rating: 4.9, reviews: 97, followers: 2240, since: 2018, dist: 14.2,
    tagline: 'Get to know the mountains you can see from your window.',
    about: 'Certified guides leading small groups on North Shore trails, from first-ever hikes to the Baden-Powell. Carpools leave from Kits and Commercial Drive.',
    offer: 'Carpool from Kits included',
    team: [{ name: 'Devon Harte', role: 'Lead guide', note: 'ACMG hiking guide, wilderness first aid' }],
    amenities: ['Carpools', 'Poles to borrow', 'Small groups (max 10)'],
    schedule: [{ day: 'Sat', time: '9:00 am', title: 'Lynn Canyon Beginner Hike', spots: 4, item: 'n1' }],
    quotes: [{ who: 'Theo M.', text: 'Lived here 6 years and had never been past the suspension bridge. Devon fixed that.' }],
  },
  coastline: {
    id: 'coastline', name: 'Coastline Mobility', kind: 'Physio-led mobility coaching',
    hood: 'Fairview', address: '1240 W Broadway + online', cats: ['mobility', 'recovery'],
    color: '#3FB6B0', mono: 'CM', rating: 5.0, reviews: 64, followers: 4310, since: 2021, dist: 2.2,
    tagline: 'Ten minutes a day for a body that doesn’t creak.',
    about: 'Priya Raman is a registered physiotherapist who got tired of seeing the same desk-job injuries. Her short routines are built for real schedules.',
    offer: 'Free 15-min movement screen',
    team: [{ name: 'Priya Raman', role: 'Physiotherapist', note: 'MPT, 10 years clinical' }],
    amenities: ['Online programs', 'In-person clinics'],
    schedule: [{ day: 'Wed', time: '12:15 pm', title: 'Hip & Spine Mobility Clinic', spots: 5, item: 'c3' }],
    quotes: [{ who: 'Ravi P.', text: 'Her desk reset is the only stretching routine I have stuck with.' }],
  },
  rhythm: {
    id: 'rhythm', name: 'Rhythm House', kind: 'Dance fitness studio',
    hood: 'Chinatown', address: '233 Keefer St', cats: ['dance'],
    color: '#E26BA8', mono: 'RH', rating: 4.7, reviews: 129, followers: 3060, since: 2018, dist: 5.6,
    tagline: 'Cardio disguised as a party.',
    about: 'Dance cardio, hip-hop and heels classes for people with no dance background. Lights low, music loud, nobody watching.',
    offer: 'Bring a friend free on Fridays',
    team: [{ name: 'Talia Brooks', role: 'Choreographer & founder', note: 'Toured with three Canadian artists' }],
    amenities: ['Lights-down classes', 'Change rooms'],
    schedule: [{ day: 'Fri', time: '7:00 pm', title: 'Dance Cardio Party', spots: 9, item: 'd1' }],
    quotes: [{ who: 'Mei C.', text: 'I burned more calories than spin and laughed the whole time.' }],
  },
  spoke: {
    id: 'spoke', name: 'Spoke & Sea', kind: 'Indoor cycling & group rides',
    hood: 'Olympic Village', address: '1 Athletes Way', cats: ['cycling'],
    color: '#E9A93A', mono: 'S&', rating: 4.8, reviews: 211, followers: 2650, since: 2019, dist: 3.1,
    tagline: 'Ride inside when it rains. Ride the seawall when it doesn’t.',
    about: 'A 30-bike studio with the best playlists in False Creek, plus free Sunday group rides that start from the front door.',
    offer: 'First ride $10',
    team: [{ name: 'Jun Park', role: 'Head instructor', note: 'Former cat 2 road racer' }],
    amenities: ['Shoe rental', 'Bike storage'],
    schedule: [{ day: 'Daily', time: '5:45 pm', title: 'Rhythm Ride 45', spots: 6, item: 'y1' }],
    quotes: [{ who: 'Kyle B.', text: 'Jun’s playlists alone are worth it.' }],
  },
  stillwater: {
    id: 'stillwater', name: 'Still Water Bathhouse', kind: 'Sauna, cold plunge & massage',
    hood: 'Kitsilano', address: '1855 W 1st Ave', cats: ['recovery'],
    color: '#4BA3D9', mono: 'SW', rating: 4.9, reviews: 402, followers: 6020, since: 2022, dist: 0.9,
    tagline: 'Hot, cold, rest. Repeat.',
    about: 'Wood-fired sauna, two cold plunges and a quiet room, a block from the water. Social sessions on weekends, silent sessions on weekday mornings.',
    offer: 'Weekday morning circuit $35',
    team: [{ name: 'Elliot Grant', role: 'Owner', note: 'RMT' }],
    amenities: ['Towels included', 'Silent sessions'],
    schedule: [{ day: 'Daily', time: '7:00 am', title: 'Sauna + Cold Plunge Circuit', spots: 10, item: 'w1' }],
    quotes: [{ who: 'Hannah O.', text: 'My Sunday reset. Bring a friend and go after the run club.' }],
  },
  goodfuel: {
    id: 'goodfuel', name: 'Good Fuel Kitchen', kind: 'Sports nutrition & meal prep',
    hood: 'Fairview', address: '2780 Granville St', cats: ['nutrition'],
    color: '#C9A93A', mono: 'GF', rating: 4.7, reviews: 88, followers: 1840, since: 2020, dist: 2.6,
    tagline: 'Dietitian-designed meals for people who train.',
    about: 'Weekly meal boxes and short, practical nutrition guides from registered dietitian Elena Marsh. Pick up in Fairview or delivered west of Main.',
    offer: '15% off your first box',
    team: [{ name: 'Elena Marsh', role: 'Registered dietitian', note: 'RD, sports nutrition' }],
    amenities: ['Pickup or delivery'],
    schedule: [],
    quotes: [{ who: 'Owen F.', text: 'Stopped skipping breakfast before 6 am classes. Game changer.' }],
  },
  pitch: {
    id: 'pitch', name: 'Pitch Pickup', kind: 'Drop-in rec sports',
    hood: 'Citywide', address: 'Fields across Vancouver', cats: ['sports'],
    color: '#5677D6', mono: 'PP', rating: 4.6, reviews: 173, followers: 3880, since: 2015, dist: 1.4,
    tagline: 'Show up, get put on a team, play.',
    about: 'Drop-in ultimate, volleyball and soccer for adults who want to play without committing to a whole season (unless they want to).',
    offer: 'First drop-in free',
    team: [{ name: 'Marisol Vega', role: 'League organizer', note: 'Runs 14 weekly games' }],
    amenities: ['Pinnies provided', 'All skill levels'],
    schedule: [{ day: 'Tue', time: '7:00 pm', title: 'Co-ed Ultimate Drop-in', spots: 8, item: 'p1' }],
    quotes: [{ who: 'Ben A.', text: 'The easiest way to meet people in this city.' }],
  },
};

/* Content items. dist = km from the member (who lives in Kitsilano). */
const ITEMS = [
  // Ringside Kitsilano
  { id: 'r1', biz: 'ringside', type: 'class', title: 'Boxing Fundamentals', cats: ['boxing', 'strength'], level: 'beginner', setting: 'indoor', social: 'group', dur: 50, when: 'Tue & Thu · 6:30 pm', price: '$28 · first class free', host: 'Hana Sato', views: 9420, saves: 812, trend: 8,
    desc: 'Stance, footwork, the jab-cross and how to hold pads for a partner. No experience, no gloves and no fitness baseline needed. Most people in this class are on their first or second visit.' },
  { id: 'r2', biz: 'ringside', type: 'video', title: 'The 6-punch combo, slowed down', cats: ['boxing'], level: 'beginner', setting: 'online', social: 'solo', dur: 8, when: '8 min video', price: 'Free', host: 'Maya Okafor', views: 21800, saves: 1930, trend: 9,
    desc: 'Maya breaks the combination into three pairs, then shows the common mistake on each. Shadowbox along in your living room.' },
  { id: 'r3', biz: 'ringside', type: 'class', title: 'Fight Camp Conditioning', cats: ['strength', 'boxing'], level: 'intermediate', setting: 'indoor', social: 'group', dur: 45, when: 'Mon, Wed, Fri · 6:00 am', price: '$28', host: 'Leo Fontaine', views: 6100, saves: 402, trend: 5,
    desc: 'Bag rounds, sled pushes and bodyweight circuits in three-minute rounds. Hard, but scaled for whoever shows up.' },
  { id: 'r4', biz: 'ringside', type: 'event', title: 'Saturday Open Gym + Pad Work', cats: ['boxing'], level: 'all', setting: 'indoor', social: 'group', dur: 90, when: 'Sat, Oct 10 · 10:00 am', price: '$15', host: 'Maya Okafor', views: 3900, saves: 288, trend: 4,
    desc: 'Coaches float around the floor while you work. Partner up for pads, ask questions, try the heavy bag. Coffee from the bakery downstairs after.' },
  { id: 'r5', biz: 'ringside', type: 'program', title: '4 Weeks: Jab to Confidence', cats: ['boxing', 'strength'], level: 'beginner', setting: 'indoor', social: 'group', dur: 50, when: 'Starts Oct 19 · 8 classes', price: '$180', host: 'Hana Sato', views: 5200, saves: 640, trend: 6,
    desc: 'Eight coached classes with the same small group, ending in light technical sparring for anyone who wants it. Built for complete beginners.' },
  { id: 'r6', biz: 'ringside', type: 'video', title: 'Jump rope for people who hate jump rope', cats: ['strength', 'boxing'], level: 'beginner', setting: 'online', social: 'solo', dur: 12, when: '12 min video', price: 'Free', host: 'Leo Fontaine', views: 33400, saves: 2710, trend: 10,
    desc: 'Rope length, wrist position and a 10-minute interval routine that builds from 20-second rounds. Works in a small apartment.' },
  { id: 'r7', biz: 'ringside', type: 'article', title: 'What your first boxing class is actually like', cats: ['boxing'], level: 'beginner', setting: 'indoor', social: 'group', dur: 4, when: '4 min read', price: 'Free', host: 'Hana Sato', views: 7700, saves: 590, trend: 5,
    desc: 'What to wear, what you’ll do in the first ten minutes, and why nobody is going to hit you. Written for people who are nervous about walking in.' },
  { id: 'r8', biz: 'ringside', type: 'challenge', title: 'October 1,000 Punch Challenge', cats: ['boxing', 'strength'], level: 'all', setting: 'online', social: 'group', dur: 10, when: 'Oct 1–31 · 412 joined', price: 'Free', host: 'Ringside coaches', views: 11200, saves: 980, trend: 9,
    desc: 'Throw 1,000 punches a day for a month, broken into ten one-minute rounds. Post your streak; finishers get a free class.' },

  // Tideline Run Club
  { id: 't1', biz: 'tideline', type: 'event', title: 'Thursday Social 5K + Coffee', cats: ['running'], level: 'beginner', setting: 'outdoor', social: 'group', dur: 45, when: 'Every Thu · 6:15 pm · Kits Beach', price: 'Free', host: 'Sam Whitford', views: 28400, saves: 3120, trend: 10,
    desc: 'A no-drop 5K along the Kits seawall with pace groups for everyone, including walkers. Most people stay for coffee at the concession afterward.' },
  { id: 't2', biz: 'tideline', type: 'program', title: 'Couch to Seawall 10K', cats: ['running'], level: 'beginner', setting: 'outdoor', social: 'group', dur: 30, when: '8 weeks · 3 runs a week', price: 'Free', host: 'Sam Whitford', views: 15600, saves: 2280, trend: 8,
    desc: 'A run-walk plan that ends with the full seawall loop from Kits to Granville Island and back. One run a week is with the club.' },
  { id: 't3', biz: 'tideline', type: 'video', title: 'Running form check in 5 minutes', cats: ['running', 'mobility'], level: 'all', setting: 'online', social: 'solo', dur: 5, when: '5 min video', price: 'Free', host: 'Sam Whitford', views: 12100, saves: 1040, trend: 6,
    desc: 'Film yourself on your phone, then check these four things: cadence, arm swing, foot strike and posture.' },
  { id: 't4', biz: 'tideline', type: 'event', title: 'Sunrise Stanley Park Loop', cats: ['running'], level: 'intermediate', setting: 'outdoor', social: 'group', dur: 70, when: 'Sun, Oct 11 · 7:00 am', price: 'Free', host: 'Sam Whitford', views: 8300, saves: 760, trend: 6,
    desc: 'A 10K around the park at conversational pace, timed so you see the sun come up over the harbour.' },

  // Saltwater Yoga
  { id: 's1', biz: 'saltwater', type: 'class', title: 'Slow Flow & Breath', cats: ['yoga', 'recovery'], level: 'beginner', setting: 'indoor', social: 'group', dur: 60, when: 'Daily · 7:30 pm', price: '$24', host: 'Ana Lucía Reyes', views: 14200, saves: 1610, trend: 7,
    desc: 'Long holds, simple sequences and ten minutes of breathwork to close. Lights low. Good after a long day or a hard workout.' },
  { id: 's2', biz: 'saltwater', type: 'video', title: '15-minute yoga for tight hips', cats: ['yoga', 'mobility'], level: 'beginner', setting: 'online', social: 'solo', dur: 15, when: '15 min video', price: 'Free', host: 'Ana Lucía Reyes', views: 41200, saves: 4870, trend: 9,
    desc: 'Six poses for hips that sit all day or run all week. No props needed; a cushion helps.' },
  { id: 's3', biz: 'saltwater', type: 'event', title: 'Full Moon Yin + Sound Bath', cats: ['yoga', 'recovery'], level: 'all', setting: 'indoor', social: 'group', dur: 90, when: 'Fri, Oct 16 · 8:00 pm', price: '$38', host: 'Ana Lucía Reyes', views: 9800, saves: 1290, trend: 7,
    desc: 'Yin postures held for five minutes each, followed by forty minutes of singing bowls. Usually sells out by midweek.' },
  { id: 's4', biz: 'saltwater', type: 'class', title: 'Power Vinyasa', cats: ['yoga', 'strength'], level: 'intermediate', setting: 'indoor', social: 'group', dur: 60, when: 'Tue & Thu · 6:00 am', price: '$24', host: 'Ana Lucía Reyes', views: 6200, saves: 510, trend: 4,
    desc: 'A strong, sweaty flow with arm balances offered (never required). Expect to work.' },

  // Form & Flow Pilates
  { id: 'f1', biz: 'formflow', type: 'class', title: 'Reformer Foundations', cats: ['pilates'], level: 'beginner', setting: 'indoor', social: 'group', dur: 50, when: 'Mon–Sat · 7:00 am', price: 'Intro: 3 for $75', host: 'Nora Lindqvist', views: 11300, saves: 1380, trend: 7,
    desc: 'Learn the machine: springs, footwork, the hundred and safe setup. Max eight people so the instructor can adjust everyone.' },
  { id: 'f2', biz: 'formflow', type: 'video', title: 'Mat Pilates core in 20', cats: ['pilates', 'strength'], level: 'all', setting: 'online', social: 'solo', dur: 20, when: '20 min video', price: 'Free', host: 'Nora Lindqvist', views: 18900, saves: 2100, trend: 7,
    desc: 'A full mat sequence with modifications for each exercise. All you need is a towel and some floor.' },
  { id: 'f3', biz: 'formflow', type: 'article', title: 'Reformer or mat: where should you start?', cats: ['pilates'], level: 'beginner', setting: 'indoor', social: 'solo', dur: 5, when: '5 min read', price: 'Free', host: 'Nora Lindqvist', views: 4100, saves: 380, trend: 3,
    desc: 'An honest comparison of cost, difficulty and what each one is good for, from someone who teaches both.' },

  // Northshore Trail Collective
  { id: 'n1', biz: 'northshore', type: 'event', title: 'Lynn Canyon Beginner Hike', cats: ['hiking'], level: 'beginner', setting: 'outdoor', social: 'group', dur: 180, when: 'Sat, Oct 10 · 9:00 am · 6 km', price: '$20', host: 'Devon Harte', views: 10400, saves: 1450, trend: 8,
    desc: 'A gentle 6 km loop past the 30 Foot Pool and the suspension bridge, with a guide who knows every tree. Carpool from Kits included.' },
  { id: 'n2', biz: 'northshore', type: 'event', title: 'Trail Running 101: Baden-Powell', cats: ['running', 'hiking'], level: 'intermediate', setting: 'outdoor', social: 'group', dur: 120, when: 'Sun, Oct 18 · 8:00 am', price: '$35', host: 'Devon Harte', views: 5600, saves: 690, trend: 5,
    desc: 'Downhill technique, footing on roots and how to pace climbs. For road runners comfortable with 10K.' },
  { id: 'n3', biz: 'northshore', type: 'article', title: 'What to pack for a North Shore hike in October', cats: ['hiking'], level: 'beginner', setting: 'outdoor', social: 'solo', dur: 6, when: '6 min read', price: 'Free', host: 'Devon Harte', views: 8900, saves: 1320, trend: 6,
    desc: 'The ten essentials, adjusted for shorter days, wet roots and the first snow on the higher trails.' },
  { id: 'n4', biz: 'northshore', type: 'program', title: 'Grouse Grind training block', cats: ['hiking', 'strength'], level: 'intermediate', setting: 'outdoor', social: 'group', dur: 60, when: '6 weeks · 2 sessions a week', price: '$120', host: 'Devon Harte', views: 4700, saves: 520, trend: 4,
    desc: 'Stair intervals, leg strength and two guided practice climbs, ending with a timed Grind.' },

  // Coastline Mobility
  { id: 'c1', biz: 'coastline', type: 'video', title: 'Desk-body reset: 10 minutes', cats: ['mobility'], level: 'beginner', setting: 'online', social: 'solo', dur: 10, when: '10 min video', price: 'Free', host: 'Priya Raman', views: 52300, saves: 6010, trend: 10,
    desc: 'Neck, upper back and hips, in that order. Priya designed it to be done in work clothes next to your desk.' },
  { id: 'c2', biz: 'coastline', type: 'program', title: 'Mobility for Runners', cats: ['mobility', 'running'], level: 'all', setting: 'online', social: 'solo', dur: 15, when: '4 weeks · 15 min a day', price: '$49', host: 'Priya Raman', views: 9700, saves: 1180, trend: 6,
    desc: 'Ankles, hips and calves. A short daily routine that pairs with any training plan.' },
  { id: 'c3', biz: 'coastline', type: 'class', title: 'Hip & Spine Mobility Clinic', cats: ['mobility', 'recovery'], level: 'beginner', setting: 'indoor', social: 'group', dur: 45, when: 'Wed · 12:15 pm', price: '$22', host: 'Priya Raman', views: 3400, saves: 330, trend: 3,
    desc: 'A lunch-hour small-group class with a physio. Bring a question about whatever is bugging you.' },
  { id: 'c4', biz: 'coastline', type: 'article', title: 'Stretching vs. mobility: what actually helps', cats: ['mobility'], level: 'beginner', setting: 'online', social: 'solo', dur: 5, when: '5 min read', price: 'Free', host: 'Priya Raman', views: 7200, saves: 810, trend: 4,
    desc: 'What the research says about static stretching, and what to do instead before a workout.' },

  // Rhythm House
  { id: 'd1', biz: 'rhythm', type: 'class', title: 'Dance Cardio Party', cats: ['dance'], level: 'beginner', setting: 'indoor', social: 'group', dur: 50, when: 'Fri · 7:00 pm', price: '$22 · friend free', host: 'Talia Brooks', views: 13800, saves: 1560, trend: 8,
    desc: 'Simple choreography to loud music in a dark room. Built for people who say they can’t dance.' },
  { id: 'd2', biz: 'rhythm', type: 'video', title: 'Learn a 32-count combo in 10 minutes', cats: ['dance'], level: 'beginner', setting: 'online', social: 'solo', dur: 10, when: '10 min video', price: 'Free', host: 'Talia Brooks', views: 24600, saves: 2240, trend: 8,
    desc: 'Four eight-counts, taught slow, then at speed. Clear the coffee table.' },
  { id: 'd3', biz: 'rhythm', type: 'event', title: 'Hip-Hop Foundations Workshop', cats: ['dance'], level: 'beginner', setting: 'indoor', social: 'group', dur: 120, when: 'Sun, Oct 18 · 1:00 pm', price: '$45', host: 'Talia Brooks', views: 4800, saves: 610, trend: 5,
    desc: 'Grooves, bounce and rock, then a short routine you can film at the end if you want to.' },

  // Spoke & Sea
  { id: 'y1', biz: 'spoke', type: 'class', title: 'Rhythm Ride 45', cats: ['cycling'], level: 'all', setting: 'indoor', social: 'group', dur: 45, when: 'Daily · 5:45 pm', price: '$26 · first ride $10', host: 'Jun Park', views: 10900, saves: 980, trend: 6,
    desc: 'Climbs and sprints on the beat, with a resistance range that works for first-timers and racers on the same playlist.' },
  { id: 'y2', biz: 'spoke', type: 'event', title: 'Sunday Seawall Group Ride', cats: ['cycling'], level: 'beginner', setting: 'outdoor', social: 'group', dur: 120, when: 'Sun, Oct 11 · 9:00 am · 30 km', price: 'Free', host: 'Jun Park', views: 7600, saves: 940, trend: 6,
    desc: 'A relaxed no-drop loop from Olympic Village around Stanley Park and back, with a coffee stop at English Bay.' },
  { id: 'y3', biz: 'spoke', type: 'video', title: 'Set up your bike so your knees stop hurting', cats: ['cycling', 'mobility'], level: 'beginner', setting: 'online', social: 'solo', dur: 9, when: '9 min video', price: 'Free', host: 'Jun Park', views: 8800, saves: 1010, trend: 4,
    desc: 'Saddle height, setback and cleat position, checked with a tape measure and a friend.' },

  // Still Water Bathhouse
  { id: 'w1', biz: 'stillwater', type: 'place', title: 'Sauna + Cold Plunge Circuit', cats: ['recovery'], level: 'all', setting: 'indoor', social: 'solo', dur: 90, when: 'Open daily · 7 am–10 pm', price: '$45 · weekday AM $35', host: 'Still Water', views: 26100, saves: 3550, trend: 9,
    desc: 'Three rounds of wood-fired sauna, cold plunge and rest. Towels, robes and tea included.' },
  { id: 'w2', biz: 'stillwater', type: 'article', title: 'Contrast therapy: what the research actually says', cats: ['recovery'], level: 'all', setting: 'indoor', social: 'solo', dur: 7, when: '7 min read', price: 'Free', host: 'Elliot Grant, RMT', views: 9100, saves: 1120, trend: 5,
    desc: 'What hot-cold cycling does and doesn’t do for soreness, sleep and mood, with sources.' },
  { id: 'w3', biz: 'stillwater', type: 'event', title: 'Post-Run Recovery Night with Tideline', cats: ['recovery', 'running'], level: 'all', setting: 'indoor', social: 'group', dur: 90, when: 'Wed, Oct 14 · 7:30 pm', price: '$30', host: 'Still Water × Tideline', views: 5900, saves: 820, trend: 7,
    desc: 'Run the Kits loop with Tideline, then walk two blocks to a members-only sauna session. Showers on site.' },

  // Good Fuel Kitchen
  { id: 'g1', biz: 'goodfuel', type: 'product', title: 'Pre-Training Fuel Box', cats: ['nutrition'], level: 'all', setting: 'indoor', social: 'solo', dur: 0, when: '5 meals · pickup Sundays', price: '$64', host: 'Elena Marsh, RD', views: 6400, saves: 710, trend: 5,
    desc: 'Five dietitian-designed meals timed around training: two breakfasts, two lunches and a dinner. Rotates weekly.' },
  { id: 'g2', biz: 'goodfuel', type: 'article', title: 'What to eat before a 6 am class', cats: ['nutrition'], level: 'beginner', setting: 'online', social: 'solo', dur: 4, when: '4 min read', price: 'Free', host: 'Elena Marsh, RD', views: 11800, saves: 1890, trend: 6,
    desc: 'Three options that take under two minutes and won’t sit in your stomach.' },
  { id: 'g3', biz: 'goodfuel', type: 'video', title: '3 high-protein breakfasts in 10 minutes', cats: ['nutrition'], level: 'beginner', setting: 'online', social: 'solo', dur: 10, when: '10 min video', price: 'Free', host: 'Elena Marsh, RD', views: 14300, saves: 2050, trend: 6,
    desc: 'Overnight oats, a savoury egg wrap and a smoothie with real staying power.' },

  // Pitch Pickup
  { id: 'p1', biz: 'pitch', type: 'event', title: 'Co-ed Ultimate Drop-in', cats: ['sports'], level: 'beginner', setting: 'outdoor', social: 'group', dur: 90, when: 'Every Tue · 7:00 pm · Kitsilano Park', price: '$8 · first free', host: 'Marisol Vega', views: 9300, saves: 1060, trend: 7,
    desc: 'Teams are made on the spot, rules explained in two minutes, and nobody keeps score very seriously.' },
  { id: 'p2', biz: 'pitch', type: 'event', title: 'Beginner Volleyball Night', cats: ['sports'], level: 'beginner', setting: 'indoor', social: 'group', dur: 120, when: 'Every Thu · 8:00 pm · Kits Community Centre', price: '$10', host: 'Marisol Vega', views: 6700, saves: 720, trend: 5,
    desc: 'Twenty minutes of drills, then rotating games. Knee pads available to borrow.' },
  { id: 'p3', biz: 'pitch', type: 'program', title: 'Winter Rec Soccer League', cats: ['sports'], level: 'all', setting: 'outdoor', social: 'group', dur: 60, when: '10 weeks · starts Nov 3', price: '$95', host: 'Marisol Vega', views: 4200, saves: 450, trend: 4,
    desc: 'Sign up solo or with friends. Seven-a-side, turf fields, every Tuesday night.' },
];

/* Ringside's extra library items that only the business sees as drafts / raw */
const DRAFTS = [
  { id: 'rd1', biz: 'ringside', type: 'video', title: 'Hand wraps in 90 seconds', cats: ['boxing'], level: 'beginner', setting: 'online', social: 'solo', dur: 2, when: '2 min video', price: 'Free', host: 'Hana Sato', views: 0, saves: 0, trend: 0, status: 'draft',
    desc: 'How to wrap your hands so your knuckles and wrists are protected. Filmed on the studio floor.' },
];

/* Sample files a business "already has" — used in onboarding and upload */
const SAMPLE_FILES = [
  { file: 'IMG_4021.MOV', size: '84 MB', kind: 'video', guess: { type: 'video', title: 'Heavy bag basics with Maya', cats: ['boxing'], level: 'beginner', desc: 'Maya shows how to stand, where to hit and how to breathe on the heavy bag.' } },
  { file: 'class schedule FALL final v3.pdf', size: '1.2 MB', kind: 'doc', guess: { type: 'class', title: 'Ladies Boxing Sunday', cats: ['boxing', 'strength'], level: 'beginner', desc: 'A women-only fundamentals class every Sunday morning with Hana. Gloves provided.' } },
  { file: 'insta_reel_0312.mp4', size: '22 MB', kind: 'video', guess: { type: 'video', title: 'Footwork ladder drill', cats: ['boxing', 'mobility'], level: 'all', desc: 'A 3-minute footwork drill you can do with tape on your kitchen floor.' } },
  { file: 'saturday open gym poster.png', size: '3.4 MB', kind: 'image', guess: { type: 'event', title: 'Halloween Pad Work Party', cats: ['boxing'], level: 'all', desc: 'Costumes encouraged, pads mandatory. Open gym with music and prizes.' } },
  { file: 'leo_hiit_circuit_notes.docx', size: '240 KB', kind: 'doc', guess: { type: 'article', title: 'A 20-minute conditioning circuit you can do anywhere', cats: ['strength'], level: 'intermediate', desc: 'Leo’s go-to bodyweight circuit for travel weeks and rainy days.' } },
  { file: 'IMG_3988.jpg', size: '5.1 MB', kind: 'image', guess: { type: 'class', title: 'Teen Boxing (13–17)', cats: ['boxing'], level: 'beginner', desc: 'Technique-first boxing for teenagers, no contact. Parents welcome to watch.' } },
];

/* Personas for quick demoing */
const PERSONAS = [
  { id: 'social-runner', label: 'Running + Outdoors + Social', interests: ['running', 'hiking', 'sports'], level: 'regular', setting: 'outdoors', company: 'social', time: 'mid' },
  { id: 'gentle-reset', label: 'Yoga + Recovery + Beginner', interests: ['yoga', 'recovery', 'mobility'], level: 'new', setting: 'mix', company: 'solo', time: 'short' },
  { id: 'boxing-curious', label: 'Boxing-curious', interests: ['boxing', 'strength', 'dance'], level: 'new', setting: 'indoors', company: 'social', time: 'mid' },
];

/* Business analytics (Ringside, last 30 days) */
function seeded(n) { let s = n; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
const BIZ_SERIES = (() => {
  const r = seeded(7); const views = [], saves = [];
  for (let i = 0; i < 30; i++) {
    const weekend = (i % 7 === 5 || i % 7 === 6) ? 0.78 : 1;
    const v = Math.round((380 + i * 9.5 + r() * 120) * weekend + (i > 22 ? 120 : 0));
    views.push(v); saves.push(Math.round(v * (0.06 + r() * 0.025)));
  }
  return { views, saves };
})();

const LEADS = [
  { who: 'Ava M.', what: 'Booked Boxing Fundamentals · Thu 6:30 pm', from: 'Because you like Strength', when: '12 min ago', kind: 'booking' },
  { who: 'Daniel K.', what: 'Asked about the 4-week program', from: 'Search: “boxing beginner”', when: '1 hr ago', kind: 'enquiry' },
  { who: 'Sophie L.', what: 'Joined the 1,000 Punch Challenge', from: 'Trending in Vancouver', when: '3 hr ago', kind: 'join' },
  { who: 'Raj P.', what: 'Booked Open Gym + Pad Work', from: 'Near you · Kitsilano', when: 'Yesterday', kind: 'booking' },
  { who: 'Emily C.', what: 'Followed Ringside Kitsilano', from: 'Jump rope video', when: 'Yesterday', kind: 'follow' },
  { who: 'Noah B.', what: 'Booked Fight Camp Conditioning · Mon 6 am', from: 'Because you like Running', when: '2 days ago', kind: 'booking' },
];

const PLANS = [
  { id: 'trial', name: 'Trial Run', price: 'Free', per: 'until Memo earns you $250', summary: 'Everything in Basic. Start without a card; you move to Basic automatically once bookings through Memo reach $250.',
    features: ['Content organization', 'Distribution to member feeds', 'Live data and analytics', 'Content recommendations'] },
  { id: 'basic', name: 'Basic', price: '$250', per: 'per month', summary: 'For studios that want their existing content working for them every week.',
    features: ['Content organization', 'Distribution to member feeds', 'Live data and analytics', 'Recommendations for what to post next', 'Lead inbox'] },
  { id: 'premium', name: 'Premium', price: '$1,000', per: 'per month', summary: 'For businesses launching products, programs and partnerships.',
    features: ['Everything in Basic', 'Special feeds: Discover, New, Featured, Product Launches', 'Beta-test product placements', 'Fitness challenge features', 'Content consulting', 'Branded partnerships'] },
];

const STORAGE_TIERS = [
  { name: 'Standard', range: 'Up to 15 GB', price: 'Free' },
  { name: 'Upgrade', range: '15–100 GB', price: '$2/mo' },
  { name: 'Double Up', range: '100–200 GB', price: '$3/mo' },
  { name: 'Max', range: '2 TB+', price: '$12/mo' },
];
