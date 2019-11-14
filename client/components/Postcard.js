import * as React from 'react';
import { StyleSheet, Button, Image, View, Dimensions } from 'react-native';
import { ScreenOrientation } from 'expo'
import MapView, { Marker } from 'react-native-maps'
import { Divider, Text } from 'react-native-elements'

class Postcard extends React.Component {


  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE)
  }

  render() {
    // TESTING ONLY
    const latitude = 41.34
    const longitude = -87.58

    return (
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
            <Image source={require('../../assets/post_stamp.png')} style={{width: 125, height: 125, alignSelf: 'flex-end'}} />
            <View style={styles.textAreaDividerArea}>
              <Text h4> </Text>
              <Divider style={styles.divider} />
              <Text h4> </Text>
              <Divider style={styles.divider} />
              <Text h4> </Text>
              <Divider style={styles.divider} />
              <Text h4> </Text>
              <Divider style={styles.divider} />
              <Text h4> </Text>
              <Divider style={styles.divider} />
              <Text h4> </Text>
              <Divider style={styles.divider} />
            </View>
          </View>
        </View>
        <View style={styles.controls}>
          <Text>Some controls!</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    backgroundColor: '#996633',
  },
  postcard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRightColor: 'gray',
    borderRightWidth: 1,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    margin: 5,
    shadowColor: 'dark-gray',
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
    backgroundcolor: 'gray',
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
    width: '7%',
  }
});

export default Postcard
