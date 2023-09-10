import React from 'react'
import {Box, Stack, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import Form from "@root/presentation/common/types/Form";

const FormComponent: React.FC<Form> = ({ onSubmit, isLoading }) => {

    const { control, formState: { isValid }, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    return (
        <form id="form-login" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <Box>
                    <Controller
                        render={({ field }) => (
                            <TextField
                                label="E-mail"
                                id="email"
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
                                id="password"
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
    )
}
export default FormComponent
