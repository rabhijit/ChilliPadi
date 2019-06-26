import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Container, Card, CardItem, Button, Text, Footer, FooterTab, Icon } from "native-base";
import { SearchBar, Avatar, ButtonGroup } from "react-native-elements";
import MyHeader from "../Components/header";
import moment from "moment";
import NavigationManager from "../managers/navigationManager";
import realm from "../realm";

/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/

let jioChats = [
  {
    ID: 1,
    chatName: "Chainsmokers concert jio!!",
    members: ["Amir Azhar", "Abhijit Ravichandran", "Gervaise Chan"],
    lastMessage: "Hey, I was doing just fine before I met you",
    lastMessageTime: "09:39 AM",
    lastMessageDate: "22/8/2019",
    lastMessageSender: "Amir Azhar",
  },
  {
    ID: 2,
    chatName: "EE2026 study jio",
    members: ["Sad CEG Student", "Abhijit Ravichandran", "Max Chan"],
    lastMessage: "Still generating bitstream...",
    lastMessageTime: "00:01 AM",
    lastMessageDate: "05/06/2019",
    lastMessageSender: "Abhijit Ravichandran",
  },
  {
    ID: 3,
    chatName: "SUNNus Captain's Ball Team - Players needed",
    members: ["Amir Azhar", "Sad CEG Student"],
    lastMessage: "sorry, no noobs allowed",
    lastMessageTime: "05:27 PM",
    lastMessageDate: "15/6/2019",
    lastMessageSender: "you",
  },
  {
    ID: 4,
    chatName: "Tembu lobby Valentine's Day concert",
    members: ["Nicole Cheong", "Max Chan"],
    lastMessage: "This concert is great! Did you know Tembusu College is the first Residential College created in the National University of Singapore?",
    lastMessageTime: "11:58 PM",
    lastMessageDate: "14/2/2019",
    lastMessageSender: "Nicole Cheong",
  }
];

let datingChats = [
  {
    ID: 1,
    person: "Nicole Cheong",
    lastMessage: "Looking for a badminton player to stroke my shuttlecock",
    lastMessageTime: "03:04 AM",
    lastMessageDate: "25/6/2019",
    lastMessageSender: "Nicole Cheong"
  },
  {
    ID: 2,
    person: "Gervaise Chan",
    lastMessage: "please don't blue-tick me darling ;w;",
    lastMessageTime: "12:00 PM",
    lastMessageDate: "13/3/2019",
    lastMessageSender: "you"
  },
  {
    ID: 3,
    person: "Danielle Chan",
    lastMessage: "My only purpose in life is to display enough text to test the truncation setting",
    lastMessageTime: "05:04 PM",
    lastMessageDate: "26/6/2019",
    lastMessageSender: "you"
  }
];

let AdminAccount = (realm.objects("Account").filtered('ID == "admin"'))[0];

export default class MessagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
      thisAccount: this.props.navigation.state.params.thisAccount,
      selectedIndex: 0
    };
    this.updateIndex = this.updateIndex.bind(this);
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
 updateIndex(selectedIndex) {
   this.setState({selectedIndex})
 }

  render() {
    /*
    JS Expressions here
    -> to pass state data here
    -> to access data of array etc
    */

    // Notice JSX - a html-JS like syntax is within ()

    function ShowDate(props) {
        let day = moment(props.date, "YYYY-MM-DD HH:mm:ss").format('ddd');
        return <Text style={{fontFamily: "Montserrat-Regular", fontSize: 10}}>
            {day}, {props.date} at {props.time}
        </Text>
    }
    let deviceWidth = Dimensions.get('window').width;

    function ButtonSelect(props) {
      let rows = [];
      if (props.index == 0) {
        for (let i in datingChats) {
          rows.push(
            <TouchableOpacity key={i}>
              <Card>
                <CardItem>
                  <View style={{flexDirection: "row"}}>
                    <Avatar size="large" rounded />
                    <View style={{width: deviceWidth * (7.7/10), paddingLeft: 15, paddingRight: 15, flexDirection: "column", flexWrap: 'wrap'}}>
                      <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 17, paddingBottom: 7}}>{datingChats[i]['person']}</Text>
                      <Text numberOfLines={2} style={{fontFamily: 'Montserrat-Regular', fontSize: 13, paddingBottom: 7}}>{datingChats[i]['lastMessage']}</Text>
                      <ShowDate date={datingChats[i]['lastMessageDate']} time={datingChats[i]['lastMessageTime']} />
                    </View>
                  </View>
                </CardItem>
              </Card>
            </TouchableOpacity>
          );
      }
    }
    else if (props.index == 1) {
      for (let i in jioChats) {
        rows.push(
          <TouchableOpacity key={i}>
          <Card>
            <CardItem>
              <View style={{flexDirection: "row"}}>
                <View style={{flexDirection: "column", justifyContent: "center"}}>
                  <View style={{paddingLeft: 10}}>
                    <Avatar avatarStyle={{alignSelf: "center"}} size="medium" rounded />
                  </View>
                  <View style={{flexDirection: "row"}}>
                    <Avatar size="small" rounded />
                    <Avatar size="small" rounded />
                  </View>
                </View>
                <View style={{width: deviceWidth * (7.7/10), paddingLeft: 15, paddingRight: 15, flexDirection: "column", flexWrap: 'wrap'}}>
                  <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 17, paddingBottom: 7}}>{jioChats[i]['chatName']}</Text>
                  <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 13}}>{jioChats[i]['lastMessageSender']}:</Text>
                  <Text numberOfLines={1} style={{fontFamily: 'Montserrat-Regular', fontSize: 13, paddingBottom: 7}}>{jioChats[i]['lastMessage']}</Text>
                  <ShowDate date={jioChats[i]['lastMessageDate']} time={jioChats[i]['lastMessageTime']} />
                </View>
              </View>
            </CardItem>
          </Card>
        </TouchableOpacity>
        );
      }
    }
    return <View>{rows}</View>;
  }

    return (
      <Container>
        <MyHeader account={this.state.thisAccount} />
        <View style={{paddingTop: 10, alignItems: "center"}}>
          <Text style={{fontFamily: "Montserrat-Bold", fontSize: 18}}>
            Your Messages
          </Text>
          <ButtonGroup onPress={this.updateIndex} selectedIndex={this.state.selectedIndex} textStyle={{fontFamily: "Montserrat-SemiBold"}} buttons={['Dating', 'Jios']} />
        </View>
        <ScrollView>
          {/* onChangeText */}
          <SearchBar selectedButtonStyle={{color: 'maroon'}} inputStyle={{fontFamily: "Montserrat-Regular"}} placeholder="Search"
                        lightTheme={true} round={true}
            />
            {/*
            <CardItem><Text style={{fontFamily: "Montserrat-Light"}}>{rows.length} threads</Text></CardItem>
            */}
            <ButtonSelect index={this.state.selectedIndex} />
        </ScrollView>
      </Container>
    );
  }
}

/*
//Internal StyleSheet here
*/

module.export = MessagePage; //module export statement
