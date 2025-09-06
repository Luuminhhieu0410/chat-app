import { config } from "dotenv";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import redisClient from '../helper/redis.js'
import { signAccessToken } from "../helper/jwt.js";
import { getUserByEmail } from "../service/user.service.js";

config();
export async function protectRoute(req, res, next) {
    try {
        let access_token = req.header('Authorization').split(' ')[1];
        if (!access_token) return res.status(401).json({ message: "Unauthorized" });
        // console.log('access_token : ' + access_token);
        jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) return res.status(403).json({ message: "Token hết hạn hoặc không hợp lệ" });
            req.user = payload; // Lưu thông tin user vào request đẩy xuống cho route tiếp
            next(); 
        });
        // console.log(JSON.stringify(req.user));
    } catch (error) {

        console.log('access token hết hạn ');
        next(createHttpError(401, 'Unauthorizaion'));
    }
}
export async function refreshToken(req, res, next) { // tạo access token mới khi hết hạn
    try {
        // console.log("cookies send: " + req.cookies.refresh_token);
        let refresh_token = req.cookies.refresh_token || '';
        if (!refresh_token) {
            return next(createHttpError(401, 'Unauthorizaion'));
        }
        let payload = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, {
            algorithms: 'HS256'
        })
        
        let refreshTokenInRedis = await redisClient.get(`refresh_token_${payload.userId}`);
        if (!refreshTokenInRedis || refreshTokenInRedis !== refresh_token) {
            return res.status(403).json({ message: "Refresh token không hợp lệ" });
        }

        let access_token = await signAccessToken({email: payload.email,userId : payload.userId});
        
        const User = await getUserByEmail(payload.email);

        return res.status(200).json({
            'access_token': access_token,
            data: User
        })
    } catch (error) {
        console.log(error);
        next(error);
    }   
    
}