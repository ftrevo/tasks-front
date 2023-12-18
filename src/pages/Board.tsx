import { useState } from 'react'
import { Button } from '@govtechsg/sgds-react'
import { getId } from '../infra/sessionService'

import { useBoard } from '../hooks/useBoard'
import { TaskList, NewModal } from '../components'

import './Board.css'

const Board = () => {
  const { tasks, createTask, changeStatus, toggleFilter, shouldFilter } = useBoard()

  const userId = getId()

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div className="Board">
      <div>
        <Button variant="primary" onClick={handleShow}>
          New Task
        </Button>{' '}
        <Button variant="secondary" onClick={() => toggleFilter()}>
          {' '}
          {shouldFilter ? 'Show all' : 'Hide done'}{' '}
        </Button>
        <NewModal onSubmit={createTask} show={show} handleClose={handleClose} title="New Task" />
      </div>
      <br />
      <TaskList tasks={Array.from(tasks.values())} toggleChangeStatus={changeStatus} userId={userId} />
    </div>
  )
}

export default Board
