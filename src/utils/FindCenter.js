function FindCenter(markers) {
  const lats = markers.map((m) => m.latitude);
  const lngs = markers.map((m) => m.longitude);

  return [
    (Math.min(...lngs) + Math.max(...lngs)) / 2,
    (Math.min(...lats) + Math.max(...lats)) / 2,
  ];
}

export default FindCenter;
