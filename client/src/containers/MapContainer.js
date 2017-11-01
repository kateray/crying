import { connect } from 'react-redux'
import * as AppActions from '../actions/AppActions'
import { UserMap } from '../components/Map'
import emojis from '../emojis.json'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.app.user,
    isSaving: state.app.isSaving,
    emojis: emojis,
    selectedId: state.app.selected,
    isFetching: state.app.isFetchingPins
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSave: (uid, pins) => {
      dispatch(AppActions.save(uid, pins))
    },
    selectPin: (data) => {
      dispatch(AppActions.selectPin(data))
    }
  }
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMap)

export default MapContainer
