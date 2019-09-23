import React, {Component} from 'react';

import {View, Text} from 'react-native';

export default class Main extends Component {
  static navigationOptions = {
    title: 'React-Native',
  };

  render() {
    return (
      <View>
        <Text>Página Main</Text>
      </View>
    );
  }
}
