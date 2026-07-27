import {
  BRANCH_DESCRIPTIONS,
  BRANCH_LABELS,
  LANGUAGES,
  PROFILE_LABELS,
  SCHOOL_SUMMARIES_EN,
  UI
} from "./i18n.js";

const state = {
  data: null,
  lang: "pl",
  page: document.body.dataset.page || "branches"
};

const copy = {
  pl: {
    map: "Mapa",
    branchesTitle: "Branże i specjalizacje",
    branchesLead: "Zobacz branże dostępne w mapie Wrocławia, przykładowe zawody oraz szkoły i centra, w których można rozwijać dane kompetencje.",
    branchesIntro: "Ta strona jest do spokojnego czytania: branża po branży, z listą specjalizacji i szkół.",
    pathwaysTitle: "Ścieżki kształcenia",
    pathwaysLead: "Sprawdź, czym różnią się typy kształcenia zawodowego i która ścieżka najlepiej pasuje do wieku, celu i planów dalszej nauki.",
    pathwaysIntro: "Nazwy typów ścieżek odnoszą się do polskiego systemu edukacji. Przed decyzją sprawdź aktualną ofertę szkoły i wymagania rekrutacyjne.",
    schoolsTitle: "Szkoły według adresów",
    schoolsLead: "Przeglądaj szkoły i Branżowe Centra Umiejętności według adresu, dzielnicy, branż i oferowanych zawodów.",
    schoolsIntro: "Szkoły są pogrupowane według obszarów miasta i uporządkowane adresami.",
    profiles: "Specjalizacje i profile",
    schools: "Szkoły",
    schoolCount: "szkoły/BCU",
    showOnMap: "Pokaż na mapie",
    address: "Adres",
    area: "Obszar",
    website: "Strona szkoły",
    sampleProfiles: "Przykładowe profile",
    pathwayFor: "Dla kogo",
    pathwayGives: "Co daje",
    pathwayCheck: "Co sprawdzić",
    officialSources: "Oficjalne źródła",
    sourceText: "Opisy mają charakter orientacyjny. Dla decyzji rekrutacyjnych sprawdzaj aktualne informacje w szkole i oficjalnych źródłach.",
    noData: "Brak danych do wyświetlenia."
  },
  en: {
    map: "Map",
    branchesTitle: "Sectors and specialisations",
    branchesLead: "See the sectors available in the Wroclaw map, sample occupations, and the schools and centres where these competences can be developed.",
    branchesIntro: "This page is for slower reading: sector by sector, with specialisations and schools.",
    pathwaysTitle: "Education pathways",
    pathwaysLead: "Check how vocational education pathways differ and which route best fits age, goals and further learning plans.",
    pathwaysIntro: "The pathway names refer to the Polish education system. Before deciding, check the current school offer and recruitment requirements.",
    schoolsTitle: "Schools by address",
    schoolsLead: "Browse schools and Sectoral Skills Centres by address, city area, sectors and offered occupations.",
    schoolsIntro: "Schools are grouped by city area and ordered by address.",
    profiles: "Specialisations and profiles",
    schools: "Schools",
    schoolCount: "schools/SSCs",
    showOnMap: "Show on map",
    address: "Address",
    area: "Area",
    website: "School website",
    sampleProfiles: "Sample profiles",
    pathwayFor: "Who it is for",
    pathwayGives: "What it gives",
    pathwayCheck: "What to check",
    officialSources: "Official sources",
    sourceText: "Descriptions are for orientation. For recruitment decisions, check current information with the school and official sources.",
    noData: "No data to display."
  },
  uk: {
    map: "Карта",
    branchesTitle: "Галузі та спеціалізації",
    branchesLead: "Перегляньте галузі з карти Вроцлава, приклади професій, школи і центри, де можна розвивати ці компетентності.",
    branchesIntro: "Ця сторінка призначена для спокійного читання: галузь за галуззю, зі спеціалізаціями і школами.",
    pathwaysTitle: "Освітні шляхи",
    pathwaysLead: "Перевірте, чим відрізняються шляхи професійної освіти і який варіант пасує до віку, мети та подальшого навчання.",
    pathwaysIntro: "Назви шляхів стосуються польської системи освіти. Перед рішенням перевірте актуальну пропозицію школи та умови набору.",
    schoolsTitle: "Школи за адресами",
    schoolsLead: "Переглядайте школи і Галузеві центри вмінь за адресою, районом, галузями і професіями.",
    schoolsIntro: "Школи згруповано за районами міста й упорядковано за адресами.",
    profiles: "Спеціалізації і профілі",
    schools: "Школи",
    schoolCount: "шкіл/ГЦВ",
    showOnMap: "Показати на карті",
    address: "Адреса",
    area: "Район",
    website: "Сайт школи",
    sampleProfiles: "Приклади профілів",
    pathwayFor: "Для кого",
    pathwayGives: "Що дає",
    pathwayCheck: "Що перевірити",
    officialSources: "Офіційні джерела",
    sourceText: "Описи мають орієнтовний характер. Для рішень щодо вступу перевіряйте актуальну інформацію у школі та офіційних джерелах.",
    noData: "Немає даних для відображення."
  },
  ru: {
    map: "Карта",
    branchesTitle: "Отрасли и специализации",
    branchesLead: "Посмотрите отрасли на карте Вроцлава, примеры профессий, школы и центры, где можно развивать эти компетенции.",
    branchesIntro: "Эта страница предназначена для спокойного чтения: отрасль за отраслью, со специализациями и школами.",
    pathwaysTitle: "Образовательные маршруты",
    pathwaysLead: "Проверьте, чем отличаются маршруты профессионального образования и какой вариант подходит по возрасту, цели и дальнейшему обучению.",
    pathwaysIntro: "Названия маршрутов относятся к польской системе образования. Перед решением проверьте актуальное предложение школы и условия набора.",
    schoolsTitle: "Школы по адресам",
    schoolsLead: "Просматривайте школы и Отраслевые центры навыков по адресу, району, отраслям и профессиям.",
    schoolsIntro: "Школы сгруппированы по районам города и упорядочены по адресам.",
    profiles: "Специализации и профили",
    schools: "Школы",
    schoolCount: "школ/ОЦН",
    showOnMap: "Показать на карте",
    address: "Адрес",
    area: "Район",
    website: "Сайт школы",
    sampleProfiles: "Примеры профилей",
    pathwayFor: "Для кого",
    pathwayGives: "Что дает",
    pathwayCheck: "Что проверить",
    officialSources: "Официальные источники",
    sourceText: "Описания носят ориентировочный характер. Для решений о наборе проверяйте актуальную информацию в школе и официальных источниках.",
    noData: "Нет данных для отображения."
  },
  be: {
    map: "Карта",
    branchesTitle: "Галіны і спецыялізацыі",
    branchesLead: "Паглядзіце галіны на карце Уроцлава, прыклады прафесій, школы і цэнтры, дзе можна развіваць гэтыя кампетэнцыі.",
    branchesIntro: "Гэтая старонка прызначана для спакойнага чытання: галіна за галіной, са спецыялізацыямі і школамі.",
    pathwaysTitle: "Адукацыйныя шляхі",
    pathwaysLead: "Праверце, чым адрозніваюцца шляхі прафесійнай адукацыі і які варыянт пасуе да ўзросту, мэты і далейшага навучання.",
    pathwaysIntro: "Назвы шляхоў адносяцца да польскай сістэмы адукацыі. Перад рашэннем праверце актуальную прапанову школы і ўмовы набору.",
    schoolsTitle: "Школы па адрасах",
    schoolsLead: "Праглядайце школы і Галіновыя цэнтры ўменняў па адрасе, раёне, галінах і прафесіях.",
    schoolsIntro: "Школы згрупаваныя па раёнах горада і ўпарадкаваныя па адрасах.",
    profiles: "Спецыялізацыі і профілі",
    schools: "Школы",
    schoolCount: "школ/ГЦУ",
    showOnMap: "Паказаць на карце",
    address: "Адрас",
    area: "Раён",
    website: "Сайт школы",
    sampleProfiles: "Прыклады профіляў",
    pathwayFor: "Для каго",
    pathwayGives: "Што дае",
    pathwayCheck: "Што праверыць",
    officialSources: "Афіцыйныя крыніцы",
    sourceText: "Апісанні маюць арыенціровачны характар. Для рашэнняў аб наборы правярайце актуальную інфармацыю ў школе і афіцыйных крыніцах.",
    noData: "Няма даных для адлюстравання."
  }
};

const pathwaySources = {
  technikum: "https://www.gov.pl/web/edukacja/ksztalcenie-w-zawodach-szkolnictwa-branzowego",
  bs_i: "https://www.gov.pl/web/edukacja/przygotowanie-zawodowe-mlodocianych-pracownikow-w-formie-nauki-zawodu",
  bs_ii: "https://www.gov.pl/web/edukacja/ksztalcenie-w-zawodach-szkolnictwa-branzowego",
  kkz: "https://www.gov.pl/web/edukacja/ksztalcenie-w-formach-pozaszkolnych",
  kurs: "https://www.gov.pl/web/edukacja/branzowe-centra-umiejetnosci"
};

const pathwayDetails = {
  pl: {
    technikum: ["Dla osób po podstawówce, które chcą łączyć przedmioty ogólne z zawodem i drogą do matury.", "5-letnia szkoła, przygotowanie do egzaminu zawodowego, praktyk i matury.", "Zawód, kwalifikacje, praktyki, przedmioty rozszerzone i dojazd."],
    bs_i: ["Dla osób, które chcą szybciej wejść do zawodu i uczyć się praktycznie.", "3-letnia szkoła branżowa; w modelu dualnym część nauki odbywa się u pracodawcy.", "Zasady praktycznej nauki zawodu, umowę z pracodawcą i dostępne miejsca."],
    bs_ii: ["Dla absolwentów BS I w zawodach z kontynuacją kwalifikacji.", "Możliwość uzyskania wykształcenia średniego branżowego i podejścia do matury.", "Czy zawód z BS I ma kontynuację i jakie kwalifikacje są wymagane."],
    kkz: ["Dla osób, które chcą zdobyć konkretną kwalifikację bez wybierania całej szkoły.", "Przygotowanie do jednej kwalifikacji i egzaminu zawodowego.", "Wymagania wejściowe, harmonogram, praktykę i organizatora kursu."],
    kurs: ["Dla uczniów, dorosłych lub pracowników, którzy chcą uzupełnić kompetencje.", "Rozwój wybranych umiejętności, często w powiązaniu z konkretną dziedziną BCU.", "Czy kurs daje kwalifikację, certyfikat, zaświadczenie czy tylko rozwój kompetencji."]
  },
  en: {
    technikum: ["For learners after primary education who want general subjects, an occupation and a route to the maturity exam.", "A 5-year school preparing for a vocational exam, placements and the maturity exam.", "Occupation, qualifications, placements, extended subjects and travel."],
    bs_i: ["For learners who want a faster route into work and a strong practical component.", "A 3-year sectoral school; in the dual model, part of learning takes place with an employer.", "Practical training rules, employer agreement and available places."],
    bs_ii: ["For Stage I graduates in occupations where qualifications can continue.", "A route to sectoral secondary education and the maturity exam.", "Whether the Stage I occupation has a continuation path and required qualifications."],
    kkz: ["For people who want a specific vocational qualification without a full school pathway.", "Preparation for one qualification and a vocational exam.", "Entry requirements, schedule, practical component and course provider."],
    kurs: ["For students, adults or employees who want to add competences.", "Development of selected skills, often linked to a specific Sectoral Skills Centre field.", "Whether the course gives a qualification, certificate, confirmation or only competence development."]
  }
};

pathwayDetails.uk = {
  technikum: ["Для учнів після початкової освіти, які хочуть поєднати загальні предмети, професію і шлях до матури.", "5-річна школа, підготовка до професійного іспиту, практики і матури.", "Професію, кваліфікації, практику, розширені предмети і доїзд."],
  bs_i: ["Для учнів, які хочуть швидше увійти в професію і вчитися практично.", "3-річна галузева школа; у дуальній моделі частина навчання проходить у роботодавця.", "Правила практичного навчання, договір з роботодавцем і доступні місця."],
  bs_ii: ["Для випускників галузевої школи I ступеня у професіях з продовженням кваліфікацій.", "Можливість отримати середню галузеву освіту і складати матуру.", "Чи професія з I ступеня має продовження і які кваліфікації потрібні."],
  kkz: ["Для людей, які хочуть здобути конкретну кваліфікацію без вибору повної школи.", "Підготовка до однієї кваліфікації та професійного іспиту.", "Вступні вимоги, графік, практику і організатора курсу."],
  kurs: ["Для учнів, дорослих або працівників, які хочуть доповнити компетентності.", "Розвиток вибраних навичок, часто пов'язаний з конкретним напрямом Галузевого центру вмінь.", "Чи курс дає кваліфікацію, сертифікат, довідку чи лише розвиток компетентностей."]
};

pathwayDetails.ru = {
  technikum: ["Для учеников после начального образования, которые хотят сочетать общие предметы, профессию и путь к матурe.", "5-летняя школа, подготовка к профессиональному экзамену, практике и матурe.", "Профессию, квалификации, практику, расширенные предметы и дорогу."],
  bs_i: ["Для учеников, которые хотят быстрее войти в профессию и учиться практически.", "3-летняя отраслевая школа; в дуальной модели часть обучения проходит у работодателя.", "Правила практического обучения, договор с работодателем и доступные места."],
  bs_ii: ["Для выпускников отраслевой школы I ступени в профессиях с продолжением квалификаций.", "Возможность получить среднее отраслевое образование и сдавать матуру.", "Есть ли продолжение для профессии I ступени и какие квалификации нужны."],
  kkz: ["Для людей, которые хотят получить конкретную квалификацию без выбора полной школы.", "Подготовка к одной квалификации и профессиональному экзамену.", "Входные требования, расписание, практику и организатора курса."],
  kurs: ["Для учеников, взрослых или работников, которые хотят дополнить компетенции.", "Развитие выбранных навыков, часто связанное с конкретной областью Отраслевого центра навыков.", "Дает ли курс квалификацию, сертификат, справку или только развитие компетенций."]
};

pathwayDetails.be = {
  technikum: ["Для вучняў пасля пачатковай адукацыі, якія хочуць спалучыць агульныя прадметы, прафесію і шлях да матуры.", "5-гадовая школа, падрыхтоўка да прафесійнага экзамену, практыкі і матуры.", "Прафесію, кваліфікацыі, практыку, пашыраныя прадметы і даезд."],
  bs_i: ["Для вучняў, якія хочуць хутчэй увайсці ў прафесію і вучыцца практычна.", "3-гадовая галіновая школа; у дуальнай мадэлі частка навучання адбываецца ў працадаўцы.", "Правілы практычнага навучання, дамову з працадаўцам і даступныя месцы."],
  bs_ii: ["Для выпускнікоў галіновай школы I ступені ў прафесіях з працягам кваліфікацый.", "Магчымасць атрымаць сярэднюю галіновую адукацыю і здаваць матуру.", "Ці мае прафесія з I ступені працяг і якія кваліфікацыі патрэбныя."],
  kkz: ["Для людзей, якія хочуць атрымаць канкрэтную кваліфікацыю без выбару поўнай школы.", "Падрыхтоўка да адной кваліфікацыі і прафесійнага экзамену.", "Уваходныя патрабаванні, расклад, практыку і арганізатара курса."],
  kurs: ["Для вучняў, дарослых або работнікаў, якія хочуць дапоўніць кампетэнцыі.", "Развіццё выбраных навыкаў, часта звязанае з канкрэтным кірункам Галіновага цэнтра ўменняў.", "Ці дае курс кваліфікацыю, сертыфікат, даведку або толькі развіццё кампетэнцый."]
};

function c(key) {
  return copy[state.lang]?.[key] || copy.pl[key] || key;
}

function u(key) {
  return UI[state.lang]?.[key] || UI.pl[key] || key;
}

function branchName(value) {
  return state.lang === "pl" ? value : BRANCH_LABELS[state.lang]?.[value] || value;
}

function branchDescription(branch) {
  return state.lang === "pl" ? branch.description : BRANCH_DESCRIPTIONS[state.lang]?.[branch.name] || branch.description;
}

function profileName(value) {
  return state.lang === "pl" ? value : PROFILE_LABELS[state.lang]?.[value] || value;
}

function profileDescription(profile, branch) {
  if (state.lang === "pl") return profile.description;
  return `${profileName(profile.name)} - ${branchName(branch)}.`;
}

function schoolSummary(school) {
  if (state.lang === "pl") return school.public_summary || c("noData");
  if (state.lang === "en") return SCHOOL_SUMMARIES_EN[school.public_summary] || school.public_summary || c("noData");
  const sectors = String(school.public_tags || school.sectors || "")
    .split(",")
    .map((item) => branchName(item.trim()))
    .filter(Boolean)
    .join(", ");
  return sectors ? `${c("sampleProfiles")}: ${sectors}.` : school.public_summary || c("noData");
}

function schoolType(label) {
  if (state.lang === "pl" || !label) return label;
  if (/technikum/i.test(label)) return u("technikumLabel");
  if (/branżowa szkoła i stopnia/i.test(label)) return u("bs1Label");
  if (/branżowa szkoła ii stopnia/i.test(label)) return u("bs2Label");
  if (/branżowe centrum umiejętności/i.test(label)) return state.lang === "en" ? "Sectoral Skills Centre" : u("courseTitle");
  return label;
}

function pathwayKey(type, suffix) {
  const prefix = type === "bs_i" ? "bs1" : type === "bs_ii" ? "bs2" : type === "kurs" ? "course" : type;
  return `${prefix}${suffix}`;
}

function mapUrl(params = {}) {
  const search = new URLSearchParams();
  if (state.lang !== "pl") search.set("lang", state.lang);
  Object.entries(params).forEach(([key, value]) => {
    if (value) search.set(key, value);
  });
  return `./${search.toString() ? `?${search}` : ""}`;
}

function escapeHtml(value) {
  return String(value || "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function pageTitle() {
  if (state.page === "pathways") return c("pathwaysTitle");
  if (state.page === "schools") return c("schoolsTitle");
  return c("branchesTitle");
}

function pageLead() {
  if (state.page === "pathways") return c("pathwaysLead");
  if (state.page === "schools") return c("schoolsLead");
  return c("branchesLead");
}

function pageIntro() {
  if (state.page === "pathways") return c("pathwaysIntro");
  if (state.page === "schools") return c("schoolsIntro");
  return c("branchesIntro");
}

function applyShell() {
  document.documentElement.lang = state.lang;
  document.title = `${pageTitle()} - ${u("pageTitle")}`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = pageLead();
  setText('.top-actions a[href="./"]', u("navMap"));
  setText('.top-actions a[href="./branze.html"]', u("navBranches"));
  setText('.top-actions a[href="./sciezki.html"]', u("navPaths"));
  setText('.top-actions a[href="./szkoly.html"]', u("navSchools"));
  setText(".language-label span", u("languageLabel"));
  const select = document.querySelector("#languageSelect");
  if (select) {
    select.value = state.lang;
    select.setAttribute("aria-label", u("languageLabel"));
  }
  document.querySelector(".brand")?.setAttribute("aria-label", u("brandAria"));
  const logo = document.querySelector(".brand-logo");
  if (logo) logo.alt = u("brandAlt");
  setText("#page-title", pageTitle());
  setText("#page-lead", pageLead());
  setText("#page-intro", pageIntro());
}

function renderBranches() {
  const target = document.querySelector("#page-content");
  target.innerHTML = state.data.branch_map.map((branch) => {
    const schools = new Set(branch.profiles.flatMap((profile) => profile.schools || []));
    return `
      <article class="info-card branch-info-card">
        <div class="info-card-heading">
          <div>
            <h2>${escapeHtml(branchName(branch.name))}</h2>
            <p>${escapeHtml(branchDescription(branch))}</p>
          </div>
          <a href="${escapeHtml(mapUrl({ branch: branch.name }))}">${escapeHtml(c("showOnMap"))}</a>
        </div>
        <div class="info-metrics">
          <span>${branch.profiles.length} ${escapeHtml(c("profiles").toLowerCase())}</span>
          <span>${schools.size} ${escapeHtml(c("schoolCount"))}</span>
        </div>
        <div class="specialisation-list">
          ${branch.profiles.map((profile) => `
            <section>
              <h3>${escapeHtml(profileName(profile.name))}</h3>
              <p>${escapeHtml(profileDescription(profile, branch.name))}</p>
              <small>${escapeHtml((profile.schools || []).join(", "))}</small>
            </section>
          `).join("")}
        </div>
      </article>
    `;
  }).join("");
}

function renderPathways() {
  const target = document.querySelector("#page-content");
  const order = ["technikum", "bs_i", "bs_ii", "kkz", "kurs"];
  target.innerHTML = `
    <div class="pathway-detail-grid">
      ${order.map((type) => {
        const details = (pathwayDetails[state.lang] || pathwayDetails.en)[type];
        return `
          <article class="info-card pathway-detail-card">
            <span class="tag">${escapeHtml(u(pathwayKey(type, "Label")))}</span>
            <h2>${escapeHtml(u(pathwayKey(type, "Title")))}</h2>
            <dl>
              <dt>${escapeHtml(c("pathwayFor"))}</dt><dd>${escapeHtml(details[0])}</dd>
              <dt>${escapeHtml(c("pathwayGives"))}</dt><dd>${escapeHtml(details[1])}</dd>
              <dt>${escapeHtml(c("pathwayCheck"))}</dt><dd>${escapeHtml(details[2])}</dd>
            </dl>
            <a href="${escapeHtml(mapUrl({ educationType: type }))}">${escapeHtml(c("showOnMap"))}</a>
          </article>
        `;
      }).join("")}
    </div>
    <section class="source-note">
      <h2>${escapeHtml(c("officialSources"))}</h2>
      <p>${escapeHtml(c("sourceText"))}</p>
      <div class="source-links">
        ${order.map((type) => `<a href="${pathwaySources[type]}" target="_blank" rel="noreferrer">${escapeHtml(u(pathwayKey(type, "Label")))}</a>`).join("")}
      </div>
    </section>
  `;
}

function renderSchools() {
  const target = document.querySelector("#page-content");
  const grouped = new Map();
  state.data.institutions
    .slice()
    .sort((a, b) => (a.public_city_area || "").localeCompare(b.public_city_area || "", LANGUAGES[state.lang]?.locale || "pl-PL") || (a.address || "").localeCompare(b.address || "", LANGUAGES[state.lang]?.locale || "pl-PL"))
    .forEach((school) => {
      const area = school.public_city_area || school.city || "Wrocław";
      if (!grouped.has(area)) grouped.set(area, []);
      grouped.get(area).push(school);
    });
  target.innerHTML = [...grouped.entries()].map(([area, schools]) => `
    <section class="school-area-section">
      <h2>${escapeHtml(area)}</h2>
      <div class="school-directory">
        ${schools.map((school) => {
          const programs = state.data.programs.filter((program) => program.school_name === school.name);
          const profiles = [...new Set(programs.map((program) => profileName(program.program_name)))].slice(0, 8);
          return `
            <article class="info-card school-directory-card">
              <div class="school-card-top">
                <span class="tag">${escapeHtml(schoolType(school.type))}</span>
                <a href="${escapeHtml(mapUrl({ school: school.name }))}">${escapeHtml(c("showOnMap"))}</a>
              </div>
              <h3>${escapeHtml(school.name)}</h3>
              <p>${escapeHtml(schoolSummary(school))}</p>
              <dl>
                <dt>${escapeHtml(c("address"))}</dt><dd>${escapeHtml(school.address || "-")}</dd>
                <dt>${escapeHtml(c("area"))}</dt><dd>${escapeHtml(area)}</dd>
                <dt>${escapeHtml(c("sampleProfiles"))}</dt><dd>${escapeHtml(profiles.join(", ") || "-")}</dd>
              </dl>
              ${school.website ? `<a class="text-link" href="${escapeHtml(school.website)}" target="_blank" rel="noreferrer">${escapeHtml(c("website"))}</a>` : ""}
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `).join("");
}

async function init() {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get("lang");
  state.lang = LANGUAGES[urlLang] ? urlLang : localStorage.getItem("sectorMapLang") || "pl";
  if (!LANGUAGES[state.lang]) state.lang = "pl";
  const response = await fetch("data/offer.json");
  if (!response.ok) throw new Error("Cannot load offer data");
  state.data = await response.json();
  applyShell();
  if (state.page === "pathways") renderPathways();
  else if (state.page === "schools") renderSchools();
  else renderBranches();
  document.querySelector("#languageSelect")?.addEventListener("change", (event) => {
    state.lang = event.target.value;
    localStorage.setItem("sectorMapLang", state.lang);
    const params = new URLSearchParams();
    if (state.lang !== "pl") params.set("lang", state.lang);
    window.location.href = `${window.location.pathname}${params.toString() ? `?${params}` : ""}`;
  });
}

init().catch((error) => {
  console.error(error);
  const target = document.querySelector("#page-content");
  if (target) target.innerHTML = `<p class="panel-empty">${escapeHtml(c("noData"))}</p>`;
});
