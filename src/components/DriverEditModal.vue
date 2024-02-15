<script lang="ts" setup>
import { DriverCategories } from '@/lib/gameData'
import type { EntryListDriver } from '@/lib/gameFiles'
import { formatPlayerId, getPlatformClass, parsePlayerId } from '@/lib/utils'
import { Platform, PlatformOptions } from '@/stores/settings'
import type { SelectOption, BvEvent } from 'bootstrap-vue-next'
import { cloneDeep } from 'lodash-es'
import { watchEffect } from 'vue'
import { computed, reactive } from 'vue'
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    driver?: EntryListDriver
    defaultPlatform: Platform
  }>(),
  {
    defaultPlatform: Platform.Steam,
  },
)
const emits = defineEmits<{
  (e: 'submit', value: EntryListDriver): void
}>()
const edit = ref(false)
const show = defineModel<boolean>({ required: true })

watch(
  () => props.driver,
  (value) => {
    if (value) {
      edit.value = true
      driverForm.value = cloneDeep(value)
    } else {
      edit.value = false
      driverForm.value = cloneDeep(defaultDriverForm)
    }
    let parsedId = parsePlayerId(driverForm.value.playerID)
    playerIdForm.id = parsedId.playerId
    playerIdForm.platform = parsedId.platform
  },
  { deep: true },
)

// #region Player ID formatting
const playerIdForm = reactive({
  id: '',
  platform: props.defaultPlatform,
})
// #endregion

// #region Form
const defaultDriverForm = {
  playerID: '',
} as EntryListDriver
const driverForm = ref<EntryListDriver>(defaultDriverForm)
watchEffect(() => {
  if (driverForm.value.firstName == '') delete driverForm.value.firstName
  if (driverForm.value.lastName == '') delete driverForm.value.lastName
  if (driverForm.value.shortName == '') delete driverForm.value.shortName
  if (driverForm.value.driverCategory?.toString() == '') delete driverForm.value.driverCategory
  driverForm.value.playerID = formatPlayerId(playerIdForm.id, playerIdForm.platform)
})
const driverCategoryOptions = computed(() => {
  const options = [
    {
      value: '',
      text: 'No category',
    },
  ] as SelectOption[]
  for (const category of DriverCategories) {
    options.push({ value: category.value, text: category.name })
  }
  return options
})

function validateForm() {
  if (driverForm.value.playerID == '') return false
  return true
}
function submit(event: BvEvent) {
  event.preventDefault()
  if (!validateForm()) return
  emits('submit', driverForm.value)
  show.value = false
}
// #endregion
</script>

<template>
  <b-modal v-model="show" id="driver-modal" :title="`${edit ? 'Edit' : 'Add'} driver`" @ok="submit">
    <div>a {{ driver }}</div>
    <div>b {{ driverForm }}</div>
    <hr />
    <b-form-group class="mb-3" label="Player ID" label-cols-md="3">
      <b-input-group>
        <template #prepend>
          <b-form-select v-model="playerIdForm.platform" :class="`platform-select ${getPlatformClass(playerIdForm.platform)}`" :options="PlatformOptions" />
        </template>
        <b-form-input v-model="playerIdForm.id" type="text" required />
      </b-input-group>
    </b-form-group>
    <b-form-group class="mb-3" label="First name" label-cols-md="3">
      <b-form-input v-model="driverForm.firstName" type="text" />
    </b-form-group>
    <b-form-group class="mb-3" label="Last name" label-cols-md="3">
      <b-form-input v-model="driverForm.lastName" type="text" />
    </b-form-group>
    <b-form-group class="mb-3" label="Short name" label-cols-md="3">
      <b-form-input v-model="driverForm.shortName" type="text" />
    </b-form-group>
    <b-form-group class="mb-3" label="Category" label-cols-md="3">
      <b-form-select v-model="driverForm.driverCategory" :options="driverCategoryOptions"> </b-form-select>
    </b-form-group>
  </b-modal>
</template>
