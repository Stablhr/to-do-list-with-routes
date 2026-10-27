import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import GroupCard from '../components/GroupCard.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function Groups({ groups, tasks, addGroup }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  function handleCreate(event) {
    event.preventDefault()
    const err = addGroup(name)
    if (err) {
      setError(err)
    } else {
      setName('')
      setError('')
    }
  }

  function countFor(groupId) {
    const groupTasks = tasks.filter((t) => t.groupId === groupId)
    return { total: groupTasks.length, done: groupTasks.filter((t) => t.done).length }
  }

  return (
    <div className="flex flex-col gap-5 px-0 py-2">
      <Header title="Groups" />

      <form onSubmit={handleCreate} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="new-group" className="sr-only">
          New group name
        </label>
        <input
          id="new-group"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (error) setError('')
          }}
          placeholder="New group name…"
          autoComplete="off"
          className="min-w-0 flex-1 rounded-2xl bg-sand px-4 py-3 text-base text-espresso placeholder:text-mocha focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none"
        />
        <button
          type="submit"
          className="w-full shrink-0 rounded-2xl bg-latte px-5 py-3 font-medium text-white shadow-btn transition-[background-color,transform] duration-150 ease-out hover:bg-latte-dark active:scale-95 focus-visible:ring-2 focus-visible:ring-latte-dark/60 focus-visible:outline-none sm:w-auto"
        >
          Create Group
        </button>
      </form>
      {error ? (
        <p className="text-sm text-rose" role="alert">
          {error}
        </p>
      ) : null}

      {groups.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="flex flex-col gap-3">
          {groups.map((group) => {
            const { total, done } = countFor(group.id)
            return (
              <GroupCard
                key={group.id}
                group={group}
                taskCount={total}
                doneCount={done}
              />
            )
          })}
        </ul>
      )}

      <Link
        to="/"
        className="self-start text-sm text-mocha transition-colors duration-150 hover:text-espresso focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none"
      >
        ← Back to dashboard
      </Link>
    </div>
  )
}