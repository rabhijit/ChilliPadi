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

const jioKeyExtractor = jio => jio.jioId.toString();

// /data/data/com.chillipadi2/files/default.realm

/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/

var db = firebase.firestore();

export default class JioPage extends Component {
    constructor(props) {
    super(props);
    this.state = {
      //state property here
      Jios: null,
      ready: false,
      dataVersion: 0,
      isOverlayVisible: false,
      maxCheck: false,
      newJioName: "",
      newJioLocation: "",
      newJioDescription: "",
      newJioExpiry: "",
      newJioMax: 1e20
    };
    this.writeJio = this.writeJio.bind(this);
  }

  componentDidMount() {
    const realm = this.state.ourrealm;
    let jios = realm.objects('Jio');
    jios.addListener(() => {
        this.setState({dataVersion: this.state.dataVersion + 1});
    })
    this.subscription = jios.subscribe();
    this.subscription.addListener(this.onSubscriptionChange);
    this.setState({ Jios : jios });
  }

  writeJio() {

      const realm = this.state.ourrealm;
      if (!(this.state.newJioName == "" && this.state.newJioLocation == "" && this.state.newJioDescription == "" && this.state.newJioExpiry == "")) {
        realm.write(() => {
            realm.create('Jio', {
                jioId: (this.state.Jios == null ? 0 : this.state.Jios.length),
                titleName: this.state.newJioName,
                location: this.state.newJioLocation,
                distanceFromHere: Math.floor(Math.random() * 30000),
                description: this.state.newJioDescription,
                numberOfPeople: 1,
                maxNumber: this.state.newJioMax,
                expiryDate: this.state.newJioExpiry,
                jioCreator: "you"
            });
        });
        Toast.show({text: "Jio created!"})
        this.setState({newJioName: "", newJioDescription: "", newJioExpiry: "", newJioMax: 1e20});
    }
    else {
        Toast.show({text: "Please fill in all particulars."});
    }
  }

  onSubscriptionChange = (sub, substate) => {
      /*
      switch (substate) {
          case Realm.Sync.SubscriptionState.Creating:
          // The subscription has not yet been written to the Realm
            console.warn('Creating subscription...');
            break;
          case Realm.Sync.SubscriptionState.Pending:
          // The subscription has been written to the Realm and is waiting
          // to be processed by the server
            console.warn('Pending subscription...');
            break;
          case Realm.Sync.SubscriptionState.Complete:
              // The subscription has been processed by the server and all objects
              // matching the query are in the local Realm
              console.warn('Subscription complete.');
              break;
          case Realm.Sync.SubscriptionState.Invalidated:
          // The subscription has been removed
            console.warn('Invalid subscription.');
            break;
          case Realm.Sync.SubscriptionState.Error:
              console.warn('An error occurred: ', subscription.error);
              break;
      }
      */
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
            return <NumericInput onChange={(value) => this.setState({newJioMax: value})} />
        }
    }

    let rows = [];
    if (this.state.Jios != null) {
        for (let i = 0; i < this.state.Jios.length; i++) {
            rows.push(
                <TouchableOpacity key={i} onPress={() => NavigationManager.navigate("SingleJioPage",
                                                    {chosenJio: this.state.Jios[i]})}>
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

    const Jios = this.state.Jios;
    const ready = this.state.ready;
    const dataVersion = this.state.dataVersion;

    return (
      <Container>
          <MyHeader />
            <ScrollView>
            <SearchBar inputStyle={{fontFamily: "Montserrat-Regular"}} placeholder="Search for jios here..."
                        lightTheme={true}
            />
                <CardItem><Text style={{fontFamily: "Montserrat-Light"}}>{rows.length} results</Text></CardItem>
                {rows}
          </ScrollView>
          <Overlay isVisible={this.state.isOverlayVisible}
                    onBackdropPress={() => this.setState({isOverlayVisible: false})}
                    width={(9/10)*deviceWidth} height={(9/10)*deviceHeight}>
                <Root>
                <View>
                    <Text style={{paddingLeft: 3, paddingBottom: 18, fontFamily: "Montserrat-Bold", fontSize: 20}}>Your new jio</Text>
                    <Text style={{paddingLeft: 10, fontFamily: "Montserrat-SemiBold", fontSize: 17}}>Jio name:</Text>
                    <Input containerStyle={{paddingBottom: 10}} placeholder="Enter name" inputStyle={{fontSize: 15, fontFamily: "Montserrat-Light"}}
                           onChangeText={(text) => {this.setState({newJioName: text})}}
                    />
                    <Text style={{paddingLeft: 10, fontFamily: "Montserrat-SemiBold", fontSize: 17}}>Location:</Text>
                    <Input containerStyle={{paddingBottom: 10}} placeholder="Enter location" inputStyle={{fontSize: 15, fontFamily: "Montserrat-Light"}}
                           onChangeText={(text) => {this.setState({newJioLocation: text})}}
                    />
                    <Text style={{paddingLeft: 10, fontFamily: "Montserrat-SemiBold", fontSize: 17}}>Description:</Text>
                    <Input containerStyle={{paddingBottom: 10}} placeholder="Enter description" inputStyle={{fontSize: 15, fontFamily: "Montserrat-Light"}}
                           onChangeText={(text) => {this.setState({newJioDescription: text})}}
                    />
                    <Text style={{paddingLeft: 10, paddingBottom: 5, fontFamily: "Montserrat-SemiBold", fontSize: 17}}>Expiry date:</Text>
                    <DatePicker format="DD/MM/YYYY" style={{paddingBottom: 10, paddingLeft: 10}} date={this.state.newJioExpiry} placeholder="Select date" 
                                onDateChange={(date) => this.setState({newJioExpiry: date})}
                    />
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{paddingLeft: 10, paddingBottom: 5, fontFamily: "Montserrat-SemiBold", fontSize: 17}}>Set a maximum jio size:</Text>
                        <CheckBox checked={this.state.maxCheck} color="maroon" onPress={() => {this.setState({maxCheck: !this.state.maxCheck})}} />
                    </View>
                    <View style={{paddingLeft: 10}}>
                        <MaxSet maxCheck={this.state.maxCheck} />
                    </View>
                    <View style={{paddingLeft: 10, paddingTop: 10}}>
                        <Button style={{flexDirection: "row", backgroundColor: "maroon", justifyContent: "center"}} onPress={this.writeJio}>
                            <Text style={{fontFamily: "Montserrat-Bold", fontSize: 15, color: "white"}}>Submit your jio</Text>
                        </Button>
                    </View>
                </View>
                </Root>
          </Overlay>
          <Footer>
              <FooterTab style={{"backgroundColor": "maroon", borderRadius: 1, borderColor: "maroon", borderWidth: 0}}>
                  <Button style={{flexDirection: "row", justifyContent: "center"}} onPress={() => this.setState({isOverlayVisible: true})}>
                      <Icon type="AntDesign" name="pluscircleo"
                            style={{color:"white", fontSize: 35}} />
                      <Text style={{fontFamily: "Montserrat-Bold", fontSize: 15, color: "white"}}>Create jio</Text>
                  </Button>
              </FooterTab>
          </Footer>
      </Container>
      /*
      <View>
          <FlatList
            data={Jios}
            extraData={dataVersion}
            renderItem={this.renderJio}
            keyExtractor={jioKeyExtractor}
          />
      </View>
      */
    );
  }

  renderJio = ({ item }) => (
         <TouchableOpacity key={item.jioId} onPress={() => NavigationManager.navigate("SingleJioPage",
                                                {chosenJio: item})}>
            <Card>
               <CardItem>
                   <View style={{flexDirection: "column"}}>
                       <Text style={{fontFamily: "Montserrat-Bold", fontSize: 17}}>{item.titleName}</Text>
                                              {/*<ShowDate date={item.expiryDate} number={0} />*/}
                       <Text style={{paddingTop: 4, paddingBottom: 4, fontFamily: "Montserrat-Light", fontSize: 13, paddingRight: "1%"}} numberOfLines={2}>
                           {item.description}
                       </Text>
                       {/*<MemberNumber maximum={item.maxNumber} noPeople={item.numberOfPeople} number={0} />*/}

                   </View>
               </CardItem>
            </Card>
           </TouchableOpacity>

  )
}



/*
//Internal StyleSheet here
*/

module.export = JioPage; //module export statement