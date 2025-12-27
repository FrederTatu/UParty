// ========== КОНСТАНТЫ ДАННЫХ ==========
const EVENTS_DATA = {
  1: {
    title: "Призрак оперы",
    date: "09.02.26 | 19:00",
    description:
      "Шедевр, покоривший сердца миллионов зрителей по всему миру! Почувствуйте магию музыки двух великих композиторов: Эндрю Ллойда Уэббера и Мори Йестона — окунитесь в захватывающую историю любви, жизни и смерти.",
    price: "1500",
    age: "12+",
    slides: [
      // ИЗМЕНИЛ: убрал ../assets/images/ → оставил только имена файлов
      "pr-opery1.jpg",
      "pr-opery2.png",
      "pr-opery3.jpg",
    ],
  },
  2: {
    title: "Лебединое озеро",
    date: "28.03.26 | 17:00",
    description:
      "Легендарный балет П.И. Чайковского в постановке выдающегося хореографа. История любви принца Зигфрида и заколдованной принцессы Одетты, превращенной в лебедя.",
    price: "2000",
    age: "12+",
    slides: [
      // ИЗМЕНИЛ
      "swamp1.png",
      "swamp2.png",
    ],
  },
  3: {
    title: "Щелкунчик",
    date: "23.01.26 | 19:00",
    description:
      "Волшебная рождественская сказка о девочке Мари и ее любимой игрушке Щелкунчике. Прекрасная музыка Чайковского, изысканные костюмы и захватывающая хореография.",
    price: "1800",
    age: "6+",
    slides: [
      // ИЗМЕНИЛ
      "shchk1.png",
      "shchk2.png",
    ],
  },
  4: {
    title: "Кармен",
    date: "31.03.26 | 20:00",
    description:
      "Страстная история цыганки Кармен в балетной интерпретации. Яркие испанские мотивы и захватывающий сюжет о любви и ревности.",
    price: "1700",
    age: "16+",
    slides: [
      // ИЗМЕНИЛ
      "carm1.png",
      "carm2.png",
    ],
  },
  5: {
    title: "Жизель",
    date: "28.02.26 | 18:00",
    description:
      "Романтический балет о любви и прощении. История крестьянской девушки Жизель, ставшей после смерти виллисой — духом, мстящим мужчинам.",
    price: "1900",
    age: "12+",
    slides: [
      // ИЗМЕНИЛ
      "zhiz1.png",
      "zhiz2.png",
    ],
  },
  6: {
    title: "Спящая красавица",
    date: "28.03.26 | 13:00",
    description:
      "Волшебная сказка о принцессе Авроре, уснувшей на сто лет после укола о веретено. Балет на музыку Чайковского с роскошными декорациями.",
    price: "2100",
    age: "0+",
    slides: [
      // ИЗМЕНИЛ
      "beauty1.jpg",
      "beauty2.png",
    ],
  },
  7: {
    title: "Юнона и Авось",
    date: "18.03.26 | 19:00",
    description:
      "«Юнона и Авось» — самая известная рок-опера на российской сцене. Авторы — выдающийся русский композитор Алексей Рыбников и поэт Андрей Вознесенский. Постановку рок-оперы «Юнона и Авось» в авторской версии осуществила Московская государственная творческая мастерская под руководством Народного артиста РФ, Лауреата Государственной премии РФ, Лауреата премии Президента РФ, композитора Алексея Львовича Рыбникова.",
    price: "2000",
    age: "12+",
    slides: [
      // ИЗМЕНИЛ
      "un&av1.png",
      "un&av2.png",
    ],
  },
  8: {
    title: "Нотр-Дам де Пари",
    date: "28.01.26 | 19:00",
    description:
      "«Я душу дьяволу продам за ночь с тобой» — и можно больше ничего не говорить. За последние 10 лет эта фраза стала культовой. Она олицетворяет собой целый период в истории современной Российской культуры: эпоху музыкального театра, эпоху мюзикла. Жанр мюзикла уверенно завоевывает популярность в России. Москва и Санкт-Петербург становятся «русским Бродвеем» — в обеих столицах сейчас идут около десятка громких проектов.",
    price: "1500",
    age: "6+",
    slides: [
      // ИЗМЕНИЛ
      "notr1.jpg",
      "notr2.png",
    ],
  },
  9: {
    title: "Ночь её откровений",
    date: "17.04.26 | 19:00",
    description:
      "Это авантюрная мелодрама с комедийным подтекстом и лихо закрученным сюжетом, практически детективная история, которая заканчивается самым неожиданным образом. Жизнь немолодого героя, женатого бизнесмена, переворачивается с ног на голову после завязавшейся легкой интрижки в баре с юной красавицей. Она сущий ангел, но у неё свои «скелеты в шкафу».",
    price: "1200",
    age: "16+",
    slides: [
      // ИЗМЕНИЛ
      "night1.jpg",
      "night2.png",
    ],
  },
};

const GRID_EVENTS = [
  { id: 1, title: "Призрак оперы", date: "09.02.26", image: "pr-opery1.jpg" },
  { id: 2, title: "Лебединое озеро", date: "28.03.26", image: "swamp1.png" },
  { id: 3, title: "Щелкунчик", date: "23.01.26", image: "shchk1.png" },
  { id: 4, title: "Кармен", date: "31.03.26", image: "carm1.png" },
  { id: 5, title: "Жизель", date: "28.02.26", image: "zhiz1.png" },
  { id: 6, title: "Спящая красавица", date: "28.03.26", image: "beauty1.jpg" },
  { id: 7, title: "Юнона и Авось", date: "18.03.26", image: "un&av1.png" },
  { id: 8, title: "Нотр-Дам де Пари", date: "28.01.26", image: "notr1.jpg" },
  { id: 9, title: "Ночь её откровений", date: "17.04.26", image: "night1.jpg" },
];

// ========== ЭЛЕМЕНТЫ DOM ==========
const elements = {
  // Хедер
  headerAvatar: document.querySelector(".header__avatar"),
  headerDropdown: document.querySelector(".header__dropdown"),

  // Фильтр
  filterSelect: document.getElementById("filterSelect"),
  filterArrow: document.getElementById("filterArrow"),
  filterOptions: document.getElementById("filterOptions"),
  filterTitle: document.querySelector(".filter__select-title"),
  allOptions: document.querySelectorAll(".filter__option-item"),

  // Сетка мероприятий
  eventsGrid: document.getElementById("eventsGrid"),

  // Попап
  popup: document.getElementById("popup"),
  blurBackground: document.getElementById("blurBackground"),
  closeBtn: document.getElementById("closeBtn"),

  // Слайдер
  sliderTrack: document.getElementById("sliderTrack"),
  sliderDots: document.getElementById("sliderDots"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),

  // Информация о мероприятии
  eventTitle: document.getElementById("eventTitle"),
  eventDate: document.getElementById("eventDate"),
  eventDescription: document.getElementById("eventDescription"),
  eventPrice: document.getElementById("eventPrice"),
  ageRestriction: document.getElementById("ageRestriction"),
  detailsBtn: document.getElementById("detailsBtn"),

  // Слайдер контейнер
  sliderContainer: document.querySelector(".slider-container"),
};

// ========== СОСТОЯНИЕ ==========
let state = {
  isHeaderMenuOpen: false,
  isFilterMenuOpen: false,
  currentEventId: null,
  currentSlide: 0,
  slideInterval: null,
};

// ========== КОНСТАНТЫ ПУТЕЙ ==========

// Исправленный путь - жёстко задаём /static/
const IMAGES_PATH = '/static/assets/images/category-events/';

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener("DOMContentLoaded", init);

function init() {
  loadEventsGrid();
  setupEventListeners();
  initFilter();
  initHeaderMenu();
}

// ========== ЗАГРУЗКА СЕТКИ МЕРОПРИЯТИЙ ==========
function loadEventsGrid() {
  const eventsHTML = GRID_EVENTS.map(
    (event) => `
        <div class="events__item" data-event-id="${event.id}">
            <!-- ИЗМЕНИЛ: добавил префикс IMAGES_PATH -->
            <img src="${IMAGES_PATH}${event.image}" alt="${event.title}">
            <div class="events__caption">
                <div class="events__caption-title">
                    <h3>${event.title}</h3>
                </div>
                <div class="events__caption-date">
                    <h4>${event.date}</h4>
                </div>
            </div>
        </div>
    `
  ).join("");

  elements.eventsGrid.innerHTML = eventsHTML;

  // обработчики клика
  document.querySelectorAll(".events__item").forEach((item) => {
    item.addEventListener("click", () => {
      const eventId = parseInt(item.dataset.eventId);
      if (EVENTS_DATA[eventId]) {
        openEventPopup(eventId);
      }
    });
  });
}

// ========== ХЕДЕР (МЕНЮ ПОЛЬЗОВАТЕЛЯ) ==========
function initHeaderMenu() {
  if (elements.headerAvatar) {
    elements.headerAvatar.addEventListener("click", toggleHeaderMenu);
  }
  document.addEventListener("click", closeHeaderMenuOnClick);
}

function toggleHeaderMenu(e) {
  if (e) e.stopPropagation();
  state.isHeaderMenuOpen = !state.isHeaderMenuOpen;
  if (elements.headerDropdown) {
    elements.headerDropdown.classList.toggle("active", state.isHeaderMenuOpen);
  }
}

function closeHeaderMenuOnClick(e) {
  if (
    (!elements.headerAvatar || !elements.headerAvatar.contains(e.target)) &&
    (!elements.headerDropdown || !elements.headerDropdown.contains(e.target))
  ) {
    state.isHeaderMenuOpen = false;
    if (elements.headerDropdown) {
      elements.headerDropdown.classList.remove("active");
    }
  }
}

// ========== ФИЛЬТР ==========
function initFilter() {
  if (elements.filterSelect) {
    elements.filterSelect.addEventListener("click", toggleFilter);
  }
  document.addEventListener("click", closeFilterOnClick);

  if (elements.allOptions) {
    elements.allOptions.forEach((option) => {
      option.addEventListener("click", () => selectFilterOption(option));
    });
  }
}

function toggleFilter(e) {
  if (e) e.stopPropagation();
  state.isFilterMenuOpen = !state.isFilterMenuOpen;
  if (elements.filterOptions) {
    elements.filterOptions.classList.toggle("visible", state.isFilterMenuOpen);
  }
  if (elements.filterArrow) {
    elements.filterArrow.classList.toggle("rotated", state.isFilterMenuOpen);
  }
}

function selectFilterOption(option) {
  if (elements.allOptions) {
    elements.allOptions.forEach((item) => item.classList.remove("active"));
  }
  option.classList.add("active");
  if (elements.filterTitle) {
    elements.filterTitle.textContent = option.dataset.value;
  }
  toggleFilter();

  // можно добавить фильтрацию мероприятий
  console.log("Фильтр изменен на:", option.dataset.value);
}

function closeFilterOnClick(e) {
  if (
    (!elements.filterSelect || !elements.filterSelect.contains(e.target)) &&
    (!elements.filterOptions || !elements.filterOptions.contains(e.target))
  ) {
    state.isFilterMenuOpen = false;
    if (elements.filterOptions) {
      elements.filterOptions.classList.remove("visible");
    }
    if (elements.filterArrow) {
      elements.filterArrow.classList.remove("rotated");
    }
  }
}

// ========== СЛАЙДЕР ==========
function initSlider(eventId) {
  const event = EVENTS_DATA[eventId];
  if (!event) return;

  elements.sliderTrack.innerHTML = "";
  elements.sliderDots.innerHTML = "";

  event.slides.forEach((slideSrc, index) => {
    // ИЗМЕНИЛ: добавил префикс IMAGES_PATH для слайдов
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.style.backgroundImage = `url('${IMAGES_PATH}${slideSrc}')`;
    elements.sliderTrack.appendChild(slide);

    const dot = document.createElement("div");
    dot.className = `dot ${index === 0 ? "active" : ""}`;
    dot.addEventListener("click", () => goToSlide(index));
    elements.sliderDots.appendChild(dot);
  });

  if (elements.ageRestriction) {
    elements.ageRestriction.textContent = event.age;
  }

  state.currentSlide = 0;
  updateSliderPosition();

  startAutoSlide();
}

function updateSliderPosition() {
  if (elements.sliderTrack) {
    elements.sliderTrack.style.transform = `translateX(-${
      state.currentSlide * 100
    }%)`;
  }

  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === state.currentSlide);
  });
}

function goToSlide(index) {
  state.currentSlide = index;
  updateSliderPosition();
  resetAutoSlide();
}

function nextSlide() {
  const event = EVENTS_DATA[state.currentEventId];
  if (!event) return;

  state.currentSlide = (state.currentSlide + 1) % event.slides.length;
  updateSliderPosition();
}

function prevSlide() {
  const event = EVENTS_DATA[state.currentEventId];
  if (!event) return;

  state.currentSlide =
    (state.currentSlide - 1 + event.slides.length) % event.slides.length;
  updateSliderPosition();
  resetAutoSlide();
}

function startAutoSlide() {
  if (state.slideInterval) {
    clearInterval(state.slideInterval);
  }
  state.slideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
  if (state.slideInterval) {
    clearInterval(state.slideInterval);
    startAutoSlide();
  }
}

function stopAutoSlide() {
  if (state.slideInterval) {
    clearInterval(state.slideInterval);
    state.slideInterval = null;
  }
}

// ========== ПОПАП МЕРОПРИЯТИЯ ==========
function openEventPopup(eventId) {
  const event = EVENTS_DATA[eventId];
  if (!event) return;

  state.currentEventId = eventId;

  if (elements.eventTitle) elements.eventTitle.textContent = event.title;
  if (elements.eventDate) elements.eventDate.textContent = event.date;
  if (elements.eventDescription) elements.eventDescription.textContent = event.description;
  if (elements.eventPrice) elements.eventPrice.innerHTML = `${event.price} <span>руб.</span>`;

  // ИЗМЕНИЛ: изменил ссылку на Django URL
  if (elements.detailsBtn) {
    elements.detailsBtn.href = `/events/${eventId}/`;
    // или если есть маршрут с именем 'event_detail':
    // elements.detailsBtn.href = `/events/${eventId}/`;
  }

  initSlider(eventId);

  if (elements.popup) elements.popup.style.display = "block";
  if (elements.blurBackground) elements.blurBackground.style.display = "block";
  document.body.classList.add("no-scroll");
}

function closeEventPopup() {
  if (elements.popup) elements.popup.style.display = "none";
  if (elements.blurBackground) elements.blurBackground.style.display = "none";
  document.body.classList.remove("no-scroll");
  stopAutoSlide();
}

// ========== ОБРАБОТЧИКИ СОБЫТИЙ ==========
function setupEventListeners() {
  // закрытие попапа
  if (elements.closeBtn) {
    elements.closeBtn.addEventListener("click", closeEventPopup);
  }
  if (elements.blurBackground) {
    elements.blurBackground.addEventListener("click", closeEventPopup);
  }

  // управление слайдером
  if (elements.prevBtn) {
    elements.prevBtn.addEventListener("click", prevSlide);
  }
  if (elements.nextBtn) {
    elements.nextBtn.addEventListener("click", nextSlide);
  }

  // остановка автопрокрутки при наведении
  if (elements.sliderContainer) {
    elements.sliderContainer.addEventListener("mouseenter", stopAutoSlide);
    elements.sliderContainer.addEventListener("mouseleave", startAutoSlide);
  }

  // ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeEventPopup();
  });

  // "Подробнее"
  if (elements.detailsBtn) {
    elements.detailsBtn.addEventListener("click", (e) => {
      if (!state.currentEventId) {
        e.preventDefault();
        alert("Выберите мероприятие");
      }
    });
  }
}