// lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tvbkajyrdmpdohdupexz.supabase.co";  // seu URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2YmthanlyZG1wZG9oZHVwZXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NTYxNzMsImV4cCI6MjA4ODQzMjE3M30.q2hO148dpFWcMSwkYRSkA_wOwIPgElE2c-uz4hw_S_I"; // sua chave anônima

export const supabase = createClient(supabaseUrl, supabaseKey);
