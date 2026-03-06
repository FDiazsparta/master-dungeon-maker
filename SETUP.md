# Setting Up Supabase for Master Dungeon Maker

## 1. Create a Supabase Project

1. Go to [https://database.new](https://database.new)
2. Sign up or log in with GitHub
3. Create a new project:
   - **Name**: `dungeon-maker` (or anything you like)
   - **Password**: Choose a strong database password (store it somewhere safe)
   - **Region**: Pick the closest to you
4. Click **Create new project** and wait ~1 minute

## 2. Get Your API Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these two values:
   - **Project URL** — looks like `https://abcdefgh.supabase.co`
   - **anon public key** — starts with `eyJ...`

## 3. Configure the App

Open `supabase-config.js` and replace the placeholders:

```javascript
const SUPABASE_CONFIG = {
  url: 'https://abcdefgh.supabase.co',   // ← your Project URL
  anonKey: 'eyJhbGci...',                 // ← your anon key
};
```

## 4. Create Database Tables

Go to **SQL Editor** in your Supabase dashboard, paste this entire block, and click **Run**:

```sql
-- ============================================
-- DUNGEONS TABLE
-- ============================================
CREATE TABLE public.dungeons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Untitled Dungeon',
  description TEXT,
  data JSONB NOT NULL,
  theme TEXT DEFAULT 'classic',
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  version INT DEFAULT 1
);

CREATE INDEX idx_dungeons_user ON dungeons(user_id);
CREATE INDEX idx_dungeons_public ON dungeons(is_public) WHERE is_public = TRUE;

-- ============================================
-- USER SETTINGS TABLE
-- ============================================
CREATE TABLE public.user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  theme_visual TEXT DEFAULT 'classic',
  music_enabled BOOLEAN DEFAULT TRUE,
  music_volume INT DEFAULT 50,
  party_size INT DEFAULT 4,
  party_level INT DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_settings_user ON user_settings(user_id);

-- ============================================
-- SHARED DUNGEONS TABLE
-- ============================================
CREATE TABLE public.shared_dungeons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dungeon_id UUID NOT NULL REFERENCES dungeons(id) ON DELETE CASCADE,
  shared_by_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  share_token TEXT UNIQUE NOT NULL,
  access_type TEXT DEFAULT 'view',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_shares_token ON shared_dungeons(share_token);
CREATE INDEX idx_shares_dungeon ON shared_dungeons(dungeon_id);
```

## 5. Enable Row-Level Security (RLS)

Still in the **SQL Editor**, paste and run this:

```sql
-- Enable RLS on all tables
ALTER TABLE dungeons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_dungeons ENABLE ROW LEVEL SECURITY;

-- ============================================
-- DUNGEONS POLICIES
-- ============================================
-- Users can read their own + public dungeons
CREATE POLICY "dungeons_select" ON dungeons
  FOR SELECT USING (auth.uid() = user_id OR is_public = TRUE);

-- Users can insert their own
CREATE POLICY "dungeons_insert" ON dungeons
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own
CREATE POLICY "dungeons_update" ON dungeons
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own
CREATE POLICY "dungeons_delete" ON dungeons
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- USER SETTINGS POLICIES
-- ============================================
CREATE POLICY "settings_select" ON user_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "settings_insert" ON user_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "settings_update" ON user_settings
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- SHARED DUNGEONS POLICIES
-- ============================================
-- Anyone can read shares (needed for share links to work)
CREATE POLICY "shares_select" ON shared_dungeons
  FOR SELECT USING (TRUE);

-- Only the sharer can create/delete shares
CREATE POLICY "shares_insert" ON shared_dungeons
  FOR INSERT WITH CHECK (auth.uid() = shared_by_user_id);

CREATE POLICY "shares_delete" ON shared_dungeons
  FOR DELETE USING (auth.uid() = shared_by_user_id);
```

## 6. You're Done!

Open `index.html` in your browser. You should see a **Login / Sign Up** button in the top-right corner of the header.

### How it works:

- **Not logged in**: The app works exactly like before (local JSON save/load)
- **Logged in**: Save goes to the cloud, Load shows your cloud dungeons, Share generates a link
- **Share links**: Anyone with the link can view and load a copy of your dungeon

### Troubleshooting

| Problem | Solution |
|---------|----------|
| No login button appears | Check that `supabase-config.js` has your real URL and key |
| "Supabase not configured" in console | Replace the placeholder values in `supabase-config.js` |
| Login fails | Check browser console (F12) for errors. Make sure your Supabase project is active |
| Save fails with permission error | Make sure you ran the RLS policies SQL above |
| Share link doesn't work | The shared dungeon must be marked as public |

### Free Tier Limits

Supabase's free tier includes:
- 500 MB database storage
- 50,000 monthly active users
- Unlimited API requests

This is more than enough for personal use and small groups.
