import { Card, Tooltip } from '@govtechsg/sgds-react'
import { JoinTasksRoomOutboundSchema } from '../../typings/api'
import { Search } from 'react-bootstrap-icons'

import './TaskCard.css'
import { Done } from './Done'
import { Frozen } from './Frozen'

import { currencyFormatter } from '../infra/utils'

export const TaskCard = ({
  task,
  onClickDetail,
  changeDoneStatus,
  changeFrozenStatus,
  userId,
}: {
  task: JoinTasksRoomOutboundSchema[string]
  onClickDetail: () => void
  changeDoneStatus: () => void
  changeFrozenStatus: () => void
  userId: string | null
}) => {
  const isOwner = userId === `${task.user.id}`

  return (
    <div className="TaskCard" key={task.id}>
      <Card aria-label="selectablecard" onChange={changeDoneStatus}>
        <Card.Body className="flexRow">
          <Card.Title as="h5" className="overflowElipsis">
            {task.name}
          </Card.Title>
          <div className="flexStart">
            <p className="noMarginTopAndBottom">Owner: {task.user.name}</p>
            <p className="noMarginTopAndBottom">
              {task.price !== undefined && task.price !== null ? currencyFormatter(task.price) : 'No price informed'}
            </p>
            <p className="noMarginTopAndBottom">
              {task.subTasksPrice !== undefined && task.subTasksPrice !== null ? (
                `SubTasks ${currencyFormatter(task.subTasksPrice)}`
              ) : (
                <br />
              )}
            </p>
          </div>
        </Card.Body>
        <Card.Footer className="CardFooter">
          <i onClick={isOwner ? changeFrozenStatus : undefined} className={isOwner ? 'cursorPointer' : ''}>
            <Frozen frozen={task.frozen} size={25} tooltipPlacement="top" />
          </i>

          <i onClick={isOwner ? changeDoneStatus : undefined} className={isOwner ? 'cursorPointer' : ''}>
            <Done done={task.done} size={25} tooltipPlacement="top" />
          </i>

          <i onClick={onClickDetail} className="cursorPointer">
            <Tooltip content={'View task details'}>
              <Search size={25} />
            </Tooltip>
          </i>
        </Card.Footer>
      </Card>
    </div>
  )
}
