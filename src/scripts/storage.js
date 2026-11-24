const STORAGE_KEY = 'daily-planner-events';

export function loadEvents() {
  try {
    const savedEvents = localStorage.getItem(STORAGE_KEY);

    return savedEvents ? JSON.parse(savedEvents) : [];
  } catch (error) {
    console.error('Failed to load events:', error);

    return [];
  }
}

export function saveEvents(events) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    console.error('Failed to save events:', error);
  }
}