export async function convertCityCoords() {
  try {
    return fetch('https://extreme-ip-lookup.com/json/')
      .then( res => res.json())
      .then(response => {
        return fetch('https://maps.google.com/maps/api/geocode/json?sensor=false&address=' + response.city + '&key=AIzaSyDMYrZZhMGlK5PKOMQRQMVffXnUJwgyatY')
          .then(response => response.json())
          .then(result => {
            return result.results[0].geometry.location
          })
          .catch((_error: any) => {
          })

      })
      .catch((e) => {
        console.log('Request failed', e);
      })
  } catch (err) {
    throw new Error(err.message);
  }
}

