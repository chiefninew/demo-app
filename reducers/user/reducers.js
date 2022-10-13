import Types from './types';
import InitialState from './initialState';

const { SET_USER } = Types;

const user = (state = InitialState, action = {}) => {
  switch(action.type) {
    case SET_USER: {
      return action.payload;
    }
    default:
      return state;
  }
}

export default user;