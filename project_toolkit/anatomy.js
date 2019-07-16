import React, { Component } from "react";
import { View } from "react-native";
import { Container, Text } from "native-base";
/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/
export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
    };
  }
  /*
    React LifeCycle Methods: 
    e.g. componentWillMount(),
         componentDidMount
         
    additional JS functions 
    -> to change the state of component,
    -> call API to pass and receive data from backend
    -> any other functions etc.
  */

  render() {
    /*
    JS Expressions here
    -> to pass state data here
    -> to access data of array etc
    */

    // Notice JSX - a html-JS like syntax is within ()
    return (
      <Container>
        <View>
          <Text>A Component</Text>
        </View>
      </Container>
    );
  }
}

/*
//Internal StyleSheet here
*/

module.export = MyComponent; //module export statement
