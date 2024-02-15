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

import { type EntryListDriver } from '@/lib/gameFiles'
import { getPlatformClass, parsePlayerId } from '@/lib/utils'
import { useDriverStore } from '@/stores/drivers'
import { Platform, PlatformOptions } from '@/stores/settings'
import { watchEffect } from 'vue'
import { watch } from 'vue'
import { computed, ref } from 'vue'

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

const selectedDriver = ref<EntryListDriver>()
const showDriverModal = ref(false)

function addDriver() {
  selectedDriver.value = undefined
  showDriverModal.value = true
}
function editDriver(driver: EntryListDriver) {
  selectedDriver.value = driver
  showDriverModal.value = true
}
function deleteDriver(driver: EntryListDriver) {
  driverStore.deleteDriver(driver.playerID)
}
function onModalSubmit(driver: EntryListDriver) {
  if (selectedDriver.value) {
    driverStore.updateDriver(driver)
  } else {
    driverStore.addDriver(driver)
  }
}

const tableFields = ['shortName', 'firstName', 'lastName', 'playerID', 'options', 'controls']
</script>

<template>
  <main>
    <div class="container">
      <h3>Saved Drivers</h3>
      <div class="wiki-link">
        <a href="https://www.acc-wiki.info/wiki/Server_Configuration#entrylist.json" target="_blank"><i class="bi bi-info-circle-fill me-1" />View the wiki</a>
      </div>
      <div class="controls">
        <div class="d-flex flex-row align-items-center">
          <div class="me-1">Default platform</div>
          <b-form-select v-model="defaultPlatform" :class="`platform-select ${defaultPlatformClass}`" :options="PlatformOptions" />
        </div>
        <b-button variant="success" @click="addDriver"><i class="bi bi-plus me-1" />New driver</b-button>
      </div>
      <b-table :items="driverStore.drivers" :fields="tableFields" striped>
        <template #cell(playerID)="data">
          <div class="d-flex">
            <div class="platform-badge" :class="getPlatformClass(parsePlayerId(data.value as string).platform)">
              <i :class="`bi bi-${getPlatformClass(parsePlayerId(data.value as string).platform)} me-1`" />
              {{ parsePlayerId(data.value as string).playerId }}
            </div>
          </div>
        </template>
        <template #cell(options)="data"></template>
        <template #cell(controls)="data">
          <div class="d-flex flex-row gap-1">
            <b-button @click="editDriver(data.item)" size="sm">Edit</b-button>
            <b-button @click="deleteDriver(data.item)" size="sm" variant="danger">Delete</b-button>
          </div>
        </template>
      </b-table>
    </div>
    <DriverEditModal v-model="showDriverModal" :driver="selectedDriver" :defaultPlatform="defaultPlatform" @submit="onModalSubmit" />
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
</style>
