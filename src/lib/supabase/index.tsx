import { createClient } from "@supabase/supabase-js";


const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

if (!supabaseKey|| !supabaseUrl) {
  throw new Error("Supabase URL or Key is missing from the configuration.");
}


export const supabase = createClient(supabaseUrl, supabaseKey);
