let nextMarkerId = 0
export const addMarker = (lat, lng) => {
  return {
    type: 'ADD_MARKER',
    id: nextMarkerId++,
    lat,
    lng
  }
}
