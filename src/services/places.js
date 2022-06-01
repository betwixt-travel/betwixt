const GEODB_API_KEY = process.env.REACT_APP_GEODB_API_KEY;

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    'X-RapidAPI-Key': GEODB_API_KEY,
  },
};

export async function fetchPlaces({ lat, long }) {
  const params = new URLSearchParams();
  params.set('minPopulation', '100000');
  params.set('radius', '500');
  params.set('types', 'CITY');
  const data = await fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${lat}${long}/nearbyCities?${params.toString()}`,
    options
  );
  const response = await data.json();
  return response.data;
}

export async function fetchCity({ lat, long }) {
  const params = new URLSearchParams();
  params.set('minPopulation', '100000');
  params.set('radius', '5');
  params.set('types', 'CITY');
  const data = await fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${lat}${long}/nearbyCities?${params.toString()}`,
    options
  );
  const response = await data.json();
  return response.data;
}
