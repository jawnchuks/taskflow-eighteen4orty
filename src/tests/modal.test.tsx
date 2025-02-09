import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Modal from '../components/ui/modal'

describe('Modal Component', () => {
  test('renders trigger and opens modal on click', () => {
    render(
      <Modal trigger={<button>Open Modal</button>}>
        {(close: () => void) => (
          <div role="dialog">
            Modal Content
            <button onClick={close}>Close</button>
          </div>
        )}
      </Modal>
    )

    expect(screen.getByText(/Open Modal/i)).toBeInTheDocument()

    fireEvent.click(screen.getByText(/Open Modal/i))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  test('closes modal when close button is clicked', () => {
    render(
      <Modal trigger={<button>Open Modal</button>}>
        {(close: () => void) => (
          <div role="dialog">
            Modal Content
            <button onClick={close}>Close</button>
          </div>
        )}
      </Modal>
    )

    fireEvent.click(screen.getByText(/Open Modal/i))

    const closeButton = screen.getByText(/Close/i)
    fireEvent.click(closeButton)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
