/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  ToolbarAndroid
} from 'react-native';
import * as firebase from 'firebase';
import ListItem from './components/ListItem.js';
import styles from './styles.js'

// Initialize Firebase (unused for now)
var config = {
  apiKey: "AIzaSyBGu_h0hiNve4xB-_xfKQSh4depfFUmodg",
  authDomain: "fir-userauth-90a85.firebaseapp.com",
  databaseURL: "https://fir-userauth-90a85.firebaseio.com",
  storageBucket: "fir-userauth-90a85.appspot.com",
};
const firebaseApp = firebase.initializeApp(config);

class RNFirebaseListView extends Component {

  constructor(props) {
    super(props);
    // Each list must has a dataSource, to set that data for it you must call: cloneWithRows()
    // Check out the docs on the React Native List View here:
    // https://facebook.github.io/react-native/docs/listview.html
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: dataSource.cloneWithRows([
        { name: 'Sleep' }, { name: 'Eat' }, { name: 'Code' },
        { name: 'Sleep' }, { name: 'Eat' }, { name: 'Code' },
        { name: 'Sleep' }, { name: 'Eat' }, { name: 'Code' },
        { name: 'Sleep' }, { name: 'Eat' }, { name: 'Code' }])
    };
  }

  render() {
    return (
      <View style={styles.container}>
  			<ToolbarAndroid
          style={styles.navbar}
          title="Todo List" />
        {/*A list view with our dataSource and a method to render each row*/}
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listView}/>
      </View>
    );
  }

  _renderItem(task) {
    // a method for building each list item
    return (
      <ListItem task={task} />
    );
  }
}

AppRegistry.registerComponent('RNFirebaseListView', () => RNFirebaseListView);
