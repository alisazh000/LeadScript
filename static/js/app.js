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
  const onlyModel = "gpt-5.3-codex";
  if (state.aiSettings.model !== onlyModel) {
    state.aiSettings.model = onlyModel;
    saveAiSettings();
  }
  $("modelSel").value = onlyModel;
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
  document.querySelectorAll(".section-title")[0].textContent = t.projects;
  document.querySelectorAll(".section-title")[1].textContent = t.savedScripts;
  $("projectTitle").textContent = t.workspace;
  $("autosaveBadge").textContent = t.autosave;
  $("downloadWinBtn").textContent = t.downloadWin;
  $("logoutBtn").textContent = t.logout;
  document.querySelector("section.panel h2").textContent = "AliceAI";
  document.querySelector("section.panel .sub").textContent = t.aiSub;
  $("sendBtn").textContent = t.send;
  $("saveChatBtn").textContent = t.saveChat;
  $("guestBtn").textContent = t.guest;
  document.querySelectorAll("section.panel h2")[1].textContent = "Script Generator";
  document.querySelectorAll("section.panel .sub")[1].textContent = t.generatorSub;
  document.querySelector("#generateForm button[type='submit']").textContent = t.generate;
  $("ideasBtn").textContent = t.suggest;
  $("saveScriptBtn").textContent = t.saveScript;
  document.querySelector("#generateForm").parentElement.querySelector("h3").textContent = t.result;
  $("qaForm").parentElement.querySelector("h2").textContent = t.qaTitle;
  $("qaForm button[type='submit']").textContent = t.runAnalysis;
  $("exportBtn").textContent = t.export;
  $("langBtn").textContent = lang === "en" ? "RU" : "EN";
}

function openAuthModal(open) {
  $("authModal").style.display = open ? "flex" : "none";
}

function setAdminUI(isAdmin) {
  const panel = $("aiAdvancedPanel");
  if (!panel) return;
  panel.classList.toggle("hidden", !isAdmin);
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
    root.innerHTML = `<div class="item"><div class="meta">No projects yet.</div></div>`;
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
    root.innerHTML = `<div class="item"><div class="meta">No saved scripts.</div></div>`;
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
    $("chatInput").value = state.lang === "ru" ? "Сделай полный план контента на 7 дней" : "Build a 7-day content plan";
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
    const q = prompt("Search project title:");
    if (!q) return;
    const found = state.projects.find((p) => p.title.toLowerCase().includes(q.toLowerCase()));
    if (!found) return alert("Not found");
    state.activeProjectId = found.id;
    renderProjects();
    await loadProjectChats();
    await loadScripts();
  };
  $("skillsBtn").onclick = () => alert("Skills hub will be connected to plugins marketplace.");
  $("autoBtn").onclick = () => alert("Automations: schedule script reviews and weekly idea packs.");
  [
    "modelSel",
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
