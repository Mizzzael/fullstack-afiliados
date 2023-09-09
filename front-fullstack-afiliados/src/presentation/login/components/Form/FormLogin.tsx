'use client'
import React, {useEffect} from 'react'
import {Alert, Box, Stack, TextField} from "@mui/material";
import { useForm, Controller } from 'react-hook-form'
import secureLocalStorage from  "react-secure-storage";
import {LoadingButton} from "@mui/lab";
import useAuthLogin from "@root/services/Auth.service";
import {AuthSessions} from "@root/provider/AuthProvider";
import {redirect} from "next/navigation";

const FormLogin: React.FC = () => {
    const { login, error, isLoading, response } = useAuthLogin()
    const { control, formState: { isValid }, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })

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
                    <Box sx={{
                        padding: '0 0 16px'
                    }}>
                        <Alert
                            severity="error" variant={"outlined"} color={'error'}
                        >
                            {(() => {
                                switch (error.response.status) {
                                    case 401:
                                        return 'Usuário ou senha incorretos!'
                                    default:
                                        return 'Ops! Tivemos um erro interno, por favor tente mais tarde.'
                                }
                            })()}
                        </Alert>
                    </Box>
                )

                return null;
            })()}
            <form onSubmit={handleSubmit((data) => {
                login(data);
            })}>
                <Stack spacing={2}>
                    <Box>
                        <Controller
                            render={({ field }) => (
                                <TextField
                                    label="E-mail"
                                    fullWidth
                                    { ...field }
                                />
                            )}
                            rules={{
                                required: true,
                                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                            }}
                            name={'email'}
                            control={control}
                    />
                    </Box>
                    <Box>
                        <Controller
                            render={({ field }) => (
                                <TextField
                                    label="Senha"
                                    type="password"
                                    fullWidth
                                    {...field}
                                />
                            )}
                            name={'password'}
                            rules={{
                                required: true,
                            }}
                            control={control}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                        }}
                    >
                        <LoadingButton
                            variant={"contained"}
                            disabled={!isValid}
                            type={'submit'}
                            loading={isLoading}
                        >
                            Entrar
                        </LoadingButton>
                    </Box>
                </Stack>
            </form>
        </Box>
    )
}

export default FormLogin;
