<template>
  <div class="row m-1" @dragover.prevent @drop.prevent @drop="dragFile">
    <div class="col-12">
      <b-container v-if="file" fluid>
        <b-table-simple>
          <b-tr>
            <b-th> Track</b-th>
            <b-th>
              Pre-Race Waiting Time (sec)
            </b-th>
            <b-th>Session Overtime (sec)</b-th>
            <b-th>Ambient Temperature</b-th>
            <b-th>Cloud Level</b-th>
            <b-th>Rain Level</b-th>
            <b-th>Weather Randomness</b-th>
          </b-tr>
          <b-tr>
            <b-td>
              <b-form-select
                v-model="file.track"
                @change="onUpdate()"
                :options="trackSelectOptions"
              ></b-form-select>
            </b-td>
            <b-td>
              <b-form-input
                number
                type="number"
                max="600"
                min="0"
                @change="onUpdate()"
                v-model="file.preRaceWaitingTimeSeconds"
              ></b-form-input>
            </b-td>
            <b-td>
              <b-form-input
                number
                type="number"
                @change="onUpdate()"
                v-model="file.sessionOverTimeSeconds"
                min="0"
                vertical
              ></b-form-input>
            </b-td>
            <b-td>
              <b-form-input
                number
                type="number"
                @change="onUpdate()"
                v-model="file.ambientTemp"
                max="45"
                vertical
              ></b-form-input>
            </b-td>
            <b-td>
              <b-form-input
                number
                type="number"
                @change="onUpdate()"
                v-model="file.cloudLevel"
                step="0.05"
                max="1"
                min="0"
                vertical
              ></b-form-input>
            </b-td>
            <b-td>
              <b-form-input
                number
                type="number"
                @change="onUpdate()"
                v-model="file.rain"
                step="0.05"
                max="1"
                min="0"
                vertical
              ></b-form-input>
            </b-td>
            <b-td>
              <b-form-input
                number
                type="number"
                @change="onUpdate()"
                v-model="file.weatherRandomness"
                step="1"
                max="7"
                min="0"
                vertical
              ></b-form-input
            ></b-td>
          </b-tr>
        </b-table-simple>
      </b-container>
      <div v-if="file" class="d-flex flex-column">
        <b-table striped bordered :fields="fields" :items="entries">
          <template #cell(sessionType)="item">
            <div>
              <b-form-select
                class="w-50"
                @change="onUpdate()"
                v-model="file.sessions[item.index].sessionType"
              >
                <b-form-select-option value="P">Practice</b-form-select-option>
                <b-form-select-option value="Q"
                  >Qualifying</b-form-select-option
                >
                <b-form-select-option value="R"
                  >Race</b-form-select-option
                ></b-form-select
              >
            </div>
          </template>
          <template #cell(hourOfDay)="item">
            <div>
              <b-form-spinbutton
                number
                class="w-50"
                min="0"
                max="23"
                @change="onUpdate()"
                v-model="file.sessions[item.index].hourOfDay"
              >
              </b-form-spinbutton>
            </div>
          </template>
          <template #cell(dayOfWeekend)="item">
            <div>
              <b-form-select
                class="w-50"
                @change="onUpdate()"
                v-model="file.sessions[item.index].dayOfWeekend"
              >
                <b-form-select-option  :value="1">Friday</b-form-select-option>
                <b-form-select-option  :value="2">Saturday</b-form-select-option>
                <b-form-select-option  :value="3"
                  >Sunday</b-form-select-option
                ></b-form-select
              >
            </div>
          </template>
          <template #cell(sessionDurationMinutes)="item">
            <div>
              <b-form-input
                number
                type="number"
                max="1440"
                min="0"
                @change="onUpdate()"
                v-model="file.sessions[item.index].sessionDurationMinutes"
              ></b-form-input>
            </div>
          </template>
          <template #cell(timeMultiplier)="item">
            <div>
              <b-form-spinbutton
                number
                class="w-50"
                min="0"
                max="24"
                @change="onUpdate()"
                v-model="file.sessions[item.index].timeMultiplier"
              >
              </b-form-spinbutton>
            </div>
          </template>
          <template #cell(actions)="data">
            <div class="d-flex flex-column align-items-center w-100">
              <b-button
                class="mb-1"
                size="sm"
                variant="danger"
                @click="deleteEntry(data.item)"
              >
                Delete Session
              </b-button>
              <div class="d-flex flex-row justify-content-between">
                <b-button-group>
                  <b-button
                    variant="primary"
                    size="sm"
                    @click="swapSession(data.index, data.index - 1)"
                  >
                    <b-icon icon="arrow-up" />
                  </b-button>
                  <b-button
                    variant="primary"
                    size="sm"
                    @click="swapSession(data.index, data.index + 1)"
                  >
                    <b-icon icon="arrow-down" />
                  </b-button>
                  <b-button size="sm" @click="copyEntry(data.index)">
                    <b-icon icon="files" />
                  </b-button>
                </b-button-group>
              </div>
            </div>
          </template>
        </b-table>
        <div class="d-flex flex-row justify-content-center mt-2">
          <b-button variant="success" @click="onAdd">
            Add entry
          </b-button>
        </div>
      </div>
      <div v-else class="d-flex flex-column">
        <b-alert variant="info" show>
          No event.json is loaded. Paste in an existing one, or click "New
          event.json".
        </b-alert>
      </div>
    </div>
    <div class="col-12">
      <hr />
    </div>
    <div class="col-12 d-flex flex-column align-items-center">
      <b-alert variant="danger" :show="!!jsonError" class="mb-2">
        {{ jsonError }}
      </b-alert>
      <b-textarea
        v-model="fileText"
        rows="10"
        class="mb-2"
        placeholder="Drag & Drop your event.json or paste its contents here..."
      />
      <div class="d-flex flex-row justify-content-center mb-1">
        <b-button variant="secondary" @click="onNew">
          New event.json
        </b-button>
      </div>
      <div
        v-if="!!this.file"
        class="d-flex flex-row justify-content-center mb-1"
      >
        <b-button variant="secondary" @click="downloadFile">
          Download event.json
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
/*
Copyright (C) 2022 Stefan Stawiarski
This file is part of ACC Tooklit by Conor Morgan, which is free software: you can 
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

import cloneDeep from "lodash.clonedeep";
import isEqual from "lodash.isequal";
import tracks from "../mixins/tracks";
import download from "downloadjs";
import sessionTypes from "../mixins/sessionTypes";

export default {
  name: "Bop",
  mixins: [tracks, sessionTypes],
  data() {
    return {
      file: null,
      fileText: null,
      jsonError: null,
      showJson: true,
      fields: [
        "sessionType",
        "hourOfDay",
        "dayOfWeekend",
        "timeMultiplier",
        "sessionDurationMinutes",
        {
          key: "actions",
          label: "",
        },
      ],
    };
  },
  computed: {
    entries() {
      if (
        this.file &&
        Object.prototype.hasOwnProperty.call(this.file, "sessions") &&
        Array.isArray(this.file.sessions)
      )
        return this.file.sessions;
      else return [];
    },
  },
  methods: {
    downloadFile() {
      let data = Buffer.from(this.fileText, "utf16le");
      download(data, "event.json", "application/json");
    },
    dragFile(e) {
      let files = e.dataTransfer.files;
      let file = files[0];
      const reader = new FileReader();

      let result = null;

      reader.addEventListener(
        "load",
        () => {
          result = reader.result;
          this.file = JSON.parse(result);
        },
        false
      );

      if (file) {
        reader.readAsText(file, "UTF-16LE");
      }
    },
    onNew() {
      this.file = {
        track: "monza",
        preRaceWaitingTimeSeconds: 180,
        sessionOverTimeSeconds: 300,
        ambientTemp: 19,
        cloudLevel: 0.2,
        rain: 0.0,
        weatherRandomness: 3,
        sessions: [],
        configVersion: 1,
      };
    },
    onAdd() {
      let newEntry = {
        hourOfDay: 0,
        dayOfWeekend: 1,
        timeMultiplier: 1,
        sessionType: "P",
        sessionDurationMinutes: 10,
      };
      let newList = cloneDeep(this.file);
      newList.sessions.push(newEntry);
      this.file = newList;
    },
    onUpdate() {
      let newList = cloneDeep(this.file);
      this.file = newList;
    },
    deleteEntry(entry) {
      // Clone existing entry list
      let newList = cloneDeep(this.file);
      // Find entry we want to modify
      let index = newList.sessions.findIndex((v) => {
        return isEqual(entry, v);
      });
      // Delete the entry
      newList.sessions.splice(index, 1);
      // Update the existing entry list
      this.file = newList;
    },
    copyEntry(index) {
      let newList = cloneDeep(this.file);

      let toBeCopied = newList.sessions[index];

      newList.sessions.splice(index, 0, toBeCopied);
      this.file = newList;
    },
    swapSession(index1, index2) {
      // Clone existing entry list
      let newFile = cloneDeep(this.file);
      // Find entry we want to modify

      // Swap driver with above/below

      let temp = newFile.sessions[index1];
      newFile.sessions[index1] = newFile.sessions[index2];
      newFile.sessions[index2] = temp;

      // Update the existing entry list
      this.file = newFile;
    },
  },
  watch: {
    file(val) {
      if (val !== null && val !== undefined) {
        this.fileText = JSON.stringify(val, null, 2);
      }
    },
    fileText(val) {
      try {
        this.file = JSON.parse(val);
        this.jsonError = null;
      } catch (error) {
        this.file = null;
        this.jsonError = error;
      }
    },
  },
};
</script>
<style scoped>
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
</style>
