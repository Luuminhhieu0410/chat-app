import {deleteMessage, getMessageForTwo, sendMessage} from '../controllers/message.controller.js'
import express from 'express'
import { protectRoute } from '../middleware/auth.js';
const route = express.Router();

route.get("/conversation/:receiverId",protectRoute,getMessageForTwo);
route.post("/send/:receiverId",protectRoute,sendMessage);
route.delete('/:messageId',protectRoute,deleteMessage);
export default route;