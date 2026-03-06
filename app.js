// ============================================================
// MASTER DUNGEON MAKER — app.js
// ============================================================

// ---- TILE DEFINITIONS ----
const TILE_TYPES = {
  wall:     { color: '#4a4a6a', label: 'Wall',     icon: '■', variants: ['stone','brick','natural'] },
  room:     { color: '#2a2a4a', label: 'Room',     icon: '□' },
  corridor: { color: '#353555', label: 'Corridor', icon: '▬' },
  door:     { color: '#8B6914', label: 'Door',     icon: '◥', directions: ['north','south','east','west'] },
  stairs:   { color: '#7B4BB3', label: 'Stairs',   icon: '⇱', types: ['up','down'] },
  trap:     { color: '#C0392B', label: 'Trap',     icon: '⚠', variants: ['pit','spike','arrow','magical'] },
  treasure: { color: '#D4AC0D', label: 'Treasure', icon: '♦' },
};

// ---- DUNGEON THEMES ----
const DUNGEON_THEMES = {
  classic: {
    name: 'Goblin\'s Map',
    description: 'Parchment and ink — the goblin cartographer\'s style',
    background: '#1a1815',
    gridLine: 'rgba(212, 200, 168, 0.06)',
    border: '#b89a50',
    tiles: {
      wall:     { base: '#4a3a28', texture: 'brick',  accent: '#3a2a18' },
      room:     { base: '#1f1a14', texture: 'floor',  accent: '#181410' },
      corridor: { base: '#2a241e', texture: 'floor',  accent: '#221e18' },
      door:     { base: '#6a4a2a', texture: 'wood',   accent: '#b89a50' },
      stairs:   { base: '#4a3a28', texture: 'stone',  accent: '#8a7a60' },
      trap:     { base: '#5a2020', texture: 'danger', accent: '#944040' },
      treasure: { base: '#5a4a20', texture: 'gleam',  accent: '#b89a50' },
    }
  },
  stone_dungeon: {
    name: 'Stone Dungeon',
    description: 'Dark stone with moss and cracks',
    background: '#0d0d0d',
    gridLine: 'rgba(255,255,255,0.04)',
    border: '#555',
    tiles: {
      wall:     { base: '#3d3d3d', texture: 'brick',   accent: '#2a2a2a' },
      room:     { base: '#1a1a1a', texture: 'cobble',  accent: '#151515' },
      corridor: { base: '#222222', texture: 'cobble',  accent: '#1c1c1c' },
      door:     { base: '#6b4423', texture: 'wood',    accent: '#8B6633' },
      stairs:   { base: '#444444', texture: 'stone',   accent: '#666666' },
      trap:     { base: '#5a1a1a', texture: 'danger',  accent: '#aa3333' },
      treasure: { base: '#6b5a1a', texture: 'gleam',   accent: '#c9a832' },
    }
  },
  cave: {
    name: 'Natural Cave',
    description: 'Earthy caverns with rocky textures',
    background: '#0a0806',
    gridLine: 'rgba(200,180,150,0.05)',
    border: '#7a6040',
    tiles: {
      wall:     { base: '#4a3a28', texture: 'rock',    accent: '#3a2a18' },
      room:     { base: '#1f1810', texture: 'dirt',    accent: '#181208' },
      corridor: { base: '#2a2018', texture: 'dirt',    accent: '#221a10' },
      door:     { base: '#5a4020', texture: 'wood',    accent: '#7a5a30' },
      stairs:   { base: '#504030', texture: 'rock',    accent: '#8a7a60' },
      trap:     { base: '#5a2a10', texture: 'danger',  accent: '#aa5533' },
      treasure: { base: '#5a4a10', texture: 'gleam',   accent: '#b89a30' },
    }
  },
  ice_fortress: {
    name: 'Ice Fortress',
    description: 'Frozen halls with crystalline walls',
    background: '#060a12',
    gridLine: 'rgba(150,200,255,0.06)',
    border: '#4488cc',
    tiles: {
      wall:     { base: '#2a4a6a', texture: 'crystal', accent: '#1a3a5a' },
      room:     { base: '#0f1a2a', texture: 'ice',     accent: '#0a1520' },
      corridor: { base: '#152030', texture: 'ice',     accent: '#101a28' },
      door:     { base: '#3a6080', texture: 'crystal', accent: '#5a90c0' },
      stairs:   { base: '#2a4060', texture: 'crystal', accent: '#6aa0d0' },
      trap:     { base: '#1a3050', texture: 'danger',  accent: '#4488cc' },
      treasure: { base: '#2a4a3a', texture: 'gleam',   accent: '#5ac8a0' },
    }
  },
  infernal: {
    name: 'Infernal',
    description: 'Volcanic fortress with lava cracks',
    background: '#0a0404',
    gridLine: 'rgba(255,100,50,0.05)',
    border: '#cc3300',
    tiles: {
      wall:     { base: '#2a1010', texture: 'volcanic', accent: '#1a0808' },
      room:     { base: '#150808', texture: 'charred',  accent: '#100505' },
      corridor: { base: '#1a0a0a', texture: 'charred',  accent: '#140808' },
      door:     { base: '#6a2010', texture: 'metal',    accent: '#cc4420' },
      stairs:   { base: '#3a1515', texture: 'volcanic', accent: '#aa4040' },
      trap:     { base: '#4a0a0a', texture: 'lava',     accent: '#ff4400' },
      treasure: { base: '#4a3010', texture: 'gleam',    accent: '#ffaa30' },
    }
  },
  ancient_temple: {
    name: 'Ancient Temple',
    description: 'Sandstone ruins with ornate patterns',
    background: '#0a0a06',
    gridLine: 'rgba(200,180,120,0.06)',
    border: '#b89a50',
    tiles: {
      wall:     { base: '#6a5a3a', texture: 'sandstone', accent: '#5a4a2a' },
      room:     { base: '#2a2418', texture: 'tile',      accent: '#221e12' },
      corridor: { base: '#302a1e', texture: 'tile',      accent: '#282218' },
      door:     { base: '#8a6a30', texture: 'ornate',    accent: '#c9a050' },
      stairs:   { base: '#5a4a30', texture: 'sandstone', accent: '#a08a50' },
      trap:     { base: '#5a3020', texture: 'danger',    accent: '#cc6633' },
      treasure: { base: '#6a5a20', texture: 'gleam',     accent: '#e8c840' },
    }
  },
  shadowfell: {
    name: 'Shadowfell',
    description: 'Eerie purple-grey dimension of dread',
    background: '#08060a',
    gridLine: 'rgba(180,150,220,0.05)',
    border: '#6a4a8a',
    tiles: {
      wall:     { base: '#2a2035', texture: 'shadow',  accent: '#1a1025' },
      room:     { base: '#12101a', texture: 'mist',    accent: '#0e0c15' },
      corridor: { base: '#181420', texture: 'mist',    accent: '#14101c' },
      door:     { base: '#4a3060', texture: 'shadow',  accent: '#7a50a0' },
      stairs:   { base: '#302040', texture: 'shadow',  accent: '#8060a0' },
      trap:     { base: '#3a1030', texture: 'danger',  accent: '#aa30aa' },
      treasure: { base: '#2a2040', texture: 'gleam',   accent: '#8a70c0' },
    }
  },
  feywild: {
    name: 'Feywild',
    description: 'Enchanted groves with living walls',
    background: '#040a06',
    gridLine: 'rgba(100,220,150,0.06)',
    border: '#30aa60',
    tiles: {
      wall:     { base: '#1a3a20', texture: 'vine',    accent: '#0a2a10' },
      room:     { base: '#0a1a0e', texture: 'moss',    accent: '#081408' },
      corridor: { base: '#0e200e', texture: 'moss',    accent: '#0a1a0a' },
      door:     { base: '#3a6a30', texture: 'vine',    accent: '#5aaa50' },
      stairs:   { base: '#204a28', texture: 'vine',    accent: '#50aa60' },
      trap:     { base: '#2a3a10', texture: 'danger',  accent: '#80aa20' },
      treasure: { base: '#2a4a20', texture: 'gleam',   accent: '#70cc50' },
    }
  },
};

// ---- TEXTURE RENDERER (procedural patterns drawn on canvas) ----
class TextureRenderer {
  constructor() {
    // Simple hash for deterministic "random" per tile
    this._hash = (x, y, s) => {
      let h = (x * 374761393 + y * 668265263 + s * 1274126177) | 0;
      h = ((h ^ (h >> 13)) * 1103515245) | 0;
      return ((h ^ (h >> 16)) & 0x7fffffff) / 0x7fffffff;
    };
  }

  // Draw textured tile at screen position
  drawTile(ctx, sx, sy, ts, tileType, themeId, gx, gy) {
    const theme = DUNGEON_THEMES[themeId] || DUNGEON_THEMES.classic;
    const tileTheme = theme.tiles[tileType];
    if (!tileTheme) {
      // Fallback to basic TILE_TYPES color
      const def = TILE_TYPES[tileType];
      ctx.fillStyle = def ? def.color : '#333';
      ctx.fillRect(sx, sy, ts, ts);
      return;
    }

    // Base fill
    ctx.fillStyle = tileTheme.base;
    ctx.fillRect(sx, sy, ts, ts);

    // Apply texture based on type
    const tex = tileTheme.texture;
    const accent = tileTheme.accent;
    const h = this._hash;

    if (tex === 'stone' || tex === 'sandstone') {
      this._drawStoneTexture(ctx, sx, sy, ts, gx, gy, accent, tileTheme.base);
    } else if (tex === 'brick') {
      this._drawBrickTexture(ctx, sx, sy, ts, gx, gy, accent);
    } else if (tex === 'cobble') {
      this._drawCobbleTexture(ctx, sx, sy, ts, gx, gy, accent);
    } else if (tex === 'floor' || tex === 'tile') {
      this._drawFloorTexture(ctx, sx, sy, ts, gx, gy, accent, tex === 'tile');
    } else if (tex === 'dirt') {
      this._drawDirtTexture(ctx, sx, sy, ts, gx, gy, accent);
    } else if (tex === 'rock') {
      this._drawRockTexture(ctx, sx, sy, ts, gx, gy, accent);
    } else if (tex === 'wood' || tex === 'ornate') {
      this._drawWoodTexture(ctx, sx, sy, ts, gx, gy, accent, tex === 'ornate');
    } else if (tex === 'crystal' || tex === 'ice') {
      this._drawCrystalTexture(ctx, sx, sy, ts, gx, gy, accent, tex === 'ice');
    } else if (tex === 'volcanic' || tex === 'charred' || tex === 'lava') {
      this._drawVolcanicTexture(ctx, sx, sy, ts, gx, gy, accent, tex);
    } else if (tex === 'metal') {
      this._drawMetalTexture(ctx, sx, sy, ts, gx, gy, accent);
    } else if (tex === 'shadow' || tex === 'mist') {
      this._drawShadowTexture(ctx, sx, sy, ts, gx, gy, accent, tex === 'mist');
    } else if (tex === 'vine' || tex === 'moss') {
      this._drawVineTexture(ctx, sx, sy, ts, gx, gy, accent, tex === 'moss');
    } else if (tex === 'danger') {
      this._drawDangerTexture(ctx, sx, sy, ts, gx, gy, accent);
    } else if (tex === 'gleam') {
      this._drawGleamTexture(ctx, sx, sy, ts, gx, gy, accent);
    }
  }

  // -- Stone: irregular cracks and roughness --
  _drawStoneTexture(ctx, sx, sy, ts, gx, gy, accent, base) {
    const h = this._hash;
    // Random speckles
    for (let i = 0; i < 6; i++) {
      const px = sx + h(gx, gy, i * 7) * ts;
      const py = sy + h(gx, gy, i * 7 + 1) * ts;
      const sz = 1 + h(gx, gy, i * 7 + 2) * ts * 0.08;
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.3 + h(gx, gy, i * 7 + 3) * 0.3;
      ctx.fillRect(px, py, sz, sz);
    }
    // Cracks
    if (h(gx, gy, 99) > 0.6) {
      ctx.strokeStyle = accent;
      ctx.globalAlpha = 0.25;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      const cx = sx + h(gx, gy, 100) * ts * 0.6 + ts * 0.2;
      const cy = sy + h(gx, gy, 101) * ts * 0.6 + ts * 0.2;
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + (h(gx, gy, 102) - 0.5) * ts * 0.5, cy + (h(gx, gy, 103) - 0.3) * ts * 0.5);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // -- Brick: horizontal+vertical mortar lines --
  _drawBrickTexture(ctx, sx, sy, ts, gx, gy, accent) {
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.4;
    ctx.lineWidth = 0.7;
    // Horizontal mortar
    const midY = sy + ts * 0.5;
    ctx.beginPath();
    ctx.moveTo(sx, midY);
    ctx.lineTo(sx + ts, midY);
    ctx.stroke();
    // Vertical mortar (offset by row)
    const offset = (gy % 2 === 0) ? ts * 0.5 : 0;
    const vx = sx + offset;
    if (vx > sx && vx < sx + ts) {
      ctx.beginPath();
      ctx.moveTo(vx, sy);
      ctx.lineTo(vx, sy + ts * 0.5);
      ctx.stroke();
    }
    const vx2 = sx + offset + ts * 0.5;
    if (vx2 > sx && vx2 < sx + ts) {
      ctx.beginPath();
      ctx.moveTo(vx2, sy + ts * 0.5);
      ctx.lineTo(vx2, sy + ts);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // -- Cobblestone: irregular rounded shapes --
  _drawCobbleTexture(ctx, sx, sy, ts, gx, gy, accent) {
    const h = this._hash;
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.2;
    ctx.lineWidth = 0.5;
    // Draw 2-3 cobble outlines
    for (let i = 0; i < 3; i++) {
      const cx = sx + (0.2 + h(gx, gy, i * 5) * 0.6) * ts;
      const cy = sy + (0.2 + h(gx, gy, i * 5 + 1) * 0.6) * ts;
      const r = ts * (0.12 + h(gx, gy, i * 5 + 2) * 0.12);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // -- Floor: subtle grid or tile pattern --
  _drawFloorTexture(ctx, sx, sy, ts, gx, gy, accent, isTile) {
    const h = this._hash;
    if (isTile) {
      // Ornate tile pattern — diamond inset
      ctx.strokeStyle = accent;
      ctx.globalAlpha = 0.2;
      ctx.lineWidth = 0.5;
      const m = ts * 0.3;
      ctx.beginPath();
      ctx.moveTo(sx + ts * 0.5, sy + m);
      ctx.lineTo(sx + ts - m, sy + ts * 0.5);
      ctx.lineTo(sx + ts * 0.5, sy + ts - m);
      ctx.lineTo(sx + m, sy + ts * 0.5);
      ctx.closePath();
      ctx.stroke();
    } else {
      // Subtle dust/dirt speckles
      for (let i = 0; i < 3; i++) {
        const px = sx + h(gx, gy, i * 3 + 50) * ts;
        const py = sy + h(gx, gy, i * 3 + 51) * ts;
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.15;
        ctx.fillRect(px, py, 1, 1);
      }
    }
    ctx.globalAlpha = 1;
  }

  // -- Dirt: organic speckled ground --
  _drawDirtTexture(ctx, sx, sy, ts, gx, gy, accent) {
    const h = this._hash;
    for (let i = 0; i < 8; i++) {
      const px = sx + h(gx, gy, i * 4 + 30) * ts;
      const py = sy + h(gx, gy, i * 4 + 31) * ts;
      const sz = 0.5 + h(gx, gy, i * 4 + 32) * 1.5;
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.15 + h(gx, gy, i * 4 + 33) * 0.15;
      ctx.beginPath();
      ctx.arc(px, py, sz, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // -- Rock: chunky irregular shapes --
  _drawRockTexture(ctx, sx, sy, ts, gx, gy, accent) {
    const h = this._hash;
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.25;
    // Irregular polygon-ish blobs
    for (let i = 0; i < 2; i++) {
      const cx = sx + (0.15 + h(gx, gy, i * 6 + 40) * 0.7) * ts;
      const cy = sy + (0.15 + h(gx, gy, i * 6 + 41) * 0.7) * ts;
      const r = ts * (0.08 + h(gx, gy, i * 6 + 42) * 0.15);
      ctx.beginPath();
      for (let a = 0; a < 5; a++) {
        const angle = (a / 5) * Math.PI * 2;
        const rr = r * (0.7 + h(gx, gy, i * 6 + a + 43) * 0.6);
        const px = cx + Math.cos(angle) * rr;
        const py = cy + Math.sin(angle) * rr;
        a === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // -- Wood: horizontal grain lines --
  _drawWoodTexture(ctx, sx, sy, ts, gx, gy, accent, ornate) {
    const h = this._hash;
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.3;
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 3; i++) {
      const ly = sy + (0.2 + i * 0.3) * ts + (h(gx, gy, i + 60) - 0.5) * ts * 0.1;
      ctx.beginPath();
      ctx.moveTo(sx + ts * 0.1, ly);
      ctx.quadraticCurveTo(sx + ts * 0.5, ly + (h(gx, gy, i + 63) - 0.5) * ts * 0.15, sx + ts * 0.9, ly);
      ctx.stroke();
    }
    if (ornate) {
      // Add decorative border
      ctx.strokeStyle = accent;
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 1;
      const m = ts * 0.12;
      ctx.strokeRect(sx + m, sy + m, ts - 2 * m, ts - 2 * m);
    }
    ctx.globalAlpha = 1;
  }

  // -- Crystal/Ice: angular shards and glints --
  _drawCrystalTexture(ctx, sx, sy, ts, gx, gy, accent, isIce) {
    const h = this._hash;
    ctx.strokeStyle = accent;
    ctx.globalAlpha = isIce ? 0.15 : 0.25;
    ctx.lineWidth = 0.6;
    // Angular lines
    for (let i = 0; i < (isIce ? 2 : 3); i++) {
      const x1 = sx + h(gx, gy, i * 4 + 70) * ts;
      const y1 = sy + h(gx, gy, i * 4 + 71) * ts;
      const x2 = sx + h(gx, gy, i * 4 + 72) * ts;
      const y2 = sy + h(gx, gy, i * 4 + 73) * ts;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    // Glint
    if (h(gx, gy, 80) > 0.7) {
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.5;
      const gx2 = sx + h(gx, gy, 81) * ts * 0.6 + ts * 0.2;
      const gy2 = sy + h(gx, gy, 82) * ts * 0.6 + ts * 0.2;
      ctx.fillRect(gx2 - 1, gy2, 2, 1);
      ctx.fillRect(gx2, gy2 - 1, 1, 2);
    }
    ctx.globalAlpha = 1;
  }

  // -- Volcanic/Charred/Lava: cracks with glow --
  _drawVolcanicTexture(ctx, sx, sy, ts, gx, gy, accent, subtype) {
    const h = this._hash;
    if (subtype === 'lava') {
      // Glowing cracks
      ctx.strokeStyle = accent;
      ctx.globalAlpha = 0.6;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      let cx = sx + h(gx, gy, 90) * ts;
      let cy = sy + h(gx, gy, 91) * ts * 0.3;
      ctx.moveTo(cx, cy);
      for (let i = 0; i < 3; i++) {
        cx += (h(gx, gy, 92 + i * 2) - 0.5) * ts * 0.4;
        cy += h(gx, gy, 93 + i * 2) * ts * 0.3;
        ctx.lineTo(cx, cy);
      }
      ctx.stroke();
      // Glow halo
      ctx.strokeStyle = accent;
      ctx.globalAlpha = 0.15;
      ctx.lineWidth = 3;
      ctx.stroke();
    } else {
      // Charred/volcanic: dark speckles + occasional ember
      for (let i = 0; i < 5; i++) {
        const px = sx + h(gx, gy, i * 3 + 95) * ts;
        const py = sy + h(gx, gy, i * 3 + 96) * ts;
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.1 + h(gx, gy, i * 3 + 97) * 0.15;
        ctx.fillRect(px, py, 1 + h(gx, gy, i + 98), 1);
      }
      // Ember glow
      if (h(gx, gy, 110) > 0.75) {
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.5;
        const ex = sx + h(gx, gy, 111) * ts * 0.6 + ts * 0.2;
        const ey = sy + h(gx, gy, 112) * ts * 0.6 + ts * 0.2;
        ctx.beginPath();
        ctx.arc(ex, ey, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  // -- Metal: brushed horizontal streaks --
  _drawMetalTexture(ctx, sx, sy, ts, gx, gy, accent) {
    const h = this._hash;
    ctx.strokeStyle = accent;
    ctx.lineWidth = 0.3;
    for (let i = 0; i < 4; i++) {
      ctx.globalAlpha = 0.1 + h(gx, gy, i + 120) * 0.15;
      const ly = sy + (i + 0.5) * ts / 4;
      ctx.beginPath();
      ctx.moveTo(sx, ly);
      ctx.lineTo(sx + ts, ly);
      ctx.stroke();
    }
    // Rivet dots
    if (h(gx, gy, 125) > 0.6) {
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      ctx.arc(sx + ts * 0.2, sy + ts * 0.2, 1, 0, Math.PI * 2);
      ctx.arc(sx + ts * 0.8, sy + ts * 0.8, 1, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // -- Shadow/Mist: swirly translucent patterns --
  _drawShadowTexture(ctx, sx, sy, ts, gx, gy, accent, isMist) {
    const h = this._hash;
    ctx.fillStyle = accent;
    ctx.globalAlpha = isMist ? 0.08 : 0.15;
    // Wispy arc shapes
    for (let i = 0; i < 2; i++) {
      const cx = sx + (0.2 + h(gx, gy, i * 4 + 130) * 0.6) * ts;
      const cy = sy + (0.2 + h(gx, gy, i * 4 + 131) * 0.6) * ts;
      const r = ts * (0.15 + h(gx, gy, i * 4 + 132) * 0.2);
      const startA = h(gx, gy, i * 4 + 133) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, startA, startA + Math.PI * 0.8);
      ctx.strokeStyle = accent;
      ctx.lineWidth = isMist ? 2 : 1;
      ctx.globalAlpha = isMist ? 0.08 : 0.12;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // -- Vine/Moss: organic green tendrils --
  _drawVineTexture(ctx, sx, sy, ts, gx, gy, accent, isMoss) {
    const h = this._hash;
    if (isMoss) {
      // Scattered small circles
      for (let i = 0; i < 5; i++) {
        const px = sx + h(gx, gy, i * 3 + 140) * ts;
        const py = sy + h(gx, gy, i * 3 + 141) * ts;
        const r = 0.5 + h(gx, gy, i * 3 + 142) * 1.5;
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.12 + h(gx, gy, i + 143) * 0.12;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      // Curved vine lines
      ctx.strokeStyle = accent;
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 0.8;
      const startX = sx + h(gx, gy, 150) * ts * 0.3;
      const startY = sy + h(gx, gy, 151) * ts;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.bezierCurveTo(
        sx + ts * 0.3, sy + h(gx, gy, 152) * ts,
        sx + ts * 0.7, sy + h(gx, gy, 153) * ts,
        sx + ts * 0.8 + h(gx, gy, 154) * ts * 0.2, sy + h(gx, gy, 155) * ts
      );
      ctx.stroke();
      // Leaf dot
      if (h(gx, gy, 156) > 0.5) {
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.arc(sx + ts * 0.5, sy + h(gx, gy, 157) * ts, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  // -- Danger: subtle X or cracks --
  _drawDangerTexture(ctx, sx, sy, ts, gx, gy, accent) {
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.15;
    ctx.lineWidth = 0.6;
    // Subtle X
    const m = ts * 0.25;
    ctx.beginPath();
    ctx.moveTo(sx + m, sy + m);
    ctx.lineTo(sx + ts - m, sy + ts - m);
    ctx.moveTo(sx + ts - m, sy + m);
    ctx.lineTo(sx + m, sy + ts - m);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // -- Gleam: sparkle/shine effect --
  _drawGleamTexture(ctx, sx, sy, ts, gx, gy, accent) {
    const h = this._hash;
    // Star sparkle
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.3 + h(gx, gy, 160) * 0.2;
    const cx = sx + ts * (0.3 + h(gx, gy, 161) * 0.4);
    const cy = sy + ts * (0.3 + h(gx, gy, 162) * 0.4);
    const r = ts * 0.06;
    // 4-point star
    ctx.beginPath();
    ctx.moveTo(cx, cy - r * 2);
    ctx.lineTo(cx + r * 0.5, cy - r * 0.5);
    ctx.lineTo(cx + r * 2, cy);
    ctx.lineTo(cx + r * 0.5, cy + r * 0.5);
    ctx.lineTo(cx, cy + r * 2);
    ctx.lineTo(cx - r * 0.5, cy + r * 0.5);
    ctx.lineTo(cx - r * 2, cy);
    ctx.lineTo(cx - r * 0.5, cy - r * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

// ---- DUNGEON CLASS ----
class Dungeon {
  constructor(width = 50, height = 50) {
    this.width = width;
    this.height = height;
    this.tiles = {};
    this.rooms = {};
    this.encounters = {};
    this.metadata = {
      name: 'Untitled Dungeon',
      theme: 'dungeon',
      difficulty: 'medium',
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
      partySize: 4,
      partyLevel: 3,
      seed: null,
    };
    this._nextRoomId = 1;
  }

  key(x, y) { return `${x},${y}`; }

  isValid(x, y) { return x >= 0 && y >= 0 && x < this.width && y < this.height; }

  getTile(x, y) { return this.tiles[this.key(x, y)] || null; }

  setTile(x, y, type, data = {}) {
    if (!this.isValid(x, y)) return;
    if (type === null || type === 'empty') {
      delete this.tiles[this.key(x, y)];
    } else {
      this.tiles[this.key(x, y)] = { type, data: { ...data } };
    }
    this.metadata.modified = new Date().toISOString();
  }

  clearAll() {
    this.tiles = {};
    this.rooms = {};
    this.encounters = {};
    this._nextRoomId = 1;
  }

  addRoom(name, bounds) {
    const id = 'room_' + (this._nextRoomId++);
    this.rooms[id] = { id, name: name || `Room ${this._nextRoomId - 1}`, bounds, description: '' };
    return id;
  }

  getTileCount() { return Object.keys(this.tiles).length; }
  getRoomCount() { return Object.keys(this.rooms).length; }

  clone() {
    const d = new Dungeon(this.width, this.height);
    d.tiles = JSON.parse(JSON.stringify(this.tiles));
    d.rooms = JSON.parse(JSON.stringify(this.rooms));
    d.encounters = JSON.parse(JSON.stringify(this.encounters));
    d.metadata = { ...this.metadata };
    d._nextRoomId = this._nextRoomId;
    return d;
  }

  toJSON() {
    return JSON.stringify({
      version: 1,
      metadata: this.metadata,
      width: this.width,
      height: this.height,
      tiles: this.tiles,
      rooms: this.rooms,
      encounters: this.encounters,
      _nextRoomId: this._nextRoomId,
    }, null, 2);
  }

  static fromJSON(json) {
    const obj = typeof json === 'string' ? JSON.parse(json) : json;
    const d = new Dungeon(obj.width, obj.height);
    d.tiles = obj.tiles || {};
    d.rooms = obj.rooms || {};
    d.encounters = obj.encounters || {};
    d.metadata = { ...d.metadata, ...obj.metadata };
    d._nextRoomId = obj._nextRoomId || 1;
    return d;
  }
}

// ---- HISTORY (UNDO/REDO) ----
class History {
  constructor(maxStates = 50) {
    this.states = [];
    this.index = -1;
    this.max = maxStates;
  }
  save(dungeon) {
    // discard redo states
    this.states = this.states.slice(0, this.index + 1);
    this.states.push(dungeon.clone());
    if (this.states.length > this.max) this.states.shift();
    this.index = this.states.length - 1;
  }
  undo() {
    if (this.index <= 0) return null;
    this.index--;
    return this.states[this.index].clone();
  }
  redo() {
    if (this.index >= this.states.length - 1) return null;
    this.index++;
    return this.states[this.index].clone();
  }
  clear() { this.states = []; this.index = -1; }
}

// ---- SEEDED RANDOM ----
class SeededRandom {
  constructor(seed) {
    this.seed = this._hashStr(String(seed));
  }
  _hashStr(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    }
    return h;
  }
  next() {
    this.seed = (this.seed * 16807 + 0) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }
  nextInt(min, max) {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
  pick(arr) { return arr[this.nextInt(0, arr.length - 1)]; }
}

// ---- DUNGEON GENERATOR (BSP) ----
class DungeonGenerator {
  constructor(seed) {
    this.rng = new SeededRandom(seed || Date.now());
  }

  generate(config, dungeon) {
    dungeon.clearAll();
    dungeon.width = config.width;
    dungeon.height = config.height;
    dungeon.metadata.theme = config.theme;
    dungeon.metadata.seed = config.seed;

    // Fill everything with walls
    for (let x = 0; x < dungeon.width; x++) {
      for (let y = 0; y < dungeon.height; y++) {
        dungeon.setTile(x, y, 'wall');
      }
    }

    // BSP split
    const leaves = [];
    this._split({ x: 1, y: 1, w: dungeon.width - 2, h: dungeon.height - 2 }, leaves, 0, config);

    // If user requested a specific room count, trim leaves to match
    const targetRooms = config.rooms && config.rooms > 0 ? config.rooms : leaves.length;
    while (leaves.length > targetRooms) {
      // Remove the smallest leaf (merge it back) to reduce room count
      let smallestIdx = 0;
      let smallestArea = leaves[0].w * leaves[0].h;
      for (let i = 1; i < leaves.length; i++) {
        const area = leaves[i].w * leaves[i].h;
        if (area < smallestArea) { smallestArea = area; smallestIdx = i; }
      }
      leaves.splice(smallestIdx, 1);
    }

    // Create rooms in leaves
    const rooms = [];
    for (const leaf of leaves) {
      const room = this._createRoom(leaf, config);
      if (room) rooms.push(room);
    }

    // Carve rooms
    for (const room of rooms) {
      const rid = dungeon.addRoom('', room);
      for (let x = room.x; x < room.x + room.w; x++) {
        for (let y = room.y; y < room.y + room.h; y++) {
          dungeon.setTile(x, y, 'room', { roomId: rid });
        }
      }
    }

    // Connect rooms with corridors
    for (let i = 0; i < rooms.length - 1; i++) {
      this._connectRooms(dungeon, rooms[i], rooms[i + 1], config);
    }
    // Extra connections for loops
    if (rooms.length > 4) {
      const extra = Math.max(1, Math.floor(rooms.length / 4));
      for (let e = 0; e < extra; e++) {
        const a = this.rng.nextInt(0, rooms.length - 1);
        let b = this.rng.nextInt(0, rooms.length - 1);
        if (a !== b) this._connectRooms(dungeon, rooms[a], rooms[b], config);
      }
    }

    // Place doors at room entrances
    this._placeDoors(dungeon);

    // Place stairs in first and last room
    if (rooms.length >= 2) {
      const startRoom = rooms[0];
      const endRoom = rooms[rooms.length - 1];
      dungeon.setTile(startRoom.x + Math.floor(startRoom.w / 2), startRoom.y + Math.floor(startRoom.h / 2), 'stairs', { direction: 'up' });
      dungeon.setTile(endRoom.x + Math.floor(endRoom.w / 2), endRoom.y + Math.floor(endRoom.h / 2), 'stairs', { direction: 'down' });
    }

    return dungeon;
  }

  _split(node, leaves, depth, config) {
    const minSize = 10;
    const maxDepth = 4;

    // Stop splitting if too small or too deep
    if (depth >= maxDepth || (node.w < minSize * 2 && node.h < minSize * 2)) {
      leaves.push(node);
      return;
    }
    // Random chance to stop splitting early (increases with depth) — gives variety
    if (depth >= 2 && this.rng.next() < 0.25) {
      leaves.push(node);
      return;
    }
    if (node.w < minSize * 2 && node.h >= minSize * 2) {
      this._splitH(node, leaves, depth, config);
    } else if (node.h < minSize * 2 && node.w >= minSize * 2) {
      this._splitV(node, leaves, depth, config);
    } else if (this.rng.next() < 0.5) {
      this._splitV(node, leaves, depth, config);
    } else {
      this._splitH(node, leaves, depth, config);
    }
  }

  _splitV(node, leaves, depth, config) {
    const min = Math.floor(node.w * 0.3);
    const max = Math.floor(node.w * 0.7);
    if (min >= max) { leaves.push(node); return; }
    const split = this.rng.nextInt(min, max);
    this._split({ x: node.x, y: node.y, w: split, h: node.h }, leaves, depth + 1, config);
    this._split({ x: node.x + split, y: node.y, w: node.w - split, h: node.h }, leaves, depth + 1, config);
  }

  _splitH(node, leaves, depth, config) {
    const min = Math.floor(node.h * 0.3);
    const max = Math.floor(node.h * 0.7);
    if (min >= max) { leaves.push(node); return; }
    const split = this.rng.nextInt(min, max);
    this._split({ x: node.x, y: node.y, w: node.w, h: split }, leaves, depth + 1, config);
    this._split({ x: node.x, y: node.y + split, w: node.w, h: node.h - split }, leaves, depth + 1, config);
  }

  _createRoom(leaf, config) {
    const minRoomSize = 4;
    const maxW = Math.min(leaf.w - 2, 14);
    const maxH = Math.min(leaf.h - 2, 14);
    if (maxW < minRoomSize || maxH < minRoomSize) return null;
    // Bias toward larger rooms (use at least 50% of available space)
    const minW = Math.max(minRoomSize, Math.floor(maxW * 0.5));
    const minH = Math.max(minRoomSize, Math.floor(maxH * 0.5));
    const w = this.rng.nextInt(minW, maxW);
    const h = this.rng.nextInt(minH, maxH);
    const maxOffsetX = Math.max(0, leaf.w - w - 2);
    const maxOffsetY = Math.max(0, leaf.h - h - 2);
    const x = leaf.x + 1 + (maxOffsetX > 0 ? this.rng.nextInt(0, maxOffsetX) : 0);
    const y = leaf.y + 1 + (maxOffsetY > 0 ? this.rng.nextInt(0, maxOffsetY) : 0);
    return { x, y, w, h };
  }

  _connectRooms(dungeon, a, b, config) {
    const ax = Math.floor(a.x + a.w / 2);
    const ay = Math.floor(a.y + a.h / 2);
    const bx = Math.floor(b.x + b.w / 2);
    const by = Math.floor(b.y + b.h / 2);

    // L-shaped corridor
    if (this.rng.next() < 0.5) {
      this._carveH(dungeon, ax, bx, ay);
      this._carveV(dungeon, ay, by, bx);
    } else {
      this._carveV(dungeon, ay, by, ax);
      this._carveH(dungeon, ax, bx, by);
    }
  }

  _carveH(dungeon, x1, x2, y) {
    const start = Math.min(x1, x2);
    const end = Math.max(x1, x2);
    for (let x = start; x <= end; x++) {
      if (dungeon.isValid(x, y)) {
        const t = dungeon.getTile(x, y);
        if (!t || t.type === 'wall') {
          dungeon.setTile(x, y, 'corridor');
        }
      }
    }
  }

  _carveV(dungeon, y1, y2, x) {
    const start = Math.min(y1, y2);
    const end = Math.max(y1, y2);
    for (let y = start; y <= end; y++) {
      if (dungeon.isValid(x, y)) {
        const t = dungeon.getTile(x, y);
        if (!t || t.type === 'wall') {
          dungeon.setTile(x, y, 'corridor');
        }
      }
    }
  }

  _placeDoors(dungeon) {
    // Place doors where corridors meet rooms
    for (let x = 1; x < dungeon.width - 1; x++) {
      for (let y = 1; y < dungeon.height - 1; y++) {
        const t = dungeon.getTile(x, y);
        if (!t || t.type !== 'corridor') continue;

        const neighbors = [
          { dx: 0, dy: -1, dir: 'south' },
          { dx: 0, dy: 1, dir: 'north' },
          { dx: -1, dy: 0, dir: 'east' },
          { dx: 1, dy: 0, dir: 'west' },
        ];

        for (const n of neighbors) {
          const nt = dungeon.getTile(x + n.dx, y + n.dy);
          if (nt && nt.type === 'room') {
            // Check if this corridor tile is adjacent to exactly one room edge
            const oppo = dungeon.getTile(x - n.dx, y - n.dy);
            if (oppo && (oppo.type === 'corridor' || oppo.type === 'wall')) {
              dungeon.setTile(x, y, 'door', { direction: n.dir, locked: false });
              break;
            }
          }
        }
      }
    }
  }
}

// ---- ENCOUNTER GENERATOR ----
class EncounterGenerator {
  constructor() {
    // XP thresholds per character level [easy, medium, hard, deadly]
    this.thresholds = {
      1: [25, 50, 75, 100],
      2: [50, 100, 150, 200],
      3: [75, 150, 225, 400],
      4: [125, 250, 375, 500],
      5: [250, 500, 750, 1100],
      6: [300, 600, 900, 1400],
      7: [350, 750, 1100, 1700],
      8: [450, 900, 1400, 2100],
      9: [550, 1100, 1600, 2400],
      10: [600, 1200, 1900, 2800],
      11: [800, 1600, 2400, 3600],
      12: [1000, 2000, 3000, 4500],
      13: [1100, 2200, 3400, 5100],
      14: [1250, 2500, 3800, 5700],
      15: [1400, 2800, 4300, 6400],
      16: [1600, 3200, 4800, 7200],
      17: [2000, 3900, 5900, 8800],
      18: [2100, 4200, 6300, 9500],
      19: [2400, 4900, 7300, 10900],
      20: [2800, 5700, 8500, 12700],
    };
  }

  getPartyThresholds(partySize, partyLevel) {
    const t = this.thresholds[Math.min(20, Math.max(1, partyLevel))] || this.thresholds[3];
    return {
      easy: t[0] * partySize,
      medium: t[1] * partySize,
      hard: t[2] * partySize,
      deadly: t[3] * partySize,
    };
  }

  getDifficulty(totalXP, partySize, partyLevel) {
    const t = this.getPartyThresholds(partySize, partyLevel);
    if (totalXP >= t.deadly) return 'deadly';
    if (totalXP >= t.hard) return 'hard';
    if (totalXP >= t.medium) return 'medium';
    if (totalXP >= t.easy) return 'easy';
    return 'trivial';
  }

  rollDice(diceStr) {
    // Parse "2d6+1" style strings
    const match = diceStr.match(/^(\d+)?d(\d+)([+-]\d+)?$/);
    if (!match) return parseInt(diceStr) || 1;
    const count = parseInt(match[1]) || 1;
    const sides = parseInt(match[2]);
    const mod = parseInt(match[3]) || 0;
    let total = mod;
    for (let i = 0; i < count; i++) {
      total += Math.floor(Math.random() * sides) + 1;
    }
    return Math.max(1, total);
  }

  generateForRoom(partySize, partyLevel, theme, targetDifficulty = 'medium') {
    const t = this.getPartyThresholds(partySize, partyLevel);
    const targetXP = t[targetDifficulty] || t.medium;

    // Filter monsters by theme and appropriate CR
    const maxCR = partyLevel + 2;
    const themeTypes = (typeof THEME_MONSTERS !== 'undefined' && THEME_MONSTERS[theme]) || ['humanoid', 'undead', 'beast'];
    const eligible = (typeof MONSTERS !== 'undefined' ? MONSTERS : []).filter(m =>
      m.cr <= maxCR && themeTypes.includes(m.type)
    );

    if (eligible.length === 0) return { monsters: [], totalXP: 0 };

    const monsters = [];
    let currentXP = 0;
    let attempts = 0;

    while (currentXP < targetXP * 0.7 && attempts < 20) {
      attempts++;
      const m = eligible[Math.floor(Math.random() * eligible.length)];
      if (currentXP + m.xp > targetXP * 1.3) continue;
      const count = Math.min(this.rollDice(m.countDice), Math.ceil((targetXP - currentXP) / m.xp));
      if (count <= 0) continue;

      const existing = monsters.find(e => e.name === m.name);
      if (existing) {
        existing.count += count;
        currentXP += m.xp * count;
      } else {
        monsters.push({ name: m.name, cr: m.cr, xp: m.xp, count, type: m.type });
        currentXP += m.xp * count;
      }
    }

    return { monsters, totalXP: currentXP };
  }

  generateLoot(avgCR) {
    if (typeof LOOT_TABLES === 'undefined') return { coins: 0, items: [] };

    const tierKey = typeof getLootTier === 'function' ? getLootTier(avgCR) : 'tier1';
    const tier = LOOT_TABLES[tierKey];
    if (!tier) return { coins: 0, items: [] };

    const coins = Math.floor(Math.random() * (tier.coins.max - tier.coins.min + 1)) + tier.coins.min;

    // Pick 1-3 items weighted by weight
    const items = [];
    const numItems = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numItems; i++) {
      const totalWeight = tier.items.reduce((s, it) => s + it.weight, 0);
      let roll = Math.random() * totalWeight;
      for (const item of tier.items) {
        roll -= item.weight;
        if (roll <= 0) {
          if (!items.find(x => x.name === item.name)) {
            items.push({ name: item.name, rarity: item.rarity });
          }
          break;
        }
      }
    }

    return { coins, unit: tier.coins.unit, items };
  }

  generateTrap() {
    if (typeof TRAPS === 'undefined' || TRAPS.length === 0) return null;
    return { ...TRAPS[Math.floor(Math.random() * TRAPS.length)] };
  }
}

// ---- GRID RENDERER ----
class GridRenderer {
  constructor(canvas, dungeon) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.dungeon = dungeon;
    this.tileSize = 20;
    this.offsetX = 0;
    this.offsetY = 0;
    this.zoom = 1;
    this.hoverX = -1;
    this.hoverY = -1;
    this.dragPreview = null; // { x1,y1,x2,y2 } for room-draw
    this.textureRenderer = new TextureRenderer();
    this.activeTheme = 'classic';
  }

  resize(w, h) {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  screenToGrid(sx, sy) {
    const x = Math.floor((sx - this.offsetX) / (this.tileSize * this.zoom));
    const y = Math.floor((sy - this.offsetY) / (this.tileSize * this.zoom));
    return [x, y];
  }

  gridToScreen(gx, gy) {
    return [
      gx * this.tileSize * this.zoom + this.offsetX,
      gy * this.tileSize * this.zoom + this.offsetY,
    ];
  }

  render() {
    const ctx = this.ctx;
    const ts = this.tileSize * this.zoom;
    const cw = this.canvas.clientWidth;
    const ch = this.canvas.clientHeight;
    const theme = DUNGEON_THEMES[this.activeTheme] || DUNGEON_THEMES.classic;

    // Background
    ctx.fillStyle = theme.background;
    ctx.fillRect(0, 0, cw, ch);

    // Visible tile range
    const startX = Math.max(0, Math.floor(-this.offsetX / ts));
    const startY = Math.max(0, Math.floor(-this.offsetY / ts));
    const endX = Math.min(this.dungeon.width, Math.ceil((cw - this.offsetX) / ts));
    const endY = Math.min(this.dungeon.height, Math.ceil((ch - this.offsetY) / ts));

    // Draw tiles
    for (let x = startX; x < endX; x++) {
      for (let y = startY; y < endY; y++) {
        const sx = x * ts + this.offsetX;
        const sy = y * ts + this.offsetY;
        const tile = this.dungeon.getTile(x, y);

        if (tile) {
          // Use textured rendering
          this.textureRenderer.drawTile(ctx, sx, sy, ts, tile.type, this.activeTheme, x, y);

          // Draw special tile indicators on top of texture
          if (tile.type === 'door') {
            this._drawDoor(ctx, sx, sy, ts, tile.data);
          } else if (tile.type === 'stairs') {
            this._drawStairs(ctx, sx, sy, ts, tile.data);
          } else if (tile.type === 'trap') {
            this._drawTrap(ctx, sx, sy, ts);
          } else if (tile.type === 'treasure') {
            this._drawTreasure(ctx, sx, sy, ts);
          }
        }

        // Grid lines
        ctx.strokeStyle = theme.gridLine;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(sx, sy, ts, ts);
      }
    }

    // Dungeon border
    const bx = this.offsetX;
    const by = this.offsetY;
    const bw = this.dungeon.width * ts;
    const bh = this.dungeon.height * ts;
    ctx.strokeStyle = theme.border;
    ctx.lineWidth = 2;
    ctx.strokeRect(bx, by, bw, bh);

    // Hover highlight
    if (this.hoverX >= 0 && this.hoverY >= 0 &&
        this.hoverX < this.dungeon.width && this.hoverY < this.dungeon.height) {
      const hx = this.hoverX * ts + this.offsetX;
      const hy = this.hoverY * ts + this.offsetY;
      ctx.fillStyle = 'rgba(184, 154, 80, 0.25)';
      ctx.fillRect(hx, hy, ts, ts);
      ctx.strokeStyle = 'rgba(184, 154, 80, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(hx, hy, ts, ts);
    }

    // Room-draw preview
    if (this.dragPreview) {
      const dp = this.dragPreview;
      const rx = Math.min(dp.x1, dp.x2);
      const ry = Math.min(dp.y1, dp.y2);
      const rw = Math.abs(dp.x2 - dp.x1) + 1;
      const rh = Math.abs(dp.y2 - dp.y1) + 1;
      const psx = rx * ts + this.offsetX;
      const psy = ry * ts + this.offsetY;
      ctx.fillStyle = 'rgba(100, 200, 255, 0.15)';
      ctx.fillRect(psx, psy, rw * ts, rh * ts);
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(psx, psy, rw * ts, rh * ts);
      ctx.setLineDash([]);
    }
  }

  _getThemeTileAccent(tileType) {
    const theme = DUNGEON_THEMES[this.activeTheme] || DUNGEON_THEMES.classic;
    return theme.tiles[tileType] ? theme.tiles[tileType].accent : '#aaa';
  }

  _drawDoor(ctx, sx, sy, ts, data) {
    const accent = this._getThemeTileAccent('door');
    ctx.fillStyle = accent;
    const m = ts * 0.2;
    const dir = data.direction || 'north';
    if (dir === 'north' || dir === 'south') {
      ctx.fillRect(sx + m, sy + ts * 0.35, ts - 2 * m, ts * 0.3);
    } else {
      ctx.fillRect(sx + ts * 0.35, sy + m, ts * 0.3, ts - 2 * m);
    }
    if (data.locked) {
      const theme = DUNGEON_THEMES[this.activeTheme] || DUNGEON_THEMES.classic;
      ctx.fillStyle = theme.border || '#e94560';
      ctx.beginPath();
      ctx.arc(sx + ts / 2, sy + ts / 2, ts * 0.12, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  _drawStairs(ctx, sx, sy, ts) {
    const accent = this._getThemeTileAccent('stairs');
    ctx.strokeStyle = accent;
    ctx.lineWidth = 1.5;
    const steps = 4;
    for (let i = 0; i < steps; i++) {
      const frac = i / steps;
      const y = sy + ts * 0.2 + frac * ts * 0.6;
      ctx.beginPath();
      ctx.moveTo(sx + ts * 0.2, y);
      ctx.lineTo(sx + ts * 0.8, y);
      ctx.stroke();
    }
  }

  _drawTrap(ctx, sx, sy, ts) {
    const accent = this._getThemeTileAccent('trap');
    ctx.fillStyle = accent;
    ctx.font = `${ts * 0.5}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('!', sx + ts / 2, sy + ts / 2);
  }

  _drawTreasure(ctx, sx, sy, ts) {
    const accent = this._getThemeTileAccent('treasure');
    ctx.fillStyle = accent;
    ctx.font = `${ts * 0.45}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$', sx + ts / 2, sy + ts / 2);
  }
}

// ---- MAIN APP ----
class App {
  constructor() {
    this.dungeon = new Dungeon(50, 50);
    this.history = new History(50);

    this.canvasContainer = document.getElementById('canvas-container');
    this.canvas = document.getElementById('dungeon-canvas');
    this.renderer = new GridRenderer(this.canvas, this.dungeon);

    this.encounterGen = new EncounterGenerator();
    this.activeTool = 'wall';
    this.isPainting = false;
    this.isPanning = false;
    this.panStart = { x: 0, y: 0 };
    this.lastPaintedTile = null;
    this.selectedTile = null;

    // Room-draw state
    this.roomDrawStart = null;

    // Auth & cloud state
    this.currentUser = null;
    this.currentCloudId = null; // ID of last saved/loaded cloud dungeon

    this._setupCanvas();
    this._setupTools();
    this._setupMouse();
    this._setupKeyboard();
    this._setupHeader();
    this._setupModals();
    this._setupProps();
    this._setupEncounterPanel();
    this._setupTheme();
    this._setupAuthAndCloud();

    this.history.save(this.dungeon);
    this._updateStats();
    this._render();

    // Check for shared dungeon in URL
    this._checkShareLink();
  }

  // -- Canvas setup --
  _setupCanvas() {
    const resize = () => {
      const rect = this.canvasContainer.getBoundingClientRect();
      this.renderer.resize(rect.width, rect.height);
      this._render();
    };
    window.addEventListener('resize', resize);
    resize();

    // Center the dungeon
    const rect = this.canvasContainer.getBoundingClientRect();
    const dw = this.dungeon.width * this.renderer.tileSize;
    const dh = this.dungeon.height * this.renderer.tileSize;
    this.renderer.offsetX = Math.max(0, (rect.width - dw) / 2);
    this.renderer.offsetY = Math.max(0, (rect.height - dh) / 2);
  }

  // -- Tool selection --
  _setupTools() {
    document.querySelectorAll('.tool-btn[data-tool]').forEach(btn => {
      btn.addEventListener('click', () => {
        this._setTool(btn.dataset.tool);
      });
    });
  }

  _setTool(tool) {
    this.activeTool = tool;
    document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.tool-btn[data-tool="${tool}"]`);
    if (btn) btn.classList.add('active');
    document.getElementById('status-tool').textContent = TILE_TYPES[tool]?.label || tool.charAt(0).toUpperCase() + tool.slice(1);
    this.canvas.style.cursor = tool === 'select' ? 'default' : 'crosshair';
  }

  // -- Mouse interaction --
  _setupMouse() {
    const c = this.canvas;

    c.addEventListener('dblclick', (e) => {
      const rect = this.canvasContainer.getBoundingClientRect();
      const [gx, gy] = this.renderer.screenToGrid(e.clientX - rect.left, e.clientY - rect.top);
      const tile = this.dungeon.getTile(gx, gy);
      if (tile && tile.type === 'room' && tile.data.roomId) {
        this.openEncounterPanel(tile.data.roomId);
      }
    });

    c.addEventListener('mousedown', (e) => {
      if (e.button === 1 || (e.button === 0 && e.altKey)) {
        // Pan
        this.isPanning = true;
        this.panStart = { x: e.clientX - this.renderer.offsetX, y: e.clientY - this.renderer.offsetY };
        c.style.cursor = 'grabbing';
        return;
      }
      if (e.button === 0) {
        const rect = this.canvasContainer.getBoundingClientRect();
        const [gx, gy] = this.renderer.screenToGrid(e.clientX - rect.left, e.clientY - rect.top);

        if (this.activeTool === 'room-draw') {
          this.roomDrawStart = { x: gx, y: gy };
          this.renderer.dragPreview = { x1: gx, y1: gy, x2: gx, y2: gy };
          this._render();
          return;
        }

        if (this.activeTool === 'select') {
          this._selectTile(gx, gy);
          return;
        }

        this.history.save(this.dungeon);
        this.isPainting = true;
        this._paint(gx, gy);
      }
    });

    c.addEventListener('mousemove', (e) => {
      const rect = this.canvasContainer.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      if (this.isPanning) {
        this.renderer.offsetX = e.clientX - this.panStart.x;
        this.renderer.offsetY = e.clientY - this.panStart.y;
        this._render();
        return;
      }

      const [gx, gy] = this.renderer.screenToGrid(mx, my);
      this.renderer.hoverX = gx;
      this.renderer.hoverY = gy;
      document.getElementById('status-pos').textContent =
        this.dungeon.isValid(gx, gy) ? `${gx}, ${gy}` : '—';

      if (this.roomDrawStart) {
        this.renderer.dragPreview = { x1: this.roomDrawStart.x, y1: this.roomDrawStart.y, x2: gx, y2: gy };
        // Update tooltip
        const tooltip = document.getElementById('room-tooltip');
        const rw = Math.abs(gx - this.roomDrawStart.x) + 1;
        const rh = Math.abs(gy - this.roomDrawStart.y) + 1;
        tooltip.textContent = `${rw} × ${rh}`;
        tooltip.style.display = 'block';
        tooltip.style.left = (e.clientX - rect.left + 16) + 'px';
        tooltip.style.top = (e.clientY - rect.top - 10) + 'px';
        this._render();
        return;
      }

      if (this.isPainting) {
        this._paint(gx, gy);
      }

      this._render();
    });

    c.addEventListener('mouseup', (e) => {
      if (this.isPanning) {
        this.isPanning = false;
        c.style.cursor = this.activeTool === 'select' ? 'default' : 'crosshair';
        return;
      }

      if (this.roomDrawStart) {
        const rect = this.canvasContainer.getBoundingClientRect();
        const [gx, gy] = this.renderer.screenToGrid(e.clientX - rect.left, e.clientY - rect.top);
        this._drawRoom(this.roomDrawStart.x, this.roomDrawStart.y, gx, gy);
        this.roomDrawStart = null;
        this.renderer.dragPreview = null;
        document.getElementById('room-tooltip').style.display = 'none';
        this._render();
        return;
      }

      if (this.isPainting) {
        this.isPainting = false;
        this.lastPaintedTile = null;
        this._updateStats();
      }
    });

    c.addEventListener('mouseleave', () => {
      this.renderer.hoverX = -1;
      this.renderer.hoverY = -1;
      this.isPainting = false;
      this.isPanning = false;
      this.lastPaintedTile = null;
      document.getElementById('room-tooltip').style.display = 'none';
      this._render();
    });

    // Zoom
    c.addEventListener('wheel', (e) => {
      e.preventDefault();
      const rect = this.canvasContainer.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const oldZoom = this.renderer.zoom;
      const factor = e.deltaY < 0 ? 1.12 : 0.89;
      this.renderer.zoom = Math.max(0.2, Math.min(5, this.renderer.zoom * factor));

      // Zoom toward cursor
      const scale = this.renderer.zoom / oldZoom;
      this.renderer.offsetX = mx - (mx - this.renderer.offsetX) * scale;
      this.renderer.offsetY = my - (my - this.renderer.offsetY) * scale;

      document.getElementById('status-zoom').textContent = Math.round(this.renderer.zoom * 100) + '%';
      this._render();
    }, { passive: false });

    // Prevent context menu
    c.addEventListener('contextmenu', e => e.preventDefault());
  }

  _paint(gx, gy) {
    if (!this.dungeon.isValid(gx, gy)) return;
    const key = `${gx},${gy}`;
    if (this.lastPaintedTile === key) return;
    this.lastPaintedTile = key;

    const tool = this.activeTool;
    if (tool === 'eraser') {
      this.dungeon.setTile(gx, gy, null);
    } else if (TILE_TYPES[tool]) {
      const data = {};
      if (tool === 'door') data.direction = 'north';
      if (tool === 'stairs') data.direction = 'down';
      this.dungeon.setTile(gx, gy, tool, data);
    }
    this._render();
  }

  _drawRoom(x1, y1, x2, y2) {
    const rx = Math.min(x1, x2);
    const ry = Math.min(y1, y2);
    const rw = Math.abs(x2 - x1) + 1;
    const rh = Math.abs(y2 - y1) + 1;
    if (rw < 2 || rh < 2) return;

    this.history.save(this.dungeon);

    // Create room entry
    const rid = this.dungeon.addRoom('', { x: rx, y: ry, w: rw, h: rh });

    // Fill interior with room tiles, border with walls
    for (let x = rx; x < rx + rw; x++) {
      for (let y = ry; y < ry + rh; y++) {
        if (x === rx || x === rx + rw - 1 || y === ry || y === ry + rh - 1) {
          this.dungeon.setTile(x, y, 'wall');
        } else {
          this.dungeon.setTile(x, y, 'room', { roomId: rid });
        }
      }
    }
    this._updateStats();
  }

  _selectTile(gx, gy) {
    if (!this.dungeon.isValid(gx, gy)) return;
    this.selectedTile = { x: gx, y: gy };
    this._showTileProps(gx, gy);
  }

  // -- Properties panel --
  _setupProps() {
    document.getElementById('prop-direction').addEventListener('change', (e) => {
      if (!this.selectedTile) return;
      const tile = this.dungeon.getTile(this.selectedTile.x, this.selectedTile.y);
      if (tile && tile.type === 'door') {
        tile.data.direction = e.target.value;
        this._render();
      }
    });
    document.getElementById('prop-locked').addEventListener('change', (e) => {
      if (!this.selectedTile) return;
      const tile = this.dungeon.getTile(this.selectedTile.x, this.selectedTile.y);
      if (tile && tile.type === 'door') {
        tile.data.locked = e.target.value === 'true';
        this._render();
      }
    });
    document.getElementById('prop-stairs-dir').addEventListener('change', (e) => {
      if (!this.selectedTile) return;
      const tile = this.dungeon.getTile(this.selectedTile.x, this.selectedTile.y);
      if (tile && tile.type === 'stairs') {
        tile.data.direction = e.target.value;
      }
    });
    document.getElementById('prop-room-name').addEventListener('input', (e) => {
      if (!this.selectedTile) return;
      const tile = this.dungeon.getTile(this.selectedTile.x, this.selectedTile.y);
      if (tile && tile.data.roomId && this.dungeon.rooms[tile.data.roomId]) {
        this.dungeon.rooms[tile.data.roomId].name = e.target.value;
      }
    });
    document.getElementById('prop-description').addEventListener('input', (e) => {
      if (!this.selectedTile) return;
      const tile = this.dungeon.getTile(this.selectedTile.x, this.selectedTile.y);
      if (tile && tile.data.roomId && this.dungeon.rooms[tile.data.roomId]) {
        this.dungeon.rooms[tile.data.roomId].description = e.target.value;
      }
    });
    document.getElementById('dungeon-name').addEventListener('input', (e) => {
      this.dungeon.metadata.name = e.target.value;
      document.getElementById('header-dungeon-name').value = e.target.value;
    });
    document.getElementById('header-dungeon-name').addEventListener('input', (e) => {
      this.dungeon.metadata.name = e.target.value;
      document.getElementById('dungeon-name').value = e.target.value;
    });
  }

  _showTileProps(gx, gy) {
    const tile = this.dungeon.getTile(gx, gy);
    const empty = document.getElementById('props-empty');
    const content = document.getElementById('props-content');

    if (!tile) {
      empty.style.display = 'block';
      content.style.display = 'none';
      return;
    }

    empty.style.display = 'none';
    content.style.display = 'block';

    document.getElementById('prop-pos').textContent = `${gx}, ${gy}`;
    document.getElementById('prop-type').textContent = TILE_TYPES[tile.type]?.label || tile.type;

    // Hide all optional fields
    ['prop-variant-field','prop-direction-field','prop-locked-field','prop-stairs-field','prop-room-field','prop-description-field'].forEach(id => {
      document.getElementById(id).style.display = 'none';
    });

    if (tile.type === 'door') {
      document.getElementById('prop-direction-field').style.display = 'block';
      document.getElementById('prop-direction').value = tile.data.direction || 'north';
      document.getElementById('prop-locked-field').style.display = 'block';
      document.getElementById('prop-locked').value = String(!!tile.data.locked);
    }
    if (tile.type === 'stairs') {
      document.getElementById('prop-stairs-field').style.display = 'block';
      document.getElementById('prop-stairs-dir').value = tile.data.direction || 'down';
    }
    if (tile.type === 'room' && tile.data.roomId) {
      const room = this.dungeon.rooms[tile.data.roomId];
      if (room) {
        document.getElementById('prop-room-field').style.display = 'block';
        document.getElementById('prop-room-name').value = room.name || '';
        document.getElementById('prop-description-field').style.display = 'block';
        document.getElementById('prop-description').value = room.description || '';
      }
    }
  }

  // -- Keyboard --
  _setupKeyboard() {
    window.addEventListener('keydown', (e) => {
      // Don't capture if typing in input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') { e.preventDefault(); this._undo(); }
        if (e.key === 'y') { e.preventDefault(); this._redo(); }
        if (e.key === 'n') { e.preventDefault(); document.getElementById('new-modal').classList.add('active'); }
        if (e.key === 's') { e.preventDefault(); this._save(); }
        if (e.key === 'o') { e.preventDefault(); document.getElementById('file-input').click(); }
        if (e.key === 'g') { e.preventDefault(); document.getElementById('generate-modal').classList.add('active'); }
        return;
      }

      const shortcuts = { w: 'wall', r: 'room', c: 'corridor', d: 'door', s: 'stairs', t: 'trap', g: 'treasure', e: 'eraser', v: 'select', b: 'room-draw' };
      if (shortcuts[e.key]) {
        this._setTool(shortcuts[e.key]);
      }
    });
  }

  // -- Undo/Redo --
  _undo() {
    const state = this.history.undo();
    if (state) {
      this.dungeon = state;
      this.renderer.dungeon = this.dungeon;
      this._updateStats();
      this._render();
    }
  }

  _redo() {
    const state = this.history.redo();
    if (state) {
      this.dungeon = state;
      this.renderer.dungeon = this.dungeon;
      this._updateStats();
      this._render();
    }
  }

  // -- Header buttons --
  _setupHeader() {
    document.getElementById('btn-new').addEventListener('click', () => {
      document.getElementById('new-modal').classList.add('active');
    });
    document.getElementById('btn-save').addEventListener('click', () => this._save());
    document.getElementById('btn-load').addEventListener('click', () => {
      if (this.currentUser && isSupabaseConfigured()) {
        this._showCloudLoadModal();
      } else {
        document.getElementById('file-input').click();
      }
    });
    document.getElementById('file-input').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          this.dungeon = Dungeon.fromJSON(reader.result);
          this.renderer.dungeon = this.dungeon;
          this.history.clear();
          this.history.save(this.dungeon);
          this._centerDungeon();
          this._updateStats();
          this._render();
          document.getElementById('dungeon-name').value = this.dungeon.metadata.name;
          document.getElementById('header-dungeon-name').value = this.dungeon.metadata.name;
        } catch (err) {
          alert('Failed to load dungeon: ' + err.message);
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    });

    document.getElementById('btn-export-png').addEventListener('click', () => this._exportPNG());
    document.getElementById('btn-export-pdf').addEventListener('click', () => this._exportPDF());
    document.getElementById('btn-generate').addEventListener('click', () => {
      document.getElementById('generate-modal').classList.add('active');
    });
  }

  // -- Modals --
  _setupModals() {
    // Generate modal
    document.getElementById('gen-cancel').addEventListener('click', () => {
      document.getElementById('generate-modal').classList.remove('active');
    });
    document.getElementById('gen-go').addEventListener('click', () => {
      const config = {
        width: parseInt(document.getElementById('gen-width').value) || 50,
        height: parseInt(document.getElementById('gen-height').value) || 50,
        theme: document.getElementById('gen-theme').value,
        rooms: parseInt(document.getElementById('gen-rooms').value) || 0,
        seed: document.getElementById('gen-seed').value || String(Date.now()),
      };
      const gen = new DungeonGenerator(config.seed);
      gen.generate(config, this.dungeon);
      this.renderer.dungeon = this.dungeon;
      // Map generation theme to visual theme
      const themeMap = { dungeon: 'stone_dungeon', cave: 'cave', temple: 'ancient_temple', tower: 'ice_fortress' };
      const visualTheme = themeMap[config.theme] || 'classic';
      this.renderer.activeTheme = visualTheme;
      const themeSelect = document.getElementById('theme-select');
      if (themeSelect) themeSelect.value = visualTheme;
      const themeDesc = document.getElementById('theme-description');
      if (themeDesc && DUNGEON_THEMES[visualTheme]) themeDesc.textContent = DUNGEON_THEMES[visualTheme].description;
      this._renderThemePreview();
      this.history.clear();
      this.history.save(this.dungeon);
      this._centerDungeon();
      this._updateStats();
      this._render();
      document.getElementById('generate-modal').classList.remove('active');
    });

    // New modal
    document.getElementById('new-cancel').addEventListener('click', () => {
      document.getElementById('new-modal').classList.remove('active');
    });
    document.getElementById('new-go').addEventListener('click', () => {
      const w = parseInt(document.getElementById('new-width').value) || 50;
      const h = parseInt(document.getElementById('new-height').value) || 50;
      this.dungeon = new Dungeon(w, h);
      this.renderer.dungeon = this.dungeon;
      this.history.clear();
      this.history.save(this.dungeon);
      this._centerDungeon();
      this._updateStats();
      this._render();
      document.getElementById('dungeon-name').value = 'Untitled Dungeon';
      document.getElementById('header-dungeon-name').value = 'Untitled Dungeon';
      document.getElementById('new-modal').classList.remove('active');
    });

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
      });
    });
  }

  // -- Save / Export --
  _save() {
    if (this.currentUser && isSupabaseConfigured()) {
      // Show cloud save modal
      document.getElementById('cloud-save-name').value = this.dungeon.metadata.name || 'Untitled Dungeon';
      document.getElementById('cloud-save-desc').value = '';
      document.getElementById('cloud-save-public').checked = false;
      document.getElementById('cloud-save-error').classList.remove('show');
      document.getElementById('cloud-save-success').classList.remove('show');
      document.getElementById('cloud-save-modal').classList.add('active');
    } else {
      this._saveLocal();
    }
  }

  _saveLocal() {
    const json = this.dungeon.toJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const name = (this.dungeon.metadata.name || 'dungeon').replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  _exportPNG() {
    // Render to offscreen canvas with theme textures
    const ts = 20;
    const w = this.dungeon.width * ts;
    const h = this.dungeon.height * ts;
    const offCanvas = document.createElement('canvas');
    offCanvas.width = w;
    offCanvas.height = h;
    const ctx = offCanvas.getContext('2d');
    const theme = DUNGEON_THEMES[this.renderer.activeTheme] || DUNGEON_THEMES.classic;
    const texRenderer = this.renderer.textureRenderer;

    // Background
    ctx.fillStyle = theme.background;
    ctx.fillRect(0, 0, w, h);

    for (let x = 0; x < this.dungeon.width; x++) {
      for (let y = 0; y < this.dungeon.height; y++) {
        const tile = this.dungeon.getTile(x, y);
        if (tile) {
          texRenderer.drawTile(ctx, x * ts, y * ts, ts, tile.type, this.renderer.activeTheme, x, y);
        }
        ctx.strokeStyle = theme.gridLine;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x * ts, y * ts, ts, ts);
      }
    }

    offCanvas.toBlob((blob) => {
      const name = (this.dungeon.metadata.name || 'dungeon').replace(/[^a-z0-9]/gi, '-').toLowerCase();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = name + '.png';
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }

  _exportPDF() {
    // Generate a printable HTML page with map + encounter details
    const ts = 12; // small tiles for PDF
    const mapCanvas = document.createElement('canvas');
    mapCanvas.width = this.dungeon.width * ts;
    mapCanvas.height = this.dungeon.height * ts;
    const ctx = mapCanvas.getContext('2d');
    const pdfTheme = DUNGEON_THEMES[this.renderer.activeTheme] || DUNGEON_THEMES.classic;
    const texRenderer = this.renderer.textureRenderer;
    ctx.fillStyle = pdfTheme.background;
    ctx.fillRect(0, 0, mapCanvas.width, mapCanvas.height);
    for (let x = 0; x < this.dungeon.width; x++) {
      for (let y = 0; y < this.dungeon.height; y++) {
        const tile = this.dungeon.getTile(x, y);
        if (tile) {
          texRenderer.drawTile(ctx, x * ts, y * ts, ts, tile.type, this.renderer.activeTheme, x, y);
        }
      }
    }
    const mapDataUrl = mapCanvas.toDataURL('image/png');

    // Build encounter text
    let encounterHTML = '';
    for (const [roomId, room] of Object.entries(this.dungeon.rooms)) {
      const enc = this.dungeon.encounters[roomId];
      encounterHTML += `<div class="room-block">
        <h3>${room.name || roomId}</h3>
        ${room.description ? `<p><em>${room.description}</em></p>` : ''}
        <p><strong>Size:</strong> ${room.bounds.w} x ${room.bounds.h}</p>`;
      if (enc) {
        if (enc.monsters.length > 0) {
          encounterHTML += '<p><strong>Monsters:</strong></p><ul>';
          for (const m of enc.monsters) {
            encounterHTML += `<li>${m.count}x ${m.name} (CR ${m.cr}, ${m.xp * m.count} XP)</li>`;
          }
          encounterHTML += '</ul>';
        }
        if (enc.loot && (enc.loot.coins > 0 || (enc.loot.items && enc.loot.items.length > 0))) {
          encounterHTML += '<p><strong>Loot:</strong></p><ul>';
          if (enc.loot.coins > 0) encounterHTML += `<li>${enc.loot.coins} ${enc.loot.unit || 'gp'}</li>`;
          if (enc.loot.items) {
            for (const item of enc.loot.items) {
              encounterHTML += `<li>${item.name} (${item.rarity})</li>`;
            }
          }
          encounterHTML += '</ul>';
        }
        if (enc.traps && enc.traps.length > 0) {
          encounterHTML += '<p><strong>Traps:</strong></p><ul>';
          for (const t of enc.traps) {
            encounterHTML += `<li>${t.name} — DC ${t.dc}, ${t.damage} (${t.severity})</li>`;
          }
          encounterHTML += '</ul>';
        }
      } else {
        encounterHTML += '<p><em>No encounters</em></p>';
      }
      encounterHTML += '</div>';
    }

    const mascotB64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABKCAYAAAAsXNNQAAAKq2lDQ1BJQ0MgUHJvZmlsZQAAeJyVlwdQU+kWx797bzoJLXQpoTfpLYCU0EOXDqISkgChhBgIIHZkcQFXFBERUBZ0FUTBtQCyFsSChUWwYd8gi4C6LhZsWN4FhrC7b957887Myfnl5Nz/d75v7jdzAgBFhSUQpMOyAGTws4Vhvh60mNg4Gv4ZQAAWEIA8ILPYWQJGaGggQG0u/t3e3QHQdLxpNq3177//V5PjcLPYAEChKCdystgZKB9H/TVbIMwGAGlE87q52YJp7kVZQYg2iLJ4mpNn+e00J84whjBTExHmibI6AAQyiyVMBoBshOZpOexkVIfsh7Iln8Pjo5yHsmtGRiYH5Q6UjdAaAcrT+vTEv+gk/00zUaLJYiVLeHYvM0bw4mUJ0lkr/8/j+N+WkS6aW8MQdXKK0C8MjdLomf2elhkgYX5icMgc8zgz9TOcIvKLnGN2lmfcHGelhzPnmMPyCpDopAcHznESz0dSw8tmRswxN8s7fI6FmWGSdZOEnow5ZgnnexClRUryKVymRD8/JSJ6jnN4UcGS3tLCA+ZrPCV5oShMshcu39djfl0fyTlkZP1l7zym5NnslAg/yTmw5vvn8hnzmlkxkt44XC/v+ZpISb0g20OyliA9VFLPTfeV5LNywiXPZqMv5/yzoZIzTGX5h84xCAQ+wBrYgghgA+wAyObmZU9vwjNTsFLIS07JpjHQm8alMfls84U0a0trewCm7+3sa/Hm7sx9hJQI8zmRCQDu072lzefiUeWjqgDIFM/n9HMBoNQAcJ7OFglzZnOY6Q8sIAEZoABUgSbQBUbADO3PHjgDd+AN/EEI2mksWAbYIAVkACHIBavBBlAESsFWsANUgzqwFzSCw+AoaAenwDlwCVwD/eA2eADEYAQ8BxPgHZiCIAgPUSAqpAppQfqQKWQN0SFXyBsKhMKgWCgBSob4kAhaDW2ESqFyqBqqh5qgn6GT0DnoCjQA3YOGoHHoNfQJRmAyrABrwAawBUyHGXAAHAEvhZPhFXA+XAhvgavgBvgQ3Aafg6/Bt2Ex/ByeRAAihSgh2ogZQkc8kRAkDklChMhapASpRBqQFqQT6UFuImLkBfIRg8NQMTSMGcYZ44eJxLAxKzBrMZsx1ZhGTBvmAuYmZggzgfmKpWDVsaZYJywTG4NNxuZii7CV2P3YE9iL2NvYEew7HA6nhDPEOeD8cLG4VNwq3Gbcblwrrgs3gBvGTeLxeFW8Kd4FH4Jn4bPxRfhd+EP4s/gb+BH8B4IUQYtgTfAhxBH4hAJCJeEg4QzhBmGUMEWUJeoTnYghRA5xJbGMuI/YSbxOHCFOkeRIhiQXUgQplbSBVEVqIV0kPSS9kZKS0pFylFosxZNaL1UldUTqstSQ1EeyPNmE7EmOJ4vIW8gHyF3ke+Q3FArFgOJOiaNkU7ZQmijnKY8pH6Sp0ubSTGmO9DrpGuk26RvSL2WIMvoyDJllMvkylTLHZK7LvJAlyhrIesqyZNfK1sielB2UnZSjylnJhchlyG2WOyh3RW5MHi9vIO8tz5EvlN8rf15+mIpQdameVDZ1I3Uf9SJ1RAGnYKjAVEhVKFU4rNCnMKEor2irGKWYp1ijeFpRrIQoGSgxldKVypSOKt1R+qSsocxQ5ioXK7co31B+r7JAxV2Fq1Ki0qpyW+WTKk3VWzVNdZtqu+ojNYyaidpitVy1PWoX1V4sUFjgvIC9oGTB0QX31WF1E/Uw9VXqe9V71Sc1NDV8NQQauzTOa7zQVNJ010zVrNA8ozmuRdVy1eJpVWid1XpGU6QxaOm0KtoF2oS2uraftki7XrtPe0rHUCdSp0CnVeeRLkmXrpukW6HbrTuhp6UXpLdar1nvvj5Rn66for9Tv0f/vYGhQbTBJoN2gzFDFUOmYb5hs+FDI4qRm9EKowajW8Y4Y7pxmvFu434T2MTOJMWkxuS6KWxqb8oz3W06sBC70HEhf2HDwkEzshnDLMes2WzIXMk80LzAvN38pYWeRZzFNosei6+WdpbplvssH1jJW/lbFVh1Wr22NrFmW9dY37Kh2PjYrLPpsHlla2rLtd1je9eOahdkt8mu2+6LvYO90L7FftxBzyHBodZhkK5AD6Vvpl92xDp6OK5zPOX40cneKdvpqNOfzmbOac4HnccWGS7iLtq3aNhFx4XlUu8idqW5Jrj+6Cp203ZjuTW4PXHXdee473cfZRgzUhmHGC89LD2EHic83ns6ea7x7PJCvHy9Srz6vOW9I72rvR/76Pgk+zT7TPja+a7y7fLD+gX4bfMbZGow2cwm5oS/g/8a/wsB5IDwgOqAJ4EmgcLAziA4yD9oe9DDYP1gfnB7CAhhhmwPeRRqGLoi9JfFuMWhi2sWPw2zClsd1hNODV8efjD8XYRHRFnEg0ijSFFkd5RMVHxUU9T7aK/o8mhxjEXMmphrsWqxvNiOOHxcVNz+uMkl3kt2LBmJt4svir+z1HBp3tIry9SWpS87vVxmOWv5sQRsQnTCwYTPrBBWA2sykZlYmzjB9mTvZD/nuHMqOONcF245dzTJJak8aSzZJXl78niKW0plygueJ6+a9yrVL7Uu9X1aSNqBtG/p0emtGYSMhIyTfHl+Gv9CpmZmXuaAwFRQJBCvcFqxY8WEMEC4PwvKWprVka2ADki9IiPRd6KhHNecmpwPuVG5x/Lk8vh5vStNVhavHM33yf9pFWYVe1X3au3VG1YPrWGsqV8LrU1c271Od13hupH1vusbN5A2pG34tcCyoLzg7cbojZ2FGoXrC4e/8/2uuUi6SFg0uMl5U933mO953/cV2xTvKv5awim5WmpZWln6eTN789UfrH6o+uHblqQtfWX2ZXu24rbyt97Z5ratsVyuPL98eHvQ9rYKWkVJxdsdy3dcqbStrNtJ2inaKa4KrOrYpbdr667P1SnVt2s8alpr1WuLa9/v5uy+scd9T0udRl1p3acfeT/erfetb2swaKjci9ubs/fpvqh9PT/Rf2rar7a/dP+XA/wD4sawxgtNDk1NB9UPljXDzaLm8UPxh/oPex3uaDFrqW9Vai09Ao6Ijjz7OeHnO0cDjnYfox9rOa5/vPYE9URJG9S2sm2iPaVd3BHbMXDS/2R3p3PniV/MfzlwSvtUzWnF02VnSGcKz3w7m392skvQ9eJc8rnh7uXdD87HnL91YfGFvosBFy9f8rl0vofRc/ayy+VTV5yunLxKv9p+zf5aW69d74lf7X490Wff13bd4XpHv2N/58CigTM33G6cu+l189It5q1rt4NvD9yJvHN3MH5QfJdzd+xe+r1X93PuTz1Y/xD7sOSR7KPKx+qPG34z/q1VbC8+PeQ11Psk/MmDYfbw89+zfv88UviU8rRyVGu0acx67NS4z3j/syXPRp4Lnk+9KPpD7o/al0Yvj//p/mfvRMzEyCvhq2+vN79RfXPgre3b7snQycfvMt5NvS/5oPqh8SP9Y8+n6E+jU7mf8Z+rvhh/6fwa8PXht4xv3wQsIWtmFEBQh5OSAHh9AJ0TYgGg9gNAWjI7V88YNPtfYIbAf+LZ2XvG0MllbxcAS9wBCEJjPer6qFPQ76GoR7gD2MZG4nMz8My8Pm2BZgAI1lj6WIY/3le2HvzDZmf5v/T9zwgkqn+L/wJ/hgcswCA9RgAAJ6ZJREFUeNqdvFmTJNeV3/m7169v4bFl5J5ZexUKhYUgAXQ3p8khJbNmj5mmbfQ0TzLpab5IP+s76APMmElv6ukxqiW1ZE22CBIE0NgKxVqzcs/YF1/vvfMQkZGxZYGmglUiKyLcw/34uef8z//8zxX/17/+cwtg+Z/4Y687SoCY/CbEzOfGL9qZbxOLpxPXfdfSqa+/5tk7EmL1d81f7crXV55TzF+gmn6X+J8woPgjDrKXp1+8c7F0uUK84QbE4i926W079xGx8n1xjW2+905mzzljTDl+7HbyGTH5iHjDExFz718ds/rzlvkvthNvFILpkXbm7/XPSkz+rnAZe/2xl99nV13PinsTb/JAu2xtOX+gnX/fWrBXr03NKyZLc+4YgVh5aXbqWbNLd/HGpl/3Jk++/IBd8Dax8ATsvEmsvfqYQMxch5gJKysW9MI6t7PRQYzvWE5cYS6k2RXxw84sHWvtiidrJ85sr/5eE9umj8ua+TAq5h/e7IOx15l2PrxeXdeCjd7s4TPuI64JjpfmmPUSMfXAFSe3M0tn1ZV+z93Yy5u5DBGzBl16KCvOPHl4Vtg5L7GT/y69SYj5ID/+t712iS8nMPtHBL8rq4mF25Wr3H76hXbRPMvPcTkRj79CiusX9TQSiTfnITmTfOZi7aJL20vvucpC4vKhXXq1XV7aq9aqnbmhady9xiUtFjmXWBY+Z1eFVzsbHpe9ylECIaG4vHhx5X3Xwwgxl5DEJfwR1xwhxMQPZ3z+midxaev5uM3163Qx6C06zMKRV0lEzKfqy+tfysdiNh5cLSEJGAOlSHFvp0SQFuRZTlFYpBTXXvY0vtnJ4pzEvkkMmMZbu/IWJ0t55lqtEGgrEEIuLWe7+Lt40xK208/bRZxw9dRQ1lqkGF+KnfxkCnOu0JVdAZwW/cNxJN12RjEoeOfOOmk15+VBTK+tCUouxpiltW8ndy8dOTHWzImNAGsWkoyYPmijx4nLmPHNuo4gcCVhIGh3U4xyUEpehZmZlT9rO7sCXU6Tu7XXw8GJ7abWFW8ErqvPYu38M3OUw3Ck+ZvfvOS0NeL9d8usrTsUebGcDsXYRibXdI66DLsxFBo5zLGpmUlxlw9TUBhLnmooDFEgqVQl2zsud+5G7Gy53LnhkzkFZ50hjpRjR5g1zwQKzcIqcQ3KtSvCwSwCAVBc+dw8dsLOwU478/qlF9hVZYy1uL5DreHx5ddNkljz3nt1Xvyhz8HLmFI5HMd6KXAFhKklHOVsvP2Is5MTzl+fo62kNcqo3F0jKHlYa8kLgy8tdc9h534dL4T2IGbQt5ydDRhkmtEwY9jTSCu4caOGdATGTBxjBnZdgnj7RxWwkzA1c6+zx6mr5Tj7hr2mxLFXzmdXoPpJNjRCEAUlqmXFi8M+Wmvef2+d4TCjeTakVI1wBxlFKyE2lp3tCn6vSag1nVhzMRgROQ6nz5vceG8Hqy1rkeSDjzZAwuf/dM5nn13Q7GrcwMPTOSpwydKU/c2Q+nqEdNTYeGIhs76xBlll0nFYmV26s3lZLa9buxLZzMUHO/N/MV/eiombO66DKRR7GyGHpzHWdFhbL/P42RH7ZcX2usfaoyq9vOC7wx5ePGLYK7jfqHB7s8p//vKIIs2pV0J++pc32LwV8ZtPz/nvv3xOkhTs3q7zwe2IoCR5626Fs+MUVWywthYyGKV0+l2SPBvXCpf3JMSMMe0qGP3GetnaZe+deqBdASzsJDPOpv8xLLCrofVsiWUMQiiEFbhOyie/O2d3P6SxFWCdArlWobIb4gwLGhsh/WGGFPDqkwvahzHrgUu0XeZPfrbD1o2I//dvnvHLv33B/fcbfPj2FnvbEcNhwe5OhBCGur/P/o2bGFPw9s0av/vmaw7OD/FcMYmDEmP1+M6sXaiyvrfAuZYFUpcxbZ4BmsfrdoFesPZNC+LKuFJAlgq2oojt/yXii69b7K7vUvYcQjRffnVGo+7z5VctdncivMCBXY9hM6Voa6hKZF3xH//2GX/3y0Ncz2dnKyQKPQJPsbcdcdYc0DkJ+flH7zBKEpJU47qCX/z4Y5AfYTG4UvHJ54/53ZOviUreOGvPYtMV+FDMGPkSjdgFGwgxl+cWGAxrV2fna7D8NEYsPFmlJFa6dNs5WWF4q1Hn0V7I5m6EBb789oKf/OjP+asPfs7J8xZ+qIj2Qw5HKe//cJNOO+Grr1usbfjs3auws10iDBziXHN6MeTpt5ZH+w8wuuDmzjp7m+uUgoB2f8RwlGO0Q5IW1NY2yI07zebimlJITAmUq+Q6xaIrXFWJCbQQ4nsIxRmAfbWKLcKKBaKApSelkdjM4Rfv3+Anf1alZRL+/pNDXrwa4nqwXpf0hoIstdQqinYAbhSQaEv3eERULrG9Y9nZDrAI6nWPp0+7/O3fvOKtu/f4RB1QfPuSvChwHUm9VqVRjXj71jajJGMYJxwct+j2BkRhiJ1ERgEIKWfQxMIasmP3GVdTC3Bn8g/nRx/c+OvLV8QU3c8U0NPXFyrbWW8bB8y5uvXyjyMFSVbw0f06/8cv7tNKU758fkFRGOKh5p0HNXLR5WR4woN3argSzpoZR4cZmdZ0BylFlhOPCm7dqdBYC3j1sst/+dtD/PIaIgq46CcM4pgo8Li50+DO3ib7W2tkhSHPMzzXwVeSWhSw02iQjQoc1wEhyPMcxxFXcf6yhhdX5eVcSbbAKqllVkDMo/UVZdAcJSVWUV9X8cVYiHyHP3tvh9PekL/79QsOm332tyLaXc2L1yM+eMcligxKKl6fpzw/zJFpTtLPuHk/Iq977GwGuMrn6Xd9fvurU9Zv3mJzq4rnCKoln7wwvHt3m0YlIstykiQDLEle0ItzqlHI/t5N1mtl9jb2GKYJozghTUa8ujihMMUyrTbJ2oIpLzEP2YQdL+GVgPKNPLdYtV7nq4bJ8Vmuubm7xsn5iP/7V9/y1VddyAS/YcCNWz7vvbvOl4979FsZMoDusCDrGsgLVNnDUYqjl22+/NURzW5BUK2xub/PW3c3uLNTp1Gv0qhV0NoirSXLM0aZJig0ZV+ipIcVAiklicno9gckWUFrkOIqBU6JIjNYNQlHzPQ+VuHHBQJTXWK3uYaEXUGdiOVS++oLZ7xS2Cu2yVo81+HVWY8nB01cFNVyQJpKNqqC7TWPk4OE84uco+dt/uwn2ziuw9PPjxF5xtPPj/n6VzlSOKSm4E4l4u5enep7N2gEHhv1GtVKhDEGB0tWFFSiECElWEu7n+Aol3IpIM0LNmpllONw1h7w9s1dlCP4759+O46drlzi5uykCpkm5BWUlZrWNm/yQLGCpr/0XDtTmQgDVsyUTBM+TUIU+Wit2NvVhGWH/a0yprA8e91lY8MjDNZ4/LhDr6PJ85zIVUSpoRaW6AtLoH3edsvcuEi4OGiy8/MfUPN94iQjClyEUnjKZWOjgWj38JTDcDgkyTVJEnPW7PI819zc3SD0Pc7bXZSrqFQiuiNnzCatYKDtEi2wgDLeRGGvqo/tlLe0S543Zzg72xoYMyZSSjY3IhxPc9Ya8ep1zCguaP9TE6MVjjTEacGOCqgjadmYozwl0QV7YcQLm3CmLetZThzH9Do91qpllFfmotmh3W6TD3q045xSGLK5XsfmmshXDDKDl2Wct7u0eyM262VKJZ8sTdBFgQpcKOzq7p9YvRKFmE0i30Pa20U+cKbsS/NsnHEdB+VIpBxTU5hlNsOkkl7b8OJgSH+Yk3SG4DqsbQV02jG7RvBxVOG0H9MTglFhKAUelCUdT6G31ylKiu4XT9lfK9FvtXj55dc8aHj0j7q0Wj6B72KDkHY3IjHQDSt89fKMB7e26fQTfvfVcxrrdUqBh9WaZJDh+c78ohMr6b8l7ktZ+yZafXWWmOUkpBQ8un0bIRwu2h3avS6xTpFS4LvuNKzISUaTjmR9I8S87vLZ63NSLBv3d3BKkuq55K+2d7joxwzzgj6G//NnD7FFTpIUHHdSTl4e4ZZ99m+tsZfnlKTD3o0ytbLPSWvAi+Me+/WQwgzJzBkVXyEdh8aooPe4hYlTxEWHk0HCwzsb3NlrcCTXSNMBfuCitV3qGoprCWyLEivT7SR9C7vsQpeBQYLRhh89fMR7Dx5SjQIKrWm12hxcNOn1+jw+OEAIjbGWJM9xHYVyJXEv5V6seHD7Nr+7aOG3cpye5cO1NdJc87w34ELk/Ku/fITF0KZGf5By/Po5rrSsl31OzvucXPRASiTnOEoxTDJa3ZgnJwrPcaiUPHAk99ZLDEYZnWHGw60yt9cDAgmPIs3xi5c4SYErLR2ZUN2uYLWZkr1iZVveTuwjcD5cANKXGXyxMhF2pvk+eS/0faqVTfKswEpFvVrm5t4292/fpN3L+fzxAULmBJ7Pze0d0qxAC0122Me9yFnzfW6VI3b9gLthwCgpeNLukQrLgxtr1DZCGg/f49/863/J7s1dXrW6/OHZMe3OkKywjJKCDx/t8tZ+nXtbEQ/31/AcyWbFI880npKM8oLuMOWonbJZCzg4G3DcGYPutDCMkgIhBSI19OKEcD2aViDLZbKYC3RCTKQdYq4tKN5ILl72N3KtsdYghWSU5hwcnYIxHJ2c0+wOOGn2+PmP3uHunW2qUUQUlvi3/+7/YWNd8fZHH9A8/Yx+mpPkmswYcmPopikxhu0gIHM04eYe//Jf/AwlBI3QY29/m8+rL9lTmrt7dcqRy8/f3aEeuVx0YqRSHF8MkAJcpbizU0FYixWSz1+2MIWhn+T0RwntgcuT121yYzBYXCHYvrc2Bv/XNaaYJ2WnjDQzjPP8AfM2t1iSLEcIQeT7oAVZltFs9zFFzma9wkajhpCSe/ubBEHI1sYaT18d0eoNUCrgpz/8Ietrdf7Df/6K/czwfDSil6RYLMpxWJMuT0cD1kWNP/3xhyjH4fyiTaNW5tZmncr6GjWZ4GBoDXO+fXUBBexvVzFpxiAu8FxJbixBqOgnhrISVAKX3iAhCBz2/TJ/9ed36PRSfv+kSaAkzTxl7UZ9vHyFWKp9LwkGMcNeCQFqFUpeiogWjLUEns+PHj7ixuY6+1ubhEFIVhQkWcHmWoUoKjEcJQxHMZ7r8sXjlzw7PCNJUjzXYWdrg5OLPp1ByoUH8esWG+UAx/fJ8oK65/GkPyCtOPieRykKOLto0R8mVCsRH79zh//y6XPar1+wHvo41mIch/fuNtBZwdHFEM+V7NR9XjYNp90ETzlo36PkO/RHDllhiQKXNNcU1rC/XaJINVqLKYU17u7N4mo7144U82wMM+278ZFCzGM/IUAXmu1Gg48evYPnKQLPJU5zCmMYpQXHFx3C/gglJb1RgucbPFehjWZ3Z5PXx6cEvsd/+tUXvP/WHuWb69Rdn6rj0nl+jFWST9pN3FqAg6GfaZJcM4xTquUSB0enDJKcfq9HNkzpKEGmDYEQCK1p9RPCQJEXlqN2QslVHJ/HnPRi7m2WiHw15jkLTZIaWr2YWjmg1U3GYDvLKV2Sy9Yu4N/FeHhVAKt5MLxQy3KlM1FKcXjR5PHLQ2rlMlmhydKUOC0IfZcsz+nHKVmekeYFp60+lVI4xlrPj8mzjI1GjUf3b/Bwf5N//mc/4LjZp9XrsBPCr3/9DXd//Ii7awHDzBCWQuIspx6F3NhZ5+S8wyjt8M/+9G3+v7+54Nlxmzu7dawZs8y1ss/BaZ/D8y65BddRVMsu+zWfNNVgBboAV0qSTDMaFQzjAVHo0R8VDLSh7jkUhZkhSlhQLok5On+chX9486/H5ZaYll4rhTUIjDFo7dAfDukNYzr9IWetLmvVCEdKfvvNS756fkCzO+LpyzPKgaJR9ri5tcb7D26yu1Hno3fv4wYhX3z6NUedp3TyM748vOC9jz/gf//Fjzl6fcb/9i9+youDYyqVEjd2Nuj3R7R7A4ZxSpxlnPaGnJ51WS+73NuqctyNx3HZU3SGGcpV0xjeiScGjjwGo5wstzhKEngOaWHp9FJyO04kXiUY19EzdhNiRpkmFpQTsx54nTByPntbnr5+zd7mHr4r6faGxEmKzjP2tht8cHeTn7x/h7VKiSj0wVFIL+S8m/C0a1AiZ9+mPDk8x20MSU8zPvmkRaEzwqqm22rRTlL8wOcXP/+YPC94dXjGME7RxqAch1Lg8vDGNi+/eklYLnGRaTq9hNfNEUoITnsZo6zAGIvvCLLcUq6HXHSHdIcJ0hGgIc4t58OUAMOP39rgu9Mug1FGuRpgNFM2xs6JCC4TiZiqx9Q0w1gQ8koTYpdERBbf99jb3KTbS7i1vcPbd2/gegG3dhukcUKcFmjHRQpFO7e0RgY9SAnJ8T3DTjlAJCP+8PgzWlmT4dDjZ//rDtWy5OlBk9dnJdrtIX//j19RdiwPHtzmox/cRQro9Ed8+eQV3/zhNak2VCoh//DFK379rQvakKQp2PESBYujBK50cJXipN3DdV2EI8nSjGGWUx9luK7LWt3j+XGXs2HC2m4FYyxXDNUKYmqBGFRz7UwrVqqHBRYDCCv46bvvkTqScugSpxrPVQwHCb953SOzDvVSQTsesBNabtZLDOOYrs2JNZwPNFUreH3aY2vP5/YNn4OjJnuNiHLZ5fPH31Fr1Dg8ec5bDyP+x5MTdnc32GnUsMaw1aizv73B62aXW/f3OTs8oeQp7t9o0BmmFBriPMdTkk4/ppdklEPJKC1IshG5MTjC8rO/eBvHUxSFRVvDyTDD36mgHGemhLNzFpjVyll7KfsTqGmuFmJF7Xf1nrXglhM+efI7dhpv4e83WA8l3zT7nA0vCJWg4gV08iHZoMd3LUFf14gzS56lCG0o6pJquc5HH9zj9999Q7OZc/9+hTTNsBoqDcG7j0qUI4cwUIxet/jNP/2ef/7xjzG6oDCaV8cXnPYS4jTHSkmOILUQhi77jTLWWp6d9Yi0pVGLiEIfnWb0k4xaJeSs2cfkmvXNCnmmQUJ5rYSxYLW56lAuqr5mmkpixlBqtnV5+WNOFD5plLuO4Ogw5Ug9ZdDMKVf/hHae0oqHfH7YZH+9wvB4yKaOqRXQ9wNevbpgw1qcFIJbGzhOTpzGeLLMs2dDHtyOCJRgkAjiQUaaWX77+Wt8V9IfWOK04E/fXePwrDXubfg+jWqZTpzz/PAMsITKIc019UDxk/e3+KdnTdYqIeXQJQp8DJJvn3UIXXcMxwwMuimNHUOhDXIW8M0oz+wCCpnzyRme1Pnwhzf/eq4zvtCwnIZNKVCO4vRoSOvogqBSo1qtUgLOmiO6xx2qFETGUsehmSaUs4wNRzKohAylpTNICd2I/UaNUilkZLq8PBjy+W/PGWlBlmnifkEBNJuWJLO4VnF7e5uD8ya/++Y5o0xzeHTB6yevqIU++2tlGhUfHIeK5+AqwXoloBEFpGnGwXmX3bUyrnKJM00vz7j99iaep66YZjGDQMRVnSvmirfVglC1cgxgLmpeCYkCT+H6Pke9hBfPP6fsK+7c2uXj29t8/VmXrUqNqhzyNM1o5ZL1HL6VmqCqSPspnlQk8YiRDXj7/h3+8d8/4eS0gxMbhufpuIcyNKgQypFP87DNKFjj69enfP3siOOLEb7OEc1zIteZsiKuknjKRbkuRV4gsaR5TpIbtrfqBFiKNMdow3ajTBh6VzINsSwcvb4Xvkz2qcWe77w43M4pR7QxNOol+p0B371uoZzveHDvFje2G7zc3uSLV6f0dYqDz3tv7bNXj9hKC6J6DVMU+K6HE3g0Rxmj4Yif/MkHaGs5Pjjmv/3qK8KSj+OVyLSlXq6y8+Em+ze2OTjt8uKgTdruYpIhUufEacFmPaIUKLqDlLu7PkmcIYRA5wVaGzwluOjHSF+xXgtJc8sojufdyC5NbozjnZivOMSKIaFpKTe3gIVYqfW1gLEGVwlGo4JwM+Tg9Qn/7R9+y+7NHfZ3qzTWymxWq1TKPtVqhKNcnh+dE8cxjUYdB8NFq0eoJBv1gIebt9jcbPDLf3T55NMnVNYbrG+vM+oNeHHcRGI4OmmRDYbYtMAvMlKdkRuBNlBSLmtln1fnfZ6dDTjxRtTKPu1RjisF7daI2t42T58dkuQaYQw44CiJ1XZBxWunemh7ST1bg50oXZfamrP6wMUW3mz3blqYTJSgruvw9tvbNHsZ0k057pzwzWET6Ybsb1SJ3vHodzUvW0OqnuSi2WKzXkEnI3Bd6tWIQZrTSgz5oM8/PDtjr15ld6NE3m+R65TIlQyymGyY8OLglNs316l5lrXNOs+OmuikICr5OJ4LAvySR2HgwzsNTnoJnWE+5qQ8h35S0B0mnLZ6FFnBzZtrSCEoZpfppXXsMvqYxSVTbeTMZ9T8GM7y5MRlDLwEl8ZYymWfSsXH2AqOBC0siVa4rmAwGBKFPqEwlNwyN3c2kMpjoCVJP+bZWZs8STlrjdiu+fgbNbbX6zy4s8vzL75jXWn21gMOXsVsrle4sVXBEYLWUJM3e6SFRSoHx3FwJOS5ptCgc83RxYhYG5QUDEcZvhQ8fX5AKfCQQjLUIy6aI5JRhh96V5LjqXjIruhKznLSYknVquyV3nVe/Cym1fTSJMxU3TT5TKkkuFVfY7MasbdV56zVJQxL7O9s8roTc54M0VlCs5/y6asW9Szmz+9uogGdJAwzTbVWwyiBE0oOLnqEyuGdG3UOzgdEgUOzO6STa6JyiU5/iNQaaeCin9IZZVhj+PbQgHLACraqPsMkpxb6DAsIfYEwPkHZxXEk1pjlrqOdV2BdMlOztNaiKFetElpfGcvOz2TM4B8xAdcAWhecnjd5eHObk2aXnbUa+GX+w6+f0BMjDAYpU25pRdVqGjafNMNzjAzJc80P3r7FL//r7xl1NXZUkAcRgT+m5n/19IztnQZCFowGIxwE/WHC42RcviklUVLQGSY4jqSkXC56Q3IsoaNw0CjlUKqXufVoHeUrdG4mpeuCat8uOo+dW+WLs3pq3jarOuliITaI+VEHQDmCMBScNntUyhGVconcCE46F+CDl0n2TUxarhEbuL3TYEMJho097uyuca8RcXThkwVlokqNrftVOp0BLzt9rNHUQoXVGptnY/AqYW0tQDiCdFgQxznKVySFRqcZPTvCGBDaYssRlXKII6C+E1FaCzDFxHgrWm5iQTxq7XWDqWIWxlw7o7o8RypWTWuA7znkhWY4iimKHKEEd3ZqfNU2lExMQxtiY3nv4SOqwYj17RLeKOHsxWv+7j8dMtKCSr1KFHnsbG9y9+5tnj5+SvOogyiVGWkLaU6eG/bvrfHeRzfJM02/G5PGBUoJrBCUIg85kXYkvZheN8ZxHNa2qvhlD6PH2dZONcoTkCLEHAM1S4mKOb7gsk17WcpNaewFkdGbFAsL2mjHkTQ7PUpelf39TTYaNSqlgK+OztHxMYQZvbxMVKngd77hi/Y5v/0yJYkzOsUmGzs3sLbgrYclXKUIq2sYY7nz6D6tXozMC4pBn3a7w/6tBru31ymK8bXWGhFCiqtyy1w9fD/yqO3WphdqtJnzA2PfPPkn5n7YJSW5sAJ1RSLYJVm/fdNQ85UYGix4Hrw6e8EwHrG3tcbuWkShDfVI8fbtPfJWnydHT0jzIa7rESmXsLrLT/70L7mxt4cxli+//Ix+r0O90eD8+DVRpUStEtLpDQnXanTOWzR2KmxsVq5AszZQcDWAKGYaY3p+sHVRoiFmhovsNS3w+TJlvgVnsctLWLBi7nZRvSoWJtEnX+i5Dv24h9GGl92Ut/Z2eXujxhfffMOr09cEJQ/P9bHWkBPw7od/wa2bt0iShFJYYn//Ni9zjVIuYRTxzTd/wHUEg4sOmc6IKlXIDbrQ07pVzJHtzGNa8eYJ9UXFlZhhnuZFBYuEg1iuhZc0MNZefwVzRrQzT10QuoovjmPSvEN89oLjixO0Y4gq4XQJZVlGfe9dbt+5i57oaqw1VGs1SlFEq3lOv9snGcXoAoa9LkZAUK3x4nWMUX1u3ojQ5mpI+zJximu2E1jspl2qL5bEL/aa4V2xWu6iuFYcI75HYDlfM1/2VdI04/CbT+llHQrA810cnMnQi0TrjMrmA977+KcMBz2ElGit0UVBno/rg7PjIw4OTglDjzzXIB08TzEaDBBuyOFZys6Wh3RdlDs+tynMylqVhQ0KlodoZn3SrjT+XEU8hwtnYuD3ClTtNRPcC5NKWhjaeQc/8FCTfrKdoYOMERSyymg0JAZ8z+Ps7JRqtYZSLspxyLLxMh4OUrLeAHSBdEJcz0MbgVekKL+BIyTnB12EJ1nbqlDkeq71eCUXnx8an6vcxMI8v7BL2fjKiMtLXq3OMSsm6MR1U7Pz9pWOxFH+/GTmTGdfSkm/dcanv/kfWKtxXcXu7g3CnV1aF+c8ffIdx0fnJHEKWjNoXiBdl5InyYYjXEfwzg/WsQYOHp/xzdfH7N9co7FZmY51TTensGJpTwYxU7aJxaLh2gx8GQLs0hYFcnnqfH421v6Rw/5Xo6EWaw3XzZ9IaZF6SBrH9Lo9tnf32dzZptW64PXBS548fko8GJL3+2AKRmmKF/gE1RphvYZVLv1BzuN/fMWnv3+J9CSDQcHRswtcJXFdNamS7HQOeZYQXWyQr46XiwP8drrhxSLzpVaOkgveIBoUS/Nli0YSs9z2rGLRWoRQuKKPF9a5dfd90iTli99/Rp6lGKMxSIzWGAGt0zMQcswmD4YUhcHkOd+9LJCeQJR91soBoefQetkh6aU0dqtEdR/XdzHWYiZ6P2Mn4/nCLitQ/whN5HW6e/V9E/CzDRS7YiR5vGTmv/pNQ6TWWhyhUH4FJJwfnXNxccHRs5doY3GDiDwpIE2wKNbqIcVwRKYUJZmSej6qpLh3z6W1FeGe5ZQcwUmccnjYIY8LYq3xfYcbDzeJaiG60JNtAljQ+9mVQ+R2LvYtzbnPdUDe2FhfmMufCw52DlmKudniOXHhjGJ/+pY0nL74ik/+69+TWovyIpygQiBiNssZtiKo1eskmSUKBUcnCtd1uHlzg8Go4A9Pm5weGoQDrtFoxmXc7lpEFHjkg5SXr9rIUPGoEaHnkss1HiVme0BcO7G6iIfVygB33YyIEDMzw7P53F6OJSGMvTKwWF4e2oJyHDYaUG+s45Usn33aIR/m3HhQY2frchhQUJuc+a1qiBCCQhsa9ZC8M+DkWcr+RhnPU3S0oRYFlFwJwrJfL40VXfVwAmfFQpFgZzYSsteO9c7RAmJFmrUgmaVx7MzuQau2PLF29eySGA+c+LEea4wFy/uhTHBiMBnxbw8yKhWPjUaJXCt2d1y2Gook0RS5RReGvDDowlDo8cS6QKBzg0Ki0Ois4FWzT3uYYq2lNRj3l086A4wraDTKWDMD9Fkx7DapYa7fd2k5HcxuFyCFkFcYScwbx9o3xMeZgsVxBJ2zIedPW3ReticixRmSdnKiIi/4ca3Ex5UQv5vh2JwXx32yuGC9EWClnMNrl4yHlBNlrACDpVErs9eokUzAsysFzVGKG7gMJlNIgevgBwpjzFQUKea297BLGyWM4Y+cTnSuorEWDS1nweaU1lnJyIhrgA5jujzOeHneJ+/n9J53cBAgxXQVSyEotOX3Ty9YdyV/cX+Dcgvik4IkHvHsyxPINVI500doFjZ7uLyOvYfr3P9wjzu3G9R9xShJCeQ4PGhjEdaysVvBSjHZ0WNx0yAxh52no6z2e7dAm++fC3A++uDmX9uF8bdLIHo9oyXmUJTjSOJBysGLJsr32I589CijcABPIaXEWIsfuJy87nJyMSTWlpJUbDoujjV0OyPczOBVfISSMxt8LY6SgRu4+JFH1Ahpn/axGtJiLMZM0oL7P9xl/05jrPUTgmUNpFgacWURds1mXLvsRJfnUteF0kux9VxLZbrnwJWCwQqL1oZao0QU+SRJxlFzwJ3tCtUEMlkwcASe69A66aFzjSx51EseXx8PKFJNzXWp393k+KyPGqZUgtLYk5aI2/FrWmuMEZOtocBxHSq+R14YjNDU1yOMGXv9HEGwsEHZ8qaKdq59KWa1BXYWSSyyMZPRrKu9phbLudl23nLhZ7TBL3vcerDBH746QWMxZ4L7UlC1LlIb0lxzO/B4IQS+cjjrpVQDh8fnfS46MQZDdT1kuxZgtEUKuXJfl8uQ4biS4+/OKbuKrWpEkmnOWkNkSeJ6zlXysHOpdGHi0s5QVTO18wzBPK0rZkjbuZ7ImFmdpa7EyjVvFxSXi0StKQxr22WC5y79fkKSFJR8RRC4hJ7iVXPInZ0q+42A37/s0uwP6Q5jHCPI85Qf/fQeYX3cr7hUBogZVu0KKYwL0NarDkcvWrhS0otzfN+nFydUoxK+61BoM0VadjpKPqahhXNFvzExzjjXXTbSxNJ+X9aukjBM6Cwzx6zYhXbI8oaEVx5/5YnGGpTn8KOf3uH4aZPT4x4X3RHb9ZBOrqmXfI6aQ3bqAZVQcdpJ2KuV+O2TE2qVkLAS4AiBcOXlph9jcuIyZhmDUA5ow8k358TdhHIUkhcaoUEXBVIKquWQdhfS1CAdBxeDI4px60FaVNml6OeTu5djB8wNxhpMMX5wbqhwPXU9RT3jcMrOWdhON42dlXnMFeeLYqQFaCOVw/6jLXbuNXj820O+fNYkiALqJYU2EOcjtmohm9WMFydd/NAjagQUuWbQNxRxgkTgBgqEpIgzUB6xEYi0S95NuTgZoAUEk4Z5oTN6o4xBmvHNiyaPD8dtg7BSRg/71EsOG7USymikJ8mTAtdxCDZChC8wmSWPc5DjDqNUYmxAe01pOzPqq1ZPoovpTjNiOnQiVvCBYmLcMcgVjpgiATf02Htrg5NnTdrdAafnmrDkUQkD2r2MojC0+jlRLWDv1jrtpsFRgiIfi9lVZhjEGZ3zLv3MEFuJ7XUnnu6SZxnhSFEUGiMdSmWftc0anq8IlEBnhv6wSTVQBDhkgxjjStbWyzglFyXAL7sYY9FOQWmnjDHgh+P4ORsWryQddsUSXsnQiumSntWDzGHjSQcsiTOEhmKYI0sKv+pDUqAdh2oloPTeLn/44giTjSgKjdYFxx2NkIJaoIhRvDw3ZHmG0SmOVHi6IHAMnWabiyTFdx1q5RJeYweNwqQJYSCJfIsjHbxyQBC6eNIglERaQTLMsHKsm0mHOdkgx2qNrHr4ucH1HfzQw2qDCcdQSwCmsHOkwmWvwIrVXOiKPRPECv5/1X6pY8O6nkJO0IKxlsHpkH43psg0w4GmXwjKniSqhiSp5rTVJ04yGpWxrLbTG0F3iB8EWOmyu6mo1kJcp6CxvskDB/JRhvQcqlvRpOiqIqVg0BxRGEtYc/H88ZKXk80ZvZICBFmhx9ixpHA8H2EsBjtuBUwqGSmutsgTUqzYG+F6nkAtcSkrgttSk25mnsR1FHlWIFyJQmAzy/puhWSUU93z2MGQDlOyUU418Ol3BmTaMOgluFrz8N4GsuRRKbuoICBwDEaA63kgBWlc4HgS13dxlHOV7KwlXA/HfeAxzgBr0XZ2jkOgpKBU8/B8d1LWiaUu3FI38jJ5zmplLAubVI5f+P8Bkq0RGYjwP0gAAAAASUVORK5CYII=';

    const printHTML = `<!DOCTYPE html>
<html><head><title>${this.dungeon.metadata.name}</title>
<style>
body { font-family: Georgia, serif; padding: 20px; color: #2a2218; background: #fffbf0; }
.pdf-header { display: flex; align-items: center; gap: 16px; padding-bottom: 12px; border-bottom: 3px solid #b89a50; margin-bottom: 20px; }
.pdf-header img { width: 56px; height: 56px; border-radius: 50%; border: 3px solid #b89a50; object-fit: cover; }
.pdf-header-text h1 { font-size: 24px; margin: 0; color: #2a2218; }
.pdf-header-text p { font-size: 13px; margin: 4px 0 0; color: #6a5a40; }
h2 { font-size: 18px; margin-top: 24px; color: #4a3a28; border-bottom: 1px solid #d4c8a8; padding-bottom: 4px; }
h3 { font-size: 15px; margin: 8px 0 4px; color: #444; }
.map-img { max-width: 100%; border: 2px solid #b89a50; border-radius: 4px; }
.room-block { margin-bottom: 16px; padding: 12px; border: 1px solid #d4c8a8; border-radius: 6px; background: #fff8e8; page-break-inside: avoid; }
ul { margin: 4px 0; padding-left: 20px; }
li { margin: 2px 0; }
.pdf-footer { margin-top: 32px; padding-top: 12px; border-top: 2px solid #b89a50; display: flex; align-items: center; gap: 12px; }
.pdf-footer img { width: 36px; height: 36px; border-radius: 50%; border: 2px solid #b89a50; object-fit: cover; }
.pdf-footer-text { font-size: 11px; color: #8a7a60; font-style: italic; }
.pdf-footer-text strong { color: #4a3a28; font-style: normal; }
@media print { body { padding: 0; background: #fff; } }
</style></head><body>
<div class="pdf-header">
  <img src="${mascotB64}" alt="Grizzik">
  <div class="pdf-header-text">
    <h1>${this.dungeon.metadata.name}</h1>
    <p>Theme: ${this.dungeon.metadata.theme} · Size: ${this.dungeon.width}×${this.dungeon.height} · Rooms: ${this.dungeon.getRoomCount()}</p>
  </div>
</div>
<h2>Map</h2>
<img class="map-img" src="${mapDataUrl}" alt="Dungeon Map">
<h2>Room Details</h2>
${encounterHTML}
<div class="pdf-footer">
  <img src="${mascotB64}" alt="Grizzik">
  <div class="pdf-footer-text">
    Cartography by <strong>Grizzik the Cartographer</strong> · Generated with <strong>Master Dungeon Maker</strong>
  </div>
</div>
</body></html>`;

    const blob = new Blob([printHTML], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (this.dungeon.metadata.name || 'dungeon').replace(/[^a-z0-9]/gi, '-').toLowerCase() + '-details.html';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  // -- Theme setup --
  _setupTheme() {
    const select = document.getElementById('theme-select');
    // Populate theme dropdown
    for (const [id, theme] of Object.entries(DUNGEON_THEMES)) {
      const opt = document.createElement('option');
      opt.value = id;
      opt.textContent = theme.name;
      select.appendChild(opt);
    }
    select.value = this.renderer.activeTheme;

    select.addEventListener('change', () => {
      this.renderer.activeTheme = select.value;
      const theme = DUNGEON_THEMES[select.value];
      document.getElementById('theme-description').textContent = theme ? theme.description : '';
      this._renderThemePreview();
      this._render();
    });

    // Initial preview
    this._renderThemePreview();
  }

  _renderThemePreview() {
    const canvas = document.getElementById('theme-preview');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const themeId = this.renderer.activeTheme;
    const theme = DUNGEON_THEMES[themeId] || DUNGEON_THEMES.classic;
    const texRenderer = this.renderer.textureRenderer;
    const ts = 16;
    const cols = Math.floor(canvas.width / ts);
    const rows = Math.floor(canvas.height / ts);

    ctx.fillStyle = theme.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw a mini sample dungeon
    const sampleMap = [
      'wwwwwwwwwwww',
      'wrrrrdccccww',
      'wrrrrdccccww',
      'wrrrrdccswww',
      'wwwdwwccwwww',
      'wcccccrrrtww',
      'wcccccrrrGww',
    ];
    // w=wall, r=room, d=door, c=corridor, s=stairs, t=trap, G=treasure
    const charToType = { w: 'wall', r: 'room', d: 'door', c: 'corridor', s: 'stairs', t: 'trap', G: 'treasure' };

    for (let y = 0; y < Math.min(rows, sampleMap.length); y++) {
      for (let x = 0; x < Math.min(cols, sampleMap[y].length); x++) {
        const ch = sampleMap[y][x];
        const tileType = charToType[ch];
        if (tileType) {
          texRenderer.drawTile(ctx, x * ts, y * ts, ts, tileType, themeId, x, y);
        }
        ctx.strokeStyle = theme.gridLine;
        ctx.lineWidth = 0.4;
        ctx.strokeRect(x * ts, y * ts, ts, ts);
      }
    }
  }

  // -- Encounter Panel --
  _setupEncounterPanel() {
    this._activeEncRoomId = null;

    // Populate monster select
    const monsterSelect = document.getElementById('enc-monster-select');
    if (typeof MONSTERS !== 'undefined') {
      MONSTERS.sort((a, b) => a.cr - b.cr).forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.name;
        opt.textContent = `${m.name} (CR ${m.cr})`;
        monsterSelect.appendChild(opt);
      });
    }

    // Populate trap select
    const trapSelect = document.getElementById('enc-trap-select');
    if (typeof TRAPS !== 'undefined') {
      TRAPS.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.name;
        opt.textContent = `${t.name} (DC ${t.dc})`;
        trapSelect.appendChild(opt);
      });
    }

    // Close button
    document.getElementById('enc-close').addEventListener('click', () => {
      document.getElementById('encounter-panel').classList.remove('active');
      this._activeEncRoomId = null;
    });

    // Add monster
    document.getElementById('enc-add-monster').addEventListener('click', () => {
      if (!this._activeEncRoomId) return;
      const name = document.getElementById('enc-monster-select').value;
      const count = parseInt(document.getElementById('enc-monster-count').value) || 1;
      const monster = (typeof MONSTERS !== 'undefined' ? MONSTERS : []).find(m => m.name === name);
      if (!monster) return;

      this._ensureEncounter(this._activeEncRoomId);
      const enc = this.dungeon.encounters[this._activeEncRoomId];
      const existing = enc.monsters.find(m => m.name === name);
      if (existing) {
        existing.count += count;
      } else {
        enc.monsters.push({ name, cr: monster.cr, xp: monster.xp, count, type: monster.type });
      }
      this._refreshEncounterPanel();
    });

    // Add trap
    document.getElementById('enc-add-trap').addEventListener('click', () => {
      if (!this._activeEncRoomId) return;
      const name = document.getElementById('enc-trap-select').value;
      const trap = (typeof TRAPS !== 'undefined' ? TRAPS : []).find(t => t.name === name);
      if (!trap) return;

      this._ensureEncounter(this._activeEncRoomId);
      const enc = this.dungeon.encounters[this._activeEncRoomId];
      if (!enc.traps.find(t => t.name === name)) {
        enc.traps.push({ ...trap });
      }
      this._refreshEncounterPanel();
    });

    // Roll loot
    document.getElementById('enc-roll-loot').addEventListener('click', () => {
      if (!this._activeEncRoomId) return;
      this._ensureEncounter(this._activeEncRoomId);
      const enc = this.dungeon.encounters[this._activeEncRoomId];
      const avgCR = enc.monsters.length > 0
        ? enc.monsters.reduce((s, m) => s + m.cr * m.count, 0) / enc.monsters.reduce((s, m) => s + m.count, 0)
        : 1;
      enc.loot = this.encounterGen.generateLoot(avgCR);
      this._refreshEncounterPanel();
    });

    // Auto-populate room
    document.getElementById('enc-auto-populate').addEventListener('click', () => {
      if (!this._activeEncRoomId) return;
      this._autoPopulateRoom(this._activeEncRoomId);
      this._refreshEncounterPanel();
    });

    // Auto-populate all rooms
    document.getElementById('enc-auto-all').addEventListener('click', () => {
      for (const roomId of Object.keys(this.dungeon.rooms)) {
        this._autoPopulateRoom(roomId);
      }
      if (this._activeEncRoomId) this._refreshEncounterPanel();
      this._updateStats();
    });

    // Clear encounters
    document.getElementById('enc-clear').addEventListener('click', () => {
      if (!this._activeEncRoomId) return;
      delete this.dungeon.encounters[this._activeEncRoomId];
      this._refreshEncounterPanel();
    });

    // Party size/level change
    document.getElementById('enc-party-size').addEventListener('change', () => this._refreshEncounterPanel());
    document.getElementById('enc-party-level').addEventListener('change', () => this._refreshEncounterPanel());
  }

  _ensureEncounter(roomId) {
    if (!this.dungeon.encounters[roomId]) {
      this.dungeon.encounters[roomId] = {
        roomId,
        monsters: [],
        loot: null,
        traps: [],
      };
    }
  }

  _autoPopulateRoom(roomId) {
    const partySize = parseInt(document.getElementById('enc-party-size').value) || 4;
    const partyLevel = parseInt(document.getElementById('enc-party-level').value) || 3;
    const theme = this.dungeon.metadata.theme || 'dungeon';

    const result = this.encounterGen.generateForRoom(partySize, partyLevel, theme, 'medium');
    const avgCR = result.monsters.length > 0
      ? result.monsters.reduce((s, m) => s + m.cr * m.count, 0) / result.monsters.reduce((s, m) => s + m.count, 0)
      : 1;
    const loot = this.encounterGen.generateLoot(avgCR);

    // Maybe add a trap (30% chance)
    const traps = [];
    if (Math.random() < 0.3) {
      const trap = this.encounterGen.generateTrap();
      if (trap) traps.push(trap);
    }

    this.dungeon.encounters[roomId] = {
      roomId,
      monsters: result.monsters,
      loot,
      traps,
    };
  }

  openEncounterPanel(roomId) {
    this._activeEncRoomId = roomId;
    const room = this.dungeon.rooms[roomId];
    document.getElementById('enc-room-name').textContent = room ? (room.name || 'Unnamed Room') : 'Room';
    document.getElementById('encounter-panel').classList.add('active');
    this._refreshEncounterPanel();
  }

  _refreshEncounterPanel() {
    if (!this._activeEncRoomId) return;
    const enc = this.dungeon.encounters[this._activeEncRoomId] || { monsters: [], loot: null, traps: [] };
    const partySize = parseInt(document.getElementById('enc-party-size').value) || 4;
    const partyLevel = parseInt(document.getElementById('enc-party-level').value) || 3;

    // Monster list
    const monsterList = document.getElementById('enc-monster-list');
    monsterList.innerHTML = '';
    let totalXP = 0;
    for (const m of enc.monsters) {
      totalXP += m.xp * m.count;
      const div = document.createElement('div');
      div.className = 'encounter-item';
      div.innerHTML = `<span>${m.count}x ${m.name} <span style="color:var(--text-dim)">(CR ${m.cr}, ${m.xp * m.count} XP)</span></span>
        <button class="remove-btn" data-monster="${m.name}">&times;</button>`;
      monsterList.appendChild(div);
    }
    if (enc.monsters.length === 0) {
      monsterList.innerHTML = '<div style="color:var(--text-dim);font-size:12px;font-style:italic;">No monsters</div>';
    }

    // Remove monster handlers
    monsterList.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        enc.monsters = enc.monsters.filter(m => m.name !== btn.dataset.monster);
        this._refreshEncounterPanel();
      });
    });

    // Difficulty
    const difficulty = this.encounterGen.getDifficulty(totalXP, partySize, partyLevel);
    const diffEl = document.getElementById('enc-difficulty');
    diffEl.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    diffEl.className = 'difficulty-badge difficulty-' + difficulty;
    document.getElementById('enc-xp-total').textContent = totalXP + ' XP';

    // Loot
    const lootEl = document.getElementById('enc-loot-summary');
    if (enc.loot && (enc.loot.coins > 0 || (enc.loot.items && enc.loot.items.length > 0))) {
      let html = '';
      if (enc.loot.coins > 0) html += `<div><strong>${enc.loot.coins} ${enc.loot.unit || 'gp'}</strong></div>`;
      if (enc.loot.items) {
        for (const item of enc.loot.items) {
          html += `<div>${item.name} <span style="color:var(--text-dim);font-size:11px;">(${item.rarity})</span></div>`;
        }
      }
      lootEl.innerHTML = html;
    } else {
      lootEl.textContent = 'No loot — click "Roll Random Loot"';
    }

    // Traps
    const trapList = document.getElementById('enc-trap-list');
    trapList.innerHTML = '';
    for (const t of (enc.traps || [])) {
      const div = document.createElement('div');
      div.className = 'trap-item encounter-item';
      const sevColor = (typeof TRAP_SEVERITY !== 'undefined' && TRAP_SEVERITY[t.severity])
        ? TRAP_SEVERITY[t.severity].color : '#aaa';
      div.innerHTML = `<span>${t.name} <span class="trap-severity" style="background:${sevColor};color:#fff;">${t.severity}</span>
        <br><span style="color:var(--text-dim);font-size:11px;">DC ${t.dc} · ${t.damage}</span></span>
        <button class="remove-btn" data-trap="${t.name}">&times;</button>`;
      trapList.appendChild(div);
    }
    if (!enc.traps || enc.traps.length === 0) {
      trapList.innerHTML = '<div style="color:var(--text-dim);font-size:12px;font-style:italic;">No traps</div>';
    }

    // Remove trap handlers
    trapList.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        enc.traps = enc.traps.filter(t => t.name !== btn.dataset.trap);
        this._refreshEncounterPanel();
      });
    });
  }

  // -- Helpers --
  _centerDungeon() {
    const rect = this.canvasContainer.getBoundingClientRect();
    const ts = this.renderer.tileSize * this.renderer.zoom;
    const dw = this.dungeon.width * ts;
    const dh = this.dungeon.height * ts;
    this.renderer.offsetX = (rect.width - dw) / 2;
    this.renderer.offsetY = (rect.height - dh) / 2;
  }

  _updateStats() {
    document.getElementById('dungeon-size').textContent = `${this.dungeon.width} × ${this.dungeon.height}`;
    document.getElementById('dungeon-tile-count').textContent = this.dungeon.getTileCount();
    document.getElementById('dungeon-room-count').textContent = this.dungeon.getRoomCount();
  }

  _render() {
    requestAnimationFrame(() => this.renderer.render());
  }

  // ---- AUTH INTEGRATION ----
  _setupAuthAndCloud() {
    // Try immediately (CDN may already be loaded)
    if (isSupabaseConfigured()) {
      this._setupAuth();
      this._setupCloudModals();
      return;
    }
    // Hide auth UI initially
    document.getElementById('user-menu').style.display = 'none';
    document.getElementById('auth-prompt').style.display = 'none';
    // Wait for async CDN load, then try again
    if (window._supabaseReady) {
      window._supabaseReady.then(loaded => {
        if (loaded && isSupabaseConfigured()) {
          this._setupAuth();
          this._setupCloudModals();
        }
      });
    }
  }

  _setupAuth() {
    if (!isSupabaseConfigured()) {
      // Hide auth UI if Supabase not configured
      document.getElementById('user-menu').style.display = 'none';
      document.getElementById('auth-prompt').style.display = 'none';
      return;
    }

    // Init auth and update UI
    initAuth().then(user => {
      this.currentUser = user;
      this._updateUserMenu();
    });

    // Listen for auth changes
    onAuthChange((user) => {
      this.currentUser = user;
      this._updateUserMenu();
      if (user) {
        this._loadUserSettingsFromCloud();
      }
    });

    // Auth modal tab switching
    document.querySelectorAll('[data-auth-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.authTab;
        document.querySelectorAll('[data-auth-tab]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('auth-tab-login').style.display = tab === 'login' ? 'block' : 'none';
        document.getElementById('auth-tab-signup').style.display = tab === 'signup' ? 'block' : 'none';
      });
    });

    // Login submit
    document.getElementById('auth-submit-login').addEventListener('click', async () => {
      const email = document.getElementById('auth-email-login').value.trim();
      const pass = document.getElementById('auth-password-login').value;
      const errEl = document.getElementById('auth-error-login');
      errEl.classList.remove('show');
      try {
        await authLogin(email, pass);
        document.getElementById('auth-modal').classList.remove('active');
      } catch (err) {
        errEl.textContent = err.message || 'Login failed';
        errEl.classList.add('show');
      }
    });

    // Signup submit
    document.getElementById('auth-submit-signup').addEventListener('click', async () => {
      const email = document.getElementById('auth-email-signup').value.trim();
      const pass = document.getElementById('auth-password-signup').value;
      const confirm = document.getElementById('auth-password-confirm').value;
      const errEl = document.getElementById('auth-error-signup');
      const successEl = document.getElementById('auth-success-signup');
      errEl.classList.remove('show');
      successEl.classList.remove('show');

      if (pass !== confirm) {
        errEl.textContent = 'Passwords do not match';
        errEl.classList.add('show');
        return;
      }
      if (pass.length < 6) {
        errEl.textContent = 'Password must be at least 6 characters';
        errEl.classList.add('show');
        return;
      }
      try {
        const data = await authSignUp(email, pass);
        if (data.user && !data.session) {
          successEl.textContent = 'Check your email to confirm your account!';
          successEl.classList.add('show');
        } else {
          document.getElementById('auth-modal').classList.remove('active');
        }
      } catch (err) {
        errEl.textContent = err.message || 'Signup failed';
        errEl.classList.add('show');
      }
    });

    // Cancel buttons
    document.getElementById('auth-cancel-login').addEventListener('click', () => {
      document.getElementById('auth-modal').classList.remove('active');
    });
    document.getElementById('auth-cancel-signup').addEventListener('click', () => {
      document.getElementById('auth-modal').classList.remove('active');
    });

    // Login button in header
    document.getElementById('btn-login').addEventListener('click', () => {
      document.getElementById('auth-modal').classList.add('active');
    });

    // Logout button
    document.getElementById('btn-logout').addEventListener('click', async () => {
      await authLogout();
      this.currentUser = null;
      this.currentCloudId = null;
      this._updateUserMenu();
    });

    // Enter key submits forms
    document.getElementById('auth-password-login').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('auth-submit-login').click();
    });
    document.getElementById('auth-password-confirm').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('auth-submit-signup').click();
    });
  }

  _updateUserMenu() {
    const userMenu = document.getElementById('user-menu');
    const authPrompt = document.getElementById('auth-prompt');
    if (this.currentUser) {
      userMenu.style.display = 'flex';
      authPrompt.style.display = 'none';
      document.getElementById('user-email').textContent = this.currentUser.email;
    } else {
      userMenu.style.display = 'none';
      authPrompt.style.display = isSupabaseConfigured() ? 'flex' : 'none';
    }
  }

  // ---- CLOUD MODALS ----
  _setupCloudModals() {
    if (!isSupabaseConfigured()) return;

    // Cloud Save handlers
    document.getElementById('cloud-save-go').addEventListener('click', async () => {
      const name = document.getElementById('cloud-save-name').value.trim() || 'Untitled Dungeon';
      const desc = document.getElementById('cloud-save-desc').value.trim();
      const isPublic = document.getElementById('cloud-save-public').checked;
      const errEl = document.getElementById('cloud-save-error');
      const successEl = document.getElementById('cloud-save-success');
      errEl.classList.remove('show');
      successEl.classList.remove('show');

      // Update dungeon name
      this.dungeon.metadata.name = name;
      document.getElementById('dungeon-name').value = name;
      document.getElementById('header-dungeon-name').value = name;

      try {
        const json = this.dungeon.toJSON();
        const result = await saveDungeonToCloud(json, name, desc, isPublic, this.currentCloudId);
        this.currentCloudId = result.id;
        successEl.textContent = 'Saved to cloud!';
        successEl.classList.add('show');
        setTimeout(() => {
          document.getElementById('cloud-save-modal').classList.remove('active');
        }, 1000);
      } catch (err) {
        errEl.textContent = 'Save failed: ' + (err.message || err);
        errEl.classList.add('show');
      }
    });

    document.getElementById('cloud-save-cancel').addEventListener('click', () => {
      document.getElementById('cloud-save-modal').classList.remove('active');
    });

    document.getElementById('cloud-save-local').addEventListener('click', () => {
      document.getElementById('cloud-save-modal').classList.remove('active');
      this._saveLocal();
    });

    // Cloud Load handlers
    document.getElementById('cloud-load-cancel').addEventListener('click', () => {
      document.getElementById('cloud-load-modal').classList.remove('active');
    });

    document.getElementById('cloud-load-local').addEventListener('click', () => {
      document.getElementById('cloud-load-modal').classList.remove('active');
      document.getElementById('file-input').click();
    });

    // Share handlers
    document.getElementById('btn-share').addEventListener('click', async () => {
      if (!this.currentUser) {
        document.getElementById('auth-modal').classList.add('active');
        return;
      }
      if (!this.currentCloudId) {
        // Need to save first
        this._save();
        return;
      }
      try {
        const url = await shareDungeon(this.currentCloudId);
        document.getElementById('share-link').value = url;
        document.getElementById('share-success').classList.remove('show');
        document.getElementById('share-modal').classList.add('active');
      } catch (err) {
        alert('Share failed: ' + (err.message || err));
      }
    });

    document.getElementById('share-copy').addEventListener('click', () => {
      const input = document.getElementById('share-link');
      input.select();
      navigator.clipboard.writeText(input.value).then(() => {
        const successEl = document.getElementById('share-success');
        successEl.textContent = 'Copied to clipboard!';
        successEl.classList.add('show');
      });
    });

    document.getElementById('share-close').addEventListener('click', () => {
      document.getElementById('share-modal').classList.remove('active');
    });

    // Close modals on overlay click
    ['auth-modal', 'cloud-save-modal', 'cloud-load-modal', 'share-modal'].forEach(id => {
      document.getElementById(id).addEventListener('click', (e) => {
        if (e.target.id === id) e.target.classList.remove('active');
      });
    });
  }

  async _showCloudLoadModal() {
    const listEl = document.getElementById('cloud-load-list');
    const emptyEl = document.getElementById('cloud-load-empty');
    const errEl = document.getElementById('cloud-load-error');
    listEl.innerHTML = '<div style="color:var(--text-dim);text-align:center;padding:16px;">Loading...</div>';
    emptyEl.style.display = 'none';
    errEl.classList.remove('show');
    document.getElementById('cloud-load-modal').classList.add('active');

    try {
      const dungeons = await listUserDungeons();
      if (dungeons.length === 0) {
        listEl.innerHTML = '';
        emptyEl.style.display = 'block';
        return;
      }
      emptyEl.style.display = 'none';
      listEl.innerHTML = dungeons.map(d => `
        <div class="cloud-dungeon-item" data-id="${d.id}">
          <div class="cloud-dungeon-item-info">
            <div class="cloud-dungeon-item-name">${this._escapeHtml(d.name)}</div>
            <div class="cloud-dungeon-item-meta">
              ${d.theme || 'classic'} &middot; ${new Date(d.updated_at).toLocaleDateString()} ${new Date(d.updated_at).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}
              ${d.is_public ? ' &middot; Public' : ''}
            </div>
          </div>
          <button class="delete-btn" data-id="${d.id}" title="Delete">&times;</button>
        </div>
      `).join('');

      // Click to load
      listEl.querySelectorAll('.cloud-dungeon-item-info').forEach(info => {
        info.addEventListener('click', async () => {
          const id = info.parentElement.dataset.id;
          try {
            const record = await loadDungeonFromCloud(id);
            this.dungeon = Dungeon.fromJSON(record.data);
            this.renderer.dungeon = this.dungeon;
            this.currentCloudId = id;
            this.history.clear();
            this.history.save(this.dungeon);
            this._centerDungeon();
            this._updateStats();
            this._render();
            document.getElementById('dungeon-name').value = this.dungeon.metadata.name;
            document.getElementById('header-dungeon-name').value = this.dungeon.metadata.name;
            document.getElementById('cloud-load-modal').classList.remove('active');
          } catch (err) {
            errEl.textContent = 'Load failed: ' + (err.message || err);
            errEl.classList.add('show');
          }
        });
      });

      // Delete buttons
      listEl.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation();
          if (!confirm('Delete this dungeon from the cloud?')) return;
          try {
            await deleteDungeonFromCloud(btn.dataset.id);
            if (this.currentCloudId === btn.dataset.id) this.currentCloudId = null;
            this._showCloudLoadModal(); // refresh list
          } catch (err) {
            errEl.textContent = 'Delete failed: ' + (err.message || err);
            errEl.classList.add('show');
          }
        });
      });
    } catch (err) {
      listEl.innerHTML = '';
      errEl.textContent = 'Failed to load: ' + (err.message || err);
      errEl.classList.add('show');
    }
  }

  _escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ---- SHARE LINK CHECK ----
  async _checkShareLink() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('share');
    if (!token || !isSupabaseConfigured()) return;

    try {
      const record = await loadSharedDungeon(token);
      this.dungeon = Dungeon.fromJSON(record.data);
      this.renderer.dungeon = this.dungeon;
      this.history.clear();
      this.history.save(this.dungeon);
      this._centerDungeon();
      this._updateStats();
      this._render();
      document.getElementById('dungeon-name').value = this.dungeon.metadata.name + ' (shared)';
      document.getElementById('header-dungeon-name').value = this.dungeon.metadata.name + ' (shared)';
      // Clear share param from URL without reload
      window.history.replaceState({}, '', window.location.pathname);
    } catch (err) {
      console.warn('Could not load shared dungeon:', err);
    }
  }

  // ---- USER SETTINGS SYNC ----
  async _loadUserSettingsFromCloud() {
    try {
      const settings = await loadUserSettings();
      if (!settings) return;
      // Apply theme
      if (settings.theme_visual && document.getElementById('theme-select')) {
        document.getElementById('theme-select').value = settings.theme_visual;
        document.getElementById('theme-select').dispatchEvent(new Event('change'));
      }
      // Apply volume
      if (settings.music_volume !== undefined) {
        const volSlider = document.getElementById('music-volume');
        const volLabel = document.getElementById('music-vol-label');
        const audio = document.getElementById('bg-music');
        if (volSlider) volSlider.value = settings.music_volume;
        if (volLabel) volLabel.textContent = settings.music_volume + '%';
        if (audio) audio.volume = settings.music_volume / 100;
      }
    } catch (err) {
      console.warn('Could not load user settings:', err);
    }
  }

  _saveUserSettingsDebounced() {
    if (this._settingsTimer) clearTimeout(this._settingsTimer);
    this._settingsTimer = setTimeout(async () => {
      if (!this.currentUser) return;
      try {
        await saveUserSettings({
          theme_visual: document.getElementById('theme-select')?.value || 'classic',
          music_volume: parseInt(document.getElementById('music-volume')?.value) || 50,
          party_size: parseInt(document.getElementById('enc-party-size')?.value) || 4,
          party_level: parseInt(document.getElementById('enc-party-level')?.value) || 3,
        });
      } catch (err) {
        console.warn('Could not save settings:', err);
      }
    }, 1500);
  }
}

// ---- GOBLIN CHAT TIPS ----
const GOBLIN_TIPS = {
  general: [
    "Every good dungeon needs at least one room the party will argue about entering, boss!",
    "Corridors should twist and turn — straight lines are for amateurs and dwarves!",
    "Place your biggest treasure room far from the entrance. Make 'em work for it!",
    "A dead end ain't useless — it's where you put a trap or a secret!",
    "Try connecting rooms with multiple corridors. Gives the party choices, see?",
    "The best dungeons tell a story. Why was this place built? Who lived here?",
    "Don't forget verticality! Stairs up and down make a dungeon feel three-dimensional.",
    "Symmetry looks pretty but breaks immersion. Real places ain't perfectly balanced!",
    "Leave some empty rooms. Not everything needs a monster — tension is free!",
    "Chokepoints are your friend! A narrow corridor before a big room creates drama.",
    "Consider the ecology — where do the monsters sleep, eat, and... y'know... go?",
    "A good dungeon has at least two paths to the final room. Lets the party feel clever!",
    "Use doors wisely — a locked door is a puzzle, a barred door is a warning!",
    "Vary your room sizes! A huge hall after tiny tunnels feels epic.",
    "Water features — underground rivers, flooded rooms — add great atmosphere!",
  ],
  room: [
    "Big rooms should have something interesting inside — pillars, a pit, an altar, furniture!",
    "A 4×4 room is cozy for a small fight. 8×8 or bigger for a real brawl!",
    "Give important rooms multiple exits. Nothing worse than a TPK in a dead end!",
    "The boss room should be the biggest and farthest from the entrance. Classic for a reason!",
    "Try an L-shaped or T-shaped room — irregular layouts make combat more tactical!",
    "Small rooms work great for puzzles and social encounters. Not everything is a fight!",
    "A room with a balcony or raised platform? Now you've got ranged combat drama!",
    "Connected rooms (door between two) create mini-dungeons within your dungeon!",
    "Put treasure rooms behind secret doors or at the end of trapped corridors!",
    "The entrance room sets the mood — make it memorable! Statues, carvings, old bloodstains...",
    "Circular rooms are great for ritual chambers and arenas. Very dramatic, boss!",
    "A room with one entrance and treasure inside? TRAP IT. The party expects it anyway!",
  ],
  encounter: [
    "Mix monster types in encounters — a brute, a caster, and some minions keeps it spicy!",
    "An 'easy' encounter before a boss lets the party burn resources. Sneaky, right?",
    "Not every encounter needs to be a fight! A talking monster is scarier sometimes.",
    "Traps work best when combined with monsters. Pit trap + archers = chef's kiss!",
    "Scale loot to the danger. Deadly encounter, deadly treasure. Fair's fair!",
    "Put a 'deadly' encounter early but make it avoidable. Rewards clever players!",
    "Wandering monsters make the party feel pressured. Don't let 'em rest easy!",
    "Environmental hazards during combat — lava, collapsing floor, darkness — add chaos!",
    "A single powerful monster is easier than you think. Action economy favors the party!",
    "Give intelligent monsters tactics — they should use terrain, retreat, call for help!",
    "Treasure doesn't have to be gold. Maps, keys, information — these drive the story!",
    "An encounter with a moral dilemma is worth ten combat encounters. Make 'em think!",
    "Use CR as a guideline, not gospel. A well-placed CR 1 creature in a narrow hall is deadly!",
    "Spread encounters unevenly — a gauntlet of three rooms then a breather keeps pace interesting!",
  ],
};

// Context-aware tips that reference current dungeon state
function getContextTip(app) {
  const tips = [];
  const roomCount = app.dungeon.getRoomCount();
  const tileCount = app.dungeon.getTileCount();
  const theme = app.renderer.activeTheme;

  if (tileCount === 0) {
    tips.push("Your map is empty, boss! Try the Generate button to get started, or grab a tool and start drawing!");
    tips.push("Nothing here yet! Hit that Generate button or start placing walls — Grizzik believes in you!");
  } else {
    if (roomCount <= 2) {
      tips.push(`Only ${roomCount} room${roomCount === 1 ? '' : 's'}? A proper dungeon needs more variety! Add some corridors and chambers.`);
    }
    if (roomCount >= 3 && roomCount <= 5) {
      tips.push(`${roomCount} rooms — nice little dungeon forming! Consider connecting them with winding corridors.`);
    }
    if (roomCount > 8) {
      tips.push(`${roomCount} rooms! That's a proper mega-dungeon! Make sure the party has rest spots.`);
    }
    if (theme === 'cave') {
      tips.push("Cave dungeons should feel organic — try irregular room shapes and winding paths!");
    }
    if (theme === 'infernal') {
      tips.push("Infernal theme, eh? Don't forget fire traps and lava hazards. Very thematic!");
    }
    if (theme === 'ice_fortress') {
      tips.push("Ice fortress! Slippery floors could be a fun environmental hazard for encounters!");
    }
    if (theme === 'feywild') {
      tips.push("The Feywild is tricky! Consider teleportation traps and illusory walls.");
    }
    if (theme === 'shadowfell') {
      tips.push("Shadowfell dungeons should feel oppressive. Narrow corridors, dim light, undead around every corner!");
    }
    tips.push(`Your ${DUNGEON_THEMES[theme]?.name || theme} dungeon has ${tileCount} tiles placed. Looking good, boss!`);
  }
  return tips[Math.floor(Math.random() * tips.length)];
}

// ---- GOBLIN CHAT CONTROLLER ----
class GoblinChat {
  constructor(app) {
    this.app = app;
    this.avatar = document.getElementById('goblin-avatar');
    this.chat = document.getElementById('goblin-chat');
    this.tipEl = document.getElementById('goblin-tip');
    this.closeBtn = document.getElementById('goblin-chat-close');
    this.actionsEl = document.getElementById('goblin-actions');
    this.bubble = document.getElementById('goblin-bubble');
    this.isOpen = false;

    if (!this.avatar || !this.chat) return; // elements not found

    this._bind();
  }

  _bind() {
    this.avatar.addEventListener('click', () => this.toggle());
    if (this.bubble) {
      this.bubble.addEventListener('click', () => this.open());
    }
    this.closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.close();
    });
    this.actionsEl.querySelectorAll('.chat-action').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        this._showTip(action);
      });
    });
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  open() {
    this.isOpen = true;
    this.chat.classList.add('active');
    if (this.bubble) this.bubble.classList.add('hidden');
    const contextTip = getContextTip(this.app);
    this.tipEl.textContent = contextTip;
    this.avatar.style.animation = 'none';
  }

  close() {
    this.isOpen = false;
    this.chat.classList.remove('active');
    if (this.bubble) this.bubble.classList.remove('hidden');
  }

  _showTip(category) {
    const tips = GOBLIN_TIPS[category] || GOBLIN_TIPS.general;
    const tip = tips[Math.floor(Math.random() * tips.length)];
    // Animate the tip change
    this.tipEl.style.opacity = '0';
    setTimeout(() => {
      this.tipEl.textContent = tip;
      this.tipEl.style.opacity = '1';
    }, 150);
  }

}

// ---- MUSIC CONTROLLER ----
function setupMusic() {
  const btn = document.getElementById('btn-music-toggle');
  const label = document.getElementById('music-label');
  const audio = document.getElementById('bg-music');
  const volSlider = document.getElementById('music-volume');
  const volLabel = document.getElementById('music-vol-label');
  if (!btn || !audio) return;

  let playing = false;
  audio.volume = 0.5;

  // Toggle play/pause from toolbar button
  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      label.textContent = 'Play';
      btn.classList.remove('active');
      playing = false;
    } else {
      audio.currentTime = 0;
      audio.play();
      label.textContent = 'Pause';
      btn.classList.add('active');
      playing = true;
    }
  });

  volSlider.addEventListener('input', () => {
    const vol = parseInt(volSlider.value);
    audio.volume = vol / 100;
    volLabel.textContent = vol + '%';
  });

  // Return a function to start music externally
  return function startPlaying() {
    audio.currentTime = 0;
    audio.play();
    label.textContent = 'Pause';
    btn.classList.add('active');
    playing = true;
  };
}

// ---- INTRO SCREEN ----
function setupIntro(startMusicFn) {
  const intro = document.getElementById('intro-screen');
  const startBtn = document.getElementById('intro-start');
  if (!intro || !startBtn) return;

  startBtn.addEventListener('click', () => {
    // Start the music
    if (startMusicFn) startMusicFn();
    // Fade out intro
    intro.classList.add('hidden');
    // Remove from DOM after transition
    setTimeout(() => { intro.remove(); }, 700);
  });
}

// ---- BOOT ----
window.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
  window.goblinChat = new GoblinChat(window.app);
  const startMusicFn = setupMusic();
  setupIntro(startMusicFn);
});
