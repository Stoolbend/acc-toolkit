<script lang="ts" setup>
import { useGameData } from '@/composables/gameData'
import type { EntryListDriver } from '@/lib/gameFiles'
import { formatPlayerId, getPlatformClass, parsePlayerId } from '@/lib/utils'
import { useDriverStore } from '@/stores/drivers'
import { PlatformOptionsSmall } from '@/stores/settings'
import { cloneDeep } from 'lodash-es'
import { onMounted } from 'vue'
import { reactive, watchEffect } from 'vue'

const driverStore = useDriverStore()
const driver = defineModel<EntryListDriver>()
const gameData = useGameData()

// #region Player ID formatting
const playerIdForm = reactive({
  id: '',
  platform: cloneDeep(driverStore.defaultPlatform),
})
function onPlayerIdUpdated() {
  if (!driver.value) return
  driver.value.playerID = formatPlayerId(playerIdForm.id, playerIdForm.platform)
}
// #endregion

watchEffect(() => {
  if (driver.value) {
    // Remove blank properties
    if (driver.value.firstName == '') delete driver.value.firstName
    if (driver.value.lastName == '') delete driver.value.lastName
    if (driver.value.shortName == '') delete driver.value.shortName
    if (driver.value.driverCategory?.toString() == '') delete driver.value.driverCategory
  }
})
onMounted(() => {
  if (driver.value) {
    const parsedId = parsePlayerId(driver.value.playerID, playerIdForm.platform)
    playerIdForm.id = parsedId.playerId
    playerIdForm.platform = parsedId.platform
  }
})
</script>

<template>
  <div v-if="driver" class="driver-entry-inline row">
    <div class="col-4">
      <b-input-group>
        <template #prepend>
          <b-form-select
            v-model="playerIdForm.platform"
            id="platform-select"
            :class="`platform-select ${getPlatformClass(playerIdForm.platform)}`"
            :options="PlatformOptionsSmall"
            size="sm"
            @update:model-value="onPlayerIdUpdated"
          />
        </template>
        <b-form-input v-model="playerIdForm.id" type="text" id="id" required size="sm" placeholder="Player ID" @update:model-value="onPlayerIdUpdated" />
      </b-input-group>
    </div>
    <div class="col-6">
      <b-input-group>
        <b-form-input v-model="driver.firstName" type="text" id="first-name" size="sm" placeholder="First name" />
        <b-form-input v-model="driver.lastName" type="text" id="last-name" size="sm" placeholder="Last name" />
        <b-form-input v-model="driver.shortName" type="text" id="short-name" size="sm" placeholder="LAS" />
      </b-input-group>
    </div>
    <div class="col-2">
      <b-input-group>
        <b-form-select v-model="driver.driverCategory" :options="gameData.driverCategoryOptionsShort()" id="category" size="sm" />
      </b-input-group>
    </div>
  </div>
</template>

<style scoped lang="scss">
.driver-entry-inline {
  padding: 0;
  margin: 0;
  div {
    padding: 0 0.05em;
  }

  select#platform-select {
    max-width: 4.5em;
  }
  input#short-name {
    max-width: 4em;
  }
}
</style>
