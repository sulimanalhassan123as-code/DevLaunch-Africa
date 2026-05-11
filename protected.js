import { supabase } from './supabase.js';

async function protectPage() {

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    window.location.replace('/login.html');
  }

}

protectPage();
