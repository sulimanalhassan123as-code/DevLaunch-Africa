// protected.js
import { supabase } from './supabase.js';

async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    
    // If no user is logged in, send them to the login page
    if (!session) {
        window.location.href = 'login.html';
    }
}

checkAuth();
