import * as React from 'react';
import { StyleSheet, Button, Image, View, ImageBackground } from 'react-native';
import { ScreenOrientation } from 'expo'
import MapView, { Marker } from 'react-native-maps'
import { Divider, Text } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { Sketch } from './'

class Postcard extends React.Component {
  constructor() {
    super()
    this.state = {
      writing: true
    }
  }

  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE)
  }

  render() {
    const {longitude, latitude} = this.props

    return (
      <ImageBackground source={require('../../assets/bkgd_table.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={styles.root}>
            <View style={styles.postcard}>
              <View style={styles.mapArea}>
                <MapView
                  style={styles.mapStyle}
                  scrollEnabled={false}
                  initialRegion={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                  }}
                >
                  <Marker
                    coordinate={{latitude,
                      longitude}}
                  />
                </MapView>
              </View>
              <View style={styles.textArea}>
                <Image source={require('../../assets/post_stamp.png')} style={{width: 150, height: 150, alignSelf: 'flex-end'}} />
                <View style={styles.textAreaDividerArea}>
                  <Text>{'\n'}</Text>
                  <Divider style={styles.divider} />
                  <Text>{'\n'}</Text>
                  <Divider style={styles.divider} />
                  <Text>{'\n'}</Text>
                  <Divider style={styles.divider} />
                  <Text>{'\n'}</Text>
                  <Divider style={styles.divider} />
                  <Text>{'\n'}</Text>
                  <Divider style={styles.divider} />
                </View>
              </View>
              {this.state.writing &&
                <Sketch />
              }
            </View>
            <View style={styles.controls}>
              <Text>Some controls!</Text>
              <Ionicons name='md-undo' size={32} color='white' />
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
    // backgroundColor: '#996633',

  },
  postcard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRightColor: 'gray',
    borderRightWidth: 1,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    margin: 10,
    shadowOpacity: 0.75,
    shadowOffset: { width: 2, height: 2 },
  },
  textArea: {
    flex: 1,
    margin: 5,
    padding: 3,
    borderLeftColor: 'gray',
    borderLeftWidth: 1,
  },
  textAreaDividerArea: {
    flex: 1,
    margin: 20,
  },
  divider: {
    backgroundColor: 'gray',
  },
  mapArea: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRightColor: 'gray',
    borderRightWidth: 1,
  },
  mapStyle: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
  },
  controls: {
    width: '10%',
  }
});

export default Postcard
