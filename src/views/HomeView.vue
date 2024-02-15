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
</script>

<template>
  <main>
    <div class="container">
      <h3>Welcome to ACC Toolkit</h3>
      <p>Here are some useful tools to assist with preparing config files for Assetto Corsa Competizione servers.</p>
      <p>
        If you have any issues or suggestions, then please let me know using the
        <b>Report an issue</b> button in the menu above.
      </p>
      <div class="links">
        <router-link class="link-item card" :to="{ name: 'entrylist' }">
          <i class="bi bi-clipboard-fill" />
          <div>Entry List Editor</div>
          <div>
            <small> entrylist.json </small>
          </div>
        </router-link>
        <router-link class="link-item card" :to="{ name: 'bop' }">
          <i class="bi bi-toggles" />
          <div>BoP Editor</div>
          <div>
            <small> bop.json </small>
          </div>
        </router-link>
        <router-link class="link-item card" :to="{ name: 'event' }" disabled>
          <i class="bi bi-calendar-event-fill" />
          <div>Event Editor</div>
          <div>
            <small> event.json </small>
          </div>
        </router-link>
        <router-link class="link-item card" :to="{ name: 'rules' }">
          <i class="bi bi-cone-striped" />
          <div>Event Rules Editor</div>
          <div>
            <small> eventRules.json </small>
          </div>
        </router-link>
        <router-link class="link-item card" :to="{ name: 'settings' }">
          <i class="bi bi-gear-fill" />
          <div>Settings Editor</div>
          <div>
            <small> settings.json </small>
          </div>
        </router-link>
        <router-link class="link-item card" :to="{ name: 'drivers' }">
          <i class="bi bi-person-arms-up" />
          <div>Saved Drivers</div>
          <div>&nbsp;</div>
        </router-link>
        <div class="link-item card text-muted">
          <i class="bi bi-car-front-fill" />
          <div>Custom Car Editor</div>
          <div class="text-danger">
            <small> Coming soon... </small>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.links {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 2em;

  margin-top: 3em;
}

.link-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  text-decoration: none;

  min-width: 140px;
}

a.link-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.bi {
  font-size: 2em;
}
</style>
