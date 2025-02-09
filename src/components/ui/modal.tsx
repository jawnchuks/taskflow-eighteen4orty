import React, { useState, ReactNode, useEffect } from 'react'
import { X } from 'react-feather'

interface ModalProps {
  trigger?: ReactNode
  children: (close: () => void) => ReactNode
  isOpen?: boolean
  onClose?: () => void
}

const Modal: React.FC<ModalProps> = ({
  trigger,
  children,
  isOpen: externalOpen,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (typeof externalOpen === 'boolean') {
      setIsOpen(externalOpen)
    }
  }, [externalOpen])

  const openModal = () => setIsOpen(true)
  const closeModal = () => {
    setIsOpen(false)
    if (onClose) {
      onClose()
    }
  }

  return (
    <>
      {trigger && (
        <div
          onClick={openModal}
          style={{ display: 'inline-block', cursor: 'pointer' }}
        >
          {trigger}
        </div>
      )}

      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            {children(closeModal)}
            <button className="modal-close" onClick={closeModal}>
              <X size={16} color="#ffffff" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
