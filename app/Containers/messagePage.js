import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Container, Card, CardItem, Button, Text, Footer, FooterTab, Icon } from "native-base";
import { SearchBar, Avatar, ButtonGroup } from "react-native-elements";
import MyHeader from "../Components/header";
import moment from "moment";
import NavigationManager from "../managers/navigationManager";
import firebase from "react-native-firebase";

/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/

// update messageTime to include seconds

let db = firebase.firestore();

export default class MessagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
      selectedIndex: 0,
      datingChats: {},
      jioChats: {}
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  // this.state.jioChats, this.state.datingChats ?? 
  componentDidMount() {
    // latest msg only
    db.collection('datingChats').orderBy("timestamp", "desc").onSnapshot(snapshot => {
      this.setState({datingChats: {}});
      let conversations = [];
      let newDatingChats = {};
      snapshot.docs.forEach(doc => {
        let data = doc.data();
        if (data.sender == "you" || data.recipient == "you") {
          if (!(conversations.includes(data.sender)) || !(conversations.includes(data.recipient))) {
            let thisChat = {};
            thisChat["id"] = doc.id;
            thisChat["content"] = data.content;
            thisChat["sender"] = data.sender;
            thisChat["timestamp"] = data.timestamp;
            thisChat["messageDate"] = moment(data.timestamp.toDate()).add(8, 'hours').format('DD/MM/YYYY').toString();
            thisChat["messageTime"] = moment(data.timestamp.toDate()).add(8, 'hours').format('HH:mm').toString();
            if (!(conversations.includes(data.sender))) {
              conversations.push(data.sender);
            }
            if (!(conversations.includes(data.recipient))) {
              conversations.push(data.recipient);
            }
            if (data.sender == "you") {
              if (!(data.recipient in newDatingChats)) {
                newDatingChats[data.recipient] = [];
              }
              newDatingChats[data.recipient].push(thisChat);
            }
            else {
              if (!(data.sender in newDatingChats)) {
                newDatingChats[data.sender] = [];
              }
              newDatingChats[data.sender].push(thisChat);
            }
            //console.warn(conversations);
          }
        }
      })
      this.setState({datingChats: newDatingChats});
    })

    db.collection('jioChats').orderBy("timestamp", "desc").onSnapshot(snapshot => {
      this.setState({jioChats: {}});
      let conversations = [];
      let newJioChats = {};
      snapshot.docs.forEach(doc => {
        let data = doc.data();
        /* current code assumes you are in all jios in the database. fix later
        to only search for jios u are in (if you are in data.jio.member) */
        if (!(conversations.includes(data.jio))) {
          let thisChat = {};
          thisChat["id"] = doc.id;
          thisChat["content"] = data.content;
          thisChat["jio"] = data.jio;
          thisChat["sender"] = data.sender;
          thisChat["timestamp"] = data.timestamp;
          thisChat["messageDate"] = moment(data.timestamp.toDate()).add(8, 'hours').format('DD/MM/YYYY').toString();
          thisChat["messageTime"] = moment(data.timestamp.toDate()).add(8, 'hours').format('HH:mm').toString();
          conversations.push(data.jio);
          if (!(data.jio in newJioChats)) {
            newJioChats[data.jio] = [];
          }
          newJioChats[data.jio].push(thisChat);
          //console.warn(conversations);
        }
      })
      this.setState({jioChats: newJioChats});
    })
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
        if (props.sender != "you") {
          return <Text style={{fontFamily: "Montserrat-Regular", fontSize: 10}}>
              {day}, {props.date} at {props.time}
          </Text>
        }
        else {
          if (props.index == 0) {
            return <View style={{flexDirection: "row"}}>
              <Text style={{fontFamily: "Montserrat-Regular", fontSize: 10}}>
                {day}, {props.date} at {props.time}
            </Text>
            <Icon type="MaterialCommunityIcons" name="check" 
                      style={{paddingLeft: 5, fontSize: 12}} />
            </View>
          }
          else {
            return <View style={{flexDirection: "row"}}>
              <Text style={{fontFamily: "Montserrat-Regular", fontSize: 10}}>
                {day}, {props.date} at {props.time}
            </Text>
            <Icon type="MaterialCommunityIcons" name="check-all" 
                      style={{paddingLeft: 5, fontSize: 12}} />
            </View>
          }
        }
    }
    let deviceWidth = Dimensions.get('window').width;

    function ButtonSelect(props) {
      let rows = [];
      if (props.index == 0) {
        for (let i in Object.keys(props.datingChats)) {
          rows.push(
            <TouchableOpacity key={i} onPress={() => NavigationManager.navigate("SingleMessagePage", 
                                                    {chosenChat: Object.keys(props.datingChats)[i], datingOrJio: 0})}>
              <Card>
                <CardItem>
                  <View style={{flexDirection: "row"}}>
                    <Avatar size="large" rounded />
                    <View style={{width: deviceWidth * (7.7/10), paddingLeft: 15, paddingRight: 15, flexDirection: "column", flexWrap: 'wrap'}}>
                      <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 17, paddingBottom: 7}}>{Object.keys(props.datingChats)[i]}</Text>
                      <Text numberOfLines={2} style={{fontFamily: 'Montserrat-Regular', fontSize: 13, paddingBottom: 7}}>{props.datingChats[Object.keys(props.datingChats)[i]][0]['content']}</Text>
                      <ShowDate sender={props.datingChats[Object.keys(props.datingChats)[i]][0]['sender']} index={props.index}
                                date={props.datingChats[Object.keys(props.datingChats)[i]][0]['messageDate']} time={props.datingChats[Object.keys(props.datingChats)[i]][0]['messageTime']} />
                    </View>
                  </View>
                </CardItem>
              </Card>
            </TouchableOpacity>
          );
      }
    }
    else if (props.index == 1) {
      for (let i in Object.keys(props.jioChats)) {
        rows.push(
          <TouchableOpacity key={i} onPress={() => NavigationManager.navigate("SingleMessagePage", 
                                                    {chosenChat: Object.keys(props.jioChats)[i], datingOrJio: 1})}>
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
                  <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 17, paddingBottom: 7}}>{Object.keys(props.jioChats)[i]}</Text>
                  <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 13}}>{props.jioChats[Object.keys(props.jioChats)[i]][0]['sender']}:</Text>
                  <Text numberOfLines={1} style={{fontFamily: 'Montserrat-Regular', fontSize: 13, paddingBottom: 7}}>{props.jioChats[Object.keys(props.jioChats)[i]][0]['content']}</Text>
                  <ShowDate sender={props.jioChats[Object.keys(props.jioChats)[i]][0]['sender']} index={props.index}
                            date={props.jioChats[Object.keys(props.jioChats)[i]][0]['messageDate']} time={props.jioChats[Object.keys(props.jioChats)[i]][0]['messageTime']} />
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
            <ButtonSelect thisAccount={this.state.thisAccount} index={this.state.selectedIndex} 
                          datingChats={this.state.datingChats} jioChats={this.state.jioChats}
             />
        </ScrollView>
      </Container>
    );
  }
}

/*
//Internal StyleSheet here
*/

module.export = MessagePage; //module export statement
