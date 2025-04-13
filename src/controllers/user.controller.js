import { signAccessToken, signRefreshToken } from "../helper/jwt.js";
import redisClient from "../helper/redis.js";
import { userLoginValidate, userRegisterValidate } from "../helper/validate.js";
import { checkLogin, getIdUser, getNameUser, getAllUser as _getAllUser, checkExits, createUser } from "../service/user.service.js";
// import { io } from "../helper/socket.js";
import fs from 'fs';
export default async function loginUser(req, res, next) {
    try {
        
        let { email, password } = req.body;
        console.log('test' + email + password);
        if (!email || !password) {
            return res.status(500).json({ success: false, 'message': "Vui lòng nhập đầy đủ thông tin" });
        }

        // email = email.trim();
        // password = password.trim();

        // let validateMessage = userLoginValidate({email,password});
        // if (validateMessage.error) {
        //     return res.status(500).json({"message":validateMessage.error.details[0].message});
        // }    
        if (!(await checkLogin(email, password))) {
            return res.status(500).json({ success: false, 'message': 'thông tin không chính xác' })
        }
        let userId = await getIdUser(email);
        let name = await getNameUser(email);
        // console.log(userId + '  ' + name);
        let payload = {
            'email': email,
            'userId': userId,
            'name': name
        }

        let access_token = await signAccessToken(payload);
        let refresh_token = await signRefreshToken(payload);
        // console.log(refresh_token);
        // kiểm tra trước khi lưu , khắc phục lỗi đăng nhập trên nhiều thiết bị
        let refreshTokenInRedis = await redisClient.get(`refresh_token_${userId}`);
        if (refreshTokenInRedis === null) {
            await redisClient.set(`refresh_token_${userId}`, refresh_token, { EX: 7 * 24 * 60 * 60 });
            res.cookie("refresh_token", refresh_token, {
                httpOnly: true, // document.cookie
                secure: true, // https
                sameSite: "Strict",
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
            });
        }
        
        return res.status(201).json({
            'access_token': access_token,
            success: true,
            'message': 'đăng nhập thành công',
            userId
        })

    } catch (error) {
        console.log(error);
        next(error);
    }

}

export async function registerUser(req, res, next) {
    try {
        let { email, name, password, captcha } = req.body;
        // console.log(req.file); // dữ liệu file lấy được từ multer , do multer là middleware đứng trước 
        if (!email || !name || !password || !captcha) {
            fs.unlinkSync(req.file.path);
            return res.status(500).json({ success: false, 'message': "Vui lòng nhập đầy đủ thông tin" });
        }

        if (req.session.captcha !== captcha) {
            fs.unlinkSync(req.file.path);
            return res.status(500).json({ success: false, 'message': "Captcha sai hoặc đã hết hạn" });
        }

        let validateMessage = userRegisterValidate({ email, name, password });

        if (validateMessage.error) {
            fs.unlinkSync(req.file.path);
            return res.status(500).json({ success: false, 'message': validateMessage.error.details[0].message });
        }
        if (await checkExits(email)) {
            fs.unlinkSync(req.file.path);
            return res.status(500).json({ success: false, 'message': 'Email đã tồn tại !' });
        }
        const avatar = req.file ? req.file.filename : null;
        const user = await createUser(name, email, password, avatar);
        if (createUser) return res.status(201).json({ success: true, 'message': "Đăng kí thành công" })
        res.status(500).json({ success: false, 'message': "Lỗi đăng ký tài khoản" })
    } catch (error) {
        next(error);
    }

}

export async function getAllUser(req, res, next) {
    let page = req.params.page;
    let allUser = await _getAllUser(page);
    res.status(201).json(allUser);
}

export async function logOut(req, res, next) {
    let {userId} = req.user // lấy từ protectRoute trong auth.js
    redisClient.del(`refresh_token_${userId}`);
    res.clearCookie('refresh_token'); 
    return res.status(200).json({ message: 'Logged out' }); // client nhận status ok , xóa local storage
} 


export async function updateDataUser(req,res,next){
    
}