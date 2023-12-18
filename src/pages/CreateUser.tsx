import React, { useState } from 'react'
import { Form, Button } from '@govtechsg/sgds-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { create } from '../infra/repository'
import { setData } from '../infra/sessionService'
import { Section } from '../components'

import './CreateUser.css'

export const CreateUser = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  })

  const navigate = useNavigate()

  const validateFields = () => {
    const errors = {
      name: false,
      email: false,
      password: false,
    }
    if (!name.trim()) {
      errors.name = true
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

    if (!hasError.name && !hasError.email && !hasError.password) {
      try {
        const response = await create(name.trim(), email.trim(), password.trim())
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
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} isInvalid={errors.name} />
          <Form.Control.Feedback type="invalid">Name can't be empty</Form.Control.Feedback>
        </Form.Group>

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
        <div className="mid">
          <Button variant="secondary" as="input" type="submit" value="Create User" />
          <br />
          Already a registered?{' '}
          <a href="/login" className="text-decoration-none">
            Log in
          </a>
        </div>
      </Form>
    </Section>
  )
}
