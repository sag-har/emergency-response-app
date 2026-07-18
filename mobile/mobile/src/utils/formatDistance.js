export const formatDistance = (distance) => {
  if (!distance) return "0 km";

  return `${Number(distance).toFixed(1)} km`;
};