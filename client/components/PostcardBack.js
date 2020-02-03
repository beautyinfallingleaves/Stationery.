import * as React from 'react';
import { connect } from 'react-redux'
import { setPostcardBackView } from '../store/postcardBackView'
import { StyleSheet, Image, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { Divider, Text } from 'react-native-elements'
import Sketch from './Sketch'

class PostcardBack extends React.Component {
  componentDidMount() {
    this.props.setBackView(this.postcardBack)
  }

  render() {
    const {
      imageData,
      isWriting,
      mapVisible,
    } = this.props
    const latitude = imageData.latitude || 41.89555
    const longitude = imageData.longitude || -87.638925
    console.log('lat:', latitude, 'lon:', longitude)

    return (
      <View
        style={styles.postcard}
        collapsable={false}
        ref={view => (this.postcardBack = view)}
      >
        <View style={styles.mapArea}>
          {mapVisible &&
            <MapView
              style={styles.mapStyle}
              scrollEnabled={true}
              region={{
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
          }
        </View>
        <View style={styles.textArea}>
          <Image
            source={require('../../assets/post_stamp.png')}
            style={styles.stamp}
          />
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
    mapVisible: state.mapVisible,
  }
}

const mapDispatch = dispatch => {
  return {
    setBackView: (viewObj) => dispatch(setPostcardBackView(viewObj))
  }
}

export default connect(mapState, mapDispatch)(PostcardBack)

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
  stamp: {
    width: 150,
    height: 150,
    alignSelf: 'flex-end'
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

