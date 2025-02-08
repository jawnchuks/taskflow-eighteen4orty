import { create } from 'zustand'

interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  status: 'to-do' | 'in-progress' | 'done'
}

interface TaskStore {
  tasks: Task[]
  addTask: (task: Task) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  loadTasks: () => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  addTask: (task) =>
    set((state) => {
      const newTasks = [...state.tasks, task]
      localStorage.setItem('tasks', JSON.stringify(newTasks))
      return { tasks: newTasks }
    }),
  updateTask: (id, updates) =>
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
      localStorage.setItem('tasks', JSON.stringify(newTasks))
      return { tasks: newTasks }
    }),
  deleteTask: (id) =>
    set((state) => {
      const newTasks = state.tasks.filter((task) => task.id !== id)
      localStorage.setItem('tasks', JSON.stringify(newTasks))
      return { tasks: newTasks }
    }),
  loadTasks: () => {
    set({ tasks: JSON.parse(localStorage.getItem('tasks') || '[]') })
  },
}))
