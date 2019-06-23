import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Container, Card, CardItem, Thumbnail, Text } from "native-base";
import MyHeader from "../Components/header";
import NavigationManager from "../managers/navigationManager";

/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/

const groceryData = [
    {
        listingId: 1, titleName: "Tomato, 500g",
        description: "Locally Grown Tomato",
        details:
        "Medium size, round, firm, juicy and red fruit vegetables?!",
        unitPrice: 3.9,
        image: require("../assets/images/grocery/tomatoes-5356_640.jpg")
    },
    {
        listingId: 2,
        titleName: "Carrot, 400g",
        description: "Locally Grown Carrot",
        details: "Orange root vegetable that is high in vitamin A content.",
        unitPrice: 2,
        image: require("../assets/images/grocery/carrots-673184_640.jpg")
    },
    {
        listingId: 3,
        titleName: "Lemon, 3 pc",
        description: "Australian Lemons",
        details: "Yellow oval fruit with pimply skin and citrus smell.",
        unitPrice: 1.56,
        image: require("../assets/images/grocery/lemons-2039830_640.jpg")
    }
];

export default class ListingPage extends Component {
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
   let rows = [];
   for (let idx in groceryData) {
       rows.push(
           <CardItem key={idx}>
               <TouchableOpacity style={{flexDirection: "row", justifyContent: "space-evenly"}}
                                onPress={() => NavigationManager.navigate("SingleListingPage",
                                {listing: groceryData[idx]})}>
                   <View style={{flexDirection: "column"}}>
                       <Thumbnail square large source={groceryData[idx]["image"]} />
                   </View>
                   <View style={[{paddingLeft: "20%"}]}>
                       <Text>{groceryData[idx]["titleName"]}</Text>
                       <Text style={{ paddingTop: 15 }}>
                           S$ {groceryData[idx]["unitPrice"].toFixed(2)}
                       </Text>
                   </View>
               </TouchableOpacity>
           </CardItem>
       );
   }

    // Notice JSX - a html-JS like syntax is within ()
    return (
      <Container>
        <MyHeader />
        <ScrollView>
            <Card>
                <CardItem>
                    <Text>{rows.length} Results:</Text>
                </CardItem>
                {rows}
            </Card>
        </ScrollView>
      </Container>
    );
  }
}

/*
//Internal StyleSheet here
*/

module.export = ListingPage; //module export statement
