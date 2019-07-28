import React from "react";
import { Root } from "native-base";
import { createAppContainer, createStackNavigator } from "react-navigation";
import HomePage from "./Containers/homePage";
import CreateAccountPage from "./Containers/createAccountPage"
import NavigationManager from "./managers/navigationManager";
import LoginPage from "./Containers/loginPage";
import JioPage from "./Containers/jioPage";
import SingleJioPage from "./Containers/singleJioPage";
import MessagePage from "./Containers/messagePage";
import SingleMessagePage from "./Containers/singleMessagePage";
import SwipingPage from "./Containers/swipingPage";
import UserPage from "./Containers/userPage";
import YourJioPage from "./Containers/yourJioPage";

/*
    other import statements or
    JS variables like const here - can be dummy datas to use for development
*/

const MyStackNavigator = createStackNavigator(
    {
        LoginPage: {
            screen: LoginPage
        },

        CreateAccountPage: {
            screen: CreateAccountPage
        },
        HomePage: {
            screen: HomePage
        },
        UserPage: {
            screen: UserPage
        },
        MessagePage: {
            screen: MessagePage
        },
        SingleMessagePage: {
            screen: SingleMessagePage
        },
        SwipingPage: {
            screen: SwipingPage
        },
        JioPage: {
            screen: JioPage
        },
        YourJioPage: {
            screen: YourJioPage
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





