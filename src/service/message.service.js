import InitModels from "../models/init-models.js";
import sequelize from '../config/sequelize.js';
import { Op } from "sequelize";

// Lấy danh sách tin nhắn giữa hai người
// GET /api/messages/conversation/{sender_id}/{reciever_id}
const initModels = InitModels(sequelize);

export async function getMessageForTwo(sender_id, receiver_id) {
    try {
        let messageTwoPeople = await initModels.PrivateMessages.findAll({
            attributes: ['sender_id', 'receiver_id', 'message', 'created_at'],
            where: {
                [Op.or]: [
                    { sender_id: sender_id, receiver_id: receiver_id },
                    { sender_id: receiver_id, receiver_id: sender_id },
                ],
            },
            order: [['created_at', 'ASC']],
        });
        return messageTwoPeople;
    } catch (error) {
        console.error("Lỗi khi lấy tin nhắn:", error);
        throw error;
    }
}


export async function sendMessage(message, senderId, receiverId) {
    try {
        let insertData = await initModels.PrivateMessages.create({
            'message': message,
            'sender_id': senderId,
            'receiver_id': receiverId
        }, { fields: ['message', 'sender_id', 'receiver_id'] });
        
        return insertData;

    } catch (error) {
        throw error
    }
}

