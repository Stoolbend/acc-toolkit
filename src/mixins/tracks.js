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
        'barcelona_2019': {
          name: 'Circuit de Barcelona - Catalunya',
          year: 2019
        },
        'brands_hatch_2019': {
          name: 'Brands Hatch Circuit',
          year: 2019
        },
        'kyalami_2019': {
          name: 'Kyalami Grand Prix Circuit',
          year: 2019,
          dlc: 'Intercontinental GT Pack'
        },
        'laguna_seca_2019': {
          name: 'WeatherTech Raceway Laguna Seca',
          year: 2019,
          dlc: 'Intercontinental GT Pack'
        },
        'hungaroring_2019': {
          name: 'Hungaroring Circuit',
          year: 2019
        },
        'misano_2019': {
          name: 'Misano World Circuit',
          year: 2019
        },
        'monza_2019': {
          name: 'Autodromo Nazionale Monza',
          year: 2019
        },
        'mount_panorama_2019': {
          name: 'Bathurst Mount Panorama Circuit',
          year: 2019,
          dlc: 'Intercontinental GT Pack'
        },
        'nurburgring_2019': {
          name: 'Nurburgring',
          year: 2019
        },
        'paul_ricard_2019': {
          name: 'Circuit - Paul Ricard',
          year: 2019
        },
        'silverstone_2019': {
          name: 'Silverstone',
          year: 2019
        },
        'spa_2019': {
          name: 'Circuit de Spa-Francorchamps',
          year: 2019
        },
        'suzuka_2019': {
          name: 'Suzuka Circuit',
          year: 2019,
          dlc: 'Intercontinental GT Pack'
        },
        'zolder_2019': {
          name: 'Circuit Zolder',
          year: 2019
        },
        'zandvoort_2019': {
          name: 'Circuit Park Zandvoort',
          year: 2019
        },
        'barcelona_2020': {
          name: 'Circuit de Barcelona - Catalunya',
          year: 2020
        },
        'brands_hatch_2020': {
          name: 'Brands Hatch Circuit',
          year: 2020
        },
        'hungaroring_2020': {
          name: 'Hungaroring Circuit',
          year: 2020
        },
        'misano_2020': {
          name: 'Misano',
          year: 2020
        },
        'monza_2020': {
          name: 'Autodromo Nazionale Monza',
          year: 2020
        },
        'nurburgring_2020': {
          name: 'Nurburgring',
          year: 2020
        },
        'paul_ricard_2020': {
          name: 'Circuit - Paul Ricard',
          year: 2020
        },
        'silverstone_2020': {
          name: 'Silverstone',
          year: 2020
        },
        'spa_2020': {
          name: 'Circuit de Spa-Francorchamps',
          year: 2020
        },
        'zolder_2020': {
          name: 'Circuit Zolder',
          year: 2020
        },
        'zandvoort_2020': {
          name: 'Circuit Park Zandvoort',
          year: 2020
        },
        'imola_2020': {
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