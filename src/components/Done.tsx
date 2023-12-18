import { Tooltip } from '@govtechsg/sgds-react'
import { CheckCircleFill } from 'react-bootstrap-icons'

import './Done.css'

export const Done = ({
  done,
  size,
  tooltipPlacement,
  useMargin,
}: {
  done: boolean
  size: number
  tooltipPlacement: 'top' | 'left'
  useMargin?: boolean
}) => {
  return (
    <Tooltip content={done ? 'This task is done' : "This task isn't done"} placement={tooltipPlacement}>
      <CheckCircleFill color={done ? 'green' : 'gray'} size={size} className={useMargin ? 'Done' : ''} />
    </Tooltip>
  )
}
