
const STORAGE_KEY = 'daily-planner-tasks';

// Получаем сохранённые задачи
export function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error('Failed to load tasks:', error);
    return [];
  }
}

// Сохраняем задачи
export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks:', error);
  }
}

// Отображаем список задач
export function renderTasks(tasks, onToggle, onEdit, onDelete) {
  const taskList = document.querySelector('#task-list');

  taskList.innerHTML = '';

  tasks.forEach(task => {
    const item = document.createElement('li');
    item.classList.add('task-item');

    if (task.completed) {
      item.classList.add('completed');
    }

    // Название и отметка выполнения
    const label = document.createElement('label');
    label.classList.add('task-label');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    checkbox.addEventListener('change', () => {
      onToggle(task.id);
    });

    const title = document.createElement('span');
    title.textContent = task.title;

    label.append(checkbox, title);

    // Кнопки редактирования и удаления
    const actions = document.createElement('div');
    actions.classList.add('task-actions');

    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.textContent = 'Edit';

    editButton.addEventListener('click', () => {
      onEdit(task.id);
    });

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', () => {
      onDelete(task.id);
    });

    actions.append(editButton, deleteButton);

    item.append(label, actions);
    taskList.append(item);
  });
}
