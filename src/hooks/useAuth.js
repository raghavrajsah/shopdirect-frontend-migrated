import { useContext, useState } from 'react';
import AuthContext from '../contexts/AuthContext';

export default function useAuth() {
  var auth = useContext(AuthContext);
  var [notice, setNotice] = useState('');

  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  async function signInWithEmail(email) {
    var user = await auth.loginUser({
      email: email,
      password: 'not-checked-here',
    });

    if (user) {
      setNotice('Signed in as ' + (user.firstName || user.fullName || 'shopper'));
    }

    return user;
  }

  function dismissNotice() {
    setNotice('');
  }

  return {
    ...auth,
    notice: notice,
    signInWithEmail: signInWithEmail,
    dismissNotice: dismissNotice,
  };
}
