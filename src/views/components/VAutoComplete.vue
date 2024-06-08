  
<script setup>
import { onMounted, watch } from "vue";
import { ref } from "vue";
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: Array,
    default: [],
    required: true,
  },
  listItem: {
    type: Array,
    default: [],
    required: true,
  },
  label: {
    type: String,
    default: "",
    required: true,
  }
});

const data = ref([]);


const isUpdating = ref(false);
const timeout = ref(null);

watch(() => props.modelValue, (newValue) => {
  data.value = newValue;
});

watch(isUpdating, (val) => {
  clearTimeout(timeout.value);

  if (val) {
    timeout.value = setTimeout(() => (isUpdating.value = false), 3000);
  }
});

watch(data, (val) => {
  emit("update:modelValue", val);
  clearTimeout(timeout.value);

  if (val) {
    timeout.value = setTimeout(() => (isUpdating.value = false), 3000);
  }
});
</script>

<template>
  <v-card
    :loading="isUpdating"
    max-width="420"
    class="w-100"
  >
    <v-form>
        <v-row dense>
          <v-col cols="12">
            <v-autocomplete
              v-model="data"
              :disabled="isUpdating"
              :items="props.listItem"
              item-title="name"
              return-object
              :label="props.label"
              chips
              closable-chips
              multiple
              no-data-text="Không tìm thấy"
            >
              <template v-slot:chip="{ props, item }">
                <v-chip v-bind="props" :text="item.raw.name"></v-chip>
              </template>

              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :title="item.raw.name"
                ></v-list-item>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
    </v-form>
  </v-card>
</template>
