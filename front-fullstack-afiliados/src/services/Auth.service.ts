import {useCallback, useMemo, useState} from "react";
import axios from 'axios'

export interface AuthLoginProps {
    email: string;
    password: string;
}

export interface useAuthLoginProps {
    isLoading: boolean;
    error: any;
    response: string | null;
    login: (body: AuthLoginProps) => void;
}

const useAuthLogin = (): useAuthLoginProps => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [response, setResponse] = useState<string|null>(null)
    const [error, setError] = useState<any>(null)

    const login = useCallback((body: AuthLoginProps) => {
        setIsLoading(true);
        axios.post<{ token: string, status: number }>(`${ process.env.NEXT_PUBLIC_API }/auth/login`, body)
            .then((response) => {
                setError(null)
                setResponse(response.data.token)
            })
            .catch((e) => {
                setError(e);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [ isLoading, response ])

    const AuthLogin = useMemo<useAuthLoginProps>(() => {
        return {
            error,
            isLoading,
            response,
            login
        }
    }, [ isLoading, response, error, login ])

    return AuthLogin;
}

export default useAuthLogin;
