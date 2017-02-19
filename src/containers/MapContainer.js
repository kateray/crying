import { connect } from 'react-redux'
import { dropNewPin, dragOver, startDrag, deletePin, hideMagnifier } from '../actions'
import Map from '../components/Map'
import emojis from '../emojis.json'

const mapStateToProps = (state, ownProps) => {
  return {
    magnifier: state.app.magnifier,
    pins: state.pins,
    emojis: emojis,
    dragging: state.app.dragging
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDragStart: (data) => {
      dispatch(startDrag(data))
    },
    handleDragOver: (magnifier) => {
      dispatch(dragOver(magnifier));
    },
    handleDrop: (lat, lng) => {
      dispatch(dropNewPin(lat, lng))
    },
    handleDragLeave: () => {
      dispatch(hideMagnifier())
    },
    deletePin: (data) => {
      dispatch(deletePin(data))
    }
  }
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default MapContainer
