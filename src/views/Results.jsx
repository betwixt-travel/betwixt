import MapItem from '../components/Map/MapItem';
import { useTravelContext } from '../context/TravelContext';

export default function Results() {
  const { loading } = useTravelContext();
  return <div>Results {loading ? <div>loading....</div> : <MapItem />}</div>;
}
