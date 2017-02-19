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

export const hideMagnifier = () => {
  return {
    type: 'HIDE_MAGNIFIER'
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
