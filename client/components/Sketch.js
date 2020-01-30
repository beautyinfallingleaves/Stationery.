import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import {
  Platform,
  AppState,
  StyleSheet,
  View
} from 'react-native'
import { Avatar } from 'react-native-elements'

const isAndroid = Platform.OS === 'android';
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default class Sketch extends Component {
  state = {
    image: null,
    strokeColor: 'black',
    strokeWidth: 4,
    appState: AppState.currentState,
  };

  handleAppStateChangeAsync = nextAppState => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      if (isAndroid && this.sketch) {
        this.setState({ appState: nextAppState, id: uuidv4(), lines: this.sketch.lines })
        return
      }
    }
    this.setState({ appState: nextAppState })
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChangeAsync)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChangeAsync)
  }

  onChangeAsync = async () => {
    const { uri } = await this.sketch.takeSnapshotAsync()

    this.setState({
      image: { uri },
    });
  };

  onReady = () => {
    console.log('Sketching Ready')
  };

  render() {
    return (
      <View style={styles.container}>
        <ExpoPixi.Sketch
          ref={sketch => (this.sketch = sketch)}
          style={styles.sketch}
          strokeColor={this.state.strokeColor}
          strokeWidth={this.state.strokeWidth}
          strokeAlpha={1}
          onChange={this.onChangeAsync}
          onReady={this.onReady}
        />
        {this.state.image &&
          <Avatar
            onPress={() => {this.sketch.undo()}}
            rounded
            icon={{
              name: 'undo',
              color: 'black',
              type: 'font-awesome'
            }}
            overlayContainerStyle={{
              backgroundColor: 'white',
            }}
            containerStyle={{
              position: 'absolute',
              top: 20,
              left: 20,
              borderColor: 'black',
              shadowOpacity: 0.5,
              shadowOffset: { width: 1, height: 1 },
            }}
          />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  sketch: {
    flex: 1,
  },
  undoDraw: {
    alignSelf: 'flex-start',
    zIndex: 1,
    padding: 12,
    minWidth: 35,
    minHeight: 35,
  },
})
