import { io, type Socket } from 'socket.io-client'
import { getToken } from '../infra/sessionService'
import { toast } from 'react-toastify'
import { createContext, ReactNode, useContext, useState } from 'react'
import { HOST } from '../infra/utils'

export type State = {
  socket: Socket | null
  connect: () => void
}

const SocketContext = createContext<State>({} as unknown as State)

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  const connect = () => {
    if (!socket) {
      const newSocket = io(HOST, { auth: { token: getToken() } })

      newSocket.on('connect_error', (err) => {
        toast.error(err.message)
      })

      newSocket.on('disconnect', () => {
        toast.info('Disconnecter')
      })

      newSocket.on('newError', (message: string) => {
        toast.error(message)
      })

      setSocket(newSocket)
    } else {
      if (!socket.connected) {
        socket.connect()
      }
    }
  }

  return (
    <SocketContext.Provider
      value={{
        socket,
        connect,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  return useContext(SocketContext)
}
