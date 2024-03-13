export type ToDo = {
  id: string,
  text: string,
  completed: boolean
}

export type Filter =
  (el: ToDo) => boolean
