'use client'

import {useContext} from "react";
import {LoginContext} from "@root/presentation/login/provider/index";

const useLoginProvider = () => useContext(LoginContext)
export default useLoginProvider;
