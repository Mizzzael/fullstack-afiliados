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
import Header from "@root/presentation/common/components/Dashboard/Header";
import Form from "@root/presentation/common/components/Dashboard/Form";

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

    const updateUserHandle = useCallback(({ email, name }: { email: string; name: string; }) => {
        if (responseCheckEmail && !responseCheckEmail.exist) {
            updateMe({ email, name });
        }
    }, [ responseCheckEmail ])

    useEffect(() => {
        if (!isLoading && !response) {
            getMe()
        }
    }, [ isLoading, getMe, response ])

    useEffect(() => {
        if ((response && responsePut) && (response.name !== responsePut.name || response.email !== responsePut.email)) {
            getMe();
        }
    }, [ response, responsePut ])


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
                        <Form
                            onSubmit={(data) => {
                                if (data.name !== response?.name || data.email !== response?.email) {
                                    if (data.email === response?.email) {
                                        updateMe(data);
                                    } else {
                                        checkEmail({
                                            email: data.email
                                        })
                                    }
                                }
                            }}
                            responseCheckEmail={responseCheckEmail}
                            loadingPut={loadingPut}
                            toggleModal={toggleModal}
                            updateUserHandle={updateUserHandle}
                            response={response}
                        />
                    </S.DashboardProfileContainer>
                </DialogContent>
            </Dialog>
            <Header
                response={response}
                toggleModal={toggleModal}
                isLoading={isLoading}
                loggout={loggout}
            />
        </Box>
    )
}

export default DashboardHeader;
