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

export function isNullOrWhitespace(input: string | null | undefined) {
  return !input || !input.trim()
}
export function getNextAvailableCarNumber(entries: any[]) {
  // Check if the entry list is set & has any entries to check
  // if it's not, then just return 1.
  if (!entries || !Array.isArray(entries)) return 1
  // Set flags for the number to check & number is free flag
  let number = 1
  let numberFree = false
  while (!numberFree) {
    let numberFound = false
    // Go through all entries in list to find a matching raceNumber
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].raceNumber === number) {
        // If found a matching number, increment the number we're checking and set the found flag
        number++
        numberFound = true
        break
      }
    }
    // After running the for loop (or breaking early), check if we found this number
    // If not then set the number free flag and exit the while loop
    if (!numberFound) {
      numberFree = true
    }
  }
  return number
}
export function randomString(length: number = 6) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}
