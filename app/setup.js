import React, { Component } from "react";
import { StyleProvider } from "native-base";

import Main from "./main";
import getTheme from "./assets/native-base-theme/components";
import variables from "./assets/native-base-theme/variables/commonColor";

export default class Setup extends Component {
    render() {
        return (
            <StyleProvider style={getTheme(variables)}>
                <Main />
            </StyleProvider>
        );
    }
}