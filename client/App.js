import React from 'react';
import { ScreenOrientation } from 'expo'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import store from './store'
import PostcardView from './components/PostcardView'
import { firebaseConfig } from '../constants/ApiConfig'
import * as firebase from 'firebase'

class App extends React.Component {
  constructor() {
    super()

    // initialize firebase
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)
  }

  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
  }

  render() {
    return (
      <Provider store={store}>
        <StatusBar hidden />
        <PostcardView />
      </Provider>
    )
  }
}

export default App
