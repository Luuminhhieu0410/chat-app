import loginUser, { getAllUser, registerUser ,logOut, getConverSation} from '../controllers/user.controller.js';
import express from 'express'
import { protectRoute } from '../middleware/auth.js';
import path from 'path';
import multer from 'multer';

const route = express.Router();
let imageName = ''; // biến toàn cục lưu tên để xóa (không cần nữa)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // Lấy đuôi file (.jpg, .png)
    imageName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;  // biến toàn cục , random tên ảnh
    cb(null, file.fieldname + '-' + imageName) //Lưu File , fieldname là tên thẻ input client 
  }
})



function fileFilter(req, file, cb) {
  // Chỉ cho phép các file hình ảnh
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Chấp nhận file
  } else {
    cb(new Error('Chỉ cho phép tải lên file hình ảnh!'), false); // Từ chối file
  }
};

const upload = multer({
  dest: 'uploads',
  storage: storage,
  fileFilter: fileFilter
});



route.post('/login', loginUser);
route.post('/register', upload.single('avatar'), registerUser);
route.post('/pages/:page', protectRoute, getAllUser); // lấy dữ liệu users; 
route.get('/conversations',protectRoute,getConverSation)
route.post('/logout',protectRoute,logOut);

export default route;