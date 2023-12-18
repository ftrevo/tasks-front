import { useNavigate } from 'react-router-dom'
import { ChangeTaskStatusInboundSchema, JoinTasksRoomOutboundSchema } from '../../typings/api'
import { TaskCard } from './TaskCard'

export const TaskList = ({
  tasks,
  toggleChangeStatus,
  userId,
}: {
  tasks?: Array<JoinTasksRoomOutboundSchema[string]>
  toggleChangeStatus: (params: ChangeTaskStatusInboundSchema) => void
  userId: string | null
}) => {
  const navigate = useNavigate()

  if (!tasks || tasks.length === 0) {
    return <div className="displayFlex">There are no tasks at the moment.</div>
  }

  return (
    <div className="displayFlex" id="asd">
      {tasks.map((task) => {
        return (
          <TaskCard
            key={task.id}
            task={task}
            onClickDetail={() => navigate(`/task/${task.id}`)}
            changeDoneStatus={() => toggleChangeStatus({ id: task.id, status: task.done, field: 'done' })}
            changeFrozenStatus={() => toggleChangeStatus({ id: task.id, status: task.frozen, field: 'frozen' })}
            userId={userId}
          />
        )
      })}
    </div>
  )
}
