<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {useBaseStore} from "@/store/index.js"

const { proxy } = getCurrentInstance();
const store = useBaseStore();

const router = useRouter();

const route = useRoute();
const countriesId = route.params.countriesId;
const errorMsg = ref("");

const countries = ref({
  name: "",
  slug: "",
});

onMounted(() => {
  proxy.$api
    .get("/api/countries/" + countriesId)
    .then((res) => {
      Object.assign(countries.value, res.result);
    })
    .catch((error) => console.log(error));
});

function returnTable() {
  router.push("/countries");
}


async function updateCountries() {
  errorMsg.value = "";
  if (countries.value.name.trim() === "") {
    errorMsg.value = "Tên quốc gia phải được nhập";
    return;
  }
  if (!/^[a-z0-9\s\-/]+$/.test(countries.value.slug.trim())) {
    errorMsg.value = "Slug chỉ gồm chữ thường, số, / ,-";
    return;
  }

  let slug = countries.value.slug;
  if(slug.charAt(0) === '/'){
    countries.value.slug =slug.replaceAll(" ","-");
  }else{
    countries.value.slug ="/" + slug.replaceAll(" ","-");
  }

  await proxy.$api
    .put("/api/countries/" + countriesId, countries.value)
    .then((res) => {
      if (res.message) {
        errorMsg.value = res.message;
      } else {
        console.log("Sửa thành công!");
        router.push("/countries");
      }
    })
    .catch((error) => console.log(error));
}
</script>

<template>
  <div class="card mt-4">
    <div class="card-header pb-0">
      <div class="d-flex align-items-center">
        <p class="mb-0">Chỉnh sửa</p>
      </div>
    </div>
    <div class="card-body">
      <p class="text-uppercase text-sm">Thông tin quốc gia</p>
      <form
        class="mt-8 space-y-6 mb-4"
        enctype="multipart/form-data"
        method="POST"
        @submit.prevent="updateCountries"
      >
        <div class="row">
          <div class="col-md-6 text-start mb-4">
            <label for="name-text-input" class="form-label"
              >Tên quốc gia</label
            >
            <input
              v-model="countries.name"
              id="name-text-input"
              class="form-control"
              type="text"
              placeholder="Tên quốc gia"
            />
          </div>
          <div class="col-md-6 text-start mb-4">
            <label for="slug-text-input" class="form-label">Slug</label>
            <input
              v-model="countries.slug"
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
            Lưu
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