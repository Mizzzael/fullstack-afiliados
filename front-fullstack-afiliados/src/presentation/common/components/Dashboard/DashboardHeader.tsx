'use client'

import React, {useCallback, useEffect, useState} from 'react'
import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Dialog,
    DialogContent,
    DialogTitle, Stack, TextField,
    Typography,
    Skeleton, Alert
} from "@mui/material";
import * as S from './style'
import {LoadingButton} from "@mui/lab";
import {useCheckEmail, useMe, usePut} from "@root/services/User.service";
import {useAuth} from "@root/provider/AuthProvider";
import {Controller, useForm} from "react-hook-form";

const DashboardHeader = () => {
    const [ showModal, setShowModal ] = useState<boolean>(false)
    const { isLoading, getMe, error, response } = useMe()
    const { loggout } = useAuth()
    const { isLoading: loadingPut, response: responsePut, updateMe } = usePut()
    const { response: responseCheckEmail, checkEmail, isLoading: isLoadingCheckEmail } = useCheckEmail()
    const { setValue, control, formState: { isValid }, handleSubmit, getValues } = useForm({
        defaultValues: {
            name: '',
            email: ''
        }
    })

    const toggleModal = useCallback(() => {
        setShowModal(!showModal);
    }, [ showModal ])

    useEffect(() => {
        if (!isLoading && !response) {
            getMe()
        }
    }, [ isLoading, getMe, response ])

    useEffect(() => {
        if (response) {
            setValue('name', response.name);
            setValue('email', response.email);
        }
    }, [ response ])

    useEffect(() => {
        if ((response && responsePut) && (response.name !== responsePut.name || response.email !== responsePut.email)) {
            getMe();
        }
    }, [ response, responsePut ])

    useEffect(() => {
        if (responseCheckEmail && !responseCheckEmail.exist) {
            const email = getValues('email');
            const name = getValues('name');
            updateMe({ email, name });
        }
    }, [ responseCheckEmail ])

    return (
        <Box sx={{
            width: '100%',
            boxShadow: '0 0 2px #cccccc'
        }}>
            <Dialog
                open={showModal}
                onClose={toggleModal}
                aria-labelledby="profile-dialog-title"
                aria-describedby="profile-dialog-description"
            >
                <DialogTitle id="profile-dialog-title">
                    {"Perfil"}
                </DialogTitle>
                <DialogContent>
                    <S.DashboardProfileContainer>
                        <form
                            onSubmit={handleSubmit((data) => {
                                if (data.name !== response?.name || data.email !== response?.email) {
                                    if (data.email === response?.email) {
                                      updateMe(data);
                                    } else {
                                        checkEmail({
                                            email: data.email
                                        })
                                    }
                                }
                            })}
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
                    </S.DashboardProfileContainer>
                </DialogContent>
            </Dialog>
            <Container>
                <Box
                    sx={{
                        padding: '16px 0',
                        width: '100%',
                        display: 'grid',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gridTemplateColumns: '1fr auto'
                    }}
                >
                    <Box>

                            {(() => {
                                if (isLoading || !response) return (
                                    <Skeleton height='30px' width='200px' />
                                )
                                return (
                                    <Typography
                                        variant="h5"
                                    >
                                        { response.name }
                                    </Typography>
                                )
                            })()}

                    </Box>
                    <Box>
                        {(() => {
                            if (isLoading || !response) return (
                                <Skeleton height='30px' width='150px' />
                            )

                            return (
                                <ButtonGroup
                                    variant="text"
                                >
                                    <Button
                                        size="small"
                                        onClick={toggleModal}
                                    >
                                        Perfil
                                    </Button>
                                    <Button
                                        size="small"
                                        onClick={() => {
                                            loggout()
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </ButtonGroup>
                            )
                        })()}
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default DashboardHeader;
