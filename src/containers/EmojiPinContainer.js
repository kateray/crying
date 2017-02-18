import { connect } from 'react-redux'
import { dropPin, updatePin } from '../actions'
import EmojiPin from '../components/EmojiPin'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDrop: (e) => {
      dispatch(dropPin(ownProps.data.id, e.target._latlng.lat, e.target._latlng.lng))
    },
    handleTitleChange: (e) => {
      dispatch(updatePin(ownProps.data.id, {title: e.target.value}))
    },
    handleDescriptionChange: (e) => {
      dispatch(updatePin(ownProps.data.id, {description: e.target.value}))
    }
  }
}

const EmojiPinContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmojiPin)

export default EmojiPinContainer
