'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-lg mb-6">
            <span className="text-6xl">🤔</span>
          </div>
          <div className="text-8xl sm:text-9xl font-bold text-gray-200 mb-4">
            404
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-lg mx-auto leading-relaxed">
            The page you&apos;re looking for seems to have wandered off into the
            digital wilderness. Don&apos;t worry, even the best courses
            sometimes take unexpected detours!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
          >
            <span className="mr-2">🏠</span>
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
          >
            <span className="mr-2">↩️</span>
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            While you&apos;re here, you might want to:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/"
              className="flex items-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-200 group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors duration-200">
                <span className="text-2xl">✨</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Create a Course</h3>
                <p className="text-sm text-gray-600">
                  Start building amazing content
                </p>
              </div>
            </Link>

            <Link
              href="/"
              className="flex items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors duration-200">
                <span className="text-2xl">📚</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">
                  Explore Features
                </h3>
                <p className="text-sm text-gray-600">Learn what we can do</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Brand Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              CourseCrafter
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            Empowering educators with AI-powered course creation
          </p>
        </div>
      </div>
    </div>
  )
}
