import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
configDotenv();
export function signAccessToken(payload){
    return new Promise((resolve,reject) =>{
        jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{
            algorithm:'HS256',
            expiresIn: 15 * 60 // 1 hour
        },(err,token) =>{
            if(err) reject(err);
            else resolve(token);
        })
    }) 
}
export function signRefreshToken(payload){
    return new Promise((resolve,reject) =>{
        jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{
            algorithm:'HS256',
            expiresIn: 15 * 60 // 1 hour
        },(err,token) =>{
            if(err) reject(err);
            else resolve(token);
        })
    }) 
}


export function verifyToken(token){
   
    return new Promise((resolve,reject) =>{
        try {
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,payload) =>{
                if(err) reject(err);
                else resolve(payload);
            })
        } catch (error) {
            console.log('error : '  + error)
        }
    })
}

