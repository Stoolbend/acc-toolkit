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
      carData: {
        '-1': {
          name: 'No forced car',
          year: 0,
          class: null
        },
        0: {
          name: 'Porsche 991 GT3 R',
          year: 2018,
          class: 'gt3'
        },
        1: {
          name: 'Mercedes-AMG GT3',
          year: 2015,
          class: 'gt3'
        },
        2: {
          name: 'Ferrari 488 GT3',
          year: 2018,
          class: 'gt3'
        },
        3: {
          name: 'Audi R8 LMS',
          year: 2015,
          class: 'gt3'
        },
        4: {
          name: 'Lamborghini Huracán GT3',
          year: 2015,
          class: 'gt3'
        },
        5: {
          name: 'McLaren 650S GT3',
          year: 2015,
          class: 'gt3'
        },
        6: {
          name: 'Nissan GT-R Nismo GT3',
          year: 2018,
          class: 'gt3'
        },
        7: {
          name: 'BMW M6 GT3',
          year: 2017,
          class: 'gt3'
        },
        8: {
          name: 'Bentley Continental GT3',
          year: 2018,
          class: 'gt3'
        },
        9: {
          name: 'Porsche 991 II GT3 Cup',
          year: 2017,
          class: 'gtc'
        },
        10: {
          name: 'Nissan GT-R Nismo GT3',
          year: 2015,
          class: 'gt3'
        },
        11: {
          name: 'Bentley Continental GT3',
          year: 2015,
          class: 'gt3'
        },
        12: {
          name: 'AMR V12 Vantage GT3',
          year: 2013,
          class: 'gt3'
        },
        13: {
          name: 'Reiter Engineering R-EX GT3',
          year: 2017,
          class: 'gt3'
        },
        14: {
          name: 'Emil Frey Jaguar G3',
          year: 2012,
          class: 'gt3'
        },
        15: {
          name: 'Lexus RC F GT3',
          year: 2016,
          class: 'gt3'
        },
        16: {
          name: 'Lamborghini Huracán GT3 Evo',
          year: 2019,
          class: 'gt3'
        },
        17: {
          name: 'Honda NSX GT3',
          year: 2017,
          class: 'gt3'
        },
        18: {
          name: 'Lamborghini Huracán SuperTrofeo',
          year: 2015,
          class: 'gtc'
        },
        19: {
          name: 'Audi R8 LMS Evo',
          year: 2019,
          class: 'gt3'
        },
        20: {
          name: 'AMR V8 Vantage',
          year: 2019,
          class: 'gt3'
        },
        21: {
          name: 'Honda NSX GT3 Evo',
          year: 2019,
          class: 'gt3'
        },
        22: {
          name: 'McLaren 720S GT3',
          year: 2019,
          class: 'gt3'
        },
        23: {
          name: 'Porsche 911 II GT3 R',
          year: 2019,
          class: 'gt3'
        },
        24: {
          name: 'Ferrari 488 GT3 Evo',
          year: 2020,
          class: 'gt3',
          dlc: '2020 GT World Challenge Pack'
        },
        25: {
          name: 'Mercedes-AMG GT3',
          year: 2020,
          class: 'gt3',
          dlc: '2020 GT World Challenge Pack'
        },
        26: {
          name: 'BMW M4 GT3',
          year: 2022,
          class: 'gt3'
        },
        27: {
          name: 'Porsche 992 GT3 Cup',
          year: 2022,
          class: 'gtc',
          dlc: 'Challengers Pack'
        },
        28: {
          name: 'BMW M2 Club Sport Racing',
          year: 2022,
          class: 'tcx',
          dlc: 'Challengers Pack'
        },
        29: {
          name: 'Lamborghini Huracán SuperTrofeo EVO2',
          year: 2022,
          class: 'gtc',
          dlc: 'Challengers Pack'
        },
        30: {
          name: 'Ferrari 488 Challenge Evo',
          year: 2022,
          class: 'gtc',
          dlc: 'Challengers Pack'
        },
        31: {
          name: 'Audi R8 LMS GT3 Evo 2',
          year: 2022,
          class: 'gt3',
          dlc: 'Challengers Pack'
        },
        32: {
          name: 'Ferrari 296 GT3',
          year: 2023,
          class: 'gt3',
          dlc: 'GT World Challenge 2023 Pack'
        },
        33: {
          name: 'Lamborghini Huracan GT3 Evo 2',
          year: 2023,
          class: 'gt3',
          dlc: 'GT World Challenge 2023 Pack'
        },
        34: {
          name: 'Porsche 992 GT3 R',
          year: 2023,
          class: 'gt3',
          dlc: 'GT World Challenge 2023 Pack'
        },
        35: {
          name: 'McLaren 720S GT3 Evo',
          year: 2023,
          class: 'gt3',
        },
        50: {
          name: 'Alpine A110 GT4',
          year: 2018,
          class: 'gt4',
          dlc: 'GT4 Pack'
        },
        51: {
          name: 'Aston Martin Vantage GT4',
          year: 2018,
          class: 'gt4',
          dlc: 'GT4 Pack'
        },
        52: {
          name: 'Audi R8 LMS GT4',
          year: 2018,
          class: 'gt4',
          dlc: 'GT4 Pack'
        },
        53: {
          name: 'BMW M4 GT4',
          year: 2018,
          class: 'gt4',
          dlc: 'GT4 Pack'
        },
        55: {
          name: 'Chevrolet Camaro GT4',
          year: 2017,
          class: 'gt4',
          dlc: 'GT4 Pack'
        },
        56: {
          name: 'Ginetta G55 GT4',
          year: 2012,
          class: 'gt4',
          dlc: 'GT4 Pack'
        },
        57: {
          name: 'KTM X-Bow GT4',
          year: 2016,
          class: 'gt4',
          dlc: 'GT4 Pack'
        },
        58: {
          name: 'Maserati MC GT4',
          year: 2016,
          class: 'gt4',
          dlc: 'GT4 Pack'
        },
        59: {
          name: 'McLaren 570S GT4',
          year: 2016,
          class: 'gt4',
          dlc: 'GT4 Pack'
        },
        60: {
          name: 'Mercedes AMG GT4',
          year: 2016,
          class: 'gt4',
          dlc: 'GT4 Pack'
        },
        61: {
          name: 'Porsche 718 Cayman GT4 Clubsport',
          year: 2019,
          class: 'gt4',
          dlc: 'GT4 Pack'
        }
      },
      carSelectSettings: {
        showNoCar: false
      }
    }
  },
  computed: {
    carSelectOptions() {
      //TODO implement a filter for cup class
      let options = []
      if (this.carData) {
        for (let key in this.carData) {
          if (!this.carSelectSettings.showNoCar && key === '-1')
            continue
          if (!this.carData[key].class) {
            options.push({
              value: parseInt(key),
              text: this.carData[key].name
            })
          } else {
            options.push({
              value: parseInt(key),
              text: this.carData[key].name + ' (' + this.carData[key].year + ')[' + this.carData[key].class + ']'
            })
          }
        }
      }
      return options
    }
  }
}
