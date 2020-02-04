import React from 'react'
import { connect } from 'react-redux'
import { toggleTakingPhoto } from '../store/takingPhoto'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import { processPhotoData } from '../utils'

class TakePhoto extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasCameraPermission: null,
      hasLocationPermission: null,
      type: Camera.Constants.Type.back,
      location: null,
    }
  }

  async componentDidMount() {
    const cameraResult = await Permissions.askAsync(Permissions.CAMERA)
    const cameraStatus = cameraResult.status

    const locationResult = await Permissions.askAsync(Permissions.LOCATION)
    const locationStatus = locationResult.status

    const location = await Location.getCurrentPositionAsync({})

    this.setState({
      hasCameraPermission: cameraStatus === 'granted',
      hasLocationPermission: locationStatus  === 'granted',
      location,
    })
  }

  takePhoto = async () => {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync({
        quality: 1,
        exif: true,
      })

      // process location to add to photo
      const { location } = this.state
      const { latitude, longitude } = location.coords
      photo.exif.GPSLatitude = latitude
      photo.exif.GPSLongitude = longitude

      processPhotoData(photo)
      this.props.toggleTakingPhoto()
    }
  }

  render() {
    if (this.state.hasCameraPermission === null) {
      return <Text>Waiting for permission to access camera</Text>
    }

    if (this.state.hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    }

    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={this.state.type}
          ref={ref => {
            this.camera = ref
          }}
        >
          <View
            style={styles.buttonContainer}>
            <Avatar
              onPress={() => {
                this.setState({
                  type: this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                })
              }}
              rounded
              size='medium'
              icon={{
                name: 'ios-reverse-camera',
                color: 'black',
                type: 'ionicon',
                size: 35,
              }}
              overlayContainerStyle={{
                backgroundColor: 'white',
              }}
              containerStyle={styles.flipButton}
            />
            <Avatar
              onPress={this.takePhoto}
              rounded
              size='medium'
              overlayContainerStyle={{
                backgroundColor: 'red',
              }}
              containerStyle={styles.takePhotoButton}
            />
          </View>
        </Camera>
      </View>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    toggleTakingPhoto: () => dispatch(toggleTakingPhoto()),
  }
}

export default connect(null, mapDispatch)(TakePhoto)

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  flipButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    borderColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 1 },
  },
  takePhotoButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderColor: 'white',
    borderWidth: 4,
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 1 },
  }
})
