<script setup>
import router from '@/router';
import { ref } from 'vue';

let isLoading = ref(true);
let listUser = ref();
let token = localStorage.getItem('access_token');
fetch('http://localhost:5000/api/auth/pages/1', {
    headers: {
        "Authorization": `Bearer ${token}`
    }
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
                <input type="text" class="w-[90%] bg-[#f3f3f5] ml-2 focus:outline-none focus:border-none"
                    placeholder="Tìm kiếm..." />
            </div>

           
            <div class="space-y-2 overflow-y-auto max-h-[75vh] pr-1">
                <div v-for="item in listUser" :key="item.id"
                    class="flex items-center gap-3 p-2 rounded-xl shadow-sm hover:bg-[#f0f0f0] cursor-pointer transition-all duration-200">
                  
                    <img v-bind:src="'http://localhost:5000/home/'+item.avatar" alt="avatar"
                        class="w-10 h-10 rounded-full object-cover" />
                   
                    <div class="font-medium text-gray-800">
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </nav>

        <div id="chat" class="w-3/4 h-full my-1 mx-2 border border-white rounded-lg shadow-md bg-white">
            <!-- Nội dung chat -->
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