import { connect } from 'react-redux'
import { dropNewMarker } from '../actions'
import Map from '../components/Map'

const mapStateToProps = (state, ownProps) => {
  return {
    markers: state.markers
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDrop: (lat, lng) => {
      dispatch(dropNewMarker(lat, lng))
    }
  }
}

const VisibleMap = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default VisibleMap
