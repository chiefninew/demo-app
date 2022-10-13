import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  }
})

const Login = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button
        title='Home'
        onPress={() => {
          navigate('/home')
        }}
      />
    </View>
  )
}

export default Login