import React, {useEffect, useState} from 'react'
import {Alert, Box, Stack, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import {useCheckEmail, useCreate} from "@root/services/User.service";

const FormCreate: React.FC = () => {
    const [ emailExists, setEmailExits ] = useState<boolean>(false)
    const [ success, setSuccess ] = useState<boolean>(false)
    const { isLoading: checkEmailIsLoading, checkEmail, clear, response: responseCheckEmail, error } = useCheckEmail()
    const { formState: { isValid }, control, handleSubmit, getValues, reset } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })
    const { isLoading, response, createUser } = useCreate()

    useEffect(() => {
        if (!responseCheckEmail) return;
        console.log({ responseCheckEmail })
        if (responseCheckEmail && responseCheckEmail?.exist) {
            setEmailExits(true);
            clear()
        } else if (responseCheckEmail && !responseCheckEmail?.exist) {
            setEmailExits(false)
            clear()
            createUser({
                name: getValues('name'),
                email: getValues('email'),
                password: getValues('password')
            })
        }
    }, [ responseCheckEmail, clear ])

    useEffect(() => {
        if (response) {
            setSuccess(true)
            reset()
        }
    }, [response])

    return (
        <Box sx={{
            paddingBottom: '16px',
        }}>
            <form onSubmit={handleSubmit((data) => {
                checkEmail({email: data.email})
            })}>
                <Stack spacing={2}>
                    {(() => {
                        if (!emailExists) return null;
                        return (
                            <Box>
                                <Alert
                                    severity="error" variant={"outlined"} color={'error'}
                                >
                                    E-mail já está sendo usado por outra conta.
                                </Alert>
                            </Box>
                        )
                    })()}
                    {(() => {
                        if (!error) return null;
                        return (
                            <Box>
                                <Alert
                                    severity="error" variant={"outlined"} color={'error'}
                                >
                                    Erro ao efetuar cadastro, por favor tente outra hora!
                                </Alert>
                            </Box>
                        )
                    })()}
                    {(() => {
                        if (!success) return null;
                        return (
                            <Box>
                                <Alert>
                                    Sucesso! Seu cadastro foi efetuado com sucesso.
                                </Alert>
                            </Box>
                        )
                    })()}
                    <Box>
                        <Controller
                            render={({ field }) => (
                                <TextField
                                    label="Nome"
                                    fullWidth
                                    { ...field }
                                />
                            )}
                            rules={{
                                required: true
                            }}
                            name="name"
                            control={control}
                        />
                    </Box>
                    <Box>
                        <Controller
                            render={({ field }) => (
                                <TextField
                                    label="E-mail"
                                    fullWidth
                                    {...field}
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
                            rules={{
                                required: true,
                            }}
                            name={'password'}
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
                            disabled={!isValid}
                            variant={"contained"}
                            type={'submit'}
                            loading={checkEmailIsLoading}
                        >
                            Cadastrar-se
                        </LoadingButton>
                    </Box>
                </Stack>
            </form>
        </Box>
    )
}

export default FormCreate;
