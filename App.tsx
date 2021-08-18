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

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const [selectedTab, setSelectedTab] = useState("home");

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  useEffect(() => {
    SplashScreen.hide();
  });

  return <Provider store={store}>
    <NavigationContainer>

      <NavPage/>
      <UploadAction />

    </NavigationContainer>
  </Provider>;

  // @ts-ignore
  /* return (
       <NavigationContainer>
           <Stack.Navigator
               initialRouteName={'Home'}
           >
               <Stack.Screen name="Home" component={Home}
               />
               <Stack.Screen name="Login" component={Login} />
           </Stack.Navigator>
       </NavigationContainer>
   );*/
};

export default App;
