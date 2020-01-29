import * as React from 'react';
import { connect } from 'react-redux'
import { toggleSendModalVisible } from '../store/sendModalVisible'
import { Modal, View, Text, TouchableHighlight } from 'react-native'

class SendModal extends React.Component {

  render() {
    const { sendModalVisible, toggleSendModalVisible } = this.props

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={sendModalVisible}
        supportedOrientations={['landscape-left']}
      >
        <View>
          <Text>This will be where you select a recipient and Send or Cancel!</Text>
          <TouchableHighlight
              onPress={() => {
                toggleSendModalVisible()
              }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
        </View>
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
    toggleSendModalVisible: () => dispatch(toggleSendModalVisible())
  }
}

export default connect(mapState, mapDispatch)(SendModal)
