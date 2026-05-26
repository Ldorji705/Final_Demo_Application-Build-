// App entry: sets up the navigation stack and screens

// Import React core
import React from 'react';
// Navigation container provides navigation context
import { NavigationContainer } from '@react-navigation/native';
// Native stack navigator for stack-based navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens used in the navigator
import HomeScreen from './src/screens/HomeScreen';
import AddContactScreen from './src/screens/AddContactScreen';
import EditContactScreen from './src/screens/EditContactScreen';

// Create the stack navigator instance
const Stack = createNativeStackNavigator();

// Main App component that renders the NavigationContainer and stack
export default function App() {
  return (
    // Wrap the app in a NavigationContainer
    <NavigationContainer>
      {/* Define the stack navigator and its screens */}
      <Stack.Navigator initialRouteName="Home">
        {/* Home screen: lists contacts */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'My Contacts' }}
        />

        {/* AddContact screen: form to add a new contact */}
        <Stack.Screen
          name="AddContact"
          component={AddContactScreen}
          options={{ title: 'Add Contact' }}
        />

        {/* EditContact screen: edit an existing contact */}
        <Stack.Screen
          name="EditContact"
          component={EditContactScreen}
          options={{ title: 'Edit Contact' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}