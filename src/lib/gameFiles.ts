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

import { DriverCategory, SettingsCarGroup, SettingsFormationLapType } from './gameData'
import { randomString } from './utils'

//#region eventRules.json
export class EventRules {
  qualifyStandingType: number = 1
  pitWindowLengthSec: number = -1
  driverStintTimeSec: number = -1
  mandatoryPitstopCount: number = 0
  maxTotalDrivingTime: number = -1
  maxDriversCount: number = 1
  isRefuellingAllowedInRace: boolean = true
  isRefuellingTimeFixed: boolean = false
  isMandatoryPitstopRefuellingRequired: boolean = false
  isMandatoryPitstopTyreChangeRequired: boolean = false
  isMandatoryPitstopSwapDriverRequired: boolean = false
  tyreSetCount: number = 50
}
//#endregion

//#region settings.json
export class Settings {
  serverName: string = 'My race server'
  adminPassword: string = 'letmeadmin'
  password: string = ''
  spectatorPassword: string = ''
  carGroup: string = SettingsCarGroup.FreeForAll
  trackMedalsRequirement: number = 3
  safetyRatingRequirement: number = 49
  racecraftRatingRequirement: number = -1
  maxCarSlots: number = 30
  allowAutoDQ: 0 | 1 = 1
  isRaceLocked: 0 | 1 = 0
  shortFormationLap: 0 | 1 = 0
  formationLapType: number = SettingsFormationLapType.Default
  randomizeTrackWhenEmpty: 0 | 1 = 0
  centralEntryListPath: string = ''
  ignorePrematureDisconnects: 0 | 1 = 1
  dumpEntryList: 0 | 1 = 0
  dumpLeaderboards: 0 | 1 = 0
}
//#endregion

//#region entryList.json
export class EntryList {
  entries: EntryListEntry[] = []
  forceEntryList: 0 | 1 = 0
}
export class EntryListEntry {
  drivers: EntryListDriver[] = []
  raceNumber: number = 0
  forcedCarModel: number = -1
  overrideDriverInfo: number = 0
  isServerAdmin: number = 0
  defaultGridPosition?: number
  ballastKg?: number
  restrictor?: number
  customCar?: string
  overrideCarModelForCustomCar?: number
}
export class EntryListDriver {
  playerID: string = ''
  firstName?: string
  lastName?: string
  shortName?: string
  driverCategory?: number
}
//#endregion
