import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storageKey: "login-app-auth", // Unique storage key for Project 2
    autoRefreshToken: false,
    persistSession: true,
  },
});
