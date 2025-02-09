import React, { useState, useEffect } from 'react'
import Sidebar from '../sidebar'

type Props = {
  children: React.ReactNode
}

const TaskLayout = ({ children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    if (isSidebarOpen) {
      const handleOutsideClick = (event: MouseEvent) => {
        if (
          !(event.target as HTMLElement).closest('.task-sidebar') &&
          !(event.target as HTMLElement).closest('.hamburger')
        ) {
          setIsSidebarOpen(false)
        }
      }
      document.addEventListener('click', handleOutsideClick)
      return () => document.removeEventListener('click', handleOutsideClick)
    }
  }, [isSidebarOpen])

  return (
    <main className="task-layout">
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside className={`task-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button
          className="hamburger"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {!isSidebarOpen ? <>☰</> : <>✖</>}
        </button>
        <Sidebar />
      </aside>

      <section className="task-content">{children}</section>
    </main>
  )
}

export default TaskLayout
