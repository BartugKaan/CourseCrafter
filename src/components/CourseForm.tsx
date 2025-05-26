'use client'

import { useState } from 'react'
import { Module } from '@/models/course'
import generateCourse from '@/lib/generateCourse'

interface CourseFormProps {
  onCourseGenerated: (
    modules: Module[],
    title: string,
    description: string
  ) => void
}

const CourseForm = ({ onCourseGenerated }: CourseFormProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [courseLevel, setCourseLevel] = useState('beginner')
  const [courseLanguage, setCourseLanguage] = useState('en')
  const [courseDuration, setCourseDuration] = useState('')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await generateCourse(
        title,
        description,
        courseLevel,
        courseLanguage,
        courseDuration
      )

      // Ensure result is an array before setting modules
      if (Array.isArray(result) && result.length > 0) {
        onCourseGenerated(result, title, description)
      } else {
        console.error('Invalid result format:', result)
        alert(
          'The AI response was not in the expected format. Please try again.'
        )
      }
    } catch (error) {
      console.error('Error generating course:', error)
      alert('An error occurred while generating the course. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Course Level */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Course Level
              </label>
              <select
                value={courseLevel}
                onChange={(e) => setCourseLevel(e.target.value)}
                className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Course Language */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Course Language
              </label>
              <select
                value={courseLanguage}
                onChange={(e) => setCourseLanguage(e.target.value)}
                className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="en">English</option>
                <option value="tr">Turkish</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="ru">Russian</option>
              </select>
            </div>

            {/* Course Duration */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Course Duration (hours)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={courseDuration}
                onChange={(e) => setCourseDuration(e.target.value)}
                placeholder="e.g., 8"
                className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
              />
            </div>
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
  )
}

export default CourseForm
