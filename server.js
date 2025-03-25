// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import http from 'http'
import userRoute from './src/routes/user.route.js'
import createHttpError from 'http-errors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { verifyToken } from './src/helper/jwt.js';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use('/user',userRoute);
// app.get('/setCookie',(req,res) =>{
//    res.cookie('name','cookie set',{
//     maxAge: 3600, // 1 hour
//     httpOnly:true,
//     secure: true
//    })
//    res.send('123');
// })
// app.get('/getCookie',(req,res) =>{
//     res.send(req.cookies);
//  })
app.get('/test',async (req,res)=>{
   let access_token =  jwt.sign({user:'hieu',age:'1'},process.env.ACCESS_TOKEN_SECRET,{
    algorithm:'HS256',
    expiresIn: 15
   })
   res.send(access_token);
})
app.get('/test1',async (req,res)=>{
    let token = req.header('Authorization').split(' ')[1];
    let payload;
    try {
    payload = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,{
        algorithms:'HS256'
    })
    } catch (error) {
        console.log(error);
    }
    res.json(payload);
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


