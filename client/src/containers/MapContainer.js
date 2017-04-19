import { connect } from 'react-redux'
import * as AppActions from '../actions/AppActions';
import Map from '../components/Map'
import emojis from '../emojis.json'
import _ from 'lodash'

const mapStateToProps = (state, ownProps) => {
  return {
    isSaving: state.app.isSaving,
    fetchedPins: state.app.fetchedPins,
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
    selectPin: (data) => {
      dispatch(AppActions.selectPin(data))
    }
  }
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default MapContainer