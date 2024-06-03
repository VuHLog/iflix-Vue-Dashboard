<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: {
    type: String,
    default: "",
  },
  currentName: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <nav id="breadcrumb" class="d-flex flex-column align-start text-white" aria-label="breadcrumb">
    <ol class="breadcrumb d-flex m-0 p-0">
      <li class="breadcrumb-item">
        <a class="breadcrumb-link text-white" href="/dashboard">Pages</a>
      </li>

      <span class="mx-2">/</span>

      <li class="breadcrumb-item">{{ currentPage }}</li>
    </ol>
    <h5 class="breadcrumb-title">{{ currentName }}</h5>
  </nav>
</template>

<style lang="scss" scoped>
#breadcrumb{
    .breadcrumb{
        .breadcrumb-item{
            .breadcrumb-link{
                text-decoration: none;
                opacity: 0.7;
            }
        }
    }
}
</style>