import { NavLink } from 'react-router-dom'
import { BookIcon, CoffeeIcon, ListIcon } from './icons.jsx'

// `end` on Home so it is only active on exactly "/".
const LINKS = [
  { to: '/', label: 'Home', Icon: CoffeeIcon, end: true },
  { to: '/categories', label: 'Categories', Icon: ListIcon },
  { to: '/guide', label: 'Guide', Icon: BookIcon },
  { to: '/developers', label: 'Developers', Icon: CoffeeIcon },
]

export default function Navbar() {
  return (
    <nav aria-label="Main navigation" className="rounded-3xl bg-sand p-1.5 shadow-card">
      <ul className="flex items-center gap-1">
        {LINKS.map(({ to, label, Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex min-h-11 w-full items-center justify-center gap-1.5 rounded-2xl px-1 text-xs font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none sm:gap-2 sm:text-sm ${
                  isActive
                    ? 'bg-cream text-latte-dark shadow-btn'
                    : 'text-mocha hover:text-espresso'
                }`
              }
            >
              <Icon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
              <span className="truncate">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}