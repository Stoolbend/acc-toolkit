<script setup lang="ts">
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

import EntryListItem from '@/components/EntryListItem.vue'
import FilePicker from '@/components/FilePicker.vue'
import { useGameData } from '@/composables/gameData'
import { EntryList, EntryListEntry } from '@/lib/gameFiles'
import { getNextAvailableCarNumber, getPlatformClass } from '@/lib/utils'
import { useDriverStore } from '@/stores/drivers'
import { Platform, PlatformOptions } from '@/stores/settings'
import { computed, ref, watch, watchEffect } from 'vue'

const data = ref<EntryList>()
const driverStore = useDriverStore()

//#region Default platform
const defaultPlatform = ref<Platform>(driverStore.defaultPlatform)
const defaultPlatformClass = computed(() => getPlatformClass(defaultPlatform.value))
watchEffect(() => {
  defaultPlatform.value = driverStore.defaultPlatform
})
watch(defaultPlatform, (value) => {
  if (driverStore.defaultPlatform != value) driverStore.updateDefaultPlatform(value)
})
//#endregion

function addEntry() {
  if (!data.value) return
  let entry = new EntryListEntry()
  entry.raceNumber = getNextAvailableCarNumber(data.value.entries)
  data.value.entries.push(entry)
}
function deleteEntry(entry: EntryListEntry) {
  if (!data.value) return
  const index = data.value.entries.indexOf(entry)
  data.value.entries.splice(index, 1)
}
</script>

<template>
  <main>
    <div class="container">
      <h3>Entry List Editor</h3>
      <div class="wiki-link">
        <a href="https://www.acc-wiki.info/wiki/Server_Configuration#entrylist.json" target="_blank"><i class="bi bi-info-circle-fill me-1" />View the wiki</a>
      </div>
      <template v-if="data">
        <div class="controls">
          <div class="d-flex flex-row align-items-center">
            <div class="me-1">Default platform</div>
            <b-form-select v-model="defaultPlatform" :class="`platform-select ${defaultPlatformClass}`" :options="PlatformOptions" />
          </div>
          <b-button variant="success" @click="addEntry"><i class="bi bi-plus me-1" />Add car</b-button>
        </div>
        <div class="entries">
          <EntryListItem v-for="(entry, i) in data.entries" :key="entry.raceNumber" :entry="entry" @delete="deleteEntry" />
        </div>
      </template>
      <hr />
      <FilePicker v-model="data" file-name="entrylist" :default="new EntryList()" />
    </div>
  </main>
</template>

<style scoped lang="scss">
.controls {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
  margin-bottom: 1rem;
}
.entries {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>
