import React, { useState, useEffect } from "react";
import {
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { Provider, } from "react-redux";
import store from "./src/Store/index";
// @ts-ignore
import Badge from "react-native-tab-navigator/Badge";

import SplashScreen from "react-native-splash-screen";
import NavPage from "./pages/NavPage";
import UploadAction from "./src/components/UploadAction/UploadAction";
import FileDetail from "./src/components/FileDetail/FileDetail";

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  useEffect(() => {
    SplashScreen.hide();
  });

  return <Provider store={store}>
    <NavigationContainer>

      <NavPage/>
      <UploadAction />
      <FileDetail />

    </NavigationContainer>
  </Provider>;
};

export default App;
