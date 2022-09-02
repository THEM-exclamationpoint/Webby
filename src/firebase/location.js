export const zipToCoordinates = async (zip, country) => {
  let params = `${zip}%20` + country.split(/[^\w]+/gm).join('%20')
  let options = {method: 'GET'}
  let res = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${params}&apiKey=56203f2d7a7b4c47abb59779b92c8c5c`
  )
  let {features} = res
  let correct = features.find(
    (item) => item.properties.country.toLowerCase() == country.toLowerCase()
  )
  if (!correct && features.length) {
    correct = features[0]
  }

  if (!correct) return
  return {
    latitude: correct.properties.lat,
    longitude: correct.properties.lon,
  }
}
