<template>
  <v-card elevation="2" class="table-card">
    <v-card-title class="text-h4 mt-4"> Danh sách Movies </v-card-title>
    <div class="text-end mr-8 mb-2">
      <v-btn
        class="text-color"
        color="var(--primary-bg-content)"
        variants="elevated"
        @click="newItem()"
      >
        <v-icon prepend icon="fa-solid fa-plus"></v-icon>
        Thêm danh mục mới
      </v-btn>
    </div>
    <v-data-table-server
      :headers="headers"
      :items="data.content"
      :items-per-page="data.size"
      :page="data.number + 1"
      :items-length="data.totalElements"
      :show-current-page="true"
      items-per-page-text="Số mục/Trang"
      @update:options=""
    >
      <template #top>
        <slot name="create"></slot>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          class="me-2"
          size="small"
          @click="editItem(item)"
          icon="fa-solid fa-pen"
          color="var(--primary-bg-content)"
        >
        </v-icon>
        <v-icon
          size="small"
          @click="deleteItem(item)"
          icon="fa-solid fa-trash"
          color="var(--primary-bg-content)"
        ></v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click=""> Reset </v-btn>
      </template>
    </v-data-table-server>
  </v-card>
</template>

<script setup>
import {onMounted,onBeforeMount, ref, defineProps } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
});


const sampleData = ref({});
onMounted(() => {
  sampleData.value = props.data;
});


// Hàm để viết hoa chữ cái đầu của từ
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Hàm để trích xuất các khóa từ đối tượng dữ liệu
const extractKeysFromData = (data) => {
  if (!data || typeof data !== "object") return [];

  return Object.keys(data).map((key) => ({
    title: capitalizeFirstLetter(key),
    key: key,
    sortable: true, //Bạn có thể chỉnh sửa thuộc tính sortable theo nhu cầu của bạn
  }));
};

  //Sử dụng hàm để tạo mảng headers
//   const headers = ref([
//    ...extractKeysFromData(sampleData.value.content[0]),  //Thêm các headers từ dữ liệu
//    { title: 'Actions', key: 'actions', sortable: false }
//  ]);

const headers = ref([
  {
    title: "Id",
    key: "id",
    sortable: true,
  },
  {
    title: "Name",
    key: "name",
    sortable: true,
  },
  {
    title: "Slug",
    key: "slug",
    sortable: true,
  },
  {
    title: "Description",
    key: "description",
    sortable: true,
  },
  {
    title: "Duration",
    key: "duration",
    sortable: true,
  },
  {
    title: "EpisodeCurrent",
    key: "episodeCurrent",
    sortable: true,
  },
  {
    title: "EpsisodeTotal",
    key: "epsisodeTotal",
    sortable: true,
  },
  {
    title: "Status",
    key: "status",
    sortable: true,
  },
  {
    title: "Lang",
    key: "lang",
    sortable: true,
  },
  {
    title: "ReleaseYear",
    key: "releaseYear",
    sortable: true,
  },
  {
    title: "NumView",
    key: "numView",
    sortable: true,
  },
  {
    title: "ImageUrl",
    key: "imageUrl",
    sortable: true,
  },
  {
    title: "Comments",
    key: "comments",
    sortable: true,
  },
  {
    title: "Favorite",
    key: "favorite",
    sortable: true,
  },
  {
    title: "Genres",
    key: "genres",
    sortable: true,
  },
  {
    title: "Country",
    key: "country",
    sortable: true,
  },
  {
    title: "Actors",
    key: "actors",
    sortable: true,
  },
  {
    title: "Director",
    key: "director",
    sortable: true,
  },
  {
    title: "Actor",
    key: "actor",
    sortable: true,
  },
  {
    title: "Rate",
    key: "rate",
    sortable: true,
  },
  {
    title: "Actions",
    key: "actions",
    sortable: false,
  },
]);


// // xử lý thêm mới
// const dialog = ref(false);

// function newItem() {
//   dialog.value = true;
// }

// const editedItems = ref({});
// // Lặp qua mỗi phần tử trong headers
// headers.value.forEach((header) => {
//   // Gán giá trị mặc định cho editedItem dựa trên key của header
//   editedItems.value[header.title] = ""; // Hoặc giá trị mặc định phù hợp
// });
// delete editedItems.value["Id"];
// delete editedItems.value["Actions"];


</script>

<style lang="scss" scoped>
.table-card{
  border-radius: 8px;
}
</style>