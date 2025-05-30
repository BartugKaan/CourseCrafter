import React from 'react'

function LearnMore() {
  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto mt-12">
      <h2 className="text-4xl font-bold text-gray-900">
        CourseCrafter Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mt-4 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 h-full">
          <p className="text-4xl text-gray-900">📚</p>
          <h2 className="text-2xl font-bold text-gray-900">
            Auto-create course outlines
          </h2>
          <p className="text-lg text-gray-900 text-center mb-4">
            Enter a course topic and instantly generate structured modules and
            lessons with short descriptions.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 h-full">
          <p className="text-4xl text-gray-900">🧠</p>
          <h2 className="text-2xl font-bold text-gray-900">
            Built on Gemini technology
          </h2>
          <p className="text-lg text-gray-900 text-center mb-4">
            CourseCrafter uses the latest in AI technology to generate course
            content and structure.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 h-full">
          <p className="text-4xl text-gray-900">✍️</p>
          <h2 className="text-2xl font-bold text-gray-900">Edit everything</h2>
          <p className="text-lg text-gray-900 text-center mb-4">
            After generation, fine-tune your modules and lessons to better match
            your goals.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LearnMore
