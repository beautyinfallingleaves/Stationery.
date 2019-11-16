import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { ScreenOrientation } from 'expo'
import { Text } from 'react-native-elements'
import { PostcardFront, PostcardBack } from './'
import { Ionicons } from '@expo/vector-icons'
import CardFlip from 'react-native-card-flip'

class PostcardView extends React.Component {
  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE)
  }

  render() {
    return (
      <View style={styles.root}>
        <CardFlip style={styles.flipCard} ref={(card) => this.card = card} >
          <PostcardFront />
          <PostcardBack />
        </CardFlip>
        <View style={styles.controls}>
          <Text>Some controls!</Text>
          <Button title="FLIP" onPress={() => this.card.flip()} />
        </View>
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
    backgroundColor: '#B2784C',
  },
  flipCard: {
    flex: 1,
  },
  controls: {
    width: '10%',
  }
});

export default PostcardView
