import { connect } from 'react-redux'
import * as PinActions from '../actions/PinActions';
import EmojiPin from '../components/EmojiPin'

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.pins[ownProps.id]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleTitleChange: (e) => {
      dispatch(PinActions.updatePin(ownProps.id, {title: e.target.value}))
    },
    handleDescriptionChange: (e) => {
      dispatch(PinActions.updatePin(ownProps.id, {description: e.target.value}))
    }
  }
}

const EmojiPinContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmojiPin)

export default EmojiPinContainer
