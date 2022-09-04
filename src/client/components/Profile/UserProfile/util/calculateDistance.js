const {acos, cos, sin} = Math

export default function (coord1, coord2, unit = 'miles') {
  let {latitude: lat1, longitude: lon1} = coord1
  let {latitude: lat2, longitude: lon2} = coord2

  //convert coordinates to radians
  lat1 = (+lat1 * Math.PI) / 180
  lon1 = (+lon1 * Math.PI) / 180
  lat2 = (+lat2 * Math.PI) / 180
  lon2 = (+lon2 * Math.PI) / 180

  // distance of two points on a sphere
  // d = arccos[(sin(x1) * sin(x2)) + cos(x1) * cos(x2) * cos(y2 - y1)]
  let convert =
    //earth radius in:
    unit === 'miles' ? /*mi*/ 3963 : /*km*/ 6371

  return Math.floor(
    convert *
      acos(sin(lat1) * sin(lat2) + cos(lat1) * cos(lat2) * cos(lon2 - lon1))
  )
}
