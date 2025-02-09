import { useEffect } from 'react'
import { Task } from '../types/task'
import { useTaskStore } from '../store/task.store'

export const useFetchTasks = (): Task[] => {
  const tasks = useTaskStore((state) => state.tasks)
  const loadTasks = useTaskStore((state) => state.loadTasks)

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  return tasks
}
