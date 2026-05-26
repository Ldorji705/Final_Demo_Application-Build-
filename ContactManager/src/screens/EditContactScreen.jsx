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

export default function EditContactScreen({ route, navigation }) {
  const { contact } = route.params;

  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);

  async function updateContact() {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Missing Info', 'Please enter both name and phone number.');
      return;
    }

    const existing = await AsyncStorage.getItem('contacts');
    const contacts = JSON.parse(existing);

    const updated = contacts.map((c) =>
      c.id === contact.id
        ? { ...c, name: name.trim(), phone: phone.trim() }
        : c
    );

    await AsyncStorage.setItem('contacts', JSON.stringify(updated));
    navigation.goBack();
  }

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