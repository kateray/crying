import { connect } from 'react-redux'
import { startDrag } from '../actions'
import EmojiTool from '../components/EmojiTool'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDragStart: () => {
      dispatch(startDrag(ownProps.name))
    }
  }
}

const EmojiToolContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmojiTool)

export default EmojiToolContainer
