// ============================================================
// SUPABASE CONFIGURATION — supabase-config.js
// ============================================================
// See SETUP.md for instructions on getting these values.
// Replace the placeholders below with your Supabase credentials.

const SUPABASE_CONFIG = {
  url: 'https://YOUR_PROJECT_ID.supabase.co',   // ← Replace with your Project URL
  anonKey: 'YOUR_ANON_KEY_HERE',                 // ← Replace with your anon/public key
};

// ---- Supabase Client Singleton ----
let _supabaseClient = null;

function getSupabase() {
  if (_supabaseClient) return _supabaseClient;

  // Check if configured
  if (SUPABASE_CONFIG.url.includes('YOUR_PROJECT') || SUPABASE_CONFIG.anonKey.includes('YOUR_ANON')) {
    console.warn('[Supabase] Not configured — running in local-only mode. See SETUP.md');
    return null;
  }

  // Check if CDN loaded
  if (typeof supabase === 'undefined' || !supabase.createClient) {
    console.warn('[Supabase] CDN not loaded — running in local-only mode.');
    return null;
  }

  try {
    _supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log('[Supabase] Client initialized');
    return _supabaseClient;
  } catch (err) {
    console.error('[Supabase] Init failed:', err);
    return null;
  }
}

function isSupabaseConfigured() {
  return getSupabase() !== null;
}
