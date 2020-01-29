import * as React from 'react';
import { connect } from 'react-redux'
import { toggleSendModalVisible } from '../store/sendModalVisible'
import { StyleSheet, Modal, View, Text, TextInput, TouchableOpacity } from 'react-native'

class SendModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      recipient: '',
    }
  }

  render() {
    const { sendModalVisible, toggleSendModalVisible } = this.props

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={sendModalVisible}
        supportedOrientations={['landscape-left']}
      >
        <View style={styles.container}>
          <View style={styles.modal}>
            <View style={styles.content}>
              <Text>Send to:</Text>
              <TextInput
                value={this.state.recipient}
                onChangeText={(recipient) => this.setState({ recipient })}
                placeholder={'Recipient Email'}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => {
                  console.log('Going to send to ' + this.state.recipient)
                }}
              >
                <Text>Send</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity
                onPress={() => {
                  toggleSendModalVisible()
                }}>
                  <View style={styles.closeButton}>
                    <Text>Close</Text>
                  </View>
              </TouchableOpacity>
            </View>
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
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    display: 'flex',
    borderRadius: 15,
    position: 'absolute',
    left: '25%',
    top: '25%',
    height: '50%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  content: {
    flex: 3,
    padding: 10,
    width: '100%',
  },
  closeButtonContainer: {
    flex: 1.25,
    width: '100%',
    borderTopColor: '#90ABAB',
    borderTopWidth: 2,
  },
  closeButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  }
});
