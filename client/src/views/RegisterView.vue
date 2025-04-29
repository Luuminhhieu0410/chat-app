<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
let router = useRouter();
let urlServer = 'http://localhost:5000';
let urlImageCaptcha = `${urlServer}/api/captcha`;
let warningText = ref('');
let password = ref('');
let password_confirm = ref('');
let email = ref('');
let name = ref('');
let captcha = ref('');
let avatarInput = ref('');
let previewImage = ref('');
let Form = ref('');
async function postRegister(e) {
    try {
        e.preventDefault();
        let formData = new FormData(Form.value);
        console.log(formData);  
        if (password.value != password_confirm.value) {
            warningText.value = 'password nhập lại không đúng';
            return;
        }
        let postData = await fetch(`${urlServer}/api/user/register`, {
            // headers: {
            //     'Content-Type': 'multipart/form-data'   // bug multer Multipart: Boundary not found
            // },
            method: "POST",
            body: formData,
            credentials: "include",
        })
        let jsonData = await postData.json();
        if(!postData.ok){
            // console.log(jsonData);
            warningText.value = jsonData.message;
            return ;
        }
        return router.push('/home/login')
        // console.log(alert);
    } catch (error) {
        console.log(error);
    }
}

function createPreviewImage() {
    const file = avatarInput.value.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.value.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        previewImage.value.src = "";
    }
}

</script>

<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                        class="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <form ref="Form" class="space-y-4 md:space-y-6" @submit="postRegister">
                        <div>
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input v-model="name" type="text" name="name" id="name" placeholder=""
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="">
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                email</label>
                            <input v-model="email" type="email" name="email" id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="@gmail.com" required="">
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input v-model="password" type="password" name="password" id="password"
                                placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="">
                        </div>
                        <div>
                            <label for="confirm-password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                                password</label>
                            <input v-model="password_confirm" type="confirm-password" name="confirm-password"
                                id="confirm-password" placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="">
                        </div>

                        <div class="flex items-center gap-4">
                            <div>
                                <!-- input chọn ảnh -->
                                <input ref="avatarInput" @change="createPreviewImage" id="avatar" type="file"
                                    name="avatar" accept="image/x-png,image/gif,image/jpeg,image/jpg"
                                    class="border border-gray-300 text-sm text-gray-900 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200" required="" />
                            </div>

                            <!-- ảnh preview -->
                            <div class="w-16 h-16 rounded-full overflow-hidden border border-gray-300">
                                <img ref="previewImage" id="previewImage" src="" alt="img"
                                    class="w-full h-full object-cover" />
                            </div>
                        </div>

                        <div>
                            <label for="captcha" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã
                                xác thực</label>
                            <div class="flex h-[45px]">
                                <input v-model="captcha" type="text" name="captcha" id="captcha"
                                    class="bg-gray-50 mr-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required="">
                                <img v-bind:src="urlImageCaptcha" class="rounded-lg ml-4" alt="">
                            </div>
                        </div>
                        <div class="text-red-500 text-center">{{ warningText }}</div>

                        <button
                            class="w-full text-white bg-black  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create
                            an account</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <RouterLink to="/home/login"
                                class="font-medium text-primary-600 hover:underline text-blue-500 dark:text-primary-500">
                                Login here</RouterLink>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<style></style>