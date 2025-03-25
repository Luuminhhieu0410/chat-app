import {loginUser} from '../controllers/user.controller.js';
import express from 'express'
const route = express.Router();

route.get('',loginUser);

export default route;