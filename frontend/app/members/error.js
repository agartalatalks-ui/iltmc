'use client'

export default function MembersError({ error, reset }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-4">Could not load members</h2>
        <p className="text-gray-400 mb-6">{error?.message || 'Something went wrong loading the members list.'}</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
