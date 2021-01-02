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

export default {
  data () {
    return {
      driverCategoryData: {
        0: {
          name: 'Bronze'
        },
        1: {
          name: 'Silver'
        },
        2: {
          name: 'Gold'
        },
        3: {
          name: 'Platinum'
        },
      }
    }
  },
  computed: {
    driverCategorySelectOptions () {
      let options = []
      if (this.driverCategoryData) {
        for (let key in this.driverCategoryData) {
          options.push({
            value: parseInt(key),
            text: this.driverCategoryData[key].name
          })
        }
      }
      return options
    }
  }
}