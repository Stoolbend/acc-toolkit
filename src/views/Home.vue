<template>
  <div>
    <div class="container">
      <h3>
        ACC Toolkit - Console Edition
      </h3>
      <p>
        Updated Car IDs to Match the Console version of ACC
      </p>

      <p>
        Updated BoP range of -40kg to +40kg
      </p>
    </div>
    <div class="row justify-content-center align-items-middle w-100">
      <div class="col-lg-3 col-md-6 col-12 d-flex flex-column align-items-center pb-3">
        <b-link :to="{ name: 'EntryList' }">
          <b-card 
            no-body 
            class="d-flex flex-column align-items-center p-3">
            <b-icon
              icon="person-lines-fill"
              font-scale="3" />
            <div>
              Entry List Editor
            </div>
            <div>
              <small>
                entrylist.json
              </small>
            </div>
          </b-card>
        </b-link>
      </div>
      <div class="col-lg-3 col-md-6 col-12 d-flex flex-column align-items-center pb-3">
        <b-link :to="{ name: 'Bop' }">
          <b-card 
            no-body 
            class="d-flex flex-column align-items-center p-3">
            <b-icon
              icon="percent"
              font-scale="3" />
            <div>
              BoP Editor
            </div>
            <div>
              <small>
                bop.json
              </small>
            </div>
          </b-card>
        </b-link>
      </div>
      <div class="col-lg-3 col-md-6 col-12 d-flex flex-column align-items-center pb-3">
        <b-link :to="{name: 'Event'}">
          <b-card 
            no-body 
            class="d-flex flex-column align-items-center p-3">
            <b-icon
              icon="calendar-week"
              font-scale="3" />
            <div>
              Event Editor
            </div>
            <div >
              <small>
                event.json
              </small>
            </div>
          </b-card>
        </b-link>
      </div>
      <div class="col-lg-3 col-md-6 col-12 d-flex flex-column align-items-center pb-3">
        <b-link :to="{name: 'Rules'}">
          <b-card 
            no-body 
            class="d-flex flex-column align-items-center p-3">
            <b-icon
              icon="cone-striped"
              font-scale="3" />
            <div>
              Event Rules Editor
            </div>
            <div >
              <small>
                eventRules.json
              </small>
            </div>
          </b-card>
        </b-link>
      </div>
      <div class="col-lg-3 col-md-6 col-12 d-flex flex-column align-items-center pb-3">
        <b-link :to="{name: 'Settings'}">
          <b-card 
            no-body 
            class="d-flex flex-column align-items-center p-3">
            <b-icon
              icon="gear"
              font-scale="3" />
            <div>
              Settings Editor
            </div>
            <div >
              <small>
                settings.json
              </small>
            </div>
          </b-card>
        </b-link>
      </div>
      <div class="col-lg-3 col-md-6 col-12 d-flex flex-column align-items-center pb-3">
        <div class="text-muted">
          <b-card 
            no-body 
            class="d-flex flex-column align-items-center p-3">
            <b-icon
              icon="person-lines-fill"
              font-scale="3" />
            <div>
              Custom Car Editor
            </div>
            <div class="text-danger">
              <small>
                Coming soon...
              </small>
            </div>
          </b-card>
        </div>
      </div>
    </div>
  </div>
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
