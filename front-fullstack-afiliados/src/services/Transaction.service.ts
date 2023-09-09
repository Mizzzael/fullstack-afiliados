import {useCallback, useMemo, useState} from "react";
import {useAuth} from "@root/provider/AuthProvider";
import axios from "axios";

export interface Transaction {
    "user": {
        "id": number
    },
    "type": string,
    "date": string,
    "value": number,
    "product": string,
    "seller": string,
    "file": {
        "active": boolean,
        "name": string,
        "user": {
            "id": number
        },
        "id": number,
        "created_at": string,
        "update_at": string
    },
    "active": boolean,
    "id": number
}
export interface usePostTransactionResponse {
    "status": number,
    "message": string,
    "transactions": Transaction[]
}

export interface usePostTransactionProps {
    isLoading: boolean;
    error: any;
    response: usePostTransactionResponse | null;
    saveTransactions: (body: FormData) => void;
    clearResponse: () => void,
}

export const usePostTransaction = (): usePostTransactionProps => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [response, setResponse] = useState<usePostTransactionResponse|null>(null)
    const [error, setError] = useState<any>(null)
    const { token } = useAuth()
    const saveTransactions = useCallback((body: FormData) => {
        setIsLoading(true);
        axios.post<usePostTransactionResponse>(`${ process.env.NEXT_PUBLIC_API }/transaction/file`, body, {
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

    const clearResponse = useCallback(() => {
        if (response) {
            setResponse(null)
        }
    }, [response])

    const postTransactionObject = useMemo<usePostTransactionProps>(() => {
        return {
            error,
            isLoading,
            response,
            saveTransactions,
            clearResponse
        }
    }, [ isLoading, response, error, saveTransactions, ])

    return postTransactionObject;
}

export interface result {
    "id": number,
    "type": string,
    "date": string,
    "product": string,
    "value": number,
    "seller": string,
    "userId": number,
    "filetxtId": number,
    "active": boolean,
    "created_at": string,
    "update_at": string,
    "filetxt": {
        "id": number,
        "name": string,
        "active": boolean,
        "created_at": string,
        "update_at": string
    }
}

export interface useGetTransactionsProps {
    isLoading: boolean;
    error: any;
    response: { result: result[], total: number, valueTotal: number  } | null;
    getTransactionsPaginated: (page: number) => void;
}
export const useGetTransactions = (): useGetTransactionsProps => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [response, setResponse] = useState<{ result: result[], total: number, valueTotal: number  }|null>(null)
    const [error, setError] = useState<any>(null)
    const { token } = useAuth()
    const getTransactionsPaginated = useCallback((page: number) => {
        setIsLoading(true);
        axios.get<{ result: result[], total: number, valueTotal: number  }>(`${ process.env.NEXT_PUBLIC_API }/transaction/${ page }/10`, {
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

    const getTransactionsObject = useMemo<useGetTransactionsProps>(() => {
        return {
            error,
            isLoading,
            response,
            getTransactionsPaginated
        }
    }, [ isLoading, response, error, getTransactionsPaginated ])

    return getTransactionsObject;
}
