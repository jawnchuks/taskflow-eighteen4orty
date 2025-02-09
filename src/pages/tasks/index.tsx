import { useState } from 'react'
import TaskLayout from '../../components/layout/task'
import Tabs from '../../components/ui/tabs'

import { useFetchTasks } from '../../hooks/use-fetch-task'
import TaskForm from '../../components/layout/task/task-form'
import Search from '../../components/ui/search'
import Filter from '../../components/ui/filter'
import Modal from '../../components/ui/modal'
import ListView from '../../components/ui/list-view'
import BoardView from '../../components/ui/board-view'

const TaskPage = () => {
  const [activeTab, setActiveTab] = useState('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({ status: 'All', priority: 'All' })
  const tasks = useFetchTasks()

  const filteredTasks = tasks.filter((task) => {
    const matchesQuery =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      filters.status === 'All' || task.status === filters.status

    const matchesPriority =
      filters.priority === 'All' || task.priority === filters.priority

    return matchesQuery && matchesStatus && matchesPriority
  })

  const tabs = [
    { label: 'List View', value: 'list' },
    { label: 'Board View', value: 'board' },
  ]

  return (
    <TaskLayout>
      <h5>Tasks</h5>
      <div className="task_header flex">
        <Tabs tabs={tabs} defaultTab="list" onChange={setActiveTab} />
        <span className="flex mt">
          <Search onSearch={setSearchQuery} />
          <Modal trigger={<button className="button_primary">Add Task</button>}>
            {(close) => (
              <>
                <h5>Add New Task</h5>
                <TaskForm onClose={close} />
              </>
            )}
          </Modal>
          <Filter onFilterChange={setFilters} />
        </span>
      </div>
      <section className="task_content">
        {activeTab === 'list' ? (
          <ListView tasks={filteredTasks} />
        ) : (
          <BoardView tasks={filteredTasks} />
        )}
      </section>
    </TaskLayout>
  )
}

export default TaskPage
