const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '/')));

// Data persistence setup
const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ADMIN_FILE = path.join(DATA_DIR, 'admin.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
}

function readJSON(file, fallback) {
  try {
    if (!fs.existsSync(file)) return fallback;
    const raw = fs.readFileSync(file, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read JSON', file, e);
    return fallback;
  }
}

function writeJSON(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to write JSON', file, e);
  }
}

// Default in-memory data for products (same structure as frontend)
const defaultProducts = [
  {
    id: 1,
    name: { fr: "Miel de Thym", ar: "عسل الزعتر" },
    price: "120 DH",
    image: "images/honey-pot.jpg",
    description: {
      fr: "Un miel aromatique aux notes florales et herbacées.",
      ar: "عسل عطري بنكهات زهرية وعشبية."
    },
    origin: { fr: "Montagnes de l'Atlas, Maroc", ar: "جبال الأطلس، المغرب" },
    properties: {
      fr: "Antiseptique, apaisant pour la gorge, renforce le système immunitaire",
      ar: "مطهر، يهدئ الحلق، يقوي المناعة"
    }
  },
  {
    id: 2,
    name: { fr: "Miel d'Eucalyptus", ar: "عسل الكاليبتوس" },
    price: "140 DH",
    image: "images/MIEL-DE-EUCALIPTO.webp",
    description: {
      fr: "Un miel riche aux notes boisées et mentholées.",
      ar: "عسل غني بنكهات خشبية ونعناعية."
    },
    origin: { fr: "Forêts d'eucalyptus du Maroc", ar: "غابات الكاليبتوس بالMغرب" },
    properties: {
      fr: "Propriétés expectorantes, soulage les voies respiratoires",
      ar: "يساعد على إخراج البلغم، يخفف مشاكل الجهاز التنفسي"
    }
  },
  {
    id: 3,
    name: { fr: "Miel de Lavande", ar: "عسل الخزامى" },
    price: "150 DH",
    image: "images/miel.webp",
    description: {
      fr: "Un miel délicat aux arômes floraux et légèrement épicés.",
      ar: "عسل رقيق بنكهات زهرية وتوابل خفيفة."
    },
    origin: { fr: "Champs de lavande du Haut Atlas", ar: "حقول الخزامى في الأطلس العالي" },
    properties: {
      fr: "Relaxant, favorise le sommeil, propriétés calmantes",
      ar: "مهدئ، يساعد على النوم، خصائص مريحة"
    }
  }
];

ensureDataDir();
// Load products, fallback to defaultProducts
let honeyProducts = readJSON(PRODUCTS_FILE, defaultProducts);
// Assign IDs if missing
honeyProducts = honeyProducts.map((p, idx) => ({ id: p.id ?? idx + 1, ...p }));
// Persist initial data if file missing
if (!fs.existsSync(PRODUCTS_FILE)) writeJSON(PRODUCTS_FILE, honeyProducts);

// Admin credentials persistence
const defaultAdmin = { email: 'admin@example.com', password: 'admin123' };
let adminCreds = readJSON(ADMIN_FILE, defaultAdmin);
if (!fs.existsSync(ADMIN_FILE)) writeJSON(ADMIN_FILE, adminCreds);

// Simple in-memory token store
const activeTokens = new Set();

function generateToken() {
  return crypto.randomBytes(24).toString('hex');
}

function getCookie(req, name) {
  const cookieHeader = req.headers.cookie || '';
  const parts = cookieHeader.split(';').map(c => c.trim());
  for (const part of parts) {
    const [k, v] = part.split('=');
    if (k === name) return v;
  }
  return null;
}

function requireAuth(req, res, next) {
  const token = getCookie(req, 'admin_token');
  if (!token || !activeTokens.has(token)) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// API routes
app.get('/api/products', (req, res) => {
  res.json(honeyProducts);
});

app.get('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = honeyProducts.find(p => p.id === id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// Create product (admin only)
app.post('/api/products', requireAuth, (req, res) => {
  const body = req.body || {};
  // minimal validation
  if (!body.name || !body.name.fr || !body.name.ar || !body.price || !body.description || !body.description.fr || !body.description.ar) {
    return res.status(400).json({ error: 'name.fr, name.ar, price, description.fr, description.ar are required' });
  }
  const nextId = honeyProducts.length ? Math.max(...honeyProducts.map(p => p.id)) + 1 : 1;
  const newProduct = {
    id: nextId,
    name: body.name,
    price: body.price,
    image: body.image || 'images/honey-pot.jpg',
    description: body.description,
    origin: body.origin || { fr: '', ar: '' },
    properties: body.properties || { fr: '', ar: '' }
  };
  honeyProducts.push(newProduct);
  writeJSON(PRODUCTS_FILE, honeyProducts);
  res.status(201).json(newProduct);
});

// CRUD for products (admin only)
app.put('/api/products/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const idx = honeyProducts.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  const updated = { ...honeyProducts[idx], ...req.body, id };
  honeyProducts[idx] = updated;
  writeJSON(PRODUCTS_FILE, honeyProducts);
  res.json(updated);
});

app.delete('/api/products/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const idx = honeyProducts.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  const removed = honeyProducts.splice(idx, 1)[0];
  writeJSON(PRODUCTS_FILE, honeyProducts);
  res.json({ ok: true, removed });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required' });
  }
  // In a real app, you would persist or email this.
  console.log('Contact message received:', { name, email, message });
  res.json({ ok: true });
});

// HTML routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/produits', (req, res) => {
  res.sendFile(path.join(__dirname, 'produits.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

// Admin auth routes
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  if (email === adminCreds.email && password === adminCreds.password) {
    const token = generateToken();
    activeTokens.add(token);
    res.setHeader('Set-Cookie', `admin_token=${token}; HttpOnly; Path=/; Max-Age=86400`);
    return res.json({ ok: true });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

app.post('/api/admin/logout', (req, res) => {
  const token = getCookie(req, 'admin_token');
  if (token) activeTokens.delete(token);
  res.setHeader('Set-Cookie', 'admin_token=; HttpOnly; Path=/; Max-Age=0');
  res.json({ ok: true });
});

app.get('/api/admin/me', (req, res) => {
  const token = getCookie(req, 'admin_token');
  if (!token || !activeTokens.has(token)) return res.status(401).json({ error: 'Unauthorized' });
  res.json({ email: adminCreds.email });
});

app.put('/api/admin/credentials', requireAuth, (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  adminCreds = { email, password };
  writeJSON(ADMIN_FILE, adminCreds);
  res.json({ ok: true });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
