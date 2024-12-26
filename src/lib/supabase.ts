import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = 'https://tkdpiafsdeckbjwspqhg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrZHBpYWZzZGVja2Jqd3NwcWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxODI2NzksImV4cCI6MjA1MDc1ODY3OX0.3NWbqJrFv1ljK3qNAUKcYpPoR95XzqIxNGpZCOUmpPY';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
