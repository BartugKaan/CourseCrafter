'use client'

import { useState } from 'react'
import generateCourse from '@/lib/generateCourse'
import { Module } from '@/models/course'

const PromptForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [modules, setModules] = useState<Module[] | null>(null)
  const [editingModule, setEditingModule] = useState<number | null>(null)
  const [editingLesson, setEditingLesson] = useState<{
    moduleIndex: number
    lessonIndex: number
  } | null>(null)

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

      // Ensure result is an array before setting modules
      if (Array.isArray(result) && result.length > 0) {
        setModules(result)
      } else {
        console.error('Invalid result format:', result)
        alert(
          'The AI response was not in the expected format. Please try again.'
        )
        setModules(null)
      }
    } catch (error) {
      console.error('Error generating course:', error)
      alert(
        'An error occurred while generating the course. Please check your API key and try again.'
      )
      setModules(null)
    } finally {
      setLoading(false)
    }
  }

  const clearResults = () => {
    setModules(null)
    setTitle('')
    setDescription('')
    setEditingModule(null)
    setEditingLesson(null)
  }

  const updateModuleTitle = (moduleIndex: number, newTitle: string) => {
    if (!modules) return
    const updatedModules = [...modules]
    updatedModules[moduleIndex] = {
      ...updatedModules[moduleIndex],
      title: newTitle,
    }
    setModules(updatedModules)
  }

  const updateModuleDescription = (
    moduleIndex: number,
    newDescription: string
  ) => {
    if (!modules) return
    const updatedModules = [...modules]
    updatedModules[moduleIndex] = {
      ...updatedModules[moduleIndex],
      description: newDescription,
    }
    setModules(updatedModules)
  }

  const updateLessonTitle = (
    moduleIndex: number,
    lessonIndex: number,
    newTitle: string
  ) => {
    if (!modules) return
    const updatedModules = [...modules]
    updatedModules[moduleIndex].lessons[lessonIndex] = {
      ...updatedModules[moduleIndex].lessons[lessonIndex],
      title: newTitle,
    }
    setModules(updatedModules)
  }

  const updateLessonDescription = (
    moduleIndex: number,
    lessonIndex: number,
    newDescription: string
  ) => {
    if (!modules) return
    const updatedModules = [...modules]
    updatedModules[moduleIndex].lessons[lessonIndex] = {
      ...updatedModules[moduleIndex].lessons[lessonIndex],
      description: newDescription,
    }
    setModules(updatedModules)
  }

  const exportAsJSON = () => {
    if (!modules) return

    const courseData = {
      title,
      description,
      modules,
      generatedAt: new Date().toISOString(),
      version: '1.0',
    }

    const dataStr = JSON.stringify(courseData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)

    const link = document.createElement('a')
    link.href = url
    link.download = `${title
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase()}_course.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const exportAsMarkdown = () => {
    if (!modules) return

    // Generate markdown content
    let markdownContent = `# ${title}\n\n`
    markdownContent += `${description}\n\n`
    markdownContent += `---\n\n`
    markdownContent += `**Generated on:** ${new Date().toLocaleDateString()}\n\n`
    markdownContent += `**Total Modules:** ${modules.length}\n\n`

    // Add table of contents
    markdownContent += `## 📚 Table of Contents\n\n`
    modules.forEach((module, i) => {
      markdownContent += `${i + 1}. [${module.title}](#module-${
        i + 1
      }-${module.title.toLowerCase().replace(/[^a-z0-9]/g, '-')})\n`
      module.lessons.forEach((lesson, j) => {
        markdownContent += `   - [${lesson.title}](#lesson-${i + 1}${
          j + 1
        }-${lesson.title.toLowerCase().replace(/[^a-z0-9]/g, '-')})\n`
      })
    })
    markdownContent += `\n---\n\n`

    // Add modules and lessons
    modules.forEach((module, i) => {
      markdownContent += `## Module ${i + 1}: ${module.title}\n\n`
      markdownContent += `${module.description}\n\n`

      module.lessons.forEach((lesson, j) => {
        markdownContent += `### Lesson ${i + 1}.${j + 1}: ${lesson.title}\n\n`
        markdownContent += `${lesson.description}\n\n`
      })

      markdownContent += `---\n\n`
    })

    // Add footer
    markdownContent += `## 🎓 Course Summary\n\n`
    markdownContent += `This course contains **${
      modules.length
    } modules** with a total of **${modules.reduce(
      (total, module) => total + module.lessons.length,
      0
    )} lessons**.\n\n`
    markdownContent += `Generated with ❤️ by [CourseCrafter](https://coursecrafter.ai)\n\n`

    // Create and download the file
    const dataBlob = new Blob([markdownContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(dataBlob)

    const link = document.createElement('a')
    link.href = url
    link.download = `${title
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase()}_course.md`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const exportAsPDF = () => {
    if (!modules) return

    // Create a new window for printing
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const courseHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title} - Course Content</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              border-bottom: 3px solid #10b981;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .course-title {
              font-size: 2.5em;
              color: #10b981;
              margin-bottom: 10px;
            }
            .course-description {
              font-size: 1.2em;
              color: #666;
              margin-bottom: 10px;
            }
            .generated-date {
              font-size: 0.9em;
              color: #888;
            }
            .module {
              margin-bottom: 40px;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              overflow: hidden;
            }
            .module-header {
              background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
              padding: 20px;
              border-bottom: 1px solid #d1d5db;
            }
            .module-title {
              font-size: 1.5em;
              color: #1f2937;
              margin-bottom: 10px;
            }
            .module-description {
              color: #4b5563;
            }
            .lessons {
              padding: 20px;
            }
            .lesson {
              margin-bottom: 20px;
              padding: 15px;
              background: #f9fafb;
              border-radius: 6px;
              border-left: 4px solid #10b981;
            }
            .lesson-title {
              font-size: 1.2em;
              color: #1f2937;
              margin-bottom: 8px;
              font-weight: 600;
            }
            .lesson-description {
              color: #4b5563;
            }
            .lesson-number {
              display: inline-block;
              background: #10b981;
              color: white;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              text-align: center;
              line-height: 24px;
              font-size: 0.8em;
              margin-right: 10px;
              font-weight: bold;
            }
            @media print {
              body { margin: 0; }
              .module { break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="course-title">${title}</h1>
            <p class="course-description">${description}</p>
            <p class="generated-date">Generated on ${new Date().toLocaleDateString()}</p>
          </div>
          
          ${modules
            .map(
              (module) => `
            <div class="module">
              <div class="module-header">
                <h2 class="module-title">${module.title}</h2>
                <p class="module-description">${module.description}</p>
              </div>
              <div class="lessons">
                ${module.lessons
                  .map(
                    (lesson, j) => `
                  <div class="lesson">
                    <h3 class="lesson-title">
                      <span class="lesson-number">${j + 1}</span>
                      ${lesson.title}
                    </h3>
                    <p class="lesson-description">${lesson.description}</p>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>
          `
            )
            .join('')}
        </body>
      </html>
    `

    printWindow.document.write(courseHTML)
    printWindow.document.close()

    // Wait for content to load then print
    printWindow.onload = () => {
      printWindow.print()
      printWindow.close()
    }
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
      {modules && Array.isArray(modules) && modules.length > 0 && (
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                🎯 Generated Course Content
              </h3>
              <p className="text-gray-600">
                Your AI-generated course modules and lessons are ready. Click on
                any text to edit it!
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
                      {/* Editable Module Title */}
                      {editingModule === i ? (
                        <input
                          type="text"
                          value={mod.title}
                          onChange={(e) => updateModuleTitle(i, e.target.value)}
                          onBlur={() => setEditingModule(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') setEditingModule(null)
                            if (e.key === 'Escape') setEditingModule(null)
                          }}
                          className="w-full text-xl font-bold text-gray-900 mb-2 px-2 py-1 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          autoFocus
                        />
                      ) : (
                        <h4
                          className="text-xl font-bold text-gray-900 mb-2 cursor-pointer hover:text-green-600 transition-colors duration-200 px-2 py-1 rounded hover:bg-green-50"
                          onClick={() => setEditingModule(i)}
                          title="Click to edit"
                        >
                          {mod.title}
                        </h4>
                      )}

                      {/* Editable Module Description */}
                      <textarea
                        value={mod.description}
                        onChange={(e) =>
                          updateModuleDescription(i, e.target.value)
                        }
                        className="w-full text-gray-600 leading-relaxed resize-none border-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1 hover:bg-green-50 transition-colors duration-200"
                        rows={2}
                        title="Click to edit"
                      />
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
                        className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-green-700 font-medium text-xs">
                            {j + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          {/* Editable Lesson Title */}
                          {editingLesson?.moduleIndex === i &&
                          editingLesson?.lessonIndex === j ? (
                            <input
                              type="text"
                              value={lesson.title}
                              onChange={(e) =>
                                updateLessonTitle(i, j, e.target.value)
                              }
                              onBlur={() => setEditingLesson(null)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') setEditingLesson(null)
                                if (e.key === 'Escape') setEditingLesson(null)
                              }}
                              className="w-full font-semibold text-gray-900 mb-1 px-2 py-1 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              autoFocus
                            />
                          ) : (
                            <h6
                              className="font-semibold text-gray-900 mb-1 cursor-pointer hover:text-green-600 transition-colors duration-200 px-2 py-1 rounded hover:bg-white"
                              onClick={() =>
                                setEditingLesson({
                                  moduleIndex: i,
                                  lessonIndex: j,
                                })
                              }
                              title="Click to edit"
                            >
                              {lesson.title}
                            </h6>
                          )}

                          {/* Editable Lesson Description */}
                          <textarea
                            value={lesson.description}
                            onChange={(e) =>
                              updateLessonDescription(i, j, e.target.value)
                            }
                            className="w-full text-gray-600 text-sm leading-relaxed resize-none border-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1 hover:bg-white transition-colors duration-200"
                            rows={2}
                            title="Click to edit"
                          />
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
                <button
                  onClick={exportAsPDF}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  <span className="mr-2">📄</span>
                  Export as PDF
                </button>
                <button
                  onClick={exportAsMarkdown}
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  <span className="mr-2">📝</span>
                  Export as Markdown
                </button>
                <button
                  onClick={exportAsJSON}
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
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
