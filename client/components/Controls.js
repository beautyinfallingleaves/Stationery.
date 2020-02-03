import * as React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native';
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { setCurrentSide } from '../store/currentSide'
import { removeImageData } from '../store/imageData'
import { toggleIsWriting } from '../store/isWriting'
import { removeImagePostcardFront } from '../store/imagePostcardFront'
import { removeImagePostcardBack } from '../store/imagePostcardBack'
import { toggleSendModalVisible } from '../store/sendModalVisible'
import { toggleMapVisible } from '../store/mapVisible'

const Controls = (props) => {
  const {
    card,
    currentSide,
    isWriting,
    setCurrentSide,
    removeImageData,
    removeImagePostcardFront,
    removeImagePostcardBack,
    toggleIsWriting,
    toggleSendModalVisible,
    mapVisible,
    toggleMapVisible,
  } = props

  function handleFlip() {
    currentSide === 'front' ? setCurrentSide('back') : setCurrentSide('front')
    card.flip()
  }

  function handleTrash() {
    if (!mapVisible) toggleMapVisible()
    removeImageData()
    removeImagePostcardFront()
    removeImagePostcardBack()
    if (isWriting) toggleIsWriting()
    if (currentSide === 'back') {
      setCurrentSide('front')
      card.flip()
    }
  }

  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={handleFlip}>
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
      <TouchableOpacity onPress={toggleIsWriting}>
        {isWriting ? (
          <MaterialIcons name='layers-clear' size={39} />
        ) : (
          <Ionicons name='md-brush' size={35} />
        )}
      </TouchableOpacity>
      {/* <TouchableOpacity>
        <Ionicons name='ios-color-palette' size={35} />
      </TouchableOpacity> */}
      <TouchableOpacity onPress={handleTrash}>
        <Ionicons name='ios-trash' size={35} />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleSendModalVisible}>
        <Ionicons name='md-paper-plane' size={35} />
      </TouchableOpacity>
    </View>
  )
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
    setCurrentSide: (side) => dispatch(setCurrentSide(side)),
    removeImageData: () => dispatch(removeImageData()),
    removeImagePostcardFront: () => dispatch(removeImagePostcardFront()),
    removeImagePostcardBack: () => dispatch(removeImagePostcardBack()),
    toggleIsWriting: () => dispatch(toggleIsWriting()),
    toggleSendModalVisible: () => dispatch(toggleSendModalVisible()),
    toggleMapVisible: () => dispatch(toggleMapVisible())
  }
}

export default connect(mapState, mapDispatch)(Controls)

const styles = StyleSheet.create({
  root: {
    width: '10%',
    backgroundColor: 'white',
    borderRightColor: '#264A3A',
    borderRightWidth: 1,
    shadowOpacity: 0.25,
    shadowOffset: { width: 1, height: 1 },
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
