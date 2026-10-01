const TYPE_LABELS = {
  technikum: "Technikum",
  bs_i: "BS I stopnia",
  bs_ii: "BS II stopnia",
  kkz: "KKZ",
  kurs: "Kurs / BCU"
};

// Obszary w języku ucznia -> branże z danych mapy (data/offer.json).
const AREAS = [
  { id: "it", name: "IT i technologie cyfrowe", branches: ["informatyka", "elektronika"], lead: "Programy, sieci, urządzenia elektroniczne i systemy, na których opiera się niemal każda firma." },
  { id: "industry", name: "Przemysł i produkcja", branches: ["mechanika", "automatyka przemysłowa", "robotyka"], lead: "Maszyny, linie produkcyjne i roboty: od projektowania części po sterowanie całą fabryką." },
  { id: "auto", name: "Motoryzacja i lotnictwo", branches: ["motoryzacja", "lotnictwo"], lead: "Serwis i obsługa pojazdów oraz statków powietrznych, a także praca na lotnisku." },
  { id: "emobility", name: "Elektromobilność", branches: ["elektromobilność"], lead: "Pojazdy elektryczne, ładowanie i nowe technologie transportu." },
  { id: "construction", name: "Budownictwo", branches: ["budownictwo"], lead: "Budowa, wykończenie i pomiary: od fundamentów po gotowy budynek." },
  { id: "energy", name: "Energetyka i instalacje", branches: ["energetyka", "elektryka", "chłodnictwo i klimatyzacja"], lead: "Prąd, ciepło i chłód: instalacje, które sprawiają, że budynki i fabryki działają." },
  { id: "logistics", name: "Transport i logistyka", branches: ["logistyka"], lead: "Magazyny, przewozy i łańcuchy dostaw, czyli to, dzięki czemu towary docierają tam, gdzie trzeba." },
  { id: "business", name: "Handel, finanse i administracja", branches: ["ekonomia"], lead: "Sprzedaż, rachunkowość i organizacja pracy firm oraz urzędów." },
  { id: "food", name: "Gastronomia i żywność", branches: ["gastronomia"], lead: "Kuchnia, obsługa gości i produkcja żywności." },
  { id: "tourism", name: "Turystyka i hotelarstwo", branches: ["turystyka"], lead: "Podróże, hotele i organizacja wypoczynku." },
  { id: "craft", name: "Moda, uroda i rzemiosło", branches: ["moda", "rzemiosło i usługi"], lead: "Praca rąk i wyczucia stylu: odzież, usługi dla ludzi, tradycyjne zawody rzemieślnicze." },
  { id: "health", name: "Zdrowie i opieka", branches: ["zdrowie i usługi medyczne"], lead: "Zawody, w których pomaga się ludziom w zdrowiu i codziennym funkcjonowaniu." },
  { id: "media", name: "Kultura i media", branches: ["grafika i multimedia", "reklama"], lead: "Grafika, multimedia i reklama: pomysły, które trafiają do odbiorców." },
  { id: "science", name: "Nauka i badania", branches: ["analityka"], lead: "Laboratoria, próbki, pomiary i kontrola jakości." },
  { id: "environment", name: "Środowisko i zieleń", branches: ["ochrona środowiska", "ogrodnictwo", "architektura krajobrazu", "florystyka"], lead: "Ochrona przyrody, tereny zielone, ogrody i florystyka." }
];

const els = {
  areas: document.querySelector("#te-areas"),
  detail: document.querySelector("#te-area-detail"),
  verified: document.querySelector("#te-verified"),
  tabs: [...document.querySelectorAll('.te-steps [role="tab"]')],
  panels: [...document.querySelectorAll(".te-panel")]
};

const state = { data: null, areas: [], selected: null };

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[ch]);
}

function mapUrl(params) {
  const q = new URLSearchParams(params);
  return `./?${q.toString()}#branze`;
}

/* ---------- Journey tabs ---------- */
function selectStep(index, focus = false) {
  els.tabs.forEach((tab, i) => {
    const active = i === index;
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
    els.panels[i].hidden = !active;
    if (active && focus) tab.focus();
  });
}

function setupJourney() {
  if (!els.tabs.length) return;
  els.tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => selectStep(i));
    tab.addEventListener("keydown", (event) => {
      const last = els.tabs.length - 1;
      const keys = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: last };
      if (!(event.key in keys)) return;
      event.preventDefault();
      selectStep(Math.min(last, Math.max(0, keys[event.key])), true);
    });
  });
  selectStep(0);
}

/* ---------- Industry map ---------- */
function buildAreas(data) {
  const byName = new Map(data.branch_map.map((branch) => [branch.name, branch]));
  return AREAS.map((area) => {
    const branches = area.branches.map((name) => byName.get(name)).filter(Boolean);
    const profiles = new Map();
    const schools = new Map();
    for (const branch of branches) {
      for (const profile of branch.profiles) {
        const entry = profiles.get(profile.name) || { ...profile, branch: branch.name, types: new Set() };
        profile.types.forEach((type) => entry.types.add(type));
        profiles.set(profile.name, entry);
        for (const offering of profile.offerings || []) {
          const school = schools.get(offering.school_name) || { name: offering.school_name, types: new Set() };
          school.types.add(offering.education_type);
          schools.set(offering.school_name, school);
        }
      }
    }
    return {
      ...area,
      branchData: branches,
      profiles: [...profiles.values()],
      schools: [...schools.values()].sort((a, b) => a.name.localeCompare(b.name, "pl"))
    };
  }).filter((area) => area.profiles.length);
}

function schoolWebsite(name) {
  return state.data.institutions.find((inst) => inst.name === name)?.website || "";
}

function typeBadges(types) {
  return `<div class="te-badges">${[...types]
    .map((type) => `<span class="te-badge">${escapeHtml(TYPE_LABELS[type] || type)}</span>`)
    .join("")}</div>`;
}

function renderAreaList() {
  els.areas.innerHTML = state.areas
    .map((area) => `
      <button type="button" class="te-area" role="option" id="te-area-${area.id}" data-id="${area.id}" aria-selected="false">
        <span>${escapeHtml(area.name)}</span>
        <small>${area.profiles.length}</small>
      </button>`)
    .join("");
  els.areas.querySelectorAll(".te-area").forEach((button, i, all) => {
    button.tabIndex = i === 0 ? 0 : -1;
    button.addEventListener("click", () => selectArea(button.dataset.id, true));
    button.addEventListener("keydown", (event) => {
      const moves = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: all.length - 1 };
      if (!(event.key in moves)) return;
      event.preventDefault();
      const next = all[Math.min(all.length - 1, Math.max(0, moves[event.key]))];
      next.focus();
      selectArea(next.dataset.id);
    });
  });
}

function renderArea(area) {
  const branchDescriptions = area.branchData
    .map((branch) => branch.description)
    .filter(Boolean);
  const schoolItems = area.schools.map((school) => {
    const url = schoolWebsite(school.name);
    const name = url
      ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(school.name)}</a>`
      : `<strong>${escapeHtml(school.name)}</strong>`;
    return `<li>${name}${typeBadges(school.types)}</li>`;
  }).join("");
  const profileItems = area.profiles.map((profile) => `
    <li>
      <strong>${escapeHtml(profile.name)}</strong>
      <span>${escapeHtml(profile.description || "")}</span>
      ${typeBadges(profile.types)}
    </li>`).join("");
  const mapLinks = area.branchData
    .map((branch) => `<a class="path-cta te-open-map" href="${escapeHtml(mapUrl({ branch: branch.name }))}">Otwórz w mapie: ${escapeHtml(branch.name)}</a>`)
    .join(" ");

  els.detail.innerHTML = `
    <h3>${escapeHtml(area.name)}</h3>
    <p class="te-area-lead">${escapeHtml(area.lead)}</p>
    ${branchDescriptions.length ? `<p class="te-note">${escapeHtml(branchDescriptions.join(" "))}</p>` : ""}
    <div class="te-stats">
      <div><strong>${area.branchData.length}</strong><span>${area.branchData.length === 1 ? "branża w mapie" : "branże w mapie"}</span></div>
      <div><strong>${area.profiles.length}</strong><span>profili i zawodów</span></div>
      <div><strong>${area.schools.length}</strong><span>szkół i BCU</span></div>
    </div>
    <div class="te-two">
      <div><h4>Zawody i profile</h4><ul class="te-list">${profileItems}</ul></div>
      <div><h4>Gdzie się tego nauczyć we Wrocławiu</h4><ul class="te-list">${schoolItems}</ul></div>
    </div>
    <div>
      <h4>Warstwa lokalna: w przygotowaniu</h4>
      <div class="te-soon">
        <div><strong>Pracodawcy</strong><span>Firmy i instytucje z tej branży we Wrocławiu i aglomeracji.</span><span class="te-status planned">Planowane</span></div>
        <div><strong>Wydarzenia</strong><span>Warsztaty, dni otwarte i wizyty studyjne do wypróbowania zawodu.</span><span class="te-status planned">Planowane</span></div>
        <div><strong>Rynek pracy</strong><span>Dane o zapotrzebowaniu na zawody i kierunkach rozwoju.</span><span class="te-status planned">Planowane</span></div>
      </div>
    </div>
    <div>${mapLinks}</div>`;
}

function selectArea(id, scroll = false) {
  const area = state.areas.find((item) => item.id === id);
  if (!area) return;
  state.selected = id;
  els.areas.querySelectorAll(".te-area").forEach((button) => {
    const active = button.dataset.id === id;
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
  });
  els.areas.setAttribute("aria-activedescendant", `te-area-${id}`);
  renderArea(area);
  if (scroll && window.matchMedia("(max-width: 1000px)").matches) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    els.detail.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }
}

async function loadMap() {
  try {
    const response = await fetch("./data/offer.json");
    if (!response.ok) throw new Error(response.statusText);
    state.data = await response.json();
    state.areas = buildAreas(state.data);
    const verified = state.data.programs.map((p) => p.verified_at).filter(Boolean).sort().pop();
    if (els.verified) els.verified.textContent = verified || "brak daty";
    renderAreaList();
    const preferred = state.areas.find((area) => area.id === "industry") || state.areas[0];
    if (preferred) selectArea(preferred.id);
  } catch (error) {
    els.areas.innerHTML = "";
    els.detail.innerHTML = `<p class="te-loading">Nie udało się wczytać danych mapy. Spróbuj ponownie później lub otwórz <a href="./">mapę szkół</a>.</p>`;
    if (els.verified) els.verified.textContent = "brak danych";
  }
}

setupJourney();
loadMap();
