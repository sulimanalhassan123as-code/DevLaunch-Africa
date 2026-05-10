import { supabase } from './supabase.js';

window.signup = async function() {

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if(error) {
    alert(error.message);
    return;
  }

  alert('✅ Account created successfully');
}

window.login = async function() {

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if(error) {
    alert(error.message);
    return;
  }

  location.href = 'index.html';
}
