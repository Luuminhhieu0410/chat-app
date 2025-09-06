import InitModels from "../models/init-models.js";
import sequelize from "../config/sequelize.js";

const initModels = InitModels(sequelize);

export async function checkLogin(email, password) {
  let User = await initModels.Users.findOne({
    where: {
      email: email,
      password: password,
    },
  });
  if (User === null) return null;
  return User;
}

export async function getAllUser(page) {
  try {
    let offset = (page - 1) * 10;
    let allUser = await initModels.Users.findAll({
      limit: 10,
      offset: offset,
    });
    return allUser;
  } catch (error) {
    throw error;
  }
}

export async function getUserByEmail(email) {
  try {
    let User = await initModels.Users.findOne({
      where: {
        email: email,
      },
    });
    return User;
  } catch (error) {
    return null
  }
  
}

export async function createUser(name, email, password, avatar) {
  try {
    const row = await initModels.Users.create({
      name: name,
      email: email,
      password: password,
      avatar: avatar,
    });
    if (row.id) return true;
    return false;
  } catch (error) {}
}
