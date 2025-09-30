import { useContext } from "react";
import { SocketContext } from "@/context/SocketContext";

const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("error socket");
  }
  return context;
};
export default useSocket