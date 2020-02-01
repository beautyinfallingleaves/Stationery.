import * as React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import CardFlip from 'react-native-card-flip'
import Controls from './Controls'
import SendModal from './SendModal'
import PostcardFront from './PostcardFront'
import PostcardBack from './PostcardBack'

class PostcardView extends React.Component {
  render() {
    const { imageData } = this.props

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
          <Controls card={this.card} />}

        <CardFlip
          style={styles.flipCard}
          flipZoom={0.5}
          ref={(card) => this.card = card}
        >
          <PostcardFront />
          <PostcardBack />
        </CardFlip>
      </View>
    )
  }
}

const mapState = state => {
  return {
    imageData: state.imageData,
  }
}

export default connect(mapState)(PostcardView)

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
  icon: {
    margin: 10,
  }
});
