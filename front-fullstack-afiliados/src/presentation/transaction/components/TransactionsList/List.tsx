import {Skeleton, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Typography} from "@mui/material";
import formatDate from "@root/presentation/common/utils/formatDate";
import formatCurrency from "@root/presentation/common/utils/formatCurrency";
import React from "react";
import {result} from "@root/services/Transaction.service";

const List: React.FC<{
    response: {result: result[], total: number, valueTotal: number} | null,
    isLoading: boolean,
}> = ({ response, isLoading }) => {
    return (
        <Table id="transaction-list-table">
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

                    return response.result.map(({ id, type, product, seller, value, date }) => (
                        <TableRow id={`transaction-${ id }`} key={id}>
                            <TableCell>{id}</TableCell>
                            <TableCell>{ formatDate(date) }</TableCell>
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
            {(() => {
                if (!response) return;
                return (
                    <TableFooter>
                        <TableCell>
                            <Typography
                                style={{
                                    fontWeight: 'bold'
                                }}
                            >
                                TOTAL:
                            </Typography>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell>{(() => {
                            if (response.valueTotal < 0) {
                                return (
                                    <Typography
                                        style={{
                                            color: 'red',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {formatCurrency(response.valueTotal)}
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
                                    {formatCurrency(response.valueTotal)}
                                </Typography>
                            )
                        })()}</TableCell>
                    </TableFooter>
                );
            })()}
        </Table>
    )
}

export default List;
