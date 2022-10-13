import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow'
  }
})

const Home = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title='Login'
        onPress={() => {
          navigate('/')
        }}
      />
    </View>
  )
}

export default Home