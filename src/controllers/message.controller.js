import { getMessageForTwo as _getMessageForTwo,sendMessage as _sendMesssage } from '../service/message.service.js';


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
    res.json(dataMessage);
}

export async function sendMessage(req,res,next) {
    let {message} = req.body;
    console.log(message);
    let {receiverId} = req.params;
    console.log(receiverId);
    if(!message)return res.status(500).json({'message':'không có nội dung'});

    let senderId = req.user.userId; // lấy từ protectRoute , protectRoute đứng trước
    let alert = await _sendMesssage(message,senderId,receiverId);
    console.log(alert);
}

