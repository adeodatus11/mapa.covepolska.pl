const typeLabels = {
  technikum: "Technikum",
  bs_i: "BS I stopnia",
  bs_ii: "BS II stopnia",
  kkz: "KKZ",
  kurs: "Kurs lub wsparcie"
};

const state = {
  data: null,
  q: "",
  educationType: "",
  branch: "",
  school: "",
  openBranch: "",
  showAll: false
};

const els = {
  form: document.querySelector("#filters"),
  q: document.querySelector("#q"),
  educationType: document.querySelector("#educationType"),
  branch: document.querySelector("#branch"),
  school: document.querySelector("#school"),
  clear: document.querySelector("#clearFilters"),
  branchAccordion: document.querySelector("#branchAccordion"),
  branchDetail: document.querySelector("#branchDetail"),
  currentPath: document.querySelector("#currentPath"),
  branchCount: document.querySelector("#branchCount"),
  profileCount: document.querySelector("#profileCount"),
  quickProfiles: document.querySelector("#quickProfiles"),
  areaList: document.querySelector("#areaList"),
  cards: document.querySelector("#programCards"),
  schools: document.querySelector("#schoolGrid"),
  sources: document.querySelector("#sourceGrid"),
  empty: document.querySelector("#emptyState"),
  summary: document.querySelector("#resultsSummary"),
  statSchools: document.querySelector("#stat-schools"),
  statPrograms: document.querySelector("#stat-programs"),
  statProfiles: document.querySelector("#stat-profiles"),
  statBranches: document.querySelector("#stat-branches")
};

function normalize(value) {
  return String(value || "").toLocaleLowerCase("pl-PL");
}

function matches(value, needle) {
  if (!needle) return true;
  return normalize(value).includes(normalize(needle));
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, "pl"));
}

function countBy(items, keyFn) {
  const map = new Map();
  items.forEach((item) => {
    const key = keyFn(item);
    if (!key) return;
    map.set(key, (map.get(key) || 0) + 1);
  });
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "pl"));
}

function dateLabel(value) {
  if (!value) return "brak daty";
  return new Intl.DateTimeFormat("pl-PL", { dateStyle: "medium" }).format(new Date(value));
}

function setSelectOptions(select, values, label) {
  select.innerHTML = "";
  const first = document.createElement("option");
  first.value = "";
  first.textContent = label;
  select.append(first);

  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
}

function loadFromUrl() {
  const params = new URLSearchParams(window.location.search);
  state.q = params.get("q") || "";
  state.educationType = params.get("educationType") || "";
  state.branch = params.get("branch") || "";
  state.school = params.get("school") || "";
  state.showAll = false;

  els.q.value = state.q;
  els.educationType.value = state.educationType;
  els.branch.value = state.branch;
  els.school.value = state.school;
  state.openBranch = state.branch || state.data.branch_map[0]?.name || "";

  if (!state.branch && state.q) {
    const matchedProgram = state.data.programs.find((program) => {
      return (
        matches(program.program_name, state.q) ||
        matches(program.school_name, state.q) ||
        matches(program.branch, state.q) ||
        matches(program.school_type_label, state.q)
      );
    });
    if (matchedProgram?.branch) state.openBranch = matchedProgram.branch;
  }
}

function syncUrl() {
  const params = new URLSearchParams();
  if (state.q) params.set("q", state.q);
  if (state.educationType) params.set("educationType", state.educationType);
  if (state.branch) params.set("branch", state.branch);
  if (state.school) params.set("school", state.school);
  const next = `${window.location.pathname}${params.toString() ? `?${params}` : ""}`;
  window.history.replaceState(null, "", next);
}

function explicitFiltersActive() {
  return Boolean(state.q || state.educationType || state.branch || state.school);
}

function effectiveBranchFilter({ includeDefaultBranch = true } = {}) {
  const hasExplicitFilter = state.q || state.educationType || state.branch || state.school;
  if (state.showAll) return "";
  if (state.branch) return state.branch;
  return includeDefaultBranch && !hasExplicitFilter ? state.openBranch : "";
}

function programsForFilters({ includeDefaultBranch = true, includeBranch = true } = {}) {
  const branchFilter = includeBranch ? effectiveBranchFilter({ includeDefaultBranch }) : "";
  return state.data.programs.filter((program) => {
    const text = !state.q ||
      matches(program.program_name, state.q) ||
      matches(program.school_name, state.q) ||
      matches(program.branch, state.q) ||
      matches(program.school_type_label, state.q);

    return (
      text &&
      (!state.educationType || program.education_type === state.educationType) &&
      matches(program.branch, branchFilter) &&
      matches(program.school_name, state.school)
    );
  });
}

function filteredPrograms() {
  return programsForFilters({ includeDefaultBranch: true, includeBranch: true });
}

function facetPrograms() {
  return programsForFilters({ includeDefaultBranch: false, includeBranch: true });
}

function programKey(program) {
  return [
    program.branch,
    program.program_name,
    program.school_name,
    program.education_type,
    program.school_type_label || ""
  ].join("|");
}

function branchMapForPrograms(programs) {
  const visibleKeys = new Set(programs.map(programKey));

  return state.data.branch_map
    .map((branch) => {
      const profiles = branch.profiles
        .map((profile) => {
          const offerings = (profile.offerings || []).filter((offering) => {
            return visibleKeys.has(
              [
                branch.name,
                profile.name,
                offering.school_name,
                offering.education_type,
                offering.school_type_label || ""
              ].join("|")
            );
          });

          if (offerings.length === 0) return null;
          return {
            ...profile,
            offerings,
            schools: unique(offerings.map((offering) => offering.school_name)),
            school_count: unique(offerings.map((offering) => offering.school_name)).length,
            types: unique(offerings.map((offering) => offering.education_type))
          };
        })
        .filter(Boolean);

      if (profiles.length === 0) return null;
      return { ...branch, profiles };
    })
    .filter(Boolean);
}

function renderStats() {
  const allPrograms = state.data.programs;
  const schoolCount = unique(allPrograms.map((program) => program.school_name)).length;
  const profileCount = unique(allPrograms.map((program) => program.program_name)).length;
  const branchCount = unique(allPrograms.map((program) => program.branch)).length;

  els.statSchools.textContent = String(schoolCount);
  els.statPrograms.textContent = String(allPrograms.length);
  els.statProfiles.textContent = String(profileCount);
  els.statBranches.textContent = String(branchCount);
}

function renderQuickProfiles(programs) {
  const profiles = countBy(programs, (program) => program.program_name).slice(0, 10);
  els.quickProfiles.innerHTML = "";

  if (profiles.length === 0) {
    els.quickProfiles.innerHTML = `<span class="muted">Brak szybkich wyborów dla aktualnych filtrów.</span>`;
    return;
  }

  profiles.forEach((profile) => {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `${escapeHtml(profile.name)} <span>${profile.count}</span>`;
    button.addEventListener("click", () => {
      state.q = profile.name;
      const match = findProfileBranch(profile.name);
      if (match) {
        state.openBranch = match.branch.name;
        state.branch = match.branch.name;
        els.branch.value = match.branch.name;
      }
      state.showAll = false;
      els.q.value = profile.name;
      render();
      document.querySelector("#wyniki").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    els.quickProfiles.append(button);
  });
}

function findProfileBranch(profileName) {
  for (const branch of state.data.branch_map) {
    const profile = branch.profiles.find((item) => item.name === profileName);
    if (profile) return { branch, profile };
  }
  return null;
}

function profileDetail(name, branch, branches = state.data.branch_map) {
  const branchData = branches.find((item) => item.name === branch);
  return branchData?.profiles.find((profile) => profile.name === name);
}

function selectProfile(profile, branchName) {
  state.q = profile.name;
  state.branch = branchName;
  state.school = "";
  state.educationType = "";
  state.openBranch = branchName;
  state.showAll = false;
  els.q.value = profile.name;
  els.branch.value = branchName;
  els.school.value = "";
  els.educationType.value = "";
  render();
  document.querySelector("#wyniki").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderBranchMap(branches) {
  if (branches.length === 0) {
    els.branchCount.textContent = "0";
    els.profileCount.textContent = "0 profili";
    els.currentPath.textContent = "Brak branż dla aktualnych filtrów. Wyczyść część kryteriów.";
    els.branchAccordion.innerHTML = `<div class="panel-empty">Brak branż dla tego zestawu filtrów.</div>`;
    els.branchDetail.innerHTML = `<div class="panel-empty">Zmień typ ścieżki, szkołę albo hasło wyszukiwania.</div>`;
    return;
  }

  const selected = branches.find((branch) => branch.name === state.openBranch) || branches[0];
  state.openBranch = selected.name;
  const selectedSchoolsCount = unique(selected.profiles.flatMap((profile) => profile.schools)).length;
  els.branchCount.textContent = String(branches.length);
  els.profileCount.textContent = `${selected.profiles.length} profili`;
  if (state.q && !state.branch) {
    els.currentPath.textContent = `Szukasz: ${state.q}. Panel profili pokazuje najbliższą branżę: ${selected.name}.`;
  } else if (state.school && !state.branch) {
    els.currentPath.textContent = `Filtrujesz szkołę: ${state.school}. Panel profili pokazuje kontekst: ${selected.name}.`;
  } else if (state.educationType && !state.branch) {
    els.currentPath.textContent = `Typ ścieżki: ${typeLabels[state.educationType]}. Widać tylko branże i profile z tym typem oferty.`;
  } else {
    els.currentPath.textContent = `Jesteś w: ${selected.name}. ${selected.profiles.length} profili, ${selectedSchoolsCount} szkół lub BCU.`;
  }

  els.branchAccordion.innerHTML = branches
    .map((branch) => {
      const schoolsCount = unique(branch.profiles.flatMap((profile) => profile.schools)).length;
      const isOpen = branch.name === state.openBranch;

      return `
        <article class="branch-item${isOpen ? " is-open" : ""}" data-branch-name="${escapeAttribute(branch.name)}">
          <button class="branch-toggle" type="button" aria-pressed="${isOpen}">
            <span class="branch-copy">
              <strong>${escapeHtml(branch.name)}</strong>
            </span>
            <span class="branch-metrics" aria-label="${branch.profiles.length} profili, ${schoolsCount} szkół">
              <span>${branch.profiles.length} profili</span>
              <span>${schoolsCount} szkół</span>
            </span>
            <span class="branch-chevron" aria-hidden="true"></span>
          </button>
        </article>
      `;
    })
    .join("");

  els.branchDetail.innerHTML = `
    <div class="branch-detail-header">
      <div>
        <h3>${escapeHtml(selected.name)}</h3>
        <p>${escapeHtml(selected.description)}</p>
      </div>
      <div class="branch-summary">
        <span class="tag">${selected.profiles.length} profili</span>
        <span class="tag amber">${selectedSchoolsCount} szkół/BCU</span>
      </div>
    </div>
    <div class="profile-list">
      ${selected.profiles
        .map((profile) => `
          <article class="profile-card" data-profile-name="${escapeAttribute(profile.name)}">
            <div class="profile-card-main">
              <h3>${escapeHtml(profile.name)}</h3>
              <div class="profile-types">
                ${(profile.types || [])
                  .map((type) => `<span class="tag">${escapeHtml(typeLabels[type] || type)}</span>`)
                  .join("")}
              </div>
              <p>${escapeHtml(profile.description)}</p>
            </div>
            <div class="profile-offers">
              ${(profile.offerings || [])
                .map((offering) => `
                  <div class="offer-row">
                    <span>${escapeHtml(offering.school_name)}</span>
                    <small>${escapeHtml(typeLabels[offering.education_type] || offering.education_type)}${offering.school_type_label ? `, ${escapeHtml(offering.school_type_label)}` : ""}</small>
                  </div>
                `)
                .join("")}
            </div>
            <button type="button" data-profile="${escapeAttribute(profile.name)}" data-branch="${escapeAttribute(selected.name)}">Pokaż w wynikach</button>
          </article>
        `)
        .join("")}
    </div>
  `;

  els.branchAccordion.querySelectorAll(".branch-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest("[data-branch-name]");
      const branchName = item?.dataset.branchName || "";
      state.openBranch = branchName;
      state.branch = branchName;
      state.q = "";
      state.showAll = false;
      els.branch.value = branchName;
      els.q.value = "";
      render();
    });
  });

  els.branchDetail.querySelectorAll("[data-profile]").forEach((button) => {
    button.addEventListener("click", () => {
      const branch = branches.find((item) => item.name === button.dataset.branch);
      const profile = branch?.profiles.find((item) => item.name === button.dataset.profile);
      if (profile) selectProfile(profile, button.dataset.branch);
    });
  });
}

function renderAreas(programs) {
  const schoolsInResults = unique(programs.map((program) => program.school_name));
  const visibleSchools = state.data.institutions.filter((school) => schoolsInResults.includes(school.name));
  const areas = countBy(visibleSchools, (school) => school.public_city_area || school.city || "Wrocław");

  els.areaList.innerHTML = "";
  areas.forEach((area) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "area-button";
    button.innerHTML = `<span>${escapeHtml(area.name)}</span><small>${area.count} szk.</small>`;
    button.addEventListener("click", () => {
      const firstSchool = visibleSchools.find((school) => (school.public_city_area || school.city || "Wrocław") === area.name);
      if (!firstSchool) return;
      state.school = firstSchool.name;
      els.school.value = firstSchool.name;
      render();
    });
    els.areaList.append(button);
  });

  if (areas.length === 0) {
    els.areaList.innerHTML = `<p class="muted">Brak obszarów dla obecnych filtrów.</p>`;
  }
}

function renderCards(programs) {
  els.cards.innerHTML = "";
  els.empty.hidden = programs.length > 0;

  programs.forEach((program) => {
    const card = document.createElement("article");
    card.className = "program-card";
    card.innerHTML = `
      <div class="program-meta">
        <span class="tag">${escapeHtml(typeLabels[program.education_type] || program.education_type)}</span>
        ${program.branch ? `<span class="tag amber">${escapeHtml(program.branch)}</span>` : ""}
      </div>
      <h3>${escapeHtml(program.program_name)}</h3>
      <p><strong>${escapeHtml(program.school_name)}</strong></p>
      ${profileDetail(program.program_name, program.branch)?.description ? `<p>${escapeHtml(profileDetail(program.program_name, program.branch).description)}</p>` : ""}
      ${program.school_type_label ? `<p>${escapeHtml(program.school_type_label)}</p>` : ""}
      <p>Weryfikacja: ${dateLabel(program.verified_at)}</p>
      ${program.source_url ? `<a href="${escapeAttribute(program.source_url)}" target="_blank" rel="noreferrer">Otwórz źródło</a>` : ""}
    `;
    els.cards.append(card);
  });
}

function renderSchools(programs) {
  const schoolsInResults = unique(programs.map((program) => program.school_name));
  const visibleSchools = state.data.institutions.filter((school) => schoolsInResults.includes(school.name));
  els.schools.innerHTML = "";

  visibleSchools.forEach((school) => {
    const schoolPrograms = programs.filter((program) => program.school_name === school.name);
    const card = document.createElement("article");
    card.className = "school-card";
    card.innerHTML = `
      <div class="school-meta">
        <span class="tag">${escapeHtml(school.public_city_area || school.city || "Wrocław")}</span>
        <span class="tag amber">${schoolPrograms.length} poz.</span>
      </div>
      <h3>${escapeHtml(school.name)}</h3>
      <p>${escapeHtml(school.public_summary || "Profil szkoły w publicznej mapie.")}</p>
      <p>${schoolPrograms.slice(0, 5).map((program) => escapeHtml(program.program_name)).join(", ")}</p>
      ${school.website ? `<a href="${escapeAttribute(school.website)}" target="_blank" rel="noreferrer">Strona szkoły</a>` : ""}
    `;
    els.schools.append(card);
  });
}

function renderSources(programs) {
  const sources = new Map();
  programs.forEach((program) => {
    const key = `${program.source_label || "Źródło"}|${program.source_url || ""}`;
    if (!sources.has(key)) sources.set(key, program);
  });

  els.sources.innerHTML = "";
  [...sources.values()].slice(0, 12).forEach((source) => {
    const card = document.createElement("article");
    card.className = "source-card";
    card.innerHTML = `
      <h3>${escapeHtml(source.source_label || "Źródło")}</h3>
      <p>Ostatnia weryfikacja: ${dateLabel(source.verified_at)}</p>
      ${source.source_url ? `<a href="${escapeAttribute(source.source_url)}" target="_blank" rel="noreferrer">Przejdź do źródła</a>` : ""}
    `;
    els.sources.append(card);
  });
}

function render() {
  syncUrl();
  const programs = filteredPrograms();
  const facetProgramSet = facetPrograms();
  const visibleBranches = branchMapForPrograms(facetProgramSet);
  const schools = unique(programs.map((program) => program.school_name));
  const activeFilters = [state.q, state.educationType, state.branch, state.school].filter(Boolean).length;

  renderStats();
  renderBranchMap(visibleBranches);
  renderQuickProfiles(facetProgramSet);
  renderAreas(programs);
  renderCards(programs);
  renderSchools(programs);
  renderSources(programs);

  els.summary.textContent = `${programs.length} pozycji, ${schools.length} szkół, ${activeFilters} ${activeFilters === 1 ? "aktywny filtr" : "aktywnych filtrów"}.`;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

async function init() {
  const response = await fetch("data/offer.json");
  if (!response.ok) throw new Error("Cannot load offer data");

  state.data = await response.json();
  setSelectOptions(els.branch, unique(state.data.programs.map((program) => program.branch)), "Wszystkie branże");
  setSelectOptions(els.school, unique(state.data.programs.map((program) => program.school_name)), "Wszystkie szkoły");
  loadFromUrl();
  render();
}

els.form.addEventListener("submit", (event) => {
  event.preventDefault();
  applyFiltersFromForm();
});

function applyFiltersFromForm() {
  state.q = els.q.value.trim();
  state.educationType = els.educationType.value;
  state.branch = els.branch.value;
  state.school = els.school.value;
  state.showAll = !state.q && !state.educationType && !state.branch && !state.school;
  if (state.branch) {
    state.openBranch = state.branch;
  }
  render();
}

[els.educationType, els.branch, els.school].forEach((select) => {
  select.addEventListener("change", applyFiltersFromForm);
});

els.clear.addEventListener("click", () => {
  state.q = "";
  state.educationType = "";
  state.branch = "";
  state.school = "";
  state.openBranch = state.data.branch_map[0]?.name || "";
  state.showAll = false;
  els.q.value = "";
  els.educationType.value = "";
  els.branch.value = "";
  els.school.value = "";
  render();
});

init().catch((error) => {
  console.error(error);
  els.summary.textContent = "Nie udało się wczytać danych mapy.";
});
