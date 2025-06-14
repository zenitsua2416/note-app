import { createClient } from "@supabase/supabase-js";

import { getEnv } from "@/utils";

const supabaseURL = getEnv("VITE_SUPABASE_URL", true);
const supabaseKey = getEnv("VITE_SUPABASE_KEY", true);

export const supabase = createClient(supabaseURL, supabaseKey);
