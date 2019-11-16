import * as React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Link } from 'react-router-native'
import { ScreenOrientation } from 'expo'

class Home extends React.Component {
  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <Link to="/PostcardView"><Text>{'\n\n'}Postcard</Text></Link>
        <Link to="/ImagePickerExample"><Text>{'\n\n'}Image Picker</Text></Link>
      </View>
    )
  }
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B2784C',
  },
})
