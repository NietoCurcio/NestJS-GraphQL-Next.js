import Router from 'next/router';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { useMe } from '../graphql/generated/page';
import { authenticateUser } from '../services/authenticate_cognito';

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  accessToken: string | null;
  loading: boolean;
  setLoading: (state: boolean) => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState(null);
  const isAuthenticated = !!accessToken;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { 'cognito.accessToken': token } = parseCookies();
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const signIn = async ({ username, password }: SignInCredentials) => {
    try {
      const access = (await authenticateUser({
        Username: username,
        Password: password,
      })) as string;

      setCookie(undefined, 'cognito.accessToken', access);
      setAccessToken(access);
      setLoading(false);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  const signOut = () => {
    destroyCookie(undefined, 'cognito.accessToken');
    setAccessToken(null);
    Router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isAuthenticated,
        accessToken,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
