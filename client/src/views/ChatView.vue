<script setup>
import router from '@/router';
import { ref } from 'vue'; // two way bindding
import { socket } from '@/services/socketIO';
let urlServer = "http://localhost:5000";

let isLoading = ref(true);
let listUser = ref([]); // danh sách user lấy từ server
let isChat = ref(false); // kiểm tra đã click vào user để bắt đầu chat chưa
let historyChat = ref([]); // danh sách chat của 2 user;
let currentChatUser = ref({}); // lấy thông tin người đang chat
let messageSend = ref(''); // input tin nhắn gửi
let divChat = ref('');
let statusUser = ref([]);

let userIdLogin = localStorage.getItem('userId');
let token = localStorage.getItem('access_token');

let roomId = ''; // lưu id room của socket để gửi lên socket server tạo room cho 2 người


fetch(`${urlServer}/api/user/pages/1`, {
    headers: {
        "Authorization": `Bearer ${token}`
    },
    method:'POST'
}).then((data) => {
    if (data.ok) {
        return data.json();
    } else {
        router.push('/home/login');
        throw new Error("Unauthorized");
    }
}).then((data) => {
    listUser.value = data;
}).catch(err => {
    console.error(err);
}).finally(() => {
    isLoading.value = false;
});

async function clickUserToChat(receiverId) { // sự kiện click vào ai đó để bắt đầu chat với họ

    
    isChat.value = true; // dùng để thay đổi trạng thái của div ()
    currentChatUser.value = listUser.value.find((item) => item.id == receiverId); // lấy thông tin người đang chat (lấy link ảnh , ...);

    roomId = [userIdLogin, receiverId].sort().join('_'); // receiverId hoặc currentChatUser.value.id;
    socket.emit('send-room', roomId); // gửi dữ liệu id phòng cho server

    socket.on('receive', (data) => { // event người đăng nhập hiện tại nhận tin nhắn từ server gửi về (server nhận từ người bên kia) ;
        historyChat.value.push({
            "sender_id": receiverId, // khi này người gửi là người bên kia ;
            "receiver_id": userIdLogin,  // người nhận là người đang đăng nhập 
            "message": data,
        });
        console.log('server send ' + data);
    });

    let getChat = await fetch(`${urlServer}/api/message/conversation/${userIdLogin}/${receiverId}`, { // load lịch  sử chat
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (getChat.ok) {
        historyChat.value = await getChat.json(); 
        console.log(historyChat.value);
        return;
    }
    return router.push('/home/login');
    // console.log(await getChat.json());
}

async function sendMessage(e) { // người đăng nhập hiện tại gửi tin nhắn
    e.preventDefault();

    // alert(messageSend.value);
    let data = {
        roomId,
        'message': messageSend.value
    }
    
    await historyChat.value.push({ // hiển thị luôn tin nhắn mới
        "sender_id": userIdLogin,
        "receiver_id": currentChatUser.value.id,
        "message": messageSend.value,
    });
    socket.emit('send-message', data); // gửi id phòng và message đến server
    divChat.value.scrollTop = divChat.value.scrollHeight;
    let postMessage =  await fetch(`${urlServer}/api/message/send/${currentChatUser.value.id}`, {
        headers: {
            "Content-Type":'application/json',
            "Authorization": `Bearer ${token}`
        },
        method: 'POST',
        body:JSON.stringify({
            'message': messageSend.value
        })
    });
    if(!postMessage.ok) router.push('/home/login');
    messageSend.value = '';
    

}
</script>

<template>
    <div id="main" class="w-full flex bg-[#f5f5f5] p-2 pb-4">
        <nav id="list-user" class="w-1/4 p-2 h-full my-1 mx-2 border border-white rounded-lg shadow-md bg-white">
            <div class="p-2">
                <h4 class="font-bold text-lg mb-2">Đoạn chat</h4>
            </div>


            <div v-if="isLoading" class="p-2 text-center text-gray-500">
                Đang tải danh sách...
            </div>


            <div v-else id="search"
                class="p-2 border border-white h-9 rounded-4xl bg-[#f3f3f5] flex items-center justify-start mb-4">
                <svg viewBox="6 6 24 24" fill="currentColor" width="20" height="20" class="text-gray-400">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M23.522 21.662c-.389-.344-.443-.925-.181-1.373a8.5 8.5 0 1 0-3.051 3.051c.447-.261 1.028-.207 1.372.182l3.608 4.073a1.647 1.647 0 1 0 2.325-2.326l-4.073-3.607zm-3.28-9.905a6 6 0 1 1-8.484 8.486 6 6 0 0 1 8.485-8.486z">
                    </path>
                </svg>
                <input type="text" class="w-[90%] bg-[#f3f3f5] mx-2 focus:outline-none focus:border-none"
                    placeholder="Tìm kiếm..." />
            </div>


            <div class="space-y-2 overflow-y-auto max-h-[75vh] pr-1">
                <div v-for="item in listUser" :key="item.id" @click="clickUserToChat(item.id)"
                    class="flex items-center gap-3 p-2 rounded-xl shadow-sm hover:bg-[#f0f0f0] cursor-pointer transition-all duration-200">
                    <img v-bind:src="urlServer + '/home/' + item.avatar" alt="avatar"
                        class="w-10 h-10 rounded-full object-cover" />
                    <div class="font-medium text-gray-800">
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </nav>

        <div id="chat"
            class="relative w-3/4 container h-full my-1 mx-2 border border-white rounded-lg text-center shadow-md bg-white">
            <h5 v-if="!isChat">Nhấn vào ai đó để bắt đầu chat với họ</h5>
            <div v-else id="chat-box" ref="divChat"
                class="h-[93%] max-h-[93%] w-full overflow-y-auto mb-2 overflow-x-auto max-w-full px-2">
                <div v-if="historyChat.length === 0">hãy bắt đầu nhắn gì đó để gửi họ</div>
                <div v-for="chat in historyChat">
                    <div v-if="chat.receiver_id == userIdLogin" class="flex justify-start mb-3">
                        <img v-bind:src="urlServer + '/home/' + currentChatUser.avatar" alt="User Avatar"
                            class="rounded-full w-8 h-8 mr-2">
                        <div class="bg-gray-200 rounded-xl p-2 max-w-xs break-words">
                            {{ chat.message }}
                            
                            {{ chat.created_at}}
                        </div>
                        <div>
                        </div>

                    </div>
                    <div v-else class="flex justify-end mb-2">
                        <div class="bg-purple-500 text-white rounded-xl p-2 max-w-xs break-words"> 
                            {{ chat.message }}
                        </div>
                    </div>
                </div>
                <div
                    class="w-<0.98> border border-white  bg-white flex flexitems-center absolute right-1 left-1 bottom-2">
                    <div class="flex justify-around items-center">
                        <i class="fas fa-plus-circle text-gray-500 mr-3 text-xl"></i>
                        <i class="far fa-image text-gray-500 mr-3 text-xl"></i>
                        <i class="far fa-sticky-note text-gray-500 mr-3 text-xl"></i>
                        <i class="fab fa-gif text-gray-500 mr-2 text-xl"></i>
                    </div>
                    <form @submit="sendMessage" class=""> <input v-model="messageSend" type="text" placeholder="Aa"
                            class="grow border-none outline-none rounded-full bg-gray-100 px-4 py-2 mr-2"></form>
                    <div class="flex justify-around items-center">
                        <i class="far fa-smile text-gray-500 text-xl"></i>
                        <i class="far fa-thumbs-up text-blue-500 ml-3 text-xl"></i>
                    </div>
                </div>
            </div>



        </div>
    </div>

</template>

<style>
* {
    box-sizing: border-box;
}

#list-user {
    flex: 1;

}

#chat {
    flex: 3;

}

#main {
    max-width: 100%;
    height: 100vh;
    max-height: 100vh;
    background: #f5f5f5;

}
</style>