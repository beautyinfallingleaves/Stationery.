import * as React from 'react';
import { connect } from 'react-redux'
import { setCurrentSide } from '../store/currentSide'
import { removeImageData } from '../store/imageData'
import { toggleIsWriting } from '../store/isWriting'
import { setImagePostcardFront } from '../store/imagePostcardFront'
import { setImagePostcardBack } from '../store/imagePostcardBack'
import { removeImagePostcardFront } from '../store/imagePostcardFront'
import { removeImagePostcardBack } from '../store/imagePostcardBack'
import { toggleSendModalVisible } from '../store/sendModalVisible'
import { StyleSheet, View, CameraRoll, ImagePickerIOS } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { captureRef as takeSnapshotAsync } from 'react-native-view-shot'
import CardFlip from 'react-native-card-flip'
import PostcardFront from './PostcardFront'
import PostcardBack from './PostcardBack'
import SendModal from './SendModal'
import axios from 'axios'
// import * as MailComposer from 'expo-mail-composer'
import * as firebase from 'firebase'
import uuid from 'uuid'

class PostcardView extends React.Component {
  uploadImage = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref()
      .child(uuid.v4());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }

  handleSend = async (recipient) => {
    const frontImageUri = await takeSnapshotAsync(this.props.postcardFrontView)
    const frontImageFirebaseUrl = await this.uploadImage(frontImageUri)
    this.props.setImageFront(frontImageFirebaseUrl)

    const backImageUri = await takeSnapshotAsync(this.props.postcardBackView)
    const backImageFirebaseUrl = await this.uploadImage(backImageUri)
    this.props.setImageBack(backImageFirebaseUrl)

    // await MailComposer.composeAsync({
    //   recipients: [recipient],
    //   subject: 'Check out my postcard!',
    //   isHtml: true,
    //   body: `<html><body><img src="${frontImageFirebaseUrl}" /><div/><img src="${backImageFirebaseUrl}" /></body></html>`,
    // })

    const sendPostcard = async () => {
      try {
        await axios.post('http://1328e46b.ngrok.io/api/email', {
          recipient,
          frontImageFirebaseUrl,
          backImageFirebaseUrl,
        })
      } catch (err) {
        console.error('There was an issue sending your postcard.')
      }
    }

    sendPostcard()
  }

  render() {
    const {
      currentSide,
      imageData,
      isWriting,
      setSide,
      removeImage,
      removeImageFront,
      removeImageBack,
      toggleWriting,
      toggleSendModalVisible,
    } = this.props

    return (
      <View style={styles.root}>
        <SendModal />
        {imageData.imageUri &&
          <View style={styles.controls}>
            <React.Fragment>
              <TouchableOpacity onPress={() => {
                currentSide === 'front' ? setSide('back') : setSide('front')
                this.card.flip()
              }}>
                <Ionicons name="ios-swap" size={35} />
              </TouchableOpacity>
              {currentSide === 'back' ? (
                <TouchableOpacity>
                  <Ionicons name="ios-map" size={35} />
                </TouchableOpacity>
              ) : (
                <React.Fragment />
              )}
              <TouchableOpacity onPress={() => toggleWriting()}>
                <Ionicons name={isWriting ? ("md-save") : ("md-brush")} size={35} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ios-color-palette" size={35} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                  removeImage()
                  removeImageFront()
                  removeImageBack()
                  if (isWriting) toggleWriting()
                  if (currentSide === 'back') {
                    setSide('front')
                    this.card.flip()
                  }
              }}>
                <Ionicons name="ios-trash" size={35} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                // const recipient = 'beautyinfallingleaves@gmail.com'
                // this.handleSend(recipient)
                toggleSendModalVisible()
              }}>
                <Ionicons name="md-paper-plane" size={35} />
              </TouchableOpacity>
            </React.Fragment>
          </View>
        }
        <CardFlip style={styles.flipCard} flipZoom={0.5} ref={(card) => this.card = card} >
          <PostcardFront />
          <PostcardBack />
        </CardFlip>
      </View>
    )
  }
}

const mapState = state => {
  return {
    currentSide: state.currentSide,
    imageData: state.imageData,
    isWriting: state.isWriting,
    postcardFrontView: state.postcardFrontView,
    postcardBackView: state.postcardBackView,
    imagePostcardFront: state.imagePostcardFront,
    imagePostcardBack: state.imagePostcardBack,
    sendModalVisible: state.sendModalVisible,
  }
}

const mapDispatch = dispatch => {
  return {
    setSide: (side) => dispatch(setCurrentSide(side)),
    removeImage: () => dispatch(removeImageData()),
    removeImageFront: () => dispatch(removeImagePostcardFront()),
    removeImageBack: () => dispatch(removeImagePostcardBack()),
    toggleWriting: () => dispatch(toggleIsWriting()),
    setImageFront: (imageUri) => dispatch(setImagePostcardFront(imageUri)),
    setImageBack: (imageUri) => dispatch(setImagePostcardBack(imageUri)),
    toggleSendModalVisible: () => dispatch(toggleSendModalVisible()),
  }
}

export default connect(mapState, mapDispatch)(PostcardView)

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    backgroundColor: '#3FBFBF',
  },
  flipCard: {
    flex: 1,
  },
  controls: {
    width: 55,
    backgroundColor: 'white',
    borderRightColor: '#264A3A',
    borderRightWidth: 1,
    shadowOpacity: 0.25,
    shadowOffset: { width: 1, height: 1 },
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    margin: 10,
  }
});
