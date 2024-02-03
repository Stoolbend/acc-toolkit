<script setup lang="ts">
/*
Copyright (C) 2022 Stefan Stawiarski
Copyright (C) 2023 Conor Morgan
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

import FilePicker from '@/components/FilePicker.vue';
import { EventRules } from '@/lib/gameFiles';
import { ref } from 'vue';

const data = ref<EventRules>();
</script>

<template>
  <main>
    <div class="container">
      <h3>Event Rules Editor</h3>
      <div class="wiki-link">
        <a href="https://www.acc-wiki.info/wiki/Server_Configuration#eventRules.json" target="_blank"><i class="bi bi-info-circle-fill me-1" />View the wiki</a>
      </div>
      <b-form v-if="data" class="row">
        <div class="col-12 col-lg-6">
          <b-form-group
            class="mb-3"
            label="Qualifying type"
            label-cols-md="3">
            <b-form-select v-model="data.qualifyStandingType">
              <b-form-select-option :value="1">Fastest lap</b-form-select-option>
              <b-form-select-option :value="2">Average lap <strong>(Not supported)</strong></b-form-select-option>
            </b-form-select>
          </b-form-group>
          <b-form-group
            class="mb-3"
            label="Pit window length"
            label-cols-md="3">
            <b-input-group>
              <b-form-input v-model="data.pitWindowLengthSec" type="number" min="-1" step="1" />
              <template #append>
                <b-input-group-text>seconds</b-input-group-text>
              </template>
            </b-input-group>
            <FormItemInfo>
              Set to -1 to disable pit window.
            </FormItemInfo>
          </b-form-group>
          <b-form-group
            class="mb-3"
            label="Tyre sets"
            label-cols-md="3">
            <b-input-group>
              <b-form-input v-model="data.tyreSetCount" type="number" min="1" max="50" step="1" />
              <template #append>
                <b-input-group-text>sets</b-input-group-text>
              </template>
            </b-input-group>
          </b-form-group>
          <b-form-group
            class="mb-3"
            label="Driver stint time"
            label-cols-md="3">
            <b-input-group>
              <b-form-input v-model="data.driverStintTimeSec" type="number" min="-1" step="1" />
              <template #append>
                <b-input-group-text>seconds</b-input-group-text>
              </template>
            </b-input-group>
            <FormItemInfo>
              Set to -1 to disable stint times.
            </FormItemInfo>
          </b-form-group>
          <b-form-group
            class="mb-3"
            label="Max total driving time"
            label-cols-md="3">
            <b-input-group>
              <b-form-input v-model="data.maxTotalDrivingTime" type="number" min="-1" step="1" />
              <template #append>
                <b-input-group-text>seconds</b-input-group-text>
              </template>
            </b-input-group>
            <FormItemInfo>
              Set to -1 to disable driver time restrictions.
            </FormItemInfo>
          </b-form-group>
          <b-form-group
            class="mb-3"
            label="Max drivers"
            label-cols-md="3">
            <b-input-group>
              <b-form-input v-model="data.maxDriversCount" type="number" min="-1" step="1" />
              <template #append>
                <b-input-group-text>drivers</b-input-group-text>
              </template>
            </b-input-group>
          </b-form-group>
          <b-form-group
            class="mb-3"
            label="Refuelling allowed"
            label-cols-md="3">
            <b-form-checkbox v-model="data.isRefuellingAllowedInRace" />
          </b-form-group>
          <b-form-group
            class="mb-3"
            label="Refuelling time fixed"
            label-cols-md="3">
            <b-form-checkbox v-model="data.isRefuellingTimeFixed" />
            <FormItemInfo>
              If enabled, all refuelling will take the same time (25 seconds). Otherwise refulling time will depend on the amount of fuel to be added.
            </FormItemInfo>
          </b-form-group>
        </div>
        <div class="col-12 col-lg-6">
          <b-form-group
            class="mb-3"
            label="Mandatory pit stop count"
            label-cols-md="3">
            <b-input-group>
              <b-form-input v-model="data.mandatoryPitstopCount" type="number" min="-1" step="1" />
              <template #append>
                <b-input-group-text>stops</b-input-group-text>
              </template>
            </b-input-group>
          </b-form-group>
          <b-form-group
            class="mb-3"
            label="Refuelling required"
            label-cols-md="3">
            <b-form-checkbox v-model="data.isMandatoryPitstopRefuellingRequired" />
            <FormItemInfo>
              If enabled,you must take at least 1L of fuel every stop. Otherwise fuel can be taken as needed.
            </FormItemInfo>
          </b-form-group>
          <b-form-group
            class="mb-3"
            label="Tyre change required"
            label-cols-md="3">
            <b-form-checkbox v-model="data.isMandatoryPitstopTyreChangeRequired" />
            <FormItemInfo>
              If enabled, you must change tyres every stop. Otherwise tyres can be changed as needed.
            </FormItemInfo>
          </b-form-group>
          <b-form-group
            class="mb-3"
            label="Driver swap required"
            label-cols-md="3">
            <b-form-checkbox v-model="data.isMandatoryPitstopSwapDriverRequired" />
            <FormItemInfo>
              If enabled, you must swap drivers every stop. Otherwise tyres can be changed as needed.
            </FormItemInfo>
          </b-form-group>
        </div>
      </b-form>
      <hr />
      <FilePicker v-model="data" file-name="eventRules" :default="new EventRules()" />
    </div>
  </main>
</template>

<style scoped></style>