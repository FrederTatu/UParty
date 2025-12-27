// ========== КОНСТАНТЫ ==========
const SLIDER_DATA = {
  large: {
    width: 670,
    activeClass: "active",
    inactiveClass: "inactive",
  },
  small: {
    width: 140,
    activeClass: "active",
    inactiveClass: "inactive",
  },
};

// ========== ЭЛЕМЕНТЫ DOM ==========
const elements = {
  sliderList: document.querySelector(".slider__list"),
  largeSlide: document.querySelector(".card--large"),
  slides: document.querySelectorAll(".slider__item"),

  loginBtn: document.querySelector(".header__btn.btn-white"),
  registerBtn: document.querySelector(".header__btn.btn-yellow"),

  modalOverlay: document.querySelector(".uparty-overlay"),
  loginModal: document.querySelector("#loginModal"),
  registerModal: document.querySelector("#registerModal"),
};

// ========== СОСТОЯНИЕ ==========
let state = {
  activeElement: null,
  isAnimating: false,
};

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener("DOMContentLoaded", init);

function init() {
  setupEventListeners();
  setupSlider();
}

// ========== НАСТРОЙКА ОБРАБОТЧИКОВ СОБЫТИЙ ==========
function setupEventListeners() {
  // Слайдер
  elements.largeSlide.addEventListener("click", () =>
    handleSlideClick(elements.largeSlide)
  );

  elements.slides.forEach((slide) => {
    slide.addEventListener("click", () => handleSlideClick(slide));
  });

  // Адаптация при изменении размера окна
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resetAll();
    }, 250);
  });

  // ===== POPUPS =====
  if (elements.loginBtn) {
    elements.loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openLoginModal();
    });
  }

  if (elements.registerBtn) {
    elements.registerBtn.addEventListener("click", () => {
      openRegisterModal();
    });
  }

  if (elements.modalOverlay) {
    elements.modalOverlay.addEventListener("click", closeModals);
  }
}

// ========== СЛАЙДЕР ==========
function setupSlider() {
  // Добавляем индикаторы для доступности
  elements.largeSlide.setAttribute("role", "button");
  elements.largeSlide.setAttribute("aria-label", "Увеличить слайд");
  elements.largeSlide.setAttribute("tabindex", "0");

  elements.slides.forEach((slide, index) => {
    slide.setAttribute("role", "button");
    slide.setAttribute("aria-label", `Показать слайд ${index + 1}`);
    slide.setAttribute("tabindex", "0");
  });

  // Обработка клавиатуры
  elements.largeSlide.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSlideClick(elements.largeSlide);
    }
  });

  elements.slides.forEach((slide) => {
    slide.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSlideClick(slide);
      }
    });
  });
}

function handleSlideClick(element) {
  if (state.isAnimating) return;

  state.isAnimating = true;

  if (state.activeElement === element) {
    resetAll();
  } else {
    expandElement(element);
  }

  setTimeout(() => {
    state.isAnimating = false;
  }, 300);
}

function resetAll() {
  // Сброс большого слайда
  elements.largeSlide.style.width = `${SLIDER_DATA.large.width}px`;
  elements.largeSlide.classList.remove(
    SLIDER_DATA.large.activeClass,
    SLIDER_DATA.large.inactiveClass
  );
  elements.largeSlide.setAttribute("aria-expanded", "false");

  // Сброс маленьких слайдов
  elements.slides.forEach((slide) => {
    slide.style.width = `${SLIDER_DATA.small.width}px`;
    slide.classList.remove(
      SLIDER_DATA.small.activeClass,
      SLIDER_DATA.small.inactiveClass
    );
    slide.setAttribute("aria-expanded", "false");
  });

  // Обновление состояния
  state.activeElement = null;

  // Обновление доступности
  updateSliderAccessibility();
}

function expandElement(element) {
  // Сбрасываем все
  resetAll();

  if (element === elements.largeSlide) {
    // Расширяем большой слайд
    elements.largeSlide.classList.add(SLIDER_DATA.large.activeClass);
    elements.largeSlide.setAttribute("aria-expanded", "true");

    // Сжимаем маленькие слайды
    elements.slides.forEach((slide) => {
      slide.classList.add(SLIDER_DATA.small.inactiveClass);
      slide.style.width = `${SLIDER_DATA.small.width}px`;
    });

    state.activeElement = elements.largeSlide;
  } else {
    // Сжимаем большой слайд
    elements.largeSlide.style.width = `${SLIDER_DATA.small.width}px`;
    elements.largeSlide.classList.add(SLIDER_DATA.large.inactiveClass);

    // Расширяем выбранный маленький слайд
    element.style.width = `${SLIDER_DATA.large.width}px`;
    element.classList.add(SLIDER_DATA.small.activeClass);
    element.setAttribute("aria-expanded", "true");

    // Остальные маленькие слайды сжимаем
    elements.slides.forEach((slide) => {
      if (slide !== element) {
        slide.classList.add(SLIDER_DATA.small.inactiveClass);
        slide.style.width = `${SLIDER_DATA.small.width}px`;
      }
    });

    state.activeElement = element;
  }

  // Обновление доступности
  updateSliderAccessibility();

  // Прокрутка к активному элементу (на мобильных устройствах)
  if (window.innerWidth < 768) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }
}

function updateSliderAccessibility() {
  // Обновляем ARIA-атрибуты для доступности
  if (state.activeElement) {
    const inactiveElements =
      state.activeElement === elements.largeSlide
        ? elements.slides
        : [...elements.slides]
            .filter((slide) => slide !== state.activeElement)
            .concat(elements.largeSlide);

    inactiveElements.forEach((element) => {
      element.setAttribute("aria-hidden", "true");
      element.setAttribute("tabindex", "-1");
    });

    state.activeElement.setAttribute("aria-hidden", "false");
    state.activeElement.setAttribute("tabindex", "0");
  } else {
    // Все элементы доступны
    [elements.largeSlide, ...elements.slides].forEach((element) => {
      element.setAttribute("aria-hidden", "false");
      element.setAttribute("tabindex", "0");
    });
  }
}

// ========== АДАПТИВНЫЕ РАЗМЕРЫ ==========
function getAdaptiveWidths() {
  const isMobile = window.innerWidth < 768;

  return {
    large: isMobile ? window.innerWidth * 0.9 : 670,
    small: isMobile ? 80 : 140,
  };
}

// Обновляем размеры при изменении размера окна
window.addEventListener("resize", () => {
  const widths = getAdaptiveWidths();
  SLIDER_DATA.large.width = widths.large;
  SLIDER_DATA.small.width = widths.small;

  // Если есть активный элемент, обновляем его размер
  if (state.activeElement) {
    resetAll();
    setTimeout(() => expandElement(state.activeElement), 10);
  }
});

// Инициализация адаптивных размеров
const initialWidths = getAdaptiveWidths();
SLIDER_DATA.large.width = initialWidths.large;
SLIDER_DATA.small.width = initialWidths.small;

// Начальный сброс для применения размеров
setTimeout(() => {
  resetAll();
}, 100);

// ========== POPUPS ==========
function openLoginModal() {
  elements.modalOverlay.classList.add("active");
  elements.loginModal.classList.add("active");
  elements.registerModal.classList.remove("active");
  lockScroll();
}

function openRegisterModal() {
  elements.modalOverlay.classList.add("active");
  elements.registerModal.classList.add("active");
  elements.loginModal.classList.remove("active");
  lockScroll();
}

function closeModals() {
  elements.modalOverlay.classList.remove("active");
  elements.loginModal.classList.remove("active");
  elements.registerModal.classList.remove("active");
  unlockScroll();
}

// Блокировка скролла
function lockScroll() {
  document.body.style.overflow = "hidden";
}

function unlockScroll() {
  document.body.style.overflow = "";
}

// Переключение пароля
function togglePassword(button) {
  const input = button.previousElementSibling;
  input.type = input.type === "password" ? "text" : "password";
}
