'use client'

import {
  exportAsJSON,
  exportAsMarkdown,
  exportAsPDF,
  CourseData,
} from '@/utils/exportUtils'

interface ExportButtonsProps {
  courseData: CourseData
}

const ExportButtons = ({ courseData }: ExportButtonsProps) => {
  const handleJSONExport = () => {
    exportAsJSON(courseData)
  }

  const handleMarkdownExport = () => {
    exportAsMarkdown(courseData)
  }

  const handlePDFExport = () => {
    exportAsPDF(courseData)
  }

  return (
    <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
      <div className="text-center">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">
          🎉 Course Generation Complete!
        </h4>
        <p className="text-gray-600 mb-4">
          Ready to export your course content or create a new one?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handlePDFExport}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <span className="mr-2">📄</span>
            Export as PDF
          </button>
          <button
            onClick={handleMarkdownExport}
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <span className="mr-2">📝</span>
            Export as Markdown
          </button>
          <button
            onClick={handleJSONExport}
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <span className="mr-2">📊</span>
            Export as JSON
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExportButtons
