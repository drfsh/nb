import {createWebHistory , createRouter} from 'vue-router'
import HelloWorld from "@/components/HelloWorld";
import Home from "@/components/main/HomePage";


const routes = [
    {
        path:'/',
        name: 'main',
        component:Home
    },
    {
        path:'/info',
        name: 'info',
        component:HelloWorld
    },
];

const router =  createRouter({
    history:createWebHistory(),
    routes
})

export default router;




