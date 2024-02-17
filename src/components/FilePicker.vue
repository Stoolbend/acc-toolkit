<script setup lang="ts" generic="T">
/*
Copyright (C) 2024 Conor Morgan
This file is part of ACC Tooklit, which is free software: you can 
redistribute it and/or modify it under the terms of the 
GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.

ACC Tooklit is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
import download from 'downloadjs'
import { clone, cloneDeep } from 'lodash-es'
import { ref, watch } from 'vue'

const props = defineProps<{
  fileName: string
  default?: T
}>()

const jsonError = ref<string>()

//#region File parsing
const file = defineModel<T>()
const fileText = ref<string>()

watch(
  file,
  (value) => {
    try {
      if (value != undefined) {
        fileText.value = JSON.stringify(value, null, 2)
      } else fileText.value = undefined
    } catch (e: any) {
      jsonError.value = e.message
    }
  },
  { deep: true },
)
watch(fileText, (newValue) => {
  try {
    if (newValue) file.value = JSON.parse(newValue)
    else file.value = undefined
  } catch (e: any) {
    jsonError.value = e.message
  }
})
//#endregion

function onNew() {
  file.value = cloneDeep(props.default)
}

function downloadFile() {
  if (fileText.value) download(fileText.value, `${props.fileName}.json`, 'application/json')
}
</script>

<template>
  <div class="file-picker">
    <b-alert variant="danger" :show="!!jsonError" class="mb-2">
      {{ jsonError }}
    </b-alert>
    <BFormTextarea v-model="fileText" rows="10" class="mb-2" :placeholder="`Drag & Drop your ${fileName}.json or paste its contents here...`" />
    <div class="d-flex flex-row justify-content-center mb-1">
      <b-button variant="secondary" @click="onNew"> New {{ fileName }}.json </b-button>
    </div>
    <div v-if="!!file" class="d-flex flex-row justify-content-center mb-1">
      <b-button variant="secondary" @click="downloadFile"> Download {{ fileName }}.json </b-button>
    </div>
  </div>
</template>

<style scoped></style>
