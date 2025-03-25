import { signAccessToken,signRefreshToken } from "../helper/jwt.js";
import client from "../helper/redis.js";
import redisClient from "../helper/redis.js";
import { userLoginValidate } from "../helper/validate.js";
import { checkLogin, getNameId, getNameUser } from "../service/user.service.js";

export async function loginUser(req, res, next) {
    try {
        let { email, password } = req.body;
        let errorValidateMessage = userLoginValidate(req.body);

        if (errorValidateMessage.error) {
            return res.status(200).json(errorValidateMessage.error.details[0]);
        }
        if (!(await checkLogin(email, password))) {
            return res.status(200).json({ 'messages': 'thông tin không chính xác' })
        }
        let userId = await getNameId(email);
        let name = await getNameUser(email);
        // console.log(userId + '  ' + name);
        let payload = {
            'email': email,
            'userId': userId,
            'name': name
        }
        
        let access_token = await signAccessToken(payload);
        let refresh_token = await signRefreshToken(payload);
        
        await redisClient.set(`refresh_token_${userId}`,refresh_token,{EX : 7 * 24 * 60 * 60}); 

        res.cookie("refresh_token", refresh_token, {
            httpOnly: true, // document.cookie
            secure: true, // https
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
        });
       return res.status(201).json({
        'access_token': access_token,
        'message': 'đăng nhập thành công'
       })     

    } catch (error) {
        console.log(err);
    }
}
