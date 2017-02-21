import { connect } from 'react-redux'
import * as PinActions from '../actions/PinActions';
import Map from '../components/Map'
import emojis from '../emojis.json'

const mapStateToProps = (state, ownProps) => {
  return {
    pins: state.pins,
    emojis: emojis
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDrop: (data) => {
      dispatch(PinActions.dropPin(data))
    },
    deletePin: (data) => {
      dispatch(PinActions.deletePin(data))
    }
  }
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default MapContainer
