const START_HOUR = 6;
const END_HOUR = 24;
const HOUR_HEIGHT = 64;

export function renderTimeline(events, selectedDate, onEdit, onDelete) {
  const timeline = document.querySelector('#timeline');

  timeline.innerHTML = '';

  for (let hour = START_HOUR; hour < END_HOUR; hour++) {
    const row = document.createElement('div');

    row.classList.add('time-row');
    row.innerHTML = `
      <span>${String(hour).padStart(2, '0')}:00</span>
      <div></div>
    `;

    timeline.append(row);
  }

  const dayEvents = events.filter(event => event.date === selectedDate);

  dayEvents.forEach(event => {
    const [startHour, startMinute] = event.start.split(':').map(Number);
    const [endHour, endMinute] = event.end.split(':').map(Number);

    const start = startHour * 60 + startMinute;
    const end = endHour * 60 + endMinute;

    const top = ((start - START_HOUR * 60) / 60) * HOUR_HEIGHT;
    const height = ((end - start) / 60) * HOUR_HEIGHT;

    const card = document.createElement('article');

    card.classList.add('event', `event-${event.category}`);
    card.style.top = `${top}px`;
    card.style.height = `${height}px`;

    const title = document.createElement('h3');
    title.textContent = event.title;

    const time = document.createElement('p');
    time.textContent = `${event.start} — ${event.end}`;

    const actions = document.createElement('div');
    actions.classList.add('event-actions');

    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => onEdit(event.id));

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => onDelete(event.id));

    actions.append(editButton, deleteButton);
    card.append(title, time, actions);

    if (event.description) {
      const description = document.createElement('p');
      description.textContent = event.description;
      card.append(description);
    }

    timeline.append(card);
  });
}