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
      trackData: {
        'barcelona': {
          name: 'Circuit de Barcelona - Catalunya',
          year: 2018
        },
        'brands_hatch': {
          name: 'Brands Hatch Circuit',
          year: 2018
        },
        'hungaroring': {
          name: 'Hungaroring Circuit',
          year: 2018
        },
        'misano': {
          name: 'Misano',
          year: 2018
        },
        'monza': {
          name: 'Autodromo Nazionale Monza',
          year: 2018
        },
        'nurburgring': {
          name: 'Nurburgring',
          year: 2018
        },
        'paul_ricard': {
          name: 'Circuit - Paul Ricard',
          year: 2018
        },
        'silverstone': {
          name: 'Silverstone',
          year: 2018
        },
        'spa': {
          name: 'Circuit de Spa-Francorchamps',
          year: 2018
        },
        'zolder': {
          name: 'Circuit Zolder',
          year: 2018
        },
        'zandvoort': {
          name: 'Circuit Park Zandvoort',
          year: 2018
        },
        'donington': {
          name: 'Donington Park',
          year: 2019,
          dlc: 'British GT Pack'
        },
        'kyalami': {
          name: 'Kyalami Grand Prix Circuit',
          year: 2019,
          dlc: 'Intercontinental GT Pack'
        },
        'laguna': {
          name: 'WeatherTech Raceway Laguna Seca',
          year: 2019,
          dlc: 'Intercontinental GT Pack'
        },
        'mount_panorama': {
          name: 'Bathurst Mount Panorama Circuit',
          year: 2019,
          dlc: 'Intercontinental GT Pack'
        },
        'oulton_park': {
          name: 'Oulton Park',
          year: 2019,
          dlc: 'British GT Pack'
        },
        'snetterton': {
          name: 'Snetterton Circuit',
          year: 2019,
          dlc: 'British GT Pack'
        },
        'suzuka': {
          name: 'Suzuka Circuit',
          year: 2019,
          dlc: 'Intercontinental GT Pack'
        },
        'imola': {
          name: 'Autodromo Enzo e Dino Ferrari - Imola',
          year: 2020,
          dlc: '2020 GT World Challenge Pack'
        }
      }
    }
  },
  computed: {
    trackSelectOptions () {
      let options = []
      if (this.trackData) {
        for (let key in this.trackData) {
          options.push({
            value: key,
            text: this.trackData[key].name + ' (' + this.trackData[key].year + ')'
          })
        }
      }
      return options
    }
  }
}