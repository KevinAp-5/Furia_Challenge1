import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/home';
import LoginScreen from './screens/login';
import ChatScreen from './screens/chat';
import AboutScreen from './screens/about';
import RegisterScreen from './screens/register';
import ProfileScreen from './screens/profile';
import ForgotPasswordScreen from './screens/forgotPassword';
import PasswordResetEmailConfirmed from './screens/passwordResetEmailConfirmed';
import SplashScreen from './screens/splash';
import RequestPasswordReset from './screens/requestPasswordReset';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  Chat: undefined;
  About: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  PasswordResetEmailConfirmed: undefined;
  RequestPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PasswordResetEmailConfirmed" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="PasswordResetEmailConfirmed" component={PasswordResetEmailConfirmed} />
        <Stack.Screen name="RequestPassword" component={RequestPasswordReset} />
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}
