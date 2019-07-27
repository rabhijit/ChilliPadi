import React, { Component } from "react";
import { View, Image, TouchableOpacity, Dimensions } from "react-native";
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
import { Avatar, Overlay } from "react-native-elements";

/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
      user: this.props.user,
      isOverlayVisible: false
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
    let name = this.state.user.name;
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

    function MyAvatar(props) {
      if (props.user.dp == "null") {
        return <Avatar size={props.size} rounded title={props.func} />
      }
      else {
        return <Avatar size={props.size} rounded source={{uri: props.user.dp}} />
      }
    }

    return (
      <View>
      <Overlay onBackdropPress={() => this.setState({isOverlayVisible: false})} isVisible={this.state.isOverlayVisible} width={(8.8/10)*deviceWidth} height={(5.8/10)*deviceHeight}>
        <View style={{padding: 5, justifyContent: "space-evenly", alignItems: "center"}}>
          <MyAvatar size="xlarge" func={this.shortNameCreator()} user={this.state.user}/>
          <Text style={{fontFamily: "Montserrat-Bold", fontSize: 20}}>{this.state.user.name}, {this.state.user.age}</Text>
          <Text style={{fontFamily: "Montserrat-Italic", fontSize: 13}}>{this.state.user.fac}</Text>
          <View style={{paddingTop: 10}}>
            <Button style={{alignSelf: "center", flexDirection: "row", backgroundColor: "maroon", justifyContent: "center"}}>
                <Text style={{fontFamily: "Montserrat-Bold", fontSize: 15, color: "white"}}>View and edit profile</Text>
            </Button>
          </View>
          <View style={{paddingTop: 10}}>
            <Button style={{alignSelf: "center", flexDirection: "row", backgroundColor: "maroon", justifyContent: "center"}}>
                <Text style={{fontFamily: "Montserrat-Bold", fontSize: 15, color: "white"}}>View your jios</Text>
            </Button>
          </View>
        </View>
      </Overlay>
      <Header style={{ backgroundColor: "white" }}
          androidStatusBarColor="white">
          <Left style={{ flex: 1, flexDirection: "row"}}>
              <Button transparent onPress={() => this.setState({isOverlayVisible: true})}>
                  {/*<Icon type="FontAwesome" name="user-circle" style={{color: "maroon"}}/> */}
                  <MyAvatar size="small" func={this.shortNameCreator()} user={this.state.user}/>
              </Button>
          </Left>
          <View style={{justifyContent: "center"}}>
            <TouchableOpacity onPress={() => NavigationManager.navigate("HomePage")}>
              <Image style={{width: 42}} resizeMode="center" source={require("./../assets/images/logo.jpg")} />
            </TouchableOpacity>
          </View>
          <Right>
              <Button transparent onPress={() => NavigationManager.navigate("MessagePage", {user: this.state.user})}>
                  <Icon type="AntDesign" name="message1"
                        style={{color:"maroon"}}
                    />
              </Button>
          </Right>
      </Header>
      </View>
    );
  }
}

/*
//Internal StyleSheet here
*/

module.export = MyHeader; //module export statement
