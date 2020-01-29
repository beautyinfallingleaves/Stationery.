import * as React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { toggleSendModalVisible } from '../store/sendModalVisible'
import { setImagePostcardFront } from '../store/imagePostcardFront'
import { setImagePostcardBack } from '../store/imagePostcardBack'
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { captureRef as takeSnapshotAsync } from 'react-native-view-shot'
import { uploadImageToFirebaseStorage } from '../utils'

class SendModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      recipient: '',
      sendAttempted: false,
      sendSucceeded: false,
      sendFailed: false,
    }
  }

  handleSend = async () => {
    const { recipient } = this.state
    const {
      postcardFrontView,
      postcardBackView,
      setImagePostcardFront,
      setImagePostcardBack,
      toggleSendModalVisible,
    } = this.props

    // Prepare images for sending
    const frontImageUri = await takeSnapshotAsync(postcardFrontView)
    const frontImageFirebaseUrl = await uploadImageToFirebaseStorage(frontImageUri)
    setImagePostcardFront(frontImageFirebaseUrl)

    const backImageUri = await takeSnapshotAsync(postcardBackView)
    const backImageFirebaseUrl = await uploadImageToFirebaseStorage(backImageUri)
    setImagePostcardBack(backImageFirebaseUrl)

    // Post details to email send API route
    try {
      this.setState({ sendAttempted: true })

      await axios.post('http://c092f327.ngrok.io/api/email', {
        recipient,
        frontImageFirebaseUrl,
        backImageFirebaseUrl,
      })

      this.setState({ sendSucceeded: true })
    } catch (err) {
      this.setState({ sendFailed: true })
    }
  }

  render() {
    const {
      sendAttempted,
      sendSucceeded,
      sendFailed,
    } = this.state
    const {
      sendModalVisible,
      toggleSendModalVisible,
    } = this.props

    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={sendModalVisible}
        supportedOrientations={['landscape-left']}
      >
        <View style={styles.container}>
          <View style={styles.modal}>
            {sendAttempted ? (
              <View>
                {sendSucceeded &&
                  <Text>Your Stationery has been sent!</Text>
                }
                {sendFailed &&
                  <Text>There was an issue sending your postcard.</Text>
                }
              </View>
            ) : (
              <React.Fragment>
                <View style={styles.content}>
                  <Text>Send to:</Text>
                  <TextInput
                    value={this.state.recipient}
                    onChangeText={(recipient) => this.setState({ recipient })}
                    placeholder={'Enter recipient\'s email'}
                    placeholderTextColor='#90ABAB'
                    autoCompleteType='email'
                    keyboardType='email-address'
                    style={styles.input}
                  />
                  <TouchableOpacity
                    onPress={this.handleSend}
                  >
                    <Text>Send</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.closeButtonContainer}>
                  <TouchableOpacity
                    onPress={toggleSendModalVisible}>
                      <View style={styles.closeButton}>
                        <Text>Close</Text>
                      </View>
                  </TouchableOpacity>
                </View>

              </React.Fragment>
            )}
          </View>
        </View>
      </Modal>
    )
  }
}

const mapState = state => {
  return {
    sendModalVisible: state.sendModalVisible,
    postcardFrontView: state.postcardFrontView,
    postcardBackView: state.postcardBackView,
  }
}

const mapDispatch = dispatch => {
  return {
    toggleSendModalVisible: () => dispatch(toggleSendModalVisible()),
    setImagePostcardFront: (imageUri) => dispatch(setImagePostcardFront(imageUri)),
    setImagePostcardBack: (imageUri) => dispatch(setImagePostcardBack(imageUri)),
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
