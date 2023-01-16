import React from "react"
import { useEffect, useState } from "react"
import { getTradesHistory } from "../modules/modules"

import { 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow 
} from '@mui/material';

export const MyTable = () => {
  const [history, setHistory] = useState()

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  useEffect( () => {
    getTradesHistory()
      .then(res => { 
        res.ret_msg == "OK" ? setHistory( res.result.trade_list ) : "undefined"
        console.log( "Trades list ", res.result.trade_list )
      })
  }, [])

  return (
    <Paper>
      <TableContainer component={Paper} sx={{ maxHeight: '80vh' }}>
        <Table aria-label='simple table' stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Closed Size</TableCell>
              <TableCell>Execution Fee</TableCell>
              <TableCell>Executed Price</TableCell>
              <TableCell>Executed Quantity </TableCell>
              <TableCell>Execution Time</TableCell>
              <TableCell>Executed Value</TableCell>
              <TableCell>Fee rate</TableCell>
              <TableCell>Order Price</TableCell>
              <TableCell>Order Quantity</TableCell>
              <TableCell>Order Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              history 
                ? history
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => (
                    <TableRow  
                      key={ row.exec_id }
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                    >
                      <TableCell>{ row.closed_size }</TableCell>
                      <TableCell>{ row.exec_fee    }</TableCell>
                      <TableCell>{ row.exec_price  }</TableCell>
                      <TableCell>{ row.exec_qty    }</TableCell>
                      <TableCell>{ row.exec_time   }</TableCell>
                      <TableCell>{ row.exec_value  }</TableCell>
                      <TableCell>{ row.fee_rate    }</TableCell>
                      <TableCell>{ row.order_price }</TableCell>
                      <TableCell>{ row.order_qty   }</TableCell>
                      <TableCell>{ row.order_type  }</TableCell>
                    </TableRow>
                  )) : ""
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={ history ? history.length : 0 }
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}