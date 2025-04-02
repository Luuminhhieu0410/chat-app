import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
export function signAccessToken(payload){
    return new Promise((resolve,reject) =>{
        jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{
            algorithm:'HS256',
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        },(err,token) =>{
            if(err) reject(err);
            else resolve(token);
        })
    }) 
}
export function signRefreshToken(payload){
    return new Promise((resolve,reject) =>{
        jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{
            algorithm:'HS256',
            expiresIn: process.env.REFRESH_TOKEN_LIFE
        },(err,token) =>{
            if(err) reject(err);
            else resolve(token);
        })
    }) 
    
}


