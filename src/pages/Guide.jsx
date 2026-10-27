import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'

const STEPS = [
  {
    title: 'Create a task group',
    body: 'Go to the Groups page, type a name in the input, and press Create Group. Empty or duplicate names are rejected.',
  },
  {
    title: 'Add a task to a selected group',
    body: 'Open a group from the Groups page, then type your task in the input and press Add Task (or hit Enter). It appears marked Not Done.',
  },
  {
    title: 'Mark a task as Done or Not Done',
    body: 'Tap the circle next to a task, or its status badge. It switches between Not Done and Done. Tap again to switch back.',
  },
  {
    title: 'Delete a task',
    body: 'Press the trash Delete button on the right side of a task. To remove everything in a group, use Clear all tasks in this group.',
  },
  {
    title: 'Navigate between pages and groups',
    body: 'Use the navigation bar (Home, Groups, Guide, Developers) at the bottom. On a group page, use ← Back to Groups. On the dashboard, use the Go to Task Groups button. Open buttons on group cards open that group.',
  },
]

export default function Guide() {
  return (
    <div className="flex flex-col gap-5 px-0 py-2">
      <Header title="Guide" />

      <ol className="flex flex-col gap-3 short-screen:mt-0">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className="flex gap-3 rounded-3xl bg-sand/60 p-4 sm:gap-4 sm:p-5"
          >
            <span className="font-hand text-4xl leading-none text-latte">
              {index + 1}
            </span>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-espresso">{step.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-mocha">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <Link
        to="/groups"
        className="flex min-h-11 items-center justify-center rounded-2xl bg-latte px-5 py-3 font-medium text-white shadow-btn transition-[background-color,transform] duration-150 ease-out hover:bg-latte-dark active:scale-95 focus-visible:ring-2 focus-visible:ring-latte-dark/60 focus-visible:outline-none"
      >
        Go to Task Groups
      </Link>
    </div>
  )
}