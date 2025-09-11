import InitModels from "../models/init-models.js";
import sequelize from '../config/sequelize.js';
import { Op} from "sequelize";

// Lấy danh sách tin nhắn giữa hai người
// GET /api/messages/conversation/{reciever_id}
const initModels = InitModels(sequelize);

export async function getMessageForTwo(sender_id, receiver_id) {
    try {
        let messageTwoPeople = await initModels.private_messages.findAll({
            where: {
                [Op.or]: [
                    { sender_id: sender_id, receiver_id: receiver_id },
                    { sender_id: receiver_id, receiver_id: sender_id },
                ],
            },
            // offset : offset,
            limit: 10,
            order: [['created_at', 'DESC']],
        });
        return messageTwoPeople;
    } catch (error) {
        console.error("Lỗi khi lấy tin nhắn:", error);
        throw error;
    }
}


export async function sendMessage(message, senderId, receiverId) {
    try {
        let insertData = await initModels.private_messages.create({
            'message': message,
            'sender_id': senderId,
            'receiver_id': receiverId
        }, { fields: ['message', 'sender_id', 'receiver_id'] });
        
        return insertData;

    } catch (error) {
        throw error
    }
}

export async function deleteMessageInTwo(messageId){
    try{
        let dataDeleted = await initModels.private_messages.destroy({
            where :{
              
                'id':messageId
            }
        })
        return dataDeleted;
    }
    catch(err){

    }
}