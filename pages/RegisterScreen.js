
import { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, TextInput } from 'react-native'
import * as yup from 'yup'
export default function Register({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().min(8).required(),
    confirmPassword: yup.string().min(8).required().test('passwords-match', 'Passords must match', (val) =>{
      // console.log({password, });
      return password === val
    })
  })
  const validate = () => {
    schema.isValid({
      name: name,
      password: password,
      email: email,
      confirmPassword: confirmPassword
    }).then(valid => {
      console.log(valid);
      if(valid) signUp()
    })
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.appName}>Chatta</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Name"
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Confirm Password"
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={() => validate()}>
              <Text style={styles.signUp}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.registeredSec}>
              <Text style={styles.registeredText}>Registered?</Text>
              <Text style={styles.signInText} onPress={() => navigation.navigate('Login')}>Sign In</Text>
            </View>
          </View>
        </View>

      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#26394D',
    paddingVertical: 80,
    alignItems: 'center'
  },
  topContainer: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appName: {
    fontSize: 54,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: 'berkshire'
  },
  bottomContainer: {
    flex: 2.8,
    justifyContent: 'center',
    minHeight: 420
  },
  innerContainer: {
    padding: 20,
    height: 420,
    width: 320,
    backgroundColor: '#FFF',
    borderRadius: 25
  },
  inputContainer: {
    height: 270,
    justifyContent: 'center'
  },
  textInput: {
    height: 46,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#1EA0E5',
    padding: 10,
    marginVertical: 10
  },
  actionContainer: {
    height: 100,
    justifyContent: 'center',
    marginTop: 10
  },
  actionButton: {
    backgroundColor: '#1EA0E5',
    borderRadius: 15,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signUp: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: 'bold',
  },
  registeredSec: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  registeredText: {
    fontSize: 16
  },
  signInText: {
    color: '#1EA0E5',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10
  }
})