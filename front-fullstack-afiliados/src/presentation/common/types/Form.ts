import React from "react";
import {Control} from "react-hook-form";

interface Form {
    onSubmit:  (data: any) => void | undefined;
    isLoading: boolean;
}

export default Form;
