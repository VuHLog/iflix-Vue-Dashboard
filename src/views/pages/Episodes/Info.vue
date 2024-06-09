<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import VAutoComplete from "@components/VAutoComplete.vue";

const { proxy } = getCurrentInstance();

const router = useRouter();

const route = useRoute();
const movieId = route.params.movieId;

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

onMounted(() => {
  proxy.$api
    .get("/admin/movies/" + movieId)
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

      document.getElementById("description-text").innerHTML =
        movie.value.description;
    })
    .catch((error) => console.log(error));
});

function returnTable() {
  router.push("/movies");
}
</script>
<template>
  <div class="card mt-4">
    <div class="card-body">
      <p class="text-uppercase text-sm">Thông tin phim</p>
      <div class="row">
        <div class="col-md-6 text-start mb-4">
          <label for="name-text-input" class="form-label">Tên phim</label>
          <input
            disabled
            v-model.trim="movie.name"
            id="name-text-input"
            class="form-control"
            type="text"
            placeholder="Tên phim"
          />
        </div>
        <div class="col-md-6 text-start mb-4">
          <label for="slug-text-input" class="form-label">Slug</label>
          <textarea
            disabled
            v-model.trim="movie.slug"
            id="slug-text-input"
            class="form-control"
            type="text"
            placeholder="Slug"
          ></textarea>
        </div>
        <div class="col-md-6 text-start mb-4">
          <label for="description-text-input" class="form-label"
            >Nội dung</label
          >
          <p id="description-text"></p>
        </div>
        <div class="col-md-6 text-start mb-4">
          <label for="duration-text-input" class="form-label">Thời lượng</label>
          <input
            disabled
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
            disabled
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
            disabled
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
            disabled
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
            disabled
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
            disabled
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
            disabled
            v-model.trim="movie.imageUrl"
            id="imageUrl-text-input"
            class="form-control"
            type="text"
            placeholder="Poster"
          />
        </div>
        <div class="btn-group col-md-6 mb-4">
          <div class="col-md-6 text-start mb-4">
            <label for="categories-text-input" class="form-label"
              >Danh mục</label
            >
            <input
              disabled
              v-model.trim="movie.categories.name"
              id="categories-text-input"
              class="form-control"
              type="text"
            />
          </div>
        </div>
        <div class="btn-group col-md-6 mb-4">
          <div class="col-md-6 text-start mb-4">
            <label for="country-text-input" class="form-label">Quốc gia</label>
            <input
              disabled
              v-model.trim="movie.country.name"
              id="country-text-input"
              class="form-control"
              type="text"
            />
          </div>
        </div>
        <div class="btn-group col-md-6 mb-4">
          <div class="col-md-6 text-start mb-4">
            <label for="director-text-input" class="form-label">Đạo diễn</label>
            <input
              disabled
              v-model.trim="movie.director.name"
              id="director-text-input"
              class="form-control"
              type="text"
            />
          </div>
        </div>
        <div class="btn-group col-md-6 mb-4">
          <div class="col-md-6 text-start mb-4">
            <label class="form-label">Thể loại</label>
            <div
              class="rounded-lg py-2 px-3 border-sm"
              style="background-color: #e9ecef"
            >
              <template v-for="(genre, index) in movie.genres" :key="genre.id">
                <span class="mr-3">{{
                  (index > 0 ? " , " : "") + genre.name
                }}</span>
              </template>
            </div>
          </div>
        </div>

        <div class="btn-group col-md-6 mb-4">
          <div class="col-md-6 text-start mb-4">
            <label class="form-label">Diễn viên</label>
            <div
              class="rounded-lg py-2 px-3 border-sm"
              style="background-color: #e9ecef"
            >
              <template v-for="(actor, index) in movie.actors" :key="actor.id">
                <span class="mr-3">{{
                  (index > 0 ? " , " : "") + actor.name
                }}</span>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="text-start text-red" v-if="errorMsg">
        {{ errorMsg }}
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