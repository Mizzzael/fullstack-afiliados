'use client'
import React, {useCallback} from 'react'
import {Button, ButtonGroup} from "@mui/material";
import * as S from './style'
import useLoginProvider from "@root/presentation/login/provider/useLoginProvider";
const LoginHeader = () => {
    const { page, setPage } = useLoginProvider()

    const changePage = useCallback((newPage: number) => {
        setPage(newPage);
    }, [ page ])

    return (
        <S.HeaderLoginContainer>
            <ButtonGroup
                fullWidth
            >
                <Button
                    variant={(page === 1) ? 'contained': 'outlined'}
                    onClick={() => { changePage(1) }}
                >
                    Login
                </Button>
                <Button
                    variant={(page === 2) ? 'contained': 'outlined'}
                    onClick={() => { changePage(2) }}
                >
                    Cadastre-se
                </Button>
            </ButtonGroup>
        </S.HeaderLoginContainer>
    )
}

export default LoginHeader;
