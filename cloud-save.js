// ============================================================
// CLOUD SAVE MODULE — cloud-save.js
// ============================================================

// ---- Dungeon CRUD ----

async function saveDungeonToCloud(dungeonJSON, name, description, isPublic, existingId) {
  const sb = getSupabase();
  const user = getCurrentUser();
  if (!sb || !user) throw new Error('Not logged in');

  const record = {
    user_id: user.id,
    name: name || 'Untitled Dungeon',
    description: description || null,
    data: typeof dungeonJSON === 'string' ? JSON.parse(dungeonJSON) : dungeonJSON,
    theme: (typeof dungeonJSON === 'string' ? JSON.parse(dungeonJSON) : dungeonJSON).metadata?.theme || 'classic',
    is_public: !!isPublic,
    updated_at: new Date().toISOString(),
  };

  if (existingId) {
    // Update existing dungeon
    const { data, error } = await sb
      .from('dungeons')
      .update(record)
      .eq('id', existingId)
      .eq('user_id', user.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    // Insert new
    record.created_at = new Date().toISOString();
    const { data, error } = await sb
      .from('dungeons')
      .insert(record)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

async function listUserDungeons() {
  const sb = getSupabase();
  const user = getCurrentUser();
  if (!sb || !user) return [];

  const { data, error } = await sb
    .from('dungeons')
    .select('id, name, description, theme, is_public, created_at, updated_at')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

async function loadDungeonFromCloud(dungeonId) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase not configured');

  const { data, error } = await sb
    .from('dungeons')
    .select('*')
    .eq('id', dungeonId)
    .single();

  if (error) throw error;
  return data;
}

async function deleteDungeonFromCloud(dungeonId) {
  const sb = getSupabase();
  const user = getCurrentUser();
  if (!sb || !user) throw new Error('Not logged in');

  const { error } = await sb
    .from('dungeons')
    .delete()
    .eq('id', dungeonId)
    .eq('user_id', user.id);

  if (error) throw error;
}

// ---- User Settings ----

async function loadUserSettings() {
  const sb = getSupabase();
  const user = getCurrentUser();
  if (!sb || !user) return null;

  const { data, error } = await sb
    .from('user_settings')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
  return data || {
    theme_visual: 'classic',
    music_enabled: true,
    music_volume: 50,
    party_size: 4,
    party_level: 3,
  };
}

async function saveUserSettings(settings) {
  const sb = getSupabase();
  const user = getCurrentUser();
  if (!sb || !user) return;

  const { error } = await sb
    .from('user_settings')
    .upsert({
      user_id: user.id,
      ...settings,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });

  if (error) throw error;
}

// ---- Sharing ----

function _generateShareToken() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 12; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

async function shareDungeon(dungeonId) {
  const sb = getSupabase();
  const user = getCurrentUser();
  if (!sb || !user) throw new Error('Not logged in');

  // Check if share already exists
  const { data: existing } = await sb
    .from('shared_dungeons')
    .select('share_token')
    .eq('dungeon_id', dungeonId)
    .eq('shared_by_user_id', user.id)
    .single();

  if (existing) {
    return _buildShareUrl(existing.share_token);
  }

  // Create new share
  const token = _generateShareToken();
  const { data, error } = await sb
    .from('shared_dungeons')
    .insert({
      dungeon_id: dungeonId,
      shared_by_user_id: user.id,
      share_token: token,
      access_type: 'view',
    })
    .select()
    .single();

  if (error) throw error;

  // Also make the dungeon public
  await sb.from('dungeons').update({ is_public: true }).eq('id', dungeonId);

  return _buildShareUrl(data.share_token);
}

async function loadSharedDungeon(shareToken) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase not configured');

  const { data: share, error: shareErr } = await sb
    .from('shared_dungeons')
    .select('dungeon_id')
    .eq('share_token', shareToken)
    .single();

  if (shareErr) throw new Error('Share link not found or expired');

  const { data: dungeon, error: dungeonErr } = await sb
    .from('dungeons')
    .select('*')
    .eq('id', share.dungeon_id)
    .single();

  if (dungeonErr) throw new Error('Dungeon not found');
  return dungeon;
}

function _buildShareUrl(token) {
  const base = window.location.href.split('?')[0].split('#')[0];
  return base + '?share=' + token;
}

async function revokeShare(dungeonId) {
  const sb = getSupabase();
  const user = getCurrentUser();
  if (!sb || !user) return;

  const { error } = await sb
    .from('shared_dungeons')
    .delete()
    .eq('dungeon_id', dungeonId)
    .eq('shared_by_user_id', user.id);

  if (error) throw error;
}
