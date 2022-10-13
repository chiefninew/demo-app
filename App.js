import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import Home from './components/home';
import Login from './components/login';
import { Provider } from 'react-redux';
import { store, persistor } from './reducers/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <NativeRouter>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </NativeRouter>
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
