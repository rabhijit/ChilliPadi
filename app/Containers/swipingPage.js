import React, { Component } from "react";
import { Image, View, TouchableOpacity, Platform, Dimensions, StyleSheet, ActivityIndicator } from "react-native";
import { Container, Text, Button } from "native-base";
import { Icon, Overlay } from "react-native-elements";
//import Swiper from "react-native-deck-swiper";
import CardStack, { Card } from "react-native-card-stack-swiper";
import MyHeader from "../Components/header";
import NavigationManager from "../managers/navigationManager";
import firebase from "react-native-firebase";

/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/

let storage = firebase.storage();
let db = firebase.firestore();

let cards = [];

export default class SwipingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
      user: this.props.navigation.state.params.user,
      accounts: [],
      isOverlayVisible: false,
      matchPic: null,
      matchName: null,
      matchGender: null,
      currIndex: 0,
      loaded: false,
      update: 0
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
    this.setState({loaded: false});
    db.collection('accounts').where('gender', '==', +(!this.state.user['gender']))
      .get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          let eachAccount = {};
          let data = doc.data();
          if (data.dp != "null") {
            eachAccount['ID'] = doc.id;
            eachAccount['name'] = data.name;
            eachAccount['age'] = data.age;
            eachAccount['bio'] = data.bio;
            eachAccount['fac'] = data.fac;
            eachAccount['dp'] = data.dp;
            this.setState(prevState => ({accounts: [...prevState.accounts, eachAccount]}));
          }
        });
      });
      this.setState({loaded: true});
  }

  componentWillUnmount() {
    this.setState({isOverlayState: false});
  }

  onSwipedRight(index) {
    this.setState({currIndex: index});
    db.collection('accounts').doc(this.state.user['ID']).update({
      interests: firebase.firestore.FieldValue.arrayUnion(cards[index])
    })
    db.collection('accounts').doc(cards[index]).get().then(doc => {
      let data = doc.data();
      if (data.interests.includes(this.state.user['ID'])) {
        //console.warn(`Match with ${data.name}!`);
        this.setState({matchName: data.name, matchPic: data.dp, matchGender: data.gender ? "her" : "him"});
        this.setState({isOverlayVisible: true});
      }
    })
  }

  render() {
    /*
    JS Expressions here
    -> to pass state data here
    -> to access data of array etc
    */

   let rows = [];
   cards = [];
   for (let i in this.state.accounts) {
       cards.push(this.state.accounts[i]["ID"]);
       rows.push(
                <Card key={i} style={styles.card}>
                    <View style={{alignItems: "center"}}>
                        <Image source={{uri: this.state.accounts[i]["dp"]}} style={styles.image} />
                    </View>
                    <View style={{paddingLeft: 12, paddingRight: 12, paddingTop: 10}}>
                        <Text style={{fontFamily: "Montserrat-Bold", fontSize: 22}}>{this.state.accounts[i]["name"]}, {this.state.accounts[i]["age"]}</Text>
                        <Text style={{fontFamily: "Montserrat-Italic", fontSize: 16}}>{this.state.accounts[i]["fac"]}</Text>
                        <Text style={{paddingTop: 20, fontFamily: "Montserrat-Regular", fontSize: 15}}>{this.state.accounts[i]["bio"]}</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-around", paddingLeft: 12, paddingRight: 12, position: 'absolute', bottom: 5}}>
                        <Icon size={20} color="forestgreen" type="Feather" name="check" />
                        <Icon size={20} color="gold" type="Feather" name="star" />
                        <Icon size={20} color="maroon" type="EvilIcons" name="close" />
                    </View>
                </Card>
       )
   }

    // Notice JSX - a html-JS like syntax is within ()
    return (
      (!this.state.loaded) ? (
          <Container>
          <MyHeader user={this.state.user}/>
            <View style={{paddingTop: 10, alignItems: "center", justifyContent: "center"}}>
              <ActivityIndicator animating={true} />
            </View>
          </Container>
      ) : (
      <Container style={styles.container}>
        <MyHeader user={this.state.user}/>
        <View style={{paddingTop: 10}}>
            <Overlay isVisible={this.state.isOverlayVisible}
                     onBackdropPress={() => this.setState({isOverlayVisible: false})}
                     width={(8.8/10)*deviceWidth} height={(8/10)*deviceHeight}>
              <View style={{alignItems: "center"}}>
                <Text style={{fontFamily: "Montserrat-Bold", fontSize: 25}}>It's a match!</Text>
                <Text style={{textAlign: "center", paddingTop: 2, fontFamily: "Montserrat-Light", fontSize: 13}}>The stars have aligned in favour of you and {this.state.matchName}.</Text>
                <View style={{paddingTop: 5, flexDirection: "row", justifyContent: "space-evenly"}}>
                  <Image source={{uri: this.state.user.dp}} style={{width: (3.75/10 * deviceWidth), height: (4.5/10) * deviceHeight}}/>
                  <Image source={{uri: this.state.matchPic}} style={{width: (3.75/10 * deviceWidth), height: (4.5/10) * deviceHeight}}/>
                </View>
                <View style={{paddingTop: 10}}>
                  <View style={{flexDirection: "row"}}>
                    <View style={{paddingRight: 3}}>
                      <Button style={{alignSelf: "center", flexDirection: "row", backgroundColor: "maroon", justifyContent: "center"}}
                              onPress={() => {this.setState({isOverlayVisible: false}); NavigationManager.navigate("SingleMessagePage",
                                                            {user: this.state.user, chosenChat: this.state.accounts[this.state.currIndex]['name'],
                                                             chosenChatId: this.state.accounts[this.state.currIndex]['ID'], datingOrJio: 0, chosenDp: this.state.accounts[this.state.currIndex]['dp']})}}>
                          <Text style={{fontFamily: "Montserrat-SemiBold", fontSize: 13, color: "white"}}>Message {this.state.matchGender}</Text>
                      </Button>
                    </View>
                    <View style={{paddingLeft: 3}}>
                      <Button style={{alignSelf: "center", flexDirection: "row", backgroundColor: "maroon", justifyContent: "center"}}
                              onPress={() => {this.setState({isOverlayVisible: false}); NavigationManager.navigate("UserPage", {user: this.state.user, thisUser: this.state.accounts[this.state.currIndex]})}}>
                          <Text style={{fontFamily: "Montserrat-SemiBold", fontSize: 13, color: "white"}}>View profile</Text>
                      </Button>
                    </View>
                  </View>
                </View>
                <View style={{paddingTop: 7}}>
                  <Button style={{alignSelf: "center", flexDirection: "row", backgroundColor: "maroon", justifyContent: "center"}}
                          onPress={() => this.setState({isOverlayVisible: false})}>
                      <Text style={{fontFamily: "Montserrat-SemiBold", fontSize: 13, color: "white"}}>Maybe later</Text>
                  </Button>
                </View>
              </View>

            </Overlay>
            <CardStack ref={swiper => {this.swiper = swiper}} style={{alignItems: 'center'}}
                       onSwipedRight={(index) => {this.setState({currentIndex: index}); this.onSwipedRight(index); }}
                       verticalSwipe={false}
                       renderNoMoreCards={() =>
                                        <View style={{flexDirection: "column", justifyContent: "center"}}>
                                          <Text style={{justifyContent: "center", fontFamily: "Montserrat-SemiBold"}}>
                                          You're out of swipes!
                                          </Text>
                                          <Text style={{fontFamily: "Montserrat-Light"}}>
                                              Wait a little longer to swipe again.
                                          </Text>
                                        </View>
                                                }
                                                >
                {rows}
            </CardStack>
        </View>
      </Container> )
    );
  }
}

/*
//Internal StyleSheet here
*/
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  card:{
    paddingTop: 8,
    width: (6.8/7)*deviceWidth,
    height: (4/5)*deviceHeight,
    backgroundColor: '#fffdff',
    borderWidth: 0.8,
    borderRadius: 10,
    borderColor: "maroon",
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
  },
  image: {
      width: (6.45/7)*deviceWidth,
      height: (3/6)*deviceHeight,
      borderRadius: 7
  },
});

module.export = SwipingPage; //module export statement
