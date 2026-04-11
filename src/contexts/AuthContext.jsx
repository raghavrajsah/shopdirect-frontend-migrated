import { createContext, useEffect, useState } from 'react';
import { getProfile, login, logout, saveProfile } from '../services/authService';
import { REQUEST_STATUS } from '../constants/statuses';

var AuthContext = createContext(null);

export function AuthProvider(props) {
  var children = props.children;
  var [currentUser, setCurrentUser] = useState(null);
  var [status, setStatus] = useState(REQUEST_STATUS.idle);
  var [error, setError] = useState('');

  async function refreshProfile() {
    setStatus(REQUEST_STATUS.loading);

    try {
      var profile = await getProfile();
      setCurrentUser(profile);
      setError('');
      setStatus(REQUEST_STATUS.success);
      return profile;
    } catch (err) {
      setError('Unable to load profile right now.');
      setStatus(REQUEST_STATUS.error);
      return null;
    }
  }

  async function loginUser(credentials) {
    setStatus(REQUEST_STATUS.loading);

    try {
      var user = await login(credentials);
      setCurrentUser(user);
      setError('');
      setStatus(REQUEST_STATUS.success);
      return user;
    } catch (err) {
      setError('Sign in failed. Please try again.');
      setStatus(REQUEST_STATUS.error);
      return null;
    }
  }

  async function updateUser(updates) {
    var nextUser = await saveProfile(updates);
    setCurrentUser(nextUser);
    return nextUser;
  }

  async function logoutUser() {
    await logout();
    setCurrentUser(null);
  }

  useEffect(function loadInitialProfile() {
    refreshProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        status: status,
        error: error,
        isAuthenticated: !!currentUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
        refreshProfile: refreshProfile,
        updateUser: updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
