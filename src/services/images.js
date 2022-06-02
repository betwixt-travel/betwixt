const API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;

export async function fetchImages(city) {
  const data = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${city}&order_by=popular&client_id=${API_KEY}`
  );
  const resp = await data.json();
  return resp;
}
