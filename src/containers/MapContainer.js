import { connect } from 'react-redux'
import { dropPin, startDrag, deletePin } from '../actions'
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
    handleDragStart: (data) => {
      dispatch(startDrag(data))
    },
    handleDrop: (data) => {
      dispatch(dropPin(data))
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
