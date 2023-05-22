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
  data() {
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
        'cota': {
          name: 'Circuit of the Americas',
          year: 2022,
          dlc: 'American Track Pack'
        },
        'donington': {
          name: 'Donington Park',
          year: 2019,
          dlc: 'British GT Pack'
        },
        'hungaroring': {
          name: 'Hungaroring Circuit',
          year: 2018
        },
        'imola': {
          name: 'Autodromo Enzo e Dino Ferrari - Imola',
          year: 2020,
          dlc: '2020 GT World Challenge Pack'
        },
        'indianapolis': {
          name: 'Indianapolis Motor Speedway',
          year: 2022,
          dlc: 'American Track Pack'
        },
        'kyalami': {
          name: 'Kyalami Grand Prix Circuit',
          year: 2019,
          dlc: 'Intercontinental GT Pack'
        },
        'laguna_seca': {
          name: 'WeatherTech Raceway Laguna Seca',
          year: 2019,
          dlc: 'Intercontinental GT Pack'
        },
        'misano': {
          name: 'Misano',
          year: 2018
        },
        'monza': {
          name: 'Autodromo Nazionale Monza',
          year: 2018
        },
        'mount_panorama': {
          name: 'Bathurst Mount Panorama Circuit',
          year: 2019,
          dlc: 'Intercontinental GT Pack'
        },
        'nurburgring': {
          name: 'Nurburgring',
          year: 2018
        },
        'oulton_park': {
          name: 'Oulton Park',
          year: 2019,
          dlc: 'British GT Pack'
        },
        'paul_ricard': {
          name: 'Circuit - Paul Ricard',
          year: 2018
        },
        'silverstone': {
          name: 'Silverstone',
          year: 2018
        },
        'snetterton': {
          name: 'Snetterton Circuit',
          year: 2019,
          dlc: 'British GT Pack'
        },
        'spa': {
          name: 'Circuit de Spa-Francorchamps',
          year: 2018
        },
        'suzuka': {
          name: 'Suzuka Circuit',
          year: 2019,
          dlc: 'Intercontinental GT Pack'
        },
        'valencia': {
          name: 'Valencia - Circuit Ricardo Tormo',
          year: 2023,
          dlc: 'GT World Challenge 2023 Pack'
        },
        'watkins_glen': {
          name: 'Watkins Glen',
          year: 2022,
          dlc: 'American Track Pack'
        },
        'zandvoort': {
          name: 'Circuit Park Zandvoort',
          year: 2018
        },
        'zolder': {
          name: 'Circuit Zolder',
          year: 2018
        }
      }
    }
  },
  computed: {
    trackSelectOptions() {
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