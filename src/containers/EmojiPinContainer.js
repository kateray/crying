import { connect } from 'react-redux'
import { moveMarker } from '../actions'
import EmojiPin from '../components/EmojiPin'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDrop: (e) => {
      dispatch(moveMarker(ownProps.data.id, e.target._latlng.lat, e.target._latlng.lng))
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
