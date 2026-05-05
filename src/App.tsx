import { APIProvider, Circle, limitTiltRange, Map, Marker } from '@vis.gl/react-google-maps';
import './App.css';
import DeckGL from '@deck.gl/react';
import { DeckGlOverlay } from './DeckGLOverlay';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_PLACEHOLDER_KEY';

function App() {
  const defaultCenter = { lat: 41.865, lng: -87.64 };
  const INITIAL_VIEW_STATE = {
    latitude: 41.865,
    longitude: -87.64,
    zoom: 10,
  };

  return (
    <div className="map-container">

      <APIProvider apiKey={API_KEY}>
        {/* <DeckGL */}
        {/*   initialViewState={INITIAL_VIEW_STATE} */}
        {/*   controller={true} */}
        {/* > */}
        <Map
          style={{ width: '100vw', height: '100vh' }}
          defaultCenter={defaultCenter}
          defaultZoom={13}
          gestureHandling={'greedy'}
          disableDefaultUI={false}
        >
          <DeckGlOverlay layers={[]} />
          <Marker position={defaultCenter} />
          <Circle
            center={{ lat: 42, lng: -87.8 }}
            radius={10000}
            fillColor={'#0088ff'}
            fillOpacity={0.3}
            strokeColor={'#0088ff'}
            strokeWeight={2}
          />
        </Map>
        {/* </DeckGL> */}
      </APIProvider>
    </div >
  );
}

export default App;
// onViewStateChange={limitTiltRange({ INITIAL_VIEW_STATE })}>
