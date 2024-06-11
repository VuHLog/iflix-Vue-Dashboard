<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useBaseStore } from "@/store/index.js";
import VAutoComplete from "@components/VAutoComplete.vue";

const { proxy } = getCurrentInstance();
const store = useBaseStore();

const router = useRouter();
const route = useRoute();
const movieId = route.params.movieId;
const errorMsg = ref("");

const movie = ref({
  name: "",
  slug: "",
  description: "",
  duration: null,
  episodeCurrent: null,
  episodeTotal: null,
  status: "",
  lang: "",
  releaseYear: null,
  numView: 0,
  imageUrl: "",
  categories: {},
  genres: [],
  country: {},
  actors: [],
  director: {},
});

const categoriesAvailable = ref([]);
const genresAvailable = ref([]);
const countriesAvailable = ref([]);
const actorsAvailable = ref([]);
const directorsAvailable = ref([]);

onMounted(() => {
  proxy.$api
    .get("/api/movies/" + movieId)
    .then((res) => {
      Object.assign(movie.value, res.result);

      delete movie.movie_genres;
      delete movie.movie_actors;
      movie.value.genres = res.result.movie_genres.map(
        (movie_genre) => movie_genre.genre
      );
      movie.value.actors = res.result.movie_actors.map(
        (movie_actor) => movie_actor.actor
      );
    })
    .catch((error) => console.log(error));

  proxy.$api
    .get("/api/categories?pageSize=99999")
    .then((res) => {
      categoriesAvailable.value = res.content;
    })
    .catch((error) => console.log(error));

  proxy.$api
    .get("/api/genres?pageSize=99999")
    .then((res) => {
      genresAvailable.value = res.content;
    })
    .catch((error) => console.log(error));

  proxy.$api
    .get("/api/countries?pageSize=99999")
    .then((res) => {
      countriesAvailable.value = res.content;
    })
    .catch((error) => console.log(error));

  proxy.$api
    .get("/api/actors?pageSize=99999")
    .then((res) => {
      actorsAvailable.value = res.result;
    })
    .catch((error) => console.log(error));

  proxy.$api
    .get("/api/directors?pageSize=99999")
    .then((res) => {
      directorsAvailable.value = res.result;
    })
    .catch((error) => console.log(error));
});

function returnTable() {
  router.push("/movies");
}

function isEmtyMovie() {
  return (
    movie.value.name === "" ||
    movie.value.slug === "" ||
    movie.value.description === "" ||
    movie.value.duration === null ||
    movie.value.episodeCurrent === null ||
    movie.value.episodeTotal === null ||
    movie.value.status === "" ||
    movie.value.lang === "" ||
    movie.value.releaseYear === null ||
    movie.value.imageUrl === "" ||
    Object.keys(movie.value.categories).length === 0 ||
    movie.value.genres.length === 0 ||
    Object.keys(movie.value.country).length === 0 ||
    movie.value.actors.length === 0 ||
    Object.keys(movie.value.director).length === 0
  );
}

async function updateMovie() {
  errorMsg.value = "";
  if (isEmtyMovie()) {
    errorMsg.value = "Phải nhập đầy đủ các trường";
  }
  if (!/^[1-9]\d*$/.test(movie.value.duration)) {
    errorMsg.value = "Thời lượng phải nhập là số";
    return;
  }
  if (!/^[0-9]\d*$/.test(movie.value.episodeCurrent)) {
    errorMsg.value = "Tập hiện tại phải nhập là số";
    return;
  }
  if (!/^[1-9]\d*$/.test(movie.value.episodeTotal)) {
    errorMsg.value = "Tổng số tập phải nhập là số";
    return;
  }
  if (!/^[1-9]\d*$/.test(movie.value.releaseYear)) {
    errorMsg.value = "Năm phát hành phải nhập là số";
    return;
  }

  await proxy.$api
    .put("/api/movies/" + movieId, movie.value)
    .then((res) => {
      if (res.message) {
        errorMsg.value = res.message;
      } else {
        console.log("Sửa thành công!");
        router.push("/movies");
      }
    })
    .catch((error) => console.log(error));
}
</script>

<template>
  <div class="card mt-4">
    <div class="card-header pb-0">
      <div class="d-flex align-items-center">
        <p class="mb-0">Sửa</p>
      </div>
    </div>
    <div class="card-body">
      <p class="text-uppercase text-sm">Thông tin phim</p>
      <form
        class="mt-8 space-y-6 mb-4"
        enctype="multipart/form-data"
        method="POST"
        @submit.prevent="updateMovie"
      >
        <div class="row">
          <div class="col-md-6 text-start mb-4">
            <label for="name-text-input" class="form-label">Tên phim</label>
            <input
              v-model.trim="movie.name"
              id="name-text-input"
              class="form-control"
              type="text"
              placeholder="Tên phim"
            />
          </div>
          <div class="col-md-6 text-start mb-4">
            <label for="slug-text-input" class="form-label">Slug</label>
            <input
              v-model.trim="movie.slug"
              id="slug-text-input"
              class="form-control"
              type="text"
              placeholder="Slug"
            />
          </div>
          <div class="col-md-6 text-start mb-4">
            <label for="description-text-input" class="form-label"
              >Nội dung</label
            >
            <input
              v-model.trim="movie.description"
              id="description-text-input"
              class="form-control"
              type="text"
              placeholder="Nội dung"
            />
          </div>
          <div class="col-md-6 text-start mb-4">
            <label for="duration-text-input" class="form-label"
              >Thời lượng</label
            >
            <input
              v-model.trim="movie.duration"
              id="duration-text-input"
              class="form-control"
              type="text"
              placeholder="Thời lượng"
            />
          </div>
          <div class="col-md-6 text-start mb-4">
            <label for="episodeCurrent-text-input" class="form-label"
              >Tập hiện tại</label
            >
            <input
              v-model.trim="movie.episodeCurrent"
              id="episodeCurrent-text-input"
              class="form-control"
              type="text"
              placeholder="Tập hiện tại"
            />
          </div>
          <div class="col-md-6 text-start mb-4">
            <label for="episodeTotal-text-input" class="form-label"
              >Tổng số tập</label
            >
            <input
              v-model.trim="movie.episodeTotal"
              id="episodeTotal-text-input"
              class="form-control"
              type="text"
              placeholder="Tổng số tập"
            />
          </div>
          <div class="col-md-6 text-start mb-4">
            <label for="status-text-input" class="form-label">Trạng thái</label>
            <input
              v-model.trim="movie.status"
              id="status-text-input"
              class="form-control"
              type="text"
              placeholder="Trạng thái"
            />
          </div>
          <div class="col-md-6 text-start mb-4">
            <label for="lang-text-input" class="form-label">Ngôn ngữ</label>
            <input
              v-model.trim="movie.lang"
              id="lang-text-input"
              class="form-control"
              type="text"
              placeholder="Ngôn ngữ"
            />
          </div>
          <div class="col-md-6 text-start mb-4">
            <label for="releaseYear-text-input" class="form-label"
              >Năm phát hành</label
            >
            <input
              v-model.trim="movie.releaseYear"
              id="releaseYear-text-input"
              class="form-control"
              type="text"
              placeholder="Năm phát hành"
            />
          </div>
          <div class="col-md-6 text-start mb-4">
            <label for="imageUrl-text-input" class="form-label">Poster</label>
            <input
              v-model.trim="movie.imageUrl"
              id="imageUrl-text-input"
              class="form-control"
              type="text"
              placeholder="Poster"
            />
          </div>
          <div class="btn-group col-md-6 mb-4">
            <div class="d-flex flex-column align-start">
              <div class="mb-2">Danh mục</div>
              <div class="d-flex">
                <select
                  v-model="movie.categories"
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option disabled value="">Chọn danh mục</option>
                  <template
                    v-for="category in categoriesAvailable"
                    :key="category.id"
                  >
                    <option :value="category">{{ category.name }}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
          <div class="btn-group col-md-6 mb-4">
            <div class="d-flex flex-column align-start">
              <div class="mb-2">Quốc gia</div>
              <div class="d-flex">
                <select
                  v-model="movie.country"
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option disabled value="">Chọn quốc gia</option>
                  <template
                    v-for="country in countriesAvailable"
                    key="country.id"
                  >
                    <option :value="country">{{ country.name }}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
          <div class="btn-group col-md-6 mb-4">
            <div class="d-flex flex-column align-start">
              <div class="mb-2">Đạo diễn</div>
              <div class="d-flex">
                <select
                  v-model="movie.director"
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option disabled value="">Chọn quốc gia</option>
                  <template
                    v-for="director in directorsAvailable"
                    key="country.id"
                  >
                    <option :value="director">{{ director.name }}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
          <div class="btn-group col-md-6 mb-4">
            <v-auto-complete
              v-model="movie.genres"
              :listItem="genresAvailable"
              label="Chọn thể loại"
            >
            </v-auto-complete>
          </div>

          <div class="btn-group col-md-6 mb-4">
            <v-auto-complete
              v-model="movie.actors"
              :listItem="actorsAvailable"
              label="Chọn diễn viên"
            >
            </v-auto-complete>
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
            Sửa
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