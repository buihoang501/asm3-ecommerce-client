import { io } from "socket.io-client";
//Connect socket io backend
const socket = io(process.env.REACT_APP_BACKEND_API);

//Export socket io client
export default socket;
