import { Table } from '@govtechsg/sgds-react'
import { JoinTaskDetailsRoomOutboundSchema } from '../../typings/api'
import { currencyFormatter } from '../infra/utils'

export const SubTaskList = ({ subTasks }: { subTasks?: JoinTaskDetailsRoomOutboundSchema['subTasks'] }) => {
  if (subTasks?.length === 0) {
    return null
  }

  return (
    <Table size="sm" hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Owner</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {subTasks?.map((subTask) => {
          return (
            <tr key={subTask.id}>
              <td>{subTask.name}</td>
              <td>{subTask.user.name}</td>
              <td>{subTask.price ? currencyFormatter(subTask.price) : ''}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}
