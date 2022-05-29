import {createRouter, createWebHashHistory} from 'vue-router'
import info from "@/components/Info";
import Home from "@/components/main/HomePage";
import PixelWorld from "@/components/pixel/PixelWorld";
import WwhMain from "@/components/wwh/WwhMain";
import FileManager from "@/components/wwh/FileManager";
import Contact from "@/components/wwh/Contacts";
import messages from "@/components/wwh/messages";
import systemInfo from "@/components/wwh/info";
import downloads from "@/components/wwh/downloads";


const routes = [
    {
        path: '/',
        name: 'main',
        component: Home
    },
    {
        path: '/info',
        name: 'info',
        component: info
    },
    {
        path: '/pixely',
        name: 'pixely',
        component: PixelWorld
    },
    {
        path: '/dcc',
        name: 'dcc',
        component: WwhMain
    },
    {
        path: '/fileManager',
        name: 'fileManager',
        component: FileManager
    },
    {
        path: '/contact',
        name: 'contact',
        component: Contact
    },
    {
        path: '/messages',
        name: 'messages',
        component: messages
    },
    {
        path: '/system',
        name: 'system',
        component: systemInfo
    },
    {
        path: '/downloads',
        name: 'downloads',
        component: downloads
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;




