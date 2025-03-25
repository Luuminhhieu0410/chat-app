import InitModels from "../models/init-models.js"; 
import sequelize from '../config/sequelize.js';
import  {DataTypes, where} from 'sequelize';


const initModels = InitModels(sequelize);

export async function checkLogin(email,password){
    let allUser = await initModels.Users.findAll({
        attribute: ['email'],
        where : {
            'email' : email,
            'password' : password
        }
    });
    if(allUser.length == 0) return false;
    return true;    
}

export async function getNameUser(email){
    let User = await initModels.Users.findAll({
        where:{
            'email': email
        },
        limit: 1
    })
    // console.log(User[0].username);
    return User[0].username;
}

export async function getNameId(email){
    let User = await initModels.Users.findAll({
        where:{
            'email': email
        },
        limit: 1
    })
    // console.log(User[0].id);
    return User[0].id;
}
