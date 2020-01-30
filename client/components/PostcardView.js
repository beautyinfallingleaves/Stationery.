import * as React from 'react';
import { connect } from 'react-redux'
import { setCurrentSide } from '../store/currentSide'
import { removeImageData } from '../store/imageData'
import { toggleIsWriting } from '../store/isWriting'
import { removeImagePostcardFront } from '../store/imagePostcardFront'
import { removeImagePostcardBack } from '../store/imagePostcardBack'
import { toggleSendModalVisible } from '../store/sendModalVisible'
import { toggleMapVisible } from '../store/mapVisible'
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import CardFlip from 'react-native-card-flip'
import PostcardFront from './PostcardFront'
import PostcardBack from './PostcardBack'
import SendModal from './SendModal'

class PostcardView extends React.Component {
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
      mapVisible,
      toggleMapVisible,
    } = this.props

    return (
      <View style={styles.root}>
        <LinearGradient
          colors={['#0FAD98', '#ACF5F5']}
          start={[0.3, 1]}
          end={[0.9, 0]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%',
            width: '100%',
          }}
        />

        <SendModal />

        {imageData.imageUri &&
          <View style={styles.controls}>
            <React.Fragment>
              <TouchableOpacity onPress={() => {
                currentSide === 'front' ? setSide('back') : setSide('front')
                this.card.flip()
              }}>
                <Ionicons name='ios-swap' size={35} />
              </TouchableOpacity>
              {currentSide === 'back' ? (
                <TouchableOpacity onPress={toggleMapVisible}>
                  <FontAwesome
                    name={mapVisible ? ('map-o') : ('map')}
                    size={27}
                  />
                </TouchableOpacity>
              ) : (
                <React.Fragment />
              )}
              <TouchableOpacity onPress={toggleWriting}>
                {isWriting ? (
                  <MaterialIcons name='layers-clear' size={39} />
                ) : (
                  <Ionicons name='md-brush' size={35} />
                )}
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name='ios-color-palette' size={35} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                  if (!mapVisible) toggleMapVisible()
                  removeImage()
                  removeImageFront()
                  removeImageBack()
                  if (isWriting) toggleWriting()
                  if (currentSide === 'back') {
                    setSide('front')
                    this.card.flip()
                  }
              }}>
                <Ionicons name='ios-trash' size={35} />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleSendModalVisible}>
                <Ionicons name='md-paper-plane' size={35} />
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
    sendModalVisible: state.sendModalVisible,
    mapVisible: state.mapVisible,
  }
}

const mapDispatch = dispatch => {
  return {
    setSide: (side) => dispatch(setCurrentSide(side)),
    removeImage: () => dispatch(removeImageData()),
    removeImageFront: () => dispatch(removeImagePostcardFront()),
    removeImageBack: () => dispatch(removeImagePostcardBack()),
    toggleWriting: () => dispatch(toggleIsWriting()),
    toggleSendModalVisible: () => dispatch(toggleSendModalVisible()),
    toggleMapVisible: () => dispatch(toggleMapVisible())
  }
}

export default connect(mapState, mapDispatch)(PostcardView)

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    width: '100%',
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
