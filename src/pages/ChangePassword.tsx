import React, { useState } from 'react'
import { Form, Button } from '@govtechsg/sgds-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { changePassword } from '../infra/repository'
import { setData } from '../infra/sessionService'

import { Section } from '../components'

export const ChangePassword = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [resetCode, setResetCode] = useState('')

  const [errors, setErrors] = useState({
    resetCode: false,
    email: false,
    password: false,
  })

  const navigate = useNavigate()

  const validateFields = () => {
    const errors = {
      resetCode: false,
      email: false,
      password: false,
    }
    if (!resetCode.trim()) {
      errors.resetCode = true
    }

    if (!password.trim() || password.trim().length < 5) {
      errors.password = true
    }

    if (email.trim().length < 3 || !email.trim().includes('@')) {
      errors.email = true
    }

    return errors
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const hasError = validateFields()
    setErrors(hasError)

    if (!hasError.resetCode && !hasError.email && !hasError.password) {
      try {
        const response = await changePassword(email.trim(), password.trim(), resetCode.trim())
        setData(response)
        navigate('/board')
      } catch (err: any) {
        toast.error(err.body?.message ?? err.message)
      }
    }
  }

  return (
    <Section>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={errors.email} />
          <Form.Control.Feedback type="invalid">Invalid email</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={errors.password}
          />
          <Form.Control.Feedback type="invalid">Password must have at least 5 characters</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="resetCode">
          <Form.Label>Reset Code</Form.Label>
          <Form.Control
            type="text"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            isInvalid={errors.resetCode}
          />
          <Form.Control.Feedback type="invalid">Reset code can't be empty</Form.Control.Feedback>
        </Form.Group>
        <div className="mid">
          <Button variant="secondary" as="input" type="submit" value="Change Password" />
        </div>
      </Form>
    </Section>
  )
}
