import { connect } from 'react-redux'
import * as PinActions from '../actions/PinActions';
import * as AppActions from '../actions/AppActions';
import Map from '../components/Map'
import emojis from '../emojis.json'

const mapStateToProps = (state, ownProps) => {
  return {
    pins: state.pins,
    emojis: emojis,
    selectedId: state.app.selected,
    selectedPin: state.app.selected ? state.pins[state.app.selected] : null
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDrop: (data) => {
      dispatch(PinActions.dropPin(data))
    },
    selectPin: (data) => {
      dispatch(AppActions.selectPin(data))
    },
    deletePin: (id, data) => {
      dispatch(AppActions.selectPin(null))
      dispatch(PinActions.deletePin(id))
    },
    updatePin: (id, data) => {
      dispatch(PinActions.updatePin(id, data))
    }
  }
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default MapContainer
