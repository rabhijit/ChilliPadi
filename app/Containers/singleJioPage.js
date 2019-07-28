import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { Container, Icon, Text, Card, CardItem, Button, Footer, FooterTab } from "native-base";
import { Avatar } from "react-native-elements";
import moment from "moment";
import MyHeader from "../Components/header";
import NavigationManager from "../managers/navigationManager";
import firebase from "react-native-firebase";
/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/

let db = firebase.firestore();
export default class SingleJioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
      user: this.props.navigation.state.params.user,
      thisJio: this.props.navigation.state.params.chosenJio,
      inJio: false
    };
    this.joinOrLeave = this.joinOrLeave.bind(this);
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
      db.collection('jios').doc(this.state.thisJio["jioID"]).onSnapshot(doc => {
          if (doc.data().members.includes(this.state.user["ID"])) {
              this.setState({inJio: true});
          }
          else {
              this.setState({inJio: false});
          }
      })
  }

  joinOrLeave() {
    if (!(this.state.inJio)) {
        db.collection('jios').doc(this.state.thisJio["jioID"]).update({
            members: firebase.firestore.FieldValue.arrayUnion(this.state.user["ID"])
        });
        //this.setState({inJio: true});
    }
    else {
        db.collection('jios').doc(this.state.thisJio["jioID"]).update({
            members: firebase.firestore.FieldValue.arrayRemove(this.state.user["ID"])
        });
        //this.setState({inJio: false});
    }
  }

  render() {
    /*
    JS Expressions here
    -> to pass state data here
    -> to access data of array etc
    */

    // Notice JSX - a html-JS like syntax is within ()

    function MemberNumber(props) {
        let maximumSet = (props.max == 1e20);
        if (maximumSet) {
            return <Text style={{fontFamily: "Montserrat-SemiBold", fontSize: 14}}>
                {props.min} / &#8734; members
            </Text>;
        }
        else {
            return <Text style={{fontFamily: "Montserrat-SemiBold", fontSize: 14}}>
                {props.min} / {props.max} members
            </Text>;
        }
    }

    function MyButton(props) {
        if (!props.inJio) {
            return <FooterTab style={{"backgroundColor": "white", borderRadius: 1, borderColor: "maroon", borderWidth: 0.8}}>
                  <Button style={{flexDirection: "row", justifyContent: "center"}}
                          onPress={props.func}>
                      <Icon type="AntDesign" name="pluscircleo"
                            style={{color:"maroon", fontSize: 35}} />
                      <Text style={{fontFamily: "Montserrat-Bold", fontSize: 15, color: "maroon"}}>Join this jio</Text>
                  </Button>
              </FooterTab>;
        }
        else {
            return <FooterTab style={{"backgroundColor": "maroon", borderRadius: 1, borderColor: "maroon", borderWidth: 0.8}}>
                  <Button style={{flexDirection: "row", justifyContent: "center"}}
                          onPress={props.func}>
                      <Icon type="AntDesign" name="checkcircle"
                            style={{color:"white", fontSize: 35}} />
                      <Text style={{fontFamily: "Montserrat-Bold", fontSize: 15, color: "white"}}>Joined!</Text>
                  </Button>
              </FooterTab>;
        }
    }

    return (
      <Container>
        <MyHeader user={this.state.user} />
        <ScrollView style={{padding: 15}}>
            <View>
                <View style={{paddingLeft: 15, paddingRight: 15, paddingBottom: 5}}>
                    <Text style={{fontFamily: "Montserrat-Bold", fontSize: 20, paddingBottom: 5}}>
                        {this.state.thisJio["titleName"]}
                    </Text>
                    <MemberNumber min={this.state.thisJio["numberOfPeople"]} max={this.state.thisJio["maxNumber"]} />
                    <Text style={{fontFamily: "Montserrat-SemiBold", fontSize: 14, paddingBottom: 5}}>
                        Expires {moment(this.state.thisJio["expiryDate"], "YYYY-MM-DD HH:mm:ss").format('ddd')}, {
                            this.state.thisJio["expiryDate"]
                        }
                        {/* use moment.js to fix day*/}
                    </Text>
                    <Button style={{backgroundColor: "white", flexDirection: "row", borderColor: "maroon", borderWidth: 0.8, justifyContent: "space-around"}}>
                        <Icon type="MaterialIcons" name="bookmark-border" style={{color: "maroon"}} />
                        <Text style={{fontFamily: "Montserrat-SemiBold", color: "maroon"}}>Bookmark</Text>
                    </Button>
                </View>
                <Card>
                    <CardItem>
                        <View>
                            <Text style={{fontFamily: "Montserrat-Light", fontSize: 15}}>
                                {this.state.thisJio["description"]}
                            </Text>
                        </View>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem>
                        <View>
                            <Text style={{fontFamily: "Montserrat-SemiBold", fontSize: 15, paddingBottom: 10}}>
                                Jio creator:
                            </Text>
                            <View style={{flexDirection: "row"}}>
                                <Avatar rounded />
                                <Text style={{paddingTop: 5, paddingLeft: 15, paddingBottom: 20,fontFamily: "Montserrat-SemiBold", fontSize: 15}}>
                                    {this.state.thisJio["jioCreator"]}
                                </Text>
                            </View>
                            <Button block style={{width: "100%", backgroundColor: "maroon", flexDirection: "row", justifyContent: "center"}}
                                    onPress={() => NavigationManager.navigate("SingleMessagePage", {user: this.state.user, chosenChat: this.state.thisJio['titleName'], 
                                                                              chosenChatId: this.state.thisJio['jioID'], datingOrJio: 1})}>
                                <Icon type="MaterialCommunityIcons" name="message" style={{color: "white"}} />
                                <Text style={{fontFamily: "Montserrat-SemiBold"}}>Text Group Chat</Text>
                            </Button>
                        </View>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem>
                    <View>
                        <Text style={{fontFamily: "Montserrat-SemiBold", fontSize: 17}}>
                            Location
                        </Text>
                        <Text style={{fontFamily: "Montserrat-Light", fontSize: 15}}>
                            {this.state.thisJio["location"]}
                        </Text>
                    </View>
                    </CardItem>
                </Card>
            </View>
        </ScrollView>
        <Footer>
              <MyButton inJio={this.state.inJio} func={this.joinOrLeave} />
          </Footer>
      </Container>
    );
  }
}

/*
//Internal StyleSheet here
*/

module.export = SingleJioPage; //module export statement
