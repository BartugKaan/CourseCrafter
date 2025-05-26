import { Module } from '@/models/course'

export default async function generateCourse(
  title: string,
  description: string,
  apiKey: string
): Promise<Module[]> {
  const prompt = `
  Create a comprehensive course structure for the following:
  
  Course Title: ${title}
  Course Description: ${description}
  
  Generate 3-5 modules for this course. Each module should have:
  - A clear, descriptive title
  - A detailed description explaining what students will learn
  - 4-6 lessons with specific titles and descriptions
  - The lessons should be in a progressive order, starting from the basics and gradually increasing in complexity
  - Respond in the same language as the course title and description.
  
  IMPORTANT: You must respond with valid JSON in exactly this format:
  {
    "modules": [
      {
        "title": "Module 1: Introduction to the Topic",
        "description": "This module introduces students to the fundamental concepts and provides a solid foundation for the course.",
        "lessons": [
          {
            "title": "Course Overview and Objectives",
            "description": "Learn about the course structure, goals, and what you'll achieve by the end."
          },
          {
            "title": "Key Terminology and Concepts",
            "description": "Master the essential vocabulary and basic concepts you'll need throughout the course."
          }
        ]
      }
    ]
  }
  
  Make sure the content is relevant, educational, and progressively structured from beginner to advanced concepts.
  `

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch from OpenAI')
  }

  const data = await response.json()

  try {
    const rawText = data.choices[0]?.message?.content

    if (!rawText) {
      throw new Error('No content received from OpenAI')
    }

    const parsed = JSON.parse(rawText)

    // Check if the response has the expected structure
    let modulesArray: unknown[]

    if (Array.isArray(parsed)) {
      // Handle legacy format where AI returns array directly
      modulesArray = parsed
    } else if (parsed && typeof parsed === 'object' && 'modules' in parsed) {
      // Handle new format where AI returns {modules: [...]}
      const parsedObj = parsed as Record<string, unknown>
      if (Array.isArray(parsedObj.modules)) {
        modulesArray = parsedObj.modules
      } else {
        console.error(
          'AI response modules property is not an array:',
          parsedObj.modules
        )
        throw new Error(
          'The AI response modules property is not in the expected array format.'
        )
      }
    } else {
      console.error('AI response is not in expected format:', parsed)
      throw new Error('The AI response is not in the expected format.')
    }

    // Validate that each module has the required structure
    const validModules: Module[] = modulesArray.filter(
      (module: unknown): module is Module => {
        if (!module || typeof module !== 'object') return false
        const mod = module as Record<string, unknown>

        // Validate module structure
        if (
          typeof mod.title !== 'string' ||
          typeof mod.description !== 'string'
        ) {
          return false
        }

        // Validate lessons array
        if (!Array.isArray(mod.lessons)) {
          return false
        }

        // Validate each lesson structure
        const validLessons = mod.lessons.every((lesson: unknown) => {
          if (!lesson || typeof lesson !== 'object') return false
          const les = lesson as Record<string, unknown>
          return (
            typeof les.title === 'string' && typeof les.description === 'string'
          )
        })

        return validLessons
      }
    )

    if (validModules.length === 0) {
      throw new Error('No valid modules found in the AI response.')
    }

    return validModules
  } catch (err) {
    console.error('Failed to parse AI response:', err)
    if (err instanceof SyntaxError) {
      throw new Error('The AI response is not valid JSON. Please try again.')
    }
    throw new Error('The AI response could not be processed. Please try again.')
  }
}
