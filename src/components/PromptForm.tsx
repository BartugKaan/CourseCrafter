'use client'

import { useState } from 'react'
import { Module } from '@/models/course'
import { useCourseEditor } from '@/hooks/useCourseEditor'
import CourseForm from './CourseForm'
import CourseResults from './CourseResults'

const PromptForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const {
    modules,
    setModules,
    editingModule,
    setEditingModule,
    editingLesson,
    setEditingLesson,
    updateModuleTitle,
    updateModuleDescription,
    updateLessonTitle,
    updateLessonDescription,
    clearResults,
  } = useCourseEditor()

  const handleCourseGenerated = (
    generatedModules: Module[],
    courseTitle: string,
    courseDescription: string
  ) => {
    setModules(generatedModules)
    setTitle(courseTitle)
    setDescription(courseDescription)
  }

  const handleClearResults = () => {
    clearResults()
    setTitle('')
    setDescription('')
  }

  const handleStartEditModule = (moduleIndex: number) => {
    setEditingModule(moduleIndex)
  }

  const handleStopEditModule = () => {
    setEditingModule(null)
  }

  const handleStartEditLesson = (moduleIndex: number, lessonIndex: number) => {
    setEditingLesson({ moduleIndex, lessonIndex })
  }

  const handleStopEditLesson = () => {
    setEditingLesson(null)
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Course Form */}
      <CourseForm onCourseGenerated={handleCourseGenerated} />

      {/* Course Results */}
      {modules && Array.isArray(modules) && modules.length > 0 && (
        <CourseResults
          title={title}
          description={description}
          modules={modules}
          editingModule={editingModule}
          editingLesson={editingLesson}
          onClearResults={handleClearResults}
          onStartEditModule={handleStartEditModule}
          onStopEditModule={handleStopEditModule}
          onStartEditLesson={handleStartEditLesson}
          onStopEditLesson={handleStopEditLesson}
          onUpdateModuleTitle={updateModuleTitle}
          onUpdateModuleDescription={updateModuleDescription}
          onUpdateLessonTitle={updateLessonTitle}
          onUpdateLessonDescription={updateLessonDescription}
        />
      )}
    </div>
  )
}

export default PromptForm
