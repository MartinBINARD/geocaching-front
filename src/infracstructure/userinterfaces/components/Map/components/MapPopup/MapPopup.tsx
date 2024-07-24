import { Popup } from 'react-leaflet';
import { Circuit } from '../../../../../../core/domain/entities';

interface PopupProps {
  marker: Circuit;
}

function CircuitCardPopup({ marker }: PopupProps) {
  return (
    <Popup className="w-40">
      <a
        href={`${import.meta.env.VITE_FRONT_API_KEY}/circuit/${
          marker.id_circuit
        }`}
      >
        <h3 className="text-xl">{marker.name}</h3>
        <p>
          Distance : <span className="font-bold">{marker.distance} km</span>
        </p>
        <p>
          Durée : <span className="font-bold">{marker.duration}</span>
        </p>
      </a>
    </Popup>
  );
}

export default CircuitCardPopup;
