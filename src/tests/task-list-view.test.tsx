import { render, screen, fireEvent } from '@testing-library/react'
import { Task } from '../types/task'
import ListView from '../components/ui/list-view'

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Test Task 1',
    description: 'Description 1',
    dueDate: new Date().toISOString(),
    priority: 'high',
    status: 'to-do',
  },
  {
    id: '2',
    title: 'Test Task 2',
    description: 'Description 2',
    dueDate: new Date().toISOString(),
    priority: 'low',
    status: 'done',
  },
]

describe('ListView Component', () => {
  test('renders tasks in a table', () => {
    render(<ListView tasks={mockTasks} />)
    expect(screen.getByText(/Test Task 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Test Task 2/i)).toBeInTheDocument()
  })

  test('opens actions dropdown when action button is clicked', () => {
    render(<ListView tasks={mockTasks} />)
    const actionButton = screen.getAllByText('⋮')[0]
    fireEvent.click(actionButton)
    expect(screen.getByText(/View/i)).toBeInTheDocument()
    expect(screen.getByText(/Edit/i)).toBeInTheDocument()
    expect(screen.getByText(/Delete/i)).toBeInTheDocument()
  })
})
