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
    console.log(error);
    return;
  }

  appsContainer.innerHTML = '';

  data.forEach(app => {
    const card = document.createElement('div');

    card.className = 'card';

    card.innerHTML = `
      <h3>${app.name}</h3>
      <p>${app.description}</p>
      <br>
      <p>👤 ${app.builder_name}</p>
      <p>▲ ${app.upvotes}</p>

      <div class="actions">
        <a href="${app.url}" target="_blank">
          <button>Visit</button>
        </a>

        <button class="upvote" onclick="upvote('${app.id}', ${app.upvotes})">
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
}

window.upvote = async function(id, current) {
  await supabase
    .from('apps')
    .update({ upvotes: current + 1 })
    .eq('id', id);

  loadApps();
}

window.submitApp = async function() {

  const app = {
    name: document.getElementById('name').value,
    url: document.getElementById('url').value,
    builder_name: document.getElementById('builder').value,
    whatsapp: document.getElementById('whatsapp').value,
    category: document.getElementById('category').value,
    description: document.getElementById('description').value,
    upvotes: 0,
    status: 'pending'
  };

  const { error } = await supabase
    .from('apps')
    .insert([app]);

  if (error) {
    alert('Submission failed');
    return;
  }

  alert('🚀 App submitted successfully');

  location.reload();
}

loadApps();
