import React, { useState } from 'react'
import { Task } from '../../types/task'
import TaskForm from '../layout/task/task-form'
import { useTaskStore } from '../../store/task.store'
import Modal from './modal'
import TaskDetails from '../layout/task/task-details'

interface ListViewProps {
  tasks: Task[]
}

const ListView: React.FC<ListViewProps> = ({ tasks }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [editTask, setEditTask] = useState<Task | null>(null)
  const [viewTask, setViewTask] = useState<Task | null>(null)
  const deleteTask = useTaskStore((state) => state.deleteTask)

  const handleMenuToggle = (taskId: string) => {
    setOpenMenu(openMenu === taskId ? null : taskId)
  }

  const handleView = (task: Task) => {
    setViewTask(task)
  }

  const handleEdit = (task: Task) => {
    setEditTask(task)
  }

  const handleDelete = (task: Task) => {
    deleteTask(task.id)
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks yet.</p>
        <Modal trigger={<button className="add-task-button">Add Task</button>}>
          {(close) => (
            <>
              <h2>Add New Task</h2>
              <TaskForm onClose={close} />
            </>
          )}
        </Modal>
      </div>
    )
  }

  return (
    <div className="list-view">
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th className="actions-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="task-row">
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{new Date(task.dueDate).toLocaleDateString()}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>
                <div className="actions-container">
                  <button
                    className="action-button"
                    onClick={() => handleMenuToggle(task.id)}
                  >
                    ⋮
                  </button>
                  {openMenu === task.id && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleView(task)}>View</button>
                      <button onClick={() => handleEdit(task)}>Edit</button>
                      <button onClick={() => handleDelete(task)}>Delete</button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editTask && (
        <Modal isOpen={true} onClose={() => setEditTask(null)}>
          {(close) => (
            <>
              <h2>Edit Task</h2>
              <TaskForm
                task={editTask}
                onClose={() => {
                  close()
                  setEditTask(null)
                }}
              />
            </>
          )}
        </Modal>
      )}

      {viewTask && (
        <Modal isOpen={true} onClose={() => setViewTask(null)}>
          {(close) => <TaskDetails data={viewTask} onClose={close} />}
        </Modal>
      )}
    </div>
  )
}

export default ListView
