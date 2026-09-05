# Project screenshot integration

Use only approved screenshots from the actual project. Place files in the matching
project directory, using descriptive lowercase names such as `screen-name-01.webp`.
Prefer WebP; PNG is acceptable when needed for UI clarity. These are naming
patterns, not files that currently exist.

Import each actual file from `src/data/projects.js` using a relative static import.
Use that imported URL in `media: [{ type: 'image', src, alt, caption }]`.
Describe the actual visible screen in alt text; captions are optional.
Do not insert guessed paths or fabricated screen descriptions.

Keep `media: []` while assets are pending. One image displays without slider
controls; two or more enable manual Swiper navigation. Set `mediaLayout` to
`portrait` for Chemviro, or `landscape` for web projects. Images use contain sizing
to preserve UI content. Keep GitHub and live URLs independent of media.
