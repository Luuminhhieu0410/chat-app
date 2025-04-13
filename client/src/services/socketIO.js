
import { io } from "socket.io-client";


let socket = io("http://localhost:5000" );

socket.on('user-connect',(data) => {console.log('socket-id-online' + data)});

// create an instance/connection here
export {socket};