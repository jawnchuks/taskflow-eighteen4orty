/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useDrop } from 'react-dnd'
import { Task } from '../../../types/task'
import TaskCard from './task-card'

interface BoardColumnProps {
  status: 'to-do' | 'in-progress' | 'done'
  tasks: Task[]
  onDropTask: (
    taskId: string,
    newStatus: 'to-do' | 'in-progress' | 'done'
  ) => void
}

const BoardColumn: React.FC<BoardColumnProps> = ({
  status,
  tasks,
  onDropTask,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { id: string; status: string }) => {
      if (item.status !== status) {
        onDropTask(item.id, status)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const backgroundColor = isOver && canDrop ? '#e0e0e0' : undefined

  return (
    <div className="board-column" ref={drop as any} style={{ backgroundColor }}>
      <h6 className="column-header">
        {status.replace('-', ' ').toUpperCase()}
      </h6>
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <p className="empty-column">No tasks</p>
      )}
    </div>
  )
}

export default BoardColumn
