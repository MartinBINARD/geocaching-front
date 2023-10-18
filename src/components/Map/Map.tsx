import { useEffect } from 'react';
import maplibregl, { LngLatLike } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { renderToStaticMarkup } from 'react-dom/server';

import style from '../../assets/map/style.json';

import MapPopup from '../MapPopup/MapPopup';
import FindCenter from '../../utils/FindCenter';

import { Circuit } from '../../@types/circuit';

interface MapsComponentProps {
  data: Circuit[];
  className: string;
}

interface MapInstance {
  container: string;
  style: string;
  center: LngLatLike;
  zoom: number;
}

function Map({ data, className }: MapsComponentProps) {
  /* newData is created to handle loading spinner at the end of the function
     data is not reacheable outside of useEffect hook */

  useEffect(() => {
    /* The loader is displayed during the data loading
        So a default coordinate point center is created by default to allow it
        If data is sent, so a center point of between markers is calculated in order
        to make the markers visible to user */
    const centerCoordintates = FindCenter(data);

    // Creating the map
    const map = new maplibregl.Map({
      container: 'map',
      style,
      center: centerCoordintates,
      zoom: 5, // Initial zoom
    } as unknown as MapInstance);

    // Fetch marker and inject CustomPopup component for each marker only if there is some data
    data.map((item) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { id_circuit, latitude, longitude, name } = item;
      const jsxPopupContent = <MapPopup name={name} id={id_circuit} />;

      const html = renderToStaticMarkup(jsxPopupContent);

      return new maplibregl.Marker()
        .setLngLat([longitude, latitude])
        .setPopup(new maplibregl.Popup().setHTML(html))
        .addTo(map);
    });

    // //  Add geolocate control to the map.
    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    // Cleaner for the map
    return () => map.remove();
  }, [data]);

  return <div id="map" className={className} />;
}

export default Map;
