<script setup lang="ts">
/*
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

import { RouterView } from 'vue-router'
import { useSettingsStore, Platform } from './stores/settings';
import { ref } from 'vue';
import { computed } from 'vue';

const settings = useSettingsStore();

// Platform selector
const selectedPlatform = ref(settings.platform);
const selectedPlatformClass = computed(() => {
  switch (selectedPlatform.value) {
    case Platform.Steam:
      return 'steam';
    case Platform.Xbox:
      return 'xbox';
    case Platform.PlayStation:
      return 'playstation';
  }
});
function onPlatformChanged(value: unknown) {
  settings.setPlatform(value as Platform);
}
</script>

<template>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand :to="{ name: 'home' }">ACC Tooklit</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="align-items-lg-center">
        <li class="nav-item">
          <b-form-select v-model="selectedPlatform" size="sm" :class="`platform-select ${selectedPlatformClass}`" @update:model-value="onPlatformChanged">
            <b-form-select-option :value="Platform.Steam" class="steam"><i class="bi bi-steam me-1" />Steam</b-form-select-option>
            <b-form-select-option :value="Platform.Xbox" class="xbox"><i class="bi bi-xbox me-1" />Xbox</b-form-select-option>
            <b-form-select-option :value="Platform.PlayStation" class="playstation"><i class="bi bi-playstation me-1" />PlayStation</b-form-select-option>
          </b-form-select>
        </li>
        <b-nav-item :to="{ name: 'entrylist' }">
          <div class="d-flex flex-row align-items-center">Entry List Editor</div>
        </b-nav-item>
        <b-nav-item :to="{ name: 'bop' }">
          <div class="d-flex flex-row align-items-center">BoP Editor</div>
        </b-nav-item>
        <b-nav-item :to="{ name: 'event' }">
          <div class="d-flex flex-row align-items-center">Event Editor</div>
        </b-nav-item>
        <b-nav-item :to="{ name: 'rules' }">
          <div class="d-flex flex-row align-items-center">Event Rules</div>
        </b-nav-item>
        <b-nav-item :to="{ name: 'settings' }">
          <div class="d-flex flex-row align-items-center">Settings Editor</div>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ms-auto">
        <b-nav-item href="https://github.com/Stoolbend/acc-toolkit" target="_blank">
          <div class="d-flex flex-row align-items-center">
            View on GitHub
            <i class="bi bi-github ms-2" />
          </div>
        </b-nav-item>
        <b-nav-item href="https://github.com/Stoolbend/acc-toolkit/issues" target="_blank">
          <div class="d-flex flex-row align-items-center">
            Report an issue
            <i class="bi bi-exclamation-circle-fill ms-2" />
          </div>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <RouterView />
  <footer class="bg-light">
    <a class="text-sm" href="https://github.com/Stoolbend/acc-toolkit/blob/master/LICENSE" target="_blank">
      License
    </a>
    <div class="d-flex flex-row align-items-center">
      Made with ❤ by
      <a class="mx-1" href="https://github.com/Stoolbend" target="_blank">
        Stoolbend
      </a>
      &amp;
      <a class="ms-1" href="https://github.com/Stoolbend/acc-toolkit/graphs/contributors" target="_blank">
        friends
      </a>
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0.5em 0.5em 0.5em;
}

footer:deep(a) {
  text-decoration: none;
  ;
}

.steam {
  background-color: #1b2838;
  color: white;
}

.xbox {
  background-color: #107c10;
  color: white;
}

.playstation {
  background-color: #003087;
  color: white;
}
</style>
