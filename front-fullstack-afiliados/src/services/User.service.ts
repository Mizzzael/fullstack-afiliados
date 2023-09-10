import {useCallback, useMemo, useState} from "react";
import axios from 'axios'
import {useAuth} from "@root/provider/AuthProvider";

export interface useMeResponse {
    "email": string,
    "name": string,
    "message": string,
    "status": number
}

export interface useMeProps {
    isLoading: boolean;
    error: any;
    response: useMeResponse | null;
    getMe: () => void;
}

export const useMe = (): useMeProps => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [response, setResponse] = useState<useMeResponse|null>(null)
    const [error, setError] = useState<any>(null)
    const { token } = useAuth()
    const getMe = useCallback(() => {
        setIsLoading(true);
        axios.get<useMeResponse>(`${ process.env.NEXT_PUBLIC_API }/user/me`, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
            .then((response) => {
                setError(null)
                setResponse(response.data)
            })
            .catch((e) => {
                setError(e);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [ isLoading, response, token ])

    const Me = useMemo<useMeProps>(() => {
        return {
            error,
            isLoading,
            response,
            getMe
        }
    }, [ isLoading, response, error, getMe ])

    return Me;
}

export interface newUser {
    name: string;
    email: string;
    password: string;
}
interface useCreateProps {
    isLoading: boolean;
    error: any;
    response: useMeResponse | null;
    clear: () => void;
    createUser: (body: newUser) => void;
}
export const useCreate = (): useCreateProps => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [response, setResponse] = useState<useMeResponse|null>(null)
    const [error, setError] = useState<any>(null)
    const createUser = useCallback((body: newUser) => {
        setIsLoading(true);
        axios.post<useMeResponse>(`${ process.env.NEXT_PUBLIC_API }/user/create`, body)
            .then((response) => {
                setError(null)
                setResponse(response.data)
            })
            .catch((e) => {
                setError(e);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [ isLoading, response ])

    const Clear = useCallback(() => {
        setResponse(null)
    }, [ response ])

    const Create = useMemo<useCreateProps>(() => {
        return {
            error,
            isLoading,
            response,
            createUser,
            clear: Clear
        }
    }, [ isLoading, response, error, createUser, Clear ])

    return Create;
}


export interface usePutProps {
    isLoading: boolean;
    error: any;
    response: useMeResponse | null;
    updateMe: (body: {name: string, email: string}) => void;
}

export const usePut = (): usePutProps => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [response, setResponse] = useState<useMeResponse|null>(null)
    const [error, setError] = useState<any>(null)
    const { token } = useAuth()
    const updateMe = useCallback((body: {name: string, email: string}) => {
        setIsLoading(true);
        axios.put<useMeResponse>(`${ process.env.NEXT_PUBLIC_API }/user`, body, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
            .then((response) => {
                setError(null)
                setResponse(response.data)
            })
            .catch((e) => {
                setError(e);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [ isLoading, response, token ])

    const Put = useMemo<usePutProps>(() => {
        return {
            error,
            isLoading,
            response,
            updateMe
        }
    }, [ isLoading, response, error, updateMe ])

    return Put;
}

export interface useCheckEmailProps {
    isLoading: boolean;
    error: any;
    response: { exist: boolean, status: number } | null;
    checkEmail: (body: {email: string}) => void;
    clear: () => void
}

export const useCheckEmail = (): useCheckEmailProps => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [response, setResponse] = useState<{ exist: boolean, status: number }|null>(null)
    const [error, setError] = useState<any>(null)
    const checkEmail = useCallback((body: {email: string}) => {
        setIsLoading(true);
        axios.post<{ exist: boolean, status: number }>(`${ process.env.NEXT_PUBLIC_API }/user/email`, body)
            .then((response) => {
                setError(null)
                setResponse(response.data)
            })
            .catch((e) => {
                setError(e);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [ isLoading, response ])

    const Clear = useCallback(() => {
        setResponse(null)
    }, [ response ])

    const checkEmailObject = useMemo<useCheckEmailProps>(() => {
        return {
            error,
            isLoading,
            response,
            checkEmail,
            clear: Clear
        }
    }, [ isLoading, response, error, checkEmail, Clear ])

    return checkEmailObject;
}
