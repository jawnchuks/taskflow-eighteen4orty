import { render, screen, fireEvent } from '@testing-library/react'
import Search from '../components/ui/search'
import Filter from '../components/ui/filter'

describe('Search Component', () => {
  test('calls onSearch with the correct query', () => {
    const onSearch = jest.fn()
    render(<Search onSearch={onSearch} />)

    const input = screen.getByPlaceholderText(/Search tasks/i)
    fireEvent.change(input, { target: { value: 'meeting' } })

    expect(onSearch).toHaveBeenCalledWith('meeting')
  })
})

describe('Filter Component', () => {
  test('calls onFilterChange with correct filters', () => {
    const onFilterChange = jest.fn()
    render(<Filter onFilterChange={onFilterChange} />)

    const statusDropdown = screen.getByDisplayValue(/All Status/i)
    const priorityDropdown = screen.getByDisplayValue(/All Priority/i)

    fireEvent.change(statusDropdown, { target: { value: 'done' } })
    expect(onFilterChange).toHaveBeenCalledWith({
      status: 'done',
      priority: 'All',
    })

    fireEvent.change(priorityDropdown, { target: { value: 'high' } })
    expect(onFilterChange).toHaveBeenCalledWith({
      status: 'done',
      priority: 'high',
    })
  })
})
