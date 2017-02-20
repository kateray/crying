let nextPinId = 1

function addPin(data) {
  return {
    type: 'ADD_PIN',
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

export const dropPin = (data) => {
  return (dispatch, getState) => {
    if (data.id) {
      dispatch(updatePin(data.id, {lat: data.lat, lng: data.lng}));
    } else {
      const newPin = Object.assign({}, data, {id: nextPinId++})
      dispatch(addPin(newPin))
    }
  }
}

export const deletePin = (data) => {
  return {
    type: 'DELETE_PIN',
    data
  }
}
