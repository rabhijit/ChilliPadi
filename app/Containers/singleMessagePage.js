import React, { Component } from "react";
import { View } from "react-native";
import { Container, Text } from "native-base";
import { GiftedChat } from "react-native-gifted-chat";
import moment from "moment";
import MyHeader from "../Components/header";

/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/
export default class SingleMessagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
      messages: [],
      chosenChat: this.props.navigation.state.params.chosenChat,
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
    let memberList = [];
    for (let i in this.state.chosenChat) {
        let eachMsg = {};
        eachMsg['_id'] = this.state.chosenChat[i]['ID'];
        eachMsg['text'] = this.state.chosenChat[i]['content'];
        eachMsg['createdAt'] = new Date(moment(this.state.chosenChat[i]["messageDate"], "DD-MM-YYYY").format("YYYY-MM-DD") + "T" + moment(this.state.chosenChat[i]["messageTime"], "HH:mm").format("HH:mm"));
        let userObj = {};
        userObj['name'] = this.state.chosenChat[i]['sender'];
        if (!(this.state.chosenChat[i]['sender'] in this.state.chosenChat)) {
          if (this.state.chosenChat[i]['sender'] == "you") {
            userObj['_id'] = 0;
          }
          else {
            userObj['_id'] = memberList.length + 1;
            memberList.push(this.state.chosenChat[i]['sender']);
          }
        }
        else {
          userObj['_id'] = memberList.indexOf(this.state.chosenChat[i]['sender']) + 1;
        }
        eachMsg['user'] = userObj;
        this.setState(prevState => ({
            messages: [eachMsg, ...prevState.messages]
        }));
    }
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
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
            onSend={messages => this.onSend(messages)}
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
