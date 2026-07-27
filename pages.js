import {
  BRANCH_DESCRIPTIONS,
  BRANCH_LABELS,
  LANGUAGES,
  PROFILE_LABELS,
  SCHOOL_SUMMARIES_EN,
  SCHOOL_SUMMARIES_LOCALIZED,
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
  technikum: "https://eurydice.eacea.ec.europa.eu/eurypedia/poland/organisation-vocational-upper-secondary-education",
  bs_i: "https://eurydice.eacea.ec.europa.eu/eurypedia/poland/organisation-vocational-upper-secondary-education",
  bs_ii: "https://eurydice.eacea.ec.europa.eu/eurypedia/poland/upper-secondary-and-post-secondary-non-tertiary-education",
  kkz: "https://www.gov.pl/web/edukacja/kkz-wazne-informacje",
  kurs: "https://www.gov.pl/web/edukacja/branzowe-centra-umiejetnosci"
};

const pathwayDetails = {
  pl: {
    technikum: ["Dla uczniów po szkole podstawowej, którzy chcą zdobywać zawód technika i jednocześnie zachować pełną drogę do matury. To dobry wybór, gdy uczeń chce mieć więcej czasu na przedmioty ogólne, praktykę zawodową i decyzję, czy po szkole iść do pracy, czy na studia.", "Technikum trwa 5 lat. Po ukończeniu szkoły i zdaniu egzaminów zawodowych z kwalifikacji wyodrębnionych w zawodzie można uzyskać dyplom zawodowy w zawodzie technika. Po zdanej maturze absolwent otrzymuje świadectwo dojrzałości, które otwiera drogę na studia.", "Sprawdź, jakie kwalifikacje składają się na wybrany zawód, kiedy odbywają się praktyki zawodowe, jakie są przedmioty rozszerzone i czy szkoła realnie wspiera przygotowanie do matury oraz egzaminów zawodowych."],
    bs_i: ["Dla uczniów po szkole podstawowej, którzy chcą szybciej wejść do zawodu i uczyć się możliwie praktycznie. Branżowa szkoła I stopnia dobrze pasuje do osób, które wolą konkretny warsztat pracy, pracownię, zakład pracy lub model dualny zamiast dłuższej ścieżki ogólnej.", "Branżowa szkoła I stopnia trwa 3 lata. Po zdaniu egzaminu zawodowego absolwent może uzyskać dyplom zawodowy i kwalifikacje do podjęcia pracy w zawodzie. Może też kontynuować naukę w branżowej szkole II stopnia albo w liceum ogólnokształcącym dla dorosłych.", "Sprawdź, gdzie odbywa się praktyczna nauka zawodu, czy uczeń będzie młodocianym pracownikiem, czy potrzebna jest umowa z pracodawcą, kto organizuje stanowisko pracy i jakie są realne miejsca u pracodawców."],
    bs_ii: ["Dla absolwentów branżowej szkoły I stopnia, którzy chcą kontynuować naukę w zawodzie mającym dalszą kwalifikację. To ścieżka dla osób, które najpierw zdobyły zawód branżowy, a później chcą podnieść poziom wykształcenia i otworzyć sobie drogę do matury.", "Branżowa szkoła II stopnia trwa 2 lata. Po ukończeniu szkoły i zdaniu wymaganych egzaminów zawodowych można uzyskać dyplom zawodowy w zawodzie technika. Absolwent może też przystąpić do matury, a po jej zdaniu uzyskać świadectwo dojrzałości.", "Sprawdź, czy zawód z branżowej szkoły I stopnia ma kontynuację w branżowej szkole II stopnia, która kwalifikacja z pierwszej szkoły jest wymagana i czy wybrana szkoła prowadzi przygotowanie do matury."],
    kkz: ["Dla osób, które chcą zdobyć jedną kwalifikację wyodrębnioną w zawodzie bez zapisywania się do całej szkoły. Kwalifikacyjny kurs zawodowy jest zwykle ścieżką dla dorosłych, osób zmieniających zawód albo uzupełniających brakującą kwalifikację.", "Kwalifikacyjny kurs zawodowy kończy się zaliczeniem i zaświadczeniem o ukończeniu kursu. To zaświadczenie daje prawo przystąpienia do egzaminu zawodowego w danej kwalifikacji. Sama obecność na kursie nie potwierdza kwalifikacji: potwierdzeniem jest certyfikat kwalifikacji zawodowej po zdanym egzaminie.", "Sprawdź pełną nazwę kwalifikacji, liczbę godzin, organizację części praktycznej, czy organizator jest uprawniony do prowadzenia kwalifikacyjnego kursu zawodowego, terminy deklaracji egzaminacyjnej i czy do uzyskania dyplomu zawodowego potrzebne będą jeszcze inne kwalifikacje."],
    kurs: ["Dla uczniów, dorosłych, nauczycieli i pracowników branż, którzy chcą uzupełnić umiejętności, poznać technologię albo przekwalifikować się bez wybierania pełnej szkoły. W tej grupie mieszczą się krótsze kursy, szkolenia branżowe i działania Branżowych Centrów Umiejętności.", "Kurs lub szkolenie może dawać wiedzę, umiejętność, zaświadczenie, certyfikat organizatora albo przygotowanie do dalszego egzaminu. Branżowe Centrum Umiejętności ma przede wszystkim łączyć edukację z branżą, technologiami, pracodawcami i doradztwem zawodowym; nie każdy kurs oznacza automatycznie kwalifikację szkolną.", "Sprawdź, jaki dokument otrzymasz po zakończeniu, czy kurs jest akredytowany lub powiązany z kwalifikacją, kto odpowiada za program, czy jest część praktyczna i czy efekt kursu będzie uznawany przez szkołę, pracodawcę lub komisję egzaminacyjną."]
  },
  en: {
    technikum: ["For learners after primary education who want to work towards a technician occupation while keeping the full route to the maturity exam. It fits learners who need time for general subjects, vocational placements and a later decision between work and higher education.", "Technical secondary school lasts 5 years. After completing school and passing vocational exams for all qualifications separated within the occupation, the graduate can obtain a vocational diploma at technician level. Passing the maturity exam gives a maturity certificate and access to higher education.", "Check which qualifications make up the occupation, when placements happen, which extended subjects are taught, and how the school supports preparation for both the maturity exam and vocational exams."],
    bs_i: ["For learners after primary education who want a faster route into an occupation and a strongly practical learning environment. Stage I sectoral vocational school suits learners who prefer a workshop, workplace, employer placement or dual model over a longer general route.", "Stage I sectoral vocational school lasts 3 years. After passing the vocational exam, the graduate can obtain a vocational diploma and take up work in the occupation. They may continue in a Stage II sectoral vocational school or in a general secondary school for adults.", "Check where practical vocational training takes place, whether the learner will be a young worker, whether an employer agreement is required, who provides the workplace, and how many real employer places are available."],
    bs_ii: ["For graduates of Stage I sectoral vocational school whose occupation has a continuation qualification. It is a route for people who first gained a sectoral occupation and then want to raise their education level and open the maturity exam route.", "Stage II sectoral vocational school lasts 2 years. After completing school and passing the required vocational exams, the graduate can obtain a vocational diploma at technician level. They can also take the maturity exam and, after passing it, obtain a maturity certificate.", "Check whether the Stage I occupation has a Stage II continuation, which previous qualification is required, and whether the chosen school actually prepares learners for the maturity exam."],
    kkz: ["For people who want to gain one qualification separated within an occupation without enrolling in a full school programme. A Vocational Qualification Course is usually a route for adults, career changers or people completing a missing qualification.", "A Vocational Qualification Course ends with a course pass and a certificate of completion. This certificate gives the right to take the vocational exam for the relevant qualification. Participation in the course does not itself confirm the qualification; the formal confirmation is the vocational qualification certificate issued after passing the exam.", "Check the full name of the qualification, number of hours, practical training arrangements, whether the provider is authorised to run the Vocational Qualification Course, exam declaration dates, and whether other qualifications will still be needed for a vocational diploma."],
    kurs: ["For students, adults, teachers and sector employees who want to add skills, learn a technology or reskill without choosing a full school pathway. This group includes shorter courses, sectoral training and activities of Sectoral Skills Centres.", "A course or training may provide knowledge, a skill, a provider certificate or preparation for a later exam. A Sectoral Skills Centre is primarily meant to connect education with the sector, technologies, employers and career guidance; not every course automatically means a formal school qualification.", "Check what document is issued at the end, whether the course is accredited or linked to a qualification, who owns the programme, whether practical work is included, and whether the result will be recognised by a school, employer or examination board."]
  }
};

pathwayDetails.uk = {
  technikum: ["Для учнів після початкової школи, які хочуть здобувати професію техніка і водночас зберегти повний шлях до матури. Це добрий вибір, коли потрібен час на загальні предмети, професійну практику і пізніше рішення між роботою та вищою освітою.", "Технікум триває 5 років. Після закінчення школи і складення професійних іспитів з усіх кваліфікацій, виокремлених у професії, можна отримати професійний диплом на рівні техніка. Складена матура дає свідоцтво зрілості і доступ до вищої освіти.", "Перевірте, з яких кваліфікацій складається професія, коли відбувається практика, які розширені предмети пропонує школа і як вона готує до матури та професійних іспитів."],
  bs_i: ["Для учнів після початкової школи, які хочуть швидше увійти в професію і навчатися практично. Галузева школа I ступеня пасує тим, хто віддає перевагу майстерні, робочому місцю, практиці у роботодавця або дуальній моделі.", "Галузева школа I ступеня триває 3 роки. Після складення професійного іспиту випускник може отримати професійний диплом і почати працювати за професією. Також можна продовжити навчання в галузевій школі II ступеня або в загальноосвітньому ліцеї для дорослих.", "Перевірте, де проходить практичне професійне навчання, чи учень буде молодим працівником, чи потрібен договір з роботодавцем, хто забезпечує робоче місце і скільки реальних місць є у роботодавців."],
  bs_ii: ["Для випускників галузевої школи I ступеня, чия професія має продовження кваліфікації. Це шлях для людей, які спочатку здобули галузеву професію, а потім хочуть підвищити рівень освіти і відкрити шлях до матури.", "Галузева школа II ступеня триває 2 роки. Після закінчення школи і складення потрібних професійних іспитів можна отримати професійний диплом на рівні техніка. Також можна складати матуру і після її складення отримати свідоцтво зрілості.", "Перевірте, чи професія з галузевої школи I ступеня має продовження у школі II ступеня, яка попередня кваліфікація потрібна і чи школа справді готує до матури."],
  kkz: ["Для людей, які хочуть здобути одну кваліфікацію, виокремлену в межах професії, без вступу до повної школи. Кваліфікаційний професійний курс зазвичай обирають дорослі, люди, що змінюють професію, або ті, кому бракує однієї кваліфікації.", "Кваліфікаційний професійний курс завершується заліком і довідкою про завершення курсу. Ця довідка дає право складати професійний іспит з відповідної кваліфікації. Сам курс не підтверджує кваліфікацію; офіційним підтвердженням є сертифікат професійної кваліфікації після складеного іспиту.", "Перевірте повну назву кваліфікації, кількість годин, організацію практичної частини, чи організатор має право проводити кваліфікаційний професійний курс, терміни декларації на іспит і чи для професійного диплома потрібні ще інші кваліфікації."],
  kurs: ["Для учнів, дорослих, учителів і працівників галузей, які хочуть доповнити навички, вивчити технологію або перекваліфікуватися без вибору повної школи. Сюди входять коротші курси, галузеві тренінги і діяльність Галузевих центрів вмінь.", "Курс або тренінг може дати знання, навичку, довідку, сертифікат організатора або підготовку до подальшого іспиту. Галузевий центр вмінь насамперед поєднує освіту з галуззю, технологіями, роботодавцями і професійним консультуванням; не кожен курс автоматично означає формальну шкільну кваліфікацію.", "Перевірте, який документ видається після завершення, чи курс акредитований або пов'язаний з кваліфікацією, хто відповідає за програму, чи є практика і чи результат визнає школа, роботодавець або екзаменаційна комісія."]
};

pathwayDetails.ru = {
  technikum: ["Для учеников после начальной школы, которые хотят получать профессию техника и одновременно сохранить полный путь к матурe. Это хороший выбор, если нужны общеобразовательные предметы, профессиональная практика и более поздний выбор между работой и высшим образованием.", "Техникум длится 5 лет. После окончания школы и сдачи профессиональных экзаменов по всем квалификациям, выделенным в профессии, можно получить профессиональный диплом уровня техника. Сданная матура дает аттестат зрелости и доступ к высшему образованию.", "Проверьте, из каких квалификаций состоит профессия, когда проходит практика, какие расширенные предметы предлагает школа и как она готовит к матурe и профессиональным экзаменам."],
  bs_i: ["Для учеников после начальной школы, которые хотят быстрее войти в профессию и учиться практически. Отраслевая школа I ступени подходит тем, кто предпочитает мастерскую, рабочее место, практику у работодателя или дуальную модель.", "Отраслевая школа I ступени длится 3 года. После сдачи профессионального экзамена выпускник может получить профессиональный диплом и начать работать по профессии. Также можно продолжить обучение в отраслевой школе II ступени или в общеобразовательном лицее для взрослых.", "Проверьте, где проходит практическое профессиональное обучение, будет ли ученик молодым работником, нужен ли договор с работодателем, кто обеспечивает рабочее место и сколько реальных мест есть у работодателей."],
  bs_ii: ["Для выпускников отраслевой школы I ступени, чья профессия имеет продолжение квалификации. Это путь для людей, которые сначала получили отраслевую профессию, а затем хотят повысить уровень образования и открыть путь к матурe.", "Отраслевая школа II ступени длится 2 года. После окончания школы и сдачи необходимых профессиональных экзаменов можно получить профессиональный диплом уровня техника. Также можно сдавать матуру и после ее сдачи получить аттестат зрелости.", "Проверьте, имеет ли профессия из отраслевой школы I ступени продолжение в школе II ступени, какая предыдущая квалификация требуется и действительно ли школа готовит к матурe."],
  kkz: ["Для людей, которые хотят получить одну квалификацию, выделенную в профессии, без поступления в полную школу. Квалификационный профессиональный курс обычно выбирают взрослые, люди, меняющие профессию, или те, кому не хватает одной квалификации.", "Квалификационный профессиональный курс заканчивается зачетом и справкой об окончании курса. Эта справка дает право сдавать профессиональный экзамен по соответствующей квалификации. Сам курс не подтверждает квалификацию; официальное подтверждение дает сертификат профессиональной квалификации после сданного экзамена.", "Проверьте полное название квалификации, количество часов, организацию практической части, имеет ли организатор право проводить квалификационный профессиональный курс, сроки декларации на экзамен и нужны ли для профессионального диплома другие квалификации."],
  kurs: ["Для учеников, взрослых, учителей и работников отраслей, которые хотят дополнить навыки, изучить технологию или переквалифицироваться без выбора полной школы. Сюда входят короткие курсы, отраслевые тренинги и деятельность Отраслевых центров навыков.", "Курс или тренинг может дать знания, навык, справку, сертификат организатора или подготовку к дальнейшему экзамену. Отраслевой центр навыков прежде всего связывает образование с отраслью, технологиями, работодателями и профессиональным консультированием; не каждый курс автоматически означает формальную школьную квалификацию.", "Проверьте, какой документ выдается после завершения, аккредитован ли курс или связан ли он с квалификацией, кто отвечает за программу, есть ли практика и признает ли результат школа, работодатель или экзаменационная комиссия."]
};

pathwayDetails.be = {
  technikum: ["Для вучняў пасля пачатковай школы, якія хочуць атрымаць прафесію тэхніка і адначасова захаваць поўны шлях да матуры. Гэта добры выбар, калі патрэбныя агульныя прадметы, прафесійная практыка і пазнейшае рашэнне паміж працай і вышэйшай адукацыяй.", "Тэхнікум доўжыцца 5 гадоў. Пасля заканчэння школы і здачы прафесійных экзаменаў па ўсіх кваліфікацыях, вылучаных у прафесіі, можна атрымаць прафесійны дыплом узроўню тэхніка. Здадзеная матура дае атэстат сталасці і доступ да вышэйшай адукацыі.", "Праверце, з якіх кваліфікацый складаецца прафесія, калі праходзіць практыка, якія пашыраныя прадметы прапануе школа і як яна рыхтуе да матуры і прафесійных экзаменаў."],
  bs_i: ["Для вучняў пасля пачатковай школы, якія хочуць хутчэй увайсці ў прафесію і вучыцца практычна. Галіновая школа I ступені падыходзіць тым, хто аддае перавагу майстэрні, рабочаму месцу, практыцы ў працадаўцы або дуальнай мадэлі.", "Галіновая школа I ступені доўжыцца 3 гады. Пасля здачы прафесійнага экзамену выпускнік можа атрымаць прафесійны дыплом і пачаць працаваць па прафесіі. Таксама можна працягнуць навучанне ў галіновай школе II ступені або ў агульнаадукацыйным ліцэі для дарослых.", "Праверце, дзе праходзіць практычнае прафесійнае навучанне, ці будзе вучань маладым работнікам, ці патрэбная дамова з працадаўцам, хто забяспечвае рабочае месца і колькі рэальных месцаў ёсць у працадаўцаў."],
  bs_ii: ["Для выпускнікоў галіновай школы I ступені, чыя прафесія мае працяг кваліфікацыі. Гэта шлях для людзей, якія спачатку атрымалі галіновую прафесію, а потым хочуць павысіць узровень адукацыі і адкрыць шлях да матуры.", "Галіновая школа II ступені доўжыцца 2 гады. Пасля заканчэння школы і здачы патрэбных прафесійных экзаменаў можна атрымаць прафесійны дыплом узроўню тэхніка. Таксама можна здаваць матуру і пасля яе здачы атрымаць атэстат сталасці.", "Праверце, ці мае прафесія з галіновай школы I ступені працяг у школе II ступені, якая папярэдняя кваліфікацыя патрэбная і ці школа сапраўды рыхтуе да матуры."],
  kkz: ["Для людзей, якія хочуць атрымаць адну кваліфікацыю, вылучаную ў прафесіі, без паступлення ў поўную школу. Кваліфікацыйны прафесійны курс звычайна выбіраюць дарослыя, людзі, якія мяняюць прафесію, або тыя, каму не хапае адной кваліфікацыі.", "Кваліфікацыйны прафесійны курс заканчваецца залікам і даведкай аб заканчэнні курса. Гэтая даведка дае права здаваць прафесійны экзамен па адпаведнай кваліфікацыі. Сам курс не пацвярджае кваліфікацыю; афіцыйным пацвярджэннем з'яўляецца сертыфікат прафесійнай кваліфікацыі пасля здадзенага экзамену.", "Праверце поўную назву кваліфікацыі, колькасць гадзін, арганізацыю практычнай часткі, ці мае арганізатар права праводзіць кваліфікацыйны прафесійны курс, тэрміны дэкларацыі на экзамен і ці патрэбныя для прафесійнага дыплома іншыя кваліфікацыі."],
  kurs: ["Для вучняў, дарослых, настаўнікаў і работнікаў галін, якія хочуць дапоўніць навыкі, вывучыць тэхналогію або перакваліфікавацца без выбару поўнай школы. Сюды ўваходзяць кароткія курсы, галіновыя трэнінгі і дзейнасць Галіновых цэнтраў уменняў.", "Курс або трэнінг можа даць веды, навык, даведку, сертыфікат арганізатара або падрыхтоўку да далейшага экзамену. Галіновы цэнтр уменняў перш за ўсё звязвае адукацыю з галіной, тэхналогіямі, працадаўцамі і прафесійным кансультаваннем; не кожны курс аўтаматычна азначае фармальную школьную кваліфікацыю.", "Праверце, які дакумент выдаецца пасля заканчэння, ці акрэдытаваны курс або звязаны з кваліфікацыяй, хто адказвае за праграму, ці ёсць практыка і ці прызнае вынік школа, працадаўца або экзаменацыйная камісія."]
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
  const localizedSummary = SCHOOL_SUMMARIES_LOCALIZED[state.lang]?.[school.public_summary];
  if (localizedSummary) return localizedSummary;
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
