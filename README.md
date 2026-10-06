# Memo — product prototype

Memo is a discovery layer for movement: members get a personalized feed of local classes, clubs, videos and studios; businesses upload the content they already have and Memo organizes and distributes it to the right people.

This repo is a fully clickable, front-end-only prototype with two connected demos and sample data set in Vancouver.

## Run it

No build step needed for development. Open `index.html` in a browser (or serve the folder, e.g. `python3 -m http.server`).

To produce single-file builds:

```
python3 scripts/build.py
```

- `dist/index.html` — standalone single file, opens anywhere
- `dist/artifact.html` — same app without the document shell, for publishing as a Claude artifact

## What's in it

**Member demo**
- Onboarding: pick interests, then level / setting / company / time, or start from a persona
- Personalized feed: top pick, "Picked for you", Near you (map), Quick picks swipe deck, "Because you like…", Trending, Outside your usual
- Explore by activity and collections, with filters
- Search across activities, studios, content and coaches (`/` to open)
- Content detail with "Why you're seeing this", booking/join sheets, video playback, articles
- Business profiles with schedule, content, team and reviews
- Saved, Plans, Following, and a profile page where interest changes re-rank the feed instantly

**Business demo** (sample business: Ringside Kitsilano)
- Onboarding: account, business details, plan (Trial Run / Basic $250 / Premium $1,000), upload, auto-organize, distribution
- Overview: KPIs, views/saves chart, actionable recommendations, where people found you, audience, leads, top content
- Content library with status, tags and performance
- Organize: before/after, confirm-a-tag queue, browse by activity, goal, audience, difficulty, type, location, purpose, instructor
- Upload studio: real image upload or sample files, Memo-suggested tags with confidence, live "How customers will see this" phone preview, publish
- Published content appears in the member feed immediately ("See it as a member")
- Profile editor with live preview, plan and storage tiers

The **Member / Business** switch in the top bar moves between the two; **Reset demo** clears saved state.

## Structure

```
src/data.js      sample ecosystem: 11 businesses, ~47 content items, plans, leads
src/art.js       generative illustration system and the Memo logo (SVG)
src/core.js      state, routing, personalization scoring, shared components, landing
src/member.js    member app views
src/business.js  business studio views
src/main.js      rendering, actions, events, boot
src/styles.css   design tokens (light + dark) and components
```

State lives in memory and is mirrored to `localStorage` for convenience. There is no backend.

## Notes

- Imagery is an illustration system built from the deck's wave and bubble motifs, because the prototype is designed to run without external image hosts. Each item can take a real photo through its `img` field; uploads in the business demo already use the real image.
- All businesses, people and metrics are fictional.
