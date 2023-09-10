import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Button } from 'react-native';
import { styles } from './styles';
import axios from 'axios';
import { Image } from 'react-native'; 
const Customers = ({ email, password }) => {
  const [customerData, setCustomerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [authToken, setAuthToken] = useState('');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    
    const authEndpoint = 'https://contact.creo-dev.com/api/admin/login';

    
    const authenticate = async () => {
      try {
        const response = await axios.post(authEndpoint, {
          email,
          password,
        });
       
        const token = response.data.authorization.token;
        setAuthToken(`Bearer ${token}`);
      } catch (error) {
        console.error('Error authenticating:', error);
      }
    };

    
    authenticate();
  }, [email, password]);

  useEffect(() => {
    
    const apiUrl = 'https://contact.creo-dev.com/api/contacts';

    if (authToken) {
      
      const fetchCustomerData = async () => {
        try {
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: authToken,
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
  }, [authToken]);

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

  return (
    <View>
      <TextInput
      style={styles.ContainerTextInput}
        placeholder="Filter by Customer Name or Created Date (yyyy-mm-dd)"
        onChangeText={(text) => setFilterText(text)}
        value={filterText}
      />
      <Button title="Apply Filters" onPress={handleFilter} />
      
      <FlatList
  style={styles.ContainerFlatlist}
  data={filteredData}
  keyExtractor={(customer) => customer.id.toString()}
  renderItem={({ item }) => (
    <View key={item.id}>
      {item.contacts.map((contact) => (
        <View key={contact.id} style={styles.contactContainer}>
          <Image
            source={require('./assets/p1.png')}
            style={styles.contactImage}
          />
          <View style={styles.contactInfo}>
            <Text   style={styles.contactText}><Text style={styles.infoText}>Name:</Text> {contact.contact_name}</Text>
            <Text  style={styles.contactText} ><Text style={styles.infoText}>Phone:</Text>  {contact.phone_number}</Text>
          </View>
        </View>
      ))}
    </View>
  )}
/>

    </View>
  );
};

export default Customers;
