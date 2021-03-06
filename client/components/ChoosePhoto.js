import * as React from 'react';
import {connect} from 'react-redux'
import {setImageData} from '../store/imageData'
import {toggleTakingPhoto} from '../store/takingPhoto'
import { StyleSheet, View, Text } from 'react-native';
import * as Font from 'expo-font'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Ionicons, Entypo } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import TakePhoto from './TakePhoto'
import { processPhotoData } from '../utils'

class ChoosePhoto extends React.Component {
  constructor() {
    super()

    this.state = {
      fontLoaded: false,
    }
  }
  async componentDidMount() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    // Load typewriter font
    await Font.loadAsync({
      'typewriter': require('../../assets/atwriter.ttf')
    })

    this.setState({ fontLoaded: true })
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
      exif: true,
    });

    if (!result.cancelled) processPhotoData(result)
  }

  render() {
    const { takingPhoto, toggleTakingPhoto } = this.props

    return (
      <React.Fragment>
        {takingPhoto ? (
          <TakePhoto />
        ) : (
          <View style={styles.container}>
            {this.state.fontLoaded &&
              <Text
                style={{fontSize: 64,
                fontFamily: 'typewriter'
              }}>
                Stationery.
              </Text>
            }
            <View style={styles.takeOrChoosePhoto}>
              <TouchableOpacity onPress={this._pickImage}>
                <Ionicons name="md-images" size={75} />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleTakingPhoto}>
                <Entypo name="camera" size={65} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </React.Fragment>
    )
  }
}

const mapState = state => {
  return {
    takingPhoto: state.takingPhoto,
  }
}

const mapDispatch = dispatch => {
  return {
    toggleTakingPhoto: () => dispatch(toggleTakingPhoto()),
    setImage: (imageData) => dispatch(setImageData(imageData)),
  }
}

export default connect(mapState, mapDispatch)(ChoosePhoto)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  takeOrChoosePhoto: {
    marginTop: 40,
    width: 230,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
