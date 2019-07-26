import React, { Component } from "react";
import { View } from "react-native";
import { Container, Text } from "native-base";
import { GiftedChat } from "react-native-gifted-chat";
import moment from "moment";
import MyHeader from "../Components/header";
import firebase from "react-native-firebase";

/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/

let db = firebase.firestore();

let newDatingMsgs = [];
let coveredIds = [];

export default class SingleMessagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
      messages: [],
      chosenChat: this.props.navigation.state.params.chosenChat,
      datingOrJio: this.props.navigation.state.params.datingOrJio
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
 componentWillMount() {
    newDatingMsgs = [];
    coveredIds = [];
    if (this.state.datingOrJio == 0) {
      db.collection('datingChats').where("sender", '==', this.state.chosenChat).where("recipient", '==', 'you')
      .orderBy("timestamp", "desc").onSnapshot(snapshot => {
        snapshot.docs.forEach(doc => {
          if (!(coveredIds.includes(doc.id))) {
            let data = doc.data();
            let eachMsg = {};
            eachMsg['_id'] = doc.id;
            eachMsg['text'] = data.content;
            eachMsg['createdAt'] = moment(data.timestamp.toDate()).add(8, 'hours');
            let userObj = {};
            userObj['name'] = data.sender;
            userObj['_id'] = 1;
            eachMsg['user'] = userObj;
            newDatingMsgs.push(eachMsg);
            coveredIds.push(doc.id);
          }
        })
        newDatingMsgs.sort(this.compare);
        this.setState({messages: newDatingMsgs});
      })

      db.collection('datingChats').where("sender", '==', "you").where("recipient", "==", this.state.chosenChat)
      .orderBy("timestamp", "desc").onSnapshot(snapshot => {
        snapshot.docs.forEach(doc => {
          if (!(coveredIds.includes(doc.id))) {
            let data = doc.data();
            let eachMsg = {};
            eachMsg['_id'] = doc.id;
            eachMsg['text'] = data.content;
            eachMsg['createdAt'] = moment(data.timestamp.toDate()).add(8, 'hours')
            let userObj = {};
            userObj['name'] = "you";
            userObj['_id'] = 0;
            eachMsg['user'] = userObj;
            newDatingMsgs.push(eachMsg);
            coveredIds.push(doc.id);
          }
        })
        newDatingMsgs.sort(this.compare);
        this.setState({messages: newDatingMsgs});
      })
    }

    else if (this.state.datingOrJio == 1) {
      db.collection('jioChats').where("jio", "==", this.state.chosenChat).orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        let newMsgs = [];
        let memberList = [];
        snapshot.docs.forEach(doc => {
          let data = doc.data();
          let eachMsg = {};
          eachMsg['_id'] = doc.id;
          eachMsg['text'] = data.content;
          eachMsg['createdAt'] = moment(data.timestamp.toDate()).add(8, 'hours')
          let userObj = {};
          userObj['name'] = data.sender;
          if (!(memberList.includes(data.sender))) {
            if (data.sender == "you") {
              userObj['_id'] = 0;
            }
            else {
              userObj['_id'] = memberList.length + 1;
              memberList.push(data.sender);
            }
          }
          else {
            userObj['_id'] = memberList.indexOf(data.sender) + 1;
          }
          eachMsg['user'] = userObj;
          newMsgs.push(eachMsg);
        })
        this.setState({messages: newMsgs});
      })
    }
  }

  compare(a, b) {
    if (a['createdAt'] > b['createdAt']) {
      return -1;
    }
    else if (a['createdAt'] < b['createdAt']) {
      return 1;
    }
    else {
      return 0;
    }
  }

  onSend(message) {
    /*
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
    })) */
    if (this.state.datingOrJio == 0) {
      db.collection('datingChats').add({
        content: message[0]['text'],
        recipient: this.state.chosenChat,
        sender: "you",
        read: 1,
        timestamp: new Date()
      })
    }
    else {
      db.collection('jioChats').add({
        content: message[0]['text'],
        jio: this.state.chosenChat,
        sender: "you",
        read: 1,
        timestamp: new Date()
      })
    }

  }


  render() {
    /*
    JS Expressions here
    -> to pass state data here
    -> to access data of array etc
    */

    // Notice JSX - a html-JS like syntax is within ()
    return (
      <Container>
        <MyHeader />
        <GiftedChat
            messages={this.state.messages}
            onSend={message => this.onSend(message)}
            user={{
                _id: 0,
                name: 'you'
            }}
        />
      </Container>
    );
  }
}

/*
//Internal StyleSheet here
*/

module.export = SingleMessagePage; //module export statement
