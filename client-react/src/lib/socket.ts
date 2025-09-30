import { server } from "@/utils/server";
import { io } from "socket.io-client";

const socket = io(server.baseUrl, {
    transports:['websocket']
});

socket.on('ping', (ping) => {
    console.log(ping);
})


export default socket;
