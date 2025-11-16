import { useState } from 'react'
import Hero from './components/Hero'
import QuickAdd from './components/QuickAdd'
import Graph from './components/Graph'
import Collections from './components/Collections'

function App() {
  const [justAdded, setJustAdded] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <header className="border-b border-gray-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600" />
            <span className="font-bold text-gray-900">Ordne</span>
          </div>
          <nav className="text-sm text-gray-600">
            <a href="/test" className="hover:text-gray-900">Status</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero onGetStarted={() => document.getElementById('quick-add')?.scrollIntoView({ behavior: 'smooth' })} />

        <section id="quick-add" className="max-w-6xl mx-auto px-6 pb-10">
          <QuickAdd onCreated={setJustAdded} />
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-10 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Graph key={justAdded?._id || 'graph'} />
          </div>
          <div>
            <Collections />
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        Built for clarity, speed, and action.
      </footer>
    </div>
  )
}

export default App
