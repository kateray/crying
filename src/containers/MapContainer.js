import { connect } from 'react-redux'
import { dropPin, dropNewPin, startDrag, deletePin } from '../actions'
import Map from '../components/Map'
import emojis from '../emojis.json'

const mapStateToProps = (state, ownProps) => {
  return {
    pins: state.pins,
    emojis: emojis,
    dragging: state.app.dragging
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handlePinDrop: (data) => {
      dispatch(dropPin(data))
    },
    handleDragStart: (data) => {
      dispatch(startDrag(data))
    },
    handleDrop: (lat, lng) => {
      dispatch(dropNewPin(lat, lng))
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
