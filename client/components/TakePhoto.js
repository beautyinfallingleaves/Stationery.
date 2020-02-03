import React from 'react'
import { connect } from 'react-redux'
import { toggleTakingPhoto } from '../store/takingPhoto'
import { Text, View, TouchableOpacity } from 'react-native'
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
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                this.setState({
                  type: this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                })
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={this.takePhoto}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Snap </Text>
            </TouchableOpacity>
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
