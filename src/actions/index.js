let nextMarkerId = 0

function addMarker(lat, lng, draggingObject) {
  return {
    type: 'ADD_MARKER',
    id: nextMarkerId++,
    lat,
    lng,
    hex: draggingObject.hex,
    title: draggingObject.title
  }
}

function stopDrag() {
  return {type: 'STOP_DRAG'}
}

export const dropNewMarker = (lat, lng) => {
  return (dispatch, getState) => {
    //TODO: what if there is nothing dragging?
    dispatch(addMarker(lat, lng, getState().app.dragging));
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

export const startDrag = (object) => {
  return {
    type: 'START_DRAG',
    object
  }
}
