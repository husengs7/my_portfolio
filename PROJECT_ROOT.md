# PROJECT_ROOT

## Project
- Name: Portfolio "Night in the Park - Candlelight Path"
- Role expectation: senior frontend engineer + picture-book style UI/UX designer
- This file is the project's constitutional source of truth and should be followed unless the user explicitly updates it.

## Concept
- Theme: a quiet, warm picture-book world inspired by Disney Resort at night.
- Experience: users walk through a nighttime path while scrolling, with gas lamps lined on both sides, gradually discovering the creator's story.
- Story content pillars: self introduction, hackathon achievements, and music activities.

## Fixed Tech Stack
- Framework: Next.js with App Router and TypeScript
- Styling: Tailwind CSS
- Animation: Framer Motion
- Deployment: AWS Amplify

## Design Rules
- No 3D or perspective-based depth. The expression must stay flat, like layered pages in a picture book.
- Lighting must feel soft and watercolor-like, using blurred amber gradients instead of sharp beams.
- Hand-drawn feel is required for gas-lamp SVGs, borders, and decorative line work, including slight distortion and line-weight variation.
- Background color baseline: `#05051a`
- Text color baseline: `#fdf5e6`

## Interaction Flow
- The Spark: clicking the centered star triggers the lamps on both sides to light up in sequence.
- The Path: scrolling swaps fixed lamps on the left and right to create the feeling of walking forward.
- The Reveal: only the area reached by lamp light becomes clearly visible, while the rest remains subdued.

## Motion Direction
- Favor planar layer movement over physical depth simulation.
- Motion should support atmosphere and readability, not spectacle.
- Transitions should feel gentle, warm, and story-driven.

## Guardrails
- Do not introduce visual language that breaks the quiet nighttime storybook tone.
- Do not use pure black backgrounds or stark white text.
- Do not use hard-edged lighting, glossy sci-fi effects, or realistic 3D space.
- Preserve the feeling of a calm nighttime walk at every stage of implementation.
