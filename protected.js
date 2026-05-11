import { supabase } from './supabase.js';

const {
  data: { session }
} = await supabase.auth.getSession();

const currentPage = window.location.pathname;

if (!session && !currentPage.includes('login.html')) {
  window.location.href = '/login.html';
}
