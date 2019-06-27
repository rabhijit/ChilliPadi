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
    messages: [
      {
        ID: 1,
        content: 'Hey',
        messageDate: "22/8/2019",
        messageTime: "07:39 AM",
        sender: "you"
      },
      {
        ID: 2,
        content: "I was doing just fine before I met you",
        messageDate: "22/8/2019",
        messageTime: "08:39 AM",
        sender: "Amir Azhar"
      },
      {
        ID: 3,
        content: "I drank too much and that's an issue",
        messageDate: "22/8/2019",
        messageTime: "09:39 AM",
        sender: "Gervaise Chan"
      },
      {
        ID: 4,
        content: "but I'm ok",
        messageDate: "22/8/2019",
        messageTime: "09:40 AM",
        sender: "Gervaise Chan"
      }
    ]
  },
  {
    ID: 2,
    chatName: "EE2026 study jio",
    members: ["Sad CEG Student", "Abhijit Ravichandran", "Max Chan"],
    messages: [
      {
        ID: 1,
        content: "Hey guys I'm here to wreck the bell-curve again",
        messageDate: "05/6/2019",
        messageTime: "03:24 AM",
        sender: "Max Chan"
      },
      {
        ID: 2,
        content: "Still generating bitstream...",
        messageDate: "05/6/2019",
        messageTime: "08:01 AM",
        sender: "you"
      },
    ]
  },
  {
    ID: 3,
    chatName: "SUNNus Captain's Ball Team - Players needed",
    members: ["Amir Azhar", "Sad CEG Student"],
    messages: [
      {
        ID: 1,
        content: "i love handling balls",
        messageDate: "15/6/2019",
        messageTime: "03:24 PM",
        sender: "Amir Azhar"
      },
      {
        ID: 2,
        content: "sorry, no noobs allowed",
        messageDate: "15/6/2019",
        messageTime: "05:27 PM",
        sender: "you"
      },
    ]
  },
  {
    ID: 4,
    chatName: "Tembu lobby Valentine's Day concert",
    members: ["Nicole Cheong", "Max Chan"],
    messages: [
      {
        ID: 1,
        content: "the CAPT concert was better tbh",
        messageDate: "14/2/2019",
        messageTime: "03:24 PM",
        sender: "Max Chan"
      },
      {
        ID: 2,
        content: "any single ladies in the chat hmu",
        messageDate: "14/6/2019",
        messageTime: "03:24 PM",
        sender: "Max Chan"
      },
      {
        ID: 3,
        content: "This concert is great! Did you know Tembusu College is the first Residential College created in the National University of Singapore?",
        messageDate: "14/6/2019",
        messageTime: "11:58 PM",
        sender: "Nicole Cheong"
      }
    ]
  }
];

let datingChats = [
  {
    ID: 1,
    person: "Nicole Cheong",
    messages: [
      {
        ID: 1,
        content: "Looking for a badminton player to stroke my shuttlecock",
        messageDate: "25/6/2019",
        messageTime: "03:04 AM",
        sender: "you"
      }
    ]
  },
  {
    ID: 2,
    person: "Gervaise Chan",
    messages: [
      {
        ID: 1,
        content: "Yea baby I'm dtf",
        messageDate: "12/3/2019",
        messageTime: "11:00 AM",
        sender: "Gervaise Chan"
      },
      {
        ID: 2,
        content: "din tai fung ;)))))",
        messageDate: "12/3/2019",
        messageTime: "11:00 AM",
        sender: "Gervaise Chan"
      },
      {
        ID: 3,
        content: "Wtf???",
        messageDate: "12/3/2019",
        messageTime: "12:00 PM",
        sender: "you"
      },
      {
        ID: 4,
        content: "please don't blue tick me darling ;w;",
        messageDate: "13/3/2019",
        messageTime: "12:00 PM",
        sender: "Gervaise Chan"
      }
    ]
  },
  {
    ID: 3,
    person: "Danielle Chan",
    messages: [
      {
        ID: 1,
        content: "Sadly enough",
        messageDate: "26/6/2019",
        messageTime: "05:04 PM",
        sender: "Danielle Chan"
      },
      {
        ID: 2,
        content: "My only purpose in life is to display enough text to test the truncation setting",
        messageDate: "26/6/2019",
        messageTime: "05:04 PM",
        sender: "Danielle Chan"
      },
    ]
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
            <TouchableOpacity key={i} onPress={() => NavigationManager.navigate("SingleMessagePage", 
                                                    {chosenChat: datingChats[i]['messages'], thisAccount: props.thisAccount})}>
              <Card>
                <CardItem>
                  <View style={{flexDirection: "row"}}>
                    <Avatar size="large" rounded />
                    <View style={{width: deviceWidth * (7.7/10), paddingLeft: 15, paddingRight: 15, flexDirection: "column", flexWrap: 'wrap'}}>
                      <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 17, paddingBottom: 7}}>{datingChats[i]['person']}</Text>
                      <Text numberOfLines={2} style={{fontFamily: 'Montserrat-Regular', fontSize: 13, paddingBottom: 7}}>{datingChats[i]['messages'][datingChats[i]['messages'].length-1]['content']}</Text>
                      <ShowDate date={datingChats[i]['messages'][datingChats[i]['messages'].length-1]['messageDate']} time={datingChats[i]['messages'][datingChats[i]['messages'].length-1]['messageTime']} />
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
          <TouchableOpacity key={i} onPress={() => NavigationManager.navigate("SingleMessagePage", 
                                                    {chosenChat: jioChats[i]['messages'], thisAccount: props.thisAccount})}>
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
                  <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 13}}>{jioChats[i]['messages'][(jioChats[i]['messages']).length - 1]['sender']}:</Text>
                  <Text numberOfLines={1} style={{fontFamily: 'Montserrat-Regular', fontSize: 13, paddingBottom: 7}}>{jioChats[i]['messages'][(jioChats[i]['messages'].length-1)]['content']}</Text>
                  <ShowDate date={jioChats[i]['messages'][(jioChats[i]['messages']).length - 1]['messageDate']} time={jioChats[i]['messages'][(jioChats[i]['messages']).length - 1]['messageTime']} />
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
            <ButtonSelect thisAccount={this.state.thisAccount} index={this.state.selectedIndex} />
        </ScrollView>
      </Container>
    );
  }
}

/*
//Internal StyleSheet here
*/

module.export = MessagePage; //module export statement
