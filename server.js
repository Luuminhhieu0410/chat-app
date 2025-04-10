import dotenv from 'dotenv';
dotenv.config();

import createHttpError from 'http-errors';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import path from 'path';
import multer from 'multer';
import session from 'express-session';
import express from 'express'

import userRoute from './src/routes/user.route.js'
import messageRoute from './src/routes/message.route.js'
import captchaRoute from './src/middleware/recaptcha.js';
import { refreshToken } from './src/middleware/auth.js';
import { io, app, server } from './src/helper/socket.js'


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    session({
        secret: "edb3568e96834b48f59c6da785891c580247dc9b0cd876f51dc",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }, // Lưu 60 giây
    })
);


app.use('/home', express.static(path.join(path.resolve(), '/src/public'))) // lỗi __dirname
app.use('/home', express.static(path.join(path.resolve(), '/uploads'))) // lỗi __dirname
app.use('/api/captcha', captchaRoute);
app.use('/api/user', userRoute);
app.use('/api/user/refresh-token', refreshToken)
app.use('/api/message', messageRoute);

app.post('/test', multer({ dest: 'uploads' }).single('avatar'), (req, res, next) => {
    console.log('text');
    res.json(req.file);
})

app.use((req, res, next) => {
    next(createHttpError.NotFound());
})

app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message
    })
})


server.listen(5000, () => {
    console.log('listening on port 5000')
})




