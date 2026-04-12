import { createContext, useEffect, useState } from 'react';
import { getProfile, login, logout, saveProfile } from '../services/authService';
import { REQUEST_STATUS } from '../constants/statuses';
import type { LoginCredentials, RequestStatus, User } from '../types';

interface AuthContextValue {
  currentUser: User | null;
  status: RequestStatus;
  error: string;
  isAuthenticated: boolean;
  loginUser: (credentials: LoginCredentials) => Promise<User | null>;
  logoutUser: () => Promise<void>;
  refreshProfile: () => Promise<User | null>;
  updateUser: (updates: Partial<User>) => Promise<User>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

var AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider(props: AuthProviderProps) {
  var children = props.children;
  var [currentUser, setCurrentUser] = useState<User | null>(null);
  var [status, setStatus] = useState<RequestStatus>(REQUEST_STATUS.idle as RequestStatus);
  var [error, setError] = useState('');

  async function refreshProfile(): Promise<User | null> {
    setStatus(REQUEST_STATUS.loading as RequestStatus);

    try {
      var profile = await getProfile();
      setCurrentUser(profile);
      setError('');
      setStatus(REQUEST_STATUS.success as RequestStatus);
      return profile;
    } catch (err) {
      setError('Unable to load profile right now.');
      setStatus(REQUEST_STATUS.error as RequestStatus);
      return null;
    }
  }

  async function loginUser(credentials: LoginCredentials): Promise<User | null> {
    setStatus(REQUEST_STATUS.loading as RequestStatus);

    try {
      var user = await login(credentials);
      setCurrentUser(user);
      setError('');
      setStatus(REQUEST_STATUS.success as RequestStatus);
      return user;
    } catch (err) {
      setError('Sign in failed. Please try again.');
      setStatus(REQUEST_STATUS.error as RequestStatus);
      return null;
    }
  }

  async function updateUser(updates: Partial<User>): Promise<User> {
    var nextUser = await saveProfile(updates);
    setCurrentUser(nextUser);
    return nextUser;
  }

  async function logoutUser(): Promise<void> {
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
