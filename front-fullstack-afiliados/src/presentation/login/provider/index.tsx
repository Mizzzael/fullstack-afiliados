'use client'
import React, {createContext, useCallback, useMemo, useState} from 'react'

interface LoginContextProps {
    page: number;
    setPage: (page: number) => void
}

export const LoginContext = createContext<LoginContextProps>({
    page: 1,
    setPage: (_) => { throw new Error('Contexto não atribuido.') }
})

const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ page, setPage ] = useState<number>(1)

    const setPageBind = useCallback((page: number) => {
        setPage(page);
    }, [ page ])

    const value = useMemo(() => {
        return {
            page,
            setPage: setPageBind,
        }
    }, [ page, setPageBind ])

    return (
        <LoginContext.Provider value={value} >
            { children }
        </LoginContext.Provider>
    )
}

export default LoginProvider;
