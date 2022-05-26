import {setLocalStorageToken, setLocalStorageUser, getLocalStorageToken, getLocalStorageUser, deleteLocalStorageUser, deleteLocalStorageToken} from './localStorage';

export const setAuthentication = (token, user) => {
  setLocalStorageUser('user', user);
  setLocalStorageToken('token', token);
}

export const isAuthenticated = () => {
  if(getLocalStorageToken('token') && getLocalStorageUser('user')){
    return getLocalStorageUser('user');
  } else {
    return false
  }
}

export const logout = (next) => {
  deleteLocalStorageUser('user');
  deleteLocalStorageToken('token');
  next();
}