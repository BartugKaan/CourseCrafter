'use client'

import { Lesson } from '@/models/course'

interface LessonItemProps {
  lesson: Lesson
  lessonIndex: number
  isEditing: boolean
  onStartEdit: () => void
  onStopEdit: () => void
  onUpdateTitle: (title: string) => void
  onUpdateDescription: (description: string) => void
}

const LessonItem = ({
  lesson,
  lessonIndex,
  isEditing,
  onStartEdit,
  onStopEdit,
  onUpdateTitle,
  onUpdateDescription,
}: LessonItemProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      onStopEdit()
    }
  }

  return (
    <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors duration-200">
      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
        <span className="text-green-700 font-medium text-xs">
          {lessonIndex + 1}
        </span>
      </div>
      <div className="flex-1">
        {/* Editable Lesson Title */}
        {isEditing ? (
          <input
            type="text"
            value={lesson.title}
            onChange={(e) => onUpdateTitle(e.target.value)}
            onBlur={onStopEdit}
            onKeyDown={handleKeyDown}
            className="w-full font-semibold text-gray-900 mb-1 px-2 py-1 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
            autoFocus
          />
        ) : (
          <h6
            className="font-semibold text-gray-900 mb-1 cursor-pointer hover:text-green-600 transition-colors duration-200 px-2 py-1 rounded hover:bg-white"
            onClick={onStartEdit}
            title="Click to edit"
          >
            {lesson.title}
          </h6>
        )}

        {/* Editable Lesson Description */}
        <textarea
          value={lesson.description}
          onChange={(e) => onUpdateDescription(e.target.value)}
          className="w-full text-gray-600 text-sm leading-relaxed resize-none border-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1 hover:bg-white transition-colors duration-200"
          rows={2}
          title="Click to edit"
        />
      </div>
    </div>
  )
}

export default LessonItem
