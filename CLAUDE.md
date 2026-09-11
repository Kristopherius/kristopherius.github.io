# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern, minimalist portfolio template built with Astro and Tailwind CSS v4. It's designed to be easily customizable through a single configuration file while maintaining a clean, professional appearance.

## Tech Stack

- **Astro**: Static site generator
- **Tailwind CSS v4**: Utility-first CSS framework using the new @tailwindcss/vite plugin
- **TypeScript**: For type-safe configuration
- **Tabler Icons**: Icon library

## Development Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

## Architecture

The project follows a component-based architecture with all customization centralized in `src/config.ts`:

- **Components** (`src/components/`): Individual Astro components for each section (Hero, About, Projects, Games, Experience, Education, Header, Footer)
- **Main Layout** (`src/pages/index.astro`): Single-page layout that imports all components
- **Configuration** (`src/config.ts`): Single source of truth for all content and customization

### Key Architectural Decisions

1. **Single Configuration File**: All content is managed through `src/config.ts` to make customization simple
2. **Conditional Rendering**: Sections automatically hide if their data is removed from the config
3. **Component Independence**: Each section is a self-contained component that reads from the config
4. **Accent Color System**: Single `accentColor` in config propagates throughout the site via CSS custom properties

## Important Implementation Details

- The site uses Tailwind CSS v4 with the Vite plugin configuration
- No linting or testing framework is currently configured
- All components are in `.astro` format (not React/Vue/etc)
- The project uses IBM Plex Mono font loaded from Google Fonts
- Social links in the config are all optional and will conditionally render

## Working with Components

When modifying components:
1. Components read directly from the imported `siteConfig` object
2. Use Tailwind utility classes for styling
3. Maintain the existing monospace font aesthetic
4. Use Tabler Icons for consistency with existing icons

## Configuration Structure

The `src/config.ts` exports a `siteConfig` object with these sections:
- Basic info: name, title, description, accentColor
- Social links: email, linkedin, twitter, github (all optional)
- aboutMe: string
- skills: string[]
- projects: array of {name, description, link, skills}
- games: array of {name, description, embedPath, thumbnail, aspectRatio, controls, skills, dateRange, link}
- experience: array of {company, title, dateRange, bullets}
- education: array of {school, degree, dateRange, achievements}

## Browser Games Section

`Games.astro` renders self-hosted web builds that live in `public/games/<slug>/`.
Each entry's `embedPath` points at the build's entry file; an empty `embedPath`
renders a "Coming soon" placeholder instead. Clicking a cover opens the game in
a player dialog; `aspectRatio` decides that dialog's layout — a landscape build
puts the description below the game and suggests fullscreen, a portrait build
puts it to the right. The iframe is created on open and destroyed on close, and
opening one game tears down any other, so only one WebGL context is ever live.
Class names in this component are `gm-`-prefixed to avoid colliding with the
global `.modal` handlers in `Projects.astro`.

Both `Projects.astro` and `Games.astro` let you move between entries without
closing: `<`/`>` buttons in the dialog header on `sm` and up, a horizontal
swipe on touch, and (projects only) the arrow keys. Each dialog carries its
neighbours as `data-prev`/`data-next`, wrapping at the ends. Two rules matter
when changing this: a swipe over a running game must not navigate, because it
would steal the joystick or look control — the handler ignores touches inside
`.gm-frame`, and touches on the iframe never reach the page anyway; and the
arrow keys are deliberately *not* bound for games, since Perihelion uses them
to move.
See `GAMES.md` for how to add a build, including the Unity WebGL compression
caveat on GitHub Pages.
