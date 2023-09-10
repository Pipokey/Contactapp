import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 40, 
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginHorizontal: 100,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  inputContainer: {
    width: '89%',
    marginBottom: 10,
    marginHorizontal: 20,

  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: 'gray',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  loginButton: {
    width: '89%',
    backgroundColor: 'black',
    paddingVertical: 9,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ContainerTextInput:{
    marginLeft:8,
    paddingVertical:12
  },
  ContainerFlatlist:{
    
    paddingTop:20,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginVertical: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: 'gray', 
    paddingBottom: 7, 
    
  },
  contactImage: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  contactInfo: {
    flex: 1, 
  },
  contactText:{
    paddingBottom:4,
    fontSize:15,
  },
  infoText:{
    fontSize:16,
    fontWeight:'500',
  }
});
