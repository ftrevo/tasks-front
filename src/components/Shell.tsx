import { Button } from '@govtechsg/sgds-react'
import { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import './Shell.css'

export const Shell = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <div className="Shell">
      <nav className="shadow rounded p-3 my-3 mx-md-5 Nav">
        <Button variant="light" onClick={() => navigate('/board')}>
          <i aria-hidden="true" className="bi bi-box-arrow-left" hidden={pathname === '/board'} /> Board
        </Button>

        <Button
          variant="light"
          onClick={() => {
            localStorage.clear()
            navigate('/login')
          }}
        >
          Logout <i aria-hidden="true" className="bi bi-box-arrow-right" />
        </Button>
      </nav>
      {children}
    </div>
  )
}
