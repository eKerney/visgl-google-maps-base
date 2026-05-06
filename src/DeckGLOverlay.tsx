import { useEffect, useMemo, useRef } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';

export const DeckGlOverlay = ({ layers }) => {
  const deck = useMemo(() => new GoogleMapsOverlay({ interleaved: true }), []);

  const map = useMap();
  useEffect(() => {
    deck.setProps
    deck.setMap(map);
    return () => deck.setMap(null);
  }, [map]);
  useEffect(() => deck.setProps({ layers }), [layers]);
  // useEffect(() => {
  //   const layer = deck.props.layers[0][0];
  //   console.log('changed', deck.props?.layers[0][0]);
  //   console.log('layer', layer.getBounds());
  // }, [deck]);

  return null;
};

