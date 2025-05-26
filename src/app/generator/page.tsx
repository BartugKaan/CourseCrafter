'use client'

import { useState, useEffect } from 'react'
import ApiKeyForm from '@/components/ApiKeyForm'
import PromptForm from '@/components/PromptForm'

const GeneratorPage = () => {
  const [hasApiKey, setHasApiKey] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  useEffect(() => {
    const checkApiKey = () => {
      const storedKey = sessionStorage.getItem('openai-api-key')
      if (storedKey) {
        setHasApiKey(true)
        setCurrentStep(2)
      } else {
        setHasApiKey(false)
        setCurrentStep(1)
      }
    }

    checkApiKey()

    // Listen for custom API key change events
    const handleApiKeyChange = () => {
      checkApiKey()
    }

    window.addEventListener('apiKeyChanged', handleApiKeyChange)

    return () => {
      window.removeEventListener('apiKeyChanged', handleApiKeyChange)
    }
  }, [])

  const handleBackToApiKey = () => {
    setCurrentStep(1)
    setHasApiKey(false)
  }

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
              content with the power of artificial intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-8">
          {/* Step indicators */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4 sm:space-x-8 py-4">
              <div className="flex items-center">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    currentStep === 1
                      ? 'bg-blue-600 text-white shadow-lg'
                      : hasApiKey
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {hasApiKey && currentStep !== 1 ? (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    '1'
                  )}
                </div>
                <span
                  className={`ml-3 text-sm font-medium hidden sm:block transition-colors duration-300 ${
                    currentStep === 1
                      ? 'text-blue-600'
                      : hasApiKey
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }`}
                >
                  Set API Key
                </span>
              </div>
              <div
                className={`w-8 h-0.5 transition-colors duration-300 ${
                  hasApiKey ? 'bg-green-300' : 'bg-gray-300'
                }`}
              ></div>
              <div className="flex items-center">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    currentStep === 2 && hasApiKey
                      ? 'bg-green-600 text-white shadow-lg'
                      : hasApiKey
                      ? 'bg-green-100 text-green-600 border-2 border-green-600'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  2
                </div>
                <span
                  className={`ml-3 text-sm font-medium hidden sm:block transition-colors duration-300 ${
                    currentStep === 2 && hasApiKey
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }`}
                >
                  Generate Course
                </span>
              </div>
            </div>
          </div>

          {/* Forms */}
          <div className="space-y-12">
            {!hasApiKey ? (
              // Step 1: API Key Setup
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-200 mb-4">
                    <span className="mr-2">👋</span>
                    Step 1 of 2: Set up your API key
                  </div>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    To get started, please enter your OpenAI API key. This will
                    be stored securely in your browser and never sent to our
                    servers.
                  </p>
                </div>
                <ApiKeyForm />
              </div>
            ) : (
              // Step 2: Course Generation
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 text-sm font-medium rounded-full border border-green-200 mb-4">
                    <span className="mr-2">🚀</span>
                    Step 2 of 2: Create your course
                  </div>
                  <p className="text-gray-600 max-w-2xl mx-auto mb-4">
                    Great! Your API key is configured. Now let&apos;s create
                    your course content.
                  </p>
                  <button
                    onClick={handleBackToApiKey}
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    ← Change API Key
                  </button>
                </div>
                <PromptForm />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default GeneratorPage
