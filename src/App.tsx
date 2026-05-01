import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import './App.css';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_PLACEHOLDER_KEY';

function App() {
  const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // San Francisco

  return (
    <div className="map-container">
      <APIProvider apiKey={API_KEY}>
        <Map
          style={{ width: '100vw', height: '100vh' }}
          defaultCenter={defaultCenter}
          defaultZoom={13}
          gestureHandling={'greedy'}
          disableDefaultUI={false}
        >
          <Marker position={defaultCenter} />
        </Map>
      </APIProvider>
    </div>
  );
}

export default App;
