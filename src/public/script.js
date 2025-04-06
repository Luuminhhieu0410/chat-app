const apiUrl = "http://localhost:5000";
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

const socket = io();
let roomId = '';
socket.on('recieve', (data) => {
    console.log("Tin nhắn realtime: ", data);
    // loadMessages(); 
});
if (!token) {
    window.location.href = "login.html";
}   

let currentChatUser = null;

// danh sách user
async function loadUsers() {
    let res = await fetch(`${apiUrl}/api/auth/pages/1`, {
        headers: { "Authorization": `Bearer ${token}` }
    });


    let users = await res.json();
    let userList = document.getElementById("user-list");

    users.forEach(user => {
        let userDiv = document.createElement("div");
        userDiv.classList.add("user-item");
        userDiv.innerHTML = `<img src="${apiUrl}/home/${user.avatar || 'default_user.jpg'}"> <span>${user.name}</span>`;
        userDiv.onclick = () => startChat(user);
        userList.appendChild(userDiv);
    });
}

// click để chat vào ai đó
async function startChat(user) {
    currentChatUser = user;
    roomId = [userId, currentChatUser.id].sort().join('_');

    socket.emit('send-room', roomId);
    

    document.getElementById("chat-header").innerText = `Chat với ${user.name}`;
    document.getElementById("chat-box").innerHTML = "";

   
    await loadMessages();

    // startPolling();
}

//  lấy tin nhắn từ API
async function loadMessages() {
    if (!currentChatUser) return;

    let res = await fetch(`${apiUrl}/api/message/conversation/${userId}/${currentChatUser.id}`, {
        headers: { "Authorization": `Bearer ${token}` }
    });

    let messages = await res.json();
    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";

    messages.forEach(msg => {
        let div = document.createElement("div");
        div.innerText = `${msg.sender_id == userId ? "Bạn" : currentChatUser.name}: ${msg.message}`;
        chatBox.appendChild(div);
    });
}


async function sendMessage() {
    let message = document.getElementById("message-input").value;
    if (!message || !currentChatUser) return;
    socket.emit('send-message',{message,roomId});
    let res = await fetch(`${apiUrl}/api/message/send/${currentChatUser.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ message })
    });

    if (res.ok) {
        document.getElementById("message-input").value = "";
        loadMessages(); 
    }
}


let pollingInterval;
function startPolling() {
    clearInterval(pollingInterval); 
    pollingInterval = setInterval(loadMessages, 2000);
}


loadUsers();

