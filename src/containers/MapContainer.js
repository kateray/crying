import { connect } from 'react-redux'
import { dropNewMarker, dragOver } from '../actions'
import Map from '../components/Map'

const mapStateToProps = (state, ownProps) => {
  return {
    magnifier: state.app.magnifier,
    markers: state.markers,
    dragging: state.app.dragging
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDragOver: (magnifier) => {
      dispatch(dragOver(magnifier));
    },
    handleDrop: (lat, lng) => {
      dispatch(dropNewMarker(lat, lng))
    }
  }
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default MapContainer
