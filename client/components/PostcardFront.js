import * as React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import Sketch from './Sketch'
import ChoosePhoto from './ChoosePhoto'

class PostcardFront extends React.Component {
  render() {
    const { isWriting } = this.props

    return (
      <View style={styles.postcard}>
        <ChoosePhoto />
        {isWriting &&
          <Sketch />
        }
      </View>
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
    padding: 1,
    shadowOpacity: 0.75,
    shadowOffset: { width: 2, height: 2 },
  },
})

const mapState = state => {
  return {
    isWriting: state.isWriting,
  }
}

export default connect(mapState)(PostcardFront)
