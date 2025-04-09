import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import ChatView from '../views/ChatView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/home/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/home/chat',
      name: 'chat',
      component: ChatView,
      meta:{
        requiresAuth:true
      }
    },
  ],
})

// router.beforeEach((to, from ,next)=>{
//   let isLogin = localStorage.getItem('access_token') || false;
//   if(to.path == '/home/login' && isLogin || to.path == '/'){
//     next('/home/chat');
//   }
//   else if(to.meta.requiresAuth && !isLogin)
//     next('home/login');
//   else 
//     next();
// })
export default router
