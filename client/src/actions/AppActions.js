const PREFIX = "appActions";
import _ from 'lodash'


export const SELECT_PIN = `${PREFIX}.SELECT_PIN`;
export const selectPin = (payload) => {
  return {
    type: SELECT_PIN,
    payload
  }
}

export const save = (data) => {
  return (dispatch, getState) => {
    const localPins = data
    const fetchedPins = getState().app.fetchedPins
    const pins = fetchedPins.map((pin) => {
      console.log(pin)
      const localMatch = _.find(localPins, ['uid', pin.uid])
      console.log(localMatch)
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
    console.log(localPins)
    const newPins = localPins.map((pin) => {
      const serverMatch = _.find(fetchedPins, ['uid', pin.uid])
      if (!serverMatch) {
        return {type: "ADD", data: pin}
      } else {
        return false
      }
    })
    console.log(newPins)
    const sendData = _.compact(pins).concat(_.compact(newPins))
    console.log(sendData)
    return fetch("/pins/save", {
        method: 'POST',
        body: JSON.stringify(sendData),
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
