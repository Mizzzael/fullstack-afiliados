'use client'
import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import secureLocalStorage from  "react-secure-storage";
import {redirect} from "next/navigation";

export enum AuthSessions {
    AUTH_TOKEN = '_auth_token',
}

export interface AuthContextProps {
    token: string | null;
    hasSession: boolean;
    isLoading: boolean;
    loggout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    token: null,
    hasSession: false,
    isLoading: false,
    loggout() {
        throw new Error('Contexto não atribuido')
    }
})


export const useAuth = () => useContext(AuthContext);


const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string|null>(null)
    const [hasSession, setHasSession] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const _getSession = useCallback(() => {
        const token = secureLocalStorage.getItem(AuthSessions.AUTH_TOKEN);
        setIsLoading(false)
        if (token) {
            setToken(token as string)
            setHasSession(true)
        } else {
            redirect('/login')
        }
    }, [ isLoading ])

    const loggout = useCallback(() => {
        if (hasSession) {
            secureLocalStorage.clear();
            setToken(null)
            setHasSession(false)
        }
    }, [ hasSession ])

    useEffect(() => {
        if (isLoading) {
            _getSession()
        } else if (!isLoading && !hasSession) {
            redirect('/login')
        }
    }, [token, hasSession, isLoading])

    const value = useMemo<AuthContextProps>(() => {
        return {
            loggout,
            hasSession,
            isLoading,
            token
        }
    }, [ loggout, hasSession, isLoading, token ])

    if (isLoading || !token) return <span />;
    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}


export default AuthProvider;
