import * as React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import * as MagicMove from 'react-native-magic-move'
import { ScreenOrientation } from 'expo'
import MapView, { Marker } from 'react-native-maps'
import { Divider, Text } from 'react-native-elements'

class PostcardBack extends React.Component {
  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE)
  }

  render() {
    const {longitude, latitude} = this.props

    return (
      <MagicMove.View
        id="postcardMagicView"
        style={styles.postcard}
        duration={400}
        transition={MagicMove.Transition.flip.x}
      >
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
      </MagicMove.View>
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

export default PostcardBack