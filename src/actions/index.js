let nextMarkerId = 0

function addMarker(lat, lng, draggingObject) {
  const data = {
    id: nextMarkerId++,
    lat,
    lng,
    hex: draggingObject.hex,
    title: draggingObject.title,
    name: draggingObject.name
  }
  return {
    type: 'ADD_MARKER',
    data
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

export const updatePin = (id, data) => {
  return {
    type: 'UPDATE_PIN',
    id,
    data
  }
}

export const dropPin = (id, lat, lng) => {
  return (dispatch, getState) => {
    dispatch(updatePin(id, {lat: lat, lng: lng}));
    dispatch(stopDrag())
  }
}

export const startDrag = (object) => {
  return {
    type: 'START_DRAG',
    object
  }
}

export const deletePin = (data) => {
  return {
    type: 'DELETE_PIN',
    data
  }
}
