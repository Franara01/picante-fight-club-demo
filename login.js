import { supabase } from './supabaseClient.js';

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const loginError = document.getElementById('login-error');
  loginError.style.display = 'none';

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    loginError.textContent = 'Email o contraseña incorrectos.';
    loginError.style.display = 'block';
    return;
  }

  const user = data.user;
  // Revisar user_metadata o raw_user_meta_data (dependiendo de la versión)
  const rol = user.user_metadata?.user_role || user.raw_user_meta_data?.user_role;

  if (rol === 'admin') {
    window.location.href = 'admin.html';
  } else if (rol === 'user') {
    window.location.href = 'usuario.html';
  } else {
    loginError.textContent = 'Tu usuario no tiene un rol asignado.';
    loginError.style.display = 'block';
  }
});

