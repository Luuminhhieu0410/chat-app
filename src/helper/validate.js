import Joi from "joi";
export function userLoginValidate(data){
    const userSchema  = Joi.object({
        email: Joi.string().email()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{1,30}$')),
    })
    
    return userSchema.validate(data);
}

// console.log(userLoginValidate({email:'a123@gma.com',password:'123'}).error);

