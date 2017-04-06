import { connect } from 'react-redux'
import * as PinActions from '../actions/PinActions';
import * as AppActions from '../actions/AppActions';
import Map from '../components/Map'
import emojis from '../emojis.json'
import _ from 'lodash'

const mapStateToProps = (state, ownProps) => {
  console.log(state.app.fetchedPins)
  return {
    fetchedPins: state.app.fetchedPins,
    localPins: state.pins.items,
    emojis: emojis,
    selectedId: state.app.selected
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPins: () => {
      dispatch(AppActions.getPins())
    },
    onSave: (pins) => {
      dispatch(AppActions.save(pins))
    },
    createPin: (data) => {
      dispatch(PinActions.dropPin(data))
    },
    updatePin: (uid, data) => {
      dispatch(PinActions.updatePin(uid, data))
    },
    selectPin: (data) => {
      dispatch(AppActions.selectPin(data))
    },
    deletePin: (uid, data) => {
      dispatch(AppActions.selectPin(null))
      dispatch(PinActions.deletePin(uid))
    },
    updateSelected: (data) => {
      dispatch(PinActions.updateSelected(data))
    }
  }
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default MapContainer
