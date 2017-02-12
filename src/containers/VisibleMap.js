import { connect } from 'react-redux'
import { addMarker } from '../actions'
import Map from '../components/Map'

const mapStateToProps = (state, ownProps) => {
  return {
    markers: state.markers
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick: (e) => {
      dispatch(addMarker(e.latlng.lat, e.latlng.lng))
    }
  }
}

const VisibleMap = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default VisibleMap
