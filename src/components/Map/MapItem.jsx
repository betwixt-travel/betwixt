import Map, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl';
import styles from './Map.css';
import { useTravelContext } from '../../context/TravelContext';
import { useEffect } from 'react';

let API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

export default function MapItem() {
  const { people, peopleToGeoJSON } = useTravelContext();

  useEffect(() => {
    console.log('people', people);
    const geoJSON = peopleToGeoJSON(people);
    console.log('geoJSON', geoJSON);

    const layerStyle = {
      id: 'point',
      type: 'circle',
      paint: {
        'circle-radius': 10,
        'circle-color': '#007cbf',
      },
    };
  }, []);

  return (
    <div className={styles.sidebarStyle}>
      <Map
        mapboxAccessToken={API_KEY}
        initialViewState={{
          longitude: -84.5,
          latitude: 38.05,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Source id="people" type="geojson" data={geoJSON}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </div>
  );
}
