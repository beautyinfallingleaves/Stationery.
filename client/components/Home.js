import * as React from 'react'
import { Text } from 'react-native'
import { Link } from 'react-router-native'

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Text>Home</Text>
        <Link to="/PostcardView"><Text>{'\n\n'}Postcard</Text></Link>
        <Link to="/ImagePickerExample"><Text>{'\n\n'}Image Picker</Text></Link>
      </React.Fragment>

    )
  }
}

export default Home
