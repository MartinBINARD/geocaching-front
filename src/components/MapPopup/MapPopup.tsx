interface MapPopupProps {
  id: number;
  name: string;
}

function MapPopup({ id, name }: MapPopupProps) {
  return (
    <div>
      <a href={`${import.meta.env.VITE_FRONT_API_KEY}/circuit/${id}`}>
        <p className="text-primary">{name}</p>
      </a>
    </div>
  );
}

export default MapPopup;
