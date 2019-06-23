import { NavigationActions, StackActions } from "react-navigation";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
    //console.log(_navigator);
}

function navigate(routeName, params) {
    //console.log(_navigator);
    if (_navigator !== undefined) {
        _navigator.dispatch(
            NavigationActions.navigate({
                routeName,
                params
            })
        );
    }
}

function goBack() {
    if (_navigator !== undefined) {
        _navigator.dispatch(NavigationActions.back({ key: null }));
    }
}

export default {
    navigate,
    setTopLevelNavigator,
    goBack
};