<script setup lang="ts">
/*
Copyright (C) 2022 Stefan Stawiarski
Copyright (C) 2024 Conor Morgan
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

import FilePicker from '@/components/FilePicker.vue'
import { SettingsCarGroup, SettingsFormationLapType } from '@/lib/gameData'
import { Settings } from '@/lib/gameFiles'
import { randomString } from '@/lib/utils'
import { computed } from 'vue'
import { ref } from 'vue'

const data = ref<Settings>()

const carGroupOptions = computed(() => {
  const results = []
  for (const [key, value] of Object.entries(SettingsCarGroup)) {
    results.push({ value: value, text: key })
  }
  return results
})
const formationLapOptions = computed(() => {
  const results = []
  for (const [key, value] of Object.entries(SettingsFormationLapType)) {
    results.push({ value: value, text: key })
  }
  return results
})

function generateAdminPassword() {
  if (!data.value) return
  data.value.adminPassword = randomString()
}
function generateDriverPassword() {
  if (!data.value) return
  data.value.password = randomString()
}
function generateSpectatorPassword() {
  if (!data.value) return
  data.value.spectatorPassword = randomString()
}
</script>

<template>
  <main>
    <div class="container">
      <h3>Settings Editor</h3>
      <div class="wiki-link">
        <a href="https://www.acc-wiki.info/wiki/Server_Configuration#settings.json" target="_blank"><i class="bi bi-info-circle-fill me-1" />View the wiki</a>
      </div>
      <b-form v-if="data" class="row">
        <div class="col-12 col-lg-6">
          <b-form-group class="mb-3" label="Server name" label-cols-md="3">
            <b-input-group>
              <b-form-input v-model="data.serverName" type="text" />
            </b-input-group>
          </b-form-group>
          <b-form-group class="mb-3" label="Admin password" label-cols-md="3">
            <b-input-group>
              <b-form-input v-model="data.adminPassword" type="text" class="font-mono" />
              <template #append>
                <b-button variant="secondary" @click="generateAdminPassword">Generate</b-button>
              </template>
            </b-input-group>
          </b-form-group>
          <b-form-group class="mb-3" label="Driver password" label-cols-md="3">
            <b-input-group>
              <b-form-input v-model="data.password" type="text" class="font-mono" />
              <template #append>
                <b-button variant="secondary" @click="generateDriverPassword">Generate</b-button>
              </template>
            </b-input-group>
          </b-form-group>
          <b-form-group class="mb-3" label="Spectator password" label-cols-md="3">
            <b-input-group>
              <b-form-input v-model="data.spectatorPassword" type="text" class="font-mono" />
              <template #append>
                <b-button variant="secondary" @click="generateSpectatorPassword">Generate</b-button>
              </template>
            </b-input-group>
          </b-form-group>
          <b-form-group class="mb-3" label="Car group" label-cols-md="3">
            <b-form-select v-model="data.carGroup" :options="carGroupOptions" />
          </b-form-group>
          <b-form-group class="mb-3" label="Track medals required" label-cols-md="3">
            <b-input-group>
              <b-form-input v-model="data.trackMedalsRequirement" type="number" min="0" max="3" step="1" />
              <template #append>
                <b-input-group-text>medals</b-input-group-text>
              </template>
            </b-input-group>
            <FormItemInfo> Amount of track medals required to be able to join the server. </FormItemInfo>
          </b-form-group>
          <b-form-group class="mb-3" label="Safety rating required" label-cols-md="3">
            <b-input-group>
              <b-form-input v-model="data.safetyRatingRequirement" type="number" min="-1" max="99" step="1" />
              <template #append>
                <b-input-group-text>SA</b-input-group-text>
              </template>
            </b-input-group>
            <FormItemInfo> Set to -1 to disable. </FormItemInfo>
          </b-form-group>
          <b-form-group class="mb-3" label="Racecraft rating required" label-cols-md="3">
            <b-input-group>
              <b-form-input v-model="data.racecraftRatingRequirement" type="number" min="-1" max="99" step="1" />
              <template #append>
                <b-input-group-text>RC</b-input-group-text>
              </template>
            </b-input-group>
            <FormItemInfo> Set to -1 to disable. </FormItemInfo>
          </b-form-group>
          <b-form-group class="mb-3" label="Max car slots" label-cols-md="3">
            <b-input-group>
              <b-form-input v-model="data.maxCarSlots" type="number" min="1" step="1" />
              <template #append>
                <b-input-group-text>cars</b-input-group-text>
              </template>
            </b-input-group>
          </b-form-group>
        </div>
        <div class="col-12 col-lg-6">
          <b-form-group class="mb-3" label="Auto DQ" label-cols-md="3">
            <b-form-checkbox v-model="data.allowAutoDQ" :value="1" :unchecked-value="0" />
            <FormItemInfo> If disabled, the game will instead issue SG30 penalties and it will be up to admins to DQ drivers. </FormItemInfo>
          </b-form-group>
          <b-form-group class="mb-3" label="Allow joining during race sessions" label-cols-md="3">
            <b-form-checkbox v-model="data.isRaceLocked" :value="1" :unchecked-value="0" />
          </b-form-group>
          <b-form-group class="mb-3" label="Short formation lap" label-cols-md="3">
            <b-form-checkbox v-model="data.shortFormationLap" :value="1" :unchecked-value="0" />
          </b-form-group>
          <b-form-group class="mb-3" label="Formation lap type" label-cols-md="3">
            <b-form-select v-model="data.formationLapType" :options="formationLapOptions" />
          </b-form-group>
          <b-form-group class="mb-3" label="Randomize track when empty" label-cols-md="3">
            <b-form-checkbox v-model="data.randomizeTrackWhenEmpty" :value="1" :unchecked-value="0" />
          </b-form-group>
          <b-form-group class="mb-3" label="Entry list path override" label-cols-md="3">
            <b-input-group>
              <b-form-input v-model="data.centralEntryListPath" type="text" />
            </b-input-group>
            <FormItemInfo>
              <div>Can be used to override the default entryList.json location.</div>
              <div class="text-danger">The path seperators have to be slashes ( / ), backslashes ( \ ) will not work.</div>
            </FormItemInfo>
          </b-form-group>
          <b-form-group class="mb-3" label="Ignore premature disconnects" label-cols-md="3">
            <b-form-checkbox v-model="data.ignorePrematureDisconnects" :value="1" :unchecked-value="0" />
          </b-form-group>
          <b-form-group class="mb-3" label="Dump entry list" label-cols-md="3">
            <b-form-checkbox v-model="data.dumpEntryList" :value="1" :unchecked-value="0" />
          </b-form-group>
          <b-form-group class="mb-3" label="Dump leaderboards" label-cols-md="3">
            <b-form-checkbox v-model="data.dumpLeaderboards" :value="1" :unchecked-value="0" />
          </b-form-group>
        </div>
      </b-form>
      <hr />
      <FilePicker v-model="data" file-name="settings" :default="new Settings()" />
    </div>
  </main>
</template>

<style scoped></style>
