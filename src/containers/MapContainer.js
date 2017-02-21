import { connect } from 'react-redux'
import * as PinActions from '../actions/PinActions';
import Map from '../components/Map'
import emojis from '../emojis.json'

const mapStateToProps = (state, ownProps) => {
  const pinKeys = Object.keys(state.pins)
  return {
    pinKeys: pinKeys,
    emojis: emojis
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDrop: (data) => {
      dispatch(PinActions.dropPin(data))
    },
    deletePin: (id, data) => {
      dispatch(PinActions.deletePin(id, data))
    }
  }
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default MapContainer
