const PREFIX = "appActions";

export const SELECT_PIN = `${PREFIX}.SELECT_PIN`;

export const selectPin = (payload) => {
  return {
    type: SELECT_PIN,
    payload
  }
}

export const save = (data) => {
  return (dispatch, getState) => {
    return fetch("/save", {accept: 'application/json'})
      .then(response => response.json())
      .then(json =>
        console.log(json)
      )
  }
}
