import { connect } from 'react-redux'
import Header from '../components/Header'
import { login } from '../actions/AppActions'

const mapStateToProps = (state, ownProps) => {
  return {
    lastSave: state.app.lastSave,
    user: state.app.user,
    isSaving: state.app.isSaving,
    errors: state.app.errors
  }
}

const mapDispatchToProps = ({
  login: login
})

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)
