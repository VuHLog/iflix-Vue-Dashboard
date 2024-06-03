import { defineStore } from "pinia";

export const useBaseStore = defineStore("base", {
  state: () => {
    return {
      showSidenav: true,
      showNavbar: true,
      showFooter: true,
    };
  },
  getters: {},
  actions: {
    signin(user) {
    //   await proxy.$api.get("/admin/movies").then((res) => {
    //     data.value = res;
    //   });
    },
  },
});
