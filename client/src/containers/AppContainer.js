import { connect } from 'react-redux'
import { App } from '../components/App'
import { getPins } from '../actions/AppActions'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.app.user,
    fetchedPins: state.app.fetchedPins
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPins: (uid) => {
      dispatch(getPins(uid))
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
