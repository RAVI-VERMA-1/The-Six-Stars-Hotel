import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qtfifrbvjxyihxiwehfm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0ZmlmcmJ2anh5aWh4aXdlaGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyMDAxNDQsImV4cCI6MjAwNTc3NjE0NH0.vfj4oE1f8chpYB9KTmt7fZVV_I66tpc0JyluHuRV_gA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
