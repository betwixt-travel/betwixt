import Map, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl';
import styles from 'Map.css';

export default function Map() {
  return (
    <Map
      initialViewState={{
        longitude: -84.5,
        latitude: 38.05,
        zoom: 14,
      }}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    ></Map>
  );
}
