import React, { Component } from "react";
import { View, Image, Dimensions, TextInput, TouchableOpacity } from "react-native";
import { Container, Text, Toast, Picker } from "native-base";
import NavigationManager from "../managers/navigationManager";
import ImagePicker from 'react-native-image-picker';
import NumericInput from "react-native-numeric-input";
import { Avatar, CheckBox } from "react-native-elements";
import firebase from "react-native-firebase";

// settle Keyboard blocking text entry fields

let db = firebase.firestore();

/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/

export default class createAccountPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        //state property here
        typed_firstname: "",
        typed_lastname: "",
        gender: 1,
        age: 20,
        typed_id: "",
        typed_password: "",
        typed_fac: "",
        typed_bio: "",
        typed_email: "",
        dp: "null"
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
      //ImagePicker.launchCamera();
    }

    imageSelector() {
      ImagePicker.showImagePicker(response => {
        if (!(response.didCancel) && !(response.error)) {
          const source = {uri: response.uri};
          this.setState({dp: source});
        }
      })
    }

    create_account() {
        firebase.auth().createUserWithEmailAndPassword(this.state.typed_id + "@chillipadi.com", this.state.typed_password)
                .then(() => {
                  db.collection("accounts").doc(this.state.typed_id).set({
                    ID: this.state.typed_id,
                    age: this.state.age,
                    bio: this.state.typed_bio,
                    fac: this.state.typed_fac,
                    email: this.state.typed_id + "@chillipadi.com",
                    gender: this.state.gender,
                    interests: [],
                    name: this.state.typed_firstname + " " + this.state.typed_lastname,
                    password: this.state.typed_password,
                    dp: "null"
                  });
                    NavigationManager.navigate("LoginPage");
                    Toast.show({text: "Account created successfully!"});
                  })
                  .catch(error => {
                    Toast.show({text: "Something went wrong."});
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
              <View style={{paddingTop: 15, alignItems: "center"}}>
                <Text style={{paddingTop: 5, fontFamily: 'Montserrat-Regular', fontSize: 12, color: 'maroon'}}>
                  add some spice to your life.
                </Text>
                <View style={{paddingTop: 10}}>
                  <Avatar rounded size="large" showEditButton={true} 
                          onPress={() => this.imageSelector()} source={this.state.dp}
                  />
                </View>
                <View style={{paddingTop: 15, flexDirection: "row", justifyContent: "space-evenly"}}>
                  <View style={{paddingRight: 5, width: "40%"}}>
                    <TextInput placeholder="First name" placeholderTextColor="silver" style={{color: "white", backgroundColor: 'maroon'}}
                            onChangeText={
                              (text) => this.setState({typed_firstname: text})
                            }
                    />
                  </View>
                  <View style={{paddingLeft: 5, width: "40%"}}>
                    <TextInput placeholder="Last name" placeholderTextColor="silver" style={{color: "white", backgroundColor: 'maroon'}} 
                              onChangeText={
                                (text) => this.setState({typed_lastname: text})
                              }
                    />
                  </View>
                </View>
                <View style={{paddingTop: 10, flexDirection: "row", justifyContent: "space-evenly"}}>
                  <View style={{paddingRight: 5, width: "40%"}}>
                    <TextInput placeholder="NUSNET ID" placeholderTextColor="silver" style={{color: "white", backgroundColor: 'maroon'}} 
                            onChangeText={
                              (text) => this.setState({typed_id: text})
                            }
                  />
                  </View>
                  <View style={{paddingLeft: 5, width: "40%"}}>
                    <TextInput secureTextEntry={true} placeholder="NUSNET password" placeholderTextColor="silver" style={{color: "white", backgroundColor: 'maroon'}} 
                    onChangeText={
                      (text) => this.setState({ typed_password: text })
                    }
                  />
                  </View>
                </View>
                <View style={{paddingTop: 10, width: "80%"}}>
                  <TextInput placeholder="Bio" placeholderTextColor="silver" style={{color: "white", backgroundColor: 'maroon'}} 
                    onChangeText={
                      (text) => this.setState({ typed_bio: text })
                    }
                  />
                </View>
                <View style={{paddingTop: 10, width: "70%"}}>
                  <TextInput placeholder="Faculty" placeholderTextColor="silver" style={{color: "white", backgroundColor: 'maroon'}} 
                    onChangeText={
                      (text) => this.setState({ typed_fac: text })
                    }
                  />
                </View>
                <View style={{paddingTop: 10, flexDirection: "row"}}>
                  <CheckBox title="Male" checked={this.state.gender == 0} style={{fontFamily: "Montserrat-SemiBold"}}
                            onPress={() => this.setState({gender: 0})}
                  />
                  <CheckBox title="Female" checked={this.state.gender == 1} style={{fontFamily: "Montserrat-SemiBold"}}
                            onPress={() => this.setState({gender: 1})}
                  />
                </View>
                <View style={{paddingTop: 10, flexDirection: "row"}}>
                  <Text style={{paddingTop: 10, fontFamily: "Montserrat-Light", fontSize: 15}}>Age: </Text>
                  <NumericInput value={this.state.age} onChange={value => this.setState({age: value})}
                                type="up-down"
                  />
                </View>
                <View style={{paddingTop: 20}}>
                  <TouchableOpacity style={{borderColor: "maroon", borderWidth: 2, borderRadius: 1, padding: 10, backgroundColor: 'white'}}
                                    onPress={() => this.create_account()}>
                    <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 12, color: 'black'}}>
                      CREATE NEW ACCOUNT
                    </Text>
                  </TouchableOpacity>
                </View>
            </View>
          </Container>
        );
    }
}

module.export = createAccountPage;