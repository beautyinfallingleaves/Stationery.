import * as React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import * as MagicMove from 'react-native-magic-move'
import { ScreenOrientation } from 'expo'
import { Text, Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { Sketch, PostcardFront, PostcardBack } from './'

class Postcard extends React.Component {
  constructor() {
    super()
    this.state = {
      writing: true,
      postcardSide: 'front'
    }
    this.handleSideChange = this.handleSideChange.bind(this)
  }

  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE)
  }

  handleSideChange() {
    this.setState({
      postcardSide: this.state.postcardSide === 'front' ? 'back' : 'front',
    })
  }

  render() {
    const {longitude, latitude} = this.props

    return (
      <ImageBackground source={require('../../assets/bkgd_table.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={styles.root}>
          <MagicMove.Scene>
            {this.state.postcardSide === 'front' ? (
              <PostcardFront />
            ) : (
              <PostcardBack latitude={latitude} longitude={longitude} />
            )}
            {this.state.writing &&
              <Sketch />
            }
          </MagicMove.Scene>
          <View style={styles.controls}>
            <Text>Some controls!</Text>
            <Button onPress={this.handleSideChange}>Flip</Button>
          </View>
        </View>
      </ImageBackground>
    )
  }
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    width: '100%'
  },
  controls: {
    width: '10%',
  }
});

export default Postcard
