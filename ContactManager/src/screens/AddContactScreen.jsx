import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddContactScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  async function saveContact() {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Missing Info', 'Please enter both name and phone number.');
      return;
    }

    const existing = await AsyncStorage.getItem('contacts');
    const contacts = existing ? JSON.parse(existing) : [];

    const newContact = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
    };

    contacts.push(newContact);
    await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Saroj Sanyasi"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. +975 17 370539"
        placeholderTextColor="#aaa"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.saveBtn} onPress={saveContact}>
        <Text style={styles.saveBtnText}>Save Contact</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

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