import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Container, Card, CardItem, Button, Text, Footer, FooterTab, Icon } from "native-base";
import { SearchBar } from "react-native-elements";
import MyHeader from "../Components/header";
import moment from "moment";
import NavigationManager from "../managers/navigationManager";
import fs from 'react-native-fs';
import { JioSchema } from "../allSchemas";

const Realm = require('realm');
// /data/data/com.chillipadi2/files/default.realm

/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/

export default class JioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
      realm: null,
      size: -1,
      Jios: []
      
    };
  }
  componentWillMount() {
      fs.copyFileAssets('default.realm', fs.DocumentDirectoryPath + '/default.realm')
      .then(() => {
        Realm.open({
            path: fs.DocumentDirectoryPath + '/default.realm',
            schema: [JioSchema]
        })
        .then(realm => {
            this.setState({realm});
            this.setState({size: realm.objects('Jio').length});
            let jios = realm.objects('Jio');
            for (let i = 0; i < jios.length; i++) {
                let eachJio = {};
                eachJio['jioId'] = jios[i].jioId;
                eachJio['titleName'] = jios[i].titleName;
                eachJio['location'] = jios[i].location;
                eachJio['distanceFromHere'] = jios[i].distanceFromHere;
                eachJio['description'] = jios[i].description;
                eachJio['numberOfPeople'] = jios[i].numberOfPeople;
                eachJio['maxNumber'] = jios[i].maxNumber;
                eachJio['expiryDate'] = jios[i].expiryDate;
                eachJio['genderPref'] = jios[i].genderPref;
                eachJio['jioCreator'] = jios[i].jioCreator;
                this.setState(prevState => ({
                    Jios: [...prevState.Jios, eachJio]
                }));
            }
        });
    });
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

    // &#8734; is the infinity symbol
    // fix footer issue

    function MemberNumber(props) {
        let inf_const = 1e20;
        let maximum = props.maximum;
        if (maximum == inf_const) {
            return <Text style={{fontFamily: "Montserrat-SemiBold", fontSize: 13}}>
                {props.noPeople} members
            </Text>;
        }
        else {
            return <Text style={{fontFamily: "Montserrat-SemiBold", fontSize: 13}}>
                {props.noPeople} / {props.maximum} members
            </Text>;
        }
    }

    function ShowDate(props) {
        let day = moment(props.date, "YYYY-MM-DD HH:mm:ss").format('ddd');
        return <Text style={{fontFamily: "Montserrat-SemiBold", fontSize: 13}}>
            Expires {day}, {props.date}
        </Text>
    }

    let rows = [];
    for (let i in this.state.Jios) {
        rows.push(
            <TouchableOpacity key={i} onPress={() => NavigationManager.navigate("SingleJioPage",
                                                {chosenJio: this.state.Jios[i]})}>
            <Card>
               <CardItem>
                   <View style={{flexDirection: "column"}}>
                       <Text style={{fontFamily: "Montserrat-Bold", fontSize: 17}}>{this.state.Jios[i]["titleName"]}</Text>
                                              <ShowDate date={this.state.Jios[i]["expiryDate"]} number={i} />
                       <Text style={{fontFamily: "Montserrat-Light", fontSize: 12, paddingRight: "1%"}} numberOfLines={2}>
                           {this.state.Jios[i]["description"]}
                       </Text>
                       <MemberNumber maximum={this.state.Jios[i]["maxNumber"]} noPeople={this.state.Jios[i]["numberOfPeople"]} number={i} />

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
