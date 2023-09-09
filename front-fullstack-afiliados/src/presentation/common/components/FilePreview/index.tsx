import React from 'react'
import {Alert, Box, Typography} from "@mui/material";
import Lottie from 'react-lottie'
import AnimationLottie from '@root/assets/animation/animation_lm9gmpt0.json'
import AnimationBlockLottie from '@root/assets/animation/animation_lm9i73px.json'

const FilePreview = ({ file, isNotAllowed }: { file: File, isNotAllowed: boolean }) => {
    return (
        <Box>
            <Box sx={{
                maxHeight: (isNotAllowed) ? '230px' :'140px',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden'
            }}>
                {(() => {
                    if (isNotAllowed) return (
                        <Lottie
                            height={'230px'}
                            options={{
                                animationData: AnimationBlockLottie,
                                loop: true,
                                autoplay: true
                            }}
                        />
                    )

                    return (
                        <Lottie
                            height={"200px"}
                            options={{
                                animationData: AnimationLottie,
                                loop: false,
                                autoplay: true
                            }}
                        />
                    )
                })()}
            </Box>
            <Box
                sx={{
                    width: '100%'
                }}
            >
                <Typography
                    component="p"
                    style={{
                        fontSize: '12px',
                        margin: '0',
                        textAlign: 'center'
                    }}
                >
                    { file.name }
                </Typography>
                {(() => {
                    if (isNotAllowed) return (
                        <Box
                            sx={{
                                paddingTop: '16px'
                            }}
                        >
                            <Alert severity="error" variant={"outlined"} color={'error'}>
                                Somente arquivos .txt são permitidos.
                            </Alert>
                        </Box>
                    )

                    return null

                })()}

            </Box>
        </Box>
    )
}

export default FilePreview;
