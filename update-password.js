const SUPABASE_URL = 'https://fyhyjnbjutbezkkkeayt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5aHlqbmJqdXRiZXpra2tlYXl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNTY1MDUsImV4cCI6MjA2NTkzMjUwNX0.Oi6uCuEVX0x3C16xxOFERe22j1pBXjYYdSRFqkEy4cw';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const urlParams = new URLSearchParams(window.location.search);
const accessToken = urlParams.get('access_token');

async function init() {
  if (accessToken) {
    const { error } = await supabaseClient.auth.setSession({ access_token: accessToken });
    if (error) {
      alert('Error al establecer la sesión: ' + error.message);
    }
  } else {
    const { data } = await supabaseClient.auth.getSession();
    if (!data.session) {
      alert('No se encontró token de acceso para cambiar la contraseña.');
    }
  }
}

init();

document.getElementById('update-password-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const newPassword = document.getElementById('new-password').value.trim();
  const messageEl = document.getElementById('update-message');

  if (!newPassword || newPassword.length < 6) {
    messageEl.textContent = 'La contraseña debe tener al menos 6 caracteres.';
    messageEl.style.color = 'red';
    return;
  }

  const { error } = await supabaseClient.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    messageEl.textContent = 'Hubo un error al actualizar la contraseña: ' + error.message;
    messageEl.style.color = 'red';
  } else {
    messageEl.textContent = 'Contraseña actualizada correctamente. Redirigiendo...';
    messageEl.style.color = 'green';
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
  }
});
