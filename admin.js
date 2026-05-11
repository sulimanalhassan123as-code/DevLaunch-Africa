import { supabase } from './supabase.js';

const ADMIN_PIN = '1234'; // Change this to your secure PIN

window.login = async function() {
  const pin = document.getElementById('pin').value;
  
  if (pin !== ADMIN_PIN) {
    alert('❌ Wrong PIN');
    return;
  }
  
  // Verify admin role
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user || user.user_metadata?.role !== 'admin') {
    alert('❌ Not authorized as admin');
    return;
  }
  
  document.getElementById('adminContent').style.display = 'block';
  loadPending();
};

async function loadPending() {
  const { data, error } = await supabase
    .from('apps')
    .select('*')
    .eq('status', 'pending');

  if (error) {
    console.error('Error:', error);
    alert('Failed to load pending apps');
    return;
  }

  const container = document.getElementById('pendingApps');
  container.innerHTML = '';

  if (!data || data.length === 0) {
    container.innerHTML = '<p>✅ No pending apps</p>';
    return;
  }

  data.forEach(app => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${app.name}</h3>
      <p>${app.description}</p>
      <p>👤 ${app.builder_name}</p>
      
      <div class="actions">
        <button onclick="approve('${app.id}')" class="approve-btn">
          ✅ Approve
        </button>
        <button onclick="reject('${app.id}')" class="reject-btn">
          ❌ Reject
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

window.approve = async function(id) {
  if (!confirm('Approve this app?')) return;

  const { error } = await supabase
    .from('apps')
    .update({ status: 'approved' })
    .eq('id', id);

  if (error) {
    alert('❌ Error: ' + error.message);
    return;
  }

  alert('✅ App approved!');
  loadPending();
};

window.reject = async function(id) {
  if (!confirm('Reject and delete this app?')) return;

  const { error } = await supabase
    .from('apps')
    .delete()
    .eq('id', id);

  if (error) {
    alert('❌ Error: ' + error.message);
    return;
  }

  alert('✅ App rejected!');
  loadPending();
};
