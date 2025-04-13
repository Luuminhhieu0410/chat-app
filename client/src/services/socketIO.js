
import { io } from "socket.io-client";


let socket = io("http://localhost:5000" );


// create an instance/connection here
export {socket};