import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Groups from './pages/Groups.jsx'
import GroupTasks from './pages/GroupTasks.jsx'
import Guide from './pages/Guide.jsx'
import Developers from './pages/Developers.jsx'
import NotFound from './pages/NotFound.jsx'
import { loadGroups, saveGroups, loadTasks, saveTasks } from './lib/storage.js'

const newId = () => globalThis.crypto?.randomUUID?.() ?? Date.now().toString()

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function App() {
  const location = useLocation()
  const [groups, setGroups] = useState(loadGroups)
  const [tasks, setTasks] = useState(loadTasks)

  useEffect(() => {
    saveGroups(groups)
  }, [groups])

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  // ---- Group handlers ----
  function addGroup(name) {
    const trimmed = (name || '').trim()
    if (!trimmed) return 'Category name cannot be empty.'
    const duplicate = groups.some(
      (g) => g.name.trim().toLowerCase() === trimmed.toLowerCase(),
    )
    if (duplicate) return 'A category with that name already exists.'
    const base = slugify(trimmed) || 'group'
    let id = base
    const existing = new Set(groups.map((g) => g.id))
    let counter = 2
    while (existing.has(id)) {
      id = `${base}-${counter}`
      counter += 1
    }
    setGroups([...groups, { id, name: trimmed }])
    return null
  }

  function deleteGroup(groupId) {
    setGroups(groups.filter((g) => g.id !== groupId))
    setTasks(tasks.filter((t) => t.groupId !== groupId))
  }

  // ---- Task handlers ----
  function addTask(groupId, text) {
    const trimmed = (text || '').trim()
    if (!trimmed) return 'Task text cannot be empty.'
    setTasks([...tasks, { id: newId(), groupId, text: trimmed, done: false }])
    return null
  }

  function toggleTask(taskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    )
  }

  function deleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  function clearGroupTasks(groupId) {
    setTasks(tasks.filter((task) => task.groupId !== groupId))
  }

  function clearAllTasks() {
    setTasks([])
  }

  const sharedProps = {
    groups,
    tasks,
    addGroup,
    deleteGroup,
    addTask,
    toggleTask,
    deleteTask,
    clearGroupTasks,
    clearAllTasks,
  }

  return (
    <div className="min-h-dvh bg-cream">
      <div className="mx-auto flex h-dvh w-full max-w-xl flex-col sm:my-6 sm:h-[calc(100dvh-3rem)] sm:min-h-0 sm:rounded-3xl sm:border sm:border-sand-dark/50 sm:shadow-card">
        <main
          className={`scroll-area safe-x app-pt flex-1 overscroll-contain pb-24 short-screen:pb-6 sm:min-h-0 sm:pb-6 ${
            location.pathname === '/'
              ? '!overflow-hidden home-desktop'
              : 'min-h-0 overflow-y-auto'
          }`}
        >
          <Routes>
            <Route path="/" element={<Home {...sharedProps} />} />
            <Route path="/groups" element={<Groups {...sharedProps} />} />
            <Route path="/groups/:groupId" element={<GroupTasks {...sharedProps} />} />
            <Route path="/categories" element={<Groups {...sharedProps} />} />
            <Route path="/categories/:categoryId" element={<GroupTasks {...sharedProps} />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <div className="safe-x safe-pb fixed inset-x-0 bottom-0 z-10 bg-gradient-to-t from-cream to-transparent pt-4 sm:static sm:shrink-0 sm:bg-none sm:p-4">
          <Navbar />
        </div>
      </div>
    </div>
  )
}