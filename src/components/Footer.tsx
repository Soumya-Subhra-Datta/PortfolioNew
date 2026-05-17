export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-navy-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#home" className="text-teal-400 font-mono text-lg font-bold">&lt;SSD /&gt;</a>
          <p className="text-slate-300 text-sm font-mono">
            Designed & Built by Soumya Subhra Datta &copy; {year}
          </p>
        </div>
      </div>
    </footer>
  )
}
