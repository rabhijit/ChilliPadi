import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { Container, Icon, Text, Card, CardItem, Button, Footer, FooterTab } from "native-base";
import { Avatar } from "react-native-elements";
import moment from "moment";
/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/
export default class SingleJioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
      thisJio: this.props.navigation.state.params.chosenJio
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

    // Notice JSX - a html-JS like syntax is within ()

    function MemberNumber(props) {
        let maximumSet = (props.max == Infinity);
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

    return (
      <Container>
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
                            <Button block style={{width: "118%", backgroundColor: "maroon", flexDirection: "row", justifyContent: "center"}}>
                                <Icon type="MaterialCommunityIcons" name="message" style={{color: "white"}} />
                                <Text style={{fontFamily: "Montserrat-SemiBold"}}>Message</Text>
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
              <FooterTab style={{"backgroundColor": "white", borderRadius: 1, borderColor: "maroon", borderWidth: 0.8}}>
                  <Button style={{flexDirection: "row", justifyContent: "center"}}>
                      <Icon type="AntDesign" name="pluscircleo"
                            style={{color:"maroon", fontSize: 35}} />
                      <Text style={{fontFamily: "Montserrat-Bold", fontSize: 15, color: "maroon"}}>Join this jio</Text>
                  </Button>
              </FooterTab>
          </Footer>
      </Container>
    );
  }
}

/*
//Internal StyleSheet here
*/

module.export = SingleJioPage; //module export statement
