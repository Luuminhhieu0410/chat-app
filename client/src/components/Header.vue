<script setup>
import { reactive, ref } from 'vue';

const nav = ["Trang chủ", "Liên Hệ", "Danh Mục", "Thông Tin"];
const rawHtml = "<h1>test</h1>";

let Ref = ref({ age: 10 });
Ref.value.age = 100;

let Reactive = reactive({ age: 200 });
console.log(Reactive.age);

const message = ref('Chào bạn');

// Sử dụng ref() để liên kết với input và cập nhật giá trị
const inputValue = ref("");

function updateValue(event) {
  inputValue.value = event.target.value;
}
</script>

<template>


  <!-- Cập nhật giá trị khi nhập -->
  <input v-model="inputValue" placeholder="Enter some text" name="name" />
  <p>{{ inputValue }}</p>
</template>

<style>
</style>
