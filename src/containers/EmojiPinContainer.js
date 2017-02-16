import { connect } from 'react-redux'
import { dropPin, startDrag, dragOver } from '../actions'
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
      console.log(e)
    },
    handleDescriptionChange: (e) => {
      console.log(e)
    }
  }
}

const EmojiPinContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmojiPin)

export default EmojiPinContainer
