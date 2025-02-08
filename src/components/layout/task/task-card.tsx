// import react from 'react'
// import { useDrag, useDrop } from 'react-dnd'

// type Props = {
//   task: any
//   index: any
//   moveTask: any
// }

// const TaskCard = ({ task, index, moveTask }: Props) => {
//   const [, ref] = useDrag({
//     type: 'TASK',
//     item: { index },
//   })

//   const [, drop] = useDrop({
//     accept: 'TASK',
//     hover: (draggedItem) => {
//       if (draggedItem.index !== index) {
//         moveTask(draggedItem.index, index)
//         draggedItem.index = index
//       }
//     },
//   })

//   return (
//     <div ref={(node) => ref(drop(node))} className="task-card">
//       <h3>{task.title}</h3>
//       <p>{task.description}</p>
//     </div>
//   )
// }

// export default TaskCard
