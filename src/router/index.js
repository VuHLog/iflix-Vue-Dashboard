import { createRouter, createWebHistory } from "vue-router";
import { jwtDecode } from "jwt-decode";

import Dashboard from "@pages/Dashboard.vue";
import User from "@pages/User/User.vue";
import Signin from "@pages/Signin.vue";
import DefaultLayout from "@layouts/DefaultLayout.vue";
import AuthLayout from "@layouts/AuthLayout.vue";
import { useBaseStore } from "@/store/index.js";

const routes = [
  {
    path: "/",
    name: "/",
    component: DefaultLayout,
    redirect: "/dashboard",
    meta: { requiresAuth: true },
    beforeEnter: requireAdmin,
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/users",
        name: "Người dùng",
        component: User,
      },
    ],
  },
  {
    path: "/sign-in",
    name: "Sign in",
    component: AuthLayout,
    children: [
      {
        path: "",
        name: "Signin",
        component: Signin,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  console.log(from);
  const store = useBaseStore();
  console.log(store.isLoggedIn);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn() || !store.isLoggedIn) {
      next({
        path: "/sign-in",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

//hàm check login với token
function isLoggedIn() {
  const store = useBaseStore();
  const token = sessionStorage.getItem("token");
  store.isLoggedIn = true;

  if (token) {
    //giải mã token
    const decoded = jwtDecode(token);
    store.role = decoded.scope;
    store.username = decoded.sub;

    // Kiểm tra xem token có hết hạn hay không
    const expirationDate = new Date(decoded.exp * 1000);
    if (expirationDate <= new Date()) {
      // Nếu token đã hết hạn, xóa nó khỏi sessionStorage và trả về false
      sessionStorage.removeItem("token");
      return false;
    } else {
      // Nếu token hợp lệ, trả về true
      return true;
    }
  } else {
    // Nếu token không tồn tại trong sessionStorage, trả về false
    return false;
  }
}

// Hàm check role
function requireAdmin(to, from, next) {
    const token = sessionStorage.getItem("token");
  
    if (!isLoggedIn()) {
      next("/sign-in");
    } else {
      const decodedToken = jwtDecode(token);
      if (!decodedToken.scope.includes("ROLE_ADMIN")) {
        // store.dispatch("showToast", "Tài khoản không có quyền truy cập!");
        next(({
            path: "/sign-in",
            query: { redirect: to.fullPath },
          }));
      } else {
        next();
      }
    }
  }

export default router;
