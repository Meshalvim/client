import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import swal from "sweetalert2"





export default function DenseTable() {
  const [rows, setRows] = React.useState([
    { rowId: 1, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 2, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 3, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 4, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 5, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 6, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 7, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 8, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 9, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 10, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 11, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 12, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 13, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 14, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 15, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 16, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 17, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 18, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 19, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 20, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 21, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 22, name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { rowId: 23, name: 'רונן', company: 'אלביט', position: 'מזכיר' },])

  const remove = (id) => {
    swal.fire({
      title: '',
      text: 'בטוח שהנך למחוק רשומה זו מהטבלה?',
      icon: 'warning',
      confirmButtonText: 'אישור',
      confirmButtonColor: '#3085d6',
    }).then(() => {
      const copyRows = rows.filter((row) => row.rowId !== id);
      setRows(copyRows);
    })
  }

  return (

    <TableContainer component={Paper}
      sx={{
        p: 5,
        width: '70vw',
        margin: "auto",
        mt: 5,
        boxShadow: '0px 2px 7px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 0px 3px 0px rgb(0 0 0 / 12%)'
      }}
    >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontSize: '21px', color: ' #1976d2' }}></TableCell>
            <TableCell align="center" sx={{ fontSize: '21px', color: ' #1976d2' }}>חברה</TableCell>
            <TableCell align="center" sx={{ fontSize: '21px', color: ' #1976d2' }}>משרה</TableCell>
            <TableCell align="center" sx={{ fontSize: '21px', color: ' #1976d2' }}>שם מועמד</TableCell>
            <TableCell align="center" sx={{ fontSize: '21px', color: ' #1976d2' }}>מחיקת רשומה</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover >
              <TableCell align="right" sx={{ fontSize: '1.120rem' }}>{row.rowId}</TableCell>
              <TableCell align="center" sx={{ fontSize: '1.120rem' }}>{row.company}</TableCell>
              <TableCell align="center" sx={{ fontSize: '1.120rem' }}>{row.position}</TableCell>
              <TableCell align="center" sx={{ fontSize: '1.120rem' }}>{row.name}</TableCell>
              <TableCell align="center" sx={{ fontSize: '1.120rem' }}>
                <Button onClick={() => { remove(row.rowId) }}>
                  <DeleteIcon></DeleteIcon>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
























// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import { Button } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';

// // function createData(
// //   name: string,
// //   calories: number,
// //   fat: number,
// //   carbs: number,
// //   protein: number,
// //   price: number,
// // ) {
// //   return {
// //     name,
// //     calories,
// //     fat,
// //     carbs,
// //     protein,
// //     price,
// //     history: [
// //       {
// //         date: '2020-01-05',
// //         customerId: '11091700',
// //         amount: 3,
// //       },
// //       {
// //         date: '2020-01-02',
// //         customerId: 'Anonymous',
// //         amount: 1,
// //       },
// //     ],
// //   };
// // }

// const Row=()=> {
//     //   const { row } = props;
//     // const row=props.row
//     const [open, setOpen] = React.useState(false);

//     return (
//         <React.Fragment>
//             <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
//                 <TableCell>
//                     <IconButton
//                         aria-label="expand row"
//                         size="small"
//                         onClick={() => setOpen(!open)}
//                     >
//                         {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                     </IconButton>
//                 </TableCell>
//                 <TableCell component="th" scope="row">
//                     בלה בלה
//                 </TableCell>
//                 <TableCell align="right">1</TableCell>
//                 <TableCell align="right">2</TableCell>
//                 <TableCell align="right">3</TableCell>
//                 <TableCell align="right">4</TableCell>
//             </TableRow>
//             <TableRow>
//                 <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//                     <Collapse in={open} timeout="auto" unmountOnExit>
//                         <Box sx={{ margin: 1 }}>
//                             <Typography variant="h6" gutterBottom component="div">
//                                 History
//                             </Typography>
//                             <Table size="small" aria-label="purchases">
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell>Date</TableCell>
//                                         <TableCell>Customer</TableCell>
//                                         <TableCell align="right">Amount</TableCell>
//                                         <TableCell align="right">Total price ($)</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {data.map((item,i) => (
//                     <TableRow key={i}>
//                       <TableCell component="th" scope="row">
//                         {item.company}
//                       </TableCell>
//                       <TableCell>{item.position}</TableCell>
//                       <TableCell align="right">{item.name}</TableCell>
//                       {/* <TableCell align="right">
//                         {Math.round(historyRow.amount * row.price * 100) / 100}
//                       </TableCell> */}
//                     </TableRow>
//                   ))}
//                                 </TableBody>
//                             </Table>
//                         </Box>
//                     </Collapse>
//                 </TableCell>
//             </TableRow>
//         </React.Fragment>
//     );
// }

// const data = [{ name: 'רונן', company: 'אלביט', position: 'מזכיר' }, { name: 'רונן', company: 'אלביט', position: 'מזכיר' },
// { name: 'רונן', company: 'אלביט', position: 'מזכיר' }, { name: 'רונן', company: 'אלביט', position: 'מזכיר' },
// { name: 'רונן', company: 'אלביט', position: 'מזכיר' }, { name: 'רונן', company: 'אלביט', position: 'מזכיר' },
// { name: 'רונן', company: 'אלביט', position: 'מזכיר' }, { name: 'רונן', company: 'אלביט', position: 'מזכיר' },
// { name: 'רונן', company: 'אלביט', position: 'מזכיר' }, { name: 'רונן', company: 'אלביט', position: 'מזכיר' }]
// // const rows = [
// //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
// //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
// //   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
// //   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
// //   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// // ];

// export default function CollapsibleTable() {
//     return (
//         <TableContainer component={Paper}>
//             <Table aria-label="collapsible table">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell />
//                         <TableCell align="right">חברה</TableCell>
//                         <TableCell align="right">משרה</TableCell>
//                         <TableCell align="right">עובד</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {data.map((row, index) => {
//                         <Row key={index} row={row}>
//                             <Button><DeleteIcon></DeleteIcon></Button>
//                         </Row>

//                     })}

//                     {/* {rows.map((row) => (
//             <Row key={row.name} row={row} />
//           ))} */}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// }