const apiUrl = window.location.protocol === 'file:' ? 'http://localhost:3000/api' : '/api';
const userStorageKey = 'vatkCurrentUser';
const langStorageKey = 'vatkLang';

function getUser() {
  var raw = localStorage.getItem(userStorageKey);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch (e) { return null; }
}

function setUser(user) {
  localStorage.setItem(userStorageKey, JSON.stringify(user));
}

function removeUser() {
  localStorage.removeItem(userStorageKey);
}

function getLanguage() {
  return localStorage.getItem(langStorageKey) || 'ru';
}

function setLanguage(lang) {
  localStorage.setItem(langStorageKey, lang);
}

function checkEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

var translations = {
  ru: {
    navDashboard: 'Главная',
    navDocuments: 'Документы',
    navCreate: 'Создать документ',
    navProfile: 'Профиль',
    navAdmin: 'Админ',
    langToggle: 'Қазақша',
    logout: 'Выйти',
    loginTitle: 'Вход в систему VATK',
    loginTab: 'Вход',
    registerTab: 'Регистрация',
    password: 'Пароль',
    fullName: 'ФИО',
    role: 'Роль',
    group: 'Группа',
    groupPlaceholder: '41 БК',
    invalidGroup: 'Введите группу в формате 41 БК',
    student: 'Студент',
    teacher: 'Преподаватель',
    secretary: 'Секретарь',
    signIn: 'Войти',
    register: 'Регистрация',
    dashboardTitle: 'Главная',
    greeting: 'Привет, пользователь!',
    welcome: ', добро пожаловать!',
    latestDocs: 'Последние документы',
    notifications: 'Уведомления',
    noNotifications: 'Нет уведомлений',
    notificationsReady: 'Новых документов сегодня: ',
    notificationsEmpty: 'Сегодня новых документов нет',
    quickAccess: 'Быстрый доступ',
    allDocs: 'Все документы',
    docsTitle: 'Документы',
    docsSubtitle: 'Управляй файлами и ищи нужные документы.',
    search: 'Поиск...',
    allTypes: 'Все типы',
    studyPlural: 'Учебные',
    adminType: 'Админ',
    other: 'Другое',
    allAuthors: 'Все авторы',
    createTitle: 'Создать документ',
    createSubtitle: 'Добавь новый документ для работы.',
    docTitle: 'Название документа',
    docTitlePlaceholder: 'Отчет по практике',
    description: 'Описание',
    descriptionPlaceholder: 'Краткое описание...',
    type: 'Тип',
    study: 'Учебный',
    file: 'Файл',
    actions: 'Действия',
    view: 'Просмотр',
    download: 'Скачать',
    edit: 'Редактировать',
    close: 'Закрыть',
    cancel: 'Отмена',
    confirmDelete: 'Удалить этот документ?',
    noPreview: 'Предпросмотр для этого формата недоступен. Скачайте файл, чтобы открыть его.',
    noFile: 'Без файла',
    updated: 'Изменения сохранены',
    save: 'Сохранить',
    adminTitle: 'Админ-панель',
    adminSubtitle: 'Управление пользователями и документами.',
    users: 'Пользователи',
    profileTitle: 'Профиль',
    profileSubtitle: 'Твои данные и созданные документы.',
    editProfile: 'Редактировать профиль',
    profilePhoto: 'Фото профиля',
    choosePhoto: 'Выбрать фото',
    saveProfile: 'Сохранить профиль',
    profileSaved: 'Профиль обновлён',
    name: 'Имя',
    myDocs: 'Мои документы',
    document: 'Документ',
    author: 'Автор',
    date: 'Дата',
    action: 'Действие',
    delete: 'Удалить',
    noDocs: 'Нет документов',
    fillFields: 'Заполните все поля',
    saved: 'Документ сохранён',
    enterEmail: 'Введите настоящий email',
    enterPassword: 'Введите пароль',
    enterName: 'Введите имя',
    serverUnavailable: 'Сервер недоступен',
    serverBadJson: 'Ответ сервера не является JSON: ',
    serverError: 'Ошибка сервера',
    authWrong: 'Неверный email или пароль',
    userExists: 'Пользователь уже существует',
    invalidAction: 'Недопустимое действие'
  },
  kz: {
    navDashboard: 'Басты бет',
    navDocuments: 'Құжаттар',
    navCreate: 'Құжат жасау',
    navProfile: 'Профиль',
    navAdmin: 'Әкімші',
    langToggle: 'Русский',
    logout: 'Шығу',
    loginTitle: 'VATK жүйесіне кіру',
    loginTab: 'Кіру',
    registerTab: 'Тіркелу',
    password: 'Құпиясөз',
    fullName: 'Аты-жөні',
    role: 'Рөл',
    group: 'Топ',
    groupPlaceholder: '41 БК',
    invalidGroup: 'Топты 41 БК форматында енгізіңіз',
    student: 'Студент',
    teacher: 'Оқытушы',
    secretary: 'Хатшы',
    signIn: 'Кіру',
    register: 'Тіркелу',
    dashboardTitle: 'Басты бет',
    greeting: 'Сәлем, пайдаланушы!',
    welcome: ', қош келдіңіз!',
    latestDocs: 'Соңғы құжаттар',
    notifications: 'Хабарламалар',
    noNotifications: 'Хабарлама жоқ',
    notificationsReady: 'Бүгінгі жаңа құжаттар: ',
    notificationsEmpty: 'Бүгін жаңа құжат жоқ',
    quickAccess: 'Жылдам қолжетімділік',
    allDocs: 'Барлық құжаттар',
    docsTitle: 'Құжаттар',
    docsSubtitle: 'Файлдарды басқарып, қажетті құжаттарды іздеңіз.',
    search: 'Іздеу...',
    allTypes: 'Барлық түрлер',
    studyPlural: 'Оқу',
    adminType: 'Әкімші',
    other: 'Басқа',
    allAuthors: 'Барлық авторлар',
    createTitle: 'Құжат жасау',
    createSubtitle: 'Жұмысқа арналған жаңа құжат қосыңыз.',
    docTitle: 'Құжат атауы',
    docTitlePlaceholder: 'Практика бойынша есеп',
    description: 'Сипаттама',
    descriptionPlaceholder: 'Қысқаша сипаттама...',
    type: 'Түрі',
    study: 'Оқу',
    file: 'Файл',
    actions: 'Әрекет',
    view: 'Қарау',
    download: 'Жүктеу',
    edit: 'Өңдеу',
    close: 'Жабу',
    cancel: 'Болдырмау',
    confirmDelete: 'Бұл құжатты жою керек пе?',
    noPreview: 'Бұл форматты алдын ала қарау мүмкін емес. Файлды жүктеп алып ашыңыз.',
    noFile: 'Файл жоқ',
    updated: 'Өзгерістер сақталды',
    save: 'Сақтау',
    adminTitle: 'Әкімші панелі',
    adminSubtitle: 'Пайдаланушылар мен құжаттарды басқару.',
    users: 'Пайдаланушылар',
    profileTitle: 'Профиль',
    profileSubtitle: 'Жеке деректеріңіз және жасалған құжаттар.',
    editProfile: 'Профильді өңдеу',
    profilePhoto: 'Профиль фотосы',
    choosePhoto: 'Фото таңдау',
    saveProfile: 'Профильді сақтау',
    profileSaved: 'Профиль жаңартылды',
    name: 'Аты',
    myDocs: 'Менің құжаттарым',
    document: 'Құжат',
    author: 'Автор',
    date: 'Күні',
    action: 'Әрекет',
    delete: 'Жою',
    noDocs: 'Құжат жоқ',
    fillFields: 'Барлық өрістерді толтырыңыз',
    saved: 'Құжат сақталды',
    enterEmail: 'Дұрыс email енгізіңіз',
    enterPassword: 'Құпиясөзді енгізіңіз',
    enterName: 'Атыңызды енгізіңіз',
    serverUnavailable: 'Сервер қолжетімсіз',
    serverBadJson: 'Сервер жауабы JSON емес: ',
    serverError: 'Сервер қатесі',
    authWrong: 'Email немесе құпиясөз қате',
    userExists: 'Пайдаланушы бұрыннан бар',
    invalidAction: 'Рұқсат етілмеген әрекет'
  }
};

function t(key) {
  var lang = getLanguage();
  return (translations[lang] && translations[lang][key]) || translations.ru[key] || key;
}

function translatePage() {
  var lang = getLanguage();
  document.documentElement.lang = lang === 'kz' ? 'kk' : 'ru';

  var textMap = {
    '.menu a[href="index.html"]': 'navDashboard',
    '.menu a[href="documents.html"]': 'navDocuments',
    '.menu a[href="create.html"]': 'navCreate',
    '.menu a[href="profile.html"]': 'navProfile',
    '.menu a[href="admin.html"]': 'navAdmin',
    '#langToggle': 'langToggle',
    '#logoutBtn': 'logout',
    '#loginTab': 'loginTab',
    '#registerTab': 'registerTab',
    '#submitBtn': 'signIn',
    '#notificationsList li': 'noNotifications',
    '#profileName': 'name'
  };

  Object.keys(textMap).forEach(function(selector) {
    document.querySelectorAll(selector).forEach(function(el) {
      el.textContent = t(textMap[selector]);
    });
  });

  document.querySelectorAll('label').forEach(function(label) {
    var forText = label.textContent.trim();
    var input = label.nextElementSibling;
    if (input && input.id === 'passwordInput') label.textContent = t('password');
    if (input && input.id === 'nameInput') label.textContent = t('fullName');
    if (input && input.id === 'roleInput') label.textContent = t('role');
    if (input && input.id === 'docTitle') label.textContent = t('docTitle');
    if (input && input.id === 'docDescription') label.textContent = t('description');
    if (input && input.id === 'docType') label.textContent = t('type');
    if (input && input.id === 'docFile') label.textContent = t('file');
    if (input && input.id === 'profilePhotoInput') label.textContent = t('profilePhoto');
    if (input && input.id === 'profileNameInput') label.textContent = t('fullName');
    if (input && input.id === 'profileGroupInput') label.textContent = t('group');
    if (forText === 'Email') label.textContent = 'Email';
  });

  var page = document.body.getAttribute('data-page');
  var pageText = {
    login: ['loginTitle'],
    dashboard: ['dashboardTitle', 'greeting'],
    documents: ['docsTitle', 'docsSubtitle'],
    create: ['createTitle', 'createSubtitle'],
    admin: ['adminTitle', 'adminSubtitle'],
    profile: ['profileTitle', 'profileSubtitle']
  };
  if (pageText[page]) {
    var h1 = document.querySelector('h1');
    var subtitle = document.querySelector('.subtitle');
    if (h1) h1.textContent = t(pageText[page][0]);
    if (subtitle && pageText[page][1]) subtitle.textContent = t(pageText[page][1]);
  }

  var titleInput = document.getElementById('docTitle');
  var descInput = document.getElementById('docDescription');
  var search = document.getElementById('searchInput');
  if (titleInput) titleInput.placeholder = t('docTitlePlaceholder');
  if (descInput) descInput.placeholder = t('descriptionPlaceholder');
  if (search) search.placeholder = t('search');

  var docType = document.getElementById('docType');
  if (docType) {
    docType.options[0].textContent = t('study');
    docType.options[1].textContent = t('adminType');
    docType.options[2].textContent = t('other');
  }

  var typeFilter = document.getElementById('typeFilter');
  if (typeFilter) {
    typeFilter.options[0].textContent = t('allTypes');
    typeFilter.options[1].textContent = t('studyPlural');
    typeFilter.options[2].textContent = t('adminType');
    typeFilter.options[3].textContent = t('other');
  }

  var roleInput = document.getElementById('roleInput');
  if (roleInput) {
    roleInput.options[0].textContent = t('student');
    roleInput.options[1].textContent = t('teacher');
    roleInput.options[2].textContent = t('secretary');
  }

  var profileEditTitle = document.getElementById('profileEditTitle');
  var profileSaveBtn = document.getElementById('profileSaveBtn');
  var profileGroupLabel = document.getElementById('profileGroupLabel');
  var profileGroupInput = document.getElementById('profileGroupInput');
  if (profileEditTitle) profileEditTitle.textContent = t('editProfile');
  if (profileSaveBtn) profileSaveBtn.textContent = t('saveProfile');
  if (profileGroupLabel) profileGroupLabel.textContent = t('group') + ':';
  if (profileGroupInput) profileGroupInput.placeholder = t('groupPlaceholder');

  document.querySelectorAll('.card-title').forEach(function(el) {
    var parent = el.closest('.card');
    if (page === 'dashboard' && parent && parent.querySelector('#latestDocsList')) el.textContent = t('latestDocs');
    if (page === 'dashboard' && parent && parent.querySelector('#notificationsList')) el.textContent = t('notifications');
    if (page === 'dashboard' && parent && parent.querySelector('.button-group')) el.textContent = t('quickAccess');
    if (parent && parent.querySelector('#allDocsTable')) el.textContent = t('allDocs');
    if (parent && parent.querySelector('#usersTable')) el.textContent = t('users');
    if (parent && parent.querySelector('#adminDocsTable')) el.textContent = t('docsTitle');
    if (parent && parent.querySelector('#myDocsTable')) el.textContent = t('myDocs');
  });

  document.querySelectorAll('.button-group a[href="create.html"], .filter-row a[href="create.html"]').forEach(function(el) {
    el.textContent = t('navCreate');
  });
  document.querySelectorAll('.button-group a[href="documents.html"]').forEach(function(el) {
    el.textContent = t('navDocuments');
  });
  document.querySelectorAll('button[type="submit"]').forEach(function(el) {
    if (page === 'create') el.textContent = t('save');
  });
}

function setupLangToggle() {
  var btns = document.querySelectorAll('#langToggle');
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {
      var next = getLanguage() === 'ru' ? 'kz' : 'ru';
      setLanguage(next);
      location.reload();
    });
  }
}

function checkAuth() {
  var allowedPages = ['login'];
  var page = document.body.getAttribute('data-page');
  var user = getUser();
  
  if (!user && allowedPages.indexOf(page) === -1) {
    window.location = 'login.html';
    return false;
  }
  if (user && page === 'login') {
    window.location = 'index.html';
    return false;
  }
  if (page === 'admin' && user && user.role !== 'admin') {
    window.location = 'index.html';
    return false;
  }
  return true;
}

function updateMenu() {
  var user = getUser();
  if (!user) return;
  var links = document.querySelectorAll('.menu a');
  for (var i = 0; i < links.length; i++) {
    if (links[i].getAttribute('href') === 'admin.html' && user.role !== 'admin') {
      links[i].style.display = 'none';
    }
  }
}

function setupLogout() {
  var btns = document.querySelectorAll('#logoutBtn');
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {
      removeUser();
      window.location = 'login.html';
    });
  }
}

function parseJsonResponse(res) {
  return res.text().then(function(text) {
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch (e) {
      throw new Error(t('serverBadJson') + text);
    }
  });
}

var localUsersKey = 'vatkLocalUsers';

function ensureLocalUsers() {
  var raw = localStorage.getItem(localUsersKey);
  if (raw) {
    try {
      var users = JSON.parse(raw);
      if (Array.isArray(users)) return users;
    } catch (e) {
      localStorage.removeItem(localUsersKey);
    }
  }
  var now = new Date().toISOString();
  var users = [
    {id: 'u-admin', name: 'Администратор', email: 'admin@vatk.kz', password: 'admin123', role: 'admin', createdAt: now},
    {id: 'u-teacher', name: 'Aida Bek', email: 'teacher@vatk.kz', password: 'teacher123', role: 'teacher', createdAt: now},
    {id: 'u-student', name: 'Nursultan S.', email: 'student@vatk.kz', password: 'student123', role: 'student', createdAt: now},
    {id: 'u-secretary', name: 'Секретарь', email: 'secretary@vatk.kz', password: 'secretary123', role: 'secretary', createdAt: now}
  ];
  localStorage.setItem(localUsersKey, JSON.stringify(users));
  return users;
}

function saveLocalUsers(users) {
  localStorage.setItem(localUsersKey, JSON.stringify(users));
}

function localAuthLogin(email, password) {
  var users = ensureLocalUsers();
  var user = users.find(function(u) { return u.email === email && u.password === password; });
  if (!user) return Promise.reject(new Error(t('authWrong')));
  return Promise.resolve({user: {id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt}});
}

function localAuthRegister(data) {
  var users = ensureLocalUsers();
  if (users.some(function(u) { return u.email === data.email; })) {
    return Promise.reject(new Error(t('userExists')));
  }
  var now = new Date().toISOString();
  var user = {
    id: 'u-local-' + Date.now(),
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role,
    createdAt: now
  };
  users.push(user);
  saveLocalUsers(users);
  return Promise.resolve({user: {id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt}});
}

function apiCall(path, method, body, isFormData, fullUrl) {
  var opts = {method: method, headers: {}};
  var currentUser = getUser();
  if (currentUser && currentUser.id && !fullUrl) {
    opts.headers['X-User-Id'] = currentUser.id;
  }
  if (body) {
    if (isFormData) {
      opts.body = body;
    } else {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(body);
    }
  }
  var requestUrl = fullUrl ? path : apiUrl + path;
  return fetch(requestUrl, opts).then(function(res) {
    return parseJsonResponse(res).then(function(data) {
      if (!res.ok) {
        var message = t('serverError');
        if (data && typeof data === 'object' && data.message) {
          message = data.message;
        } else if (data && typeof data === 'string') {
          message = data;
        } else {
        message += ' ' + res.status;
        }
        throw new Error(message);
      }
      return data || {};
    });
  }).catch(function(err) {
    if (err.message === 'Failed to fetch' || err.message === 'Load failed') {
      throw new Error(t('serverUnavailable'));
    }
    throw err;
  });
}

function localAuthCall(action, body) {
  if (action === 'login') {
    return localAuthLogin(body.email, body.password);
  }
  if (action === 'register') {
    return localAuthRegister(body);
  }
  return Promise.reject(new Error(t('invalidAction')));
}

function authPhpCall(action, body) {
  return apiCall('/auth.php?action=' + action, 'POST', body, false, true).catch(function(err) {
    if (err.message === t('serverUnavailable') || err.message.indexOf(t('serverBadJson')) === 0 || err.message.indexOf(t('serverError')) === 0 || err.message.indexOf('404') === 0 || err.message.indexOf('500') === 0 || err.message === 'Failed to fetch') {
      return localAuthCall(action, body);
    }
    throw err;
  });
}

function authCall(action, body) {
  var nodeUrl = apiUrl + '/auth/' + action;
  return fetch(nodeUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }).then(function(res) {
    if (res.ok) {
      return parseJsonResponse(res).then(function(data) {
        return data || {};
      });
    }
    if (res.status === 404 || res.status === 500) {
      throw new Error('NODE-FALLBACK');
    }
    return parseJsonResponse(res).then(function(data) {
      var message = t('serverError');
      if (data && data.message) message = data.message;
      else if (typeof data === 'string') message = data;
      throw new Error(message);
    }).catch(function() {
      throw new Error('NODE-FALLBACK');
    });
  }).catch(function(err) {
    if (err.message === t('serverUnavailable') || err.message === 'Failed to fetch' || err.message === 'NODE-FALLBACK') {
      return authPhpCall(action, body);
    }
    return authPhpCall(action, body);
  });
}

function loadUsers() {
  return apiCall('/users').then(function(d) { return d.users || []; });
}

function loadDocs() {
  return apiCall('/documents').then(function(d) { return d.documents || []; });
}

function newDoc(form) {
  return apiCall('/documents', 'POST', form, true).then(function(d) { return d.document; });
}

function delUser(id) {
  return apiCall('/users/' + id, 'DELETE');
}

function delDoc(id) {
  return apiCall('/documents/' + id, 'DELETE');
}

function updateDoc(id, body) {
  return apiCall('/documents/' + id, 'PATCH', body).then(function(d) { return d.document; });
}

function updateProfile(id, form) {
  return apiCall('/users/' + id, 'PATCH', form, true).then(function(d) { return d.user; });
}

function formatDate(str) {
  var lang = getLanguage();
  return new Date(str).toLocaleDateString(lang === 'kz' ? 'kk-KZ' : 'ru-RU');
}

function getTypeLabel(type) {
  if (type === 'study') return t('study');
  if (type === 'admin') return t('adminType');
  return t('other');
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, function(char) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char];
  });
}

function getFileExtension(name) {
  var cleanName = String(name || '').split('?')[0].toLowerCase();
  var index = cleanName.lastIndexOf('.');
  return index === -1 ? '' : cleanName.slice(index + 1);
}

function getPreviewKind(fileName) {
  var ext = getFileExtension(fileName);
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg'].indexOf(ext) !== -1) return 'image';
  if (ext === 'pdf') return 'pdf';
  if (['txt', 'csv', 'json', 'md', 'log'].indexOf(ext) !== -1) return 'text';
  return 'none';
}

function getAvatarFallback(name) {
  var letter = String(name || 'V').trim().charAt(0).toUpperCase() || 'V';
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" rx="24" fill="#dbeafe"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="64" font-weight="700" fill="#1d4ed8">' + escapeHtml(letter) + '</text></svg>';
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

function ensureDocumentViewer() {
  var existing = document.getElementById('documentViewer');
  if (existing) return existing;

  var viewer = document.createElement('div');
  viewer.id = 'documentViewer';
  viewer.className = 'viewer hidden';
  viewer.innerHTML =
    '<div class="viewer-panel" role="dialog" aria-modal="true">' +
      '<div class="viewer-header">' +
        '<strong id="viewerTitle"></strong>' +
        '<div class="viewer-actions">' +
          '<a id="viewerDownload" class="button secondary" href="#" download>' + t('download') + '</a>' +
          '<button id="viewerClose" class="button secondary" type="button">' + t('close') + '</button>' +
        '</div>' +
      '</div>' +
      '<div id="viewerBody" class="viewer-body"></div>' +
    '</div>';
  document.body.appendChild(viewer);

  viewer.addEventListener('click', function(e) {
    if (e.target === viewer || e.target.id === 'viewerClose') {
      closeDocumentViewer();
    }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeDocumentViewer();
  });

  return viewer;
}

function closeDocumentViewer() {
  var viewer = document.getElementById('documentViewer');
  if (viewer) viewer.classList.add('hidden');
}

function openDocumentViewer(doc) {
  var viewer = ensureDocumentViewer();
  var title = document.getElementById('viewerTitle');
  var body = document.getElementById('viewerBody');
  var download = document.getElementById('viewerDownload');
  var fileName = doc.originalName || doc.fileName || t('file');
  var kind = getPreviewKind(fileName);

  title.textContent = fileName;
  download.href = doc.downloadUrl || doc.fileUrl;
  download.setAttribute('download', fileName);
  body.innerHTML = '';

  if (kind === 'image') {
    body.innerHTML = '<img class="viewer-image" src="' + escapeHtml(doc.fileUrl) + '" alt="' + escapeHtml(fileName) + '" />';
  } else if (kind === 'pdf') {
    body.innerHTML = '<iframe class="viewer-frame" src="' + escapeHtml(doc.fileUrl) + '" title="' + escapeHtml(fileName) + '"></iframe>';
  } else if (kind === 'text') {
    body.innerHTML = '<iframe class="viewer-frame" src="' + escapeHtml(doc.fileUrl) + '" title="' + escapeHtml(fileName) + '"></iframe>';
  } else {
    body.innerHTML = '<div class="viewer-empty"><p>' + t('noPreview') + '</p></div>';
  }

  viewer.classList.remove('hidden');
}

function getDocumentFileCell(doc) {
  if (!doc.fileUrl) return t('noFile');
  return '<span class="file-name">' + escapeHtml(doc.originalName || doc.fileName || t('file')) + '</span>';
}

function getDocumentActions(doc, index, options) {
  options = options || {};
  if (!doc.fileUrl && !options.edit && !options.delete) return '-';

  var fileName = doc.originalName || doc.fileName || t('file');
  var downloadUrl = doc.downloadUrl || doc.fileUrl || '#';
  var html = '<div class="doc-actions">';
  if (doc.fileUrl) {
    html += '<button class="button secondary compact" type="button" data-view-index="' + index + '">' + t('view') + '</button>';
    html += '<a class="button compact" href="' + escapeHtml(downloadUrl) + '" download="' + escapeHtml(fileName) + '">' + t('download') + '</a>';
  }
  if (options.edit) {
    html += '<button class="button secondary compact" type="button" data-edit-index="' + index + '">' + t('edit') + '</button>';
  }
  if (options.delete) {
    html += '<button class="button danger compact" type="button" data-delete-index="' + index + '">' + t('delete') + '</button>';
  }
  html += '</div>';
  return html;
}

function bindDocumentActionButtons(container, docs, options) {
  options = options || {};
  container.querySelectorAll('button[data-view-index]').forEach(function(btn) {
    btn.onclick = function() {
      openDocumentViewer(docs[Number(this.getAttribute('data-view-index'))]);
    };
  });
  container.querySelectorAll('button[data-edit-index]').forEach(function(btn) {
    btn.onclick = function() {
      openDocumentEditor(docs[Number(this.getAttribute('data-edit-index'))], options.onSaved);
    };
  });
  container.querySelectorAll('button[data-delete-index]').forEach(function(btn) {
    btn.onclick = function() {
      var doc = docs[Number(this.getAttribute('data-delete-index'))];
      if (!confirm(t('confirmDelete'))) return;
      delDoc(doc.id).then(function() {
        if (options.onDeleted) options.onDeleted(doc);
      }).catch(function(err) {
        alert(err.message);
      });
    };
  });
}

function ensureDocumentEditor() {
  var existing = document.getElementById('documentEditor');
  if (existing) return existing;

  var editor = document.createElement('div');
  editor.id = 'documentEditor';
  editor.className = 'viewer hidden';
  editor.innerHTML =
    '<div class="editor-panel" role="dialog" aria-modal="true">' +
      '<div class="viewer-header">' +
        '<strong>' + t('edit') + '</strong>' +
        '<button id="docEditorClose" class="button secondary" type="button">' + t('close') + '</button>' +
      '</div>' +
      '<form id="docEditorForm" class="form editor-form">' +
        '<label>' + t('docTitle') + '</label>' +
        '<input type="text" id="editDocTitle" required />' +
        '<label>' + t('description') + '</label>' +
        '<textarea id="editDocDescription" rows="5" required></textarea>' +
        '<label>' + t('type') + '</label>' +
        '<select id="editDocType" required><option value="study">' + t('study') + '</option><option value="admin">' + t('adminType') + '</option><option value="other">' + t('other') + '</option></select>' +
        '<div class="button-group"><button type="submit" class="button primary">' + t('save') + '</button><button type="button" id="docEditorCancel" class="button secondary">' + t('cancel') + '</button></div>' +
        '<p class="note" id="docEditorMessage"></p>' +
      '</form>' +
    '</div>';
  document.body.appendChild(editor);
  editor.addEventListener('click', function(e) {
    if (e.target === editor || e.target.id === 'docEditorClose' || e.target.id === 'docEditorCancel') {
      editor.classList.add('hidden');
    }
  });
  return editor;
}

function openDocumentEditor(doc, onSaved) {
  var editor = ensureDocumentEditor();
  var form = document.getElementById('docEditorForm');
  var title = document.getElementById('editDocTitle');
  var desc = document.getElementById('editDocDescription');
  var type = document.getElementById('editDocType');
  var msg = document.getElementById('docEditorMessage');

  title.value = doc.title || '';
  desc.value = doc.description || '';
  type.value = doc.type || 'study';
  msg.textContent = '';
  editor.classList.remove('hidden');

  form.onsubmit = function(e) {
    e.preventDefault();
    updateDoc(doc.id, {
      title: title.value.trim(),
      description: desc.value.trim(),
      type: type.value
    }).then(function(updatedDoc) {
      msg.textContent = t('updated');
      editor.classList.add('hidden');
      if (onSaved) onSaved(updatedDoc);
    }).catch(function(err) {
      msg.textContent = err.message;
    });
  };
}

function initLogin() {
  var loginBtn = document.getElementById('loginTab');
  var regBtn = document.getElementById('registerTab');
  var nameFld = document.getElementById('nameField');
  var roleFld = document.getElementById('roleField');
  var submitBtn = document.getElementById('submitBtn');
  var msg = document.getElementById('messageText');
  var form = document.getElementById('authForm');

  function switchMode(m) {
    if (m === 'login') {
      loginBtn.classList.add('active');
      regBtn.classList.remove('active');
      nameFld.classList.add('hidden');
      roleFld.classList.add('hidden');
      submitBtn.textContent = t('signIn');
    } else {
      loginBtn.classList.remove('active');
      regBtn.classList.add('active');
      nameFld.classList.remove('hidden');
      roleFld.classList.remove('hidden');
      submitBtn.textContent = t('register');
    }
    msg.textContent = '';
  }

  if (loginBtn) loginBtn.onclick = function() { switchMode('login'); };
  if (regBtn) regBtn.onclick = function() { switchMode('register'); };
  switchMode('login');

  if (form) {
    form.onsubmit = function(e) {
      e.preventDefault();
      var email = document.getElementById('emailInput').value.trim().toLowerCase();
      var pass = document.getElementById('passwordInput').value.trim();
      var name = document.getElementById('nameInput').value.trim();
      var role = document.getElementById('roleInput').value;

      if (!email || !checkEmail(email)) {
        msg.textContent = t('enterEmail');
        return;
      }
      if (!pass) {
        msg.textContent = t('enterPassword');
        return;
      }

      if (loginBtn.classList.contains('active')) {
        authCall('login', {email: email, password: pass})
          .then(function(res) {
            setUser(res.user);
            window.location = 'index.html';
          })
          .catch(function(err) { msg.textContent = err.message; });
        return;
      }

      if (!name) {
        msg.textContent = t('enterName');
        return;
      }

      authCall('register', {name: name, email: email, password: pass, role: role})
        .then(function(res) {
          setUser(res.user);
          window.location = 'index.html';
        })
        .catch(function(err) { msg.textContent = err.message; });
    };
  }
}

function initDashboard() {
  var welcome = document.getElementById('welcomeText');
  var latestList = document.getElementById('latestDocsList');
  var notificationsList = document.getElementById('notificationsList');
  var allTable = document.getElementById('allDocsTable');
  var userBadge = document.getElementById('userBadge');
  var user = getUser();
  
  if (!user) return;
  
loadDocs().then(function(docs) {
    if (welcome) {
      welcome.textContent = user.name + t('welcome');
    }
    if (userBadge) {
      userBadge.textContent = user.group ? user.role + ' · ' + user.group : user.role;
    }
    
    var latest = docs.slice(0, 3);
    var html = latest.map(function(doc) {
      return '<li><strong>' + doc.title + '</strong><br/><span class="muted">' + doc.authorName + ' · ' + formatDate(doc.createdAt) + '</span></li>';
    }).join('');
    if (!html) html = '<li>' + t('noDocs') + '</li>';
    if (latestList) latestList.innerHTML = html;

    if (notificationsList) {
      var today = new Date().toLocaleDateString('en-CA');
      var todayDocs = docs.filter(function(doc) {
        return new Date(doc.createdAt).toLocaleDateString('en-CA') === today;
      });
      notificationsList.innerHTML = todayDocs.length
        ? '<li>' + t('notificationsReady') + todayDocs.length + '</li>'
        : '<li>' + t('notificationsEmpty') + '</li>';
    }

    if (!docs.length) {
      if (allTable) allTable.innerHTML = '<p class="note">' + t('noDocs') + '</p>';
      return;
    }

    var rows = docs.map(function(doc, index) {
      return '<tr><td>' + escapeHtml(doc.title) + '</td><td>' + escapeHtml(doc.authorName) + '</td><td>' + formatDate(doc.createdAt) + '</td><td><span class="status ' + doc.type + '">' + getTypeLabel(doc.type) + '</span></td><td>' + getDocumentActions(doc, index) + '</td></tr>';
    }).join('');
    if (allTable) {
      allTable.innerHTML = '<table><thead><tr><th>' + t('document') + '</th><th>' + t('author') + '</th><th>' + t('date') + '</th><th>' + t('type') + '</th><th>' + t('actions') + '</th></tr></thead><tbody>' + rows + '</tbody></table>';
      bindDocumentActionButtons(allTable, docs);
    }
  });
}

function initDocsPage() {
  var search = document.getElementById('searchInput');
  var typeF = document.getElementById('typeFilter');
  var authorF = document.getElementById('authorFilter');
  var table = document.getElementById('documentsTable');

  loadDocs().then(function(docs) {
    if (authorF) {
      var authors = [];
      docs.forEach(function(d) { if (authors.indexOf(d.authorName) === -1) authors.push(d.authorName); });
      authorF.innerHTML = '<option value="all">' + t('allAuthors') + '</option>' + authors.map(function(a) { return '<option value="' + a + '">' + a + '</option>'; }).join('');
    }

    function render() {
      if (!search || !table) return;
      var q = search.value.trim().toLowerCase();
      var type = typeF ? typeF.value : 'all';
      var author = authorF ? authorF.value : 'all';
      
      var filtered = docs.filter(function(d) {
        var txt = (d.title + ' ' + d.description + ' ' + d.authorName).toLowerCase();
        return txt.includes(q) && (type === 'all' || d.type === type) && (author === 'all' || d.authorName === author);
      });

      if (!filtered.length) {
        table.innerHTML = '<p class="note">' + t('noDocs') + '</p>';
        return;
      }

      table.innerHTML = '<table><thead><tr><th>' + t('document') + '</th><th>' + t('author') + '</th><th>' + t('date') + '</th><th>' + t('type') + '</th><th>' + t('file') + '</th><th>' + t('actions') + '</th></tr></thead><tbody>' +
        filtered.map(function(d, index) {
          var fileCell = getDocumentFileCell(d);
          var actions = getDocumentActions(d, index);
          return '<tr><td>' + escapeHtml(d.title) + '</td><td>' + escapeHtml(d.authorName) + '</td><td>' + formatDate(d.createdAt) + '</td><td><span class="status ' + d.type + '">' + getTypeLabel(d.type) + '</span></td><td>' + fileCell + '</td><td>' + actions + '</td></tr>';
        }).join('') + '</tbody></table>';
      bindDocumentActionButtons(table, filtered);
    }

    if (search) search.oninput = render;
    if (typeF) typeF.onchange = render;
    if (authorF) authorF.onchange = render;
    render();
  });
}

function initCreate() {
  var form = document.getElementById('createForm');
  var msg = document.getElementById('createMessage');
  var user = getUser();

  if (!form || !user) return;

  form.onsubmit = function(e) {
    e.preventDefault();
    var title = document.getElementById('docTitle').value.trim();
    var desc = document.getElementById('docDescription').value.trim();
    var type = document.getElementById('docType').value;
    var file = document.getElementById('docFile');

    if (!title || !desc) {
      msg.textContent = t('fillFields');
      return;
    }

    var fd = new FormData();
    fd.append('title', title);
    fd.append('description', desc);
    fd.append('type', type);
    fd.append('authorId', user.id);
    if (file && file.files.length > 0) {
      fd.append('file', file.files[0]);
    }

    newDoc(fd).then(function(doc) {
      msg.innerHTML = t('saved') + '. <a href="documents.html">' + t('navDocuments') + '</a>';
      form.reset();
    }).catch(function(err) {
      msg.textContent = err.message;
    });
  };
}

function initAdmin() {
  var usersTbl = document.getElementById('usersTable');
  var docsTbl = document.getElementById('adminDocsTable');

  loadUsers().then(function(users) {
    loadDocs().then(function(docs) {
      function renderUsers() {
        usersTbl.innerHTML = '<table><thead><tr><th>' + t('name') + '</th><th>Email</th><th>' + t('role') + '</th><th>' + t('action') + '</th></tr></thead><tbody>' +
          users.map(function(u) { return '<tr><td>' + u.name + '</td><td>' + u.email + '</td><td>' + u.role + '</td><td><button class="button danger" data-id="' + u.id + '">' + t('delete') + '</button></td></tr>'; }).join('') + '</tbody></table>';
        usersTbl.querySelectorAll('button[data-id]').forEach(function(btn) {
          btn.onclick = function() {
            var id = this.getAttribute('data-id');
            if (!confirm(t('delete') + '?')) return;
            delUser(id).then(function() {
              users = users.filter(function(u) { return u.id !== id; });
              renderUsers();
            }).catch(function(e) { alert(e.message); });
          };
        });
      }

      function renderDocs() {
        docsTbl.innerHTML = '<table><thead><tr><th>' + t('docTitle') + '</th><th>' + t('author') + '</th><th>' + t('date') + '</th><th>' + t('type') + '</th><th>' + t('file') + '</th><th>' + t('action') + '</th></tr></thead><tbody>' +
          docs.map(function(d, index) {
            return '<tr><td>' + escapeHtml(d.title) + '</td><td>' + escapeHtml(d.authorName) + '</td><td>' + formatDate(d.createdAt) + '</td><td>' + getTypeLabel(d.type) + '</td><td>' + getDocumentFileCell(d) + '</td><td>' + getDocumentActions(d, index, {edit: true, delete: true}) + '</td></tr>';
          }).join('') + '</tbody></table>';
        bindDocumentActionButtons(docsTbl, docs, {
          onSaved: function(updatedDoc) {
            docs = docs.map(function(item) { return item.id === updatedDoc.id ? updatedDoc : item; });
            renderDocs();
          },
          onDeleted: function(deletedDoc) {
            docs = docs.filter(function(item) { return item.id !== deletedDoc.id; });
            renderDocs();
          }
        });
      }

      renderUsers();
      renderDocs();
    });
  });
}

function initProfile() {
  var nameDiv = document.getElementById('profileName');
  var emailDiv = document.getElementById('profileEmail');
  var roleDiv = document.getElementById('profileRole');
  var groupDiv = document.getElementById('profileGroup');
  var avatar = document.getElementById('profileAvatar');
  var form = document.getElementById('profileForm');
  var nameInput = document.getElementById('profileNameInput');
  var emailInput = document.getElementById('profileEmailInput');
  var groupInput = document.getElementById('profileGroupInput');
  var photoInput = document.getElementById('profilePhotoInput');
  var msg = document.getElementById('profileMessage');
  var docsDiv = document.getElementById('myDocsTable');
  var user = getUser();

  if (!user) return;

  function renderProfile(currentUser) {
    if (nameDiv) nameDiv.textContent = currentUser.name;
    if (emailDiv) emailDiv.textContent = currentUser.email;
    if (roleDiv) roleDiv.textContent = currentUser.role;
    if (groupDiv) groupDiv.textContent = currentUser.group || '-';
    if (nameInput) nameInput.value = currentUser.name || '';
    if (emailInput) emailInput.value = currentUser.email || '';
    if (groupInput) groupInput.value = currentUser.group || '';
    if (avatar) {
      avatar.src = currentUser.avatarUrl || getAvatarFallback(currentUser.name);
      avatar.classList.toggle('empty', !currentUser.avatarUrl);
      avatar.alt = currentUser.name || t('profilePhoto');
    }
  }

  renderProfile(user);

  if (photoInput && avatar) {
    photoInput.onchange = function() {
      var file = photoInput.files && photoInput.files[0];
      if (!file) return;
      avatar.src = URL.createObjectURL(file);
      avatar.classList.remove('empty');
    };
  }

  if (form) {
    form.onsubmit = function(e) {
      e.preventDefault();
      var name = nameInput.value.trim();
      var email = emailInput.value.trim().toLowerCase();
      var group = groupInput ? groupInput.value.trim().toUpperCase() : '';

      if (!name) {
        msg.textContent = t('enterName');
        return;
      }
      if (!email || !checkEmail(email)) {
        msg.textContent = t('enterEmail');
        return;
      }
      if (group && !/^\d{1,2}\s*[A-ZА-ЯЁӘІҢҒҮҰҚӨҺ]{1,10}$/i.test(group)) {
        msg.textContent = t('invalidGroup');
        return;
      }

      var fd = new FormData();
      fd.append('name', name);
      fd.append('email', email);
      fd.append('group', group);
      if (photoInput.files && photoInput.files[0]) {
        fd.append('avatar', photoInput.files[0]);
      }

      updateProfile(user.id, fd).then(function(updatedUser) {
        user = updatedUser;
        setUser(updatedUser);
        renderProfile(updatedUser);
        if (photoInput) photoInput.value = '';
        msg.textContent = t('profileSaved');
      }).catch(function(err) {
        msg.textContent = err.message;
      });
    };
  }

  loadDocs().then(function(docs) {
    var myDocs = docs.filter(function(d) { return d.authorId === user.id; });

    function renderMyDocs(list) {
      if (!list.length) {
        if (docsDiv) docsDiv.innerHTML = '<p class="note">' + t('noDocs') + '</p>';
        return;
      }

      docsDiv.innerHTML = '<table><thead><tr><th>' + t('document') + '</th><th>' + t('date') + '</th><th>' + t('type') + '</th><th>' + t('file') + '</th><th>' + t('actions') + '</th></tr></thead><tbody>' +
        list.map(function(d, index) {
          return '<tr><td>' + escapeHtml(d.title) + '</td><td>' + formatDate(d.createdAt) + '</td><td>' + getTypeLabel(d.type) + '</td><td>' + getDocumentFileCell(d) + '</td><td>' + getDocumentActions(d, index, {edit: true, delete: true}) + '</td></tr>';
        }).join('') + '</tbody></table>';

      bindDocumentActionButtons(docsDiv, list, {
        onSaved: function(updatedDoc) {
          myDocs = myDocs.map(function(item) { return item.id === updatedDoc.id ? updatedDoc : item; });
          renderMyDocs(myDocs);
        },
        onDeleted: function(deletedDoc) {
          myDocs = myDocs.filter(function(item) { return item.id !== deletedDoc.id; });
          renderMyDocs(myDocs);
        }
      });
    }

    renderMyDocs(myDocs);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  if (!checkAuth()) return;
  setupLangToggle();
  setupLogout();
  updateMenu();
  translatePage();

  var page = document.body.getAttribute('data-page');
  if (page === 'login') initLogin();
  else if (page === 'dashboard') initDashboard();
  else if (page === 'documents') initDocsPage();
  else if (page === 'create') initCreate();
  else if (page === 'admin') initAdmin();
  else if (page === 'profile') initProfile();
});
