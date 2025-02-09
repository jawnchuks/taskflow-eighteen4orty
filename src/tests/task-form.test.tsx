import { render, screen, fireEvent } from '@testing-library/react'
import { useTaskStore } from '../store/task.store'
import TaskForm from '../components/layout/task/task-form'

jest.mock('../store/task.store', () => ({
  useTaskStore: jest.fn() as jest.Mock,
}))

describe('TaskForm Component', () => {
  const mockAddTask = jest.fn()
  const mockUpdateTask = jest.fn()

  beforeEach(() => {
    ;(useTaskStore as unknown as jest.Mock).mockReturnValue({
      addTask: mockAddTask,
      updateTask: mockUpdateTask,
    })
  })

  test('shows validation errors for empty input', () => {
    const onClose = jest.fn()
    render(<TaskForm onClose={onClose} />)

    // Submit the form without filling inputs.
    fireEvent.submit(
      screen.getByRole('button', { name: /Add Task/i }) ||
        screen.getByText(/Add Task/i)
    )

    // Verify validation errors appear.
    expect(screen.getByText(/Title is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Description is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Due date is required/i)).toBeInTheDocument()
  })

  test('submits valid data and calls onClose', () => {
    const onClose = jest.fn()
    render(<TaskForm onClose={onClose} />)

    const titleInput = screen.getByPlaceholderText(/Enter task title/i)
    const descriptionInput = screen.getByPlaceholderText(
      /Enter task description/i
    )
    const dueDateInput = screen.getByLabelText(/Due Date/i)

    fireEvent.change(titleInput, { target: { value: 'Test Task' } })
    fireEvent.change(descriptionInput, {
      target: { value: 'Task description' },
    })
    fireEvent.change(dueDateInput, { target: { value: '2025-12-31' } })

    fireEvent.submit(
      screen.getByRole('button', { name: /Add Task/i }) ||
        screen.getByText(/Add Task/i)
    )

    expect(mockAddTask).toHaveBeenCalled()
    expect(onClose).toHaveBeenCalled()
  })
})
