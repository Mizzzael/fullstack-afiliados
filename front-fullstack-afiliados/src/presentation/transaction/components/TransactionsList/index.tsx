'use client'
import React, {useEffect, useState} from 'react'
import {
    Box,
    Container,
    Pagination,
    Skeleton,
    Table,
    TableBody,
    TableCell, TableFooter,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import TransactionFileUploader from "@root/presentation/transaction/components/TransactionFileUploader";
import {useGetTransactions} from "@root/services/Transaction.service";
import formatCurrency from "@root/presentation/common/utils/formatCurrency";
import Empty from "@root/assets/animation/animation_lmbbtwyv.json"
import Lottie from "react-lottie";
import formatDate from "@root/presentation/common/utils/formatDate";
import List from "@root/presentation/transaction/components/TransactionsList/List";

const TransactionsList = () => {
    const [ page, setPage ] = useState(1)
    const { response, isLoading, getTransactionsPaginated } = useGetTransactions()

    useEffect(() => {
        if (!response && !isLoading) {
            getTransactionsPaginated(1)
        }
    }, [ response, isLoading ])

    return (
        <Container>
            <TransactionFileUploader callback={() => {
                setPage(1)
                getTransactionsPaginated(1)
            }} />
            <List response={ response } isLoading={isLoading} />
            {(() => {
                if (!response || !response.result.length) return (
                    <Box
                        sx={{
                            padding: '16px 0'
                        }}
                    >
                        <Lottie
                            height="200px"
                            options={{
                                animationData: Empty,
                                loop: true,
                                autoplay: true
                            }} />
                    </Box>
                );
                return (
                    <Box
                        sx={{
                            padding: '16px 0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Pagination
                            count={(() => {
                                let pageNumber: number = Math.floor(response.total / 10)
                                pageNumber += (response.total % 10 > 0) ? 1: 0;
                                return pageNumber
                            })()}
                            page={page}
                            onChange={(_, page) => {
                                setPage(page)
                                getTransactionsPaginated(page)
                            }}
                        />
                    </Box>
                )
            })()}
        </Container>
    )
}

export default TransactionsList
