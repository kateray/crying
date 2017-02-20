let nextPinId = 0

function addPin(lat, lng, draggingObject) {
  const data = {
    id: nextPinId++,
    lat,
    lng,
    hex: draggingObject.hex,
    title: draggingObject.title,
    name: draggingObject.name
  }
  return {
    type: 'ADD_PIN',
    data
  }
}

function stopDrag() {
  return {type: 'STOP_DRAG'}
}

export const dropNewPin = (lat, lng) => {
  return (dispatch, getState) => {
    //TODO: what if there is nothing dragging?
    dispatch(addPin(lat, lng, getState().app.dragging));
    dispatch(stopDrag())
  }
}

export const updatePin = (id, data) => {
  return {
    type: 'UPDATE_PIN',
    id,
    data
  }
}

export const dropPin = (data) => {
  return (dispatch, getState) => {
    dispatch(updatePin(data.id, {lat: data.lat, lng: data.lng}));
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
