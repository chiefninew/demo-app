import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-native'

const logo = require('../assets/TICKETSENPAI.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#412FB1',
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    width: '90%',
    borderColor: '#e2e2e2',
    borderWidth: 1,
  },
  input: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#EFF0F7',
    borderRadius: 15,
    fontSize: 16
  },
  button: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#412FB1',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonOutline: {
    padding: 15,
    borderRadius: 10,
    borderColor: '#412FB1',
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 10
  },
  buttonOutlineText: {
    color: '#412FB1',
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(65,47,177,0.5)',
  },
  image: {
    marginBottom: 30,
    width: 250,
    height: 50
  }
})

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enabled, setEnabled] = useState(false);

  const onLogin = () => {
    navigate('/home');
  }

  useEffect(() => {
    if (email && password) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [email, password]);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={logo} resizeMode={'contain'} />
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder='Email Address'
          underlineColorAndroid='transparent'
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder='Password'
          secureTextEntry={true}
          underlineColorAndroid={'transparent'}
        />
        <TouchableOpacity disabled={!enabled} onPress={onLogin}>
          <View style={[styles.button, !enabled && styles.buttonDisabled]}>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login