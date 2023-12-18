import React, { useState } from 'react'
import { Form, Button } from '@govtechsg/sgds-react'

import { resetPassword } from '../infra/repository'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Section } from '../components'

export const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  const validateFields = () => {
    if (email.trim().length < 3 || !email.trim().includes('@')) {
      return true
    }

    return false
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const hasError = validateFields()
    setError(hasError)

    if (!hasError) {
      try {
        await resetPassword(email)
        navigate('/change-password')
      } catch (err: any) {
        toast.error(err.message)
      }
    }
  }

  return (
    <Section>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={error} />
          <Form.Control.Feedback type="invalid">Invalid email</Form.Control.Feedback>
        </Form.Group>
        <div className="mid">
          <Button variant="secondary" as="input" type="submit" value="Reset Password" />
          <br />
          Did you remember your password?{' '}
          <a href="/login" className="text-decoration-none">
            Log in
          </a>
        </div>
      </Form>
    </Section>
  )
}
