import { supabase } from './supabase.js';
import './protected.js';

const appsContainer = document.getElementById('apps');

async function loadApps() {
  const { data, error } = await supabase
    .from('apps')
    .select('*')
    .eq('status', 'approved')
    .order('upvotes', { ascending: false });

  if (error) {
    console.error('Error:', error);
    return;
  }

  appsContainer.innerHTML = '';

  if (!data || data.length === 0) {
    appsContainer.innerHTML = '<p>📭 No apps yet</p>';
    return;
  }

  data.forEach(app => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${app.name}</h3>
      <p>${app.description}</p>
      <p>👤 ${app.builder_name}</p>
      <p>▲ ${app.upvotes}</p>
      
      <div class="actions">
        <a href="${app.url}" target="_blank" rel="noopener noreferrer">
          <button>🌐 Visit</button>
        </a>
        <button onclick="upvote('${app.id}', ${app.upvotes})" class="upvote-btn">
          ▲ Upvote
        </button>
        <a href="https://wa.me/${app.whatsapp}">
          <button>💬 Hire</button>
        </a>
      </div>
    `;
    appsContainer.appendChild(card);
  });
}

window.logout = async function() {
  await supabase.auth.signOut();
  location.href = 'login.html';
};

window.upvote = async function(id, current) {
  const { error } = await supabase
    .from('apps')
    .update({ upvotes: current + 1 })
    .eq('id', id);

  if (error) {
    alert('❌ Error: ' + error.message);
    return;
  }

  loadApps();
};

window.submitApp = async function() {
  const name = document.getElementById('name').value.trim();
  const url = document.getElementById('url').value.trim();
  const builder = document.getElementById('builder').value.trim();
  const whatsapp = document.getElementById('whatsapp').value.trim();
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value.trim();

  // Validation
  if (!name || !url || !builder || !whatsapp || !category || !description) {
    alert('❌ All fields are required!');
    return;
  }

  if (!/^https?:\/\/.+/.test(url)) {
    alert('❌ Invalid URL. Must start with http:// or https://');
    return;
  }

  if (!/^\d{7,15}$/.test(whatsapp.replace(/\+/g, ''))) {
    alert('❌ Invalid WhatsApp number (7-15 digits)');
    return;
  }

  if (description.length < 10) {
    alert('❌ Description must be at least 10 characters');
    return;
  }

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    alert('❌ Please login first');
    return;
  }

  const app = {
    name,
    url,
    builder_name: builder,
    whatsapp,
    category,
    description,
    upvotes: 0,
    status: 'pending',
    owner_id: user.id
  };

  const { error } = await supabase
    .from('apps')
    .insert([app]);

  if (error) {
    alert('❌ Submission failed: ' + error.message);
    return;
  }

  alert('🚀 App submitted! Awaiting admin approval...');
  
  // Clear form
  document.getElementById('name').value = '';
  document.getElementById('url').value = '';
  document.getElementById('builder').value = '';
  document.getElementById('whatsapp').value = '';
  document.getElementById('category').value = '';
  document.getElementById('description').value = '';
};

loadApps();
