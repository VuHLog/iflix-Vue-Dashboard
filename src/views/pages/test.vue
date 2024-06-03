<template>
  <v-app class="d-flex flex-column mx-6">
    <v-main>
      <admin-header></admin-header>
      <v-breadcrumbs
        class="ma-8"
        :items="['Admin', 'Danh sách Movies']"
      ></v-breadcrumbs>
      <VDatatables :data="data">
      </VDatatables>
      <AdminFooter />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import AdminFooter from "@layouts/Footer.vue";
import AdminHeader from "@layouts/Header.vue";
import VDatatables from "@components/VDatatables.vue";
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();

const data = ref({});

onMounted(async() => {
  await proxy.$api.get("/admin/movies").then((res) => {
    data.value = res;
  });
});
</script>

<style lang="scss" scoped>
</style>