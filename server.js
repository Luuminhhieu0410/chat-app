import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import http from 'http'
import userRoute from './src/routes/user.route.js'
import createHttpError from 'http-errors';
import cookieParser from 'cookie-parser';
import { refreshToken } from './src/middleware/auth.js';
import cors from 'cors'
import path from 'path';
import multer from 'multer';


const app = express();

const server = http.createServer(app);

app.use(cors());    
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/home',express.static(path.join(path.resolve(),'/src/public'))) // lỗi __dirname
app.use('/user',userRoute);
app.use('/api/auth/refresh-token',refreshToken)

app.post('/test',multer({dest: 'uploads'}).single('avatar'),(req,res,next) =>{
    console.log('text');    
    res.json(req.file);
})

app.use((req,res,next) => {
    next(createHttpError.NotFound());
})
app.use((err,req,res,next)=>{
    res.json({
        status:err.status || 500,
        message: err.message
    })
})

server.listen(5000, () => {
    console.log('listening on port 5000')
})


