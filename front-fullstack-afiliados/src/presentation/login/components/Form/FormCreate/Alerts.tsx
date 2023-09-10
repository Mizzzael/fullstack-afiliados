import {Alert, Box} from "@mui/material";
import React from "react";

const AlertsComponent: React.FC<{ emailExists: boolean; error: any; success: boolean }> = ({
    emailExists,
    error,
    success
}) => {
    return (
        <>
        {(() => {
            if (!emailExists) return null;
            return (
                <Box>
                    <Alert
                        severity="error" variant="outlined" color='error'
                    >
                        E-mail já está sendo usado por outra conta.
                    </Alert>
                </Box>
            )
        })()}
        {(() => {
            if (!error) return null;
            return (
                <Box>
                    <Alert
                        severity="error" variant="outlined" color='error'
                    >
                        Erro ao efetuar cadastro, por favor tente outra hora!
                    </Alert>
                </Box>
            )
        })()}
        {(() => {
            if (!success) return null;
            return (
                <Box>
                    <Alert>
                        Sucesso! Seu cadastro foi efetuado com sucesso.
                    </Alert>
                </Box>
            )
        })()}
    </>
    )
}

export default AlertsComponent;
