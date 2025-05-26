import { Module } from '@/models/course'

export default async function generateCourse(
  title: string,
  description: string,
  apiKey: string
): Promise<Module[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  //Temp data
  return [
    {
      title: 'Module 1: Introduction',
      description:
        'The purpose of the course, the target audience and the basic approach are explained in this module.',
      lessons: [
        {
          title: 'Course Introduction',
          description:
            'This lesson introduces the course scope and objectives.',
        },
        {
          title: 'Who is the target audience?',
          description:
            'This lesson explains the target audience of the course.',
        },
      ],
    },
    {
      title: 'Module 2: Basic Information',
      description:
        'This module covers the basic concepts and background information of the topic.',
      lessons: [
        {
          title: 'Basic Terms',
          description:
            'The key terms used throughout the course are explained in this lesson.',
        },
        {
          title: 'Start Examples',
          description:
            'The topic is introduced with real-world examples in this lesson.',
        },
      ],
    },
  ]
}
