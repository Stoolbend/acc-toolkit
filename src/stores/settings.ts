import { ref } from 'vue'
import { defineStore } from 'pinia'

export enum Platform {
  Steam = 'steam',
  Xbox = 'xbox',
  PlayStation = 'ps'
}

export const useSettingsStore = defineStore('settings', () => {
  // #region Platform
  const platform = ref<Platform>(Platform.Steam)
  function setPlatform(selected: Platform) {
    platform.value = selected
  }
  // #endregion

  return { platform, setPlatform }
})
