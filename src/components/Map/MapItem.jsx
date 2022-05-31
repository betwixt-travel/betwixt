import Map, { Source, Layer, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './Map.css';
import { useTravelContext } from '../../context/TravelContext';

let API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

export default function MapItem() {
  const { people, midpoint, cities } = useTravelContext();

  if (!midpoint.geometry) return <div>loading</div>;
  const [long, lat] = midpoint.geometry.coordinates;
  const geoJSON = {
    type: 'FeatureCollection',
    features: [...people, ...cities],
  };
  console.log('geoJSON', geoJSON);
  // const geoJSONCities = { type: 'FeatureCollection', features: cities };
  // console.log('geoJSONCities', geoJSONCities);
  console.log('midpoint', midpoint);
  const midpt = {
    type: 'FeatureCollection',
    features: [midpoint],
  }; /*don't use this currently*/
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
          latitude: lat,
          longitude: long,
          zoom: 7 /*TODO: Make this auto zoomed*/,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Source id="my-data" type="geojson" data={geoJSON}>
          <Layer {...layerStyle} />
        </Source>
        {/* <Source id="my-data2" type="geojson" data={geoJSONCities}>
          <Layer {...layerStyle} />
        </Source> */}
        {/* <Source id="my-data" type="geojson" data={midpt}>
          <Layer {...layerStyle} />
        </Source> */}
        <Marker longitude={long} latitude={lat} anchor="bottom"></Marker>
      </Map>
    </div>
  );
}
