import useGameState from "@/store/game"
import { motion } from "framer-motion"
import React, { ChangeEvent } from "react"
import { shallow } from "zustand/shallow"

export interface IRoomIdInputProps {
  roomId: string
  handleRoomIdInput: (roomId: string) => void
}

const RoomIdInput = ({ roomId, handleRoomIdInput }: IRoomIdInputProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      className="flex-1 w-1/2"
    >
      <input
        className="px-4 py-6 text-xl leading-tight text-gray-700 rounded-lg shadow-md "
        type="text"
        id="room-id"
        name="room-id"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => {
          handleRoomIdInput(e.target.value)
        }}
      />
    </motion.div>
  )
}

export default RoomIdInput
