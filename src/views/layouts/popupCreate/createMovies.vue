<template>
  <v-dialog v-model="dialog" max-width="1000px">
    <v-card>
      <v-card-title class="text-center mt-3">
        <span class="text-h5">Thêm mới</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <template v-for="(item, i) in Object.keys(editedItems)">
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  v-model="editedItems[item]"
                  :label="item"
                ></v-text-field>
              </v-col>
            </template>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click=""> Lưu </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click=""> Huỷ bỏ </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref, defineProps } from "vue";

const dialog = ref();

const props = defineProps({
    status: {
        type: Boolean
    }
})
</script>

<style lang="scss" scoped>
</style>