import React from 'react'
import {Box} from "@mui/material";
import FormLogin from "@root/presentation/login/components/Form/FormLogin";
import useLoginProvider from "@root/presentation/login/provider/useLoginProvider";
import FormCreate from "@root/presentation/login/components/Form/FormCreate";

const Form = () => {
    const { page } = useLoginProvider()
    return (
        <Box sx={{
            width: '100%'
        }}>
            {(() => {
                if (page === 1) return <FormLogin />
                return <FormCreate />
            })()}
        </Box>
    )
}

export default Form;
