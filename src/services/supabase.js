import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'tvbkajyrdmpdohdupexz';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2YmthanlyZG1wZG9oZHVwZXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NTYxNzMsImV4cCI6MjA4ODQzMjE3M30.q2hO148dpFWcMSwkYRSkA_wOwIPgElE2c-uz4hw_S_I';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function loginUser(email, senha) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
  if (error) throw error;
  return data;
}

export async function registerUser(email, senha) {
  const { data, error } = await supabase.auth.signUp({ email, password: senha });
  if (error) throw error;
  return data;
}
