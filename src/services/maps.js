const API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

export async function fetchCoordinates({ location }) {
  const data = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?country=us&limit=1&types=postcode&access_token=${API_KEY}`
  );
  const resp = await data.json();
  return resp.features[0];
}
