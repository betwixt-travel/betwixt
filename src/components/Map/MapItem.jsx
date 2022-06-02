import Map, { Source, Layer, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './Map.css';
import { useTravelContext } from '../../context/TravelContext';

let API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

export default function MapItem() {
  const { people, midpoint, cities } = useTravelContext();

  if (!midpoint.geometry) return <div>Loading...</div>;
  const [long, lat] = midpoint.geometry.coordinates;
  const geoJSON = {
    type: 'FeatureCollection',
    features: [...people],
  };

  const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': 5,
      'circle-color': '#FF0000',
    },
  };
  return (
    <div className={styles.map_container}>
      <Map
        className={styles.map}
        mapboxAccessToken={API_KEY}
        initialViewState={{
          latitude: lat,
          longitude: long,
          zoom: 7,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Source id="my-data" type="geojson" data={geoJSON}>
          <Layer {...layerStyle} />
        </Source>

        <Marker longitude={long} latitude={lat} anchor="center"></Marker>
        {cities.map((city) => (
          <Marker
            key={city.properties.distance}
            longitude={city.properties.longitude}
            latitude={city.properties.latitude}
            color="#DDDDDD"
            anchor="center"
          />
        ))}
      </Map>
    </div>
  );
}
