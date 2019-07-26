import React, { Component } from "react";
import { View, ScrollView, Image } from "react-native";
import { Container, Button, Icon, Text, Toast } from "native-base";
import NumericInput from "react-native-numeric-input";
import NavigationManager from "../managers/navigationManager";
import CartManager from "../managers/cartManager";

/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/
export default class SingleListingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
      listing: this.props.navigation.state.params.listing,
      qty: 0
    };
  }

  setQty(newQty) {
      this.setState({qty: newQty});
  }

  handleClick() {
      if (this.state.qty != 0) {
          this.addToCart();
          Toast.show({text: this.state.qty + " item has been updated into cart"});
      }
      else {
          Toast.show({text: "No amount of items has been selected!"});
      }
  }

  createListingItem() {
      return (listingItem = {
          quantity: this.state.qty,
          listing: this.state.listing,
          subtotal: this.state.qty * this.state.listing.unitPrice
      });
  }

  addToCart() {
      let listingId = this.state.listing.listingId;
      let listingItem = this.createListingItem();
      let cartPromise = CartManager._retrieveCartItem();

      cartPromise.then(result => {
          //console.log("result", result);
          let listMenuItems = JSON.parse(result);
          let isExistingItem = false;

          // if cart is not empty
          if (listMenuItems.length > 0) {
              for (let i = 0; i < listMenuItems.length; i++) {
                  //console.log("listMenuItems", listMenuItems[i]["listing"]["listingId"]);

                  // update listItem qty if found
                  if (listMenuItems[i]["listing"]["listingId"] == listingId) {
                      listMenuItems[listingItemIdx]["quantity"] += listingItem["quantity"];
                      listMenuItems[listingItemIdx]["subtotal"] += listingItem["subtotal"];
                      CartManager._storeCartItem(listMenuItems);
                      isExistingItem = true;
                      break;
                  }
              }

              // add item if not found
              if (!isExistingItem) {
                  listMenuItems.push(listingItem);
                  CartManager._storeCartItem(listMenuItems);
              }
          }
          // else cart is empty
          else {
              listMenuItems.push(listingItem);
              CartManager._storeCartItem(listMenuItems);
          }
      });
      //console.log(CartManager._retrieveCartItem());
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
    /*
    let listing = {
        titleName: "Tomato, 500g",
        description: "Locally Grown Tomato",
        details: "Medium size, round, firm, juicy and red fruit vegetables?!",
        unitPrice: 3.9,
        image: require("../assets/images/grocery/tomatoes-5356_640.jpg")
    }
    */
    return (
      <Container>
        <ScrollView style={{padding: 10}}>
          <View>
              <View style={{justifyContent: "center"}}>
                  <Text style={{alignSelf: "center", fontWeight: "bold"}}>
                      {this.state.listing["titleName"]}
                  </Text>
                  <Image source={this.state.listing["image"]} style={[{width: 150, height: 150, alignSelf: "center"}]} />
              </View>
          </View>

          <View style={{paddingTop: 15, flexDirection: "row"}}>
              <View style={{paddingLeft: "5%", justifyContent: "flex-start"}}>
                  <Text>
                      Retail price:
                      <Text style={{textDecorationLine: "line-through", textDecorationStyle:"solid"}}>
                          S$ {this.state.listing["unitPrice"].toFixed(2)}
                      </Text>
                  </Text>
                  <Text>Price: S$ {this.state.listing["unitPrice"].toFixed(2)}</Text>
              </View>
              <View style={{paddingLeft: "15%", justifyContent: "flex-end"}}>
                  <NumericInput
                    value={this.state.qty}
                    onChange={value => this.setQty(Number(value))}
                    iconSize={20}
                    step={1}
                    valueType="real"
                    rounded
                    totalWidth={100}
                    totalHeight={35}
                    initValue={this.state.qty}
                    minValue={0}
                    maxValue={100} />
              </View>
          </View>
          <View style={{paddingTop: 15}}>
              <Button block warning onPress={() => this.handleClick()}>
                  <Icon type="FontAwesome" name="shopping-cart" style={{color: "black"}} />
                  <Text>Add to cart</Text>
              </Button>
          </View>
          <View style={{paddingTop: 15}}>
              <Text style={{fontWeight: "bold"}}>About this item</Text>
              <View style={{paddingTop: 15}}>
                  <Text style={{fontWeight: "bold"}}>Description</Text>
                  <Text>{this.state.listing["description"]}</Text>
              </View>
              <View style={{paddingTop: 15}}>
                  <Text style={{fontWeight: "bold"}}>Features & Details</Text>
                  <Text>{this.state.listing["details"]}</Text>
              </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

/*
//Internal StyleSheet here
*/

module.export = SingleListingPage; //module export statement
