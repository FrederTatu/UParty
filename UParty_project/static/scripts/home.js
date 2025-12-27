// ========== КОНСТАНТЫ ПУТЕЙ ==========
const STATIC_URL = '/static/';
const CATEGORIES_ICONS_PATH = `${STATIC_URL}assets/images/categories-icons/`;
const EVENTS_IMAGES_PATH = `${STATIC_URL}assets/images/events/`;

// ========== КОНСТАНТЫ ДАННЫХ ==========
const CATEGORIES_DATA = [
  { id: 1, name: "активный<br>отдых", icon: "1.svg" },
  { id: 2, name: "Романтика", icon: "2.svg" },
  { id: 3, name: "Спокойный<br>вечер", icon: "3.svg" },
  { id: 4, name: "С друзьями", icon: "4.svg" },
  { id: 5, name: "Творчество", icon: "5.svg" },
  { id: 6, name: "Развлечения", icon: "6.svg" },
  { id: 7, name: "Театральные<br>представления", icon: "7.svg" },
  { id: 8, name: "Гастрономия", icon: "8.svg" },
  { id: 9, name: "Музыка", icon: "9.svg" },
];

const EVENTS_DATA = [
  { id: 1, title: "Искупление", date: "09.02.26", image: "1.png" },
  { id: 2, title: "Призрак Оперы", date: "09.02.26", image: "2.png" },
  { id: 3, title: "Гастрономический Ресторан", date: "09.02.26", image: "3.png" },
  { id: 4, title: "Concord Orchestra", date: "09.02.26", image: "4.png" },
  { id: 5, title: "Щелкунчик", date: "09.02.26", image: "5.png" },
  { id: 6, title: "Кино под открытым небом", date: "09.02.26", image: "6.png" },
];

// ========== ЭЛЕМЕНТЫ DOM ==========
const elements = {
  headerAvatar: document.querySelector(".header__avatar"),
  headerDropdown: document.querySelector(".header__dropdown"),

  // Фильтр событий
  filterSelect: document.getElementById("filterSelect"),
  filterArrow: document.getElementById("filterArrow"),
  filterOptions: document.getElementById("filterOptions"),
  filterTitle: document.querySelector(".filter__select-title"),
  allOptions: document.querySelectorAll(".filter__option-item"),

  // Слайдер категорий
  slider: document.getElementById("categorySlider"),
  prevArrow: document.getElementById("prevArrow"),
  nextArrow: document.getElementById("nextArrow"),

  // Сетка событий
  eventsGrid: document.getElementById("eventsGrid"),

  // Поиск
  searchInput: document.getElementById("searchInput"),
  searchBtn: document.getElementById("searchBtn"),
};

// ========== СОСТОЯНИЕ ==========
let state = {
  isHeaderMenuOpen: false,
  isFilterMenuOpen: false,
  sliderPosition: 0,
};

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener("DOMContentLoaded", init);

function init() {
  loadCategories();
  loadEvents();
  initSlider();
  setupEventListeners();
}

// ========== ЗАГРУЗКА КАТЕГОРИЙ ==========
function loadCategories() {
  const categoriesHTML = CATEGORIES_DATA.map(
    (category) => `
        <li class="slider__item">
            <a href="./category(theatre).html" class="slider__item-link">
                <div class="slider__item-inner">
                    <div class="slider__img-box">
                        <img src="${CATEGORIES_ICONS_PATH}${category.icon}" 
                             alt="${category.name.replace("<br>", " ")}" 
                             class="slider__item-img mb-30">
                    </div>
                    <div class="slider__item-content">
                        <h4 class="slider__item-title">${category.name}</h4>
                    </div>
                </div>
            </a>
        </li>
    `
  ).join("");

  elements.slider.innerHTML = categoriesHTML;
}

// ========== ЗАГРУЗКА СОБЫТИЙ ==========
function loadEvents() {
  const eventsHTML = EVENTS_DATA.map(
    (event) => `
        <li class="card__item">
            <img src="${EVENTS_IMAGES_PATH}${event.image}" alt="${event.title}">
            <div class="card__content">
                <h3 class="card__content-title">${event.title}</h3>
                <h4 class="card__content-date">${event.date}</h4>
            </div>
        </li>
    `
  ).join("");

  elements.eventsGrid.innerHTML = eventsHTML;
}

// ========== СЛАЙДЕР КАТЕГОРИЙ ==========
function initSlider() {
  if (!elements.slider || !elements.prevArrow || !elements.nextArrow) {
    console.error("Slider elements not found!");
    return;
  }

  const CARD_WIDTH = 270;
  const GAP = 20;
  const SCROLL_AMOUNT = CARD_WIDTH + GAP;

  function updateSliderButtons() {
    const maxScroll = elements.slider.scrollWidth - elements.slider.clientWidth;

    if (maxScroll <= 5) {
      if (elements.prevArrow) elements.prevArrow.style.display = "none";
      if (elements.nextArrow) elements.nextArrow.style.display = "none";
      return;
    }

    if (elements.prevArrow) elements.prevArrow.style.display = "flex";
    if (elements.nextArrow) elements.nextArrow.style.display = "flex";

    // Стрелка "назад"
    if (elements.prevArrow) {
      if (state.sliderPosition <= 5) {
        elements.prevArrow.classList.add("disabled");
        elements.prevArrow.style.opacity = "0.3";
        elements.prevArrow.style.cursor = "not-allowed";
      } else {
        elements.prevArrow.classList.remove("disabled");
        elements.prevArrow.style.opacity = "1";
        elements.prevArrow.style.cursor = "pointer";
      }
    }

    // Стрелка "вперед"
    if (elements.nextArrow) {
      if (state.sliderPosition >= maxScroll - 5) {
        elements.nextArrow.classList.add("disabled");
        elements.nextArrow.style.opacity = "0.3";
        elements.nextArrow.style.cursor = "not-allowed";
      } else {
        elements.nextArrow.classList.remove("disabled");
        elements.nextArrow.style.opacity = "1";
        elements.nextArrow.style.cursor = "pointer";
      }
    }
  }

  // Обработчики стрелок слайдера
  if (elements.nextArrow) {
    elements.nextArrow.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (!this.classList.contains("disabled")) {
        const maxScroll = elements.slider.scrollWidth - elements.slider.clientWidth;
        state.sliderPosition += SCROLL_AMOUNT;

        if (state.sliderPosition > maxScroll) {
          state.sliderPosition = maxScroll;
        }

        elements.slider.scrollTo({
          left: state.sliderPosition,
          behavior: "smooth",
        });

        setTimeout(updateSliderButtons, 300);
      }
    });
  }

  if (elements.prevArrow) {
    elements.prevArrow.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (!this.classList.contains("disabled")) {
        state.sliderPosition -= SCROLL_AMOUNT;

        if (state.sliderPosition < 0) {
          state.sliderPosition = 0;
        }

        elements.slider.scrollTo({
          left: state.sliderPosition,
          behavior: "smooth",
        });

        setTimeout(updateSliderButtons, 300);
      }
    });
  }

  // Обновление позиции при скролле
  elements.slider.addEventListener("scroll", function () {
    state.sliderPosition = elements.slider.scrollLeft;
    updateSliderButtons();
  });

  // Прокрутка колесиком мыши
  elements.slider.addEventListener("wheel", function (e) {
    e.preventDefault();

    const maxScroll = elements.slider.scrollWidth - elements.slider.clientWidth;
    const isScrollingRight = e.deltaY > 0;

    if (isScrollingRight && state.sliderPosition < maxScroll) {
      state.sliderPosition += SCROLL_AMOUNT;
      if (state.sliderPosition > maxScroll) state.sliderPosition = maxScroll;
    } else if (!isScrollingRight && state.sliderPosition > 0) {
      state.sliderPosition -= SCROLL_AMOUNT;
      if (state.sliderPosition < 0) state.sliderPosition = 0;
    }

    elements.slider.scrollTo({
      left: state.sliderPosition,
      behavior: "smooth",
    });

    updateSliderButtons();
  });

  // Ресайз окна
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateSliderButtons();
    }, 150);
  });

  // Инициализация
  updateSliderButtons();
}

// ========== ХЕДЕР (МЕНЮ ПОЛЬЗОВАТЕЛЯ) ==========
function toggleHeaderMenu() {
  state.isHeaderMenuOpen = !state.isHeaderMenuOpen;
  if (elements.headerDropdown) {
    elements.headerDropdown.classList.toggle("active", state.isHeaderMenuOpen);
  }
}

function closeHeaderMenu(e) {
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

// ========== ФИЛЬТР СОБЫТИЙ ==========
function toggleFilterMenu() {
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
    elements.allOptions.forEach((item) => {
      item.classList.remove("active");
    });
  }

  option.classList.add("active");
  if (elements.filterTitle) {
    elements.filterTitle.textContent = option.dataset.value;
  }
  closeFilterMenu();
}

function closeFilterMenu() {
  if (state.isFilterMenuOpen) {
    state.isFilterMenuOpen = false;
    if (elements.filterOptions) {
      elements.filterOptions.classList.remove("visible");
    }
    if (elements.filterArrow) {
      elements.filterArrow.classList.remove("rotated");
    }
  }
}

// ========== ПОИСК ==========
function handleSearch() {
  if (elements.searchInput) {
    const query = elements.searchInput.value.trim();
    if (query) {
      console.log("Поиск:", query);
      // Здесь будет логика поиска
    }
  }
}

// ========== НАСТРОЙКА ОБРАБОТЧИКОВ СОБЫТИЙ ==========
function setupEventListeners() {
  // Хедер - меню пользователя
  if (elements.headerAvatar) {
    elements.headerAvatar.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleHeaderMenu();
    });
  }

  document.addEventListener("click", function (e) {
    closeHeaderMenu(e);
  });

  // Фильтр событий
  if (elements.filterSelect) {
    elements.filterSelect.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleFilterMenu();
    });
  }

  if (elements.allOptions) {
    elements.allOptions.forEach((option) => {
      option.addEventListener("click", function () {
        selectFilterOption(this);
      });
    });
  }

  document.addEventListener("click", function (e) {
    if (
      (!elements.filterSelect || !elements.filterSelect.contains(e.target)) &&
      (!elements.filterOptions || !elements.filterOptions.contains(e.target))
    ) {
      closeFilterMenu();
    }
  });

  // Поиск
  if (elements.searchBtn) {
    elements.searchBtn.addEventListener("click", handleSearch);
  }
  
  if (elements.searchInput) {
    elements.searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") handleSearch();
    });
  }
}