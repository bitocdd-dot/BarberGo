import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "COLE_AQUI_SUA_URL_DO_SUPABASE";
const supabaseKey = "COLE_AQUI_SUA_ANON_KEY";

export const supabase = createClient(supabaseUrl, supabaseKey);
