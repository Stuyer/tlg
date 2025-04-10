// Функция для извлечения значения критерия
function getCriterionValue(popup, criterion) {
    const valueText = popup.querySelector(`.${criterion}`).textContent;
    return parseFloat(valueText);
}

// Функция для сортировки кнопок по выбранному критерию
function sortButtonsByCriteria() {
    const container = document.getElementById('buttons-container');
    const buttons = Array.from(container.children);
    const selectedCriterion = document.getElementById('sort-criteria').value;

    buttons.sort((a, b) => {
        const valueA = getCriterionValue(a.querySelector('.popup'), selectedCriterion);
        const valueB = getCriterionValue(b.querySelector('.popup'), selectedCriterion);
        return valueB - valueA; // Сортировка по убыванию
    });

    // Очищаем контейнер и добавляем отсортированные кнопки
    container.innerHTML = '';
    buttons.forEach(button => container.appendChild(button));
}

// Функции для показа/скрытия попапа
function showPopup(id) {
    const popup = document.getElementById(id);
    popup.classList.add('active');
}

function hidePopup(id) {
    const popup = document.getElementById(id);
    // Проверяем, находится ли курсор на попапе
    if (!popup.matches(':hover')) {
        popup.classList.remove('active');
    }
}

// Назначаем обработчики для всех кнопок
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseover', () => {
        const popupId = button.getAttribute('onmouseover').match(/'(.*?)'/)[1];
        showPopup(popupId);
    });

    button.addEventListener('mouseout', () => {
        const popupId = button.getAttribute('onmouseout').match(/'(.*?)'/)[1];
        hidePopup(popupId);
    });
});

// Назначаем обработчики для всех попапов
document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('mouseout', () => {
        const popupId = popup.id;
        hidePopup(popupId);
    });
});

// Сортировка при загрузке страницы
window.onload = sortButtonsByCriteria;

// Функция для плавного скроллинга вверх
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Плавный скроллинг
    });
}

// Функция для отображения/скрытия кнопки
function toggleScrollButton() {
    const scrollButton = document.getElementById('scroll-to-top');
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    
    // Показываем кнопку, если прокрутили больше 300px
    if (scrollPosition > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
}

function alignTextWithButtons() {
    const buttons = document.querySelectorAll('#buttons-container .btn'); // Все кнопки
    const texts = document.querySelectorAll('#text-container .numeration'); // Все тексты
    const contentContainer = document.querySelector('.content-container'); // Общий контейнер

    buttons.forEach((button, index) => {
        const buttonRect = button.getBoundingClientRect(); // Позиция кнопки
        const containerRect = contentContainer.getBoundingClientRect(); // Позиция общего контейнера
        const text = texts[index]; // Соответствующий текст

        if (text) {
            // Выравниваем текст чуть выше центра кнопки
            const offset = 45; // На сколько пикселей выше
            text.style.top = `${buttonRect.top - containerRect.top + buttonRect.height / 2 - offset}px`;
            text.style.left = `${buttonRect.left - containerRect.left - 100}px`; // Сдвигаем текст влево
            text.style.opacity = 1; // Показываем текст
        }
    });
}

// Функция для переключения темы
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// При загрузке страницы
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('theme-toggle').checked = true;
}

// Назначаем обработчик для переключателя темы
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('change', toggleTheme);

// Выравниваем текст при загрузке страницы и при изменении размера окна
window.addEventListener('load', alignTextWithButtons);
window.addEventListener('resize', alignTextWithButtons);

// Назначаем обработчик события прокрутки
window.addEventListener('scroll', toggleScrollButton);

// Назначаем обработчик клика на кнопку
document.getElementById('scroll-to-top').addEventListener('click', scrollToTop);