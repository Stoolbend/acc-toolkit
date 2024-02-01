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
import { type EventRules } from '@/lib/gameFiles';
import { ref } from 'vue';

const file = ref<EventRules>();
const defaultFile = {
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
</script>

<template>
  <main>
    <div class="container">
      <h3>Event Rules Editor</h3>
      <hr />
      <FilePicker file-name="eventRules.json" :default="defaultFile" />
    </div>
  </main>
</template>

<style scoped></style>