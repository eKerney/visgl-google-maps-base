import { H3HexagonLayer, type H3HexagonLayerProps } from "@deck.gl/geo-layers";
import { ScatterplotLayer } from "@deck.gl/layers";
import { CSVLoader } from "@loaders.gl/csv";
import { LANDCOVER_LEGEND } from './landcover-palette';

export type DataPoint = [longitude: number, latitude: number, gender: number];
export type DataType = { hex: string; count: number; };
export const layers = () => {

  const DATA_URL = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/scatterplot/manhattan.json';
  const maleColor = [0, 128, 255, 255];
  const femaleColor = [255, 0, 128, 255];
  type GridCell = { id: string; value: number };
  const H3_URL = 'https://raw.githubusercontent.com/visgl/deck.gl-data/refs/heads/master/website/landcover-h3.csv';

  const h3Layer = new H3HexagonLayer<DataType>({
    id: 'H3HexagonLayer',
    data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf.h3cells.json',
    extruded: true,
    getHexagon: (d: DataType) => d.hex,
    getFillColor: (d: DataType) => [255, (1 - d.count / 500) * 255, 0, 200],
    getElevation: (d: DataType) => d.count,
    elevationScale: 20,
    pickable: true
  });
  const scatterLayer = new ScatterplotLayer<DataPoint>({
    id: 'scatter-plot',
    data: DATA_URL,
    radiusScale: 30,
    radiusMinPixels: 0.25,
    getPosition: d => [d[0], d[1], 0],
    getFillColor: d => (d[2] === 1 ? maleColor : femaleColor),
    getRadius: 1,
    updateTriggers: {
      getFillColor: [maleColor, femaleColor]
    },
    pickable: true
  })
  const h3Landcover = new H3HexagonLayer<DataType>({
    id: 'H3HexagonLayerLULC',
    data: H3_URL,
    loaders: [CSVLoader],
    loadOptions: { csv: { header: true, dynamicTyping: true } },
    getHexagon: (d: string) => d.id,
    getFillColor: (d: any) => {
      const v = d.value || 0;
      return [80 + v * 8, 200 - v * 4, 120]; // Green-ish landcover style
    },
    opacity: 0.5,
    getElevation: (d: any) => d.value || 0,
    extruded: true,
    elevationScale: 300,
    pickable: true
  });

  // @ts-ignore
  const commonLayerProps = {
    opacity: 0.5,
    filled: true,
    getFillColor: (d: any) => LANDCOVER_LEGEND[d.value].color || [0, 0, 0],
    extruded: true,
    getElevation: 50000,
    beforeId: 'watername_ocean',
    loaders: [CSVLoader],
    loadOptions: { csv: { header: true, dynamicTyping: false } }
  } as Omit<H3HexagonLayerProps<GridCell>, 'data' | 'id'> & { beforeId: string };

  const h3colorLULC = new H3HexagonLayer<GridCell>({
    id: 'h3-layer',
    data: H3_URL,
    getHexagon: (d: GridCell) => d.id,
    ...commonLayerProps
  });

  // console.log('props', scatterLayer.getBounds())

  const layers = [h3colorLULC];

  return layers;
}
