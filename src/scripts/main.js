
import { renderTimeline } from './events.js';
import { loadEvents, saveEvents } from './storage.js';
import {
  loadTasks,
  saveTasks,
  renderTasks,
} from './tasks.js';

// ==========================================
// 1. ЭЛЕМЕНТЫ ИНТЕРФЕЙСА
// ==========================================

// Элементы событий
const addEventButton = document.querySelector('.add-event-button');
const todayButton = document.querySelector('.today-button');
const modal = document.querySelector('#event-modal');
const closeModalButton = document.querySelector('.close-modal');
const cancelButton = document.querySelector('.cancel-button');
const eventForm = document.querySelector('#event-form');

const dateInput = document.querySelector('#event-date');
const startInput = document.querySelector('#event-start');
const endInput = document.querySelector('#event-end');
const titleInput = document.querySelector('#event-title');
const categoryInput = document.querySelector('#event-category');
const descriptionInput = document.querySelector('#event-description');

const modalTitle = document.querySelector('.modal-header h2');
const saveButton = document.querySelector('.save-button');
const dateHeading = document.querySelector('.schedule-header h2');
const eventError = document.querySelector('#event-error');

// Элементы задач
const addTaskButton = document.querySelector('#add-task-button');
const taskForm = document.querySelector('#task-form');
const taskTitleInput = document.querySelector('#task-title');
const taskSubmitButton = document.querySelector('#task-submit-button');
const taskCancelButton = document.querySelector('#task-cancel-button');
const taskError = document.querySelector('#task-error');
const confirmModal = document.querySelector('#confirm-modal');
const confirmTitle = document.querySelector('#confirm-title');
const confirmMessage = document.querySelector('#confirm-message');

const confirmDeleteButton = document.querySelector('#confirm-delete');
const confirmCancelButton = document.querySelector('#confirm-cancel');
const confirmCloseButton = document.querySelector('#confirm-close');

let confirmCallback = null;


// ==========================================
// 2. СОСТОЯНИЕ ПРИЛОЖЕНИЯ
// ==========================================

let selectedDate = getLocalDate();

let displayedMonth = new Date(
  Number(selectedDate.slice(0, 4)),
  Number(selectedDate.slice(5, 7)) - 1,
  1
);

const calendarGrid = document.querySelector('.calendar-grid');
const calendarMonth = document.querySelector('#calendar-month');
const prevMonthButton = document.querySelector('#prev-month');
const nextMonthButton = document.querySelector('#next-month');

let events = loadEvents();
let editingEventId = null;

let tasks = loadTasks();
let editingTaskId = null;

// ==========================================
// 3. РАБОТА С ДАТОЙ
// ==========================================

function getLocalDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function updateDateHeading() {
  const [year, month, day] = selectedDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  dateHeading.textContent = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

// ==========================================
// 4. ОТОБРАЖЕНИЕ СОБЫТИЙ
// ==========================================

function updateTimeline() {
  updateDateHeading();

  renderTimeline(
    events,
    selectedDate,
    openEditModal,
    deleteEvent
  );
}


function renderCalendar() {
  // Удаляем старые даты, сохраняя дни недели
  calendarGrid.querySelectorAll('.day, .empty').forEach(cell => {
    cell.remove();
  });

  const year = displayedMonth.getFullYear();
  const month = displayedMonth.getMonth();

  // Название месяца
  calendarMonth.textContent = displayedMonth.toLocaleDateString(
    'en-US',
    {
      month: 'long',
      year: 'numeric',
    }
  );

  // Количество дней в месяце
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // День недели первого числа (понедельник = 0)
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;

  // Пустые ячейки перед первым числом
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('span');
    empty.classList.add('empty');
    calendarGrid.append(empty);
  }

  // Создаём кнопки с датами
  for (let day = 1; day <= daysInMonth; day++) {
    const button = document.createElement('button');

    button.type = 'button';
    button.classList.add('day');
    button.textContent = day;

    const date = [
      year,
      String(month + 1).padStart(2, '0'),
      String(day).padStart(2, '0'),
    ].join('-');

    if (date === selectedDate) {
      button.classList.add('selected');
    }

    button.addEventListener('click', () => {
      selectedDate = date;
      renderCalendar();
      updateTimeline();
      updateTasks();
    });

    calendarGrid.append(button);
  }
}


// ==========================================
// 5. СОЗДАНИЕ И РЕДАКТИРОВАНИЕ СОБЫТИЙ
// ==========================================

function openModal() {
  editingEventId = null;
  eventForm.reset();

  dateInput.value = selectedDate;

  modalTitle.textContent = 'New event';
  saveButton.textContent = 'Save event';

  modal.hidden = false;
}

function openEditModal(eventId) {
  const event = events.find(item => item.id === eventId);

  if (!event) return;

  editingEventId = eventId;

  titleInput.value = event.title;
  dateInput.value = event.date;
  startInput.value = event.start;
  endInput.value = event.end;
  categoryInput.value = event.category;
  descriptionInput.value = event.description || '';

  modalTitle.textContent = 'Edit event';
  saveButton.textContent = 'Save changes';

  modal.hidden = false;
}

function closeModal() {
  modal.hidden = true;
  eventForm.reset();
  editingEventId = null;
  clearEventError();
}

// ==========================================
// 6. УДАЛЕНИЕ И ПРОВЕРКА СОБЫТИЙ
// ==========================================

function deleteEvent(eventId) {
  const event = events.find(event => event.id === eventId);

  if (!event) return;

  openConfirmModal(
    'Delete event?',
    `Are you sure you want to delete "${event.title}"?`,
    () => {
      events = events.filter(event => event.id !== eventId);

      saveEvents(events);
      updateTimeline();
    }
  );
}

function hasTimeConflict(newEvent) {
  return events.some(event => {
    if (
      event.date !== newEvent.date ||
      event.id === editingEventId
    ) {
      return false;
    }

    return newEvent.start < event.end &&
      newEvent.end > event.start;
  });
}

function showEventError(message) {
  eventError.textContent = message;
  eventError.hidden = false;
}

function clearEventError() {
  eventError.textContent = '';
  eventError.hidden = true;
}

function showTaskError(message) {
  taskError.textContent = message;
  taskError.hidden = false;
}

function clearTaskError() {
  taskError.textContent = '';
  taskError.hidden = true;
}

function openConfirmModal(title, message, callback) {
  confirmTitle.textContent = title;
  confirmMessage.textContent = message;

  confirmCallback = callback;

  confirmModal.hidden = false;
}

function closeConfirmModal() {
  confirmModal.hidden = true;
  confirmCallback = null;
}

confirmDeleteButton.addEventListener('click', () => {
  if (confirmCallback) {
    confirmCallback();
  }

  closeConfirmModal();
});

confirmCancelButton.addEventListener('click', closeConfirmModal);
confirmCloseButton.addEventListener('click', closeConfirmModal);

confirmModal.addEventListener('click', (event) => {
  if (event.target === confirmModal) {
    closeConfirmModal();
  }
});

// ==========================================
// Уникальные функции для подтвержения удаления события или задачи
// ==========================================

function openConfirmModal(title, message, callback) {
  confirmTitle.textContent = title;
  confirmMessage.textContent = message;

  confirmCallback = callback;

  confirmModal.hidden = false;
}

function closeConfirmModal() {
  confirmModal.hidden = true;
  confirmCallback = null;
}

confirmDeleteButton.addEventListener('click', () => {
  if (confirmCallback) {
    confirmCallback();
  }

  closeConfirmModal();
});

confirmCancelButton.addEventListener('click', closeConfirmModal);
confirmCloseButton.addEventListener('click', closeConfirmModal);

confirmModal.addEventListener('click', (event) => {
  if (event.target === confirmModal) {
    closeConfirmModal();
  }
});

// ==========================================
// 7. СОХРАНЕНИЕ СОБЫТИЙ
// ==========================================


function handleEventSubmit(event) {
  event.preventDefault();
  clearEventError();

  const newEvent = {
    id: editingEventId || crypto.randomUUID(),
    title: titleInput.value.trim(),
    date: dateInput.value,
    start: startInput.value,
    end: endInput.value,
    category: categoryInput.value,
    description: descriptionInput.value.trim(),
  };

  // Проверяем обязательные поля
  if (
    !newEvent.title ||
    !newEvent.date ||
    !newEvent.start ||
    !newEvent.end
  ) {
    showEventError('Please fill in all required fields.');
    return;
  }

  // Проверяем корректность даты
  const date = new Date(`${newEvent.date}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    showEventError('Please enter a valid date.');
    return;
  }

  // Проверяем формат времени
  const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

  if (
    !timePattern.test(newEvent.start) ||
    !timePattern.test(newEvent.end)
  ) {
    showEventError('Please enter valid times.');
    return;
  }

  // Расписание начинается в 06:00
  if (newEvent.start < '06:00') {
    showEventError('Events cannot start before 06:00.');
    return;
  }

  // Проверяем продолжительность события
  if (newEvent.end <= newEvent.start) {
    showEventError('End time must be later than start time.');
    return;
  }

  if (hasTimeConflict(newEvent)) {
    showEventError('This event overlaps with another event.');
    return;
  }

  if (editingEventId) {
    events = events.map(event =>
      event.id === editingEventId ? newEvent : event
    );
  } else {
    events.push(newEvent);
  }

  saveEvents(events);

  // Переключаемся на дату события
  selectedDate = newEvent.date;

  displayedMonth = new Date(
    Number(selectedDate.slice(0, 4)),
    Number(selectedDate.slice(5, 7)) - 1,
    1
  );

  renderCalendar();
  updateTimeline();
  updateTasks();

  closeModal();
}


// ==========================================
// 8. ОТОБРАЖЕНИЕ ЗАДАЧ
// ==========================================

function updateTasks() {
  const hasUndatedTasks = tasks.some(task => !task.date);

  if (hasUndatedTasks) {
    tasks = tasks.map(task => ({
      ...task,
      date: task.date || selectedDate,
    }));

    saveTasks(tasks);
  }

  const dayTasks = tasks.filter(
    task => task.date === selectedDate
  );

  const completedCount = dayTasks.filter(
    task => task.completed
  ).length;

  const totalCount = dayTasks.length;
  const remainingCount = totalCount - completedCount;

  document.querySelector('#tasks-count').textContent =
    `${totalCount} tasks`;

  document.querySelector('#tasks-completed').textContent =
    `${completedCount} completed · ${remainingCount} remaining`;

  const progress = totalCount === 0
    ? 0
    : (completedCount / totalCount) * 100;

  document.querySelector('#progress-fill').style.width =
    `${progress}%`;

  renderTasks(
    dayTasks,
    toggleTask,
    openEditTaskForm,
    deleteTask
  );
}

// ==========================================
// 9. СОЗДАНИЕ И РЕДАКТИРОВАНИЕ ЗАДАЧ
// ==========================================

function openTaskForm() {
  editingTaskId = null;

  taskForm.reset();

  taskForm.hidden = false;
  taskSubmitButton.textContent = 'Add';

  taskTitleInput.focus();
}

function openEditTaskForm(taskId) {
  const task = tasks.find(item => item.id === taskId);

  if (!task) return;

  editingTaskId = taskId;

  taskTitleInput.value = task.title;

  taskSubmitButton.textContent = 'Save changes';
  taskForm.hidden = false;

  taskTitleInput.focus();
}

function closeTaskForm() {
  taskForm.hidden = true;
  taskForm.reset();
  editingTaskId = null;
  clearTaskError();
}
// ==========================================
// 10. СОХРАНЕНИЕ ЗАДАЧ
// ==========================================


function handleTaskSubmit(event) {
  event.preventDefault();

  clearTaskError();

  const title = taskTitleInput.value.trim();

  if (!title) {
    showTaskError('Please enter a task name.');
    return;
  }

  if (editingTaskId) {
    tasks = tasks.map(task =>
      task.id === editingTaskId
        ? { ...task, title }
        : task
    );
  } else {
    tasks.push({
      id: crypto.randomUUID(),
      title,
      completed: false,
      date: selectedDate,
    });
  }

  saveTasks(tasks);
  updateTasks();
  closeTaskForm();
}


// ==========================================
// 11. ОТМЕТКА ВЫПОЛНЕНИЯ ЗАДАЧ
// ==========================================

function toggleTask(taskId) {
  tasks = tasks.map(task =>
    task.id === taskId
      ? { ...task, completed: !task.completed }
      : task
  );

  saveTasks(tasks);
  updateTasks();
}

// ==========================================
// 12. УДАЛЕНИЕ ЗАДАЧ
// ==========================================

function deleteTask(taskId) {
  const task = tasks.find(task => task.id === taskId);

  if (!task) return;

  openConfirmModal(
    'Delete task?',
    `Are you sure you want to delete "${task.title}"?`,
    () => {
      tasks = tasks.filter(task => task.id !== taskId);

      saveTasks(tasks);
      updateTasks();
    }
  );
}

// ==========================================
// 13. ОБРАБОТЧИКИ СОБЫТИЙ И ИНТЕРФЕЙСА
// ==========================================

// События
addEventButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
cancelButton.addEventListener('click', closeModal);
eventForm.addEventListener('submit', handleEventSubmit);

// Кнопка Today
todayButton.addEventListener('click', () => {
  selectedDate = getLocalDate();

  displayedMonth = new Date(
    Number(selectedDate.slice(0, 4)),
    Number(selectedDate.slice(5, 7)) - 1,
    1
  );

  renderCalendar();
  updateTimeline();
  updateTasks();
});

// Закрытие модального окна при клике вне него
modal.addEventListener('click', event => {
  if (event.target === modal) {
    closeModal();
  }
});

// Задачи
addTaskButton.addEventListener('click', openTaskForm);
taskCancelButton.addEventListener('click', closeTaskForm);
taskForm.addEventListener('submit', handleTaskSubmit);

// Закрытие форм клавишей Escape
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (!modal.hidden) closeModal();
    if (!taskForm.hidden) closeTaskForm();
  }
});

// Oбработчики переключения месяцев
prevMonthButton.addEventListener('click', () => {
  displayedMonth.setMonth(displayedMonth.getMonth() - 1);
  renderCalendar();
});

nextMonthButton.addEventListener('click', () => {
  displayedMonth.setMonth(displayedMonth.getMonth() + 1);
  renderCalendar();
});

// ==========================================
// 14. ПЕРВОНАЧАЛЬНАЯ ЗАГРУЗКА
// ==========================================

updateTimeline();
updateTasks();
renderCalendar();