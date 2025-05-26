'use client'

import { useState } from 'react'
import { generateCourse } from '@/lib/generateCourse'
import { Module } from '@/models/course'

const PromptForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [modules, setModules] = useState<Module[] | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const apiKey = sessionStorage.getItem('openai-api-key')
    if (!apiKey) {
      alert('Please set your OpenAI API key first.')
      setLoading(false)
      return
    }

    try {
      const result = await generateCourse(title, description, apiKey)
      setModules(result)
      setLoading(false)
    } catch (error) {
      console.error('Error generating course:', error)
      alert('An error occurred while generating the course.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Course Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Course Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded h-28"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Content'}
        </button>
      </form>

      {modules && (
        <div className="mt-10 space-y-6">
          {modules.map((mod, i) => (
            <div key={i} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{mod.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{mod.description}</p>
              <ul className="list-disc list-inside space-y-1">
                {mod.lessons.map((lesson, j) => (
                  <li key={j}>
                    <strong>{lesson.title}</strong>: {lesson.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PromptForm
