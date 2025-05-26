import { Module } from '@/models/course'

export interface CourseData {
  title: string
  description: string
  modules: Module[]
}

export const exportAsJSON = (courseData: CourseData) => {
  const exportData = {
    ...courseData,
    generatedAt: new Date().toISOString(),
    version: '1.0',
  }

  const dataStr = JSON.stringify(exportData, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)

  const link = document.createElement('a')
  link.href = url
  link.download = `${courseData.title
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase()}_course.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const exportAsMarkdown = (courseData: CourseData) => {
  const { title, description, modules } = courseData

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
  link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_course.md`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const exportAsPDF = (courseData: CourseData) => {
  const { title, description, modules } = courseData

  // Create a new window for printing
  const printWindow = window.open('', '_blank')
  if (!printWindow) return

  const courseHTML = `
    <!DOCTYPE html>
    <html lang="en">
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
