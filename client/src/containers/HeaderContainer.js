import { connect } from 'react-redux'
import Header from '../components/Header'
import * as AppActions from '../actions/AppActions'

const mapStateToProps = (state, ownProps) => {
  return {
    path: state.app.path,
    lastSave: state.app.lastSave,
    user: state.app.user,
    isSaving: state.app.isSaving,
    error: state.app.error
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUser: () => {
      dispatch(AppActions.getUser())
    }
  }
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
