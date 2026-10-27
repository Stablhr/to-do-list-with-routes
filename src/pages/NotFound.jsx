import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'

export default function NotFound() {
  return (
    <div className="flex flex-col gap-5 px-0 py-2">
      <Header title="Not Found" />
      <section className="rounded-3xl bg-sand/60 p-5 text-center">
        <p className="text-espresso">Page not found.</p>
        <p className="mt-1 text-sm text-mocha">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-2xl bg-latte px-5 py-3 font-medium text-white shadow-btn transition-[background-color,transform] duration-150 ease-out hover:bg-latte-dark active:scale-95 focus-visible:ring-2 focus-visible:ring-latte-dark/60 focus-visible:outline-none"
        >
          Back to Home
        </Link>
      </section>
    </div>
  )
}