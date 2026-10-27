import { Link } from 'react-router-dom'

export default function GroupCard({ group, taskCount, doneCount }) {
  return (
    <li className="rounded-3xl bg-sand/60 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-espresso">
            {group.name}
          </h2>
          <p className="mt-1 text-sm text-mocha">
            {taskCount} {taskCount === 1 ? 'task' : 'tasks'} · {doneCount} done
          </p>
        </div>
        <Link
          to={`/groups/${group.id}`}
          className="shrink-0 rounded-2xl bg-latte px-4 py-2 text-sm font-medium text-white shadow-btn transition-[background-color,transform] duration-150 ease-out hover:bg-latte-dark active:scale-95 focus-visible:ring-2 focus-visible:ring-latte-dark/60 focus-visible:outline-none"
        >
          Open
        </Link>
      </div>
    </li>
  )
}