import React from 'react';
// import { NativeRouter, Route } from 'react-router-native'
import { StatusBar } from 'react-native'
import {PostcardView} from './client/components'

export default function App() {
  return (
    // <NativeRouter>
    //   <Route exact path='/' component={Home} />
    //   <Route path='/PostcardView' component={PostcardView} />
    //   <Route path='/ImagePickerExample' component={ImagePickerExample} />
    // </NativeRouter>

    <React.Fragment>
      <StatusBar hidden />
      <PostcardView />
    </React.Fragment>
  );
}
