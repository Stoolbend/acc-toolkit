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
