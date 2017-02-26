import { connect } from 'react-redux'
import Pano from '../components/Pano'

const mapStateToProps = (state, ownProps) => {
  let lat, lng;
  if (state.app.selected) {
    const selectedPin = state.pins[state.app.selected];
    lat = selectedPin.lat;
    lng = selectedPin.lng;
  }
  return {
    isSelected: !!state.app.selected,
    lat: lat || null,
    lng: lng || null
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const PanoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pano)

export default PanoContainer
