// ========== КОНСТАНТЫ ПУТЕЙ ==========
const STATIC_URL = '/static/';
const IMAGES_PATH = `${STATIC_URL}assets/images/category-events/`;

// ========== КОНСТАНТЫ ДАННЫХ ==========
const EVENT_DATA = {
  title: "ПРИЗРАК ОПЕРЫ",
  fullTitle: "ПРИЗРАК ОПЕРЫ 0+",
  date: "09.02.25 | 19:00",
  address: "ул. Спасская, 12А",
  age: "0+",
  tags: ["#УютнаяАтмосфера", "#ХорошееЗаведение"],
  description: [
    "Шедевр, покоривший сердца миллионов зрителей по всему миру! Почувствуйте магию музыки двух великих композиторов: «Эндрю Ллойда Уэббера и Мори Йестона» — окунитесь в захватывающую историю любви, жизни и смерти.",
    "Основа сюжета — мелодраматические отношения начинающей певицы Кристин и влюблённых в неё покровителя «Оперы» графа де Шандо и её учителя музыки Эрика, имеющего причины скрывать лицо под маской.",
  ],
};

const SLIDES_DATA = [
  { image: `${IMAGES_PATH}1.png`, title: "ПРИЗРАК ОПЕРЫ" },
  { image: `${IMAGES_PATH}2.png`, title: "ПРИЗРАК ОПЕРЫ" },
  { image: `${IMAGES_PATH}3.png`, title: "ПРИЗРАК ОПЕРЫ" },
  { image: `${IMAGES_PATH}4.png`, title: "ПРИЗРАК ОПЕРЫ" },
];

const TICKET_CONFIG = {
  PRICE: 3200,
  DISCOUNT_RATE: 0.15,
  MAX_SELECTED_SEATS: 10,
  OCCUPANCY_CHANCE: 0.2,
  ROWS: 7,
  SEATS_PER_ROW: 14,
};

// ========== ЭЛЕМЕНТЫ DOM ==========
const elements = {
  // Хедер (единая структура)
  headerAvatar: document.querySelector(".header__avatar"),
  headerDropdown: document.querySelector(".header__dropdown"),

  // Слайдер
  mainSlider: document.getElementById("mainSlider"),
  thumbnails: document.getElementById("thumbnails"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),

  // Полноэкранный слайдер
  fullscreenSlider: document.getElementById("fullscreenSlider"),
  fullscreenBg: document.getElementById("fullscreenBg"),
  fullscreenSliderContainer: document.getElementById("fullscreenSliderContainer"),
  fullscreenThumbnails: document.getElementById("fullscreenThumbnails"),
  closeBtn: document.getElementById("closeBtn"),
  fullscreenPrevBtn: document.getElementById("fullscreenPrevBtn"),
  fullscreenNextBtn: document.getElementById("fullscreenNextBtn"),

  // Кнопка покупки билета
  buyTicketBtn: document.getElementById("buyTicketBtn"),

  // Модалки
  seatSelectionModal: document.getElementById("seatSelectionModal"),
  cancelConfirmationModal: document.getElementById("cancelConfirmationModal"),
  paymentMethodModal: document.getElementById("paymentMethodModal"),
  cardPaymentModal: document.getElementById("cardPaymentModal"),
  successModal: document.getElementById("successModal"),

  // Элементы модалки выбора мест
  seatsContainer: document.getElementById("seatsContainer"),
  selectedRow: document.getElementById("selectedRow"),
  selectedSeat: document.getElementById("selectedSeat"),
  totalPrice: document.getElementById("totalPrice"),
  goToPaymentBtn: document.getElementById("goToPaymentBtn"),
  closeSeatModalBtn: document.getElementById("closeSeatModalBtn"),

  // Элементы модалки подтверждения отмены
  cancelCloseBtn: document.getElementById("cancelCloseBtn"),
  confirmCancelBtn: document.getElementById("confirmCancelBtn"),

  // Элементы модалки выбора способа оплаты
  paymentEventTitle: document.getElementById("paymentEventTitle"),
  paymentRow: document.getElementById("paymentRow"),
  paymentSeat: document.getElementById("paymentSeat"),
  paymentAmount: document.getElementById("paymentAmount"),
  paymentMethodBlocks: document.querySelectorAll(".payment-top-block, .payment-side-block"),
  backToSeatsBtn: document.getElementById("backToSeatsBtn"),
  closePaymentMethodBtn: document.getElementById("closePaymentMethodBtn"),

  // Элементы модалки оплаты картой
  cardPaymentAmount: document.getElementById("cardPaymentAmount"),
  backToPaymentMethodBtn: document.getElementById("backToPaymentMethodBtn"),
  processPaymentBtn: document.getElementById("processPaymentBtn"),
  closeCardModalBtn: document.getElementById("closeCardModalBtn"),
  cardNumberInput: document.querySelector('#cardPaymentModal input[placeholder="Введите номер карты"]'),
  expiryInput: document.querySelector('#cardPaymentModal input[placeholder="ММ/ГГ"]'),
  cvcInput: document.querySelector('#cardPaymentModal input[placeholder="CVC"]'),

  // Элементы модалки успеха
  successAmount: document.getElementById("successAmount"),
  paymentNumber: document.getElementById("paymentNumber"),
  returnHomeBtn: document.getElementById("returnHomeBtn"),

  // Информация о событии в модалках
  modalEventTitle: document.getElementById("modalEventTitle"),
  modalEventDate: document.getElementById("modalEventDate"),
  paymentDetails: document.getElementById("paymentDetails"),
};

// ========== СОСТОЯНИЕ ==========
let state = {
  isHeaderMenuOpen: false,
  currentSlide: 0,
  selectedSeats: [],
  selectedPaymentMethod: null,
  currentModal: null,
  modalHistory: [],
  isFullscreenOpen: false,
};

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener("DOMContentLoaded", init);

function init() {
  initSlider();
  generateSeats();
  setupEventListeners();
  updateEventInfoInModals();
}

// ========== ФУНКЦИЯ УПРАВЛЕНИЯ ПРОКРУТКОЙ СТРАНИЦЫ ==========
function toggleBodyScroll(enable) {
  if (enable) {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  } else {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }
}

// ========== ХЕДЕР (МЕНЮ ПОЛЬЗОВАТЕЛЯ) ==========
function initHeaderMenu() {
  if (elements.headerAvatar) {
    elements.headerAvatar.addEventListener("click", toggleHeaderMenu);
    document.addEventListener("click", closeHeaderMenuOnClick);
  }
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

// ========== СЛАЙДЕР ИЗОБРАЖЕНИЙ ==========
function initSlider() {
  if (!elements.mainSlider || !elements.thumbnails) {
    console.error("ERROR: Slider elements not found!");
    return;
  }

  // Очищаем слайдеры
  elements.mainSlider.innerHTML = "";
  elements.thumbnails.innerHTML = "";
  if (elements.fullscreenSliderContainer)
    elements.fullscreenSliderContainer.innerHTML = "";
  if (elements.fullscreenThumbnails)
    elements.fullscreenThumbnails.innerHTML = "";

  // Создаем слайды и миниатюры
  SLIDES_DATA.forEach((slideData, index) => {
    createSlide(slideData, index);
    createThumbnail(slideData, index);
    createFullscreenSlide(slideData, index);
    createFullscreenThumbnail(slideData, index);
  });

  // Инициализируем первый слайд
  updateSlides();
  updateFullscreenBackground();

  // Добавляем обработчики событий
  setupSliderEventListeners();
}

function createSlide(slideData, index) {
  const slide = document.createElement("div");
  slide.className = `slide ${index === 0 ? "active" : ""}`;
  slide.innerHTML = `<img src="${slideData.image}" alt="Slide ${index + 1}">`;
  slide.addEventListener("click", openFullscreen);
  elements.mainSlider.appendChild(slide);
}

function createThumbnail(slideData, index) {
  const thumbnail = document.createElement("div");
  thumbnail.className = `thumbnail ${index === 0 ? "active" : ""}`;
  thumbnail.innerHTML = `<img src="${slideData.image}" alt="Thumbnail ${index + 1}">`;
  thumbnail.addEventListener("click", () => changeSlide(index));
  elements.thumbnails.appendChild(thumbnail);
}

function createFullscreenSlide(slideData, index) {
  if (!elements.fullscreenSliderContainer) return;

  const slide = document.createElement("div");
  slide.className = `fullscreen-slide ${index === 0 ? "active" : ""}`;
  slide.innerHTML = `
    <img src="${slideData.image}" alt="Fullscreen Slide ${index + 1}">
    <div class="image-title">${slideData.title}</div>
  `;
  elements.fullscreenSliderContainer.appendChild(slide);
}

function createFullscreenThumbnail(slideData, index) {
  if (!elements.fullscreenThumbnails) return;

  const thumbnail = document.createElement("div");
  thumbnail.className = `fullscreen-thumbnail ${index === 0 ? "active" : ""}`;
  thumbnail.innerHTML = `<img src="${slideData.image}" alt="Fullscreen Thumbnail ${index + 1}">`;
  thumbnail.addEventListener("click", () => changeFullscreenSlide(index));
  elements.fullscreenThumbnails.appendChild(thumbnail);
}

function setupSliderEventListeners() {
  if (elements.prevBtn) {
    elements.prevBtn.addEventListener("click", () => navigate(-1));
  }

  if (elements.nextBtn) {
    elements.nextBtn.addEventListener("click", () => navigate(1));
  }

  if (elements.closeBtn) {
    elements.closeBtn.addEventListener("click", closeFullscreen);
  }

  if (elements.fullscreenPrevBtn) {
    elements.fullscreenPrevBtn.addEventListener("click", () => navigateFullscreen(-1));
  }

  if (elements.fullscreenNextBtn) {
    elements.fullscreenNextBtn.addEventListener("click", () => navigateFullscreen(1));
  }

  // Закрытие полноэкранного режима по клику на фон
  if (elements.fullscreenSlider) {
    elements.fullscreenSlider.addEventListener("click", (e) => {
      if (e.target === elements.fullscreenSlider) {
        closeFullscreen();
      }
    });
  }

  // Управление клавиатурой в полноэкранном режиме
  document.addEventListener("keydown", (e) => {
    if (!state.isFullscreenOpen) return;

    if (e.key === "Escape") {
      closeFullscreen();
    } else if (e.key === "ArrowLeft") {
      navigateFullscreen(-1);
    } else if (e.key === "ArrowRight") {
      navigateFullscreen(1);
    }
  });
}

function changeSlide(index) {
  state.currentSlide = index;
  updateSlides();
}

function navigate(direction) {
  state.currentSlide = (state.currentSlide + direction + SLIDES_DATA.length) % SLIDES_DATA.length;
  updateSlides();
}

function updateSlides() {
  // Обновляем основные слайды
  document.querySelectorAll(".slide").forEach((slide, i) => {
    slide.classList.toggle("active", i === state.currentSlide);
  });

  // Обновляем миниатюры
  document.querySelectorAll(".thumbnail").forEach((thumb, i) => {
    thumb.classList.toggle("active", i === state.currentSlide);
  });

  // Обновляем полноэкранные слайды
  document.querySelectorAll(".fullscreen-slide").forEach((slide, i) => {
    slide.classList.toggle("active", i === state.currentSlide);
  });

  // Обновляем полноэкранные миниатюры
  document.querySelectorAll(".fullscreen-thumbnail").forEach((thumb, i) => {
    thumb.classList.toggle("active", i === state.currentSlide);
  });

  updateFullscreenBackground();
}

function updateFullscreenBackground() {
  if (elements.fullscreenBg && SLIDES_DATA[state.currentSlide]) {
    elements.fullscreenBg.style.backgroundImage = `url('${SLIDES_DATA[state.currentSlide].image}')`;
  }
}

function openFullscreen() {
  state.isFullscreenOpen = true;
  if (elements.fullscreenSlider) {
    elements.fullscreenSlider.classList.add("active");
  }
  document.body.style.overflow = "hidden";
  updateFullscreenBackground();
}

function closeFullscreen() {
  state.isFullscreenOpen = false;
  if (elements.fullscreenSlider) {
    elements.fullscreenSlider.classList.remove("active");
  }
  document.body.style.overflow = "auto";
}

function navigateFullscreen(direction) {
  navigate(direction);
}

function changeFullscreenSlide(index) {
  changeSlide(index);
}

// ========== СИСТЕМА ПОКУПКИ БИЛЕТОВ ==========
function generateSeats() {
  if (!elements.seatsContainer) return;

  elements.seatsContainer.innerHTML = "";

  for (let row = 1; row <= TICKET_CONFIG.ROWS; row++) {
    for (let seatNum = 1; seatNum <= TICKET_CONFIG.SEATS_PER_ROW; seatNum++) {
      const seat = document.createElement("div");
      seat.className = "seat";
      seat.textContent = seatNum;
      seat.dataset.row = row;
      seat.dataset.seat = seatNum;

      // Случайно делаем некоторые места занятыми
      if (Math.random() < TICKET_CONFIG.OCCUPANCY_CHANCE) {
        seat.classList.add("occupied");
      } else {
        seat.addEventListener("click", toggleSeatSelection);
      }

      elements.seatsContainer.appendChild(seat);
    }
  }
}

function toggleSeatSelection(event) {
  const seat = event.target;
  if (seat.classList.contains("occupied")) return;

  const row = seat.dataset.row;
  const seatNum = seat.dataset.seat;
  const seatId = `R${row}S${seatNum}`;

  if (seat.classList.contains("selected")) {
    seat.classList.remove("selected");
    state.selectedSeats = state.selectedSeats.filter((s) => s !== seatId);
  } else {
    if (state.selectedSeats.length >= TICKET_CONFIG.MAX_SELECTED_SEATS) {
      alert(`Можно выбрать не более ${TICKET_CONFIG.MAX_SELECTED_SEATS} мест`);
      return;
    }
    seat.classList.add("selected");
    state.selectedSeats.push(seatId);
  }

  updateSelectedSeatsInfo();
}

function parseSeatId(seatId) {
  const match = seatId.match(/R(\d+)S(\d+)/);
  return match ? { row: match[1], seat: match[2] } : null;
}

function updateSelectedSeatsInfo() {
  if (!elements.selectedRow || !elements.selectedSeat || !elements.totalPrice) return;

  if (!state.selectedSeats.length) {
    elements.selectedRow.textContent = "-";
    elements.selectedSeat.textContent = "-";
    elements.totalPrice.textContent = "0";
    return;
  }

  const rows = [];
  const seats = [];

  state.selectedSeats.forEach((id) => {
    const parsed = parseSeatId(id);
    if (parsed) {
      rows.push(parsed.row);
      seats.push(parsed.seat);
    }
  });

  elements.selectedRow.textContent = rows.join(", ");
  elements.selectedSeat.textContent = seats.join(", ");

  const total = TICKET_CONFIG.PRICE * state.selectedSeats.length;
  elements.totalPrice.textContent = total;
}

function updateEventInfoInModals() {
  if (elements.modalEventTitle) {
    elements.modalEventTitle.textContent = EVENT_DATA.fullTitle;
  }

  if (elements.modalEventDate) {
    elements.modalEventDate.textContent = EVENT_DATA.date;
  }

  if (elements.paymentEventTitle) {
    elements.paymentEventTitle.textContent = EVENT_DATA.fullTitle;
  }
}

// ========== УПРАВЛЕНИЕ МОДАЛЬНЫМИ ОКНАМИ ==========
function openSeatSelectionModal() {
  closeAllModals();
  state.modalHistory = ["seatSelectionModal"];
  if (elements.seatSelectionModal) {
    elements.seatSelectionModal.style.display = "flex";
  }
  toggleBodyScroll(false);
  updateSelectedSeatsInfo();
}

function goToPaymentMethod() {
  if (state.selectedSeats.length === 0) {
    alert("Пожалуйста, выберите хотя бы одно место");
    return;
  }

  if (elements.seatSelectionModal) {
    elements.seatSelectionModal.style.display = "none";
  }
  
  if (elements.paymentMethodModal) {
    elements.paymentMethodModal.style.display = "flex";
  }

  // Обновляем информацию о выбранных местах
  const rows = [], seats = [];
  state.selectedSeats.forEach((id) => {
    const p = parseSeatId(id);
    if (p) {
      rows.push(p.row);
      seats.push(p.seat);
    }
  });

  if (elements.paymentRow) elements.paymentRow.textContent = rows.join(", ");
  if (elements.paymentSeat) elements.paymentSeat.textContent = seats.join(", ");

  // Обновляем цену
  const total = TICKET_CONFIG.PRICE * state.selectedSeats.length;
  if (elements.paymentAmount) elements.paymentAmount.textContent = total;
  if (elements.cardPaymentAmount) elements.cardPaymentAmount.textContent = total;

  state.modalHistory.push("paymentMethodModal");
}

function goBackToSeats() {
  if (elements.paymentMethodModal) {
    elements.paymentMethodModal.style.display = "none";
  }
  if (elements.seatSelectionModal) {
    elements.seatSelectionModal.style.display = "flex";
  }
  state.modalHistory.pop();
}

function selectPaymentMethod(element, method) {
  // Снимаем выделение со всех методов
  if (elements.paymentMethodBlocks) {
    elements.paymentMethodBlocks.forEach((el) => {
      el.classList.remove("selected");
    });
  }

  // Выделяем выбранный метод
  element.classList.add("selected");
  state.selectedPaymentMethod = method;

  if (method === "card") {
    setTimeout(() => {
      if (elements.paymentMethodModal) {
        elements.paymentMethodModal.style.display = "none";
      }
      if (elements.cardPaymentModal) {
        elements.cardPaymentModal.style.display = "flex";
      }
      state.modalHistory.push("cardPaymentModal");
    }, 300);
  }
}

function goBackToPaymentMethod() {
  if (elements.cardPaymentModal) {
    elements.cardPaymentModal.style.display = "none";
  }
  if (elements.paymentMethodModal) {
    elements.paymentMethodModal.style.display = "flex";
  }
  state.modalHistory.pop();
}

function processPayment() {
  if (!validateCardForm()) {
    return;
  }

  if (elements.cardPaymentModal) {
    elements.cardPaymentModal.style.display = "none";
  }
  
  if (elements.successModal) {
    elements.successModal.style.display = "flex";
  }

  // Рассчитываем итоговую сумму со скидкой
  const total = TICKET_CONFIG.PRICE * state.selectedSeats.length;
  const finalAmount = Math.round(total * (1 - TICKET_CONFIG.DISCOUNT_RATE));

  if (elements.successAmount) {
    elements.successAmount.textContent = `${finalAmount} ₽`;
  }
  
  if (elements.paymentNumber) {
    elements.paymentNumber.textContent = `#${Math.floor(Math.random() * 100000000) + 1}`;
  }

  state.modalHistory.push("successModal");
}

function showCancelConfirmation(modalId) {
  state.currentModal = modalId;
  const targetModal = document.getElementById(modalId);
  if (targetModal) targetModal.style.display = "none";
  
  if (elements.cancelConfirmationModal) {
    elements.cancelConfirmationModal.style.display = "flex";
  }
}

function closeCancelConfirmation() {
  if (elements.cancelConfirmationModal) {
    elements.cancelConfirmationModal.style.display = "none";
  }
  
  if (state.currentModal) {
    const target = document.getElementById(state.currentModal);
    if (target) target.style.display = "flex";
  }
}

function closeAllModals() {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.style.display = "none";
  });

  // Сбрасываем состояние
  state.selectedSeats = [];
  state.selectedPaymentMethod = null;
  state.currentModal = null;
  state.modalHistory = [];

  // Восстанавливаем прокрутку страницы
  toggleBodyScroll(true);

  // Снимаем выделение с мест
  document.querySelectorAll(".seat.selected").forEach((seat) => {
    seat.classList.remove("selected");
  });

  // Снимаем выделение с методов оплаты
  if (elements.paymentMethodBlocks) {
    elements.paymentMethodBlocks.forEach((el) => {
      el.classList.remove("selected");
    });
  }

  updateSelectedSeatsInfo();
}

// ========== ВАЛИДАЦИЯ ФОРМЫ ОПЛАТЫ КАРТОЙ ==========
function formatCardNumber(input) {
  let value = input.value.replace(/\D/g, "");
  if (value.length > 19) value = value.substring(0, 19);
  const formatted = value.replace(/(\d{4})/g, "$1 ").trim();
  input.value = formatted;
}

function formatExpiry(input) {
  let value = input.value.replace(/\D/g, "");
  if (value.length > 4) value = value.substring(0, 4);
  if (value.length >= 3) {
    value = value.substring(0, 2) + "/" + value.substring(2);
  }
  input.value = value;
}

function formatCvc(input) {
  let value = input.value.replace(/\D/g, "");
  if (value.length > 3) value = value.substring(0, 3);
  input.value = value;
}

function validateCardForm() {
  if (!elements.cardNumberInput || !elements.expiryInput || !elements.cvcInput) {
    return false;
  }

  const cardNumber = elements.cardNumberInput.value.replace(/\s/g, "");
  const expiry = elements.expiryInput.value;
  const cvc = elements.cvcInput.value;

  if (cardNumber.length < 16) {
    alert("Введите корректный номер карты (минимум 16 цифр)");
    return false;
  }

  if (!/^\d{2}\/\d{2}$/.test(expiry)) {
    alert("Введите срок действия в формате ММ/ГГ");
    return false;
  }

  const [month, year] = expiry.split("/").map(Number);
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    alert("Срок действия карты истёк");
    return false;
  }

  if (cvc.length < 3) {
    alert("Введите CVC (3 цифры)");
    return false;
  }

  return true;
}

// ========== ОБРАБОТЧИКИ СОБЫТИЙ ==========
function setupEventListeners() {
  // Хедер
  initHeaderMenu();

  // Кнопка покупки билета
  if (elements.buyTicketBtn) {
    elements.buyTicketBtn.addEventListener("click", openSeatSelectionModal);
  }

  // Модалка выбора мест
  if (elements.goToPaymentBtn) {
    elements.goToPaymentBtn.addEventListener("click", goToPaymentMethod);
  }

  if (elements.closeSeatModalBtn) {
    elements.closeSeatModalBtn.addEventListener("click", () => {
      showCancelConfirmation("seatSelectionModal");
    });
  }

  // Модалка подтверждения отмены
  if (elements.cancelCloseBtn) {
    elements.cancelCloseBtn.addEventListener("click", closeCancelConfirmation);
  }

  if (elements.confirmCancelBtn) {
    elements.confirmCancelBtn.addEventListener("click", closeAllModals);
  }

  // Модалка выбора способа оплаты
  if (elements.backToSeatsBtn) {
    elements.backToSeatsBtn.addEventListener("click", goBackToSeats);
  }

  if (elements.closePaymentMethodBtn) {
    elements.closePaymentMethodBtn.addEventListener("click", () => {
      showCancelConfirmation("paymentMethodModal");
    });
  }

  // Обработчики выбора метода оплаты
  if (elements.paymentMethodBlocks) {
    elements.paymentMethodBlocks.forEach((block) => {
      block.addEventListener("click", () => {
        const method = block.dataset.method;
        selectPaymentMethod(block, method);
      });
    });
  }

  // Модалка оплаты картой
  if (elements.backToPaymentMethodBtn) {
    elements.backToPaymentMethodBtn.addEventListener("click", goBackToPaymentMethod);
  }

  if (elements.processPaymentBtn) {
    elements.processPaymentBtn.addEventListener("click", processPayment);
  }

  if (elements.closeCardModalBtn) {
    elements.closeCardModalBtn.addEventListener("click", () => {
      showCancelConfirmation("cardPaymentModal");
    });
  }

  // Форматирование ввода карты
  if (elements.cardNumberInput) {
    elements.cardNumberInput.addEventListener("input", (e) => formatCardNumber(e.target));
  }

  if (elements.expiryInput) {
    elements.expiryInput.addEventListener("input", (e) => formatExpiry(e.target));
  }

  if (elements.cvcInput) {
    elements.cvcInput.addEventListener("input", (e) => formatCvc(e.target));
  }

  // Модалка успеха
  if (elements.returnHomeBtn) {
    elements.returnHomeBtn.addEventListener("click", () => {
      closeAllModals();
      window.location.href = "./home.html";
    });
  }
}