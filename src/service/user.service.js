import InitModels from "../models/init-models.js";
import sequelize from '../config/sequelize.js';


const initModels = InitModels(sequelize);

export async function checkLogin(email, password) {
    let allUser = await initModels.Users.findAll({
        attributes: ['email'],
        where: {
            'email': email,
            'password': password
        }
    });
    if (allUser.length == 0) return false;
    return true;
}

export async function getNameUser(email) {
    let User = await initModels.Users.findAll({
        attributes: ['name'],
        where: {
            'email': email
        },
        limit: 1
    })
    // console.log(User[0].name);
    return User[0].user;
}

export async function getNameId(email) {
    let User = await initModels.Users.findAll({
        attributes: ['id'],
        where: {
            'email': email
        },
        limit: 1
    })
    // console.log(User[0].id);
    return User[0].id;
}

export async function getAllUser(page) {

    let offset = (page - 1) * 10;
    let allUser = await initModels.Users.findAll({
        attributes: ['id', 'name', 'avatar'],
        limit: 10,
        offset: offset
    })
    return allUser;

}

export async function checkExits(email) {
    let check = await initModels.Users.findAll({
        where: {
            email: email
        },
        limit: 1,
        attributes: ['id']
    })
    if (check.length == 0) return false;
    return true;
}

export async function createUser(name, email, password, avatar) {
    try {
        const row = await initModels.Users.create({ 'name': name, 'email': email, 'password': password, 'avatar': avatar });
        if (row.id) return true;
        return false;
    } catch (error) {

    }
}