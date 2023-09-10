import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './LoginForm';
import Customers from './Costumers';

const Stack = createStackNavigator();

export default function App() {
  const [token, setToken] = useState('');
  const [authenticatedEmail, setAuthenticatedEmail] = useState('');
  const [authenticatedPassword, setAuthenticatedPassword] = useState('');

  const handleLogin = (token, email, password) => {
    setToken(token);
    setAuthenticatedEmail(email);
    setAuthenticatedPassword(password);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login">
          {(props) => (
            <LoginForm
              {...props}
              onLogin={(token, email, password) => {
                handleLogin(token, email, password);
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Costumers">
          {() => (
            <Customers token={token} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
