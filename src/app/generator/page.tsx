'use client'

import PromptForm from '@/components/PromptForm'

const GeneratorPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      {/* Header Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-blue-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl shadow-lg mb-6">
              <span className="text-4xl">🎓</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                CourseCrafter
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-2 font-medium">
              AI-Powered Course Content Generator
            </p>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Transform your ideas into comprehensive, structured learning
              content with the power of artificial intelligence.
              <span className="text-green-600 font-medium">
                {' '}
                Completely free to use!
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-8">
          {/* Course Generation Form */}
          <div className="space-y-6">
            <PromptForm />
            <div className="text-center">
              <div className=" inline-flex items-center px-4 py-2 my-4 bg-green-50 text-green-700 text-sm font-medium rounded-full border border-green-200 mb-4">
                <span className="mr-2">🚀</span>
                Create your course content instantly
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                No API keys required! Just describe your course and let our AI
                generate comprehensive content for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default GeneratorPage
