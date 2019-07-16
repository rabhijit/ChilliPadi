import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
    Container,
    Text,
    Header,
    Left,
    Right,
    Button,
    Icon
} from "native-base";
import NavigationManager from "../managers/navigationManager";
import { Avatar } from "react-native-elements";

/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/
export default class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
      thisAccount: this.props.account
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

  shortNameCreator() {
    let name = this.state.thisAccount.name;
    let noWords = name.split(" ").length;
    //console.warn(name.split(" "));
    if (noWords == 1) {
      return name.substring(0, 2);
    }
    else {
      let displayName = '';
      for (let i = 0; i < 2; i++) {
        displayName += (name.split(" "))[i][0];
      }
      return displayName;
    }

  }

  render() {
    /*
    JS Expressions here
    -> to pass state data here
    -> to access data of array etc
    */

    // Notice JSX - a html-JS like syntax is within ()

    // find better way to code LOGO size

    return (
      <Header style={{ backgroundColor: "white" }}
          androidStatusBarColor="white">
          <Left style={{ flex: 1, flexDirection: "row"}}>
              <Button transparent>
                  {/*<Icon type="FontAwesome" name="user-circle" style={{color: "maroon"}}/> */}
                  <Avatar rounded title={this.shortNameCreator()} />
              </Button>
          </Left>
          <View style={{justifyContent: "center"}}>
            <TouchableOpacity onPress={() => NavigationManager.navigate("HomePage")}>
              <Image style={{width: 42}} resizeMode="center" source={require("./../assets/images/logo.jpg")} />
            </TouchableOpacity>
          </View>
          <Right>
              <Button transparent onPress={() => NavigationManager.navigate("MessagePage", {thisAccount: this.state.thisAccount})}>
                  <Icon type="AntDesign" name="message1"
                        style={{color:"maroon"}}
                    />
              </Button>
          </Right>
      </Header>
    );
  }
}

/*
//Internal StyleSheet here
*/

module.export = MyHeader; //module export statement
