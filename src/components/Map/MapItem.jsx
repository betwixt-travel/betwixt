import Map, { Source, Layer, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './Map.css';
import { useTravelContext } from '../../context/TravelContext';

let API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

export default function MapItem() {
  const { people } = useTravelContext();

  const geoJSON = { type: 'FeatureCollection', features: people };

  const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#007cbf',
    },
  };
  return (
    <div className={styles.sidebarStyle}>
      <Map
        mapboxAccessToken={API_KEY}
        initialViewState={{
          latitude: 45.5,
          longitude: -122.6,
          zoom: 7,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Source id="my-data" type="geojson" data={geoJSON}>
          <Layer {...layerStyle} />
        </Source>
        <Marker longitude={-100} latitude={40} anchor="bottom"></Marker>
      </Map>
    </div>
  );
}
