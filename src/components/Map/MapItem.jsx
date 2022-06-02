import Map, { Source, Layer, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './Map.css';
import { useTravelContext } from '../../context/TravelContext';
import geoViewport from '@mapbox/geo-viewport';
import markerImg from '../../assets/images/marker-png.png';

let API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

export default function MapItem() {
  const { people, midpoint, cities, bounds } = useTravelContext();

  const dynamicZoom = geoViewport.viewport(bounds, [600, 400]);
  let zoom;
  if (dynamicZoom.zoom > 2) {
    zoom = dynamicZoom.zoom - 2;
  } else zoom = dynamicZoom;

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
          latitude: dynamicZoom.center[1],
          longitude: dynamicZoom.center[0],
          zoom: zoom,
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
            color="#9C9A9C"
            anchor="center"
          />
        ))}
      </Map>
      <div className={styles.legend}>
        <div className={styles.legendOption}>
          <p>Starting Location:</p>{' '}
          <div
            style={{
              backgroundColor: '#FF0000',
              height: '7.5px',
              width: '7.5px',
              borderRadius: '50%',
            }}
          ></div>
        </div>
        <div className={styles.legendOption}>
          <p>Midpoint:</p> <img src={markerImg} />
        </div>
        <div className={styles.legendOption}>
          <p>Potential Destination:</p>
          <img style={{ filter: 'grayscale(100%)' }} src={markerImg} />
        </div>
      </div>
    </div>
  );
}
