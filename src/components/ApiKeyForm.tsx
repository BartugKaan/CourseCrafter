'use client'

import { useState, useEffect } from 'react'

const ApiKeyForm = () => {
  const [apiKey, setApiKey] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const storedKey = sessionStorage.getItem('openai-api-key')
    if (storedKey) {
      setApiKey(storedKey)
      setSaved(true)
    }
  }, [])

  const handleSaved = () => {
    sessionStorage.setItem('openai-api-key', apiKey)
    setSaved(true)
  }

  const handleClear = () => {
    sessionStorage.removeItem('openai-api-key')
    setApiKey('')
    setSaved(false)
  }

  return (
    <div className="p-4 border rounded-2xl shadow max-w-md mx-auto mt-10">
      <h2 className="text-gray-900 text-xl font-semibold mb-4 text-center">
        🔐 OpenAI API Key
      </h2>
      {saved ? (
        <div className="text-center">
          <p className="mb-2 text-green-600 font-medium">✅ API Key saved.</p>
          <button
            onClick={handleClear}
            className="text-sm text-red-500 hover:underline"
          >
            Change / Delete
          </button>
        </div>
      ) : (
        <>
          <input
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="text-gray-900 w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleSaved}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </>
      )}
    </div>
  )
}

export default ApiKeyForm
