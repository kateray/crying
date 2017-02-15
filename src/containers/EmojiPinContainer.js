import { connect } from 'react-redux'
import { moveMarker } from '../actions'
import EmojiPin from '../components/EmojiPin'

const mapStateToProps = (state, ownProps) => {
  return {
    markers: state.markers
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDrop: (e) => {
      dispatch(moveMarker(ownProps.data.id, e.target._latlng.lat, e.target._latlng.lng))
    }
  }
}

const EmojiPinContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmojiPin)

export default EmojiPinContainer
