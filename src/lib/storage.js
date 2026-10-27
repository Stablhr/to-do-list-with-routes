const GROUPS_KEY = 'todo.groups.v1'
const TASKS_KEY = 'todo.tasks.v1'

export const DEFAULT_GROUPS = [
  { id: 'school-activities', name: 'School Activities' },
  { id: 'personal-tasks', name: 'Personal Tasks' },
  { id: 'projects', name: 'Projects' },
  { id: 'daily-tasks', name: 'Daily Tasks' },
]

function isTask(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.text === 'string' &&
    value.text.trim() !== ''
  )
}

export function loadGroups() {
  try {
    const raw = window.localStorage.getItem(GROUPS_KEY)
    if (!raw) return DEFAULT_GROUPS
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return DEFAULT_GROUPS
    const groups = parsed
      .filter(
        (g) =>
          typeof g === 'object' &&
          g !== null &&
          typeof g.id === 'string' &&
          g.id.trim() !== '' &&
          typeof g.name === 'string' &&
          g.name.trim() !== '',
      )
      .map((g) => ({ id: g.id.trim(), name: g.name.trim() }))
    return groups.length ? groups : DEFAULT_GROUPS
  } catch {
    return DEFAULT_GROUPS
  }
}

export function saveGroups(groups) {
  try {
    window.localStorage.setItem(GROUPS_KEY, JSON.stringify(groups))
  } catch {
    // Storage unavailable — the app still works in memory.
  }
}

export function loadTasks() {
  try {
    const raw = window.localStorage.getItem(TASKS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(isTask)
      .map((task, index) => ({
        id:
          typeof task.id === 'number' || typeof task.id === 'string'
            ? task.id
            : index,
        // Migrate older tasks that have no groupId into the Daily Tasks group.
        groupId:
          typeof task.groupId === 'string' && task.groupId.trim() !== ''
            ? task.groupId.trim()
            : 'daily-tasks',
        text: task.text,
        done: task.done === true,
      }))
  } catch {
    return []
  }
}

export function saveTasks(tasks) {
  try {
    window.localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
  } catch {
    // Storage unavailable — the app still works in memory.
  }
}