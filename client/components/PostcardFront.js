import * as React from 'react';
import { StyleSheet, View } from 'react-native'
import { ScreenOrientation } from 'expo'
import { Text } from 'react-native-elements'
import { Sketch, ChoosePhoto } from './'

class PostcardFront extends React.Component {
  constructor() {
    super()
    this.state = {
      writing: false,
    }
  }

  render() {
    return (
      <View style={styles.postcard}>
        <ChoosePhoto />
        {this.state.writing &&
          <Sketch />
        }
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
    padding: 5,
    shadowOpacity: 0.75,
    shadowOffset: { width: 2, height: 2 },
  },
})

export default PostcardFront
