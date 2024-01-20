<template>
  <b-navbar 
    toggleable="lg" 
    type="light" 
    variant="light">
    <b-navbar-brand :to="{ name: 'Home' }">
      ACC Tooklit
    </b-navbar-brand>
    
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'EntryList' }">
          <div class="d-flex flex-row align-items-center">
            Entry List Editor
          </div>
        </b-nav-item>
        <b-nav-item :to="{ name: 'Bop' }">
          <div class="d-flex flex-row align-items-center">
            BoP Editor
          </div>
        </b-nav-item> <b-nav-item :to="{ name: 'Event' }">
          <div class="d-flex flex-row align-items-center">
            Event Editor
          </div>
        </b-nav-item>
        <b-nav-item :to="{ name: 'Rules' }">
          <div class="d-flex flex-row align-items-center">
            Event Rules
          </div>
        </b-nav-item>
        <b-nav-item :to="{ name: 'Settings' }">
          <div class="d-flex flex-row align-items-center">
            Settings Editor
          </div>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item 
          href="https://github.com/kourousis/acc-toolkit/tree/xbox-version"
          target="_blank">
          <div class="d-flex flex-row align-items-center">
            View Console ACC Toolkit on GitHub
            <b-icon
              icon="github"
              class="ml-1"/>
          </div>
        </b-nav-item>
        <b-nav-item 
          href="https://github.com/Stoolbend/acc-toolkit"
          target="_blank">
          <div class="d-flex flex-row align-items-center">
            View Original ACC Toolkit on GitHub
            <b-icon
              icon="github"
              class="ml-1"/>
          </div>
        </b-nav-item>
        <b-nav-item 
          href="https://github.com/Stoolbend/acc-toolkit/issues"
          target="_blank">
          <div class="d-flex flex-row align-items-center">
            Report an issue
            <b-icon
              icon="exclamation-circle"
              class="ml-1"/>
          </div>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
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
</script>