import Types from './types';

const { SET_USER } = Types;

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  }
}