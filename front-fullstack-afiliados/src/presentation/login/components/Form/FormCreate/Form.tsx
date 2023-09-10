import Form from "@root/presentation/common/types/Form";
import {Alert, Box, Stack, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import React, {useEffect} from "react";
import {newUser, useMeResponse} from "@root/services/User.service";

interface FormCreateUser extends Form {
    checkEmailIsLoading: boolean;
    createUser: (data: newUser) => void;
    responseCheckEmail: {exist: boolean, status: number} | null;
    response: useMeResponse | null
}

const FormComponent: React.FC<FormCreateUser> = ({
    onSubmit,
    createUser,
    checkEmailIsLoading,
    responseCheckEmail,
    response
}) => {

    const { formState: { isValid }, control, handleSubmit, getValues, reset } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    useEffect(() => {
        if (responseCheckEmail && !responseCheckEmail?.exist && createUser) {
            createUser({
                name: getValues('name'),
                email: getValues('email'),
                password: getValues('password')
            })
        }
    }, [ responseCheckEmail, createUser ])

    useEffect(() => {
        if (response) {
            reset()
        }
    }, [response])

    return (
        <form id="form-create" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <Box>
                    <Controller
                        render={({ field }) => (
                            <TextField
                                label="Nome"
                                id="name"
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
                                id="email"
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
                                id="password"
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
    )
}

export default FormComponent;
