# Master Dungeon Maker

A web-based D&D dungeon map editor featuring procedural generation, visual theming, encounter building, and an opinionated goblin assistant named Grizzik.

## Features

- **Visual Map Editor** — Grid-based tile placement with walls, rooms, corridors, doors, stairs, traps, and treasure. Zoom, pan, undo/redo, and room drawing tools.
- **Procedural Generation** — BSP (Binary Space Partition) algorithm generates connected dungeon layouts with configurable room count, dimensions, and seeded randomness.
- **8 Visual Themes** — Goblin's Map, Stone Dungeon, Natural Cave, Ice Fortress, Infernal, Ancient Temple, Sewer, and Arcane Library — each with procedural tile textures.
- **D&D 5e Encounters** — Auto-generated encounters per room based on party size, level, and theme. Includes monsters (SRD), loot tables, and traps with DC/damage.
- **Export** — Save as PNG, JSON, or branded printable PDF with Grizzik header/footer and encounter details.
- **Cloud Save & Sharing** — Optional Supabase integration for user accounts, cloud storage, and shareable dungeon links.
- **Grizzik the Cartographer** — A goblin mascot who provides context-aware mapping tips via a chat panel.
- **Background Music** — Ambient dungeon soundtrack with volume control.
- **Editable Dungeon Name** — Rename your dungeon directly from the header bar; syncs everywhere including exports.
- **Intro Screen** — Themed entry screen with Grizzik welcoming new cartographers.

## Getting Started

Open `index.html` in any modern browser — no build step or server required. The app runs entirely client-side.

### Cloud Features (Optional)

To enable user accounts, cloud save, and sharing:

1. Create a free [Supabase](https://supabase.com) project
2. Follow the step-by-step instructions in [SETUP.md](SETUP.md)
3. Add your project URL and anon key to `supabase-config.js`

The app works fully offline without Supabase configured.

## Project Structure

```
├── index.html             # Main HTML + embedded CSS
├── app.js                 # All application logic (classes, rendering, UI)
├── supabase-config.js     # Supabase client configuration
├── auth.js                # Authentication module
├── cloud-save.js          # Cloud CRUD + sharing module
├── data/
│   ├── monsters.js        # D&D SRD monster definitions
│   ├── loot.js            # Loot table tiers
│   └── traps.js           # Trap definitions with DC/damage
├── mascot.png             # Grizzik pixel art
├── head-master dungeon-maker.png  # Header mascot image
├── music.mp3              # Background music (Git LFS)
├── SETUP.md               # Supabase setup guide
├── test-runtime.js        # Runtime tests (jsdom)
└── README.md              # This file
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1`–`7` | Select tile tool |
| `G` | Open generate modal |
| `N` | New dungeon |
| `S` | Save |
| `L` | Load |
| `Z` | Undo |
| `Y` | Redo |
| `+` / `-` | Zoom in / out |
| `Delete` | Erase tile |

## Tech Stack

Vanilla HTML5, CSS, and JavaScript — no frameworks, no build tools. Canvas API for rendering with procedural textures. Optional Supabase for backend services (loaded via CDN).

## License

MIT

---

*Built by Federico — powered by Grizzik's Cartography Guild*
