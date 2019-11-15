import * as React from 'react';
import { StyleSheet, View } from 'react-native'
import * as MagicMove from 'react-native-magic-move'
import { ScreenOrientation } from 'expo'
import { Text } from 'react-native-elements'

class PostcardFront extends React.Component {
  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE)
  }

  render() {
    return (
        <MagicMove.View
          id="postcardMagicView"
          style={styles.postcard}
          duration={400}
          transition={MagicMove.Transition.flip.x}
        >
          <Text>Looking at the front!</Text>
        </MagicMove.View>
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
    padding: 5,
    shadowOpacity: 0.75,
    shadowOffset: { width: 2, height: 2 },
  },
})

export default PostcardFront
