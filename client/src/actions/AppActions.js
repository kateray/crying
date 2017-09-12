import * as types from '../constants/AppActionTypes'
import _ from 'lodash'

export const selectPin = (payload) => {
  return {
    type: types.SELECT_PIN,
    payload
  }
}

function requestSave(){
  return {
    type: types.REQUEST_SAVE
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
    return fetch("/pins/"+uid+"/save", {
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

function savePinsError(payload) {
  return {
    type: types.SAVE_PINS_ERROR,
    payload
  }
}

function receivePins(data) {
  // convert the lat&lng stored as strings into floats
  const pins = data.map(function(p){
    return Object.assign(p, {lat: parseFloat(p.lat), lng: parseFloat(p.lng)})
  })
  return {
    type: types.RECEIVE_PINS,
    pins: pins
  }
}

function receiveUser(payload) {
  return {
    type: types.RECEIVE_USER,
    payload
  }
}

export const getAllPins = () => {
  return (dispatch, getState) => {
    return fetch("/pins", {
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
    return fetch("/pins/"+uid, {
        credentials: 'include',
      })
      .then(response => response.json())
      .then(json => {
        dispatch(receivePins(json.data))
      })
  }
}

export const login = (userInfo) => {
  return ( dispatch, getState ) => {
    return fetch('/login', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then( response => response.json() )
    .then( json => {
      if (json.error){
        dispatch(receiveError(json.error))
      } else {
        dispatch(receiveUser(json.data))
      }
    })
  }
}

function receiveError(payload) {
  return {
    type: types.RECEIVE_ERROR,
    payload
  }
}
