# PROJECT_ROOT

## Project
- Name: Portfolio "Night in the Park - Candlelight Path"
- Role expectation: senior frontend engineer + picture-book style UI/UX designer
- This file is the constitutional source of truth for the project and should be updated whenever major rules or implementation constraints change.

## Concept
- Core mood: "a quiet park before dawn."
- Visual direction: absolutely preserve a hand-drawn, picture-book texture and avoid mechanical or synthetic-looking effects.
- Story experience: the user lights a small beginning star, enters a candlelit path, and slowly discovers the creator's profile, hackathon work, and music activities.
- Atmosphere priority: warm, hushed, story-driven, watercolor-soft, planar, and gently imperfect.

## Status
- Current deployment target: AWS Amplify.
- Current deployment mode: static export / SSG.
- `next.config.ts` is configured with `output: "export"` and `images.unoptimized: true`.
- Amplify build config exists in `amplify.yml`.
- The page currently contains `Profile`, `Locus`, `Product`, `Work`, and `Sound` sections.
- Profile content includes `Sora Midorikawa / husensan`, Tokyo University of Information Sciences, Tokyo, and drummer activity in `ねずみ幸福論`.

## Fixed Tech Stack
- Framework: Next.js with App Router and TypeScript
- Styling: Tailwind CSS
- Animation: Framer Motion
- Deployment: AWS Amplify

## Fixed Rules
- Star ritual: while `isLit === false`, body scrolling is locked. Tapping the spark unlocks scroll and begins the world-opening sequence.
- Gas lamps: the first two lamps act as the entrance gate and are placed more inward; later lamps are distributed along the path with asymmetry.
- Cloud mist: clouds use deterministic positions and extremely low opacity (`0.03` to `0.08`) so the result reads as "mist" rather than explicit clouds.
- Cloud layer structure: clouds are managed as an independent background layer with low z-index, fixed to the viewport and spread across the full screen so the mist wraps the whole park without clipping at the edges.
- Cloud dual layering: keep a back cloud layer behind the whole park and a separate front cloud layer in the gap between the title area and the self-introduction copy so overlapping haze deepens the atmosphere without using 3D.
- Front cloud duplication: the `CloudWisp` front layer is used around the title/Profile transition and again around the Locus/Product area to preserve the layered haze.
- Constellations: place lightweight hand-drawn amber constellations in the gap between the title and Profile sections. They must sit behind readable content but in front of the deepest background cloud layer, and remain completely static as a picture-book style drawing of stars and connecting lines.
- Constellation placement: distribute the six constellations around the title, Profile, Locus, Product, Work, and Sound transitions so the sky reads as a balanced illustrated star chart while keeping readable content clear.
- Constellation reveal: constellations stay invisible until the first ignition ritual completes. Once `isLit === true`, they fade in gently with a delayed, atmospheric reveal so the star chart appears to emerge from the night sky after the lamps wake up.
- Shooting stars: shooting stars are not a spark-triggered event. Six thin hand-drawn amber streaks appear at staggered intervals in the far background.
- Distant skyline: the `city.png` skyline should hold the bottom of the screen with clear physical presence, using a maximum opacity around `0.7`, a slightly raised horizon position, and modest brightness / contrast tuning so the city reads as a definite nighttime landscape without overpowering the park.
- Layout depth: no perspective-based 3D. All depth must come from layer ordering, parallax, blur, scale, and atmospheric spacing.
- Lighting: keep amber watercolor-like glow, soft gradients, blurred transitions, and reveal-by-light behavior.

## Design Rules
- No 3D or perspective-based depth. The scene must remain flat, like layered pages in a picture book.
- Lighting must feel soft and watercolor-like, using blurred amber gradients instead of sharp beams.
- Hand-drawn feel is required for gas-lamp SVGs, borders, and decorative line work, including slight distortion and uneven line-weight.
- Background color baseline: `#05051a`
- Upper sky baseline: deepen toward `#020212`
- Text color baseline: `#fdf5e6`

## Interaction Flow
- The Spark: clicking the centered star triggers the lamps on both sides to light up in sequence.
- Scroll lock: before the spark is lit, the page should not scroll.
- The Path: after the spark is lit, the user is allowed to progress through the nighttime walk.
- The Reveal: content should feel as if it emerges only when reached by light, mist, or narrative progression.

## Motion Direction
- Favor planar layer movement over physical depth simulation.
- Motion should support atmosphere and readability, not spectacle.
- Transitions should feel gentle, warm, and story-driven.
- Prefer slow, staggered, asynchronous motion over repetitive mechanical loops.
- Current layer concept: front clouds around the title/Profile transition and Locus/Product area, readable content, then back clouds plus ambient shooting stars as the environmental background system.
- Rendering order in practice: ambient shooting stars at the furthest back, then back clouds and starry sky, then static constellations, gas lamps, and readable content.
- Cloud animation is disabled. On small screens, alternate cloud wisps are hidden so each block renders fewer shapes while keeping its configured placement.

## Architecture
- The Profile area is a two-column layout: sticky portrait on the left, profile text on the right.
- Directly below the profile text and the three external links, place a `Locus` heading.
- `Locus` is followed by the `TimelineThread` component, which acts as the formal career / project timeline connected by a central thread.
- `Locus` supports hidden item tags (`internship`, `hackathon`, `lightning-talk`, and `other`) with underlined filter controls ordered as Internship, Hackathon, LT, and Other.
- `Locus` displays 10 timeline items by default and can expand to reveal the remaining entries with a blurred continuation preview.
- `Work` displays event banner cards in one column on mobile and three columns on desktop.
- `Sound` contains embedded SoundCloud and BandLab players.

## Avoid
- Sky lanterns
- Neon-heavy color palettes
- Crisp, hard-edged borders or beams
- Overly automatic or aggressive looping animations
- Glossy sci-fi effects
- Realistic volumetric fog or photo-like cloud rendering

## Guardrails
- Do not introduce visual language that breaks the quiet nighttime storybook tone.
- Do not use pure black backgrounds or stark white text.
- Do not use hard-edged lighting, glossy sci-fi effects, or realistic 3D space.
- Preserve the feeling of a calm nighttime walk at every stage of implementation.

## Next Steps
- Keep timeline entries, event links, and profile details synchronized with the portfolio.
- Continue refining responsive spacing and reveal timing without changing the quiet picture-book atmosphere.
- Recheck AWS Amplify static-export behavior when adding or renaming public assets.
