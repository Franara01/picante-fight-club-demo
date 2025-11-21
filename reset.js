import { supabase } from './supabaseClient.js';


document.getElementById('reset-form').addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.getElementById('email').value.trim()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: 'http://127.0.0.1:5500/update-password.html'

  })


  if (error) {
    document.getElementById('reset-error').textContent = error.message
    document.getElementById('reset-error').style.display = 'block'
  } else {
    document.getElementById('reset-message').style.display = 'block'
  }
})
