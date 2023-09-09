'use client'
import React from 'react'
import {Box, Container} from "@mui/material";
import LoginHeader from "@root/presentation/login/components/Header";
import * as S from './style'
import {MainCenter} from "@root/presentation/common/components/MainCenter";
import LoginProvider from "@root/presentation/login/provider";
import Form from "@root/presentation/login/components/Form";
const LoginPresentation = () => {

    return (
        <LoginProvider>
            <Container>
                <MainCenter>
                    <S.LoginContainer>
                        <LoginHeader />
                        <Form />
                    </S.LoginContainer>
                </MainCenter>
            </Container>
        </LoginProvider>
    )
}

export default LoginPresentation;
