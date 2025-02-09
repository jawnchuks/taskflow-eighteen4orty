import React from 'react'
import { Task } from '../../types/task'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useTaskStore } from '../../store/task.store'
import BoardColumn from '../layout/task/task-board'

interface BoardViewProps {
  tasks: Task[]
}

const BoardView: React.FC<BoardViewProps> = ({ tasks }) => {
  const statuses: ('to-do' | 'in-progress' | 'done')[] = [
    'to-do',
    'in-progress',
    'done',
  ]

  const updateTask = useTaskStore((state) => state.updateTask)

  const handleDropTask = (
    taskId: string,
    newStatus: 'to-do' | 'in-progress' | 'done'
  ) => {
    updateTask(taskId, { status: newStatus })
  }

  const tasksByStatus = statuses.reduce(
    (acc, status) => {
      acc[status] = tasks.filter((task) => task.status === status)
      return acc
    },
    {} as { [key in 'to-do' | 'in-progress' | 'done']: Task[] }
  )

  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks yet.</p>
        <button className="add-task-button">Add Task</button>
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board-view">
        {statuses.map((status) => (
          <BoardColumn
            key={status}
            status={status}
            tasks={tasksByStatus[status] || []}
            onDropTask={handleDropTask}
          />
        ))}
      </div>
    </DndProvider>
  )
}

export default BoardView
