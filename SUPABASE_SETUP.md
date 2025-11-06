# Supabase Setup Guide for Armory Feature

## Step 1: Create Supabase Project (5 minutes)

1. Go to https://supabase.com
2. Click "Start your project" or "Sign in"
3. Create a new account or sign in
4. Click "New Project"
5. Fill in:
   - **Name**: lilo-store-armory (or any name you want)
   - **Database Password**: Create a strong password (SAVE THIS!)
   - **Region**: Choose closest to you
6. Click "Create new project"
7. Wait 2-3 minutes for project to be ready

## Step 2: Get Your API Keys

1. Once project is ready, click on "Settings" (gear icon in sidebar)
2. Click "API" in the settings menu
3. You'll see two important values - **COPY THESE**:
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon/public key** (long string starting with "eyJ...")
4. **SAVE THESE** - you'll need them in Step 5!

## Step 3: Configure Google OAuth

1. In Supabase dashboard, go to "Authentication" in sidebar
2. Click "Providers"
3. Find "Google" in the list
4. Toggle it ON
5. You'll need Google OAuth credentials:

### Get Google OAuth Credentials:
1. Go to https://console.cloud.google.com
2. Create a new project or select existing one
3. Go to "APIs & Services" → "Credentials"
4. Click "Create Credentials" → "OAuth client ID"
5. Choose "Web application"
6. Add these URLs:
   - **Authorized redirect URIs**:
     - `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`
     - Replace YOUR-PROJECT-REF with your Supabase project URL
7. Copy the **Client ID** and **Client Secret**
8. Go back to Supabase and paste them in the Google provider settings
9. Click "Save"

## Step 4: Create Database Tables

1. In Supabase dashboard, click "SQL Editor" in sidebar
2. Click "New query"
3. Copy and paste this SQL:

```sql
-- Create user_inventory table
CREATE TABLE user_inventory (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  modal_value DECIMAL(10, 2) DEFAULT 261000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create inventory_items table
CREATE TABLE inventory_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  item_name TEXT NOT NULL,
  default_price DECIMAL(10, 2) NOT NULL,
  custom_price DECIMAL(10, 2),
  count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_name)
);

-- Enable Row Level Security
ALTER TABLE user_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

-- Create policies for user_inventory
CREATE POLICY "Users can view their own inventory"
  ON user_inventory FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own inventory"
  ON user_inventory FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own inventory"
  ON user_inventory FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policies for inventory_items
CREATE POLICY "Users can view their own items"
  ON inventory_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own items"
  ON inventory_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own items"
  ON inventory_items FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own items"
  ON inventory_items FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_user_inventory_user_id ON user_inventory(user_id);
CREATE INDEX idx_inventory_items_user_id ON inventory_items(user_id);
CREATE INDEX idx_inventory_items_category ON inventory_items(category);
```

4. Click "RUN" button
5. You should see "Success. No rows returned"

## Step 5: Save Your Credentials

Create a file called `.env.local` in your project root and add:

```
VITE_SUPABASE_URL=your-project-url-here
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with the values from Step 2!

## Next Steps

Once you've completed all steps above, let me know and I'll continue with the code implementation!

## Troubleshooting

- **Can't find API keys?** Settings → API in Supabase
- **SQL error?** Make sure you copied the entire SQL code
- **Google OAuth not working?** Check the redirect URI matches exactly
