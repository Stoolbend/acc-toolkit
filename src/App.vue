<template>
  <div>
    <Header />
    <router-view/>
    <Footer />
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

import Footer from './components/Footer'
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Footer,
    Header
  }
}
</script>

<style>
body {
  background-color: #f8f9fa !important;
  padding-bottom: 32px;
}
</style>
<style scoped>
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
</style>