import * as React from 'react';
import { connect } from 'react-redux'
import { setCurrentSide } from '../store/currentSide'
import { removeImageData } from '../store/imageData'
import { toggleIsWriting } from '../store/isWriting'
import { setImagePostcardFront } from '../store/imagePostcardFront'
import { setImagePostcardBack } from '../store/imagePostcardBack'
import { removeImagePostcardFront } from '../store/imagePostcardFront'
import { removeImagePostcardBack } from '../store/imagePostcardBack'
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { captureRef as takeSnapshotAsync } from 'react-native-view-shot'
import CardFlip from 'react-native-card-flip'
import PostcardFront from './PostcardFront'
import PostcardBack from './PostcardBack'
import axios from 'axios'



class PostcardView extends React.Component {
  // FOR TESTING SNAPSHOTS ONLY
  setImagePostcardFront = async () => {
    const uri = await takeSnapshotAsync(this.props.postcardFrontView)
    this.props.setImageFront(uri)
  }

  setImagePostcardBack = async () => {
    const uri = await takeSnapshotAsync(this.props.postcardBackView)
    this.props.setImageBack(uri)
  }

  handleSend() {
    const sendPostcard = async () => {
      try {
        await axios.post('http://5d9bf357.ngrok.io/api/email')
      } catch (err) {
        console.error('There was an issue sending your postcard.')
      }
    }

    sendPostcard()
  }

  render() {
    const { currentSide, imageData, isWriting, setSide, removeImage, removeImageFront, removeImageBack, toggleWriting } = this.props

    return (
      <View style={styles.root}>
        <View style={styles.controls}>
          {imageData.imageUri &&
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
                  this.handleSend()
              }}>
                <Ionicons name="md-paper-plane" size={35} />
              </TouchableOpacity>
            </React.Fragment>
          }
        </View>
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
  }
}

export default connect(mapState, mapDispatch)(PostcardView)

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    backgroundColor: '#77CAA6',
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
