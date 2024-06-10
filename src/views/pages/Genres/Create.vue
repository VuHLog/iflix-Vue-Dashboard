<script setup>
import { ref, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useBaseStore } from "@/store/index.js";

const { proxy } = getCurrentInstance();
const store = useBaseStore();

const router = useRouter();

const errorMsg = ref("");

const genres = ref({
  name: "",
  slug: "",
});

function returnTable() {
  router.push("/genres");
}

async function createGenres() {
  errorMsg.value = "";
  if (genres.value.name.trim() === "") {
    errorMsg.value = "Tên thể loại phải được nhập";
    return;
  }
  if (!/^[a-z0-9\s\-/]+$/.test(genres.value.slug.trim())) {
    errorMsg.value = "Slug chỉ gồm chữ thường, số, / ,-";
    return;
  }

  let slug = genres.value.slug;
  if(slug.charAt(0) === '/'){
    genres.value.slug =slug.replaceAll(" ","-");
  }else{
    genres.value.slug ="/" + slug.replaceAll(" ","-");
  }

  await proxy.$api
    .post("/api/genres", genres.value)
    .then((res) => {
      if (res.message) {
        errorMsg.value = res.message;
      } else {
        console.log("Thêm mới thành công!");
        router.push("/genres");
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
      <p class="text-uppercase text-sm">Thông tin thể loại</p>
      <form
        class="mt-8 space-y-6 mb-4"
        enctype="multipart/form-data"
        method="POST"
        @submit.prevent="createGenres"
      >
        <div class="row">
          <div class="col-md-6 text-start mb-4">
            <label for="name-text-input" class="form-label"
              >Tên thể loại</label
            >
            <input
              v-model="genres.name"
              id="name-text-input"
              class="form-control"
              type="text"
              placeholder="Tên thể loại"
            />
          </div>
          <div class="col-md-6 text-start mb-4">
            <label for="slug-text-input" class="form-label">Slug</label>
            <input
              v-model="genres.slug"
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