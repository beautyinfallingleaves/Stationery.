import * as React from 'react';
import { connect } from 'react-redux'
import { toggleSendModalVisible } from '../store/sendModalVisible'
import { StyleSheet, Modal, View, Text, TouchableHighlight } from 'react-native'

class SendModal extends React.Component {

  render() {
    const { sendModalVisible, toggleSendModalVisible } = this.props

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={sendModalVisible}
        supportedOrientations={['landscape-left']}
      >
        <View style={styles.root}>
          <View style={styles.content}>
            <Text>This will be where you select a recipient and Send or Cancel!</Text>
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight
              onPress={() => {
                toggleSendModalVisible()
              }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
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

const styles = StyleSheet.create({
  root: {
    borderRadius: 20,
    position: 'absolute',
    left: '25%',
    top: '25%',
    height: '50%',
    width: '50%',
    backgroundColor: 'white',
  },
  content: {
    flex: 3,
    padding: 10,
  },
  buttons: {
    flex: 1,
    borderTopColor: 'grey',
    borderTopWidth: 1,
  }
});
