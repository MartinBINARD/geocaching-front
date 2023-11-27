import L from 'leaflet';
import React, { PropsWithChildren, useEffect, useRef } from 'react';

const ControlClasses = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
};

type ControlPosition = keyof typeof ControlClasses;
interface LeafLetControlProps {
  position: ControlPosition;
  children: React.ReactNode;
}

function LeafletControl({
  position,
  children,
}: PropsWithChildren<LeafLetControlProps>) {
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      L.DomEvent.disableClickPropagation(divRef.current);
      L.DomEvent.disableScrollPropagation(divRef.current);
    }
  });

  return (
    <div ref={divRef} className={position && ControlClasses[position]}>
      <div className="leaflet-control leaflet-bar text-black bg-white p-1">
        {children}
      </div>
    </div>
  );
}

export default LeafletControl;
