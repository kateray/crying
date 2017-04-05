let nextPinId = 1;
const PREFIX = "pinActions";

export const UPDATE_PIN = `${PREFIX}.UPDATE_PIN`;
export const ADD_PIN = `${PREFIX}.ADD_PIN`;
export const DELETE_PIN = `${PREFIX}.DELETE_PIN`;

export const updatePin = (id, data) => {
  return {
    type: UPDATE_PIN,
    id,
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

function addPin(id, data) {
  return {
    type: ADD_PIN,
    id,
    data
  }
}

export const dropPin = (data) => {
  return (dispatch, getState) => {
    if (data.id) {
      dispatch(updatePin(data.id, {lat: data.lat, lng: data.lng}));
    } else {
      const newPin = Object.assign({}, data)
      dispatch(addPin(nextPinId++, newPin))
    }
  }
}

export const deletePin = (id) => {
  return {
    type: DELETE_PIN,
    id
  }
}

export const save = (data) => {
  return (dispatch, getState) => {
    const pin = getState().pins[1]
    return fetch("/pins/save", {
        method: 'POST',
        body: JSON.stringify(pin),
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => response.json())
      .then(json =>
        console.log(json)
      )
  }
}

export const RECEIVE_PINS = `${PREFIX}.RECEIVE_PINS`;
function receivePins(json) {
  // convert the lat&lng stored as strings into floats
  const pins = json.data.map(function(p){
    return Object.assign(p, {lat: parseFloat(p.lat), lng: parseFloat(p.lng)})
  })
  return {
    type: RECEIVE_PINS,
    pins: pins
  }
}

export const getPins = () => {
  return (dispatch) => {
    return fetch("/pins/")
      .then(response => response.json())
      .then(json =>
        dispatch(receivePins(json))
      )
  }
}
