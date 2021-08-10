import React, {useState, useEffect} from 'react';
import {
    useColorScheme,
    useWindowDimensions,
    Image,
    View,
    Text, SafeAreaView, ScrollView
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//导入
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider} from 'react-redux'
import store from "./src/Store/index";

import Home from "./pages/Home";
import Mine from "./pages/Mine";
import Login from "./pages/LoginScreen"
import SplashScreen from 'react-native-splash-screen'

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const [selectedTab, setSelectedTab] = useState('home');

    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    useEffect(() => {
        SplashScreen.hide();
    })

    return <Provider store={store}>
        <NavigationContainer>

            <Stack.Navigator
                initialRouteName={'Home'}
            >
                <Stack.Screen options={{headerMode: 'none'}} name="Home" component={() => <Tab.Navigator
                    screenOptions={({route})=>({
                        tabBarIcon:({focused,size,color})=>{
                            let icon;
                            if(route.name==="Home"){
                                icon = focused ?
                                    (
                                        <Image
                                            source={ require('./images/home_s.png') }
                                            style={{ width: 25, height: 25, }} />
                                    ) : ( <Image
                                        source={ require('./images/home.png') }
                                        style={{ width: 25, height: 25, }} />)
                            }else if(route.name==="Mine"){
                                icon = focused ? (
                                    <Image
                                        source={ require('./images/mine_s.png') }
                                        style={{ width: 25, height: 25, }} />
                                ) : (<Image
                                    source={ require('./images/mine.png') }
                                    style={{ width: 25, height: 25, }} />)
                            }
                            return icon;
                        }
                    })}
                    tabBarOptions={{activeTintColor:"#07B5D1",inactiveTintColor:"gray"}}
                    backBehavior="none"
                >
                    <Tab.Screen name="Home" component={Home} options={{
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}/>
                    <Tab.Screen name="Mine" component={Mine}/>
                </Tab.Navigator>}
                />
                <Stack.Screen options={{headerMode: 'none'}} name="Login" component={Login}/>
            </Stack.Navigator>


        </NavigationContainer>
    </Provider>

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
