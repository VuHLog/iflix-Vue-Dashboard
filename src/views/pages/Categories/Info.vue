<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const { proxy } = getCurrentInstance();

const router = useRouter();

const route = useRoute();
const categoriesId = route.params.categoriesId;

const categories = ref({
  name: "",
  slug: "",
});

onMounted(() => {
  proxy.$api
    .get("/api/categories/" + categoriesId)
    .then((res) => {
      Object.assign(categories.value, res.result);
    })
    .catch((error) => console.log(error));
});

function returnTable() {
  router.push("/categories");
}
</script>
<template>
  <div class="card px-0 pt-0 pb-2">
    <div class="card-body p-5">
      <div class="row">
        <div class="col-md-6 text-start mb-4">
          <label for="name-text-input" class="form-label">Tên danh mục</label>
          <input
            disabled
            v-model="categories.name"
            id="name-text-input"
            class="form-control"
            type="text"
            placeholder="Tên danh mục"
          />
        </div>
        <div class="col-md-6 text-start mb-4">
          <label for="slug-text-input" class="form-label">Slug</label>
          <input
            disabled
            v-model="categories.slug"
            id="slug-text-input"
            class="form-control"
            type="text"
            placeholder="Slug"
          />
        </div>
      </div>
      <div class="d-flex justify-start align-center">
        <button
          type="button"
          class="btn btn-submit bg-gradient-submit py-3 mr-3"
          @click="returnTable()"
        >
          Quay lại
        </button>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.avatar-user {
  height: 100px;
}
</style>