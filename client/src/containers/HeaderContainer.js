import { connect } from 'react-redux'
import * as PinActions from '../actions/PinActions'
import Header from '../components/Header'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSave: () => {
      dispatch(PinActions.save())
    }
  }
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
