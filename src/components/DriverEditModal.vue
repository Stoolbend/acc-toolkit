<script lang="ts" setup>
import { DriverCategories } from '@/lib/gameData'
import type { EntryListDriver } from '@/lib/gameFiles'
import { formatPlayerId, getPlatformClass, parsePlayerId } from '@/lib/utils'
import { useDriverStore } from '@/stores/drivers'
import { PlatformOptions } from '@/stores/settings'
import type { SelectOption } from 'bootstrap-vue-next'
import { cloneDeep } from 'lodash-es'
import { watchEffect } from 'vue'
import { onMounted } from 'vue'
import { computed, reactive } from 'vue'
import { ref, watch } from 'vue'
import { VueFinalModal } from 'vue-final-modal'

const props = defineProps<{
  driver?: EntryListDriver
}>()
const emits = defineEmits<{
  (e: 'submit', value: EntryListDriver): void
  (e: 'close'): void
}>()
const driverStore = useDriverStore()
const edit = ref(false)

onMounted(() => {
  if (props.driver) {
    edit.value = true
    driverForm.value = cloneDeep(props.driver)
  } else {
    edit.value = false
    driverForm.value = cloneDeep(defaultDriverForm)
  }
  let parsedId = parsePlayerId(driverForm.value.playerID)
  playerIdForm.id = parsedId.playerId
  playerIdForm.platform = parsedId.platform
})

// #region Player ID formatting
const playerIdForm = reactive({
  id: '',
  platform: cloneDeep(driverStore.defaultPlatform),
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
function submit(event: Event) {
  event.preventDefault()
  if (!validateForm()) return
  emits('submit', driverForm.value)
}
// #endregion
</script>

<template>
  <VueFinalModal
    id="driver-modal"
    class="d-flex justify-content-center align-items-center modal"
    content-class="modal-dialog"
    content-transition="vfm-fade"
    overlay-transition="vfm-fade"
  >
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{ edit ? 'Edit' : 'Add' }} driver</h5>
      </div>
      <b-form @submit="submit">
        <div class="modal-body">
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
          <b-form-group label="Category" label-cols-md="3">
            <b-form-select v-model="driverForm.driverCategory" :options="driverCategoryOptions" />
          </b-form-group>
        </div>
        <div class="modal-footer">
          <div class="d-flex flex-row justify-content-end">
            <b-button type="submit" variant="success" class="me-2">{{ edit ? 'Save' : 'Add' }}</b-button>
            <b-button @click="emits('close')" variant="secondary">Cancel</b-button>
          </div>
        </div>
      </b-form>
    </div>
  </VueFinalModal>
</template>
