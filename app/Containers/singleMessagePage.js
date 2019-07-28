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
      user: this.props.navigation.state.params.user,
      messages: [],
      chosenChat: this.props.navigation.state.params.chosenChat,
      chosenChatId: this.props.navigation.state.params.chosenChatId,
      chosenDp: this.props.navigation.state.params.chosenDp,
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
      db.collection('datingChats').where("senderID", '==', this.state.chosenChatId).where("recipientID", '==', this.state.user["ID"])
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
            if (this.state.chosenDp != "null") {
              userObj['avatar'] = this.state.chosenDp;
            }
            eachMsg['user'] = userObj;
            newDatingMsgs.push(eachMsg);
            coveredIds.push(doc.id);
          }
        })
        newDatingMsgs.sort(this.compare);
        this.setState({messages: newDatingMsgs});
      })

      db.collection('datingChats').where("senderID", '==', this.state.user["ID"]).where("recipientID", "==", this.state.chosenChatId)
      .orderBy("timestamp", "desc").onSnapshot(snapshot => {
        snapshot.docs.forEach(doc => {
          if (!(coveredIds.includes(doc.id))) {
            let data = doc.data();
            let eachMsg = {};
            eachMsg['_id'] = doc.id;
            eachMsg['text'] = data.content;
            eachMsg['createdAt'] = moment(data.timestamp.toDate()).add(8, 'hours')
            let userObj = {};
            userObj['name'] = this.state.user["name"];
            userObj['_id'] = 0;
            if (this.state.user.dp != "null") {
              userObj['avatar'] = this.state.user.dp;
            }
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
      /*
      let memberDps = {};
      let memberList = [];
      db.collection('jios').doc(this.state.chosenChatId).get().then(doc => {
        let data = doc.data();
        for (let i in data.members) {
          memberList.push(data.members[i]);
        }
      })

      for (let i in memberList) {
        db.collection('accounts').doc(memberList[i]).get().then(doc => {
          let data = doc.data();
          memberDps[memberList[i]] = data.dp;
                console.warn(memberDps);
        })
      }
      */

      db.collection('jioChats').where("jioID", "==", this.state.chosenChatId).orderBy("timestamp", "desc")
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
            if (data.sender == this.state.user["name"]) {
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
          if (data.dp != "null") {
            userObj['avatar'] = data.dp;
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
    if (this.state.datingOrJio == 0) {
      db.collection('datingChats').add({
        content: message[0]['text'],
        recipient: this.state.chosenChat,
        recipientID: this.state.chosenChatId,
        sender: this.state.user["name"],
        senderID: this.state.user["ID"],
        read: 1,
        timestamp: new Date()
      })
    }
    else {
      db.collection('jioChats').add({
        content: message[0]['text'],
        jio: this.state.chosenChat,
        jioID: this.state.chosenChatId,
        sender: this.state.user["name"],
        senderID: this.state.user["ID"],
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
        <MyHeader user={this.state.user}/>
        <GiftedChat
            messages={this.state.messages}
            onSend={message => this.onSend(message)}
            renderUsernameOnMessage={!!this.state.datingOrJio}
            user={{
                _id: 0,
                name: this.state.user["name"],
                avatar: (this.state.user.dp != "null" ? this.state.user.dp : null)
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
