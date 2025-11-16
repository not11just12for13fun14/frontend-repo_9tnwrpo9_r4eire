import { ArrowRight } from 'lucide-react'

export default function Hero({ onGetStarted }) {
  return (
    <div className="pt-20 pb-12 md:pt-28 md:pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Built for SMBs — fast setup, clear decisions
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              Map your business. See dependencies. Act with confidence.
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Ordne is a modern, visual enterprise architecture platform that connects applications, processes, roles, data, and risk—so teams align and move faster.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button onClick={onGetStarted} className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg shadow-sm">
                Get started
                <ArrowRight size={18} />
              </button>
              <a href="/test" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-5 py-3 rounded-lg border border-gray-200">
                Check backend
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-tr from-blue-100 via-purple-100 to-rose-100 blur-xl opacity-60 rounded-3xl" />
            <div className="relative bg-white rounded-2xl border border-gray-200 shadow-xl p-4">
              <div className="grid grid-cols-2 gap-3">
                {['Applications', 'Processes', 'Roles', 'Data', 'Risks', 'Compliance'].map((t, i) => (
                  <div key={i} className="p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white">
                    <p className="text-gray-800 font-semibold">{t}</p>
                    <p className="text-sm text-gray-500">Linked and searchable</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
