import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GirisView from '../views/GirisView.vue'
import ProfilView from '../views/ProfilView.vue'
import  SertifikaListesiView  from "../views/SertifikaListesiView.vue"
import  SertifikaEkleView  from "@/views/SertifikaEkleView.vue";
import  SertifikaInceleView  from "@/views/SertifikaInceleView.vue";

import { auth } from '@/firebase/config'

const authKontrol =(to, from,next)=>{
  const kullanici = auth.currentUser
  if (!kullanici) {
    next({name:'giris'})
  } else {
    next()
  }
}
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },{
    path: '/giris',
    name: 'giris',
    component: GirisView
  },{
    path: '/profil',
    name: 'profil',
    component: ProfilView,
    beforeEnter:authKontrol
  },{
    path: '/liste',
    name: 'liste',
    component: SertifikaListesiView,
    beforeEnter:authKontrol
  },{
    path: '/ekle',
    name: 'ekle',
    component: SertifikaEkleView,
    beforeEnter:authKontrol
  },
  {
    path: '/incele/:id',
    name: 'incele',
    component: SertifikaInceleView,
    beforeEnter:authKontrol
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
