import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import logger from './logger';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    width: 120,
    marginBottom: 5,
  }
})

const Integration = () => {
  const navigate = useNavigate()
  const [id, setId] = useState(0)
  const [title, setTitle] = useState('')
  const [photo, setPhoto] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [availableTicket, setAvailableTicket] = useState(0)
  const [loading, setLoading] = useState(false)

  const onDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://demo-web-api-appsvc.azurewebsites.net/tickets/${id}`, { method: 'DELETE' }
      )
      logger.log('RESPONSE', response)
      setLoading(false);
    } catch (e) {
      setLoading(false);
      alert('Something went wrong');
      logger.log('ERROR', e)
    }
  }

  const onCreateTicket = async () => {
    setLoading(true);
    const params = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: {
        title,
        photo,
        description,
        price,
        availableTicket,
      },
    };
    try {
      const response = await fetch(
        'https://demo-web-api-appsvc.azurewebsites.net/tickets',
        params
      )
      const tickets = await response.json()
      logger.log('RESPONSE', tickets)
      setLoading(false);
    } catch (e) {
      setLoading(false);
      alert('Something went wrong');
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigate(-1)}>
        <Text>Back</Text>
      </TouchableOpacity>
      {
        loading && (
          <ActivityIndicator size={'small'} color={'blue'} />
        )
      }
      <Text>API POST</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder={'Title'} />
      <TextInput style={styles.input} value={photo} onChangeText={setPhoto} placeholder={'Photo'} />
      <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder={'Description'} />
      <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder={'Price'} />
      <TextInput style={styles.input} value={availableTicket} onChangeText={setAvailableTicket} placeholder={'Available Ticket'} />
      <TouchableOpacity style={{ backgroundColor: 'red', padding: 15 }} onPress={onCreateTicket}>
        <Text>CREATE</Text>
      </TouchableOpacity>
      <View style={{ height: 30 }} />
      <Text>API DELETE</Text>
      <TextInput style={styles.input} value={id} onChangeText={setId} placeholder={'Ticket Id'} />
      <TouchableOpacity style={{ backgroundColor: 'red', padding: 15 }} onPress={onDelete}>
        <Text>DELETE</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Integration