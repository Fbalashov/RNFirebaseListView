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
  TextInput,
  View,
  ListView,
  ToolbarAndroid
} from 'react-native';
import * as firebase from 'firebase';
import ListItem from './components/ListItem.js';
import styles from './styles.js'
import FloatingActionButton from 'react-native-action-button';

// Initialize Firebase (unused for now)
var config = {
  apiKey: "AIzaSyAPore7FNzkaUf4ayA8aSmQYoBZ3W3r1Zk",
  authDomain: "rnlistview.firebaseapp.com",
  databaseURL: "https://rnlistview.firebaseio.com",
  storageBucket: "rnlistview.appspot.com",
};
const firebaseApp = firebase.initializeApp(config);

class RNFirebaseListView extends Component {

  constructor(props) {
    super(props);
    this.tasksRef = firebaseApp.database().ref();
    // Each list must has a dataSource, to set that data for it you must call: cloneWithRows()
    // Check out the docs on the React Native List View here:
    // https://facebook.github.io/react-native/docs/listview.html
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: dataSource, // dataSource for our list
      newTask: "" // The name of the new task
    };
  }

  componentDidMount() {
    // start listening for firebase updates
    this.listenForTasks(this.tasksRef);
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
          enableEmptySections={true}
          renderRow={this._renderItem.bind(this)}
          style={styles.listView}/>
        <TextInput
           value={this.state.newTask}
           style={styles.textEdit}
           onChangeText={(text) => this.setState({newTask: text})}
           placeholder="New Task"
         />
        <FloatingActionButton
          hideShadow={true}
          buttonColor="rgba(231,76,60,1)"
          onPress={this._addTask.bind(this)}/>
      </View>
    );
  }

  _renderItem(task) {
    // a method for building each list item
    return (
      <ListItem task={task} />
    );
  }

  _addTask() {
    if (this.state.newTask === "") {
      return;
    }
    this.tasksRef.push({ name: this.state.newTask});
    this.setState({newTask: ""});
  }

  listenForTasks(tasksRef) {
    // listen for changes to the tasks reference, when it updates we'll get a
    // dataSnapshot from firebase
    tasksRef.on('value', (dataSnapshot) => {
      // transform the children to an array
      var tasks = [];
      dataSnapshot.forEach((child) => {
        tasks.push({
          name: child.val().name,
          _key: child.key
        });
      });

      // Update the state with the new tasks
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(tasks)
      });
    });
  }
}

AppRegistry.registerComponent('RNFirebaseListView', () => RNFirebaseListView);
