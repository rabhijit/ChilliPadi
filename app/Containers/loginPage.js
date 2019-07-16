import React, { Component } from "react";
import { View, Image, Dimensions, TextInput, TouchableOpacity } from "react-native";
import { Container, Text, Toast } from "native-base";
import NavigationManager from "../managers/navigationManager";
import Realm from "realm";

import { SERVER_URL } from "../src/constants"
import { JioSchema, AccountSchema } from "../src/allSchemas"


// settle Keyboard blocking text entry fields

/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/

let accounts;

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
      typed_id: "",
      typed_password: "",
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
  /*componentWillMount() {
      accounts = realm.objects("Account");
  }*/


  /*login_check() {
    let chosenAccount = accounts.filtered('ID == $0 AND password == $1', this.state.typed_id, this.state.typed_password);
    if (chosenAccount.length == 0) {
      Toast.show({text: "Invalid user ID / password. NOTE: this service is currently available to NUS students only."});
    }
    else if (chosenAccount.length > 1) {
      console.warn("error: multiple accounts with same ID");
    }
    else {
      NavigationManager.navigate("HomePage", {thisAccount: chosenAccount[0]});
      Toast.show({text: "Welcome to Chilli Padi, " + chosenAccount[0].name});
    }
  }*/
  
  login_check() {
    let creds = Realm.Sync.Credentials.usernamePassword(this.state.typed_id, this.state.typed_password, false)
    Realm.Sync.User.login(SERVER_URL, creds).then(user => {
      //Create a configuration to open the default Realm
    const config = user.createConfiguration({
      sync: { url : SERVER_URL
            },
      schema: [JioSchema, AccountSchema]
    });
    // Open the realm
    var realm = new Realm(config);
    //navigate to home page
    console.warn(realm.objects('Jio').length);
    NavigationManager.navigate("HomePage", {ourrealm: realm});
    Toast.show({text: "Welcome to Chilli Padi"});

    }).catch(error => {
      //an auth error has occured
      Toast.show({text: "Invalid user ID / password. NOTE: this service is currently available to NUS students only."});
    })
  }







  render() {
    /*
    JS Expressions here
    -> to pass state data here
    -> to access data of array etc
    */

    // Notice JSX - a html-JS like syntax is within ()
    let deviceWidth = Dimensions.get('window').width;
    let deviceHeight = Dimensions.get('window').height;

    return (
      <Container>
        <View>
          <View style={{alignItems: "center"}}>
            <Image style={{position: 'absolute', top: deviceHeight / 8, height: deviceWidth / 4, width: deviceWidth / 4}} source={require("../assets/images/logo.jpg")} />
          </View>
          <View style={{alignItems: "center"}}>
            <Text style={{position: 'absolute', top: deviceHeight / 3.3, fontFamily: 'Montserrat-Light', fontSize: 30, color: 'maroon'}}>
              Chilli Padi
            </Text>
            <Text style={{position: 'absolute', top: deviceHeight / 2.7, fontFamily: 'Montserrat-Regular', fontSize: 12, color: 'maroon'}}>
              add some spice to your life.
            </Text>
          </View>
          <View style={{alignItems: "center"}}>
            <TextInput placeholder="NUSNET ID" placeholderTextColor="silver" style={{color: "white", width: "55%", backgroundColor: 'maroon', position: 'absolute', top: deviceHeight / 2.2}} 
                       onChangeText={
                         (text) => this.setState({typed_id: text})
                       }
            />
          </View>
          <View style={{alignItems: "center"}}>
            <TextInput secureTextEntry={true} placeholder="NUSNET password" placeholderTextColor="silver" style={{color: "white", width: "55%", backgroundColor: 'maroon', position: 'absolute', top: deviceHeight / 1.8}} 
              onChangeText={
                (text) => this.setState({ typed_password: text })
              }
            />
          </View>
          <View style={{alignItems: "center"}}>
            <TouchableOpacity style={{borderColor: "maroon", borderWidth: 2, borderRadius: 1, padding: 10, backgroundColor: 'white', position: 'absolute', top: deviceHeight / 1.45}}
                              onPress={() => this.login_check()}>
              <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 12, color: 'black'}}>
                LOGIN
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: "center"}}>
            <TouchableOpacity style={{borderColor: "white", backgroundColor: 'white', position: 'absolute', top: deviceHeight / 1.2}}
                              onPress={() => NavigationManager.navigate("CreateAccountPage")}>

              <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 10, color: 'maroon'}}>
                New to Chilli Padi? Create an account here!
              </Text>
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

module.export = LoginPage; //module export statement
