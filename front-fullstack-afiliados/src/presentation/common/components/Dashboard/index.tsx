'use client'

import React from "react";
import DashboardHeader from "@root/presentation/common/components/Dashboard/DashboardHeader";

const Dashboard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <DashboardHeader />
            {children}
        </>
    )
}

export default Dashboard
