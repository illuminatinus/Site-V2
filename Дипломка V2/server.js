const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const USERS_PATH = path.join(DATA_DIR, 'users.json');
const DOCS_PATH = path.join(DATA_DIR, 'documents.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) {
    writeJson(filePath, fallback);
    return fallback;
  }

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return Array.isArray(data) ? data : fallback;
  } catch (err) {
    return fallback;
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function seedUsers() {
  const now = new Date().toISOString();
  return [
    { id: 'u-admin', name: 'Администратор', email: 'admin@vatk.kz', password: 'admin123', role: 'admin', createdAt: now },
    { id: 'u-teacher', name: 'Aida Bek', email: 'teacher@vatk.kz', password: 'teacher123', role: 'teacher', createdAt: now },
    { id: 'u-student', name: 'Nursultan S.', email: 'student@vatk.kz', password: 'student123', role: 'student', createdAt: now },
    { id: 'u-secretary', name: 'Секретарь', email: 'secretary@vatk.kz', password: 'secretary123', role: 'secretary', createdAt: now }
  ];
}

function seedDocuments() {
  const today = new Date().toISOString();
  return [
    {
      id: 'd-1',
      title: 'Техническое письмо',
      description: 'Отчет по оборудованию',
      type: 'admin',
      fileName: null,
      originalName: null,
      authorId: 'u-admin',
      createdAt: today
    },
    {
      id: 'd-2',
      title: 'Отчет по практике',
      description: 'Учебный отчет по практике',
      type: 'study',
      fileName: null,
      originalName: null,
      authorId: 'u-teacher',
      createdAt: today
    }
  ];
}

function loadUsers() {
  return readJson(USERS_PATH, seedUsers());
}

function saveUsers(users) {
  writeJson(USERS_PATH, users);
}

function loadDocuments() {
  return readJson(DOCS_PATH, seedDocuments());
}

function saveDocuments(documents) {
  writeJson(DOCS_PATH, documents);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function serializeUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    group: user.group || '',
    createdAt: user.createdAt,
    avatarName: user.avatarName || null,
    avatarUrl: user.avatarName ? `/uploads/${user.avatarName}` : null
  };
}

function serializeDocument(doc, users) {
  const author = users.find((user) => user.id === doc.authorId);
  return {
    id: doc.id,
    title: doc.title,
    description: doc.description,
    type: doc.type,
    fileName: doc.fileName || null,
    originalName: doc.originalName || null,
    authorId: doc.authorId,
    authorName: author ? author.name : 'Неизвестно',
    createdAt: doc.createdAt,
    fileUrl: doc.fileName ? `/uploads/${doc.fileName}` : null,
    downloadUrl: doc.fileName ? `/api/documents/${doc.id}/download` : null
  };
}

function getRequestUser(req) {
  const id = req.get('X-User-Id');
  if (!id) return null;
  return loadUsers().find((user) => user.id === id) || null;
}

function requireAdmin(req, res) {
  const user = getRequestUser(req);
  if (!user || user.role !== 'admin') {
    res.status(403).json({ message: 'Недостаточно прав' });
    return null;
  }
  return user;
}

function canManageDocument(req, document) {
  const user = getRequestUser(req);
  return user && (user.role === 'admin' || document.authorId === user.id);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-]/g, '_') || 'file';
    cb(null, `${Date.now()}-${baseName}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(UPLOAD_DIR));
app.use(express.static(path.join(__dirname)));

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email и пароль обязательны' });
  if (!validateEmail(email)) return res.status(400).json({ message: 'Введите корректный email' });

  const users = loadUsers();
  const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
  if (!user) return res.status(401).json({ message: 'Неверный email или пароль' });

  res.json({ user: serializeUser(user) });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) return res.status(400).json({ message: 'Все поля обязательны' });
  if (!validateEmail(email)) return res.status(400).json({ message: 'Введите корректный email' });
  if (!['student', 'teacher', 'secretary'].includes(role)) return res.status(400).json({ message: 'Недопустимая роль' });

  const users = loadUsers();
  if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ message: 'Пользователь уже существует' });
  }

  const user = {
    id: `u-${Date.now()}`,
    name,
    email: email.toLowerCase(),
    password,
    role,
    createdAt: new Date().toISOString()
  };
  users.push(user);
  saveUsers(users);
  res.status(201).json({ user: serializeUser(user) });
});

app.get('/api/users', (req, res) => {
  res.json({ users: loadUsers().map(serializeUser) });
});

app.patch('/api/users/:id', (req, res) => {
  upload.single('avatar')(req, res, (uploadErr) => {
    if (uploadErr) {
      const message = uploadErr.code === 'LIMIT_FILE_SIZE'
        ? 'Фото слишком большое. Максимум 25 МБ'
        : 'Ошибка при загрузке фото';
      return res.status(400).json({ message });
    }

    const users = loadUsers();
    const user = users.find((item) => item.id === req.params.id);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const group = String(req.body.group || '').trim().toUpperCase();
    if (!name || !email) return res.status(400).json({ message: 'ФИО и email обязательны' });
    if (!validateEmail(email)) return res.status(400).json({ message: 'Введите корректный email' });
    if (group && !/^\d{1,2}\s*[A-ZА-ЯЁӘІҢҒҮҰҚӨҺ]{1,10}$/i.test(group)) {
      return res.status(400).json({ message: 'Введите группу в формате 41 БК' });
    }

    const emailOwner = users.find((item) => item.email.toLowerCase() === email && item.id !== user.id);
    if (emailOwner) return res.status(409).json({ message: 'Email уже используется' });

    if (req.file) {
      if (user.avatarName) {
        const oldAvatar = path.join(UPLOAD_DIR, user.avatarName);
        if (fs.existsSync(oldAvatar)) fs.unlinkSync(oldAvatar);
      }
      user.avatarName = req.file.filename;
    }

    user.name = name;
    user.email = email;
    user.group = group.replace(/^(\d{1,2})\s*/, '$1 ');
    saveUsers(users);
    res.json({ user: serializeUser(user) });
  });
});

app.delete('/api/users/:id', (req, res) => {
  if (!requireAdmin(req, res)) return;

  const users = loadUsers();
  const removedUser = users.find((user) => user.id === req.params.id && user.role !== 'admin');
  const nextUsers = users.filter((user) => user.id !== req.params.id || user.role === 'admin');
  if (nextUsers.length === users.length) {
    return res.status(404).json({ message: 'Пользователь не найден или админ защищен' });
  }

  if (removedUser && removedUser.avatarName) {
    const avatarPath = path.join(UPLOAD_DIR, removedUser.avatarName);
    if (fs.existsSync(avatarPath)) fs.unlinkSync(avatarPath);
  }

  saveUsers(nextUsers);
  res.json({ success: true });
});

app.get('/api/documents', (req, res) => {
  const users = loadUsers();
  const documents = loadDocuments()
    .map((doc) => serializeDocument(doc, users))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ documents });
});

app.post('/api/documents', (req, res) => {
  upload.single('file')(req, res, (uploadErr) => {
    if (uploadErr) {
      const message = uploadErr.code === 'LIMIT_FILE_SIZE'
        ? 'Файл слишком большой. Максимум 25 МБ'
        : 'Ошибка при загрузке файла';
      return res.status(400).json({ message });
    }

    const { title, description, type, authorId } = req.body;
    if (!title || !description || !type || !authorId) {
      return res.status(400).json({ message: 'Все поля обязательны' });
    }

    const documents = loadDocuments();
    const document = {
      id: `d-${Date.now()}`,
      title,
      description,
      type,
      fileName: req.file ? req.file.filename : null,
      originalName: req.file ? req.file.originalname : null,
      authorId,
      createdAt: new Date().toISOString()
    };

    documents.push(document);
    saveDocuments(documents);
    res.status(201).json({ document: serializeDocument(document, loadUsers()) });
  });
});

app.get('/api/documents/:id/download', (req, res) => {
  const document = loadDocuments().find((item) => item.id === req.params.id);
  if (!document || !document.fileName) return res.status(404).json({ message: 'Файл не найден' });

  const filePath = path.join(UPLOAD_DIR, document.fileName);
  if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'Файл не найден' });

  res.download(filePath, document.originalName || document.fileName);
});

app.patch('/api/documents/:id', (req, res) => {
  const documents = loadDocuments();
  const document = documents.find((item) => item.id === req.params.id);
  if (!document) return res.status(404).json({ message: 'Документ не найден' });
  if (!canManageDocument(req, document)) return res.status(403).json({ message: 'Недостаточно прав' });

  const title = String(req.body.title || '').trim();
  const description = String(req.body.description || '').trim();
  const type = String(req.body.type || '').trim();
  if (!title || !description || !type) return res.status(400).json({ message: 'Все поля обязательны' });
  if (!['study', 'admin', 'other'].includes(type)) return res.status(400).json({ message: 'Недопустимый тип' });

  document.title = title;
  document.description = description;
  document.type = type;
  saveDocuments(documents);
  res.json({ document: serializeDocument(document, loadUsers()) });
});

app.delete('/api/documents/:id', (req, res) => {
  const documents = loadDocuments();
  const document = documents.find((item) => item.id === req.params.id);
  if (!document) return res.status(404).json({ message: 'Документ не найден' });
  if (!canManageDocument(req, document)) return res.status(403).json({ message: 'Недостаточно прав' });

  if (document.fileName) {
    const filePath = path.join(UPLOAD_DIR, document.fileName);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  saveDocuments(documents.filter((item) => item.id !== req.params.id));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
