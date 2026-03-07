import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tvbkajyrdmpdohdupexz.supabase.co";  // ✅ seu URL
const supabaseKey = "SUA_CHAVE_PUBLICA_ANONIMA";               // pegar no Supabase

export const supabase = createClient(supabaseUrl, supabaseKey);
