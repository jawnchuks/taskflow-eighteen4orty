import React, { useState } from 'react'

interface FilterValues {
  status: string
  priority: string
}

interface FilterProps {
  onFilterChange?: (filters: FilterValues) => void
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [status, setStatus] = useState('All')
  const [priority, setPriority] = useState('All')

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value
    setStatus(newStatus)
    if (onFilterChange) onFilterChange({ status: newStatus, priority })
  }

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPriority = e.target.value
    setPriority(newPriority)
    if (onFilterChange) onFilterChange({ status, priority: newPriority })
  }

  return (
    <div className="filter flex">
      <select
        value={status}
        onChange={handleStatusChange}
        className="filter_dropdown"
      >
        <option value="All">All Status</option>
        <option value="to-do">To-Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <select
        value={priority}
        onChange={handlePriorityChange}
        className="filter_dropdown"
      >
        <option value="All">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  )
}

export default Filter
