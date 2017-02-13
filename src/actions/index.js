let nextMarkerId = 0

function addMarker(lat, lng, hex) {
  return {
    type: 'ADD_MARKER',
    id: nextMarkerId++,
    lat,
    lng,
    hex
  }
}

function stopDrag() {
  return {type: 'STOP_DRAG'}
}

export const dropNewMarker = (lat, lng) => {
  return (dispatch, getState) => {
    const hex = getState().app.dragging;
    //TODO: what if there is nothing dragging?
    dispatch(addMarker(lat, lng, hex));
    dispatch(stopDrag())
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

export const startDrag = (hex) => {
  return {
    type: 'START_DRAG',
    hex
  }
}
