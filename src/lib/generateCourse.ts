import { Module } from '@/models/course'

export default async function generateCourse(
  title: string,
  description: string,
  apiKey: string
): Promise<Module[]> {
  const prompt = `
  Course Title: ${title}
  Course Description: ${description}
  
  Please generate course content in the following format:
  
  For each module:
  - Module title
  - Module description
  - 4-6 lesson titles and a 1-2 sentence description for each lesson
  
  IMPORTANT:Respond only in JSON with this structure:
  [
    {
      "title": "Module title",
      "description": "Module description",
      "lessons": [
        {
          "title": "Lesson title",
          "description": "Lesson description"
        }
      ]
    }
  ]
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
    const rawText = data.choices[0].message.content
    const parsed: Module[] = JSON.parse(rawText)
    return parsed
  } catch (err) {
    console.error('Failed to parse AI response:', err)
    throw new Error('The AI response is not in a valid JSON format.')
  }
}
