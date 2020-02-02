import * as React from 'react';
import { connect } from 'react-redux'
import { setPostcardFrontView } from '../store/postcardFrontView'
import { StyleSheet, View, Image } from 'react-native'
import Sketch from './Sketch'
import ChoosePhoto from './ChoosePhoto'
import TakePhoto from './TakePhoto'

class PostcardFront extends React.Component {
  componentDidMount() {
    this.props.setFrontView(this.postcardFront)
  }

  render() {
    const { imageData, isWriting } = this.props
    const { imageUri } = imageData

    return (
      <View
        style={styles.postcard}
        collapsable={false}
        ref={view => (this.postcardFront = view)}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <ChoosePhoto />
        )}
        {isWriting &&
          <Sketch />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  postcard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRightColor: 'gray',
    borderRightWidth: 1,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    margin: 10,
    padding: 1,
    shadowOpacity: 0.75,
    shadowOffset: { width: 2, height: 2 },
  },
})

const mapState = state => {
  return {
    imageData: state.imageData,
    isWriting: state.isWriting,
  }
}

const mapDispatch = dispatch => {
  return {
    setFrontView: (viewObj) => dispatch(setPostcardFrontView(viewObj))
  }
}

export default connect(mapState, mapDispatch)(PostcardFront)
