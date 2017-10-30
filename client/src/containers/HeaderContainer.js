import { connect } from 'react-redux'
import { Header } from '../components/Header'
import { login, updateUser, receiveSaveConfirmation, receiveError } from '../actions/AppActions'

const mapStateToProps = (state, ownProps) => {
  return {
    lastSave: state.app.lastSave,
    user: state.app.user,
    isSaving: state.app.isSaving,
    errors: state.app.errors,
    showSaveConfirmation: state.app.showSaveConfirmation
  }
}

const mapDispatchToProps = ({
  login: login,
  updateUser: updateUser,
  receiveSaveConfirmation: receiveSaveConfirmation,
  receiveError: receiveError
})

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)
