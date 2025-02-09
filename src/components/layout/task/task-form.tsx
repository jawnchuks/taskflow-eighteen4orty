import React, { useState } from 'react'
import { Task } from '../../../types/task'
import { useTaskStore } from '../../../store/task.store'

interface TaskFormProps {
  task?: Task
  onClose?: () => void
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onClose }) => {
  const [title, setTitle] = useState(task ? task.title : '')
  const [description, setDescription] = useState(task ? task.description : '')
  const [dueDate, setDueDate] = useState(task ? task.dueDate : '')
  const [priority, setPriority] = useState<Task['priority']>(
    task ? task.priority : 'medium'
  )
  const [status, setStatus] = useState<Task['status']>(
    task ? task.status : 'to-do'
  )

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const addTask = useTaskStore((state) => state.addTask)
  const updateTask = useTaskStore((state) => state.updateTask)

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {}
    if (!title.trim()) {
      newErrors.title = 'Title is required.'
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required.'
    }
    if (!dueDate) {
      newErrors.dueDate = 'Due date is required.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const taskData: Task = {
      id: task ? task.id : Date.now().toString(),
      title,
      description,
      dueDate,
      priority,
      status,
    }

    if (task) {
      updateTask(task.id, taskData)
    } else {
      addTask(taskData)
    }
    if (onClose) onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="task-title">Title</label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
        ></textarea>
        {errors.description && (
          <span className="error">{errors.description}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="task-dueDate">Due Date</label>
        <input
          id="task-dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        {errors.dueDate && <span className="error">{errors.dueDate}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="task-priority">Priority</label>
        <select
          id="task-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task['priority'])}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="task-status">Status</label>
        <select
          id="task-status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Task['status'])}
        >
          <option value="to-do">To-Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="form-actions">
        <button className="button_primary" type="submit">
          {task ? 'Update Task' : 'Add Task'}
        </button>
        <button className="button_ghost" type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default TaskForm
