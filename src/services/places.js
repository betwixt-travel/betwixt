import { client, parseData } from './client';

const GEODB_API_KEY = process.env.REACT_APP_GEODB_API_KEY;

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    'X-RapidAPI-Key': GEODB_API_KEY,
  },
};

export async function fetchPlaces({ lat, long, population, radius }) {
  const params = new URLSearchParams();
  params.set('minPopulation', population);
  params.set('radius', radius);
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

export const saveCity = async ({ creator_id, location, url }) => {
  const res = await client
    .from('trips')
    .insert({ creator_id, location, url })
    .single();
  return parseData(res);
};

export const getUserCities = async () => {
  const res = await client.from('trips').select();
  return parseData(res);
};

export const deleteUserCity = async (id) => {
  const res = await client.from('trips').delete().match({ id });
  return parseData(res);
};
