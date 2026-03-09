import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tvbkajyrdmpdohdupexz.supabase.co'
const supabaseKey = 'sb_publishable_Xv-ys__zqYsubEuEYyNgcg_fDV8h8Lf'

export const supabase = createClient(supabaseUrl, supabaseKey)
