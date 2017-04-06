let nextPinId = 1;
const PREFIX = "pinActions";

export const UPDATE_PIN = `${PREFIX}.UPDATE_PIN`;
export const ADD_PIN = `${PREFIX}.ADD_PIN`;
export const DELETE_PIN = `${PREFIX}.DELETE_PIN`;

export const updatePin = (uid, data) => {
  return {
    type: UPDATE_PIN,
    uid,
    data
  }
}

export const updateSelected = (data) => {
  return (dispatch, getState) => {
    const selected = getState().app.selected
    if (selected) {
      dispatch(updatePin(selected, data))
    }
  }
}

export const addPin = (id, data) => {
  return {
    type: ADD_PIN,
    data
  }
}

export const dropPin = (data) => {
  return (dispatch, getState) => {
    if (data.uid) {
      dispatch(updatePin(data.uid, {lat: data.lat, lng: data.lng}));
    } else {
      const newPin = Object.assign({}, data)
      dispatch(addPin(nextPinId++, newPin))
    }
  }
}

export const deletePin = (uid) => {
  return {
    type: DELETE_PIN,
    uid
  }
}
