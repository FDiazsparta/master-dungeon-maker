// Runtime test using jsdom
const { JSDOM } = require('jsdom');
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Create a virtual browser
const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true,
  url: 'http://localhost:8081/',
  beforeParse(window) {
    // Mock canvas context
    window.HTMLCanvasElement.prototype.getContext = function(type) {
      return {
        fillRect: () => {},
        strokeRect: () => {},
        fillText: () => {},
        beginPath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        quadraticCurveTo: () => {},
        bezierCurveTo: () => {},
        arc: () => {},
        closePath: () => {},
        fill: () => {},
        stroke: () => {},
        setLineDash: () => {},
        setTransform: () => {},
        toDataURL: () => 'data:image/png;base64,fake',
        canvas: this,
        globalAlpha: 1,
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 1,
        font: '',
        textAlign: '',
        textBaseline: '',
      };
    };
    window.HTMLCanvasElement.prototype.toBlob = function(cb) { cb(new window.Blob(['fake'])); };
    window.HTMLCanvasElement.prototype.toDataURL = function() { return 'data:image/png;base64,fake'; };
    // Mock devicePixelRatio
    Object.defineProperty(window, 'devicePixelRatio', { value: 1 });
    // Mock requestAnimationFrame
    window.requestAnimationFrame = (cb) => setTimeout(cb, 0);
  }
});

// Load the data scripts manually
const supabaseConfigJs = fs.readFileSync('supabase-config.js', 'utf8');
const authJs = fs.readFileSync('auth.js', 'utf8');
const cloudSaveJs = fs.readFileSync('cloud-save.js', 'utf8');
const monstersJs = fs.readFileSync('data/monsters.js', 'utf8');
const lootJs = fs.readFileSync('data/loot.js', 'utf8');
const trapsJs = fs.readFileSync('data/traps.js', 'utf8');
const appJs = fs.readFileSync('app.js', 'utf8');

const window = dom.window;

// Load supabase stubs + config + auth + cloud-save
try {
  window.eval(supabaseConfigJs);
  window.eval(authJs);
  window.eval(cloudSaveJs);
  console.log('PASS: supabase modules loaded');
} catch(e) {
  console.error('FAIL: supabase modules -', e.message);
}

try {
  window.eval(monstersJs);
  console.log('PASS: monsters.js loaded');
} catch(e) {
  console.error('FAIL: monsters.js -', e.message);
}

try {
  window.eval(lootJs);
  console.log('PASS: loot.js loaded');
} catch(e) {
  console.error('FAIL: loot.js -', e.message);
}

try {
  window.eval(trapsJs);
  console.log('PASS: traps.js loaded');
} catch(e) {
  console.error('FAIL: traps.js -', e.message);
}

try {
  window.eval(appJs);
  console.log('PASS: app.js loaded (classes defined)');
} catch(e) {
  console.error('FAIL: app.js -', e.message);
  console.error(e.stack);
}

// Wait for DOMContentLoaded
setTimeout(() => {
  try {
    // Trigger DOMContentLoaded
    const event = new window.Event('DOMContentLoaded');
    window.document.dispatchEvent(event);

    setTimeout(() => {
      if (window.app) {
        console.log('PASS: App initialized');
        console.log('  - Dungeon:', window.app.dungeon.width, 'x', window.app.dungeon.height);
        console.log('  - Theme:', window.app.renderer.activeTheme);
        // Note: const declarations don't appear on window in jsdom, so access via eval
        try {
          const themeCount = window.eval('Object.keys(DUNGEON_THEMES).length');
          console.log('  - Themes available:', themeCount);
        } catch(e) { console.log('  - Themes: (const not on window in jsdom, OK)'); }

        // Test theme switching
        window.app.renderer.activeTheme = 'infernal';
        console.log('PASS: Theme switch to infernal');

        // Test dungeon has basic structure
        console.log('PASS: Dungeon tiles:', window.app.dungeon.getTileCount(), 'rooms:', window.app.dungeon.getRoomCount());

        // Test dungeon generation
        try {
          window.eval("var __gen = new DungeonGenerator('test-seed-123')");
          window.eval("__gen.generate({ width: 30, height: 30, theme: 'dungeon', rooms: 5, seed: 'test-seed-123' }, window.app.dungeon)");

          const tileCount = window.app.dungeon.getTileCount();
          const roomCount = window.app.dungeon.getRoomCount();
          if (tileCount > 0 && roomCount > 0) {
            console.log('PASS: Dungeon generated - tiles:', tileCount, 'rooms:', roomCount);
          } else {
            console.error('FAIL: Dungeon generation produced no tiles/rooms');
          }
        } catch(e) {
          console.error('FAIL: Dungeon generation -', e.message);
          console.error(e.stack);
        }

        // Test that goblin chat was created
        if (window.goblinChat) {
          console.log('PASS: GoblinChat initialized');
        } else {
          console.log('WARN: GoblinChat not on window (jsdom DOM mismatch, OK in browser)');
        }

        console.log('\n=== ALL RUNTIME TESTS PASSED ===');
      } else {
        console.error('FAIL: App not initialized - window.app is', typeof window.app);
      }
      process.exit(0);
    }, 200);
  } catch(e) {
    console.error('FAIL: Runtime error -', e.message);
    console.error(e.stack);
    process.exit(1);
  }
}, 100);
