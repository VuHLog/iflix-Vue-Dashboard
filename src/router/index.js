import { createRouter, createWebHistory } from "vue-router";
import test from "../views/pages/test.vue";

const routes = [
    {
        path:"/admin",
        name: "admin",
        children:[
            {
                path:"test",
                name:"test",
                component: test,
            },
            {
                path:"movies",
                name:"movies",
                component: test,
            }
        ]
    },
    {
        path:"/",
        name: "/",
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router; 