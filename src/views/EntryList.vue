<template>
  <div class="row m-1" @dragover.prevent @drop.prevent @drop="dragFile">
    <div class="col-12">
      <div
        v-if="entryList" 
        class="d-flex flex-column">
        <b-table
          striped
          bordered
          :fields="fields"
          :items="entries">
          <template #cell(drivers)="data">
            <template v-if="data.item.drivers.length < 1">
              <div class="d-flex flex-column align-items-center w-100">
                <b-icon 
                  icon="exclamation-triangle"
                  variant="danger"
                  font-scale="3"/>
                <small>
                  At least 1 driver is required
                </small>
              </div>
            </template>
            <div class="d-flex flex-column">
              <b-collapse
                :id="'collapse-drivers-' + getHash(data.item)"
                visible>
                <template v-for="(driver, index) in data.item.drivers">
                  <b-card 
                    :key="driver.playerID"
                    no-body 
                    class="p-2 mb-1">
                    <div class="d-flex flex-row pb-1">
                      <b-input-group 
                        size="sm">
                        <b-input
                          type="text"
                          :value="driver.firstName"
                          placeholder="First name"
                          @change="onDriverPropertyChange(driver, data.item, 'firstName', $event)" />
                        <b-input
                          type="text"
                          :value="driver.lastName"
                          placeholder="Last name"
                          @change="onDriverPropertyChange(driver, data.item, 'lastName', $event)" />
                      </b-input-group>
                    </div>
                    <div class="d-flex flex-row pb-1">
                      <b-input-group 
                        size="sm"
                        prepend="Short name">
                        <b-input
                          type="text"
                          lazy
                          :value="driver.shortName"
                          @change="onDriverPropertyChange(driver, data.item, 'shortName', $event)" />
                      </b-input-group>
                    </div>
                    <div class="d-flex flex-row pb-1">
                      <b-input-group 
                        size="sm"
                        prepend="Driver category">
                        <b-select
                          :options="driverCategorySelectOptions"
                          :value="driver.driverCategory" 
                          @change="onDriverPropertyChange(driver, data.item, 'driverCategory', $event, true)" />
                        <b-input-group-append>
                          <b-button 
                            v-if="driver.driverCategory || driver.driverCategory === 0"
                            variant="secondary"
                            @click="onDriverPropertyChange(driver, data.item, 'driverCategory', null, true)">
                            Remove
                          </b-button>
                        </b-input-group-append>
                      </b-input-group>
                    </div>
                    <div class="d-flex flex-row pb-1">
                      <b-input-group 
                        size="sm"
                        prepend="Steam ID">
                        <b-input
                          type="text"
                          :value="driver.playerID"
                          @change="onDriverPropertyChange(driver, data.item, 'playerID', $event)" />
                      </b-input-group>
                    </div>
                    <div class="d-flex flex-row justify-content-between">
                      <b-button-group>
                        <b-button
                          v-if="index > 0"
                          variant="primary"
                          size="sm"
                          @click="swapDriver(index, index - 1, data.item)">
                          <b-icon icon="arrow-up"/>
                        </b-button>
                        <b-button
                          v-if="index < getDriversLength(data.item) - 1"
                          variant="primary"
                          size="sm"
                          @click="swapDriver(index, index + 1, data.item)">
                          <b-icon icon="arrow-down"/>
                        </b-button>
                      </b-button-group>
                      <b-button
                        variant="danger"
                        size="sm"
                        v-b-tooltip.hover
                        title="Delete driver"
                        @click="deleteDriver(driver, data.item)">
                        <b-icon icon="trash-fill"/>
                      </b-button>
                    </div>
                    <div class="d-flex flex-column align-items-center">
                      <div 
                        v-if="!driver.playerID"
                        class="d-flex flex-row align-items-center pt-1">
                        <b-icon 
                          icon="exclamation-triangle-fill"
                          variant="danger"
                          font-scale="1.2"
                          class="mr-2"/>
                        <small>
                          Steam ID is empty
                        </small>
                      </div>
                      <div 
                        v-if="!data.item.overrideDriverInfo"
                        class="d-flex flex-row align-items-center pt-1">
                        <b-icon 
                          icon="exclamation-triangle-fill"
                          variant="warning"
                          font-scale="1.2"
                          class="mr-2"/>
                        <small>
                          Override driver info is disabled
                        </small>
                      </div>
                    </div>
                  </b-card>
                </template>
              </b-collapse>
              <div class="text-center mt-1">
                <small>
                  {{ data.item.drivers.length }} driver{{ data.item.drivers.length === 1 ? '' : 's' }}
                </small>
              </div>
            </div>
          </template>
          <template #cell(car)="data">
            <b-card-group>
              <b-card no-body class="p-2">
                <div class="d-flex flex-column">
                  <div class="d-flex flex-row align-items-center pb-1">
                    <b-input-group 
                      size="sm"
                      prepend="Race number">
                      <b-input
                        type="number"
                        min="-1"
                        max="998"
                        :value="data.item.raceNumber" 
                        @change="onPropertyChange(data.item, 'raceNumber', $event, true)" />
                      <b-input-group-append>
                        <b-button 
                          v-if="data.item.raceNumber !== -1"
                          variant="secondary"
                          @click="onPropertyChange(data.item, 'raceNumber', -1, true)">
                          Remove
                        </b-button>
                        <b-button 
                          v-else
                          variant="primary"
                          @click="onPropertyChange(data.item, 'raceNumber', $utils.getNextAvailableCarNumber(entryList.entries), true)">
                          Generate
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                  <div class="d-flex flex-row align-items-center pb-1">
                    <b-input-group 
                      size="sm"
                      prepend="Car model">
                      <b-select
                        :options="carSelectOptions"
                        :value="data.item.forcedCarModel" 
                        @change="onPropertyChange(data.item, 'forcedCarModel', $event, true)" />
                    </b-input-group>
                  </div>
                  <div class="d-flex flex-row align-items-center pb-1">
                    <b-input-group 
                      size="sm"
                      prepend="Custom car JSON">
                      <b-input
                        type="text"
                        placeholder="No custom car JSON"
                        :value="data.item.customCar" 
                        @change="onPropertyChange(data.item, 'customCar', $event)" />
                    </b-input-group>
                  </div>
                  <div class="d-flex flex-row align-items-center">
                    <div class="mr-2">
                      <small>
                        Override car model for custom car
                      </small>
                    </div>
                    <b-checkbox
                      v-model="data.item.overrideCarModelForCustomCar" 
                      value="1"
                      unchecked-value="0"
                      @change="onPropertyChange(data.item, 'overrideCarModelForCustomCar', $event, true)" />
                  </div>
                  <div class="d-flex flex-row align-items-center">
                    <div class="mr-2">
                      <small>
                        Override driver info
                      </small>
                    </div>
                    <b-checkbox
                      v-model="data.item.overrideDriverInfo" 
                      value="1"
                      unchecked-value="0"
                      @change="onPropertyChange(data.item, 'overrideDriverInfo', $event, true)" />
                  </div>
                </div>
              </b-card>
              <b-card no-body class="p-2">
                <div class="d-flex flex-column">
                  <div class="d-flex flex-row align-items-center pb-1">
                    <b-input-group 
                      size="sm"
                      prepend="Grid position">
                      <b-input
                        type="number"
                        min="1"
                        :value="data.item.defaultGridPosition" 
                        @change="onPropertyChange(data.item, 'defaultGridPosition', $event, true)" />
                      <b-input-group-append>
                        <b-button 
                          v-if="data.item.defaultGridPosition"
                          variant="secondary"
                          @click="onPropertyChange(data.item, 'defaultGridPosition', null, true)">
                          Remove
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                  <div class="d-flex flex-row align-items-center pb-1">
                    <b-input-group 
                      size="sm"
                      prepend="Ballast (kg)">
                      <b-input
                        type="number"
                        min="0"
                        max="100"
                        :value="data.item.ballastKg" 
                        @change="onPropertyChange(data.item, 'ballastKg', $event, true)" />
                      <b-input-group-append>
                        <b-button 
                          v-if="data.item.ballastKg"
                          variant="secondary"
                          @click="onPropertyChange(data.item, 'ballastKg', null, true)">
                          Remove
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                  <div class="d-flex flex-row align-items-center pb-1">
                    <b-input-group 
                      size="sm"
                      prepend="Restrictor (%)">
                      <b-input
                        type="number"
                        min="0"
                        max="20"
                        :value="data.item.restrictor" 
                        @change="onPropertyChange(data.item, 'restrictor', $event, true)" />
                      <b-input-group-append>
                        <b-button 
                          v-if="data.item.restrictor"
                          variant="secondary"
                          @click="onPropertyChange(data.item, 'restrictor', null, true)">
                          Remove
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                  <div class="d-flex flex-row align-items-center">
                    <div class="mr-2">
                      <small>
                        Server Admin
                      </small>
                    </div>
                    <b-checkbox
                      v-model="data.item.isServerAdmin" 
                      value="1"
                      unchecked-value="0"
                      @change="onPropertyChange(data.item, 'isServerAdmin', $event, true)" />
                  </div>
                </div>
              </b-card>
            </b-card-group>
          </template>
          <template #cell(actions)="data">
            <div class="d-flex flex-column align-items-center w-100">
              <b-button 
                class="mb-1"
                size="sm"
                variant="success"
                @click="addDriver(data.item)">
                Add driver
              </b-button>
              <b-button 
                class="mb-1"
                size="sm"
                variant="outline-secondary"
                v-b-toggle="'collapse-drivers-' + getHash(data.item)">
                <span class="when-open">Hide</span><span class="when-closed">Show</span> drivers
              </b-button>
              <b-button 
                class="mb-1"
                size="sm"
                variant="danger"
                @click="deleteEntry(data.item)">
                Delete entry
              </b-button>
            </div>
          </template>
        </b-table>
        <div class="d-flex flex-row justify-content-center pb-2">
          <div class="mr-2">
            Reject drivers not on entry list
          </div>
          <b-checkbox
            v-model="entryList.forceEntryList" 
            value="1"
            unchecked-value="0"
            @change="toggleForceEntryList" />
        </div>
        <div class="d-flex flex-column align-items-center pb-2">
          <div>
            {{ entryList.entries.length }} cars - {{ totalDrivers }} drivers
          </div>
        </div>
        <div class="d-flex flex-row justify-content-center mt-2">
          <b-button
            variant="success"
            @click="onAdd">
            Add car
          </b-button>
        </div>
      </div>
      <div
        v-else
        class="d-flex flex-column">
        <b-alert
          variant="info"
          show>
          No entrylist is loaded. Paste in an existing one, or click "New entry list".
        </b-alert>
      </div>
    </div>
    <div class="col-12">
      <hr />
    </div>
    <div class="col-12 d-flex flex-column align-items-center">
      <b-alert
        variant="danger"
        :show="!!jsonError"
        class="mb-2">
        {{ jsonError }}
      </b-alert>
      <b-textarea
        v-model="entryListText" 
        rows="10"
        class="mb-2"
        placeholder="Paste contents of entrylist.json here..." />
      <div class="d-flex flex-row justify-content-center mb-1">
        <b-button
          variant="secondary"
          @click="onNew">
          New entry list
        </b-button>
      </div>
      <div
        v-if="!!this.entryList"
        class="d-flex flex-row justify-content-center mb-1"
      >
        <b-button variant="secondary" @click="downloadEntryList">
          Download Entry List
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
/*
Copyright (C) 2021 Conor Morgan
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

import cloneDeep from 'lodash.clonedeep'
import cars from '../mixins/cars'
import driverCategories from '../mixins/driverCategories'
import hash from 'object-hash'
import isEqual from 'lodash.isequal'
import download from 'downloadjs'

export default {
  name: 'EntryList',
  mixins: [ cars, driverCategories ],
  data () {
    return {
      entryList: null,
      entryListText: null,
      jsonError: null,
      showJson: true,
      fields: [
        'drivers',
        'car',
        {
          key: 'actions',
          label: ''
        }
      ]
    }
  },
  computed: {
    entries () {
      if (this.entryList && Object.prototype.hasOwnProperty.call(this.entryList, 'entries') && Array.isArray(this.entryList.entries))
        return this.entryList.entries
      else return []
    },
    totalDrivers() {
      let totalDrivers = 0
      if (this.entryList && this.entryList.entries && Array.isArray(this.entryList.entries)) {
        for (let i = 0; i < this.entryList.entries.length; i++) {
          if (this.entryList.entries[i] && this.entryList.entries[i].drivers && Array.isArray(this.entryList.entries[i].drivers)) {
            totalDrivers = totalDrivers + this.entryList.entries[i].drivers.length
          }
        }
      }
      return totalDrivers
    }
  },
  mounted () {
    // Setting from mixins/cars.js to enable the -1 "No forced car" option.
    this.carSelectSettings.showNoCar = true
  },
  methods: {
    onNew () {
      this.entryList = {
        entries: [],
        configVersion: 1,
        forceEntryList: 0
      }
    },
    onEntryListUpdate (val) {
      console.debug('Entry list has changed.')
      this.entryList = val
    },
    getDriversLength(entry) {
      if (entry && entry.drivers && Array.isArray(entry.drivers)) {
        return entry.drivers.length
      } else return 0
    },
    onAdd () {
      let newCar = {
        drivers: [],
        raceNumber: this.$utils.getNextAvailableCarNumber(this.entryList.entries),
        customCar: '',
        forcedCarModel: -1,
        overrideDriverInfo: 1,
        isServerAdmin: 0,
        overrideCarModelForCustomCar: 1,
        configVersion: 1
      }

      let newList = cloneDeep(this.entryList)
      newList.entries.push(newCar)
      this.entryList = newList
    },
    onPropertyChange (entry, key, value, isInt = false) {
      // Before processing, apply some quick field validation
      if (key === 'raceNumber' && (value === '' || value === '0' || value < -1 || value > 998))
        value = -1 
      if (key === 'defaultGridPosition' && (value === '' || value === '0' || value < 1))
        value = null
      if (key === 'ballastKg' && (value === '' || value < 0 || value > 100))
        value = null
      if (key === 'restrictor' && (value === '' || value < 0 || value > 20))
        value = null

      // Clone existing entry list
      let newList = cloneDeep(this.entryList)
      // Find entry we want to modify
      let index = newList.entries.findIndex(v => {
        return isEqual(entry, v)
      })
      // Amend entry
      if (value === null)
        delete newList.entries[index][key]
      else if (isInt) 
        newList.entries[index][key] = parseInt(value)
      else
        newList.entries[index][key] = value
      // Update the existing entry list
      this.entryList = newList
    },
    onDriverPropertyChange (driver, entry, key, value, isInt = false) {
      // Before processing, apply some quick field validation
      if (key === 'playerID' && (!value.startsWith('S')))
        value = 'S' + value

      // Clone existing entry list
      let newList = cloneDeep(this.entryList)
      // Find entry we want to modify
      let index = newList.entries.findIndex(v => {
        return isEqual(entry, v)
      })
      // Find driver inside entry
      let dindex = newList.entries[index].drivers.findIndex(v => {
        return isEqual(driver, v)
      })
      // Amend driver inside entry
      if (value === null)
        delete newList.entries[index].drivers[dindex][key]
      else if (isInt) 
        newList.entries[index].drivers[dindex][key] = parseInt(value)
      else
        newList.entries[index].drivers[dindex][key] = value
      // Update the existing entry list
      this.entryList = newList
    },
    addDriver (entry) {
      // Clone existing entry list
      let newList = cloneDeep(this.entryList)
      // Find entry we want to modify
      let index = newList.entries.findIndex(v => {
        return isEqual(entry, v)
      })
      newList.entries[index].drivers.push({
        firstName: '',
        lastName: '',
        shortName: '',
        playerID: ''
      })
      // Update the existing entry list
      this.entryList = newList
    },
    downloadEntryList() {
      let data = Buffer.from(this.entryListText, "utf16le");
      download(data, "entryList.json", "application/json");
    },
    deleteEntry(entry) {
      // Clone existing entry list
      let newList = cloneDeep(this.entryList)
      // Find entry we want to modify
      let index = newList.entries.findIndex(v => {
        return isEqual(entry, v)
      })
      // Delete the entry
      newList.entries.splice(index, 1)
      // Update the existing entry list
      this.entryList = newList
    },
    deleteDriver (driver, entry) {
      // Clone existing entry list
      let newList = cloneDeep(this.entryList)
      // Find entry we want to modify
      let index = newList.entries.findIndex(v => {
        return isEqual(entry, v)
      })
      // Find driver inside entry
      let dindex = newList.entries[index].drivers.findIndex(v => {
        return isEqual(driver, v)
      })
      // Delete driver from within entry
      newList.entries[index].drivers.splice(dindex, 1)
      // Update the existing entry list
      this.entryList = newList
    },
    swapDriver (index1, index2, entry) {
      // Clone existing entry list
      let newList = cloneDeep(this.entryList)
      // Find entry we want to modify
      let index = newList.entries.findIndex(v => {
        return isEqual(entry, v)
      });
      // Swap driver with above/below
      let temp = newList.entries[index].drivers[index1]
      newList.entries[index].drivers[index1] = newList.entries[index].drivers[index2]
      newList.entries[index].drivers[index2] = temp
      // Update the existing entry list
      this.entryList = newList
    },
    toggleForceEntryList (value) {
      // Clone existing entry list
      let newList = cloneDeep(this.entryList)
      // Toggle forceEntryList
      newList.forceEntryList = parseInt(value)
      // Update the existing entry list
      this.entryList = newList
    },
    getHash (obj) {
      return hash(obj)
    }
  },
  watch: {
    entryList (val) {
      if (val !== null && val !== undefined) {
        this.entryListText = JSON.stringify(val, null, 2)
      }
    },
    entryListText (val) {
      try {
        this.entryList = JSON.parse(val)
        this.jsonError = null
      } catch (error) {
        this.entryList = null
        this.jsonError = error
      }
    }
  }
}
</script>
<style scoped>
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
</style>
