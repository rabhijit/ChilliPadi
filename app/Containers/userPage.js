import React, { Component } from "react";
import { View, Image, Dimensions } from "react-native";
import { Container, Text, Button } from "native-base";
import { Icon, Input } from "react-native-elements";
import CardStack, { Card } from "react-native-card-stack-swiper";
import MyHeader from "../Components/header";
import NavigationManager from "../managers/navigationManager";
import firebase from "react-native-firebase";

/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
      thisUser: this.props.navigation.state.params.thisUser,
      user: this.props.navigation.state.params.user,
      editMode: false
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

  componentDidMount() {
      this.setState({editMode: false});
  }

  reverseEditMode() {
      this.setState({editMode: true})
  }

  render() {
    /*
    JS Expressions here
    -> to pass state data here
    -> to access data of array etc
    */

    function MyButton(props) {
        if (props.loggedUser == props.thisUser + "@chillipadi.com") {
            return <Button block style={{flex: 1, alignSelf: "center", flexDirection: "row", backgroundColor: "maroon", justifyContent: "center"}}
                           onPress={props.func}>
                        <Text style={{fontFamily: "Montserrat-Bold", fontSize: 15, color: "white"}}>Edit</Text>
                    </Button>;
        }
        else {
            return <Button block style={{flex: 1, alignSelf: "center", flexDirection: "row", backgroundColor: "maroon", justifyContent: "center"}}
                    onPress={() => NavigationManager.navigate("SingleMessagePage", {user: props.user2, chosenChat: props.thisUser2["name"],
                                                              chosenChatId: props.thisUser2["ID"], chosenDp: props.thisUser2["dp"], datingOrJio: 0})}>
                        <Text style={{fontFamily: "Montserrat-Bold", fontSize: 15, color: "white"}}>Message</Text>
                    </Button>;
        }
    }

    // Notice JSX - a html-JS like syntax is within ()
    return (
    (this.state.editMode == false) ? (
    <Container>
      <MyHeader user={this.state.user} />
      <View style={{padding: 8}}>
        <View style={{alignItems: "center"}}>
            <Image source={{uri: this.state.thisUser["dp"]}} style={{width: (6.45/7)*deviceWidth, height: (3.28/6)*deviceHeight, borderRadius: 7}} />
        </View>
        <View style={{paddingLeft: 12, paddingRight: 12, paddingTop: 5}}>
            <Text style={{fontFamily: "Montserrat-Bold", fontSize: 22}}>{this.state.thisUser["name"]}, {this.state.thisUser["age"]}</Text>
            <Text style={{fontFamily: "Montserrat-Italic", fontSize: 16}}>{this.state.thisUser["fac"]}</Text>
            <Text style={{paddingTop: 13, fontFamily: "Montserrat-Regular", fontSize: 15}}>{this.state.thisUser["bio"]}</Text>
            <View style={{paddingTop: 13, flexDirection: "row"}}>
                <MyButton func={this.reverseEditMode} loggedUser={firebase.auth().currentUser["email"].substring(1)} thisUser={this.state.thisUser["ID"].substring(1)} editMode={this.state.editMode}
                          user2={this.state.user} thisUser2={this.state.thisUser}
                />
            </View>
        </View>
      </View>
    </Container>
    ) : (
    <Container>
      <MyHeader user={this.state.user} />
      <View style={{padding: 8}}>
        <View style={{alignItems: "center"}}>
            <Image source={{uri: this.state.thisUser["dp"]}} style={{width: (6.45/7)*deviceWidth, height: (3.28/6)*deviceHeight, borderRadius: 7}} />
        </View>
        <View style={{paddingLeft: 12, paddingRight: 12, paddingTop: 5}}>
            <Input style={{fontFamily: "Montserrat-Bold", fontSize: 22}} placeholder={this.state.thisUser["name"]} />
            <Text style={{fontFamily: "Montserrat-Italic", fontSize: 16}}>{this.state.thisUser["fac"]}</Text>
            <Input style={{paddingTop: 13, fontFamily: "Montserrat-Regular", fontSize: 15}} placeholder={this.state.thisUser["bio"]} />
            <View style={{paddingTop: 13, flexDirection: "row"}}>
                <MyButton />
            </View>
        </View>
      </View>
    </Container>
    )
    );
  }
}

/*
//Internal StyleSheet here
*/

module.export = UserPage; //module export statement
