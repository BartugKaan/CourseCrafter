export type Lesson = {
  title: string
  description: string
}

export type Module = {
  title: string
  description: string
  lessons: Lesson[]
}
