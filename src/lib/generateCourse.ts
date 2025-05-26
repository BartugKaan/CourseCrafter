import { Module } from '@/models/course'

export default async function generateCourse(
  title: string,
  description: string,
  courseLevel: string = 'beginner',
  courseLanguage: string = 'en',
  courseDuration: string = ''
): Promise<Module[]> {
  const response = await fetch('/api/generate-course', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
      courseLevel,
      courseLanguage,
      courseDuration,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to generate course')
  }

  const data = await response.json()
  return data.modules
}
