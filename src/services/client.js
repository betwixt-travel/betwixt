import { createClient } from '@supabase/supabase-js';

const client = createClient( process.env.SUPABASE_URL, process.env.SUPABASE_KEY );

const parseData = ({ data, error }) => {
  if (error) throw error;
  return data;
}

export { client, parseData };