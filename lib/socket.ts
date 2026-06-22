import { io, Socket } from 'socket.io-client'

type SocketEvents = {
  'queue:update': (data: { placeId: string; waitMinutes: number; occupied: number }) => void
  'traffic:update': (data: { points: Array<{ lat: number; lng: number; density: number }> }) => void
  'parking:update': (data: { id: string; available: number }) => void
}

let socket: Socket | null = null

export function getSocket(): Socket | null {
  const url = process.env.NEXT_PUBLIC_SOCKET_URL
  if (!url) return null

  if (!socket) {
    socket = io(url, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    })
  }
  return socket
}

export function onSocketEvent<K extends keyof SocketEvents>(
  event: K,
  handler: SocketEvents[K],
): () => void {
  const s = getSocket()
  if (!s) return () => {}
  s.on(event as string, handler as (...args: unknown[]) => void)
  return () => s.off(event as string, handler as (...args: unknown[]) => void)
}

export function disconnectSocket() {
  socket?.disconnect()
  socket = null
}
