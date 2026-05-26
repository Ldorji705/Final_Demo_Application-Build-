// Edit contact screen — update existing contact in AsyncStorage

// Import React and the useState hook
import React, { useState } from 'react';

// Import UI components from React Native
import {
  View, // layout container
  Text, // displays text
  TextInput, // input field
  TouchableOpacity, // pressable button
  StyleSheet, // styling helper
  Alert, // show alerts
  SafeAreaView, // safe area container
} from 'react-native';

// AsyncStorage for local persistence
import AsyncStorage from '@react-native-async-storage/async-storage';

// Component receives route (with contact) and navigation
export default function EditContactScreen({ route, navigation }) {
  // Extract contact object from route params
  const { contact } = route.params;

  // Initialize state with existing contact values
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);

  // Update contact in storage
  async function updateContact() {
    // Validate inputs
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Missing Info', 'Please enter both name and phone number.');
      return;
    }

    // Load current contacts
    const existing = await AsyncStorage.getItem('contacts');
    const contacts = JSON.parse(existing);

    // Replace the matching contact with updated values
    const updated = contacts.map((c) =>
      c.id === contact.id ? { ...c, name: name.trim(), phone: phone.trim() } : c
    );

    // Save updated list and go back
    await AsyncStorage.setItem('contacts', JSON.stringify(updated));
    navigation.goBack();
  }

  // Render form UI
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.updateBtn} onPress={updateContact}>
        <Text style={styles.updateBtnText}>Update Contact</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Styling for the screen
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
  updateBtn: {
    backgroundColor: '#FF9500',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 36,
    elevation: 5,
  },
  updateBtnText: {
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