import * as React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Image, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { Divider, Text } from 'react-native-elements'
import Sketch from './Sketch'

class PostcardBack extends React.Component {
  render() {
    const { imageData, isWriting } = this.props
    const latitude = imageData.latitude || 41.89555
    const longitude = imageData.longitude || -87.638925

    return (
      <View style={styles.postcard}>
        <View style={styles.mapArea}>
          <MapView
            style={styles.mapStyle}
            scrollEnabled={true}
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
        {isWriting &&
          <Sketch />
        }
      </View>
    )
  }
}

const mapState = state => {
  return {
    isWriting: state.isWriting,
    imageData: state.imageData,
  }
}

export default connect(mapState)(PostcardBack)

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
  textArea: {
    flex: 1,
    margin: 5,
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
  },
  mapStyle: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

