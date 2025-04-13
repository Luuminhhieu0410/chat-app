import { getMessageForTwo as _getMessageForTwo,sendMessage as _sendMesssage, deleteMessageInTwo } from '../service/message.service.js';
import {io} from '../helper/socket.js'

export async function getMessageForTwo(req, res, next) {
    let {senderId , receiverId} = req.params;
    if (!senderId || !receiverId) return res.status(500).json({ 'message': 'request không hợp lệ' });
    // console.log(senderId + " " + receiverId);
    let userId = req.user.userId;
    // console.log("req.user: " + req.user.id);
    if (userId != senderId && userId != receiverId) {
        return res.status(403).json({ message: "Bạn không có quyền xem cuộc trò chuyện này!" });
    }

    let dataMessage = await _getMessageForTwo(senderId,receiverId);
    res.status(201).json(dataMessage);
}   

export async function sendMessage(req,res,next) {
    let {message} = req.body;
    console.log('tin nhan gui ' + message);
    let {receiverId} = req.params;
    console.log('id nguoi nhan ' + receiverId);
    if(!message) return ;

    let senderId = req.user.userId; // lấy từ protectRoute , protectRoute đứng trước
    let alert = await _sendMesssage(message,senderId,receiverId);
    res.status(200);
    // console.log(alert);
}

export async function deleteMessage(req,res,next) {
    let messageId =await deleteMessageInTwo(req.params.messageId);
    if(messageId !== 0){
        console.log('xóa thàn công');
        return res.status(200).json({'message':'xóa tin nhắn thành công'});
    }
    return res.status(500).json({'message':'xóa tin nhắn thất bại'});
}