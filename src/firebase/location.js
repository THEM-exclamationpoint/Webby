export const zipToCoordinates = async (zip, country) => {
  let params =
    `postcode=${zip}` +
    '&country=' +
    country.split(/[^\w]+/gm).join('%20') +
    '&format=json' +
    '&apiKey=ed77720171db4c25b8ba86ddbce978f6'
  let options = {method: 'GET'}
  let res = await fetch(`https://api.geoapify.com/v1/geocode/search?${params}`)
  let response = await res.json()
  let results = [...response.results]
  return {
    latitude: results[0].lat,
    longitude: results[0].lon,
  }
}
