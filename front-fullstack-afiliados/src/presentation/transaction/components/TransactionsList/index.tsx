'use client'
import React, {useEffect, useState} from 'react'
import {
    Box,
    Container,
    Pagination,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import TransactionFileUploader from "@root/presentation/transaction/components/TransactionFileUploader";
import {useGetTransactions} from "@root/services/Transaction.service";
import formatCurrency from "@root/presentation/common/utils/formatCurrency";
import Empty from "@root/assets/animation/animation_lmbbtwyv.json"
import Lottie from "react-lottie";

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
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#id</TableCell>
                        <TableCell>Data</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Produto</TableCell>
                        <TableCell>Valor</TableCell>
                        <TableCell>Vendedor</TableCell>
                    </TableRow>
                </TableHead>
               <TableBody>
                   {(() => {
                       if (!response || isLoading) return (
                           <>
                                <TableRow>
                                    <TableCell><Skeleton width={"30px"} height={"30px"} /></TableCell>
                                    <TableCell><Skeleton width={"80px"} height={"30px"} /></TableCell>
                                    <TableCell><Skeleton width={"80px"} height={"30px"} /></TableCell>
                                    <TableCell><Skeleton width={"80px"} height={"30px"} /></TableCell>
                                    <TableCell><Skeleton width={"80px"} height={"30px"} /></TableCell>
                                    <TableCell><Skeleton width={"80px"} height={"30px"} /></TableCell>
                                </TableRow>
                                <TableRow>
                                   <TableCell><Skeleton width={"30px"} height={"30px"} /></TableCell>
                                   <TableCell><Skeleton width={"80px"} height={"30px"} /></TableCell>
                                   <TableCell><Skeleton width={"80px"} height={"30px"} /></TableCell>
                                   <TableCell><Skeleton width={"80px"} height={"30px"} /></TableCell>
                                   <TableCell><Skeleton width={"80px"} height={"30px"} /></TableCell>
                                   <TableCell><Skeleton width={"80px"} height={"30px"} /></TableCell>
                                </TableRow>
                               <TableRow>
                                   <TableCell><Skeleton width={"30px"} height={"30px"} /></TableCell>
                                   <TableCell><Skeleton width={"80px"} height={"30px"} /></TableCell>
                                   <TableCell><Skeleton width={"80px"} height={"30px"} /></TableCell>
                                   <TableCell><Skeleton width={"80px"} height={"30px"} /></TableCell>
                                   <TableCell><Skeleton width={"80px"} height={"30px"} /></TableCell>
                                   <TableCell><Skeleton width={"80px"} height={"30px"} /></TableCell>
                               </TableRow>
                               <TableRow>
                                   <TableCell><Skeleton width={"30px"} height={"30px"} /></TableCell>
                                   <TableCell><Skeleton width={"80px"} height={"30px"} /></TableCell>
                                   <TableCell><Skeleton width={"80px"} height={"30px"} /></TableCell>
                                   <TableCell><Skeleton width={"80px"} height={"30px"} /></TableCell>
                                   <TableCell><Skeleton width={"80px"} height={"30px"} /></TableCell>
                                   <TableCell><Skeleton width={"80px"} height={"30px"} /></TableCell>
                               </TableRow>
                           </>
                        )

                       return response.result.map(({ id, type, product, seller, value }) => (
                           <TableRow key={id}>
                               <TableCell>{id}</TableCell>
                               <TableCell>24/05/1972</TableCell>
                               <TableCell>{ type }</TableCell>
                               <TableCell>{ product }</TableCell>
                               <TableCell>{(() => {
                                   if (value < 0) {
                                       return (
                                           <Typography
                                                style={{
                                                    color: 'red',
                                                    fontWeight: 'bold'
                                                }}
                                           >
                                               {formatCurrency(value)}
                                           </Typography>
                                       )
                                   }
                                   return (
                                       <Typography
                                           style={{
                                               color: 'green',
                                               fontWeight: 'bold'
                                           }}
                                       >
                                           {formatCurrency(value)}
                                       </Typography>
                                   )
                               })()}</TableCell>
                               <TableCell>{ seller }</TableCell>
                           </TableRow>
                       ))
                   })()}
                </TableBody>
            </Table>
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
