import React from 'react';
import { StatusBar } from 'react-native'
import { PostcardView } from './client/components'
import { Provider } from 'react-redux'
import store from './client/store'
// import { NativeRouter, Route } from 'react-router-native'

export default function App() {
  return (
    // <NativeRouter>
    //   <Route exact path='/' component={Home} />
    //   <Route path='/PostcardView' component={PostcardView} />
    //   <Route path='/ImagePickerExample' component={ImagePickerExample} />
    // </NativeRouter>

    <Provider store={store}>
      <StatusBar hidden />
      <PostcardView />
    </Provider>
  );
}
