import { connect } from 'react-redux'
import Pano from '../components/Pano'

const mapStateToProps = (state, ownProps) => {
  return {
    selectedId: state.app.selected,
    selectedPin: state.app.selected ? state.pins[state.app.selected] : null
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const PanoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pano)

export default PanoContainer
