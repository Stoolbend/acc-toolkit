<template>
  <div class="row m-1" @dragover.prevent @drop.prevent @drop="dragFile">
    <div class="col-12">
      <b-container v-if="file" fluid>
        <b-table-simple>
          <b-tr>
            <b-th> qualifyStandingType</b-th>
            <b-th>
              Pitstop Window Lenght
            </b-th>
            <b-th>Driver Stint Time (sec)</b-th>
            <b-th>Mandatory pit stops</b-th>
            <b-th>Max total driving time</b-th>
            <b-th>Max Driver per Team</b-th>
          </b-tr>
          <b-tr>
            <b-td style="width: 20%">
              <b-form-select
                @change="onUpdate()"
                v-model="file.qualifyStandingType"
              >
                <b-form-select-option :value="1"
                  >fastest lap</b-form-select-option
                >
                <b-form-select-option :value="2">
                  average lap (running Endurance mode for multiple Q sessions) .
                  Use 1, averaging Qualy is not yet officially
                  supported.</b-form-select-option
                >
              </b-form-select></b-td
            >

            <b-td
              ><b-form-input
                number
                type="number"
                v-model="file.pitWindowLengthSec"
                min="-1"
                @change="onUpdate()"
              ></b-form-input
            ></b-td>
            <b-td
              ><b-form-input
                number
                type="number"
                v-model="file.driverStintTimeSec"
                min="-1"
                @change="onUpdate()"
              ></b-form-input
            ></b-td>
            <b-td
              ><b-form-input
                number
                type="number"
                v-model="file.mandatoryPitstopCount"
                min="-1"
                @change="onUpdate()"
              ></b-form-input
            ></b-td>
            <b-td
              ><b-form-input
                number
                type="number"
                v-model="file.maxTotalDrivingTime"
                min="-1"
                @change="onUpdate()"
              ></b-form-input
            ></b-td>
            <b-td
              ><b-form-input
                number
                type="number"
                v-model="file.maxDriversCount"
                min="-1"
                @change="onUpdate()"
              ></b-form-input
            ></b-td>
          </b-tr>
          <b-tr>
            <b-th>Refuling allowed during Race</b-th>
            <b-th>Refuelling time fixed</b-th>
            <b-th>Refuelling Required for Mandatory Stop</b-th>
            <b-th>Tyre Change Required for Mandatory Stop</b-th>
            <b-th>Driver Swap Required for Mandatory Stop</b-th>
            <b-th>Tyres available</b-th>
          </b-tr>
          <b-tr>
            <b-td
              ><b-form-checkbox
                @change="onUpdate()"
                v-model="file.isRefuellingAllowedInRace"
                >{{file.isRefuellingAllowedInRace}}</b-form-checkbox
              ></b-td
            >
            <b-td
              ><b-form-checkbox
                @change="onUpdate()"
                v-model="file.isRefuellingTimeFixed"
                >{{file.isRefuellingTimeFixed}}</b-form-checkbox
              ></b-td
            >
            <b-td
              ><b-form-checkbox
                @change="onUpdate()"
                v-model="file.isMandatoryPitstopRefuellingRequired"
                >{{file.isMandatoryPitstopRefuellingRequired}}</b-form-checkbox
              ></b-td
            >
            <b-td
              ><b-form-checkbox
                @change="onUpdate()"
                v-model="file.isMandatoryPitstopTyreChangeRequired"
                ></b-form-checkbox
              >{{file.isMandatoryPitstopTyreChangeRequired}}</b-td
            >
            <b-td
              ><b-form-checkbox
                @change="onUpdate()"
                v-model="file.isMandatoryPitstopSwapDriverRequired"
                >{{file.isMandatoryPitstopSwapDriverRequired}}</b-form-checkbox
              ></b-td
            >
            <b-td
              ><b-form-input
                number
                type="number"
                v-model="file.tyreSetCount"
                max="50"
                min="1"
                @change="onUpdate()"
                ></b-form-input
              ></b-td
            >
          </b-tr>
          <b-tr> </b-tr>
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
        placeholder="Drag & Drop your eventRules.json or paste its contents here..."
      />
      <div class="d-flex flex-row justify-content-center mb-1">
        <b-button variant="secondary" @click="onNew">
          New eventRules.json
        </b-button>
      </div>
      <div
        v-if="!!this.file"
        class="d-flex flex-row justify-content-center mb-1"
      >
        <b-button variant="secondary" @click="downloadFile">
          Download eventRules.json
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
import sessionTypes from "../mixins/sessionTypes";

export default {
  name: "Bop",
  mixins: [ sessionTypes],
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
        qualifyStandingType: 1,
        pitWindowLengthSec: -1,
        driverStintTimeSec: -1,
        mandatoryPitstopCount: 0,
        maxTotalDrivingTime: -1,
        maxDriversCount: 1,
        isRefuellingAllowedInRace: true,
        isRefuellingTimeFixed: false,
        isMandatoryPitstopRefuellingRequired: false,
        isMandatoryPitstopTyreChangeRequired: false,
        isMandatoryPitstopSwapDriverRequired: false,
        tyreSetCount: 50,
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

