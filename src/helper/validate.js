import Joi from "joi";
export function userLoginValidate(objectData){
    const userSchema  = Joi.object({
        email: Joi.string().email()
        .required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{1,30}$')).message('Mật khẩu chỉ chứa kí tự và số và tối đa 30 kí tự'),
    })
    
    return userSchema.validate(objectData);
}


// console.log(userLoginValidate({email:'a123@gma.com',password:'123'}).error);

export function userRegisterValidate(objectData){
    const registerSchema = Joi.object({
        name:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{1,30}$')).message('Tên chỉ chứa kí tự và số và tối đa 30 kí tự'),
        email:Joi.string().email()
        .min(3)
        .max(50),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{1,30}$')).message('Mật khẩu chỉ chứa kí tự và số và tối đa 30 kí tự'),
    })
    return registerSchema.validate(objectData);
}