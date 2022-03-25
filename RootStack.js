import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
import { Colors } from './../components/style';
const{primary,tertiary}=Colors;
//screens
import Login from './../Screens/Login'; 
import Signup from './../Screens/Signup';
import PostAd from './../Screens/PostAd';
import Homepage from './../Screens/Homepage';

const Stack=createNativeStackNavigator()

const RootStack=()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyyled:{
                        backgroundColor:'transparent'
                    },
                    headerTintColor:tertiary,
                    headerTransparent:true,
                    headerTitle:'',
                    headerLeftContainerStyle:{
                        paddingleft:20 
                    }

                }}
                initialRouteName="Login"
                
                >
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Signup" component={Signup}/>
                <Stack.Screen name="PostAd" component={PostAd}/>
                <Stack.Screen name="Homepage" component={Homepage}/>

                


            </Stack.Navigator>



        </NavigationContainer>


    )
}

export default RootStack;