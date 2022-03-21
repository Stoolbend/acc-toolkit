<template>
  <div class="row m-1" @dragover.prevent @drop.prevent @drop="dragFile">
    <div class="col-12">
      <b-container v-if="file" fluid>
        <b-table-simple>
          <b-tr>
            <b-th> serverName</b-th>
            <b-th>
              adminPassword
            </b-th>
            <b-th>carGroup</b-th>
            <b-th>trackMedalsRequirement</b-th>
            <b-th>safetyRatingRequirement</b-th>
            <b-th>racecraftRatingRequirement</b-th>
          </b-tr>
          <b-tr>
            <b-td>
              <b-form-input
                @change="onUpdate()"
                v-model="file.serverName"
                placeholder="Server Name"
              >
              </b-form-input
            ></b-td>

            <b-td>
              <b-form-input
                @change="onUpdate()"
                v-model="file.adminPassword"
                placeholder="Admin Password"
              >
              </b-form-input
            ></b-td>
            <b-td
              ><b-form-select
                v-model="file.carGroup"
                @change="onUpdate()"
              >
              <b-form-select-option value="FreeForAll">Free for all</b-form-select-option>
              <b-form-select-option value="GT3">GT3</b-form-select-option>
              <b-form-select-option value="GT4">GT4</b-form-select-option>
              <b-form-select-option value="GTC">GTC</b-form-select-option>
              </b-form-select
            ></b-td>
            <b-td
              ><b-form-input
                type="number"
                v-model="file.trackMedalsRequirement"
                min="-1"
                max="3"
                @change="onUpdate()"
              ></b-form-input
            ></b-td>
            <b-td
              ><b-form-input
                type="number"
                v-model="file.safetyRatingRequirement"
                min="-1"
                max="99"
                @change="onUpdate()"
              ></b-form-input
            ></b-td>
            <b-td
              ><b-form-input
                type="number"
                v-model="file.racecraftRatingRequirement"
                min="-1"
                max="99"
                @change="onUpdate()"
              ></b-form-input
            ></b-td>
          </b-tr>
          <b-tr>
            <b-th>password</b-th>
            <b-th>spectatorPassword</b-th>
            <b-th>maxCarSlots</b-th>
            <b-th>dumpLeaderboards</b-th>
            <b-th>isRaceLocked</b-th>
            <b-th>randomizeTrackWhenEmpty</b-th>
          </b-tr>
          <b-tr>
            <b-td
              ><b-form-input
                v-model="file.password"
                @change="onUpdate()"
              ></b-form-input
            ></b-td>
            <b-td
              ><b-form-input
                v-model="file.spectatorPassword"
                @change="onUpdate()"
              ></b-form-input
            ></b-td>
            <b-td
              ><b-form-input
                type="number"
                v-model="file.maxCarSlots"
                min="-1"
                @change="onUpdate()"
              ></b-form-input
            ></b-td>
            <b-td
              ><b-form-checkbox
                @change="onUpdate()"
                v-model="file.dumpLeaderboards"
                :value="1"
                :unchecked-value="0"
              ></b-form-checkbox
              >{{ file.dumpLeaderboards }}</b-td
            >
            <b-td
              ><b-form-checkbox
                @change="onUpdate()"
                v-model="file.isRaceLocked"
                :value="1"
                :unchecked-value="0"
              ></b-form-checkbox
              >{{ file.isRaceLocked }}</b-td
            >
            <b-td
              ><b-form-checkbox
                @change="onUpdate()"
                v-model="file.randomizeTrackWhenEmpty"
                :value="1"
                :unchecked-value="0"
              ></b-form-checkbox
              >{{ file.randomizeTrackWhenEmpty }}</b-td
            >
          </b-tr>
          <b-tr>
            <b-th>centralEntryListPath</b-th>
            <b-th>allowAutoDQ</b-th>
            <b-th>shortFormationLap</b-th>
            <b-th>dumpEntryList</b-th>
            <b-th>formationLapType</b-th>
            <b-th>Premature Disconnects</b-th>
          </b-tr>
          <b-tr>
            <b-td>
              <b-form-input
                @change="onUpdate()"
                v-model="file.centralEntryListPath"
              >
              </b-form-input
            ></b-td>
            <b-td
              ><b-form-checkbox
                @change="onUpdate()"
                v-model="file.allowAutoDQ"
                :value="1"
                :unchecked-value="0"
              ></b-form-checkbox
              >{{ file.allowAutoDQ }}</b-td
            >
            <b-td
              ><b-form-checkbox
                @change="onUpdate()"
                v-model="file.shortFormationLap"
                :value="1"
                :unchecked-value="0"
              ></b-form-checkbox
              >{{ file.shortFormationLap }}</b-td
            >
            <b-td
              ><b-form-checkbox
                @change="onUpdate()"
                v-model="file.dumpEntryList"
                :value="1"
                :unchecked-value="0"
              ></b-form-checkbox
              >{{ file.dumpEntryList }}</b-td
            >
            <b-td
              ><b-form-select
                @change="onUpdate()"
                v-model="file.formationLapType"
              >
                <b-form-select-option :value="3"
                  >default formation lap with position control and UI
                </b-form-select-option>
                <b-form-select-option :value="0"
                  >Old Limiter Lap</b-form-select-option
                >
                <b-form-select-option :value="1"
                  >free (replaces /manual start), only usable for private
                  servers</b-form-select-option
                >
                 <b-form-select-option :value="4"
                  >one free formation lap + 1 ghosted cars lap</b-form-select-option
                > <b-form-select-option :value="5"
                  >short formation lap with position control and UI + 1 ghosted cars lap</b-form-select-option
                >
              </b-form-select>
            </b-td>
            <b-td
              ><b-form-select
                @change="onUpdate()"
                v-model="file.ignorePrematureDisconnects"
              >
                <b-form-select-option :value="1"
                  >default: less arbitrary connections lost
                </b-form-select-option>
                <b-form-select-option :value="0"
                  >more timeouts, but strict disconnection of anyone who
appears inactive for 5 seconds. Can be useful on unsupported
platforms where TCP sockets act differently</b-form-select-option
                >
              </b-form-select>
            </b-td>
          </b-tr>
        </b-table-simple>
      </b-container>
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
        placeholder="Drag & Drop your settings.json or paste its contents here..."
      />
      <div class="d-flex flex-row justify-content-center mb-1">
        <b-button variant="secondary" @click="onNew">
          New Rules
        </b-button>
      </div>
      <div
        v-if="!!this.file"
        class="d-flex flex-row justify-content-center mb-1"
      >
        <b-button variant="secondary" @click="downloadFile">
          Download settings.json
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
import download from "downloadjs";

export default {
  name: "Bop",
  data() {
    return {
      file: null,
      fileText: null,
      jsonError: null,
      showJson: true,
    };
  },
  methods: {
    downloadFile() {
      let data = Buffer.from(this.fileText, "utf16le");
      download(data, "eventRules.json", "application/json");
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
        serverName: "Kunos Test Server #03",
        adminPassword: " adminPw123",
        carGroup: "GT4",
        trackMedalsRequirement: 3,
        safetyRatingRequirement: 49,
        racecraftRatingRequirement: -1,
        password: "accessPw123",
        spectatorPassword: "spectPw432",
        maxCarSlots: 30,
        dumpLeaderboards: 0,
        isRaceLocked: 1,
        randomizeTrackWhenEmpty: 0,
        centralEntryListPath: "",
        allowAutoDQ: 1,
        shortFormationLap: 0,
        dumpEntryList: 0,
        formationLapType: 3,
        ignorePrematureDisconnects: 1,
      };
    },

    onUpdate() {
      let newList = cloneDeep(this.file);
      this.file = newList;
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
