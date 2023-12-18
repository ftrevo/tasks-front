import { Button, Form, Modal } from '@govtechsg/sgds-react'
import { useState } from 'react'

export const NewModal = ({
  onSubmit,
  show,
  handleClose,
  title,
}: {
  onSubmit: (name: string, price?: string) => void
  show: boolean
  handleClose: () => void
  title: string
}) => {
  const [price, setPrice] = useState<string | undefined>('')
  const [name, setName] = useState('')

  const [errors, setErrors] = useState({
    name: false,
    price: false,
  })

  const validateFields = () => {
    const hasErrors = {
      name: false,
      price: false,
    }

    if (!name.trim()) {
      hasErrors.name = true
    }

    if (price && Number(price) > 21474836.47) {
      hasErrors.price = true
    }

    return hasErrors
  }

  const getIntegerValueNotation = () => {
    if (price?.trim()) {
      const [integer, decimal] = price.split('.')

      return `${integer}${decimal ? decimal.padEnd(2, '0') : '00'}`
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const hasErrors = validateFields()
    setErrors(hasErrors)

    if (!hasErrors.name && !hasErrors.price) {
      const computedPrice = getIntegerValueNotation()

      onSubmit(name.trim(), computedPrice)
      setName('')
      setPrice('')
      handleClose()
    }
  }

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <div className={'mb-2'}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={errors.name}
              />
              <Form.Control.Feedback type="invalid">Name can't be empty</Form.Control.Feedback>
            </div>

            <Form.Label>Price</Form.Label>
            <Form.Control
              // onFocus={(e) => !e.target.value && setPrice('0')}
              id="price"
              type="number"
              value={price}
              min={0}
              step={0.01}
              onChange={(e) => setPrice(e.target.value)}
              isInvalid={errors.price}
            />
            <Form.Control.Feedback type="invalid">Price can't be greater than 21474836.47€</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" as="input" type="submit" value="Create" />
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
