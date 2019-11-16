import * as React from 'react';
import { connect } from 'react-redux'
import { toggleIsWriting } from '../store/isWriting'
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import CardFlip from 'react-native-card-flip'
import PostcardFront from './PostcardFront'
import PostcardBack from './PostcardBack'

class PostcardView extends React.Component {
  render() {
    const { toggleWriting } = this.props

    return (
      <View style={styles.root}>
        <View style={styles.controls}>
          <TouchableOpacity onPress={() => this.card.flip()}>
            <Ionicons name="ios-swap" size={35} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ios-map" size={35} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleWriting()}>
            <Ionicons name="md-brush" size={35} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ios-color-palette" size={35} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ios-trash" size={35} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="md-paper-plane" size={35} />
          </TouchableOpacity>
        </View>
        <CardFlip style={styles.flipCard} flipZoom={0.5} ref={(card) => this.card = card} >
          <PostcardFront />
          <PostcardBack />
        </CardFlip>
      </View>
    )
  }
}


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

const mapState = state => {
  return {
    isWriting: state.isWriting
  }
}

const mapDispatch = dispatch => {
  return {
    toggleWriting: () => dispatch(toggleIsWriting())
  }
}

export default connect(mapState, mapDispatch)(PostcardView)
