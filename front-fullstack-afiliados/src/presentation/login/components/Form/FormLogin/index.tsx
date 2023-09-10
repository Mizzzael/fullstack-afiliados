'use client'
import React, {useEffect} from 'react'
import { Box } from "@mui/material";
import { useForm } from 'react-hook-form'
import secureLocalStorage from  "react-secure-storage";
import useAuthLogin from "@root/services/Auth.service";
import {AuthSessions} from "@root/provider/AuthProvider";
import {redirect} from "next/navigation";
import FormComponent from "@root/presentation/login/components/Form/FormLogin/Form";
import AlertComponent from "@root/presentation/login/components/Form/FormLogin/Alert";

const Index: React.FC = () => {
    const { login, error, isLoading, response } = useAuthLogin()

    useEffect(() => {
        if (response) {
            secureLocalStorage.setItem(AuthSessions.AUTH_TOKEN, response);
            redirect('/')
        }
    }, [ response ])

    useEffect(() => {
        const checkSession = secureLocalStorage.getItem(AuthSessions.AUTH_TOKEN);
        if (checkSession) {
            redirect('/');
        }
    }, [])

    return (
        <Box sx={{
            paddingBottom: '16px',
        }}>
            {(() => {
                if (error) return (
                    <AlertComponent error={error} />
                )

                return null;
            })()}
            <FormComponent
                onSubmit={((data) => {
                    login(data);
                })}
                isLoading={isLoading}
            />

        </Box>
    )
}

export default Index;
