import { View, Text, ImageBackground, StyleSheet, StatusBar, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-native';
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
  const [search, setSearch] = useState('');
  const [tickets, setTickets] = useState([]);
  
  const onLogout = () => {
    navigate('/')
  };

  useEffect(() => {
    setTickets(data);
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
          />
        </View>
        <View style={{ alignSelf: 'center', marginLeft: 15 }}>
          <TouchableOpacity onPress={onLogout}>
            <Text style={styles.title}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={tickets}
        renderItem={({ item }) => <TicketItem item={item} />}
        ListHeaderComponent={() => <View style={{ height: 15 }} />}
      />
    </View>
  )
}

export default Home