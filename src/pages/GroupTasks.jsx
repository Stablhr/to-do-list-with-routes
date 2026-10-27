import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header.jsx'
import ProgressStrip from '../components/ProgressStrip.jsx'
import TaskInput from '../components/TaskInput.jsx'
import TaskList from '../components/TaskList.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function GroupTasks({
  groups,
  tasks,
  addTask,
  toggleTask,
  deleteTask,
  clearGroupTasks,
  openGuide,
}) {
  const { groupId, categoryId } = useParams()
  const resolvedGroupId = groupId || categoryId
  const group = groups.find((g) => g.id === resolvedGroupId)

  const [input, setInput] = useState('')

  if (!group) {
    return (
      <div className="flex flex-col gap-5 px-0 py-2">
        <Header title="Category not found" onGuideClick={openGuide} />
        <section className="rounded-3xl bg-sand/60 p-5 text-center">
          <p className="text-mocha">
            We couldn't find a category with that name. It may have been removed.
          </p>
          <Link
            to="/categories"
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-2xl bg-latte px-5 py-3 font-medium text-white shadow-btn transition-[background-color,transform] duration-150 ease-out hover:bg-latte-dark active:scale-95 focus-visible:ring-2 focus-visible:ring-latte-dark/60 focus-visible:outline-none"
          >
            ← Back to Categories
          </Link>
        </section>
      </div>
    )
  }

  const groupTasks = tasks.filter((t) => t.groupId === resolvedGroupId)
  const ordered = [...groupTasks].sort(
    (a, b) => Number(a.done) - Number(b.done),
  )
  const total = groupTasks.length
  const done = groupTasks.filter((t) => t.done).length

  function handleAdd() {
    const err = addTask(resolvedGroupId, input)
    if (!err) setInput('')
  }

  function handleClear() {
    if (total === 0) return
    if (window.confirm(`Clear all tasks in "${group.name}"?`)) {
      clearGroupTasks(resolvedGroupId)
    }
  }

  return (
    <div className="flex flex-col gap-5 px-0 py-2">
      <Header title={group.name} date={`${done} of ${total} done`} onGuideClick={openGuide} />

      <Link
        to="/categories"
        className="self-start text-sm text-mocha transition-colors duration-150 hover:text-espresso focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none"
      >
        ← Back to Categories
      </Link>

      <ProgressStrip total={total} done={done} />

      <TaskInput value={input} onChange={setInput} onAdd={handleAdd} />

      {total === 0 ? <EmptyState /> : (
        <TaskList tasks={ordered} onToggle={toggleTask} onDelete={deleteTask} />
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-mocha">
          {done} of {total} done
        </span>
        <button
          type="button"
          onClick={handleClear}
          disabled={total === 0}
          className="min-h-11 text-sm text-mocha transition-colors duration-150 hover:text-rose disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-mocha focus-visible:ring-2 focus-visible:ring-rose/50 focus-visible:outline-none"
        >
          Clear all tasks in this category
        </button>
      </div>
    </div>
  )
}