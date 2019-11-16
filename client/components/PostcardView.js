import * as React from 'react';
import { StyleSheet, View, ImageBackground, Button } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native'
import { ScreenOrientation } from 'expo'
import { Text } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { Sketch, PostcardFront, PostcardBack, ImagePickerExample } from '.'

class PostcardView extends React.Component {
  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE)
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/bkgd_table.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={styles.root}>
          <NativeRouter>
            <Route exact path='/' component={PostcardFront} />
            <Route path='/PostcardFront' component={PostcardFront} />
            <Route path='/PostcardBack' component={PostcardBack} />
          </NativeRouter>
          <View style={styles.controls}>
            <Text>Some controls!</Text>
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
    width: '100%',
  },
  controls: {
    width: '10%',
  }
});

export default PostcardView
