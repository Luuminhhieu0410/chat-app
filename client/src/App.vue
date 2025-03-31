<script setup>
// import { RouterLink, RouterView } from 'vue-router'
let tasks = ['one','two','three'];
let status = 'pending';
let linkGG = 'http://google.com';
function clickme(){
  if(status === 'pending') {status = 'active',alert(1)}
  else if(status === 'active') {status = 'pending',alert(2)}
}

let data = fetch('http://localhost:5000/user/login',{
  headers:{
    "Content-Type": "application/json"
  },
  method:"POST",
  body:JSON.stringify({
    email:"a@gmail.com",
    password:"1"
  })
})


</script>

<template>
    <ul>
      <li v-if="status === 'pending'">user is {{ status }}</li>
      <li v-else-if="status === 'active'">user is {{ status }}</li>
      <li v-for="task in tasks" :key="task">{{ task }}</li>
    </ul>
  <a v-bind:href="linkGG">click to redirect</a>
  <button v-on:click="clickme">Click To Change</button>
  <!-- <RouterView /> -->
   <p> 123{{ data.then((data) => data.json()).then(data => console.log(data.access_token)) }} </p>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}
li{
  list-style-type: decimal;
}
nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
