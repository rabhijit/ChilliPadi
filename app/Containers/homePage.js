import React, { Component } from "react";
import { View, Image, TouchableOpacity, Dimensions } from "react-native";
import { Container, Text } from "native-base";
import MyHeader from "../Components/header";
import NavigationManager from "../managers/navigationManager";
import CartManager from "../managers/cartManager";

/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
      thisAccount: this.props.navigation.state.params.thisAccount
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
    // this.props.navigation.navigate("ListingPage")
    let deviceHeight = Dimensions.get('window').height;

    return (
      <Container>
      <View style={{flex: 1}}>
          <MyHeader />
          <View>
            <TouchableOpacity onPress={() => NavigationManager.navigate("ListingPage")}>
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
            <TouchableOpacity onPress={() => NavigationManager.navigate("JioPage")}>
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
