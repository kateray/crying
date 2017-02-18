import { connect } from 'react-redux'
import { hideMagnifier, dropInTrash } from '../actions'
import Trash from '../components/Trash'

const mapStateToProps = (state, ownProps) => {
  return {
    dragging: state.app.dragging
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hideMagnifier: () => {
      dispatch(hideMagnifier());
    },
    handleDrop: () => {
      dispatch(dropInTrash());
    }
  }
}

const TrashContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Trash)

export default TrashContainer
