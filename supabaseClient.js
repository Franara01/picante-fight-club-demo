// supabaseClient.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const SUPABASE_URL = 'https://hbhsolcjiazcsmrtpoub.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiaHNvbGNqaWF6Y3NtcnRwb3ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MzczNzEsImV4cCI6MjA3OTMxMzM3MX0.352sPX3LMRnyHiDTyDitQCPh1cAhaB8Ee7FIXnLPXKU'; // tu key larga

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
