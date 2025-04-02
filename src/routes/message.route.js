import {getMessageForTwo, sendMessage} from '../controllers/message.controller.js'
import express from 'express'
import { protectRoute } from '../middleware/auth.js';
const route = express.Router();

route.get("/conversation/:senderId/:receiverId",protectRoute,getMessageForTwo);
route.post("/send/:receiverId",protectRoute,sendMessage);
export default route;