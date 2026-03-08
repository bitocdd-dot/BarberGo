import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://SEU_PROJETO.supabase.co";
const supabaseKey = "SUA_ANON_KEY";

export const supabase = createClient(supabaseUrl, supabaseKey);
