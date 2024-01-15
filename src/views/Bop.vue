<template>
  <div class="row m-1" @dragover.prevent @drop.prevent @drop="dragFile">
    <div class="col-12">
      <div
        v-if="file" 
        class="d-flex flex-column">
        <b-table
          striped
          bordered
          :fields="fields"
          :items="entries">
          <template #cell(car)="data">
            <b-card no-body class="p-2">
              <div class="d-flex flex-row align-items-center pb-1">
                <b-input-group 
                  size="sm"
                  prepend="Track">
                  <b-select
                    :options="trackSelectOptions"
                    :value="data.item.track" 
                    @change="onPropertyChange(data.item, 'track', $event)" />
                </b-input-group>
              </div>
              <div class="d-flex flex-row align-items-center">
                <b-input-group 
                  size="sm"
                  prepend="Car model">
                  <b-select
                    :options="carSelectOptions"
                    :value="data.item.carModel" 
                    @change="onPropertyChange(data.item, 'carModel', $event, true)" />
                </b-input-group>
              </div>
              <div class="d-flex flex-column align-items-center">
                <div 
                  v-if="checkForDuplicateKey(data.item)"
                  class="d-flex flex-row align-items-center pt-1">
                  <b-icon 
                    icon="exclamation-triangle-fill"
                    variant="danger"
                    font-scale="1.2"
                    class="mr-2"/>
                  <small>
                    This track & car combination already exists
                  </small>
                </div>
                <div 
                  v-if="!data.item.track"
                  class="d-flex flex-row align-items-center pt-1">
                  <b-icon 
                    icon="exclamation-triangle-fill"
                    variant="danger"
                    font-scale="1.2"
                    class="mr-2"/>
                  <small>
                    No track is selected
                  </small>
                </div>
                <div 
                  v-if="!data.item.carModel && data.item.carModel !== 0"
                  class="d-flex flex-row align-items-center pt-1">
                  <b-icon 
                    icon="exclamation-triangle-fill"
                    variant="danger"
                    font-scale="1.2"
                    class="mr-2"/>
                  <small>
                    No car is selected
                  </small>
                </div>
                <div 
                  v-if="!data.item.ballast && !data.item.restrictor"
                  class="d-flex flex-row align-items-center pt-1">
                  <b-icon 
                    icon="info-circle"
                    variant="info"
                    font-scale="1.2"
                    class="mr-2"/>
                  <small>
                    No balance settings are set
                  </small>
                </div>
              </div>
            </b-card>
          </template>
          <template #cell(balanceSettings)="data">
            <b-card no-body class="p-2">
              <div class="d-flex flex-row align-items-center pb-1">
                <b-input-group 
                  size="sm"
                  prepend="Ballast (kg)">
                  <b-input
                    type="number"
                    min="-40"
                    max="40"
                    :value="data.item.ballast" 
                    @change="onPropertyChange(data.item, 'ballast', $event, true)" />
                  <b-input-group-append>
                    <b-button 
                      v-if="data.item.ballast"
                      variant="secondary"
                      @click="onPropertyChange(data.item, 'ballast', null, true)">
                      Remove
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>
              <div class="d-flex flex-row align-items-center">
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
            </b-card>
          </template>
          <template #cell(actions)="data">
            <div class="d-flex flex-column align-items-center w-100">
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
        <div class="d-flex flex-row justify-content-center mt-2">
          <b-button
            variant="success"
            @click="onAdd">
            Add entry
          </b-button>
        </div>
      </div>
      <div
        v-else
        class="d-flex flex-column">
        <b-alert
          variant="info"
          show>
          No BoP list is loaded. Paste in an existing one, or click "New BoP list".
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
        v-model="fileText" 
        rows="10"
        class="mb-2"
        placeholder="Drag & Drop your bop.json or paste its contents here..." />
      <div class="d-flex flex-row justify-content-center mb-1">
        <b-button
          variant="secondary"
          @click="onNew">
          New BoP list
        </b-button>
      </div>
       <div
        v-if="!!this.file"
        class="d-flex flex-row justify-content-center mb-1"
      >
        <b-button variant="secondary" @click="downloadFile">
          Download BoP list
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
import isEqual from 'lodash.isequal'
import tracks from '../mixins/tracks'
import download from 'downloadjs'


export default {
  name: 'Bop',
  mixins: [ cars, tracks ],
  data () {
    return {
      file: null,
      fileText: null,
      jsonError: null,
      showJson: true,
      fields: [
        'car',
        'balanceSettings',
        {
          key: 'actions',
          label: ''
        }
      ]
    }
  },
  computed: {
    entries () {
      if (this.file && Object.prototype.hasOwnProperty.call(this.file, 'entries') && Array.isArray(this.file.entries))
        return this.file.entries
      else return []
    }
  },
  methods: {
    downloadFile() {
      let data = Buffer.from(this.fileText, "utf16le");
      download(data, "bop.json", "application/json");
    },
    dragFile(e) {
      let files = e.dataTransfer.files;
      let file = files[0];
      const reader = new FileReader();

      let result = null;

      reader.addEventListener("load", () => {
      result = reader.result;
        this.file=JSON.parse(result);
      }, false);

      if (file) {
        reader.readAsText(file, "UTF-16LE");
      }

    },
    onNew () {
      this.file = {
        entries: []
      }
    },
    onEntryListUpdate (val) {
      console.debug('Entry list has changed.')
      this.file = val
    },
    getDriversLength(entry) {
      if (entry && entry.drivers && Array.isArray(entry.drivers)) {
        return entry.drivers.length
      } else return 0
    },
    onAdd () {
      let newEntry = {
        track: null,
        carModel: null
      }
      let newList = cloneDeep(this.file)
      newList.entries.push(newEntry)
      this.file = newList
    },
    onPropertyChange (entry, key, value, isInt = false) {
      // Before processing, apply some quick field validation
      if (key === 'ballast' && (value === '' || value < 0 || value > 100))
        value = null
      if (key === 'restrictor' && (value === '' || value < 0 || value > 20))
        value = null

      // Clone existing entry list
      let newList = cloneDeep(this.file)
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
      this.file = newList
    },
    deleteEntry (entry) {
      // Clone existing entry list
      let newList = cloneDeep(this.file)
      // Find entry we want to modify
      let index = newList.entries.findIndex(v => {
        return isEqual(entry, v)
      })
      // Delete the entry
      newList.entries.splice(index, 1)
      // Update the existing entry list
      this.file = newList
    },
    checkForDuplicateKey (entry) {
      // Find entries that have same key
      let duplicates = this.file.entries.filter(v => {
        return v.track === entry.track && v.carModel === entry.carModel
      })      
      if (duplicates && Array.isArray(duplicates) && duplicates.length > 1) return true
      return false
    }
  },
  watch: {
    file (val) {
      if (val !== null && val !== undefined) {
        this.fileText = JSON.stringify(val, null, 2)
      }
    },
    fileText (val) {
      try {
        this.file = JSON.parse(val)
        this.jsonError = null
      } catch (error) {
        this.file = null
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
