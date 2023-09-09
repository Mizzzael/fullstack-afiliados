'use client'
import React, {LegacyRef, useCallback, useEffect, useRef, useState} from 'react'
import {Box, Button, Dialog, DialogContent,  Typography} from "@mui/material";
import * as S from './style'
import BlockAndEnableDraggEventsInDom from "@root/presentation/common/utils/blockAndEnableDraggEventsInDom";
import FilePreview from "@root/presentation/common/components/FilePreview";
import {usePostTransaction} from "@root/services/Transaction.service";
import {LoadingButton} from "@mui/lab";

const TransactionFileUploader: React.FC<{ callback?: () => void }> = ({ callback }) => {
    const [ showOpen, setShowOpen ] = useState(false);
    const [ dropMessage, setDropMessage ] = useState<boolean>(false)
    const [ fileToSave, setFileToSave ] = useState<File|null>(null)
    const { response, saveTransactions, isLoading, error, clearResponse } = usePostTransaction()

    const showOpenBind = useCallback(() => {
        setShowOpen(!showOpen);
    }, [ showOpen ])

    const saveTransactionsHandle = useCallback(() => {
        if (!fileToSave) return;
        const Form = new FormData()
        Form.append('transactions', fileToSave)
        saveTransactions(Form);
    }, [ fileToSave, saveTransactions ])

    const disableDrag = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault()
        e.stopPropagation();
    }

    const showDropMessage = useCallback(() => {
        setDropMessage(true)
    }, [ dropMessage ])

    const hideDropMessage = useCallback(() => {
        setDropMessage(false)
    }, [ dropMessage ])

    useEffect(() => {
        BlockAndEnableDraggEventsInDom(showOpen, 'dropzone');
    }, [ showOpen ])

    useEffect(() => {
        if (response) {
            setFileToSave(null)
            setDropMessage(false)
            showOpenBind()
        }
    }, [ response ])

    useEffect(() => {
        if (!showOpen && response && callback) {
            clearResponse()
            callback()
        }
    }, [ showOpen, response, callback ])

    return (<>
        <Dialog open={showOpen} onClose={() => {
            showOpenBind()
            setFileToSave(null)
            setDropMessage(false)
        }}>
            <DialogContent>
                <S.TransactionFileUploaderDragginDropContainer
                    style={{
                        backgroundColor: (dropMessage) ? '#ececec': 'transparent',
                    }}
                    className={'dropzone'}
                    onDragEnter={(e) => {
                        disableDrag(e)
                        showDropMessage()
                    }}
                    onDragOver={(e) => {
                        disableDrag(e)
                        showDropMessage()
                    }}
                    onDragExit={(e) => {
                        disableDrag(e)
                        hideDropMessage()
                    }}
                    onDragLeave={(e) => {
                        disableDrag(e)
                        hideDropMessage()
                    }}
                    onDrop={(e) => {
                        disableDrag(e)
                        if (!fileToSave) setFileToSave(e.dataTransfer.items[0].getAsFile())
                    }}
                >
                    <S.TransactionFileUploaderInputContainer>
                        {(() => {
                            if (fileToSave) {
                                const mimeTypeAllowed: string = 'text/plain'
                                if (dropMessage) setDropMessage(false);
                                return (
                                    <Box
                                        sx={{
                                            width: '100%'
                                        }}
                                    >
                                        <FilePreview
                                            isNotAllowed={fileToSave.type !== mimeTypeAllowed}
                                            file={fileToSave}
                                        />
                                        <Box
                                            sx={{
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '16px',
                                                padding: '16px 0',
                                            }}
                                        >
                                            {(() => {
                                                if (fileToSave.type !== mimeTypeAllowed) return null
                                                return (
                                                    <LoadingButton
                                                        onClick={() => {
                                                            saveTransactionsHandle()
                                                        }}
                                                        loading={isLoading}
                                                    >
                                                        Processar
                                                    </LoadingButton>
                                                )
                                            })()}
                                            <LoadingButton
                                                color={'error'}
                                                onClick={() => {
                                                    setFileToSave(null)
                                                }}
                                                loading={isLoading}
                                            >
                                                Cancelar
                                            </LoadingButton>
                                        </Box>
                                    </Box>
                                )
                            }

                            if (!dropMessage) return (
                                <>
                                    <Typography color={'#AAAAAA'} variant='h6' component="span">
                                        Arraste o arquivo aqui.
                                    </Typography>
                                    <input onChange={(e) => {
                                        if (!e.target || !e.target.files || !e.target.files[0]) return;
                                        if (!fileToSave) setFileToSave(e.target.files[0])
                                    }} id="fileinput" type='file' multiple={false} style={{ display: 'none' }}/>
                                    <label
                                        htmlFor='fileinput'
                                        style={{
                                            cursor: "pointer",
                                            padding: '0 16px',
                                            borderLeft: '1px solid #333333'
                                        }}
                                    >
                                        <Typography variant='h6' component="span">
                                            Selecionar arquivo
                                        </Typography>
                                    </label>
                                </>
                            )

                            return (
                                <Typography color={'#AAAAAA'} variant='h6' component="span">
                                    Solte aqui.
                                </Typography>
                            )
                        })()}
                    </S.TransactionFileUploaderInputContainer>
                </S.TransactionFileUploaderDragginDropContainer>
            </DialogContent>
        </Dialog>
        <Box
            sx={{
                padding: '16px 0',
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center'
            }}
        >
            <Button
                color={'success'}
                onClick={showOpenBind}
            >
                Novas Transações
            </Button>
        </Box>
    </>)
}

export default TransactionFileUploader;
