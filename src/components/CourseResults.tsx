'use client'

import { Module } from '@/models/course'
import ModuleCard from './ModuleCard'
import ExportButtons from './ExportButtons'

interface CourseResultsProps {
  title: string
  description: string
  modules: Module[]
  editingModule: number | null
  editingLesson: {
    moduleIndex: number
    lessonIndex: number
  } | null
  onClearResults: () => void
  onStartEditModule: (moduleIndex: number) => void
  onStopEditModule: () => void
  onStartEditLesson: (moduleIndex: number, lessonIndex: number) => void
  onStopEditLesson: () => void
  onUpdateModuleTitle: (moduleIndex: number, title: string) => void
  onUpdateModuleDescription: (moduleIndex: number, description: string) => void
  onUpdateLessonTitle: (
    moduleIndex: number,
    lessonIndex: number,
    title: string
  ) => void
  onUpdateLessonDescription: (
    moduleIndex: number,
    lessonIndex: number,
    description: string
  ) => void
}

const CourseResults = ({
  title,
  description,
  modules,
  editingModule,
  editingLesson,
  onClearResults,
  onStartEditModule,
  onStopEditModule,
  onStartEditLesson,
  onStopEditLesson,
  onUpdateModuleTitle,
  onUpdateModuleDescription,
  onUpdateLessonTitle,
  onUpdateLessonDescription,
}: CourseResultsProps) => {
  const courseData = {
    title,
    description,
    modules,
  }

  return (
    <div className="mt-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            🎯 Generated Course Content
          </h3>
          <p className="text-gray-600">
            Your AI-generated course modules and lessons are ready. Click on any
            text to edit it!
          </p>
        </div>
        <button
          onClick={onClearResults}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200"
        >
          <span className="mr-2">🗑️</span>
          Clear Results
        </button>
      </div>

      <div className="grid gap-6">
        {modules.map((module, moduleIndex) => (
          <ModuleCard
            key={moduleIndex}
            module={module}
            moduleIndex={moduleIndex}
            isEditingModule={editingModule === moduleIndex}
            editingLesson={editingLesson}
            onStartEditModule={() => onStartEditModule(moduleIndex)}
            onStopEditModule={onStopEditModule}
            onStartEditLesson={(lessonIndex) =>
              onStartEditLesson(moduleIndex, lessonIndex)
            }
            onStopEditLesson={onStopEditLesson}
            onUpdateModuleTitle={(title) =>
              onUpdateModuleTitle(moduleIndex, title)
            }
            onUpdateModuleDescription={(description) =>
              onUpdateModuleDescription(moduleIndex, description)
            }
            onUpdateLessonTitle={(lessonIndex, title) =>
              onUpdateLessonTitle(moduleIndex, lessonIndex, title)
            }
            onUpdateLessonDescription={(lessonIndex, description) =>
              onUpdateLessonDescription(moduleIndex, lessonIndex, description)
            }
          />
        ))}
      </div>

      <ExportButtons courseData={courseData} />
    </div>
  )
}

export default CourseResults
