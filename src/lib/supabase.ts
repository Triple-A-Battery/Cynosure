import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uaoemzazzqmqkqguyxqd.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhb2VtemF6enFtcWtxZ3V5eHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1MDg3OTAsImV4cCI6MjAyNjA4NDc5MH0.WlGZXaK9k_APkJSaF2cXwcFe_6hXQOhNbcA8YvYEDzw';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
