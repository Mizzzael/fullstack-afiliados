import React from 'react'
import {Box, Button, ButtonGroup, Container, Skeleton, Typography} from "@mui/material";
import {useMeResponse} from "@root/services/User.service";

interface HeaderProps {
    isLoading: boolean;
    response: useMeResponse | null;
    toggleModal: React.MouseEventHandler<HTMLButtonElement>;
    loggout: () => void;
}

const Header: React.FC<HeaderProps> = ({ response, isLoading, toggleModal, loggout }) => {
    return (
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
    )
}

export default Header;
