import InitModels from "../models/init-models.js";
import sequelize from "../config/sequelize.js";
import { Op } from "sequelize";

const initModels = InitModels(sequelize);

export async function checkLogin(email, password) {
  let User = await initModels.users.findOne({
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
      let allUser = await initModels.users.findAll({
        limit: 10,
        offset: offset,
      });
      return allUser;
    } catch (error) {
      throw error;
    }
  }

export const getConversationForSibar = async (currentUserId) => {
  try {
    const users = await initModels.users.findAll({
      where: { id: { [Op.ne]: currentUserId } },
      attributes: ["id", "name", "avatar", "is_online"],
    });

    // lấy last message với từng user
    const conversations = await Promise.all(
      users.map(async (friend) => {
        const lastMsg = await initModels.private_messages.findOne({
          where: {
            [Op.or]: [
              { sender_id: currentUserId, receiver_id: friend.id },
              { sender_id: friend.id, receiver_id: currentUserId },
            ],
          },
          order: [["created_at", "DESC"]],
        });

        const unreadCount = await initModels.private_messages.count({
          where: {
            sender_id: friend.id,
            receiver_id: currentUserId,
            is_read: false,
          },
        });

        return {
          id: friend.id,
          name: friend.name,
          avatarSrc: friend.avatar,
          isOnline: friend.is_online,
          lastMessage: lastMsg ? lastMsg.message : "",
          unreadCount,
          timeAgo: lastMsg ? lastMsg.created_at : null,
        };
      })
    );

    // sort theo lastMessage mới nhất
    conversations.sort(
      (a, b) => new Date(b.timeAgo || 0).getTime() - new Date(a.timeAgo || 0).getTime()
    );

    return conversations;
  } catch (err) {
    return [];
  }
};

export async function getUserByEmail(email) {
  try {
    let User = await initModels.users.findOne({
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
    const row = await initModels.users.create({
      name: name,
      email: email,
      password: password,
      avatar: avatar,
    });
    if (row.id) return true;
    return false;
  } catch (error) {}
}
