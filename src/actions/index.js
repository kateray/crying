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

export const dragOver = (data) => {
  return {
    type: 'DRAG_OVER',
    data
  }
}

function moveMarker(id, lat, lng) {
  return {
    type: 'MOVE_MARKER',
    id: id,
    lat,
    lng
  }
}

export const dropPin = (id, lat, lng) => {
  return (dispatch, getState) => {
    dispatch(moveMarker(id, lat, lng));
    dispatch(stopDrag())
  }
}

export const startDrag = (object) => {
  return {
    type: 'START_DRAG',
    object
  }
}
