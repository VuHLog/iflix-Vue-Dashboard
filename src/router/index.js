import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "@pages/Dashboard.vue"
import User from "@pages/User/User.vue"
import Signin from "@pages/Signin.vue"
import DefaultLayout from '@layouts/DefaultLayout.vue';
import AuthLayout from '@layouts/AuthLayout.vue';


const routes = [
    {
        path:"/",
        name: "/",
        component: DefaultLayout,
        redirect: "/dashboard",
        children:[
            {
                path:"/dashboard",
                name: "Dashboard",
                component: Dashboard,
            },
            {
                path:"/users",
                name: "Người dùng",
                component: User,
            },
        ]
    },
    {
        path:"/signin",
        component: AuthLayout,
        children: [
            {
                path: '',
                name: 'Signin',
                component: Signin,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router; 