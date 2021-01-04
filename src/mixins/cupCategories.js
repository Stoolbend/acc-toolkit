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
      cupCategoryData: {
        0: {
          name: 'Overall',
          short: 'PRO',
          colors: {
            text: '#000',
            background: '#fff',
            border: '#000'
          }
        },
        1: {
          name: 'Pro-Am',
          short: 'PRO-AM',
          colors: {
            text: '#fff',
            background: '#000',
            border: '#fff'
          }
        },
        2: {
          name: 'Am',
          short: 'AM',
          colors: {
            text: '#fff',
            background: '#ff0000',
            border: '#fff'
          }
        },
        3: {
          name: 'Silver',
          short: 'SILVER',
          colors: {
            text: '#fff',
            background: '#aaaaaa',
            border: '#fff'
          }
        },
        4: {
          name: 'National',
          short: 'NAT.',
          colors: {
            text: '#fff',
            background: '#fff',
            border: '#fff'
          }
        }
      }
    }
  },
  computed: {
    cupCategorySelectOptions () {
      let options = []
      if (this.cupCategoryData) {
        for (let key in this.cupCategoryData) {
          options.push({
            value: parseInt(key),
            text: this.cupCategoryData[key].name
          })
        }
      }
      return options
    }
  }
}