import {
  BRANCH_DESCRIPTIONS,
  BRANCH_LABELS,
  LANGUAGES,
  PROFILE_LABELS,
  SCHOOL_SUMMARIES_EN,
  UI
} from "./i18n.js";

const typeLabelKeys = {
  technikum: "technikumLabel",
  bs_i: "bs1Label",
  bs_ii: "bs2Label",
  kkz: "kkzLabel",
  kurs: "courseLabel"
};

const state = {
  data: null,
  lang: "pl",
  q: "",
  educationType: "",
  branch: "",
  school: "",
  openBranch: "",
  previewBranchActive: false,
  showAll: false
};

const els = {
  form: document.querySelector("#filters"),
  language: document.querySelector("#languageSelect"),
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
  const locale = LANGUAGES[state.lang]?.locale || LANGUAGES.pl.locale;
  return String(value || "").toLocaleLowerCase(locale);
}

function matches(value, needle) {
  if (!needle) return true;
  return normalize(value).includes(normalize(needle));
}

function unique(values) {
  const locale = LANGUAGES[state.lang]?.locale || LANGUAGES.pl.locale;
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, locale));
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
    .sort((a, b) => b.count - a.count || displayProfile(a.name).localeCompare(displayProfile(b.name), LANGUAGES[state.lang]?.locale || "pl-PL"));
}

function dateLabel(value) {
  if (!value) return t("noDate");
  return new Intl.DateTimeFormat(LANGUAGES[state.lang]?.locale || "pl-PL", { dateStyle: "medium" }).format(new Date(value));
}

function interpolate(template, values = {}) {
  return String(template || "").replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

function t(key, values = {}) {
  return interpolate(UI[state.lang]?.[key] || UI.pl[key] || key, values);
}

function displayBranch(value) {
  return state.lang === "pl" ? value : BRANCH_LABELS[state.lang]?.[value] || value;
}

function displayBranchDescription(branch) {
  return state.lang === "pl" ? branch.description : BRANCH_DESCRIPTIONS[state.lang]?.[branch.name] || branch.description;
}

function displayProfile(value) {
  return state.lang === "pl" ? value : PROFILE_LABELS[state.lang]?.[value] || value;
}

function displayProfileDescription(profile, branchName) {
  if (state.lang === "pl") return profile.description;
  const profileName = displayProfile(profile.name);
  const branch = displayBranch(branchName);
  const templates = {
    en: "This profile develops practical skills for work as a {profile} in the {branch} sector. It supports further learning, placements and entry into the labour market.",
    uk: "Цей профіль розвиває практичні навички для роботи як {profile} у галузі {branch}. Він підтримує подальше навчання, практику і вихід на ринок праці.",
    ru: "Этот профиль развивает практические навыки для работы как {profile} в отрасли {branch}. Он поддерживает дальнейшее обучение, практику и выход на рынок труда.",
    be: "Гэты профіль развівае практычныя навыкі для працы як {profile} у галіне {branch}. Ён падтрымлівае далейшае навучанне, практыку і выхад на рынак працы."
  };
  return interpolate(templates[state.lang] || templates.en, { profile: profileName, branch });
}

function displaySchoolSummary(school) {
  if (state.lang === "pl") return school.public_summary || t("defaultSchoolProfile");
  if (state.lang === "en") return SCHOOL_SUMMARIES_EN[school.public_summary] || school.public_summary || t("defaultSchoolProfile");
  const sectors = translateCsv(school.public_tags || school.sectors || school.occupations || "");
  const templates = {
    uk: "Освітня пропозиція цієї школи охоплює: {sectors}.",
    ru: "Образовательное предложение этой школы охватывает: {sectors}.",
    be: "Адукацыйная прапанова гэтай школы ахоплівае: {sectors}."
  };
  return interpolate(templates[state.lang] || templates.uk, { sectors: sectors || displayBranch(school.public_city_area || school.city || "Wrocław") });
}

function translateCsv(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => displayBranch(item) !== item ? displayBranch(item) : displayProfile(item))
    .join(", ");
}

function typeLabel(type) {
  return t(typeLabelKeys[type] || type);
}

function pluralForm(count) {
  if (state.lang === "en") return count === 1 ? "one" : "many";
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (count === 1) return "one";
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return "few";
  return "many";
}

function countText(kind, count) {
  const forms = {
    pl: {
      entry: { one: "pozycja", few: "pozycje", many: "pozycji" },
      school: { one: "szkoła", few: "szkoły", many: "szkół" },
      shortSchool: { one: "szk.", few: "szk.", many: "szk." },
      profile: { one: "profil", few: "profile", many: "profili" },
      schoolBcu: { one: "szkoła/BCU", few: "szkoły/BCU", many: "szkół/BCU" },
      positionShort: { one: "poz.", few: "poz.", many: "poz." },
      filter: { one: "aktywny filtr", few: "aktywne filtry", many: "aktywnych filtrów" }
    },
    en: {
      entry: { one: "entry", many: "entries" },
      school: { one: "school", many: "schools" },
      shortSchool: { one: "sch.", many: "sch." },
      profile: { one: "profile", many: "profiles" },
      schoolBcu: { one: "school/SSC", many: "schools/SSCs" },
      positionShort: { one: "entry", many: "entries" },
      filter: { one: "active filter", many: "active filters" }
    },
    uk: {
      entry: { one: "позиція", few: "позиції", many: "позицій" },
      school: { one: "школа", few: "школи", many: "шкіл" },
      shortSchool: { one: "шк.", few: "шк.", many: "шк." },
      profile: { one: "профіль", few: "профілі", many: "профілів" },
      schoolBcu: { one: "школа/ГЦВ", few: "школи/ГЦВ", many: "шкіл/ГЦВ" },
      positionShort: { one: "поз.", few: "поз.", many: "поз." },
      filter: { one: "активний фільтр", few: "активні фільтри", many: "активних фільтрів" }
    },
    ru: {
      entry: { one: "позиция", few: "позиции", many: "позиций" },
      school: { one: "школа", few: "школы", many: "школ" },
      shortSchool: { one: "шк.", few: "шк.", many: "шк." },
      profile: { one: "профиль", few: "профиля", many: "профилей" },
      schoolBcu: { one: "школа/ОЦН", few: "школы/ОЦН", many: "школ/ОЦН" },
      positionShort: { one: "поз.", few: "поз.", many: "поз." },
      filter: { one: "активный фильтр", few: "активных фильтра", many: "активных фильтров" }
    },
    be: {
      entry: { one: "пазіцыя", few: "пазіцыі", many: "пазіцый" },
      school: { one: "школа", few: "школы", many: "школ" },
      shortSchool: { one: "шк.", few: "шк.", many: "шк." },
      profile: { one: "профіль", few: "профілі", many: "профіляў" },
      schoolBcu: { one: "школа/ГЦУ", few: "школы/ГЦУ", many: "школ/ГЦУ" },
      positionShort: { one: "паз.", few: "паз.", many: "паз." },
      filter: { one: "актыўны фільтр", few: "актыўныя фільтры", many: "актыўных фільтраў" }
    }
  };
  const langForms = forms[state.lang] || forms.pl;
  const kindForms = langForms[kind] || forms.pl[kind];
  return `${count} ${kindForms[pluralForm(count)] || kindForms.many}`;
}

function schoolTypeLabel(label) {
  if (state.lang === "pl" || !label) return label;
  const number = label.match(/nr\s+(\d+)/i)?.[1];
  if (/^Technikum/i.test(label)) {
    const base = {
      en: "Technical Secondary School",
      uk: "Технікум",
      ru: "Техникум",
      be: "Тэхнікум"
    }[state.lang];
    return number ? `${base} No. ${number}` : base;
  }
  if (/Branżowa Szkoła I stopnia/i.test(label)) {
    const base = {
      en: "Stage I Sectoral Vocational School",
      uk: "Галузева школа I ступеня",
      ru: "Отраслевая школа I ступени",
      be: "Галіновая школа I ступені"
    }[state.lang];
    return number ? `${base} No. ${number}` : base;
  }
  if (/Branżowa Szkoła II stopnia/i.test(label)) {
    return {
      en: "Stage II Sectoral Vocational School",
      uk: "Галузева школа II ступеня",
      ru: "Отраслевая школа II ступени",
      be: "Галіновая школа II ступені"
    }[state.lang];
  }
  if (/Branżowe Centrum Umiejętności/i.test(label)) {
    return {
      en: "Sectoral Skills Centre",
      uk: "Галузевий центр вмінь",
      ru: "Отраслевой центр навыков",
      be: "Галіновы цэнтр уменняў"
    }[state.lang];
  }
  if (/Centrum kształcenia sektorowego/i.test(label)) {
    return {
      en: "Sector Training Centre",
      uk: "Центр секторного навчання",
      ru: "Центр секторного обучения",
      be: "Цэнтр сектарнага навучання"
    }[state.lang];
  }
  return label;
}

function allTermTranslations(group, value) {
  const dictionaries = group === "branch" ? BRANCH_LABELS : PROFILE_LABELS;
  return Object.keys(LANGUAGES).map((lang) => dictionaries[lang]?.[value]).filter(Boolean);
}

function searchableProgramText(program) {
  return [
    program.program_name,
    displayProfile(program.program_name),
    ...allTermTranslations("profile", program.program_name),
    program.school_name,
    program.branch,
    displayBranch(program.branch),
    ...allTermTranslations("branch", program.branch),
    program.school_type_label,
    schoolTypeLabel(program.school_type_label),
    typeLabel(program.education_type)
  ].join(" ");
}

function setSelectOptions(select, values, label, displayFn = (value) => value) {
  select.innerHTML = "";
  const first = document.createElement("option");
  first.value = "";
  first.textContent = label;
  select.append(first);

  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = displayFn(value);
    select.append(option);
  });
}

function loadFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get("lang");
  state.lang = LANGUAGES[urlLang] ? urlLang : localStorage.getItem("sectorMapLang") || "pl";
  if (!LANGUAGES[state.lang]) state.lang = "pl";
  state.q = params.get("q") || "";
  state.educationType = params.get("educationType") || "";
  state.branch = params.get("branch") || "";
  state.school = params.get("school") || "";
  state.previewBranchActive = false;
  state.showAll = false;

  if (els.language) els.language.value = state.lang;
  els.q.value = state.q;
  els.educationType.value = state.educationType;
  els.branch.value = state.branch;
  els.school.value = state.school;
  state.openBranch = state.branch || state.data.branch_map[0]?.name || "";

  if (!state.branch && state.q) {
    const matchedProgram = state.data.programs.find((program) => {
      return matches(searchableProgramText(program), state.q);
    });
    if (matchedProgram?.branch) state.openBranch = matchedProgram.branch;
  }
}

function syncUrl() {
  const params = new URLSearchParams();
  if (state.lang !== "pl") params.set("lang", state.lang);
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
  if (!includeDefaultBranch) return "";
  return state.previewBranchActive || !hasExplicitFilter ? state.openBranch : "";
}

function programsForFilters({ includeDefaultBranch = true, includeBranch = true } = {}) {
  const branchFilter = includeBranch ? effectiveBranchFilter({ includeDefaultBranch }) : "";
  return state.data.programs.filter((program) => {
    const text = !state.q || matches(searchableProgramText(program), state.q);

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
    els.quickProfiles.innerHTML = `<span class="muted">${escapeHtml(t("noQuickChoices"))}</span>`;
    return;
  }

  profiles.forEach((profile) => {
    const profileLabel = displayProfile(profile.name);
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `${escapeHtml(profileLabel)} <span>${profile.count}</span>`;
    button.addEventListener("click", () => {
      state.q = profileLabel;
      const match = findProfileBranch(profile.name);
      if (match) {
        state.openBranch = match.branch.name;
        state.previewBranchActive = true;
        state.branch = "";
        els.branch.value = "";
      }
      state.showAll = false;
      els.q.value = profileLabel;
      render();
      document.querySelector("#branze")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
  state.q = displayProfile(profile.name);
  state.branch = branchName;
  state.school = "";
  state.educationType = "";
  state.openBranch = branchName;
  state.showAll = false;
  els.q.value = displayProfile(profile.name);
  els.branch.value = branchName;
  els.school.value = "";
  els.educationType.value = "";
  render();
  document.querySelector("#branze")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderBranchMap(branches) {
  if (branches.length === 0) {
    els.branchCount.textContent = "0";
    els.profileCount.textContent = countText("profile", 0);
    els.currentPath.textContent = t("noBranchesCurrent");
    els.branchAccordion.innerHTML = `<div class="panel-empty">${escapeHtml(t("noBranchesSet"))}</div>`;
    els.branchDetail.innerHTML = `<div class="panel-empty">${escapeHtml(t("changeFilters"))}</div>`;
    return;
  }

  const selected = branches.find((branch) => branch.name === state.openBranch) || branches[0];
  state.openBranch = selected.name;
  const selectedSchoolsCount = unique(selected.profiles.flatMap((profile) => profile.schools)).length;
  els.branchCount.textContent = String(branches.length);
  els.profileCount.textContent = countText("profile", selected.profiles.length);
  if (state.q && !state.branch) {
    els.currentPath.textContent = t("searchContext", { q: state.q, branch: displayBranch(selected.name) });
  } else if (state.school && !state.branch) {
    els.currentPath.textContent = t("schoolContext", { school: state.school, branch: displayBranch(selected.name) });
  } else if (state.educationType && !state.branch) {
    els.currentPath.textContent = t("typeContext", { type: typeLabel(state.educationType) });
  } else {
    const contextTemplates = {
      pl: "Jesteś w: {branch}. {profiles}, {schools} lub BCU.",
      en: "You are in: {branch}. {profiles}, {schools} or Sectoral Skills Centres.",
      uk: "Ви в галузі: {branch}. {profiles}, {schools} або Галузеві центри вмінь.",
      ru: "Вы в отрасли: {branch}. {profiles}, {schools} или Отраслевые центры навыков.",
      be: "Вы ў галіне: {branch}. {profiles}, {schools} або Галіновыя цэнтры ўменняў."
    };
    els.currentPath.textContent = interpolate(contextTemplates[state.lang] || contextTemplates.pl, {
      branch: displayBranch(selected.name),
      profiles: countText("profile", selected.profiles.length),
      schools: countText("school", selectedSchoolsCount)
    });
  }

  els.branchAccordion.innerHTML = branches
    .map((branch) => {
      const schoolsCount = unique(branch.profiles.flatMap((profile) => profile.schools)).length;
      const isOpen = branch.name === state.openBranch;

      return `
        <article class="branch-item${isOpen ? " is-open" : ""}" data-branch-name="${escapeAttribute(branch.name)}">
          <button class="branch-toggle" type="button" aria-pressed="${isOpen}">
            <span class="branch-copy">
              <strong>${escapeHtml(displayBranch(branch.name))}</strong>
            </span>
            <span class="branch-metrics" aria-label="${escapeAttribute(`${countText("profile", branch.profiles.length)}, ${countText("school", schoolsCount)}`)}">
              <span>${escapeHtml(countText("profile", branch.profiles.length))}</span>
              <span>${escapeHtml(countText("school", schoolsCount))}</span>
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
        <h3>${escapeHtml(displayBranch(selected.name))}</h3>
        <p>${escapeHtml(displayBranchDescription(selected))}</p>
      </div>
      <div class="branch-summary">
        <span class="tag">${escapeHtml(countText("profile", selected.profiles.length))}</span>
        <span class="tag amber">${escapeHtml(countText("schoolBcu", selectedSchoolsCount))}</span>
      </div>
    </div>
    <div class="profile-list">
      ${selected.profiles
        .map((profile) => `
          <article class="profile-card" data-profile-name="${escapeAttribute(profile.name)}">
            <div class="profile-card-main">
              <h3>${escapeHtml(displayProfile(profile.name))}</h3>
              <div class="profile-types">
                ${(profile.types || [])
                  .map((type) => `<span class="tag">${escapeHtml(typeLabel(type) || type)}</span>`)
                  .join("")}
              </div>
              <p>${escapeHtml(displayProfileDescription(profile, selected.name))}</p>
            </div>
            <div class="profile-offers">
              ${(profile.offerings || [])
                .map((offering) => `
                  <div class="offer-row">
                    <span>${escapeHtml(offering.school_name)}</span>
                    <small>${escapeHtml(typeLabel(offering.education_type) || offering.education_type)}${offering.school_type_label ? `, ${escapeHtml(schoolTypeLabel(offering.school_type_label))}` : ""}</small>
                  </div>
                `)
                .join("")}
            </div>
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
      state.branch = "";
      state.q = "";
      state.previewBranchActive = true;
      state.showAll = false;
      els.branch.value = "";
      els.q.value = "";
      render();
    });
  });
}

function renderAreas(programs) {
  if (!els.areaList) return;
  const schoolsInResults = unique(programs.map((program) => program.school_name));
  const visibleSchools = state.data.institutions.filter((school) => schoolsInResults.includes(school.name));
  const areas = countBy(visibleSchools, (school) => school.public_city_area || school.city || "Wrocław");

  els.areaList.innerHTML = "";
  areas.forEach((area) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "area-button";
    button.innerHTML = `<span>${escapeHtml(area.name)}</span><small>${escapeHtml(countText("shortSchool", area.count))}</small>`;
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
    els.areaList.innerHTML = `<p class="muted">${escapeHtml(t("noAreas"))}</p>`;
  }
}

function renderCards(programs) {
  if (!els.cards || !els.empty) return;
  els.cards.innerHTML = "";
  els.empty.hidden = programs.length > 0;

  programs.forEach((program) => {
    const card = document.createElement("article");
    card.className = "program-card";
    card.innerHTML = `
      <div class="program-meta">
        <span class="tag">${escapeHtml(typeLabel(program.education_type) || program.education_type)}</span>
        ${program.branch ? `<span class="tag amber">${escapeHtml(displayBranch(program.branch))}</span>` : ""}
      </div>
      <h3>${escapeHtml(displayProfile(program.program_name))}</h3>
      <p><strong>${escapeHtml(program.school_name)}</strong></p>
      ${profileDetail(program.program_name, program.branch)?.description ? `<p>${escapeHtml(displayProfileDescription(profileDetail(program.program_name, program.branch), program.branch))}</p>` : ""}
      ${program.school_type_label ? `<p>${escapeHtml(schoolTypeLabel(program.school_type_label))}</p>` : ""}
      <p>${escapeHtml(t("verification"))}: ${dateLabel(program.verified_at)}</p>
      ${program.source_url ? `<a href="${escapeAttribute(program.source_url)}" target="_blank" rel="noreferrer">${escapeHtml(t("openSource"))}</a>` : ""}
    `;
    els.cards.append(card);
  });
}

function renderSchools(programs) {
  if (!els.schools) return;
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
        <span class="tag amber">${escapeHtml(countText("positionShort", schoolPrograms.length))}</span>
      </div>
      <h3>${escapeHtml(school.name)}</h3>
      <p>${escapeHtml(displaySchoolSummary(school))}</p>
      <p>${schoolPrograms.slice(0, 5).map((program) => escapeHtml(displayProfile(program.program_name))).join(", ")}</p>
      ${school.website ? `<a href="${escapeAttribute(school.website)}" target="_blank" rel="noreferrer">${escapeHtml(t("schoolWebsite"))}</a>` : ""}
    `;
    els.schools.append(card);
  });
}

function renderSources(programs) {
  if (!els.sources) return;
  const sources = new Map();
  programs.forEach((program) => {
    const key = `${program.source_label || t("source")}|${program.source_url || ""}`;
    if (!sources.has(key)) sources.set(key, program);
  });

  els.sources.innerHTML = "";
  [...sources.values()].slice(0, 12).forEach((source) => {
    const card = document.createElement("article");
    card.className = "source-card";
    card.innerHTML = `
      <h3>${escapeHtml(source.source_label || t("source"))}</h3>
      <p>${escapeHtml(t("lastVerification"))}: ${dateLabel(source.verified_at)}</p>
      ${source.source_url ? `<a href="${escapeAttribute(source.source_url)}" target="_blank" rel="noreferrer">${escapeHtml(t("goToSource"))}</a>` : ""}
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

  if (els.summary) {
    els.summary.textContent = `${countText("entry", programs.length)}, ${countText("school", schools.length)}, ${countText("filter", activeFilters)}.`;
  }
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

function setText(selector, key) {
  const element = document.querySelector(selector);
  if (element) element.textContent = t(key);
}

function setHtml(selector, html) {
  const element = document.querySelector(selector);
  if (element) element.innerHTML = html;
}

function setAttr(selector, attribute, key) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute(attribute, t(key));
}

function applyStaticTranslations() {
  document.documentElement.lang = state.lang;
  document.title = t("pageTitle");
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.content = t("pageDescription");

  setAttr(".brand", "aria-label", "brandAria");
  setAttr(".brand-logo", "alt", "brandAlt");
  setAttr(".header-logos", "aria-label", "projectFunding");
  setAttr(".menu-dropdown summary", "aria-label", "openMenu");
  setAttr(".top-actions", "aria-label", "mainLinks");
  setAttr(".branch-browser", "aria-label", "branchList");
  setAttr(".pathway-grid", "aria-label", "pathTitle");
  setAttr(".hero-panel", "aria-label", "pageDescription");
  setAttr(".footer-logos", "aria-label", "footerLogos");

  document.querySelectorAll('a[href*="ec.europa.eu/regional_policy"]').forEach((element) => {
    element.setAttribute("aria-label", t("euFunded"));
    const image = element.querySelector("img");
    if (image) image.alt = t("euFunded");
  });

  setText('.top-actions a[href="./"]', "navMap");
  setText('.top-actions a[href="./branze.html"]', "navBranches");
  setText('.top-actions a[href="./sciezki.html"]', "navPaths");
  setText('.top-actions a[href="./szkoly.html"]', "navSchools");
  setText(".language-label span", "languageLabel");
  setAttr("#languageSelect", "aria-label", "languageLabel");
  setText(".service-label", "serviceLabel");
  setText(".hero-copy h1", "heroTitle");
  setText(".hero-copy .lead", "heroLead");
  setText(".stat:nth-child(1) span", "statSchools");
  setText(".stat:nth-child(2) span", "statPrograms");
  setText(".stat:nth-child(3) span", "statProfiles");
  setText(".stat:nth-child(4) span", "statBranches");
  setText("#path-title", "pathTitle");
  setText(".path-guide-intro p", "pathIntro");
  setText(".path-cta", "pathCta");
  setText(".dual-note strong", "dualStrong");
  setText(".dual-note p", "dualText");
  setText(".pathway-card:nth-child(1) span", "technikumLabel");
  setText(".pathway-card:nth-child(1) h3", "technikumTitle");
  setText(".pathway-card:nth-child(1) p", "technikumText");
  setText(".pathway-card:nth-child(1) a", "technikumLink");
  setText(".pathway-card:nth-child(2) span", "bs1Label");
  setText(".pathway-card:nth-child(2) h3", "bs1Title");
  setText(".pathway-card:nth-child(2) p", "bs1Text");
  setText(".pathway-card:nth-child(2) a", "bs1Link");
  setText(".pathway-card:nth-child(3) span", "bs2Label");
  setText(".pathway-card:nth-child(3) h3", "bs2Title");
  setText(".pathway-card:nth-child(3) p", "bs2Text");
  setText(".pathway-card:nth-child(3) a", "bs2Link");
  setText(".pathway-card:nth-child(4) span", "kkzLabel");
  setText(".pathway-card:nth-child(4) h3", "kkzTitle");
  setText(".pathway-card:nth-child(4) p", "kkzText");
  setText(".pathway-card:nth-child(4) a", "kkzLink");
  setText(".pathway-card:nth-child(5) span", "courseLabel");
  setText(".pathway-card:nth-child(5) h3", "courseTitle");
  setText(".pathway-card:nth-child(5) p", "courseText");
  setText(".pathway-card:nth-child(5) a", "courseLink");
  setHtml(
    ".path-disclaimer",
    `${escapeHtml(t("pathDisclaimerPrefix"))} <a href="https://www.gov.pl/web/edukacja/przygotowanie-zawodowe-mlodocianych-pracownikow-w-formie-nauki-zawodu" target="_blank" rel="noreferrer">${escapeHtml(t("youngWorkers"))}</a>, <a href="https://www.gov.pl/web/edukacja/praktyczna-nauka-zawodu" target="_blank" rel="noreferrer">${escapeHtml(t("practicalTraining"))}</a>, <a href="https://www.gov.pl/web/edukacja/ksztalcenie-w-formach-pozaszkolnych" target="_blank" rel="noreferrer">${escapeHtml(t("outOfSchoolForms"))}</a>.`
  );
  setText("#branch-title", "explorerTitle");
  setText("#currentPath", "currentDefault");
  setText('.filters label:nth-child(1) span', "searchLabel");
  setAttr("#q", "placeholder", "searchPlaceholder");
  setText('.filters label:nth-child(2) span', "pathType");
  setText('#educationType option[value=""]', "all");
  setText('#educationType option[value="technikum"]', "technikumLabel");
  setText('#educationType option[value="bs_i"]', "bs1Label");
  setText('#educationType option[value="bs_ii"]', "bs2Label");
  setText('#educationType option[value="kkz"]', "kkzLabel");
  setText('#educationType option[value="kurs"]', "courseLabel");
  setText('.filters label:nth-child(3) span', "branch");
  setText('.filters label:nth-child(4) span', "school");
  setText(".primary-button", "showResults");
  setText("#clearFilters", "clear");
  setText(".branch-browser .panel-title h3", "branches");
  setText("#profile-title", "profilesInBranch");
  setText("#quick-title", "quickChoice");
}

function populateFilterOptions() {
  const selectedBranch = els.branch.value;
  const selectedSchool = els.school.value;
  setSelectOptions(els.branch, unique(state.data.programs.map((program) => program.branch)), t("allBranches"), displayBranch);
  setSelectOptions(els.school, unique(state.data.programs.map((program) => program.school_name)), t("allSchools"));
  els.branch.value = selectedBranch;
  els.school.value = selectedSchool;
}

async function init() {
  const response = await fetch("data/offer.json");
  if (!response.ok) throw new Error("Cannot load offer data");

  state.data = await response.json();
  loadFromUrl();
  applyStaticTranslations();
  populateFilterOptions();
  els.branch.value = state.branch;
  els.school.value = state.school;
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
  state.previewBranchActive = false;
  state.showAll = !state.q && !state.educationType && !state.branch && !state.school;
  if (state.branch) {
    state.openBranch = state.branch;
  }
  render();
}

[els.educationType, els.branch, els.school].forEach((select) => {
  select.addEventListener("change", applyFiltersFromForm);
});

els.language?.addEventListener("change", () => {
  state.lang = els.language.value;
  localStorage.setItem("sectorMapLang", state.lang);
  applyStaticTranslations();
  populateFilterOptions();
  render();
});

els.clear.addEventListener("click", () => {
  state.q = "";
  state.educationType = "";
  state.branch = "";
  state.school = "";
  state.openBranch = state.data.branch_map[0]?.name || "";
  state.previewBranchActive = false;
  state.showAll = false;
  els.q.value = "";
  els.educationType.value = "";
  els.branch.value = "";
  els.school.value = "";
  render();
});

init().catch((error) => {
  console.error(error);
  els.summary.textContent = t("loadError");
});
