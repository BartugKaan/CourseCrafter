import { NextRequest, NextResponse } from 'next/server'

// Simple rate limiting to prevent abuse
const requestCounts = new Map<string, { count: number; resetTime: number }>()

function rateLimit(ip: string, limit: number = 10, windowMs: number = 60000) {
  const now = Date.now()
  const userRequests = requestCounts.get(ip)

  if (!userRequests || now > userRequests.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (userRequests.count >= limit) {
    return false
  }

  userRequests.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip =
      forwarded?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown'

    // Rate limiting: 10 requests per minute per IP
    if (!rateLimit(ip, 10, 60000)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in a minute.' },
        { status: 429 }
      )
    }

    const { title, description, courseLevel, courseLanguage, courseDuration } =
      await request.json()

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required.' },
        { status: 400 }
      )
    }

    const result = await generateWithGemini(
      title,
      description,
      courseLevel,
      courseLanguage,
      courseDuration
    )

    return NextResponse.json({ modules: result })
  } catch (error) {
    console.error('Course generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate course. Please try again.' },
      { status: 500 }
    )
  }
}

// Google Gemini (Free tier: 15 requests/minute)
async function generateWithGemini(
  title: string,
  description: string,
  courseLevel: string,
  courseLanguage: string,
  courseDuration: string
) {
  const prompt = generatePrompt(
    title,
    description,
    courseLevel,
    courseLanguage,
    courseDuration
  )

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      }),
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Gemini API error:', response.status, errorText)
    throw new Error(`Gemini API error: ${response.status}`)
  }

  const data = await response.json()
  const text = data.candidates[0]?.content?.parts[0]?.text

  if (!text) {
    throw new Error('No content received from Gemini')
  }

  return parseAIResponse(text)
}

function generatePrompt(
  title: string,
  description: string,
  courseLevel: string,
  courseLanguage: string,
  courseDuration: string
) {
  const getLanguageName = (code: string) => {
    const languages: { [key: string]: string } = {
      en: 'English',
      tr: 'Turkish',
      es: 'Spanish',
      fr: 'French',
      de: 'German',
      it: 'Italian',
      pt: 'Portuguese',
      ru: 'Russian',
    }
    return languages[code] || 'English'
  }

  return `Create a comprehensive course structure for the following:

Course Title: ${title}
Course Description: ${description}
Course Level: ${courseLevel} (adjust complexity accordingly)
Course Language: ${getLanguageName(courseLanguage)} (respond in this language)
${
  courseDuration
    ? `Estimated Duration: ${courseDuration} hours (structure content to fit this timeframe)`
    : ''
}

Generate 3-5 modules for this course. Each module should have:
- A clear, descriptive title
- A detailed description explaining what students will learn
- 4-6 lessons with specific titles and descriptions
- The lessons should be in a progressive order, starting from the basics and gradually increasing in complexity
- Content complexity should match the specified course level (${courseLevel})
- All content should be in ${getLanguageName(courseLanguage)}
- Focus on practical exercises, readings, and hands-on activities

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

Make sure the content is relevant, educational, and progressively structured from beginner to advanced concepts.`
}

function parseAIResponse(text: string) {
  try {
    // Try to extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }

    const parsed = JSON.parse(jsonMatch[0])

    if (parsed.modules && Array.isArray(parsed.modules)) {
      // Validate that each module has the required structure
      const validModules = parsed.modules.filter((module: unknown) => {
        if (!module || typeof module !== 'object') return false
        const mod = module as Record<string, unknown>
        return (
          typeof mod.title === 'string' &&
          typeof mod.description === 'string' &&
          Array.isArray(mod.lessons) &&
          mod.lessons.every((lesson: unknown) => {
            if (!lesson || typeof lesson !== 'object') return false
            const les = lesson as Record<string, unknown>
            return (
              typeof les.title === 'string' &&
              typeof les.description === 'string'
            )
          })
        )
      })

      if (validModules.length === 0) {
        throw new Error('No valid modules found in the AI response')
      }

      return validModules
    }

    throw new Error('Invalid response format')
  } catch (error) {
    console.error('Failed to parse AI response:', error)
    throw new Error('Could not parse AI response')
  }
}
