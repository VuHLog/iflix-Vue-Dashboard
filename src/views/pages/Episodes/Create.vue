<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useBaseStore } from "@/store/index.js";
import VAutoComplete from "@components/VAutoComplete.vue";

const { proxy } = getCurrentInstance();
const store = useBaseStore();

const route = useRoute();
const movieId = route.params.movieId;

const router = useRouter();

const errorMsg = ref("");
const listLinkServer = ref(["Link Ophim"]);
const listEpisodeNumbers = ref([]);

const episode = ref({
  link: "",
  slug:"",
  episodeNumber: "",
  linkServer: "",
  movie: {},
});

onMounted(() => {
  proxy.$api
    .get("/api/movies/" + movieId)
    .then((res) => {
      episode.value.movie = res.result;
      listEpisodeNumbers.value = Array.from(
        { length: res.result.episodeTotal },
        (_, i) => i + 1
      );
    })
    .catch((error) => console.log(error));
});

function returnTable() {
  router.push("/episodes/" + movieId);
}

function isEmtyEpisode() {
  return (
    episode.value.link === "" ||
    episode.value.linkServer === "" ||
    Object.keys(episode.value.movie).length === 0
  );
}

async function createEpisode() {
  errorMsg.value = "";
  if (isEmtyEpisode()) {
    errorMsg.value = "Phải nhập đầy đủ các trường";
  }
  if (!/^[1-9]\d*$/.test(episode.value.episodeNumber)) {
    errorMsg.value = "Thời lượng phải nhập là số";
    return;
  }
  episode.value.slug = "/"+episode.value.episodeNumber;
  await proxy.$api
    .post("/api/episodes", episode.value)
    .then((res) => {
      if (res.message) {
        errorMsg.value = res.message;
      } else {
        console.log("Thêm mới thành công!");
        router.push("/episodes/" + movieId);
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
      <p class="text-uppercase text-sm">Tập phim</p>
      <form
        class="mt-8 space-y-6 mb-4"
        enctype="multipart/form-data"
        method="POST"
        @submit.prevent="createEpisode"
      >
        <div class="row">
          <div class="col-md-6 text-start mb-4">
            <label for="name-text-input" class="form-label">Phim</label>
            <input
              disabled
              v-model.trim="episode.movie.name"
              id="name-text-input"
              class="form-control"
              type="text"
              placeholder="Tên phim"
            />
          </div>
          <div class="col-md-6 text-start mb-4">
            <label for="link-text-input" class="form-label"
              >Link xem phim</label
            >
            <input
              v-model.trim="episode.link"
              id="link-text-input"
              class="form-control"
              type="text"
              placeholder="Link"
            />
          </div>
          <div class="btn-group col-md-6 mb-4">
            <div class="d-flex flex-column align-start">
              <div class="mb-2">Tập phim</div>
              <div class="d-flex">
                <select
                  v-model="episode.episodeNumber"
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option disabled value="">Chọn tập</option>
                  <template v-for="number in listEpisodeNumbers">
                    <option :value="number">{{ number }}</option>
                  </template>
                </select>
              </div>
            </div>
          </div>
          <div class="btn-group col-md-6 mb-4">
            <div class="d-flex flex-column align-start">
              <div class="mb-2">Link Server</div>
              <div class="d-flex">
                <select
                  v-model="episode.linkServer"
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option disabled value="">Chọn link server</option>
                  <template v-for="server in listLinkServer">
                    <option :value="server">{{ server }}</option>
                  </template>
                </select>
              </div>
            </div>
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

.limited-select {
  max-height: 20px;
  overflow-y: auto;
}
</style>