import { connect } from 'react-redux'
import Header from '../components/Header'

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
  return {}
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
