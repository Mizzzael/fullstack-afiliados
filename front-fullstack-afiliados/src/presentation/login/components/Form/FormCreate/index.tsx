import React, {useEffect, useState} from 'react'
import {Box} from "@mui/material";
import {useCheckEmail, useCreate} from "@root/services/User.service";
import FormComponent from "@root/presentation/login/components/Form/FormCreate/Form";
import Alerts from "@root/presentation/login/components/Form/FormCreate/Alerts";

const Index: React.FC = () => {
    const [ emailExists, setEmailExits ] = useState<boolean>(false)
    const [ success, setSuccess ] = useState<boolean>(false)
    const { isLoading: checkEmailIsLoading, checkEmail, clear, response: responseCheckEmail, error } = useCheckEmail()
    const { isLoading, response, createUser } = useCreate()

    useEffect(() => {
        if (!responseCheckEmail) return;
        if (responseCheckEmail && responseCheckEmail?.exist) {
            setEmailExits(true);
            clear()
        } else if (responseCheckEmail && !responseCheckEmail?.exist) {
            setEmailExits(false)
            clear()
        }
    }, [ responseCheckEmail, clear ])

    useEffect(() => {
        if (response) {
            setSuccess(true)
        }
    }, [response])

    return (
        <Box sx={{
            paddingBottom: '16px',
        }}>
            <Alerts emailExists={emailExists} error={error} success={success} />
            <FormComponent
                checkEmailIsLoading={checkEmailIsLoading}
                onSubmit={(data) => {
                    checkEmail({email: data.email})
                }}
                responseCheckEmail={responseCheckEmail}
                createUser={createUser}
                isLoading={isLoading}
                response={response}
            />
        </Box>
    )
}

export default Index;
