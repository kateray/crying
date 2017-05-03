import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.app.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
