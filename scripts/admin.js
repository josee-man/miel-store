async function api(path, options = {}) {
  const resp = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...options,
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(data.error || 'Erreur API');
  return data;
}

function $(sel) { return document.querySelector(sel); }

async function tryAutoLogin() {
  try {
    const me = await api('/api/admin/me');
    $('#admin-email-display').textContent = me.email;
    $('#login-view').style.display = 'none';
    $('#admin-view').style.display = 'block';
    await loadProducts();
  } catch (e) {
    // Not logged in; stay on login view
  }
}

async function login() {
  const email = $('#admin-email').value.trim();
  const password = $('#admin-password').value.trim();
  await api('/api/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) });
  await tryAutoLogin();
}

async function logout() {
  await api('/api/admin/logout', { method: 'POST' });
  location.reload();
}

async function saveCredentials() {
  const email = $('#new-email').value.trim();
  const password = $('#new-password').value.trim();
  await api('/api/admin/credentials', { method: 'PUT', body: JSON.stringify({ email, password }) });
  alert('Identifiants mis à jour');
  $('#admin-email-display').textContent = email;
  $('#new-email').value = '';
  $('#new-password').value = '';
}

function productEditor(product) {
  const div = document.createElement('div');
  div.className = 'admin-card';
  div.innerHTML = `
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap: .5rem;">
      <input class="admin-input name-fr" value="${product.name?.fr || ''}" placeholder="Nom (FR)" />
      <input class="admin-input name-ar" value="${product.name?.ar || ''}" placeholder="الاسم (AR)" />
      <input class="admin-input price" value="${product.price || ''}" placeholder="Prix" />
      <input class="admin-input image" value="${product.image || ''}" placeholder="Chemin de l'image (ex: images/miel.webp)" style="grid-column: 1 / -1;" />
      <input class="admin-input desc-fr" value="${product.description?.fr || ''}" placeholder="Description (FR)" />
      <input class="admin-input desc-ar" value="${product.description?.ar || ''}" placeholder="الوصف (AR)" />
    </div>
    <div class="admin-actions" style="margin-top:.5rem;">
      <button class="admin-btn secondary save">Sauvegarder</button>
      <button class="admin-btn danger delete">Supprimer</button>
    </div>
  `;

  div.querySelector('.save').addEventListener('click', async () => {
    const payload = {
      name: { fr: div.querySelector('.name-fr').value, ar: div.querySelector('.name-ar').value },
      price: div.querySelector('.price').value,
      image: div.querySelector('.image').value,
      description: { fr: div.querySelector('.desc-fr').value, ar: div.querySelector('.desc-ar').value },
    };
    const updated = await api(`/api/products/${product.id}`, { method: 'PUT', body: JSON.stringify(payload) });
    alert('Produit mis à jour');
    Object.assign(product, updated);
  });

  div.querySelector('.delete').addEventListener('click', async () => {
    if (!confirm('Supprimer ce produit ?')) return;
    await api(`/api/products/${product.id}`, { method: 'DELETE' });
    div.remove();
  });

  return div;
}

async function loadProducts() {
  const list = await api('/api/products');
  const container = $('#products-admin');
  container.innerHTML = '';
  list.forEach(p => container.appendChild(productEditor(p)));
}

document.addEventListener('DOMContentLoaded', () => {
  $('#login-btn').addEventListener('click', async () => {
    try { await login(); } catch (e) { alert(e.message); }
  });
  $('#logout-btn').addEventListener('click', async () => { await logout(); });
  $('#save-creds').addEventListener('click', async () => {
    try { await saveCredentials(); } catch (e) { alert(e.message); }
  });
  // Bouton Ajouter un produit
  const addBtn = document.getElementById('add-product');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const container = document.getElementById('products-admin');
      const div = document.createElement('div');
      div.className = 'admin-card';
      div.innerHTML = `
        <h4>Nouveau produit</h4>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: .5rem;">
          <input class="admin-input name-fr" placeholder="Nom (FR)" />
          <input class="admin-input name-ar" placeholder="الاسم (AR)" />
          <input class="admin-input price" placeholder="Prix" />
          <input class="admin-input image" placeholder="Chemin de l'image (ex: images/miel.webp)" style="grid-column: 1 / -1;" />
          <input class="admin-input desc-fr" placeholder="Description (FR)" />
          <input class="admin-input desc-ar" placeholder="الوصف (AR)" />
        </div>
        <div class="admin-actions" style="margin-top:.5rem;">
          <button class="admin-btn secondary create">Créer</button>
          <button class="admin-btn danger cancel">Annuler</button>
        </div>
      `;
      container.prepend(div);

      div.querySelector('.cancel').addEventListener('click', () => {
        div.remove();
      });

      div.querySelector('.create').addEventListener('click', async () => {
        const payload = {
          name: { fr: div.querySelector('.name-fr').value, ar: div.querySelector('.name-ar').value },
          price: div.querySelector('.price').value,
          image: div.querySelector('.image').value,
          description: { fr: div.querySelector('.desc-fr').value, ar: div.querySelector('.desc-ar').value },
        };
        try {
          const created = await api('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const editor = productEditor(created);
          div.replaceWith(editor);
        } catch (e) {
          alert(e.message || 'Erreur lors de la création du produit');
        }
      });
    });
  }
  tryAutoLogin();
});
