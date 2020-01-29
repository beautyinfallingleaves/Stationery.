import * as React from 'react';
import { connect } from 'react-redux'

class SendModal extends React.Component {

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={sendModalVisible}
      >

      </Modal>
    )
  }
}

const mapState = state => {
  return {
    sendModalVisible: state.sendModalVisible
  }
}

const mapDispatch = dispatch => {
  return {
    setSendModalVisible: () => dispatch(setSendModalVisible)
  }
}

export default connect(mapState, mapDispatch)(SendModal)
