import React, {useEffect} from "react"
import {Alert, Box, Button, Stack, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import {useMeResponse} from "@root/services/User.service";

interface FormComponentProps {
    onSubmit: (data: { name: string; email: string; }) => void;
    responseCheckEmail:  {exist: boolean, status: number} | null;
    loadingPut: boolean;
    toggleModal: () => void;
    updateUserHandle: (data: { name: string; email: string }) => void;
    response: useMeResponse | null;
}
const FormComponent: React.FC<FormComponentProps> = ({ response, updateUserHandle, onSubmit, responseCheckEmail, loadingPut, toggleModal }) => {

    const { setValue, control, formState: { isValid }, handleSubmit, getValues } = useForm({
        defaultValues: {
            name: '',
            email: ''
        }
    })

    useEffect(() => {
        if (responseCheckEmail && !responseCheckEmail.exist) {
            const email = getValues('email');
            const name = getValues('name');
            updateUserHandle({ email, name });
        }
    }, [ responseCheckEmail ])

    useEffect(() => {
        if (response) {
            setValue('name', response.name);
            setValue('email', response.email);
        }
    }, [ response ])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack spacing={2}>
                {(() => {
                    if (responseCheckEmail && responseCheckEmail.exist) return (
                        <Box
                            sx={{
                                padding: '10px 0'
                            }}
                        >
                            <Alert
                                severity="error" variant={"outlined"} color={'error'}
                            >
                                Este e-mail já está sendo usado por outro usuário!
                            </Alert>
                        </Box>
                    )

                    return null
                })()}
                <Box
                    sx={{
                        padding: '10px 0'
                    }}
                >
                    <Controller
                        render={({ field }) => (
                            <TextField
                                label="Nome"
                                fullWidth
                                {...field}
                            />
                        )}
                        control={control}
                        name="name"
                        rules={{
                            required: true
                        }}
                    />
                </Box>
                <Box>
                    <Controller
                        render={({ field }) => (
                            <TextField
                                label="E-mail"
                                fullWidth
                                { ...field }
                            />
                        )}
                        control={control}
                        rules={{
                            required: true,
                            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                        }}
                        name="email"
                    />
                </Box>
            </Stack>
            <Box
                sx={{
                    padding: '16px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'end',
                    gap: '16px'
                }}
            >
                <LoadingButton
                    disabled={!isValid}
                    type={'submit'}
                    loading={loadingPut}
                >
                    Salvar
                </LoadingButton>
                <Button
                    variant={"contained"}
                    color={"error"}
                    onClick={toggleModal}
                >
                    Cancelar
                </Button>
            </Box>
        </form>
    )
}

export default FormComponent
