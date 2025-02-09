import { Task } from '../../../types/task'

type Props = {
  data: Task
  onClose?: () => void
}

const TaskDetails = ({ data, onClose }: Props) => {
  return (
    <div className="task-details">
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <p>
        <strong>Due Date:</strong> {new Date(data.dueDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Priority:</strong> {data.priority}
      </p>
      <p>
        <strong>Status:</strong> {data.status}
      </p>
      <button onClick={onClose} className="close-button">
        Close
      </button>
    </div>
  )
}

export default TaskDetails
