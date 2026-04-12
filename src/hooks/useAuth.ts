import { useContext, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
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

interface UseAuthReturn extends AuthContextValue {
  notice: string;
  signInWithEmail: (email: string) => Promise<User | null>;
  dismissNotice: () => void;
}

export default function useAuth(): UseAuthReturn {
  var auth = useContext(AuthContext) as AuthContextValue | null;
  var [notice, setNotice] = useState('');

  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  async function signInWithEmail(email: string): Promise<User | null> {
    var user = await auth!.loginUser({
      email: email,
      password: 'not-checked-here',
    });

    if (user) {
      setNotice('Signed in as ' + (user.firstName || user.fullName || 'shopper'));
    }

    return user;
  }

  function dismissNotice(): void {
    setNotice('');
  }

  return {
    ...auth,
    notice: notice,
    signInWithEmail: signInWithEmail,
    dismissNotice: dismissNotice,
  };
}
