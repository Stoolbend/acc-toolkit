import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { SelectOption } from 'bootstrap-vue-next'

export enum Platform {
  Steam = 'steam',
  Xbox = 'xbox',
  PlayStation = 'ps',
}
export const PlatformOptions = [
  { value: Platform.Steam, text: 'Steam' },
  { value: Platform.Xbox, text: 'Xbox' },
  { value: Platform.PlayStation, text: 'PlayStation' },
] as SelectOption[]
export const PlatformOptionsSmall = [
  { value: Platform.Steam, text: 'S' },
  { value: Platform.Xbox, text: 'X' },
  { value: Platform.PlayStation, text: 'PS' },
] as SelectOption[]

export const useSettingsStore = defineStore('settings', () => {
  // #region Platform
  const platform = ref<Platform>(Platform.Steam)
  function setPlatform(selected: Platform) {
    platform.value = selected
  }
  // #endregion

  return { platform, setPlatform }
})
