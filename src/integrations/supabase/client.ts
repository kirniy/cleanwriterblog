// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://umeootsnabbdtilipdgw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtZW9vdHNuYWJiZHRpbGlwZGd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NzQzODksImV4cCI6MjA1MzE1MDM4OX0.04WP7yBmWnNfvYC7UiSeJM5iopu-u6UBRWcgcPzFxvo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);