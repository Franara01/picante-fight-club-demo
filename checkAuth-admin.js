import { supabase } from './supabaseClient.js';


document.addEventListener('DOMContentLoaded', async () => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  const rol = user.user_metadata?.user_role || user.raw_user_meta_data?.user_role;

  if (rol !== 'admin') {
    window.location.href = 'index.html';
  }
});
