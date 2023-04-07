import React from "react"
import { Socket } from "socket.io-client"

export interface ISocketContextState {
  socket: Socket | undefined
}

export const defaultSocketContextState: ISocketContextState = {
  socket: undefined,
}

export type TSocketContextActions =
  | "update_socket"
  | "update_uid"
  | "update_users"
  | "remove_user"
export type TSocketContextPayload = string | string[] | Socket

export interface ISocketContextActions {
  type: TSocketContextActions
  payload: TSocketContextPayload
}

export const SocketReducer = (
  state: ISocketContextState,
  action: ISocketContextActions,
) => {
  console.log(
    "Message recieved - Action: " + action.type + " - Payload: ",
    action.payload,
  )

  switch (action.type) {
    case "update_socket":
      return { ...state, socket: action.payload as Socket }
    default:
      return state
  }
}

export interface ISocketContextProps {
  SocketState: ISocketContextState
  SocketDispatch: React.Dispatch<ISocketContextActions>
}

export const SocketContext = React.createContext<ISocketContextProps>({
  SocketState: defaultSocketContextState,
  SocketDispatch: () => {},
})

export const SocketContextProvider = SocketContext.Provider
