// Home screen — lists contacts from AsyncStorage and allows add/edit/delete

// Import React and hooks
import React, { useState, useCallback } from 'react';

// Import UI components from React Native
import {
  View, // layout container
  Text, // displays text
  FlatList, // renders scrollable lists
  TouchableOpacity, // touchable button
  Alert, // native alert dialogs
  StyleSheet, // create styles
  SafeAreaView, // safe area container
} from 'react-native';

// AsyncStorage for local persistence
import AsyncStorage from '@react-native-async-storage/async-storage';
// useFocusEffect to reload when screen gains focus
import { useFocusEffect } from '@react-navigation/native';

// Exported HomeScreen component receives navigation prop
export default function HomeScreen({ navigation }) {
  // State: array of contacts
  const [contacts, setContacts] = useState([]);

  // Reload contacts when this screen is focused
  useFocusEffect(
    useCallback(() => {
      loadContacts();
    }, [])
  );

  // Load contacts from AsyncStorage and set state
  async function loadContacts() {
    const data = await AsyncStorage.getItem('contacts');
    if (data) {
      setContacts(JSON.parse(data));
    }
  }

  // Delete contact by id with confirmation
  async function deleteContact(id) {
    Alert.alert('Delete Contact', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          // Filter out the deleted contact from state
          const updated = contacts.filter((c) => c.id !== id);
          setContacts(updated);
          // Persist updated list
          await AsyncStorage.setItem('contacts', JSON.stringify(updated));
        },
      },
    ]);
  }

  // Render a single contact row
  function renderContact({ item }) {
    return (
      <View style={styles.card}>
        {/* Avatar circle with first initial */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name[0].toUpperCase()}</Text>
        </View>

        {/* Contact info: name and phone */}
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.phone}>{item.phone}</Text>
        </View>

        {/* Action buttons: Edit and Delete */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate('EditContact', { contact: item })}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => deleteContact(item.id)}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Main render: list of contacts and add button
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={contacts} // data source
        keyExtractor={(item) => item.id} // unique key
        renderItem={renderContact} // render function
        ListEmptyComponent={
          <Text style={styles.empty}>No contacts yet. Tap below to add one!</Text>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Floating add button navigates to AddContact screen */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddContact')}
      >
        <Text style={styles.addBtnText}>+ Add Contact</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Styles for HomeScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
    padding: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 60,
    color: '#999',
    fontSize: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#4F6EF7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  phone: {
    fontSize: 13,
    color: '#666',
    marginTop: 3,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  editBtn: {
    backgroundColor: '#E8EDFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  editText: {
    color: '#4F6EF7',
    fontWeight: '600',
    fontSize: 13,
  },
  deleteBtn: {
    backgroundColor: '#FFE8E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deleteText: {
    color: '#E53935',
    fontWeight: '600',
    fontSize: 13,
  },
  addBtn: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    backgroundColor: '#4F6EF7',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 6,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});