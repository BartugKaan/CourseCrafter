'use client'

import { Module } from '@/models/course'
import LessonItem from './LessonItem'

interface ModuleCardProps {
  module: Module
  moduleIndex: number
  isEditingModule: boolean
  editingLesson: {
    moduleIndex: number
    lessonIndex: number
  } | null
  onStartEditModule: () => void
  onStopEditModule: () => void
  onStartEditLesson: (lessonIndex: number) => void
  onStopEditLesson: () => void
  onUpdateModuleTitle: (title: string) => void
  onUpdateModuleDescription: (description: string) => void
  onUpdateLessonTitle: (lessonIndex: number, title: string) => void
  onUpdateLessonDescription: (lessonIndex: number, description: string) => void
}

const ModuleCard = ({
  module,
  moduleIndex,
  isEditingModule,
  editingLesson,
  onStartEditModule,
  onStopEditModule,
  onStartEditLesson,
  onStopEditLesson,
  onUpdateModuleTitle,
  onUpdateModuleDescription,
  onUpdateLessonTitle,
  onUpdateLessonDescription,
}: ModuleCardProps) => {
  const handleModuleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      onStopEditModule()
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-green-700 font-bold text-sm">
              {moduleIndex + 1}
            </span>
          </div>
          <div className="flex-1">
            {/* Editable Module Title */}
            {isEditingModule ? (
              <input
                type="text"
                value={module.title}
                onChange={(e) => onUpdateModuleTitle(e.target.value)}
                onBlur={onStopEditModule}
                onKeyDown={handleModuleKeyDown}
                className="w-full text-xl font-bold text-gray-900 mb-2 px-2 py-1 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                autoFocus
              />
            ) : (
              <h4
                className="text-xl font-bold text-gray-900 mb-2 cursor-pointer hover:text-green-600 transition-colors duration-200 px-2 py-1 rounded hover:bg-green-50"
                onClick={onStartEditModule}
                title="Click to edit"
              >
                {module.title}
              </h4>
            )}

            {/* Editable Module Description */}
            <textarea
              value={module.description}
              onChange={(e) => onUpdateModuleDescription(e.target.value)}
              className="w-full text-gray-600 leading-relaxed resize-none border-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1 hover:bg-green-50 transition-colors duration-200"
              rows={2}
              title="Click to edit"
            />
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <h5 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
          📚 Lessons ({module.lessons.length})
        </h5>
        <div className="space-y-4">
          {module.lessons.map((lesson, lessonIndex) => (
            <LessonItem
              key={lessonIndex}
              lesson={lesson}
              lessonIndex={lessonIndex}
              isEditing={
                editingLesson?.moduleIndex === moduleIndex &&
                editingLesson?.lessonIndex === lessonIndex
              }
              onStartEdit={() => onStartEditLesson(lessonIndex)}
              onStopEdit={onStopEditLesson}
              onUpdateTitle={(title) => onUpdateLessonTitle(lessonIndex, title)}
              onUpdateDescription={(description) =>
                onUpdateLessonDescription(lessonIndex, description)
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ModuleCard
