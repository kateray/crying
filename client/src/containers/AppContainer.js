import { connect } from 'react-redux'
import * as AppActions from '../actions/AppActions'
import App from '../components/App'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.app.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUser: () => {
      dispatch(AppActions.getUser())
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
