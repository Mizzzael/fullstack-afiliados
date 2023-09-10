import {Alert, Box} from "@mui/material";
import React from "react";

const AlertComponent: React.FC<{ error: any }> = ({ error }) => {
    return (
        <Box sx={{
            padding: '0 0 16px'
        }}>
            <Alert
                severity="error" variant={"outlined"} color={'error'}
            >
                {(() => {
                    switch (error.response.status) {
                        case 401:
                            return 'Usuário ou senha incorretos!'
                        default:
                            return 'Ops! Tivemos um erro interno, por favor tente mais tarde.'
                    }
                })()}
            </Alert>
        </Box>
    )
}

export default AlertComponent;
