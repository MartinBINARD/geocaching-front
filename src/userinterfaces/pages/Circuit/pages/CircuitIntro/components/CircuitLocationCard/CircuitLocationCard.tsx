/* eslint-disable jsx-a11y/control-has-associated-label */
import { LatLngTuple } from 'leaflet';
import { useAppSelector } from '../../../../../../../services/hooks/redux';

import { Circuit } from '../../../../../../../domain/entities/circuit';

import CircuitMapToggle from '../../../../../../components/CircuitMapToggle/CircuitMapToggle';

function CicuitLocationCard() {
  const circuit = useAppSelector((state) => state.circuits.oneCircuit);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { parking_address, latitude, longitude } = circuit as Circuit;
  const oneMarker = [latitude, longitude] as LatLngTuple;

  return (
    <section className="flex flex-wrap items-center gap-5 justify-center border-t border-b border-primary p-2 min-[528px]:justify-between">
      <div className="flex flex-col mr-1">
        <p>Parking :</p>
        <p>{parking_address}</p>
      </div>

      <CircuitMapToggle
        oneMarker={oneMarker}
        zoom={12}
        className="btn btn-primary btn-outline normal-case font-medium text-white my-2"
      />
    </section>
  );
}

export default CicuitLocationCard;
