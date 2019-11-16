import * as React from 'react'
import { Text, StyleSheet, View } from 'react-native'

class Home extends React.Component {
  render() {
    return (
      <View style={styles.postcard}>
        <Text>Stationery</Text>
        <Text>Press anywhere to start a card!</Text>
      </View>
    )
  }
}

export default Home

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
