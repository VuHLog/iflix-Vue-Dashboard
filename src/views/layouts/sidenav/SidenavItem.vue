<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  navText: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <router-link
    :to="to"
    class="nav-link nav-link-text rounded-lg d-flex align-center justify-start mx-2 py-2 px-3"
  >
    <div class="icon text-white p-2 h-100">
      <slot name="icon"></slot>
    </div>
    <span class="nav-link-text ml-2">
      {{ navText }}
    </span>
  </router-link>
</template>

<style lang="scss" scoped>
.nav-link {
  &:hover{
    background-image: linear-gradient(310deg, #5e72e4, #5e72e4);
  }
  .icon {
    width: 32px;
    height: 32px;
  }
}
</style>