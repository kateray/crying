import { connect } from 'react-redux'
import { dropPin, startDrag, dragOver, updatePin } from '../actions'
import EmojiPin from '../components/EmojiPin'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDragStart: () => {
      dispatch(startDrag(ownProps.data))
    },
    handleDragOver: (e) => {
      const magnifier = {dragLatLng: e.latlng, dragLeft: e.originalEvent.x, dragTop: e.originalEvent.y};
      dispatch(dragOver(magnifier));
    },
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
