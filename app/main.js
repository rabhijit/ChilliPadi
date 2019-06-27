import React from "react";
import { Root } from "native-base";
import { createAppContainer, createStackNavigator } from "react-navigation";
import HomePage from "./Containers/homePage";
import ListingPage from "./Containers/listingPage";
import SingleListingPage from "./Containers/singleListingPage";
import NavigationManager from "./managers/navigationManager";
import LoginPage from "./Containers/loginPage";
import JioPage from "./Containers/jioPage";
import SingleJioPage from "./Containers/singleJioPage";
import MessagePage from "./Containers/messagePage";
import SingleMessagePage from "./Containers/singleMessagePage";
import SwipingPage from "./Containers/swipingPage";

/*
    other import statements or
    JS variables like const here - can be dummy datas to use for development
*/

const MyStackNavigator = createStackNavigator(
    {
        /*
        LoginPage: {
            screen: LoginPage
        },
        */
        HomePage: {
            screen: HomePage
        },
        MessagePage: {
            screen: MessagePage
        },
        SingleMessagePage: {
            screen: SingleMessagePage
        },
        ListingPage: {
            screen: ListingPage
        },
        SingleListingPage: {
            screen: SingleListingPage
        },
        SwipingPage: {
            screen: SwipingPage
        },
        JioPage: {
            screen: JioPage
        },
        SingleJioPage: {
            screen: SingleJioPage
        }
    },
    {
        headerMode: "none"
    }
);

const AppContainer = createAppContainer(MyStackNavigator);

export default () => (
    <Root>
        <AppContainer
            ref={navigatorRef => {
                //console.log(navigatorRef);
                NavigationManager.setTopLevelNavigator(navigatorRef);
            }}
            />
    </Root>
);





