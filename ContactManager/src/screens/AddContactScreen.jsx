// Short: AddContact form — saves name and phone to AsyncStorage

// Import React core and hook
import React, { useState } from 'react';

// Import React Native components
import {
  View, // layout container
  Text, // text display
  TextInput, // text input field
  TouchableOpacity, // touchable button
  StyleSheet, // style helper
  Alert, // native alert dialogs
  SafeAreaView, // safe area aware container
} from 'react-native';

// Import AsyncStorage for persistent key-value storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Exported screen component (receives navigation prop)
export default function AddContactScreen({ navigation }) {
  // State: name input value
  const [name, setName] = useState('');
  // State: phone input value
  const [phone, setPhone] = useState('');

  // Function to validate input and save a new contact
  async function saveContact() {
    // If either field is empty (after trimming), show alert and stop
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Missing Info', 'Please enter both name and phone number.');
      return;
    }

    // Read stored contacts (JSON string) from AsyncStorage
    const existing = await AsyncStorage.getItem('contacts');
    // Parse JSON if exists, otherwise start with empty array
    const contacts = existing ? JSON.parse(existing) : [];

    // Build new contact object with a unique id from timestamp
    const newContact = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
    };

    // Append the new contact and save updated array back to AsyncStorage
    contacts.push(newContact);
    await AsyncStorage.setItem('contacts', JSON.stringify(contacts));

    // Return to the previous screen
    navigation.goBack();
  }

  // Render UI: inputs and buttons
  return (
    <SafeAreaView style={styles.container}>
      {/* Label for name input */}
      <Text style={styles.label}>Full Name</Text>
      {/* Controlled text input for name */}
      <TextInput
        style={styles.input}
        placeholder="e.g. Saroj Sanyasi"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />

      {/* Label for phone input */}
      <Text style={styles.label}>Phone Number</Text>
      {/* Controlled text input for phone */}
      <TextInput
        style={styles.input}
        placeholder="e.g. +975 17 370539"
        placeholderTextColor="#aaa"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      {/* Save button */}
      <TouchableOpacity style={styles.saveBtn} onPress={saveContact}>
        <Text style={styles.saveBtnText}>Save Contact</Text>
      </TouchableOpacity>

      {/* Cancel button */}
      <TouchableOpacity
        style={styles.cancelBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
    padding: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4F6EF7',
    marginBottom: 6,
    marginTop: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    color: '#1A1A2E',
    elevation: 1,
  },
  saveBtn: {
    backgroundColor: '#4F6EF7',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 36,
    elevation: 5,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelBtn: {
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  cancelText: {
    color: '#999',
    fontSize: 15,
  },
});