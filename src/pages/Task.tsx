import { useState } from 'react'
import { Button } from '@govtechsg/sgds-react'
import { useParams } from 'react-router-dom'

import { Done, FlexColumn, FlexRow, Frozen, NewModal, SubTaskList } from '../components'

import { currencyFormatter } from '../infra/utils'
import { useTask } from '../hooks/useTask'
import './Task.css'
import { getId } from '../infra/sessionService'

const Task = () => {
  const { id } = useParams()

  const { task, createSubTask } = useTask(`${id}`)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const userId = getId()
  const isOwner = userId === `${task?.user.id}`

  if (!task) {
    return null
  }

  return (
    <div className="my-8 mx-md-8">
      <FlexColumn align="center" justify="center">
        <FlexRow className="maxWidth shadow rounded CardTask" align="center">
          <FlexColumn>
            <h4>{task.name}</h4>
            <p>Owner: {task.user.name}</p>
            <p className="noMarginTopAndBottom">
              {task.price !== undefined && task.price !== null
                ? `${currencyFormatter(task.price)}`
                : 'No price informed'}
            </p>
          </FlexColumn>
          <FlexColumn align="flex-end" justify="center">
            <FlexColumn align="center" justify="flex-end">
              <FlexRow align="center" justify="center">
                <Frozen frozen={task.frozen} size={30} tooltipPlacement="left" useMargin={true} />
                <Done done={task.done} size={30} tooltipPlacement="left" useMargin={true} />
              </FlexRow>
              <Button variant="info" onClick={handleShow} disabled={!isOwner || task.done || task.frozen}>
                New SubTask
              </Button>
            </FlexColumn>
          </FlexColumn>
        </FlexRow>
        <br />
        <FlexRow className="maxWidth">
          <SubTaskList subTasks={task.subTasks} />
          <NewModal onSubmit={createSubTask} show={show} handleClose={handleClose} title="New Subtask" />
        </FlexRow>
      </FlexColumn>
    </div>
  )
}

export default Task
