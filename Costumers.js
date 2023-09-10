import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert, ScrollView } from 'react-native';
import { styles } from './styles';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const Customers = ({ token }) => {
  const [customerData, setCustomerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const apiUrl = 'https://contact.creo-dev.com/api/contacts';

    if (token) {
      const fetchCustomerData = async () => {
        try {
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: token,
              Accept: 'application/json',
            },
          });

          if (
            response.data &&
            response.data.data &&
            Array.isArray(response.data.data.data)
          ) {
            setCustomerData(response.data.data.data);
            setFilteredData(response.data.data.data);
          } else {
            console.error('Invalid customer data structure in API response:', response.data);
          }
        } catch (error) {
          console.error('Error fetching customer data:', error);
        }
      };

      fetchCustomerData();
    }
  }, [token]);

  const handleFilter = () => {
    let filteredResult = customerData;

    if (filterText) {
      filteredResult = filteredResult.filter((customer) =>
        customer.name.toLowerCase().includes(filterText.toLowerCase()) ||
        (customer.created_at && customer.created_at.includes(filterText))
      );
    }

    setFilteredData(filteredResult);
  };

  const handleLogout = async () => {
    try {
      const logoutEndpoint = 'https://contact.creo-dev.com/api/admin/logout';
      const response = await axios.post(logoutEndpoint, null, {
        headers: {
          Authorization: token,
          Accept: 'application/json',
        },
      });

      if (response.status === 200) {
        Alert.alert('Logout Successful', 'You have been logged out.');
        navigation.navigate('Login');
      } else {
        console.error('Logout failed:', response.data);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <ScrollView>
      <TextInput
        style={styles.ContainerTextInput}
        placeholder="Filter by Customer Name or Created Date (yyyy-mm-dd)"
        onChangeText={(text) => setFilterText(text)}
        value={filterText}
      />
      <Button title="Apply Filters" onPress={handleFilter} />

     
     
      <TouchableOpacity style={styles.redButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>LogOut</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.ContainerFlatlist}>
        {filteredData.map((item) => (
          <View key={item.id}>
            {item.contacts.map((contact) => (
              <View key={contact.id} style={styles.contactContainer}>
                <Image
                  source={require('./assets/p1.png')}
                  style={styles.contactImage}
                />
                <View style={styles.contactInfo}>
                  <Text style={styles.contactText}><Text style={styles.infoText}>Name:</Text> {contact.contact_name}</Text>
                  <Text style={styles.contactText}><Text style={styles.infoText}>Phone:</Text> {contact.phone_number}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default Customers;
