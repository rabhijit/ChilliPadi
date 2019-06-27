import React, { Component } from "react";
import { Image, View, TouchableOpacity, Platform, Dimensions, StyleSheet } from "react-native";
import { Container, Text } from "native-base";
import { Icon } from "react-native-elements";
//import Swiper from "react-native-deck-swiper";
import CardStack, { Card } from "react-native-card-stack-swiper";
import MyHeader from "../Components/header";

/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/

let accountDetails = [
    {
        ID: 1,
        name: "Nicole Cheong",
        age: 22,
        bio: "I'm not as manly as I look... I'm manlier ;)",
        fac: "Faculty of Science",
        pic: require("../assets/images/profile_pictures/nicole_cheong.jpg")
    },
    {
        ID: 2,
        name: "Abhinaya Ravichandran",
        age: 21,
        bio: "Probably the most attractive person on this app tbh",
        fac: "Joint Multi-Disciplinary Programme",
        pic: require("../assets/images/profile_pictures/abhinaya_ravichandran.jpg")
    },
    {
        ID: 3,
        name: "Danielle Chan",
        age: 20,
        bio: "Tulpar is rabz af, come on over",
        fac: "Faculty of Arts and Social Sciences",
        pic: require("../assets/images/profile_pictures/danielle_chan.jpg")
    },
    {
        ID: 4,
        name: "Gervaise Chan",
        age: 23,
        bio: "People call me Gervaise, but you can call me Max- I mean, tonight",
        fac: "School of Computing",
        pic: require("../assets/images/profile_pictures/gervaise_chan.jpg")
    }
]

export default class SwipingPage extends Component {
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

   let rows = [];
   for (let i in accountDetails) {
       rows.push(
           <TouchableOpacity key={i}>
             <View style={{alignItems: "center", justifyContent: "center"}}>
                <Card style={styles.card}>
                    <View style={{alignItems: "center"}}>
                        <Image source={accountDetails[i]["pic"]} style={styles.image} />
                    </View>
                    <View style={{paddingLeft: 12, paddingRight: 12, paddingTop: 10}}>
                        <Text style={{fontFamily: "Montserrat-Bold", fontSize: 22}}>{accountDetails[i]["name"]}, {accountDetails[i]["age"]}</Text>
                        <Text style={{fontFamily: "Montserrat-Italic", fontSize: 16}}>{accountDetails[i]["fac"]}</Text>
                        <Text style={{paddingTop: 20, fontFamily: "Montserrat-Regular", fontSize: 15}}>{accountDetails[i]["bio"]}</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-around", paddingLeft: 12, paddingRight: 12, position: 'absolute', bottom: 5}}>
                        <Icon size={20} color="forestgreen" type="Feather" name="check" />
                        <Icon size={20} color="gold" type="Feather" name="star" />
                        <Icon size={20} color="maroon" type="EvilIcons" name="close" />
                    </View>
                </Card>
             </View>
           </TouchableOpacity>
       )
   }

    // Notice JSX - a html-JS like syntax is within ()
    return (
      <Container style={styles.container}>
        <MyHeader account={this.state.thisAccount} />
        <View style={{paddingTop: 10}}>
            <CardStack ref={swiper => {this.swiper = swiper}} style={{alignItems: 'center'}}
                       disableTopSwipe={true}
                       disableBottomSwipe={true}
                       disableLeftSwipe={true}
                       disableRightSwipe={true}
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
      </Container>
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
