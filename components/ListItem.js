import React, {
  Component
} from 'react';
import {
  View,
  Text
} from 'react-native';
import styles from '../styles.js';

class ListItem extends Component {
  render() {
    // We are going to return a simple list item with just a title for now
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemTitle}>{this.props.task.name}</Text>
      </View>
    );
  }
}

module.exports = ListItem;
