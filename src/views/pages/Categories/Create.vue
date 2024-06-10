<script setup>
import { ref, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useBaseStore } from "@/store/index.js";

const { proxy } = getCurrentInstance();
const store = useBaseStore();

const router = useRouter();

const errorMsg = ref("");

const categories = ref({
  name: "",
  slug: "",
});

function returnTable() {
  router.push("/categories");
}

async function createCategories() {
  errorMsg.value = "";
  if (categories.value.name.trim() === "") {
    errorMsg.value = "Tên danh mục phải được nhập";
    return;
  }
  if (!/^[a-z0-9\s\-/]+$/.test(categories.value.slug.trim())) {
    errorMsg.value = "Slug chỉ gồm chữ thường, số, / ,-";
    return;
  }

  let slug = categories.value.slug;
  if(slug.charAt(0) === '/'){
    categories.value.slug =slug.replaceAll(" ","-");
  }else{
    categories.value.slug ="/" + slug.replaceAll(" ","-");
  }

  await proxy.$api
    .post("/api/categories", categories.value)
    .then((res) => {
      if (res.message) {
        errorMsg.value = res.message;
      } else {
        console.log("Thêm mới thành công!");
        router.push("/categories");
      }
    })
    .catch((error) => console.log(error));
}
</script>

<template>
  <div class="card mt-4">
    <div class="card-header pb-0">
      <div class="d-flex align-items-center">
        <p class="mb-0">Thêm mới</p>
      </div>
    </div>
    <div class="card-body">
      <p class="text-uppercase text-sm">Thông tin danh mục</p>
      <form
        class="mt-8 space-y-6 mb-4"
        enctype="multipart/form-data"
        method="POST"
        @submit.prevent="createCategories"
      >
        <div class="row">
          <div class="col-md-6 text-start mb-4">
            <label for="name-text-input" class="form-label"
              >Tên danh mục</label
            >
            <input
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
              v-model="categories.slug"
              id="slug-text-input"
              class="form-control"
              type="text"
              placeholder="Slug"
            />
          </div>
        </div>

        <div class="text-start text-red" v-if="errorMsg">
          {{ errorMsg }}
        </div>

        <div class="d-flex justify-start align-center">
          <button
            type="submit"
            class="btn btn-submit bg-gradient-submit py-3 mr-3"
          >
            Thêm mới
          </button>
          <span class="text-secondary cursor-pointer" @click="returnTable()">
            Quay lại
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-control {
  box-shadow: none;
}
</style>