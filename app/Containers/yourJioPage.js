import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Container, Card, CardItem, Button, Text, Footer, FooterTab, Icon, CheckBox, Toast, Root } from "native-base";
import { SearchBar, Overlay, Input } from "react-native-elements";
import MyHeader from "../Components/header";
import moment from "moment";
import NavigationManager from "../managers/navigationManager";
import DatePicker from "react-native-datepicker";
import NumericInput from "react-native-numeric-input";
import firebase from "react-native-firebase";

// /data/data/com.chillipadi2/files/default.realm

/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/

// order jios
// use querying for searchbar

let db = firebase.firestore();

export default class YourJioPage extends Component {
    constructor(props) {
    super(props);
    this.state = {
      //state property here
      user: this.props.navigation.state.params.user,
      Jios: [],
      isOverlayVisible: false,
      maxCheck: false,
      newJioName: "",
      newJioLocation: "",
      newJioDescription: "",
      newJioExpiry: "",
      newJioMax: 1e20
    };
    this.setJioMax = this.setJioMax.bind(this);
  }

  componentDidMount() {
    db.collection('jios').where('members', 'array-contains', this.state.user["ID"]).onSnapshot(snapshot => {
        this.setState({Jios: []});
        snapshot.docs.forEach(doc => {
            let eachJio = {};
            let data = doc.data();
            eachJio['jioID'] = doc.id;
            eachJio['titleName'] = data.titleName;
            eachJio['location'] = data.location;
            eachJio['distanceFromHere'] = data.distanceFromHere;
            eachJio['description'] = data.description;
            eachJio['numberOfPeople'] = data.numberOfPeople;
            eachJio['maxNumber'] = data.maxNumber;
            eachJio['expiryDate'] = data.expiryDate;
            eachJio['genderPref'] = data.genderPref;
            eachJio['jioCreator'] = data.jioCreator;
            eachJio['members'] = data.members;
            if (!(this.state.Jios.includes(eachJio))) {
                this.setState(prevState => ({
                    Jios: [...prevState.Jios, eachJio],
                }));
            }
        })
    })
  }

  componentWillUnmount() {
    this.setState({isOverlayVisible: false});
  }

  setJioMax(value) {
    this.setState({newJioMax: value});
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

    //console.warn(this.state.dataVersion);

    let deviceHeight = Dimensions.get('window').height;
    let deviceWidth = Dimensions.get('window').width;

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

    function MaxSet(props) {
        if (props.maxCheck == false) {
            return null;
        }
        else {
            return <NumericInput onChange={value => this.setJioMax(value)} />
        }
    }

    let rows = [];
    if (this.state.Jios != null) {
        for (let i = 0; i < this.state.Jios.length; i++) {
            rows.push(
                <TouchableOpacity key={i} onPress={() => NavigationManager.navigate("SingleJioPage",
                                                    {user: this.state.user, chosenJio: this.state.Jios[i]})}>
                <Card>
                <CardItem>
                    <View style={{flexDirection: "column"}}>
                        <Text style={{fontFamily: "Montserrat-Bold", fontSize: 17}}>{this.state.Jios[i].titleName}</Text>
                                                <ShowDate date={this.state.Jios[i].expiryDate} number={i} />
                        <Text style={{paddingTop: 4, paddingBottom: 4, fontFamily: "Montserrat-Light", fontSize: 13, paddingRight: "1%"}} numberOfLines={2}>
                            {this.state.Jios[i].description}
                        </Text>
                        <MemberNumber maximum={this.state.Jios[i].maxNumber} noPeople={this.state.Jios[i].numberOfPeople} number={i} />

                    </View>
                </CardItem>
                </Card>
            </TouchableOpacity>
            );
        }
    }

    return (
      <Container>
          <MyHeader user={this.state.user}/>
            <ScrollView>
            <SearchBar inputStyle={{fontFamily: "Montserrat-Regular"}} placeholder="Search for jios here..."
                        lightTheme={true}
            />
                <CardItem><Text style={{fontFamily: "Montserrat-Light"}}>{rows.length} results</Text></CardItem>
                {rows}
          </ScrollView>
      </Container>
    );
  }

}



/*
//Internal StyleSheet here
*/

module.export = YourJioPage; //module export statement