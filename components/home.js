import { View, Text, ImageBackground, StyleSheet, StatusBar, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-native';
import { setUser } from '../reducers/user/actions';
import logger from './logger';
import data from '../assets/data.json';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    padding: 15,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 0,
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  indicatorStyle: {
    backgroundColor: '#6548B8',
    height: 5,
    borderLeftWidth: 70,
    borderRightWidth: 70,
    borderColor: 'white'
  },
  input: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#EFF0F7',
    borderRadius: 15,
    fontSize: 16
  },
})

const TicketStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 15,
    paddingHorizontal: 30,
  },
  imageBackground: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden'
  },
  info: {
    padding: 15,
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  description: {
    fontSize: 16,
    color: 'white'
  },
  button: {
    height: 45,
    width: 45,
    backgroundColor: 'white',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

const TicketItem = ({ item }) => {
  return (
    <View style={TicketStyles.container}>
      <ImageBackground
        source={{ uri: item.photo }}
        borderRadius={10}
        style={TicketStyles.imageBackground}
      >
        <View style={TicketStyles.info}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text style={TicketStyles.title}>{item.title}</Text>
            <Text style={TicketStyles.description}>P{item.price} • {item.date}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const onLogout = () => {
    dispatch(setUser({}));
    navigate('/')
  };

  const  fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://demo-web-api-appsvc.azurewebsites.net/tickets'
      )
      const tickets = await response.json()
      logger.log('RESPONSE', tickets)
      setLoading(false);
      setTickets(tickets);
    } catch (e) {
      setLoading(false);
      alert('Something went wrong');
    }
  }

  useEffect(() => {
    fetchPosts()
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.input}
            value={search}
            onChangeText={setSearch}
            placeholder='Search Ticket'
            underlineColorAndroid='transparent'
            onFocus={() => navigate('/home/integration')}
          />
        </View>
        <View style={{ alignSelf: 'center', marginLeft: 15 }}>
          <TouchableOpacity onPress={onLogout}>
            <Text style={styles.title}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      {
        loading && (
          <View style={{ alignItems: 'center', paddingTop: 15 }}>
            <ActivityIndicator size={'small'} color={'#412FB1'} />
          </View>
        )
      }
      <FlatList
        data={tickets}
        renderItem={({ item }) => <TicketItem item={item} />}
        ListHeaderComponent={() => <View style={{ height: 15 }} />}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', paddingTop: 15 }}>
            <Text>No ticket found.</Text>
          </View>
        )}
      />
    </View>
  )
}

export default Home