import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistReducer } from 'redux-persist';
import user from './user/reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

export default combineReducers({
  user: persistReducer(persistConfig, user),
});