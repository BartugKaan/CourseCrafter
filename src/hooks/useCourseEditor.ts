import { useState } from 'react'
import { Module } from '@/models/course'

export interface EditingState {
  editingModule: number | null
  editingLesson: {
    moduleIndex: number
    lessonIndex: number
  } | null
}

export const useCourseEditor = () => {
  const [modules, setModules] = useState<Module[] | null>(null)
  const [editingModule, setEditingModule] = useState<number | null>(null)
  const [editingLesson, setEditingLesson] = useState<{
    moduleIndex: number
    lessonIndex: number
  } | null>(null)

  const updateModuleTitle = (moduleIndex: number, newTitle: string) => {
    if (!modules) return
    const updatedModules = [...modules]
    updatedModules[moduleIndex] = {
      ...updatedModules[moduleIndex],
      title: newTitle,
    }
    setModules(updatedModules)
  }

  const updateModuleDescription = (
    moduleIndex: number,
    newDescription: string
  ) => {
    if (!modules) return
    const updatedModules = [...modules]
    updatedModules[moduleIndex] = {
      ...updatedModules[moduleIndex],
      description: newDescription,
    }
    setModules(updatedModules)
  }

  const updateLessonTitle = (
    moduleIndex: number,
    lessonIndex: number,
    newTitle: string
  ) => {
    if (!modules) return
    const updatedModules = [...modules]
    updatedModules[moduleIndex].lessons[lessonIndex] = {
      ...updatedModules[moduleIndex].lessons[lessonIndex],
      title: newTitle,
    }
    setModules(updatedModules)
  }

  const updateLessonDescription = (
    moduleIndex: number,
    lessonIndex: number,
    newDescription: string
  ) => {
    if (!modules) return
    const updatedModules = [...modules]
    updatedModules[moduleIndex].lessons[lessonIndex] = {
      ...updatedModules[moduleIndex].lessons[lessonIndex],
      description: newDescription,
    }
    setModules(updatedModules)
  }

  const clearResults = () => {
    setModules(null)
    setEditingModule(null)
    setEditingLesson(null)
  }

  return {
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
  }
}
