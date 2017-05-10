const PREFIX = "appActions";
import _ from 'lodash'


export const SELECT_PIN = `${PREFIX}.SELECT_PIN`;
export const selectPin = (payload) => {
  return {
    type: SELECT_PIN,
    payload
  }
}

export const REQUEST_SAVE = `${PREFIX}.REQUEST_SAVE`;
function requestSave(){
  return {
    type: REQUEST_SAVE
  }
}

export const save = (uid, data) => {
  return (dispatch, getState) => {
    dispatch(requestSave())
    const localPins = data
    const fetchedPins = getState().app.fetchedPins
    const pins = fetchedPins.map((pin) => {
      const localMatch = _.find(localPins, ['uid', pin.uid])
      // if the pin is part of our current set
      if (localMatch !== undefined) {
        // if it has changed
        if (!_.isEqual(localMatch, pin)) {
          return {type: "SET", data: localMatch}
        } else {
          return false
        }
      } else {
        return {type: "DELETE", uid: pin.uid}
      }
    })
    const newPins = localPins.map((pin) => {
      const serverMatch = _.find(fetchedPins, ['uid', pin.uid])
      if (!serverMatch) {
        return {type: "ADD", data: pin}
      } else {
        return false
      }
    })
    const sendData = _.compact(pins).concat(_.compact(newPins))
    const path = getState().app.path;
    return fetch(path+"pins/"+uid+"/save", {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(sendData),
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then( response => {
        if (!response.ok){
          throw new Error(response.statusText)
        }
        return response
      })
      .then(response => response.json())
      .then(json => {
        dispatch(receivePins(json.data))
      })
      .catch(e => {
        dispatch(savePinsError(e))
      })
  }
}

export const SAVE_PINS_ERROR = `${PREFIX}.SAVE_PINS_ERROR`;
function savePinsError(payload) {
  return {
    type: SAVE_PINS_ERROR,
    payload
  }
}

export const RECEIVE_PINS = `${PREFIX}.RECEIVE_PINS`;
function receivePins(data) {
  // convert the lat&lng stored as strings into floats
  const pins = data.map(function(p){
    return Object.assign(p, {lat: parseFloat(p.lat), lng: parseFloat(p.lng)})
  })
  return {
    type: RECEIVE_PINS,
    pins: pins
  }
}

export const RECEIVE_USER = `${PREFIX}.RECEIVE_USER`;
function receiveUser(payload) {
  return {
    type: RECEIVE_USER,
    payload
  }
}

export const getAllPins = () => {
  return (dispatch, getState) => {
    const path = getState().app.path;
    return fetch(path+"pins", {
        credentials: 'include',
      })
      .then(response => response.json())
      .then(json => {
        dispatch(receivePins(json.data))
      })
  }
}

export const getPins = (uid) => {
  return (dispatch, getState) => {
    const path = getState().app.path;
    return fetch(path+"pins/"+uid, {
        credentials: 'include',
      })
      .then(response => response.json())
      .then(json => {
        dispatch(receivePins(json.data))
      })
  }
}

export const getUser = () => {
  return (dispatch, getState) => {
    const path = getState().app.path;
    return fetch(path+"user/", {credentials: 'include'})
      .then(response => response.json())
      .then(json => {
        dispatch(receiveUser(json.data))
      })
  }
}
