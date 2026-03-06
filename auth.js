// ============================================================
// AUTH MODULE — auth.js
// ============================================================

let _currentUser = null;
let _authChangeCallbacks = [];

// ---- Public API ----

async function initAuth() {
  const sb = getSupabase();
  if (!sb) return null;

  try {
    const { data: { session } } = await sb.auth.getSession();
    if (session) {
      _currentUser = session.user;
    }

    // Listen for auth changes (login, logout, token refresh)
    sb.auth.onAuthStateChange((event, session) => {
      _currentUser = session ? session.user : null;
      _authChangeCallbacks.forEach(cb => cb(_currentUser, event));
    });

    return _currentUser;
  } catch (err) {
    console.warn('[Auth] Init failed:', err);
    return null;
  }
}

async function authSignUp(email, password) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase not configured');

  const { data, error } = await sb.auth.signUp({ email, password });
  if (error) throw error;

  _currentUser = data.user;

  // Create default user_settings row
  if (_currentUser) {
    await sb.from('user_settings').upsert({
      user_id: _currentUser.id,
      theme_visual: 'classic',
      music_enabled: true,
      music_volume: 50,
      party_size: 4,
      party_level: 3,
    }, { onConflict: 'user_id' });
  }

  return data;
}

async function authLogin(email, password) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase not configured');

  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;

  _currentUser = data.user;
  return data;
}

async function authLogout() {
  const sb = getSupabase();
  if (!sb) return;

  const { error } = await sb.auth.signOut();
  if (error) console.warn('[Auth] Logout error:', error);
  _currentUser = null;
}

function getCurrentUser() {
  return _currentUser;
}

function onAuthChange(callback) {
  _authChangeCallbacks.push(callback);
}
