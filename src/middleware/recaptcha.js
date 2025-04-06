import express from "express" ;
import { createCanvas, loadImage } from "canvas";

const route = express.Router();
// random text
function generateCaptchaText(length = 5) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function generateCaptchaImage(text) {
  const width = 150, height = 50;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  //backgorund
  ctx.fillStyle = "#f2f2f2";
  ctx.fillRect(0, 0, width, height);

  // font text
  ctx.font = "30px Arial";
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);

  
  ctx.strokeStyle = "#999";
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * width, Math.random() * height);
    ctx.lineTo(Math.random() * width, Math.random() * height);
    ctx.stroke();
  }

  return canvas.toBuffer();
}

// Route lấy ảnh CAPTCHA
route.get("/", (req, res) => {
  const captchaText = generateCaptchaText();
  req.session.captcha = captchaText; // Lưu vào session để lấy ở route khác
  console.log(req.session.captcha);
  const captchaImage = generateCaptchaImage(captchaText);

  res.set("Content-Type", "image/png");
  res.send(captchaImage);
});

route.get('/img',(req,res)=>{
  res.send('<img src="/api/captcha"></img>')
})

// Route kiểm tra CAPTCHA
// route.post("/verify", express.json(), (req, res) => {
//   const userInput = req.body.captcha;
//   if (userInput && req.session.captcha && userInput.toUpperCase() === req.session.captcha) {
//     res.json({ success: true, message: "CAPTCHA đúng!" });
//   } else {
//     res.json({ success: false, message: "CAPTCHA sai, thử lại." });
//   }
// });

export default route;
