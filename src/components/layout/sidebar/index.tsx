import { Activity, Hash, Inbox, Plus } from 'react-feather'
import { useTaskStore } from '../../../store/task.store'
import Modal from '../../ui/modal'
import TaskForm from '../task/task-form'
import { Task } from '../../../types/task'

const Sidebar = () => {
  const tasks = useTaskStore((state) => state.tasks)

  const truncate = (str: string, n: number): string =>
    str.length > n ? str.substr(0, n - 1) + '...' : str

  return (
    <aside className="sidebar">
      <h4 className="sidebar-title">Taskflow</h4>
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <Activity size={20} color="currentColor" />
          <p>My Activity</p>
        </li>
        <li className="sidebar-item">
          <Inbox size={20} color="currentColor" />
          <p>My Inbox</p>
        </li>
      </ul>

      <div className="sidebar_project">
        <span className="flex sidebar-project-header">
          <p>My Tasks</p>
          <Modal
            trigger={
              <button className="task_add_btn flex">
                <Plus size={15} color="currentColor" /> Add
              </button>
            }
          >
            {(close) => (
              <>
                <h2>Add New Task</h2>
                <TaskForm onClose={close} />
              </>
            )}
          </Modal>
        </span>

        <ul className="sidebar-list">
          {tasks.map((task: Task) => (
            <li key={task.id} className="sidebar-item">
              <Hash size={15} color="currentColor" />
              <p title={task.title}>{truncate(task.title, 20)}</p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
