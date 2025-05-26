'use client'

import { useState } from 'react'
import generateCourse from '@/lib/generateCourse'
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
    } catch (error) {
      console.error('Error generating course:', error)
      alert('An error occurred while generating the course.')
    } finally {
      setLoading(false)
    }
  }

  const clearResults = () => {
    setModules(null)
    setTitle('')
    setDescription('')
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-8 sm:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Create Your Course
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transform your ideas into structured learning content with
              AI-powered course generation
            </p>
          </div>
        </div>

        <div className="px-6 py-8 sm:px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Course Title */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Course Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Introduction to React Development"
                className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                required
              />
            </div>

            {/* Course Description */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Course Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what students will learn, the target audience, and key outcomes..."
                rows={4}
                className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || !title.trim() || !description.trim()}
                className="w-full sm:w-auto min-w-[200px] bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-green-700 hover:to-emerald-700 focus:ring-4 focus:ring-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating Course...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="mr-2">🚀</span>
                    Generate Course Content
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results Section */}
      {modules && (
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                🎯 Generated Course Content
              </h3>
              <p className="text-gray-600">
                Your AI-generated course modules and lessons are ready
              </p>
            </div>
            <button
              onClick={clearResults}
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200"
            >
              <span className="mr-2">🗑️</span>
              Clear Results
            </button>
          </div>

          <div className="grid gap-6">
            {modules.map((mod, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-green-700 font-bold text-sm">
                        {i + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {mod.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {mod.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-6">
                  <h5 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                    📚 Lessons ({mod.lessons.length})
                  </h5>
                  <div className="space-y-4">
                    {mod.lessons.map((lesson, j) => (
                      <div
                        key={j}
                        className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-green-700 font-medium text-xs">
                            {j + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h6 className="font-semibold text-gray-900 mb-1">
                            {lesson.title}
                          </h6>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {lesson.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Export Actions */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                🎉 Course Generation Complete!
              </h4>
              <p className="text-gray-600 mb-4">
                Ready to export your course content or create a new one?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  <span className="mr-2">📄</span>
                  Export as PDF
                </button>
                <button className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                  <span className="mr-2">📊</span>
                  Export as JSON
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PromptForm
