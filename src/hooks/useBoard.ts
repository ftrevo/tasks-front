import { useCallback, useEffect, useState } from 'react'
import {
  ChangeTaskStatusInboundSchema,
  ChangeTaskStatusOutboundSchema,
  CreateTaskOutboundSchema,
  JoinTasksRoomOutboundSchema,
} from '../../typings/api'
import { useSocket } from '../context/socket'

type Board = {
  tasks: Array<JoinTasksRoomOutboundSchema[string]>
  createTask: (name: string, price?: string) => void
  changeStatus: (params: ChangeTaskStatusOutboundSchema) => void
  toggleFilter: () => void
  shouldFilter: boolean
}

export const useBoard = (): Board => {
  const { socket, connect } = useSocket()

  const [tasks, setTasks] = useState(new Map<string, JoinTasksRoomOutboundSchema[string]>())
  const [shouldFilter, setShouldFilter] = useState(false)

  const createTask = useCallback(
    (name: string, price?: string) => {
      if (socket) {
        socket.emit('createTask', { price, name })
      }
    },
    [socket]
  )

  const changeStatus = useCallback(
    ({ id, status, field }: ChangeTaskStatusInboundSchema): void => {
      if (socket) {
        socket.emit('changeStatus', { id, status: !status, field })
      }
    },
    [socket]
  )

  const toggleFilter = useCallback(() => {
    const nextStatus = !shouldFilter

    setShouldFilter(nextStatus)
  }, [shouldFilter, setShouldFilter])

  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', 'tasks')

      socket.on('getTasks', (tasks: JoinTasksRoomOutboundSchema) => {
        setTasks(new Map(Object.entries(tasks)))
      })

      socket.on('newTask', (task: CreateTaskOutboundSchema) => {
        setTasks((tasksMap) => {
          const newTasksMap = new Map(tasksMap)
          newTasksMap.set(`${task.id}`, task)
          return newTasksMap
        })
      })

      socket.on('statusUpdated', ({ id, field, status }: ChangeTaskStatusOutboundSchema) => {
        setTasks((tasksMap) => {
          const mapTaskId = `${id}`

          const task = tasksMap.get(mapTaskId)
          if (task) {
            const newTasksMap = new Map(tasksMap)
            if (field === 'done') {
              task.done = status
            } else {
              task.frozen = status
            }
            newTasksMap.set(mapTaskId, task)
            return newTasksMap
          }
          return tasksMap
        })
      })

      socket.on(
        'addSubTask',
        ({ taskId, price, action }: { taskId: number; price: number; action: 'add' | 'remove' }) => {
          setTasks((tasksMap) => {
            const mapTaskId = `${taskId}`
            const task = tasksMap.get(mapTaskId)
            if (task) {
              const newTask = { ...task, subTasksPrice: task.subTasksPrice ?? 0 }
              if (action === 'add') {
                newTask.subTasksPrice = newTask.subTasksPrice + price
              } else {
                newTask.subTasksPrice = newTask.subTasksPrice - price
              }
              const newTasksMap = new Map(tasksMap)
              newTasksMap.set(mapTaskId, newTask)
              return newTasksMap
            }
            return tasksMap
          })
        }
      )
    } else {
      connect()
    }

    const leaveRoom = () => {
      socket?.emit('leaveRoom', 'tasks')
      socket?.off('statusUpdated')
      socket?.off('addSubTask')
      socket?.off('newTask')
      socket?.off('getTasks')
    }

    return leaveRoom
  }, [socket])

  return {
    tasks: shouldFilter ? Array.from(tasks.values()).filter((task) => !task.done) : Array.from(tasks.values()),
    shouldFilter,
    createTask,
    changeStatus,
    toggleFilter,
  }
}
