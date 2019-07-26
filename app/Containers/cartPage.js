import React, { Component } from "react";
import { View, ScrollView, Modal } from "react-native";
import { Container,
         Button,
         Icon,
         Text,
         Card,
         CardItem,
         Left,
         Right,
         Body,
         Header,
         Title,
         Form,
         Thumbnail,
         Toast } from "native-base";
import NavigationManager from "../managers/navigationManager";
import CartManager from "../managers/cartManager";
import NumericInput from "react-native-numeric-input";
import MyHeader from "../Components/header";

/*
    other import statements or 
    JS variables like const here - can be dummy datas to use for development
*/
export default class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state property here
      totalPrice: 0,
      totalQuantity: 0,
      cartItems: [],
      isModalVisible: false
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
  componentDidMount() {
      this.getListMenuItems();
  }

  getListMenuItems() {
      // getAllListItems
      let cartPromise = CartManager._retrieveCartItem();
      //console.log(cartPromise);

      cartPromise
        .then(result => {
            //console.log("result", result);
            let cartItems = JSON.parse(result);
            //console.log("cartItems", cartItems);
            if (cartItems.length > 0) {
                this.setState({cartItems: cartItems});
                this.updateTotalPriceTotalQty(cartItems);
            }
        })
        .catch(error => {
            //console.log(error);
        })
  }

  updateTotalPriceTotalQty(cartItems) {
      let totalPrice = 0;
      let totalQuantity = 0;

      for (let key in cartItems) {
          totalPrice += cartItems[key]["subtotal"];
          totalQuantity += cartItems[key]["quantity"];
      }
      //console.log(totalPrice);
      this.setState({totalPrice: totalPrice});
      this.setState({totalQuantity: totalQuantity});
  }

  setListItemQty(qty, idx) {
      let cartItems = this.state.cartItems;
      cartItems[idx]["quantity"] = qty;
      cartItems[idx]["subtotal"] = qty * cartItems[idx]["listing"]["unitPrice"];

      this.setState({cartItems: cartItems});
      //console.log("cartItems", cartItems);
      this.updateCart(cartItems);
      this.updateTotalPriceTotalQty(cartItems);
  }

  render() {
    /*
    JS Expressions here
    -> to pass state data here
    -> to access data of array etc
    */
   let cartItems = this.state.cartItems;
   //console.log(cartItems);
   let rows;

   if (cartItems.length == 0) {
       rows = (
           <View>
            <CardItem style={{flexDirection: "column", alignItems: "flex-start"}}>
                <View>
                    <Title>Your shopping cart is empty.</Title>
                    <Text style={{paddingTop: 15, paddingBottom: 15}}>
                        Your shopping cart lives to serve. Give it purpose. Fill it with daily essentials, gifts and more.
                    </Text>
                    <Button block warning onPress={() => NavigationManager.navigate("HomePage")}>
                        <Text>Continue shopping</Text>
                    </Button>
                </View>
            </CardItem>
          </View>
       );
   }
   else {
     rows = [];
     let count = 0;
     //console.log(cartItems);
     for (let i = 0; i < cartItems.length; i++) {
         rows.push(
             <View key={count}>
                 <CardItem>
                     <Left>
                         <Thumbnail square large source={cartItems[i]["listing"][["image"]]} />
                     </Left>
                     <Body>
                         <Text style={{fontWeight: "bold"}}>
                             {cartItems[i]["listing"]["titleName"]}
                         </Text>
                         <View style={[{flexDirection: "row"}, {paddingTop: 15}]}>
                             <Text style={[{fontSize: 15}]}>Qty: </Text>
                             <NumericInput
                             value={cartItems[i]["quantity"]}
                             onChange={value => this.setListItemQty(Number(value), i)}
                             iconSize={10}
                             step={1}
                             valueType="real"
                             rounded
                             totalWidth={50}
                             totalHeight={25}
                             initValue={cartItems[i]["quantity"]}
                             minValue={1}
                             maxValue={100} />
                         </View>
                         <Text style={[{fontSize: 12}, {paddingTop: 15}]}>
                             Price: S$ {cartItems[i]["listing"]["unitPrice"].toFixed(2)}
                         </Text>
                     </Body>
                 </CardItem>
             </View>
         )
     }
   }

    // Notice JSX - a html-JS like syntax is within ()
    return (
      <Container>
        <MyHeader />
        <ScrollView>
            <View>
                <Form>
                    <Card>{rows}</Card>
                </Form>
            </View>
        </ScrollView>
        <View style={{position: "absolute", bottom: 0, width: "100%"}}>
            <Button block warning onPress={() => {this.onHandleOrderItem();}}>
                <Text>Order items</Text>
                <Text>Total price: S$ {this.state.totalPrice.toFixed(2)}</Text>
            </Button>
        </View>
      </Container>
    );
  }
}

/*
//Internal StyleSheet here
*/

module.export = CartPage; //module export statement
