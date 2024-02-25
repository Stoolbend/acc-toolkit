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

import DriverSelectModal from '@/components/DriverSelectModal.vue'
import EntryOptionToggle from '@/components/EntryOptionToggle.vue'
import { useGameData } from '@/composables/gameData'
import { EntryListDriver, EntryListEntry } from '@/lib/gameFiles'
import { onMounted } from 'vue'
import { computed, ref, watch, watchEffect } from 'vue'
import { useModal } from 'vue-final-modal'

const props = defineProps<{
  entry: EntryListEntry
  raceNumbers: number[]
}>()
const emit = defineEmits<{
  (e: 'updated', value: EntryListEntry): void
  (e: 'delete', value: EntryListEntry): void
}>()
const gameData = useGameData()

//#region Driver management
function addBlankDriver(entry: EntryListEntry) {
  entry.drivers.push(new EntryListDriver())
}
function addSavedDriver(entry: EntryListEntry) {
  const { close } = useModal({
    defaultModelValue: true,
    component: DriverSelectModal,
    attrs: {
      onSelect(driver: EntryListDriver) {
        entry.drivers.push(driver)
        close()
      },
      onClose() {
        close()
      },
    },
  })
}
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

//#region Car number processing
const raceNumber = ref<string>('')
//TODO Fix a bug here where emptying the car number sets the field to null, and the entry disappears.
onMounted(() => {
  if (props.entry.raceNumber == null || props.entry.raceNumber < 0 || props.entry.raceNumber > 999) {
    props.entry.raceNumber = 1
    raceNumber.value = (1).toString()
  } else raceNumber.value = props.entry.raceNumber.toString()
})
watch(raceNumber, (value) => {
  const parsedNumber = Number.parseInt(value)
  if (parsedNumber == null || parsedNumber < 0 || parsedNumber > 999) {
    props.entry.raceNumber = 1
    raceNumber.value = (1).toString()
  } else props.entry.raceNumber = Number.parseInt(value)
})
//#endregion

//#region Warnings, indicators & validation
enum AlertSeverity {
  None,
  Info,
  Warning,
  Critical,
}
const alertLevel = ref<AlertSeverity>(AlertSeverity.None)
const alertMessage = ref<string>()
const border = computed(() => {
  switch (alertLevel.value) {
    case AlertSeverity.Info:
      return 'alert-info'
    case AlertSeverity.Warning:
      return 'alert-warning'
    case AlertSeverity.Critical:
      return 'alert-danger'
    default:
      return ''
  }
})
function validateRaceNumber() {
  const parsedNumber = Number.parseInt(props.entry.raceNumber.toString())
  // Check it's a valid integer
  if (Number.isNaN(parsedNumber)) {
    alertMessage.value = 'Car number must be set'
    return false
  }
  // Check it's not a duplicate of another car
  if (props.raceNumbers.filter((n) => n === parsedNumber).length > 1) {
    alertMessage.value = 'Car number is not unique'
    return false
  }
  return true
}
// Check properties and display warnings
watchEffect(() => {
  // Critical problems
  if (!validateRaceNumber()) {
    alertLevel.value = AlertSeverity.Critical
    return
  }
  // Warning problems
  // Informational messages
  if (props.entry.drivers.length < 1) {
    alertLevel.value = AlertSeverity.Info
    alertMessage.value = 'Car has no drivers'
    return
  }
  // Clear the alerts if nothing is wrong
  alertLevel.value = AlertSeverity.None
  alertMessage.value = undefined
})
//#endregion
</script>

<template>
  <div class="entry row" :class="border">
    <div class="col-12 col-md-1 d-flex flex-column text-center gap-1">
      <div class="car-number">
        <div>Car</div>
        <b-form-input v-model="raceNumber" type="number" min="0" max="999" step="1" class="big-input" size="lg" required placeholder="-" />
      </div>
      <div class="grid-position">
        <div>Grid pos.</div>
        <b-form-input v-model="entry.defaultGridPosition" type="number" min="0" max="99" step="1" class="big-input" size="lg" placeholder="-" />
      </div>
    </div>
    <div class="drivers col-12 col-md-6">
      <div v-if="alertMessage" class="alert py-1 m-0" :class="border" role="alert">
        {{ alertMessage }}
      </div>
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
        <b-button variant="outline-success" size="sm" @click="addSavedDriver(entry)"><i class="bi bi-person-arms-up me-1" />Add saved</b-button>
      </div>
    </div>
    <div class="options col-12 col-md-5">
      <div class="d-flex flex-row gap-1 justify-content-between">
        <EntryOptionToggle v-model="entry.overrideDriverInfo">Override driver info</EntryOptionToggle>
        <EntryOptionToggle v-model="entry.overrideCarModelForCustomCar">Override custom car model</EntryOptionToggle>
        <EntryOptionToggle v-model="entry.isServerAdmin">Server admin</EntryOptionToggle>
        <b-button variant="danger" size="sm" @click="emit('delete', entry)">
          <i class="bi bi-trash-fill" />
        </b-button>
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
</template>

<style scoped lang="scss">
.entry {
  background-color: rgba(0, 0, 0, 0.1);
  border: var(--bs-border-width) solid var(--bs-border-color);
  border-radius: 12px;
  padding: 0.5em 0;
  margin: 0;

  input.big-input {
    text-align: center;
  }
  .car-number {
    div {
      padding-bottom: 0.25em;
    }
    input {
      background-color: white;
      color: black;
    }
  }
  .grid-position {
    div {
      padding-bottom: 0.25em;
    }
    input {
      background-color: #ffff66;
      color: black;
    }
    input:placeholder-shown {
      background-color: var(--bs-body-bg);
      color: var(--bs-body-color);
    }
  }

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

//#region Borders
.entry.alert-danger {
  outline: 3px solid var(--bs-danger);
  outline-offset: -4px;
}
.entry.alert-warning {
  outline: 2px solid var(--bs-warning);
  outline-offset: -3px;
}
.entry.alert-info {
  outline: 1px solid var(--bs-info);
  outline-offset: -2px;
}
//#endregion
</style>
