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
      <b-form v-if="data">
        <b-form-group
          label="Qualifying type">
          <b-form-select v-model="data.qualifyStandingType">
            <b-form-select-option :value="1">Fastest lap</b-form-select-option>
            <b-form-select-option :value="2">Average lap <strong>(Not supported)</strong></b-form-select-option>
          </b-form-select>
        </b-form-group>
      </b-form>
      <hr />
      <FilePicker v-model="data" file-name="eventRules" :default="new EventRules()" />
    </div>
  </main>
</template>

<style scoped></style>