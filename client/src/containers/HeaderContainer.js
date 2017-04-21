import { connect } from 'react-redux'
import * as AppActions from '../actions/AppActions'
import Header from '../components/Header'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.app.user,
    isSaving: state.app.isSaving
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
