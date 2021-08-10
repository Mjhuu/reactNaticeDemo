import React, {useState} from 'react';
import {
    useColorScheme,
    useWindowDimensions,
    Image,
    View,
    Text, SafeAreaView, ScrollView
} from 'react-native';
// @ts-ignore
import TabNavigator from 'react-native-tab-navigator'
import Home from "./pages/Home";
import Mine from "./pages/Mine";


const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const [selectedTab, setSelectedTab] = useState('home');

    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    return (
        <TabNavigator>
            <TabNavigator.Item
                selected={selectedTab === 'home'}
                title="首页"
                renderIcon={() => <Image style={{width: 20, height: 20}} source={require('./images/home.png')} />}
                renderSelectedIcon={() => <Image style={{width: 20, height: 20}} source={require('./images/home_s.png')} />}
                onPress={() => setSelectedTab('home')}>
                <Home />
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={selectedTab === 'mine'}
                title="我的"
                renderIcon={() => <Image style={{width: 20, height: 20}} source={require('./images/mine.png')} />}
                renderSelectedIcon={() => <Image style={{width: 20, height: 20}} source={require('./images/mine_s.png')} />}
                onPress={() => setSelectedTab('mine')}>
                <Mine />
            </TabNavigator.Item>
        </TabNavigator>
    );
};

export default App;
