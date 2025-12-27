// ========== КОНСТАНТЫ ДАННЫХ ==========
const EVENTS_DATA = {
  1: {
    title: "Призрак оперы",
    date: "9 февраля - 19:00",
    description:
      "Шедевр, покоривший сердца миллионов зрителей по всему миру! Почувствуйте магию музыки двух великих композиторов: «Эндрю Ллойда Уэббера и Мори Йестона» — окунитесь в захватывающую историю любви, жизни и смерти.",
    price: "1500",
    age: "0+",
    slides: [
      "./assets/images/1.png",
      "./assets/images/2.png",
      "./assets/images/3.png",
    ],
  },
  2: {
    title: "Лебединое озеро",
    date: "20 декабря - 18:30",
    description:
      "Легендарный балет П.И. Чайковского в постановке выдающегося хореографа. История любви принца Зигфрида и заколдованной принцессы Одетты, превращенной в лебедя.",
    price: "2000",
    age: "12+",
    slides: [
      "./assets/images/2.png",
      "./assets/images/3.png",
      "./assets/images/1.png",
    ],
  },
  3: {
    title: "Ромео и Джульетта",
    date: "22 декабря - 20:00",
    description:
      "Трагическая история любви шекспировских героев в современной хореографической интерпретации. Эмоциональная и динамичная постановка.",
    price: "1800",
    age: "16+",
    slides: [
      "./assets/images/3.png",
      "./assets/images/1.png",
      "./assets/images/2.png",
    ],
  },
  4: {
    title: "Кармен",
    date: "25 декабря - 19:30",
    description:
      "Страстная история цыганки Кармен в балетной интерпретации. Яркие испанские мотивы и захватывающий сюжет.",
    price: "1700",
    age: "16+",
    slides: [
      "./assets/images/4.png",
      "./assets/images/5.png",
      "./assets/images/6.png",
    ],
  },
  5: {
    title: "Жизель",
    date: "28 декабря - 18:00",
    description:
      "Романтический балет о любви и прощении. История крестьянской девушки Жизель, ставшей после смерти виллисой.",
    price: "1900",
    age: "12+",
    slides: [
      "./assets/images/5.png",
      "./assets/images/6.png",
      "./assets/images/4.png",
    ],
  },
  6: {
    title: "Дон Кихот",
    date: "30 декабря - 20:30",
    description:
      "Жизнерадостный и красочный балет по мотивам романа Сервантеса. Зажигательные испанские танцы и комедийные сцены.",
    price: "1600",
    age: "6+",
    slides: [
      "./assets/images/6.png",
      "./assets/images/4.png",
      "./assets/images/5.png",
    ],
  },
};

const CATEGORIES_DATA = [
  { id: "sport", name: "Спорт" },
  { id: "dance", name: "Танцы" },
  { id: "relax", name: "Релакс" },
  { id: "cozy", name: "Уют" },
  { id: "quiet", name: "Тихие места" },
  { id: "dates", name: "Свидания" },
  { id: "company", name: "Компании" },
  { id: "fun", name: "Веселье" },
  { id: "masterClasses", name: "Мастер-классы" },
  { id: "art", name: "Искусство" },
  { id: "gastronomy", name: "Гастрономия" },
  { id: "games", name: "Игры" },
  { id: "performances", name: "Перформансы" },
  { id: "show", name: "Спектакли" },
  { id: "liveShow", name: "Живые выступления" },
  { id: "festivals", name: "Фестивали" },
];

// ========== ЭЛЕМЕНТЫ DOM ==========
const elements = {
  // Хедер
  searchInput: document.getElementById("searchInput"),
  searchBtn: document.getElementById("searchBtn"),
  headerAvatar: document.querySelector(".header__avatar"),
  headerDropdown: document.querySelector(".header__dropdown"),

  // Профиль
  editDropdownBtn: document.getElementById("editDropdownBtn"),
  editDropdown: document.getElementById("editDropdown"),
  dropdownItems: document.querySelectorAll(".edit-dropdown__item"),
  avatarInput: document.getElementById("avatarInput"),
  profileName: document.querySelector(".profile__info-name h3"),

  // Попап профиля
  profilePopup: document.getElementById("profilePopup"),
  profilePopupClose: document.getElementById("profilePopupClose"),
  profileSaveBtn: document.getElementById("profileSaveBtn"),
  profileNameInput: document.getElementById("profileName"),
  profileEmailInput: document.getElementById("profileEmail"),
  profileBirthDateInput: document.getElementById("profileBirthDate"),
  notificationsToggle: document.getElementById("notificationsToggle"),
  toggleStatus: document.getElementById("toggleStatus"),

  // Попап категорий
  categoryPopup: document.getElementById("categoryPopup"),
  categoryPopupClose: document.getElementById("categoryPopupClose"),
  categorySaveBtn: document.getElementById("categorySaveBtn"),
  categoriesList: document.getElementById("categoriesList"),

  // Попап мероприятия
  eventPopup: document.getElementById("popup"),
  blurBackground: document.getElementById("blurBackground"),
  closeBtn: document.getElementById("closeBtn"),
  sliderTrack: document.getElementById("sliderTrack"),
  sliderDots: document.getElementById("sliderDots"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  eventTitle: document.getElementById("eventTitle"),
  eventDate: document.getElementById("eventDate"),
  eventDescription: document.getElementById("eventDescription"),
  eventPrice: document.getElementById("eventPrice"),
  ageRestriction: document.querySelector(".age-restriction"),
  detailsBtn: document.getElementById("detailsBtn"),

  // Стрелки карточек
  arrowButtons: document.querySelectorAll(".arrow-btn"),
};

// ========== СОСТОЯНИЕ ==========
let state = {
  isHeaderMenuOpen: false,
  isEditDropdownOpen: false,
  isProfilePopupOpen: false,
  isCategoryPopupOpen: false,
  currentEventId: null,
  currentSlide: 0,
  slideInterval: null,
  selectedCategories: new Set(["sport", "relax"]),
};

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener("DOMContentLoaded", init);

function init() {
  setupEventListeners();
  initEventCards();
	loadSelectedCategories();
	  initHeaderMenu();
}

// ========== НАСТРОЙКА ОБРАБОТЧИКОВ СОБЫТИЙ ==========
function setupEventListeners() {
  // Поиск
  elements.searchBtn.addEventListener("click", handleSearch);
  elements.searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
  });

  // Выпадающее меню редактирования
  elements.editDropdownBtn.addEventListener("click", toggleEditDropdown);
  document.addEventListener("click", closeEditDropdownOnClick);

  elements.dropdownItems.forEach((item) => {
    item.addEventListener("click", () => handleEditAction(item.dataset.action));
  });

  // Смена аватара
  elements.avatarInput.addEventListener("change", handleAvatarChange);

  // Попап профиля
  elements.profilePopupClose.addEventListener("click", closeProfilePopup);
  elements.profileSaveBtn.addEventListener("click", saveProfile);
  elements.profilePopup.addEventListener("click", closePopupOnOverlayClick);
  elements.notificationsToggle.addEventListener("change", updateToggleStatus);
  elements.profileBirthDateInput.addEventListener("input", formatBirthDate);
  elements.profileEmailInput.addEventListener("blur", validateEmail);

  // Попап категорий
  elements.categoryPopupClose.addEventListener("click", closeCategoryPopup);
  elements.categorySaveBtn.addEventListener("click", saveCategories);
  elements.categoryPopup.addEventListener("click", closePopupOnOverlayClick);

  // Попап мероприятия
  elements.closeBtn.addEventListener("click", closeEventPopup);
  elements.blurBackground.addEventListener("click", closeEventPopup);
  elements.prevBtn.addEventListener("click", prevSlide);
  elements.nextBtn.addEventListener("click", nextSlide);
  elements.detailsBtn.addEventListener("click", showEventDetails);

  // Стрелки карточек
  elements.arrowButtons.forEach((btn) => {
    btn.addEventListener("click", handleArrowClick);
  });

  // Закрытие по ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (state.isProfilePopupOpen) closeProfilePopup();
      if (state.isCategoryPopupOpen) closeCategoryPopup();
      if (state.currentEventId !== null) closeEventPopup();
    }
  });
}

// ========== ПОИСК ==========
function handleSearch() {
  const searchTerm = elements.searchInput.value.trim();

  if (!searchTerm) {
    alert("Кажется, вы ничего не набрали. Попробуйте ещё раз");
    return;
  }

  console.log("Выполняется поиск:", searchTerm);
  alert(`Поиск по запросу: "${searchTerm}"`);
  elements.searchInput.value = "";
  elements.searchInput.focus();
}

// ========== ХЕДЕР МЕНЮ ==========
function initHeaderMenu() {
  elements.headerAvatar.addEventListener("click", toggleHeaderMenu);
  document.addEventListener("click", closeHeaderMenuOnClick);
}

function toggleHeaderMenu(e) {
  if (e) e.stopPropagation();
  state.isHeaderMenuOpen = !state.isHeaderMenuOpen;
  elements.headerDropdown.classList.toggle("active", state.isHeaderMenuOpen);
}

function closeHeaderMenuOnClick(e) {
  if (
    !elements.headerAvatar.contains(e.target) &&
    !elements.headerDropdown.contains(e.target)
  ) {
    state.isHeaderMenuOpen = false;
    elements.headerDropdown.classList.remove("active");
  }
}

// ========== ВЫПАДАЮЩЕЕ МЕНЮ РЕДАКТИРОВАНИЯ ==========
function toggleEditDropdown(e) {
  if (e) e.stopPropagation();
  state.isEditDropdownOpen = !state.isEditDropdownOpen;
  elements.editDropdown.classList.toggle("active", state.isEditDropdownOpen);
}

function closeEditDropdownOnClick(e) {
  if (
    !elements.editDropdownBtn.contains(e.target) &&
    !elements.editDropdown.contains(e.target)
  ) {
    state.isEditDropdownOpen = false;
    elements.editDropdown.classList.remove("active");
  }
}

function handleEditAction(action) {
  state.isEditDropdownOpen = false;
  elements.editDropdown.classList.remove("active");

  switch (action) {
    case "name":
      openProfilePopup();
      break;
    case "avatar":
      elements.avatarInput.click();
      break;
    case "category":
      openCategoryPopup();
      break;
  }
}

// ========== СМЕНА АВАТАРА ==========
function handleAvatarChange(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.match("image.*")) {
    alert("Пожалуйста, выберите изображение");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const avatarImg = document.querySelector(".plug-img");
    if (avatarImg) {
      avatarImg.src = e.target.result;
      showSuccessMessage("Аватар успешно обновлен!");
    }
  };
  reader.readAsDataURL(file);
}

// ========== ПОПАП ПРОФИЛЯ ==========
function openProfilePopup() {
  // Заполняем текущие данные
  elements.profileNameInput.value = elements.profileName.textContent;

  // Загружаем сохраненные настройки уведомлений
  const notificationsEnabled =
    localStorage.getItem("notificationsEnabled") !== "false";
  elements.notificationsToggle.checked = notificationsEnabled;
  updateToggleStatus();

  // Показываем попап
  elements.profilePopup.style.display = "flex";
  document.body.style.overflow = "hidden";
  state.isProfilePopupOpen = true;

  // Фокусируемся на поле имени
  setTimeout(() => elements.profileNameInput.focus(), 100);
}

function closeProfilePopup() {
  elements.profilePopup.style.display = "none";
  document.body.style.overflow = "";
  state.isProfilePopupOpen = false;

  // Очищаем ошибки
  clearEmailError();
}

function closePopupOnOverlayClick(e) {
  if (
    e.target === elements.profilePopup ||
    e.target === elements.categoryPopup
  ) {
    if (state.isProfilePopupOpen) closeProfilePopup();
    if (state.isCategoryPopupOpen) closeCategoryPopup();
  }
}

function formatBirthDate(e) {
  let value = e.target.value.replace(/[^\d]/g, "");

  // Ограничиваем до 8 цифр (ДДММГГГГ)
  if (value.length > 8) {
    value = value.substring(0, 8);
  }

  // Форматируем с точками
  let formatted = "";
  for (let i = 0; i < value.length; i++) {
    if (i === 2 || i === 4) {
      formatted += ".";
    }
    formatted += value[i];
  }

  e.target.value = formatted;
}

function validateEmail() {
  const email = elements.profileEmailInput.value.trim();
  if (email && !email.includes("@")) {
    showEmailError();
    return false;
  }
  return true;
}

function showEmailError() {
  let errorElement =
    elements.profileEmailInput.parentNode.querySelector(".email-error");
  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.className = "email-error";
    elements.profileEmailInput.parentNode.appendChild(errorElement);
  }

  errorElement.textContent = "Email должен содержать символ @";
  elements.profileEmailInput.style.borderColor = "var(--pink)";
}

function clearEmailError() {
  const errorElement =
    elements.profileEmailInput.parentNode.querySelector(".email-error");
  if (errorElement) {
    errorElement.remove();
  }
  elements.profileEmailInput.style.borderColor = "";
}

function updateToggleStatus() {
  if (elements.notificationsToggle.checked) {
    elements.toggleStatus.className = "toggle-status on";
  } else {
    elements.toggleStatus.className = "toggle-status off";
  }
}

function saveProfile() {
  const newName = elements.profileNameInput.value.trim();
  const newEmail = elements.profileEmailInput.value.trim();
  const newBirthDate = elements.profileBirthDateInput.value.trim();
  const notificationsEnabled = elements.notificationsToggle.checked;

  // Валидация
  if (!newName) {
    alert("Пожалуйста, введите имя");
    elements.profileNameInput.focus();
    return;
  }

  if (newEmail && !validateEmail()) {
    elements.profileEmailInput.focus();
    return;
  }

  if (newBirthDate && !validateBirthDate(newBirthDate)) {
    alert("Пожалуйста, введите корректную дату в формате ДД.ММ.ГГГГ");
    elements.profileBirthDateInput.focus();
    return;
  }

  // Обновляем данные на странице
  elements.profileName.textContent = newName;

  // Сохраняем настройки
  localStorage.setItem("notificationsEnabled", notificationsEnabled);

  // Показываем анимацию сохранения
  showSaveAnimation({
    name: newName,
    email: newEmail,
    birthDate: newBirthDate,
    notifications: notificationsEnabled,
  });
}

function validateBirthDate(date) {
  // Проверяем формат ДД.ММ.ГГГГ
  const regex = /^\d{2}\.\d{2}\.\d{4}$/;
  if (!regex.test(date)) return false;

  // Проверяем валидность даты
  const parts = date.split(".");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  const dateObj = new Date(year, month, day);
  return (
    dateObj.getFullYear() === year &&
    dateObj.getMonth() === month &&
    dateObj.getDate() === day &&
    year >= 1900 &&
    year <= new Date().getFullYear()
  );
}

function showSaveAnimation(data) {
  const originalText = elements.profileSaveBtn.innerHTML;
  elements.profileSaveBtn.disabled = true;
  elements.profileSaveBtn.innerHTML = `
        <span class="save-spinner"></span> Сохранение...
    `;

  setTimeout(() => {
    elements.profileSaveBtn.innerHTML = originalText;
    elements.profileSaveBtn.disabled = false;
    showSuccessMessage("Данные профиля успешно сохранены!");
    closeProfilePopup();
  }, 1500);
}

// ========== ПОПАП КАТЕГОРИЙ ==========
function openCategoryPopup() {
  renderCategories();
  elements.categoryPopup.style.display = "flex";
  document.body.style.overflow = "hidden";
  state.isCategoryPopupOpen = true;
}

function closeCategoryPopup() {
  elements.categoryPopup.style.display = "none";
  document.body.style.overflow = "";
  state.isCategoryPopupOpen = false;
}

function loadSelectedCategories() {
  // Загружаем сохраненные категории из localStorage
  const saved = localStorage.getItem("selectedCategories");
  if (saved) {
    state.selectedCategories = new Set(JSON.parse(saved));
  }
}

function renderCategories() {
  elements.categoriesList.innerHTML = "";

  CATEGORIES_DATA.forEach((category) => {
    const isSelected = state.selectedCategories.has(category.id);

    const categoryButton = document.createElement("button");
    categoryButton.className = `category-item ${isSelected ? "selected" : ""}`;
    categoryButton.dataset.id = category.id;
    categoryButton.type = "button";
    categoryButton.setAttribute("aria-pressed", isSelected);

    categoryButton.innerHTML = `
            <div class="category-name">${category.name}</div>
            <div class="category-checkbox ${isSelected ? "checked" : ""}"></div>
        `;

    categoryButton.addEventListener("click", () => toggleCategory(category.id));
    elements.categoriesList.appendChild(categoryButton);
  });
}

function toggleCategory(categoryId) {
  if (state.selectedCategories.has(categoryId)) {
    state.selectedCategories.delete(categoryId);
  } else {
    state.selectedCategories.add(categoryId);
  }

  // Обновляем отображение
  renderCategories();
}

function saveCategories() {
  if (state.selectedCategories.size === 0) {
    alert("Пожалуйста, выберите хотя бы одну категорию");
    return;
  }

  // Сохраняем в localStorage
  localStorage.setItem(
    "selectedCategories",
    JSON.stringify([...state.selectedCategories])
  );

  // Показываем сообщение об успехе
  const selectedNames = CATEGORIES_DATA.filter((c) =>
    state.selectedCategories.has(c.id)
  ).map((c) => c.name);

  showSuccessMessage(
    `Выбранные категории сохранены`
  );
  closeCategoryPopup();
}

// ========== КАРТОЧКИ МЕРОПРИЯТИЙ ==========
function initEventCards() {
  const eventItems = document.querySelectorAll(".events__item");
  eventItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const eventId = parseInt(item.dataset.eventId);
      if (EVENTS_DATA[eventId]) {
        openEventPopup(eventId);
      }
    });
  });
}

// ========== СЛАЙДЕР МЕРОПРИЯТИЯ ==========
function initSlider(eventId) {
  const event = EVENTS_DATA[eventId];
  if (!event) return;

  // Очищаем слайдер
  elements.sliderTrack.innerHTML = "";
  elements.sliderDots.innerHTML = "";

  // Создаем слайды
  event.slides.forEach((slideSrc, index) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.style.backgroundImage = `url('${slideSrc}')`;
    elements.sliderTrack.appendChild(slide);

    const dot = document.createElement("div");
    dot.className = `dot ${index === 0 ? "active" : ""}`;
    dot.addEventListener("click", () => goToSlide(index));
    elements.sliderDots.appendChild(dot);
  });

  // Обновляем возрастное ограничение
  elements.ageRestriction.textContent = event.age;

  // Сбрасываем состояние
  state.currentSlide = 0;
  updateSliderPosition();

  // Запускаем автопрокрутку
  startAutoSlide();
}

function updateSliderPosition() {
  elements.sliderTrack.style.transform = `translateX(-${
    state.currentSlide * 100
  }%)`;

  // Обновляем точки
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === state.currentSlide);
  });
}

function goToSlide(index) {
  const event = EVENTS_DATA[state.currentEventId];
  if (!event) return;

  state.currentSlide = index;
  updateSliderPosition();
  resetAutoSlide();
}

function nextSlide() {
  const event = EVENTS_DATA[state.currentEventId];
  if (!event) return;

  state.currentSlide = (state.currentSlide + 1) % event.slides.length;
  updateSliderPosition();
  resetAutoSlide();
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

  state.slideInterval = setInterval(() => nextSlide(), 5000);
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

  // Заполняем информацию
  elements.eventTitle.textContent = event.title;
  elements.eventDate.textContent = event.date;
  elements.eventDescription.textContent = event.description;
  elements.eventPrice.innerHTML = `${event.price} <span>руб.</span>`;

  // Инициализируем слайдер
  initSlider(eventId);

  // Показываем попап
  elements.eventPopup.style.display = "block";
  elements.blurBackground.style.display = "block";
  document.body.classList.add("no-scroll");
}

function closeEventPopup() {
  elements.eventPopup.style.display = "none";
  elements.blurBackground.style.display = "none";
  document.body.classList.remove("no-scroll");

  stopAutoSlide();
  state.currentEventId = null;
  state.currentSlide = 0;
}

function showEventDetails() {
  if (!state.currentEventId) {
    alert("Выберите мероприятие");
    return;
  }

  const event = EVENTS_DATA[state.currentEventId];
  alert(`Переход на страницу: ${event.title}`);

  // Здесь будет редирект на страницу мероприятия
  // window.location.href = `./events.html?id=${state.currentEventId}`;
}

// ========== СТРЕЛКИ КАРТОЧЕК ==========
function handleArrowClick(e) {
  const cardsRow = e.currentTarget.closest(".cards-row");
  if (!cardsRow) return;

  const cardGrid = cardsRow.querySelector(".card-grid");
  if (!cardGrid) return;

  const isPrev =
    e.currentTarget.querySelector('img[alt*="prev"]') ||
    e.currentTarget.querySelector('img[src*="arrow-prev"]');

  if (isPrev) {
    cardGrid.scrollBy({ left: -350, behavior: "smooth" });
  } else {
    cardGrid.scrollBy({ left: 350, behavior: "smooth" });
  }
}

// ========== УТИЛИТЫ ==========
function showSuccessMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.className = "profile-save-message";
  messageElement.innerHTML = `
        <div style="
            background-color: var(--bg-color);
            color: var(--text-color);
            padding: 15px 20px;
            border-radius: 12px;
            text-align: center;
            max-width: 400px;
            border: 2px solid var(--text-color);
            box-shadow: var(--shadow);
        ">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                <div style="
                    width: 24px;
                    height: 24px;
                    background-color: var(--yellow);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid var(--text-color);
                ">
                    <span style="color: var(--text-color); font-weight: bold;">✓</span>
                </div>
                <div style="font-weight: bold; font-size: 16px;">${message}</div>
            </div>
        </div>
    `;

  document.body.appendChild(messageElement);

  setTimeout(() => {
    messageElement.style.animation = "slideOutRight 0.3s ease-out forwards";
    setTimeout(() => {
      if (messageElement.parentNode) {
        document.body.removeChild(messageElement);
      }
    }, 300);
  }, 3000);
}
