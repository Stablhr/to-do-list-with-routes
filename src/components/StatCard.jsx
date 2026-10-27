export default function StatCard({ label, value, accent }) {
  return (
    <div className="min-w-0 rounded-2xl bg-cream px-2 py-3 text-center sm:px-3.5">
      <div className="text-[10px] tracking-wide break-words text-mocha uppercase sm:text-[11px]">
        {label}
      </div>
      <div
        className={`text-lg font-semibold ${accent ? 'text-leaf' : 'text-espresso'}`}
      >
        {value}
      </div>
    </div>
  )
}