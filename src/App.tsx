import { AdvancedMarker, APIProvider, Circle, ControlPosition, InfoWindow, Map, MapControl, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import './App.css';
import { DeckGlOverlay } from './DeckGLOverlay';
import { layers } from './layers';
import { useCallback, useState } from 'react';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  // const defaultCenter = { lat: 41.865, lng: -87.64 }; //chicago
  const defaultCenter = { lat: 37.7, lng: -122.4 };

  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const handleMarkerClick = useCallback(() => setInfoWindowShown(isShown => !isShown), []);
  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  return (
    <div className="map-container">

      <APIProvider apiKey={API_KEY} version='beta'>
        <Map
          style={{ width: '100vw', height: '100vh' }}
          defaultCenter={defaultCenter}
          defaultZoom={4}
          gestureHandling={'greedy'}
          disableDefaultUI={false}
          mapId={'4f6dde3310be51d7'}
        >
          <DeckGlOverlay layers={[layers()]} />
          <MapControl position={ControlPosition.LEFT_CENTER}>
            .. any component here will be added to the control-containers of the
            google map instance ..
          </MapControl>
          {infoWindowShown &&
            <InfoWindow anchor={marker} style={{ color: "black" }} onClose={handleClose}>
              <p>The content of the info window is here</p>
            </InfoWindow>
          }
          <AdvancedMarker position={defaultCenter} ref={markerRef} onClick={handleMarkerClick} />
          <Circle
            center={{ lat: 42, lng: -87.8 }}
            radius={10000}
            fillColor={'#0088ff'}
            fillOpacity={0.3}
            strokeColor={'#0088ff'}
            strokeWeight={2}
          />
        </Map>
      </APIProvider>
    </div >
  );
}

export default App;
