import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { type EntryListDriver } from '@/lib/gameFiles'
import { Platform } from './settings'

export const useDriverStore = defineStore('drivers', () => {
  const defaultPlatform = ref<Platform>(Platform.Steam)
  const drivers = ref<EntryListDriver[]>([])

  function updateDefaultPlatform(platform: Platform) {
    defaultPlatform.value = platform
    localStorage.setItem('defaultPlatform', defaultPlatform.value)
    console.info('Updated default platform')
  }

  function addDriver(driver: EntryListDriver) {
    const index = drivers.value.findIndex((d) => d.playerID === driver.playerID)
    if (index < 0) drivers.value.push(driver)
    else throw new Error('A driver with that player ID already exists')
    console.info('Added driver')
    saveDrivers()
  }

  function updateDriver(driver: EntryListDriver) {
    const index = drivers.value.findIndex((d) => d.playerID === driver.playerID)
    if (index !== -1) {
      drivers.value[index] = driver
      console.info('Updated driver')
    }
    saveDrivers()
  }

  function deleteDriver(playerID: string) {
    const index = drivers.value.findIndex((d) => d.playerID === playerID)
    if (index !== -1) {
      drivers.value.splice(index, 1)
      console.info('Deleted driver')
    }
    saveDrivers()
  }

  function saveDrivers() {
    localStorage.setItem('drivers', JSON.stringify(drivers.value))
    console.info('Saved drivers')
  }

  onMounted(() => {
    // Default platform
    let storedDefaultPlatform = localStorage.getItem('defaultPlatform')
    if (Object.values(Platform).some((val: string) => val === storedDefaultPlatform)) defaultPlatform.value = <Platform>storedDefaultPlatform
    else defaultPlatform.value = Platform.Steam
    // Drivers
    drivers.value = JSON.parse(localStorage.getItem('drivers') || '[]')
    console.info('Loaded driver store data')
  })

  return { defaultPlatform, drivers, updateDefaultPlatform, addDriver, updateDriver, deleteDriver }
})
