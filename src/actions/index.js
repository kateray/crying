let nextMarkerId = 0
export const addMarker = (lat, lng) => {
  return {
    type: 'ADD_MARKER',
    id: nextMarkerId++,
    lat,
    lng
  }
}

export const moveMarker = (id, lat, lng) => {
  return {
    type: 'MOVE_MARKER',
    id: id,
    lat,
    lng
  }
}
