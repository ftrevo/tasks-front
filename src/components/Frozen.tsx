import { Tooltip } from '@govtechsg/sgds-react'
import { Snow2 } from 'react-bootstrap-icons'

import './Frozen.css'

export const Frozen = ({
  frozen,
  size,
  tooltipPlacement,
  useMargin,
}: {
  frozen: boolean
  size: number
  tooltipPlacement: 'top' | 'left'
  useMargin?: boolean
}) => {
  return (
    <Tooltip content={frozen ? 'This task is frozen' : "This task isn't frozen"} placement={tooltipPlacement}>
      <Snow2 color={frozen ? 'blue' : 'gray '} size={size} className={useMargin ? 'Frozen' : ''} />
    </Tooltip>
  )
}
