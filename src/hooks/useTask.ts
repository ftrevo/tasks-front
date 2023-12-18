import { useCallback, useEffect, useState } from 'react'
import {
  ChangeTaskStatusOutboundSchema,
  CreateSubTaskOutboundSchema,
  JoinTaskDetailsRoomOutboundSchema,
} from '../../typings/api'
import { useSocket } from '../context/socket'

type Task = {
  task: JoinTaskDetailsRoomOutboundSchema | null
  createSubTask: (name: string, price?: string) => void
}

export const useTask = (taskId: string): Task => {
  const room = `tasks/${taskId}`
  const { socket, connect } = useSocket()

  const [task, setTask] = useState<JoinTaskDetailsRoomOutboundSchema | null>(null)

  const createSubTask = useCallback(
    (name: string, price?: string) => {
      if (socket) {
        socket.emit('createSubTask', { price, name, taskId })
      }
    },
    [socket]
  )

  useEffect(() => {
    if (socket !== null) {
      socket.emit('joinRoom', room)

      // TROCAR O NOME DO EVENTO
      socket.on(room, (task: JoinTaskDetailsRoomOutboundSchema) => {
        setTask(task)
      })

      socket.on('newSubTask', (subTask: CreateSubTaskOutboundSchema) => {
        setTask((previousTask) => {
          if (!previousTask) {
            return null
          }

          const previusSubtasks = previousTask.subTasks ?? []

          return {
            ...previousTask,
            subTasks: [...previusSubtasks, subTask],
          }
        })
      })

      socket.on('statusUpdated', ({ field, status }: ChangeTaskStatusOutboundSchema) => {
        setTask((previousTask) => {
          if (!previousTask) {
            return null
          }

          return {
            ...previousTask,
            done: field === 'done' ? status : previousTask.done,
            frozen: field === 'frozen' ? status : previousTask.frozen,
          }
        })
      })
    } else {
      connect()
    }

    const leaveRoom = () => {
      socket?.emit('leaveRoom', room)
      socket?.off('newSubTask')
      socket?.off('statusUpdated')
    }

    return leaveRoom
  }, [socket])

  return {
    task,
    createSubTask,
  }
}
