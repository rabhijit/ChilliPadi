import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Container, Card, CardItem, Button, Text, Footer, FooterTab, Icon } from "native-base";
import { SearchBar } from "react-native-elements";
import MyHeader from "../Components/header";
import moment from "moment";
import NavigationManager from "../managers/navigationManager";

/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/

const Jios = [
    {
        jioId: 1,
        titleName: "Chainsmokers concert jio!!",
        location: "Singapore Indoor Stadium",
        distanceFromHere: 16800,
        description: "So baby pull me closer in the back seat of your Rover",
        numberOfPeople: 18,
        maxNumber: Infinity,
        expiryDate: "21/8/2019",
        genderPref: 1, // women only
        jioCreator: "Amir Azhar"
    },
    {
        jioId: 2,
        titleName: "SUNNus Captain's Ball Team - Players needed",
        location: "Siloso Beach",
        distanceFromHere: 10600,
        description: "Need some interested players to form a men's Captain's Ball Team. We need bla bla bla extra text just to check truncation",
        numberOfPeople: 6,
        maxNumber: 10,
        expiryDate: "15/6/2019",
        genderPref: 0, // men only
        jioCreator: "Sad CEG Student"

    },
    {
        jioId: 3,
        titleName: "EE2026 study jio",
        location: "COM1 basement",
        distanceFromHere: 500,
        description: "Midterms are tomorrow, the grind is real",
        numberOfPeople: 2,
        maxNumber: 5,
        expiryDate: "13/8/2019",
        genderPref: 2, // all genders
        jioCreator: "Sad CEG Student"
    },
    {
        jioId: 4,
        titleName: "Tembu lobby Valentine's Day concert",
        location: "Tembusu College",
        distanceFromHere: 2000,
        description: "Come watch some imbeciles play the guitar",
        numberOfPeople: 17,
        maxNumber: Infinity,
        expiryDate: "14/2/2019",
        genderPref: 2, // all genders
        jioCreator: "Abhijit Ravichandran"
    },
    {
        jioId: 5,
        titleName: "sheares cheer competition jio",
        location: "opposite SAFTI",
        distanceFromHere: 25000,
        description: "come watch Max destroy his glasses",
        numberOfPeople: 7,
        maxNumber: 30,
        expiryDate: "26/6/2019",
        genderPref: 2, // all genders
        jioCreator: "Max Chan"
    }
]

export default class JioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
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

    // &#8734; is infinity
    // fix footer issue

    function MemberNumber(props) {
        let maximumSet = props.maximumSet;
        let number = props.number;
        if (!maximumSet) {
            return <Text style={{fontFamily: "Montserrat-SemiBold", fontSize: 13}}>
                {Jios[number]["numberOfPeople"]} members
            </Text>;
        }
        else {
            return <Text style={{fontFamily: "Montserrat-SemiBold", fontSize: 13}}>
                {Jios[number]["numberOfPeople"]} / {Jios[number]["maxNumber"]} members
            </Text>;
        }
    }

    function ShowDate(props) {
        let day = moment(props.date, "YYYY-MM-DD HH:mm:ss").format('ddd');
        let number = props.number;
        return <Text style={{fontFamily: "Montserrat-SemiBold", fontSize: 13}}>
            Expires {day}, {Jios[number]["expiryDate"]}
        </Text>
    }

    let rows = [];
    for (let i in Jios) {
        rows.push(
            <TouchableOpacity key={i} onPress={() => NavigationManager.navigate("SingleJioPage",
                                                {chosenJio: Jios[i]})}>
            <Card>
               <CardItem>
                   <View style={{flexDirection: "column"}}>
                       <Text style={{fontFamily: "Montserrat-Bold", fontSize: 17}}>{Jios[i]["titleName"]}</Text>
                                              <ShowDate date={Jios[i]["expiryDate"]} number={i} />
                       <Text style={{fontFamily: "Montserrat-Light", fontSize: 12, paddingRight: "1%"}} numberOfLines={2}>
                           {Jios[i]["description"]}
                       </Text>
                       <MemberNumber maximumSet={Jios[i]["maxNumber"] != Infinity} number={i} />

                   </View>
               </CardItem>
            </Card>
           </TouchableOpacity>
        );
    }

    return (
      <Container>
          <MyHeader />
          <ScrollView>
            <SearchBar placeholder="Search for jios here..."
                        lightTheme={true}
            />
                <CardItem><Text style={{fontFamily: "Montserrat-Light"}}>{rows.length} results</Text></CardItem>
                {rows}
          </ScrollView>
          <Footer>
              <FooterTab style={{"backgroundColor": "maroon", borderRadius: 1, borderColor: "maroon", borderWidth: 0}}>
                  <Button style={{flexDirection: "row", justifyContent: "center"}}>
                      <Icon type="AntDesign" name="pluscircleo"
                            style={{color:"white", fontSize: 35}} />
                      <Text style={{fontFamily: "Montserrat-Bold", fontSize: 15, color: "white"}}>Create jio</Text>
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

module.export = JioPage; //module export statement
