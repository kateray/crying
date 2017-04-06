import { connect } from 'react-redux'
import * as AppActions from '../actions/AppActions'
import Header from '../components/Header'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSave: () => {
      dispatch(AppActions.save())
    }
  }
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
