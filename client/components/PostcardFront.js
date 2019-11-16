import * as React from 'react';
import { StyleSheet, View } from 'react-native'
import { Link } from 'react-router-native'
import { ScreenOrientation } from 'expo'
import { Text } from 'react-native-elements'

class PostcardFront extends React.Component {
  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE)
  }

  render() {
    return (
      <View style={styles.postcard}>
        <Text>Looking at the front!</Text>
        <Link to='/PostcardBack'><Text>{'\n\n'}Look at the back now!</Text></Link>
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
