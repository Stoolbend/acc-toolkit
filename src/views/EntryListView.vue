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

import EntryOptionToggle from '@/components/EntryOptionToggle.vue'
import FilePicker from '@/components/FilePicker.vue'
import { useGameData } from '@/composables/gameData'
import { EntryList, EntryListDriver, EntryListEntry } from '@/lib/gameFiles'
import { getNextAvailableCarNumber, getPlatformClass } from '@/lib/utils'
import { useDriverStore } from '@/stores/drivers'
import { Platform, PlatformOptions } from '@/stores/settings'
import { orderBy } from 'lodash-es'
import { computed, ref, watch, watchEffect } from 'vue'

const data = ref<EntryList>()
const driverStore = useDriverStore()
const gameData = useGameData()

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

//#region Entry management
function addEntry() {
  if (!data.value) return
  let entry = new EntryListEntry()
  entry.raceNumber = getNextAvailableCarNumber(data.value.entries)
  data.value.entries.push(entry)
}
function sortEntries() {
  if (!data.value) return
  data.value.entries = orderBy(data.value.entries, ['raceNumber'])
}
//#endregion

//#region Driver management
function addBlankDriver(entry: EntryListEntry) {
  entry.drivers.push(new EntryListDriver())
}
function addSavedDriver(entry: EntryListEntry) {}
function makeFirstDriver(entry: EntryListEntry, driver: EntryListDriver) {
  const index = entry.drivers.indexOf(driver)
  if (index === 0) return
  entry.drivers.splice(index, 1)
  entry.drivers.unshift(driver)
}
function deleteDriver(entry: EntryListEntry, driver: EntryListDriver) {
  const index = entry.drivers.indexOf(driver)
  entry.drivers.splice(index, 1)
}
//#endregion

//#region Cars

//#endregion
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
          <div v-for="(entry, i) in data.entries" class="entry row">
            <div class="col-12 col-md-1">
              <div class="car-number">
                <div>Car</div>
                <b-form-input v-model="entry.raceNumber" size="lg" />
              </div>
              <div class="grid-position">
                <div>Grid</div>
                <b-form-input v-model="entry.defaultGridPosition" size="lg" />
              </div>
            </div>
            <div class="drivers col-12 col-md-6">
              <div v-for="(driver, i) in entry.drivers" :key="driver.playerID" class="driver">
                <DriverEntryInlineForm v-model="entry.drivers[i]" />
                <div class="driver-controls">
                  <b-button variant="secondary" size="sm" :disabled="i === 0" v-b-tooltip.hover.left="'Set as lead driver'" @click="makeFirstDriver(entry, driver)">
                    <i class="bi bi-award-fill" />
                  </b-button>
                  <b-button variant="danger" size="sm" @click="deleteDriver(entry, driver)"><i class="bi bi-trash-fill" /></b-button>
                </div>
              </div>
              <div class="d-flex flex-row justify-content-center gap-2">
                <b-button variant="outline-success" size="sm" @click="addBlankDriver(entry)"><i class="bi bi-plus me-1" />Add blank</b-button>
                <b-button disabled variant="outline-success" size="sm" @click="addSavedDriver(entry)"><i class="bi bi-person-arms-up me-1" />Add saved</b-button>
              </div>
            </div>
            <div class="options col-12 col-md-5">
              <div class="d-flex flex-row gap-1 justify-content-between">
                <EntryOptionToggle v-model="entry.overrideDriverInfo">Override driver info</EntryOptionToggle>
                <EntryOptionToggle v-model="entry.overrideCarModelForCustomCar">Override custom car model</EntryOptionToggle>
                <EntryOptionToggle v-model="entry.isServerAdmin">Server admin</EntryOptionToggle>
              </div>
              <b-input-group size="sm">
                <template #prepend>
                  <b-input-group-text>Car</b-input-group-text>
                </template>
                <b-form-select v-model="entry.forcedCarModel" :options="gameData.carOptions()" size="sm" />
              </b-input-group>
              <div class="d-flex flex-row gap-1">
                <b-input-group size="sm">
                  <template #prepend>
                    <b-input-group-text>Ballast</b-input-group-text>
                  </template>
                  <b-form-input v-model="entry.ballastKg" type="number" min="0" max="100" size="sm" />
                  <template #append>
                    <b-input-group-text>kg</b-input-group-text>
                  </template>
                </b-input-group>
                <b-input-group size="sm">
                  <template #prepend>
                    <b-input-group-text>Restrictor</b-input-group-text>
                  </template>
                  <b-form-input v-model="entry.ballastKg" type="number" min="0" max="20" size="sm" />
                  <template #append>
                    <b-input-group-text>%</b-input-group-text>
                  </template>
                </b-input-group>
              </div>
              <b-input-group size="sm">
                <template #prepend>
                  <b-input-group-text>Custom livery</b-input-group-text>
                </template>
                <b-form-input v-model="entry.customCar" type="text" placeholder="exampleCar.json" size="sm" />
              </b-input-group>
            </div>
          </div>
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

  .entry {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 0.5em 0;

    .drivers {
      display: flex;
      flex-direction: column;
      gap: 0.5em;

      .driver {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 0.25em;
        .driver-controls {
          display: flex;
          flex-direction: row;
          gap: 0.15em;
        }
      }
    }

    .options {
        display: flex;
        flex-direction: column;
        gap: 0.25em;
    }
  }
}
</style>
