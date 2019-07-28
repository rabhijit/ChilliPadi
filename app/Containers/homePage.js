import React, { Component } from "react";
import { View, Image, TouchableOpacity, Dimensions } from "react-native";
import { Container, Text } from "native-base";
import MyHeader from "../Components/header";
import NavigationManager from "../managers/navigationManager";
import firebase from "react-native-firebase";

/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/

let db = firebase.firestore();

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
      user: this.props.navigation.state.params.user
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
    /*
    db.collection("accounts").get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        if (doc && doc.exists) {
          var data = doc.data();
          // saves the data to 'name'
          db.collection("accounts").doc(data.ID).set(data);
        }
      })
    });
    */
  }

  render() {
    /*
    JS Expressions here
    -> to pass state data here
    -> to access data of array etc
    */
   console.warn(this.state.user);

    // Notice JSX - a html-JS like syntax is within ()
    // this.props.navigation.navigate("ListingPage")
    let deviceHeight = Dimensions.get('window').height;

    return (
      <Container>
      <View style={{flex: 1}}>
          <MyHeader user={this.state.user}/>
          <View>
            <TouchableOpacity onPress={() => NavigationManager.navigate("SwipingPage", {user: this.state.user})}>
                <Image resizeMode="cover"
                        source={require("../assets/images/category_images/dating2.png")}
                        style={{width: "100%", height: (7*deviceHeight)/16}} />
                <View style={{
                        position: "absolute", top: 0, left: "1%", right: 0, bottom: "1%",
                        justifyContent: "flex-end", alignItems: "flex-start"
                }}>
                    <Text style={{ fontFamily: 'Montserrat-Light', backgroundColor: 'white', fontSize: 25, color: "maroon" }}>Dating</Text>
                </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => NavigationManager.navigate("JioPage", {user: this.state.user})}>
                <Image resizeMode="cover"
                        source={require("../assets/images/category_images/social.jpg")}
                        style={{width: "100%", height: (7*deviceHeight)/16}} />
                <View style={{
                        position: "absolute", top: "2%", left: "1%", right: 0, bottom: 0,
                        justifyContent: "flex-start", alignItems: "flex-start"
                }}>
                    <Text style={{ fontFamily: 'Montserrat-Light', backgroundColor: 'maroon', fontSize: 25, color: "white" }}>Jios</Text>
                </View>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    );
  }
}

/*
//Internal StyleSheet here
*/

module.export = HomePage; //module export statement
