const state = {
  token: localStorage.getItem("ls_token") || "",
  user: null,
  lang: localStorage.getItem("ls_lang") || "en",
  projects: [],
  activeProjectId: null,
  scripts: [],
  activeScriptId: null,
  aiSettings: {
    model: "gpt-5.3-codex",
    reasoning_effort: "medium",
    response_mode: "normal",
    temperature: 0.7,
    max_tokens: 350,
    memory_enabled: true,
    memory_window: 8,
    system_prompt: "",
  },
};

const i18n = {
  en: {
    newConversation: "New conversation",
    search: "Search",
    skills: "Skills & Apps",
    automations: "Automations",
    projects: "Projects",
    savedScripts: "Saved Scripts",
    workspace: "LeadScript Workspace",
    autosave: "Autosave on",
    aiTitle: "AliceAI Assistant",
    downloadWin: "Download Windows App",
    logout: "Logout",
    aiSub: "Built-in AI assistant",
    send: "Send",
    saveChat: "Save Chat Snapshot",
    guest: "Continue as Guest",
    generatorSub: "Ads, TikTok, film pitches, platform-ready drafts.",
    generate: "Generate",
    suggest: "Suggest Ideas",
    saveScript: "Save Script",
    result: "Result",
    qaTitle: "Script QA and Budget",
    runAnalysis: "Run Analysis",
    export: "Export Selected Script",
    beforePublishing: "Before publishing",
    onboarding1: "Create your first project.",
    onboarding2: "Generate a script and save version history.",
    onboarding3: "Run platform QA and budget estimate.",
    gotIt: "Got it",
    style: "Style",
    detail: "Detail",
    focus: "Focus",
    creativity: "Creativity",
    aliceSettings: "AliceAI Settings (ChatGPT-style)",
    model: "Model",
    reasoningEffort: "Reasoning Effort",
    responseMode: "Response Mode",
    temperature: "Temperature",
    maxTokens: "Max Tokens",
    memoryOn: "Memory On",
    memoryWindow: "Memory Window (messages)",
    systemInstruction: "System Instruction",
    scriptGenerator: "Script Generator",
    idea: "Idea",
    language: "Language",
    mode: "Mode",
    submode: "Submode",
    targetPlatform: "Target platform",
    niche: "Niche",
    audience: "Audience",
    tone: "Tone",
    goal: "Goal",
    analysis: "Analysis",
    platform: "Platform",
    budgetLevel: "Budget level",
    region: "Region",
    exportFormat: "Export format",
    scriptText: "Script text",
    welcome: "Welcome to LeadScript",
    welcomeSub: "Sign in to keep chats and scripts in secure cloud storage.",
    login: "Login",
    register: "Register",
    searchPrompt: "Search project title:",
    notFound: "Not found",
    noProjects: "No projects yet.",
    noScripts: "No saved scripts.",
    savePlanPrompt: "Build a 7-day content plan",
    namePlaceholder: "Name",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password (min 8)",
    askPlaceholder: "Ask AliceAI...",
    ideaPlaceholder: "e.g. ad concept for coffee app",
    systemPlaceholder: "You are AliceAI. Be practical and concise.",
    skillsAlert: "Skills hub will be connected to plugins marketplace.",
    automationsAlert: "Automations: schedule script reviews and weekly idea packs.",
  },
  ru: {
    newConversation: "Новая беседа",
    search: "Поиск",
    skills: "Навыки и приложения",
    automations: "Автоматизации",
    projects: "Проекты",
    savedScripts: "Сохраненные сценарии",
    workspace: "Рабочее пространство LeadScript",
    autosave: "Автосохранение включено",
    aiTitle: "Ассистент AliceAI",
    downloadWin: "Скачать Windows приложение",
    logout: "Выйти",
    aiSub: "Встроенный AI ассистент",
    send: "Отправить",
    saveChat: "Сохранить снимок чата",
    guest: "Продолжить без регистрации",
    generatorSub: "Реклама, TikTok, фильмы и сценарии под платформы.",
    generate: "Сгенерировать",
    suggest: "Предложить идеи",
    saveScript: "Сохранить сценарий",
    result: "Результат",
    qaTitle: "Проверка сценария и бюджет",
    runAnalysis: "Запустить анализ",
    export: "Экспорт выбранного сценария",
    beforePublishing: "Перед публикацией",
    onboarding1: "Создай первый проект.",
    onboarding2: "Сгенерируй сценарий и сохрани версии.",
    onboarding3: "Запусти проверку платформы и расчет бюджета.",
    gotIt: "Понятно",
    style: "Стиль",
    detail: "Детализация",
    focus: "Фокус",
    creativity: "Креативность",
    aliceSettings: "Настройки AliceAI (в стиле ChatGPT)",
    model: "Модель",
    reasoningEffort: "Уровень рассуждения",
    responseMode: "Режим ответа",
    temperature: "Температура",
    maxTokens: "Макс. токены",
    memoryOn: "Память включена",
    memoryWindow: "Окно памяти (сообщения)",
    systemInstruction: "Системная инструкция",
    scriptGenerator: "Генератор сценариев",
    idea: "Идея",
    language: "Язык",
    mode: "Режим",
    submode: "Подрежим",
    targetPlatform: "Целевая платформа",
    niche: "Ниша",
    audience: "Аудитория",
    tone: "Тон",
    goal: "Цель",
    analysis: "Анализ",
    platform: "Платформа",
    budgetLevel: "Уровень бюджета",
    region: "Регион",
    exportFormat: "Формат экспорта",
    scriptText: "Текст сценария",
    welcome: "Добро пожаловать в LeadScript",
    welcomeSub: "Войди, чтобы хранить чаты и сценарии в защищенном облаке.",
    login: "Войти",
    register: "Регистрация",
    searchPrompt: "Поиск по названию проекта:",
    notFound: "Не найдено",
    noProjects: "Пока нет проектов.",
    noScripts: "Нет сохраненных сценариев.",
    savePlanPrompt: "Сделай полный план контента на 7 дней",
    namePlaceholder: "Имя",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Пароль (минимум 8)",
    askPlaceholder: "Спроси AliceAI...",
    ideaPlaceholder: "например: идея рекламы приложения для кофе",
    systemPlaceholder: "Ты AliceAI. Давай практичные и короткие ответы.",
    skillsAlert: "Раздел навыков будет подключен к маркетплейсу плагинов.",
    automationsAlert: "Автоматизации: настройка проверки сценариев и еженедельных пакетов идей.",
  },
};

const $ = (id) => document.getElementById(id);

function loadAiSettings() {
  try {
    const raw = localStorage.getItem("ls_ai_settings");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    state.aiSettings = { ...state.aiSettings, ...parsed };
  } catch (_) {}
}

function saveAiSettings() {
  localStorage.setItem("ls_ai_settings", JSON.stringify(state.aiSettings));
}

function syncAiSettingsToUI() {
  const modelOptions = new Set([
    "gpt-5.4",
    "gpt-5.2-codex",
    "gpt-5.1-codex-max",
    "gpt-5.4-mini",
    "gpt-5.3-codex",
    "gpt-5.2",
    "gpt-5.1-codex-mini",
  ]);
  if (!modelOptions.has(state.aiSettings.model)) {
    state.aiSettings.model = "gpt-5.3-codex";
  }
  const effortOptions = new Set(["low", "medium", "high", "xhigh"]);
  if (!effortOptions.has(state.aiSettings.reasoning_effort)) {
    state.aiSettings.reasoning_effort = "medium";
  }
  $("modelSel").value = state.aiSettings.model;
  $("reasonEffortSel").value = state.aiSettings.reasoning_effort;
  $("respModeSel").value = state.aiSettings.response_mode;
  $("tempInp").value = String(state.aiSettings.temperature);
  $("maxTokInp").value = String(state.aiSettings.max_tokens);
  $("memoryChk").checked = Boolean(state.aiSettings.memory_enabled);
  $("memoryWinInp").value = String(state.aiSettings.memory_window);
  $("sysPromptInp").value = state.aiSettings.system_prompt || "";
}

function readAiSettingsFromUI() {
  const clampNum = (v, lo, hi, d) => {
    const n = Number(v);
    if (Number.isNaN(n)) return d;
    return Math.max(lo, Math.min(hi, n));
  };
  state.aiSettings = {
    model: $("modelSel").value,
    reasoning_effort: $("reasonEffortSel").value,
    response_mode: $("respModeSel").value,
    temperature: clampNum($("tempInp").value, 0, 2, 0.7),
    max_tokens: Math.round(clampNum($("maxTokInp").value, 80, 1500, 350)),
    memory_enabled: $("memoryChk").checked,
    memory_window: Math.round(clampNum($("memoryWinInp").value, 2, 30, 8)),
    system_prompt: $("sysPromptInp").value.trim(),
  };
  saveAiSettings();
}

async function api(path, opts = {}) {
  const headers = { "Content-Type": "application/json", ...(opts.headers || {}) };
  if (state.token) headers.Authorization = `Bearer ${state.token}`;
  const res = await fetch(path, { ...opts, headers });
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body.error) msg = body.error;
    } catch (_) {}
    throw new Error(msg);
  }
  const type = res.headers.get("content-type") || "";
  if (type.includes("application/json")) return res.json();
  return res.blob();
}

function setStatus(msg) {
  $("authStatus").textContent = msg;
}

function setLang(lang) {
  state.lang = lang;
  localStorage.setItem("ls_lang", lang);
  const t = i18n[lang];
  $("newProjectBtn").textContent = t.newConversation;
  $("searchBtn").textContent = t.search;
  $("skillsBtn").textContent = t.skills;
  $("autoBtn").textContent = t.automations;
  $("projectsTitle").textContent = t.projects;
  $("savedScriptsTitle").textContent = t.savedScripts;
  $("projectTitle").textContent = t.workspace;
  $("autosaveBadge").textContent = t.autosave;
  $("downloadWinBtn").textContent = t.downloadWin;
  $("logoutBtn").textContent = t.logout;
  const privacyLink = document.querySelector('a[href="/privacy"]');
  if (privacyLink) privacyLink.textContent = lang === "ru" ? "Политика" : "Privacy";
  const termsLink = document.querySelector('a[href="/terms"]');
  if (termsLink) termsLink.textContent = lang === "ru" ? "Условия" : "Terms";
  $("aliceTitle").textContent = t.aiTitle;
  $("aliceSub").textContent = t.aiSub;
  $("sendBtn").textContent = t.send;
  $("saveChatBtn").textContent = t.saveChat;
  $("guestBtn").textContent = t.guest;
  $("generatorTitle").textContent = t.scriptGenerator;
  $("generatorSub").textContent = t.generatorSub;
  document.querySelector("#generateForm button[type='submit']").textContent = t.generate;
  $("ideasBtn").textContent = t.suggest;
  $("saveScriptBtn").textContent = t.saveScript;
  $("resultTitle").textContent = t.result;
  $("qaTitleHeading").textContent = t.qaTitle;
  $("qaForm button[type='submit']").textContent = t.runAnalysis;
  $("exportBtn").textContent = t.export;
  $("onboardingTitle").textContent = t.beforePublishing;
  $("onboardingStep1").textContent = t.onboarding1;
  $("onboardingStep2").textContent = t.onboarding2;
  $("onboardingStep3").textContent = t.onboarding3;
  $("closeOnboarding").textContent = t.gotIt;
  $("labelStyle").childNodes[0].textContent = `${t.style}\n              `;
  $("labelDetail").childNodes[0].textContent = `${t.detail}\n              `;
  $("labelFocus").childNodes[0].textContent = `${t.focus}\n              `;
  $("labelCreativity").childNodes[0].textContent = `${t.creativity}\n              `;
  $("aiSettingsSummary").textContent = t.aliceSettings;
  $("labelModel").childNodes[0].textContent = `${t.model}\n                `;
  $("labelReasoningEffort").childNodes[0].textContent = `${t.reasoningEffort}\n                `;
  $("labelResponseMode").childNodes[0].textContent = `${t.responseMode}\n                `;
  $("labelTemperature").childNodes[0].textContent = `${t.temperature}\n                `;
  $("labelMaxTokens").childNodes[0].textContent = `${t.maxTokens}\n                `;
  $("labelMemoryOn").childNodes[1].textContent = t.memoryOn;
  $("labelMemoryWindow").childNodes[0].textContent = `${t.memoryWindow}\n                `;
  $("labelSystemInstruction").childNodes[0].textContent = `${t.systemInstruction}\n                `;
  $("labelIdea").childNodes[0].textContent = t.idea;
  $("labelLanguage").childNodes[0].textContent = `${t.language}\n                `;
  $("labelMode").childNodes[0].textContent = `${t.mode}\n                `;
  $("labelSubmode").childNodes[0].textContent = `${t.submode}\n                `;
  $("labelTargetPlatform").childNodes[0].textContent = `${t.targetPlatform}\n                `;
  $("labelNiche").childNodes[0].textContent = t.niche;
  $("labelAudience").childNodes[0].textContent = t.audience;
  $("labelTone").childNodes[0].textContent = t.tone;
  $("labelGoal").childNodes[0].textContent = t.goal;
  $("labelAnalysis").childNodes[0].textContent = `${t.analysis}\n              `;
  $("labelPlatform").childNodes[0].textContent = `${t.platform}\n              `;
  $("labelBudgetLevel").childNodes[0].textContent = `${t.budgetLevel}\n              `;
  $("labelRegion").childNodes[0].textContent = `${t.region}\n              `;
  $("labelExportFormat").childNodes[0].textContent = `${t.exportFormat}\n              `;
  $("labelScriptText").childNodes[0].textContent = t.scriptText;
  $("welcomeTitle").textContent = t.welcome;
  $("welcomeSub").textContent = t.welcomeSub;
  $("loginBtn").textContent = t.login;
  $("registerBtn").textContent = t.register;
  $("nameField").placeholder = t.namePlaceholder;
  $("emailField").placeholder = t.emailPlaceholder;
  $("passwordField").placeholder = t.passwordPlaceholder;
  $("chatInput").placeholder = t.askPlaceholder;
  $("ideaInput").placeholder = t.ideaPlaceholder;
  $("sysPromptInp").placeholder = t.systemPlaceholder;
  const analysisSel = $("analysisType");
  if (analysisSel?.options?.length >= 2) {
    analysisSel.options[0].text = lang === "ru" ? "Проверка платформы" : "Platform compliance";
    analysisSel.options[1].text = lang === "ru" ? "Бюджет сцен" : "Scene budget";
  }
  const budgetSel = $("budgetLevel");
  if (budgetSel?.options?.length >= 3) {
    budgetSel.options[0].text = lang === "ru" ? "низкий" : "low";
    budgetSel.options[1].text = lang === "ru" ? "средний" : "mid";
    budgetSel.options[2].text = lang === "ru" ? "высокий" : "high";
  }
  const responseModeSel = $("respModeSel");
  if (responseModeSel?.options?.length >= 3) {
    responseModeSel.options[0].text = lang === "ru" ? "кратко" : "concise";
    responseModeSel.options[1].text = lang === "ru" ? "нормально" : "normal";
    responseModeSel.options[2].text = lang === "ru" ? "глубоко" : "deep";
  }
  const effortSel = $("reasonEffortSel");
  if (effortSel?.options?.length >= 4) {
    effortSel.options[0].text = lang === "ru" ? "Низкий" : "low";
    effortSel.options[1].text = lang === "ru" ? "Средний" : "medium";
    effortSel.options[2].text = lang === "ru" ? "Высокий" : "high";
    effortSel.options[3].text = lang === "ru" ? "Очень высокий" : "xhigh";
  }
  const modeSel = $("modeSel");
  if (modeSel?.options?.length >= 7) {
    modeSel.options[0].text = lang === "ru" ? "по умолчанию" : "default";
    modeSel.options[1].text = "tiktok";
    modeSel.options[2].text = lang === "ru" ? "реклама" : "ads";
    modeSel.options[3].text = lang === "ru" ? "кино" : "film";
    modeSel.options[4].text = lang === "ru" ? "бизнес" : "business";
    modeSel.options[5].text = lang === "ru" ? "геймдев" : "gamedev";
    modeSel.options[6].text = lang === "ru" ? "программирование" : "programming";
  }
  const submodeSel = $("submodeSel");
  if (submodeSel?.options?.length >= 3) {
    submodeSel.options[0].text = lang === "ru" ? "универсальный" : "universal";
    submodeSel.options[1].text = lang === "ru" ? "эксперт" : "expert";
    submodeSel.options[2].text = lang === "ru" ? "продажи" : "sales";
  }
  $("langBtn").textContent = lang === "en" ? "RU" : "EN";
}

function openAuthModal(open) {
  $("authModal").style.display = open ? "flex" : "none";
}

function setAdminUI(isAdmin) {
  void isAdmin;
  const panel = $("aiAdvancedPanel");
  if (!panel) return;
  panel.classList.remove("hidden");
}

async function loginRegister(mode) {
  const email = $("emailField").value.trim();
  const password = $("passwordField").value;
  const name = $("nameField").value.trim();
  if (!email || !password) {
    setStatus("Fill email and password.");
    return;
  }
  try {
    const body = mode === "register" ? { email, password, name } : { email, password };
    const data = await api(`/api/auth/${mode}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    state.token = data.token;
    state.user = data.user;
    localStorage.setItem("ls_token", state.token);
    setAdminUI(Boolean(state.user && state.user.is_admin));
    openAuthModal(false);
    await bootstrapWorkspace();
  } catch (e) {
    setStatus(e.message);
  }
}

async function continueAsGuest() {
  try {
    const data = await api("/api/auth/guest", { method: "POST", body: JSON.stringify({}) });
    state.token = data.token;
    state.user = data.user;
    localStorage.setItem("ls_token", state.token);
    setAdminUI(false);
    openAuthModal(false);
    await bootstrapWorkspace();
  } catch (e) {
    setStatus(e.message);
  }
}

function appendMessage(role, text) {
  const el = document.createElement("div");
  el.className = "msg";
  el.innerHTML = `<span class="role">${role}</span>${escapeHtml(text)}`;
  $("chatMessages").appendChild(el);
  $("chatMessages").scrollTop = $("chatMessages").scrollHeight;
}

function clearChat() {
  $("chatMessages").innerHTML = "";
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function syncPlatformFromMode() {
  const mode = $("modeSel").value;
  const map = {
    default: "Generic",
    tiktok: "TikTok",
    ads: "Meta Ads",
    film: "Netflix",
    business: "LinkedIn",
    gamedev: "Steam",
    programming: "GitHub",
  };
  $("platformSel").value = map[mode] || "Generic";
}

async function createProject(title = "New conversation") {
  const p = await api("/api/projects", {
    method: "POST",
    body: JSON.stringify({ title, status: "draft", tags: ["chat"] }),
  });
  state.activeProjectId = p.id;
  await loadProjects();
  await loadProjectChats();
  await loadScripts();
}

async function loadProjects() {
  state.projects = await api("/api/projects");
  if (!state.activeProjectId && state.projects.length) {
    state.activeProjectId = state.projects[0].id;
  }
  renderProjects();
}

function renderProjects() {
  const root = $("projectList");
  root.innerHTML = "";
  if (!state.projects.length) {
    root.innerHTML = `<div class="item"><div class="meta">${i18n[state.lang].noProjects}</div></div>`;
    return;
  }
  state.projects.forEach((p) => {
    const el = document.createElement("div");
    el.className = `item ${p.id === state.activeProjectId ? "active" : ""}`;
    el.innerHTML = `
      <div class="title">${escapeHtml(p.title)}</div>
      <div class="meta">${escapeHtml(p.status)} • ${escapeHtml(p.updated_at || "")}</div>
      <div class="actions">
        <button data-open="${p.id}">Open</button>
        <button class="danger" data-del="${p.id}">Delete</button>
      </div>
    `;
    root.appendChild(el);
  });
  root.querySelectorAll("button[data-open]").forEach((btn) => {
    btn.onclick = async () => {
      state.activeProjectId = Number(btn.dataset.open);
      renderProjects();
      await loadProjectChats();
      await loadScripts();
    };
  });
  root.querySelectorAll("button[data-del]").forEach((btn) => {
    btn.onclick = async () => {
      await api(`/api/projects/${btn.dataset.del}`, { method: "DELETE" });
      if (Number(btn.dataset.del) === state.activeProjectId) state.activeProjectId = null;
      await loadProjects();
      if (state.activeProjectId) {
        await loadProjectChats();
        await loadScripts();
      } else {
        clearChat();
        $("savedScriptsNav").innerHTML = "";
      }
    };
  });
}

async function loadProjectChats() {
  clearChat();
  if (!state.activeProjectId) return;
  const chats = await api(`/api/projects/${state.activeProjectId}/chats`);
  chats.forEach((m) => appendMessage(m.role, m.content));
}

async function sendMessage() {
  const text = $("chatInput").value.trim();
  if (!text || !state.activeProjectId) return;
  readAiSettingsFromUI();
  appendMessage("user", text);
  $("chatInput").value = "";
  const payload = {
    project_id: state.activeProjectId,
    text,
    style: $("styleSel").value,
    detail: $("detailSel").value,
    focus: $("focusSel").value,
    creativity: $("creativeSel").value,
    model: state.aiSettings.model,
    response_mode: state.aiSettings.response_mode,
    reasoning_effort: state.aiSettings.reasoning_effort,
    temperature: state.aiSettings.temperature,
    max_tokens: state.aiSettings.max_tokens,
    memory_enabled: state.aiSettings.memory_enabled,
    memory_window: state.aiSettings.memory_window,
    system_prompt: state.aiSettings.system_prompt,
  };
  const data = await api("/api/chats/message", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  appendMessage("AliceAI", data.reply);
  await loadProjects();
}

async function generateScript() {
  const body = {
    idea: $("ideaInput").value.trim(),
    language: $("languageSel").value,
    mode: $("modeSel").value,
    submode: $("submodeSel").value,
    niche: $("nicheInput").value,
    audience: $("audInput").value,
    tone: $("toneInput").value,
    goal: $("goalInput").value,
    platform: $("platformSel").value,
  };
  const data = await api("/api/scripts/generate", {
    method: "POST",
    body: JSON.stringify(body),
  });
  $("scriptResult").textContent = data.script;
  $("qaScriptText").value = data.script;
}

async function saveScript() {
  if (!state.activeProjectId) return;
  const content = $("scriptResult").textContent.trim();
  if (!content) return;
  const title = (state.lang === "ru" ? "Сценарий" : "Script") + " " + new Date().toLocaleString();
  await api("/api/scripts/save", {
    method: "POST",
    body: JSON.stringify({
      project_id: state.activeProjectId,
      title,
      content,
      language: $("languageSel").value,
      mode: $("modeSel").value,
      tags: [$("modeSel").value, $("submodeSel").value],
    }),
  });
  await loadScripts();
}

async function loadScripts() {
  if (!state.activeProjectId) {
    $("savedScriptsNav").innerHTML = "";
    return;
  }
  state.scripts = await api(`/api/projects/${state.activeProjectId}/scripts`);
  renderScripts();
}

function renderScripts() {
  const root = $("savedScriptsNav");
  root.innerHTML = "";
  if (!state.scripts.length) {
    root.innerHTML = `<div class="item"><div class="meta">${i18n[state.lang].noScripts}</div></div>`;
    return;
  }
  state.scripts.forEach((s) => {
    const el = document.createElement("div");
    el.className = `item ${s.id === state.activeScriptId ? "active" : ""}`;
    el.innerHTML = `
      <div class="title">${escapeHtml(s.title)}</div>
      <div class="meta">v${s.version} • ${escapeHtml(s.mode)}</div>
      <div class="actions">
        <button data-open-script="${s.id}">Open</button>
        <button data-version-script="${s.id}">New Ver.</button>
        <button class="danger" data-del-script="${s.id}">Delete</button>
      </div>
    `;
    root.appendChild(el);
  });
  root.querySelectorAll("button[data-open-script]").forEach((btn) => {
    btn.onclick = async () => {
      const id = btn.dataset.openScript;
      state.activeScriptId = Number(id);
      const data = await api(`/api/scripts/${id}`);
      $("scriptResult").textContent = data.content;
      $("qaScriptText").value = data.content;
      renderScripts();
    };
  });
  root.querySelectorAll("button[data-version-script]").forEach((btn) => {
    btn.onclick = async () => {
      const content = $("scriptResult").textContent.trim();
      if (!content) return;
      await api(`/api/scripts/${btn.dataset.versionScript}/version`, {
        method: "POST",
        body: JSON.stringify({ content }),
      });
      await loadScripts();
    };
  });
  root.querySelectorAll("button[data-del-script]").forEach((btn) => {
    btn.onclick = async () => {
      await api(`/api/scripts/${btn.dataset.delScript}`, { method: "DELETE" });
      if (Number(btn.dataset.delScript) === state.activeScriptId) state.activeScriptId = null;
      await loadScripts();
    };
  });
}

async function runQA() {
  const body = {
    analysis_type: $("analysisType").value,
    platform: $("qaPlatform").value,
    budget: $("budgetLevel").value,
    region: $("regionSel").value,
    script: $("qaScriptText").value,
  };
  const data = await api("/api/qa/analyze", {
    method: "POST",
    body: JSON.stringify(body),
  });
  $("qaOutput").textContent = JSON.stringify(data, null, 2);
}

async function suggestIdeas() {
  const data = await api("/api/ideas/suggest", {
    method: "POST",
    body: JSON.stringify({
      niche: $("nicheInput").value,
      audience: $("audInput").value,
      language: $("languageSel").value,
      direction: $("modeSel").value,
    }),
  });
  $("scriptResult").textContent = data.ideas.map((x, i) => `${i + 1}. ${x}`).join("\n");
}

async function exportScript() {
  if (!state.activeScriptId) {
    alert("Open a saved script first.");
    return;
  }
  const fmt = $("exportFmt").value;
  const res = await fetch(`/api/scripts/${state.activeScriptId}/export?format=${fmt}`, {
    headers: { Authorization: `Bearer ${state.token}` },
  });
  if (!res.ok) {
    alert("Export failed");
    return;
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `script.${fmt}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function bootstrapWorkspace() {
  try {
    await loadProjects();
    if (!state.activeProjectId) {
      $("onboarding").classList.remove("hidden");
      await createProject(i18n[state.lang].newConversation);
    }
    await loadProjectChats();
    await loadScripts();
  } catch (e) {
    console.error(e);
  }
}

function wireEvents() {
  $("registerBtn").onclick = () => loginRegister("register");
  $("loginBtn").onclick = () => loginRegister("login");
  $("guestBtn").onclick = continueAsGuest;
  $("newProjectBtn").onclick = () => createProject(i18n[state.lang].newConversation);
  $("modeSel").onchange = syncPlatformFromMode;
  $("sendBtn").onclick = sendMessage;
  $("chatInput").addEventListener("keydown", async (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      await sendMessage();
    }
  });
  $("saveChatBtn").onclick = async () => {
    $("chatInput").value = i18n[state.lang].savePlanPrompt;
    await sendMessage();
  };
  $("generateForm").onsubmit = async (e) => {
    e.preventDefault();
    await generateScript();
  };
  $("saveScriptBtn").onclick = saveScript;
  $("ideasBtn").onclick = suggestIdeas;
  $("qaForm").onsubmit = async (e) => {
    e.preventDefault();
    await runQA();
  };
  $("exportBtn").onclick = exportScript;
  $("logoutBtn").onclick = () => {
    localStorage.removeItem("ls_token");
    state.token = "";
    openAuthModal(true);
  };
  $("langBtn").onclick = () => setLang(state.lang === "en" ? "ru" : "en");
  $("languageSel").onchange = () => setLang($("languageSel").value);
  $("closeOnboarding").onclick = () => $("onboarding").classList.add("hidden");
  $("searchBtn").onclick = async () => {
    const q = prompt(i18n[state.lang].searchPrompt);
    if (!q) return;
    const found = state.projects.find((p) => p.title.toLowerCase().includes(q.toLowerCase()));
    if (!found) return alert(i18n[state.lang].notFound);
    state.activeProjectId = found.id;
    renderProjects();
    await loadProjectChats();
    await loadScripts();
  };
  $("skillsBtn").onclick = () => alert(i18n[state.lang].skillsAlert);
  $("autoBtn").onclick = () => alert(i18n[state.lang].automationsAlert);
  [
    "modelSel",
    "reasonEffortSel",
    "respModeSel",
    "tempInp",
    "maxTokInp",
    "memoryChk",
    "memoryWinInp",
    "sysPromptInp",
  ].forEach((id) => {
    $(id).addEventListener("change", readAiSettingsFromUI);
    $(id).addEventListener("input", readAiSettingsFromUI);
  });
}

async function init() {
  loadAiSettings();
  syncAiSettingsToUI();
  wireEvents();
  setLang(state.lang);
  setAdminUI(false);
  syncPlatformFromMode();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/static/service-worker.js").catch(() => {});
  }
  if (!state.token) {
    openAuthModal(true);
    return;
  }
  try {
    const me = await api("/api/auth/me");
    state.user = me.user;
    setAdminUI(Boolean(state.user && state.user.is_admin));
    openAuthModal(false);
    await bootstrapWorkspace();
  } catch (_) {
    setAdminUI(false);
    openAuthModal(true);
  }
}

init();
