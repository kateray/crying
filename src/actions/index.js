let nextPinId = 1

function addPin(data) {
  return {
    type: 'ADD_PIN',
    data
  }
}

function stopDrag() {
  return {type: 'STOP_DRAG'}
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
    if (data.id) {
      dispatch(updatePin(data.id, {lat: data.lat, lng: data.lng}));
    } else {
      const dragging = getState().app.dragging;
      const newPin = Object.assign({}, dragging, {
        id: nextPinId++,
        lat: data.lat,
        lng: data.lng
      })
      dispatch(addPin(newPin))
    }
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
