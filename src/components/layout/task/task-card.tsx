/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useDrag } from 'react-dnd'
import { Task } from '../../../types/task'

interface TaskCardProps {
  task: Task
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return '#28a745'
      case 'medium':
        return '#fd7e14'
      case 'high':
        return '#dc3545'
      default:
        return '#6c757d'
    }
  }

  return (
    <div
      ref={drag as any}
      className="task-card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h6 className="task-title">{task.title}</h6>
      <p className="task-due-date">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <div className="task-meta">
        <span className="pill task-status">{task.status.toUpperCase()}</span>
        <span
          className="pill task-priority"
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        >
          {task.priority.toUpperCase()}
        </span>
      </div>
    </div>
  )
}

export default TaskCard
