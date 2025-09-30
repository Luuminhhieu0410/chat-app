import React, { createContext, useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { server } from "@/utils/server";
import { useUserStore } from "@/stores/UserStore";

interface SocketContextType {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextType>({ socket: null });

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);
  const { id } = useUserStore();

  useEffect(() => {
    const socket = io(server.baseUrl, { transports: ["websocket"] });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🔌 Socket connected:", socket.id);
    });

    socket.on("ping", (ping) => {
      console.log("ping:", ping);
    });

    // join room khi có user id
    if (id) {
      const lastUserChat = JSON.parse(localStorage.getItem("lastUserChat") || "null");
      const idLastUser = lastUserChat?.id ?? null;

      if (idLastUser) {
        const roomId = [id, idLastUser].sort().join("_");
        console.log('room id (Socket Context) ' + roomId);
        socket.emit("send-room", roomId);
      }
    }

    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, [id]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};
