import { supabase } from './supabase.js';

const ADMIN_PIN = '1234';

window.login = function() {
  const pin = document.getElementById('pin').value;

  if(pin !== ADMIN_PIN) {
    alert('Wrong PIN');
    return;
  }

  document.getElementById('adminContent').style.display = 'block';

  loadPending();
}

async function loadPending() {

  const { data } = await supabase
    .from('apps')
    .select('*')
    .eq('status', 'pending');

  const container = document.getElementById('pendingApps');

  container.innerHTML = '';

  data.forEach(app => {

    const card = document.createElement('div');

    card.className = 'card';

    card.innerHTML = `
      <h3>${app.name}</h3>
      <p>${app.description}</p>

      <div class="actions">
        <button onclick="approve('${app.id}')">
          ✅ Approve
        </button>

        <button class="reject" onclick="reject('${app.id}')">
          ❌ Reject
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

window.approve = async function(id) {

  await supabase
    .from('apps')
    .update({ status: 'approved' })
    .eq('id', id);

  loadPending();
}

window.reject = async function(id) {

  await supabase
    .from('apps')
    .delete()
    .eq('id', id);

  loadPending();
}
