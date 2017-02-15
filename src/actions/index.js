import emojis from '../emojis.json'

let nextMarkerId = 0

function addMarker(lat, lng, name) {
  const emoji = emojis.icons.find(function(emoji){
    return emoji.name === name;
  });
  return {
    type: 'ADD_MARKER',
    id: nextMarkerId++,
    lat,
    lng,
    hex: emoji.hex,
    title: emoji.title
  }
}

function stopDrag() {
  return {type: 'STOP_DRAG'}
}

export const dropNewMarker = (lat, lng) => {
  return (dispatch, getState) => {
    const name = getState().app.dragging;
    //TODO: what if there is nothing dragging?
    dispatch(addMarker(lat, lng, name));
    dispatch(stopDrag())
  }
}

export const moveMarker = (id, lat, lng) => {
  return {
    type: 'MOVE_MARKER',
    id: id,
    lat,
    lng
  }
}

export const startDrag = (name) => {
  return {
    type: 'START_DRAG',
    name
  }
}
