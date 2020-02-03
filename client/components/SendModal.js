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
import { Ionicons } from '@expo/vector-icons'
import { captureRef as takeSnapshotAsync } from 'react-native-view-shot'
import { uploadImageToFirebaseStorage } from '../utils'
import { serverUrl } from '../../constants/ApiConfig'

const initialSendModalState = {
  recipient: '',
  sendAttempted: false,
  sendAttemptInProgress: false,
  sendSucceeded: false,
  sendFailed: false,
}

class SendModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = initialSendModalState
  }

  handleSend = async () => {
    const { recipient } = this.state
    const {
      postcardFrontView,
      postcardBackView,
      setImagePostcardFront,
      setImagePostcardBack,
    } = this.props

    this.setState({ sendAttempted: true })
    this.setState({ sendAttemptInProgress: true })

    // Prepare images for sending
    const frontImageUri = await takeSnapshotAsync(postcardFrontView)
    const frontImageFirebaseUrl = await uploadImageToFirebaseStorage(frontImageUri)
    setImagePostcardFront(frontImageFirebaseUrl)

    const backImageUri = await takeSnapshotAsync(postcardBackView)
    const backImageFirebaseUrl = await uploadImageToFirebaseStorage(backImageUri)
    setImagePostcardBack(backImageFirebaseUrl)

    // Post details to email send API route
    try {
      await axios.post(`${serverUrl}/api/email`, {
        recipient,
        frontImageFirebaseUrl,
        backImageFirebaseUrl,
      })

      this.setState({ sendSucceeded: true })
    } catch (err) {
      this.setState({ sendFailed: true })
    }

    this.setState({ sendAttemptInProgress: false })
  }

  handleClose = () => {
    this.props.toggleSendModalVisible()
    this.setState(initialSendModalState)
  }

  render() {
    const {
      sendAttempted,
      sendAttemptInProgress,
      sendSucceeded,
      sendFailed,
    } = this.state
    const {
      sendModalVisible,
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
            {sendAttemptInProgress ? (
              <View>
                <Text>Sending your Stationery...</Text>
              </View>
            ) : (
              <React.Fragment>
                <View style={styles.content}>
                  {sendAttempted ? (
                    <View style={styles.sendStatus}>
                      {sendSucceeded &&
                        <Text>Your Stationery has been sent!</Text>
                      }
                      {sendFailed &&
                        <Text>There was an issue sending your postcard.</Text>
                      }
                    </View>
                  ) : (
                    <View style={styles.sendControls}>
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
                        <Ionicons name="md-paper-plane" size={35} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <View style={styles.closeButtonContainer}>
                  <TouchableOpacity
                    onPress={this.handleClose}
                  >
                    <View style={styles.closeButton}>
                      <Text style={{ color: '#FFFFFF', fontWeight: 'bold'}}>Close</Text>
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
    top: '35%',
    height: '30%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowOpacity: 0.75,
    shadowOffset: { width: 2, height: 2 },
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  content: {
    flex: 1.5,
    padding: 13,
    height: '100%',
    width: '100%',
  },
  sendControls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sendStatus: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonContainer: {
    flex: 1,
    width: '100%',
  },
  closeButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#51ADAD',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  }
});
