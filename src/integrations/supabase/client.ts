// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ifyrkhzzfzdmbzbjwugg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmeXJraHp6ZnpkbWJ6Ymp3dWdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyMTE2MTEsImV4cCI6MjA2MDc4NzYxMX0.K82wCLIQeNUsbqWv4VRs0H4hp-PBIcKgRJMt4XA8X8Y";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);