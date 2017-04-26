import { connect } from 'react-redux'
import * as AppActions from '../actions/AppActions';
import ShareMap from '../components/ShareMap'
import _ from 'lodash'

const mapStateToProps = (state, ownProps) => {
  return {
    pins: state.app.fetchedPins
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPins: (uid) => {
      dispatch(AppActions.getPins(uid))
    }
  }
}

const ShareMapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareMap)

export default ShareMapContainer
