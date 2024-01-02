/* eslint-disable jsx-a11y/control-has-associated-label */
import { LatLngTuple } from 'leaflet';
import { useAppSelector } from '../../hooks/redux';

import { Circuit } from '../../@types/circuit';

import CircuitMapToggle from '../CircuitMapToggle/CircuitMapToggle';

function CicuitLocationCard() {
  const circuit = useAppSelector((state) => state.circuits.oneCircuit);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { parking_address, latitude, longitude } = circuit as Circuit;
  const oneMarker = [latitude, longitude] as LatLngTuple;

  return (
    <section className="flex items-center justify-between gap-5 lg:gap-10 p-2 border-t border-b border-primary">
      <div className="flex flex-col">
        <p>Parking :</p>
        <p>{parking_address}</p>
      </div>

      <CircuitMapToggle oneMarker={oneMarker} zoom={12} />
    </section>
  );
}

export default CicuitLocationCard;
