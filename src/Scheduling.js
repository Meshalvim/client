import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';



export default function DenseTable() {
    const rows = [{ name: 'רונן', company: 'אלביט', position: 'מזכיר' }, { name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { name: 'רונן', company: 'אלביט', position: 'מזכיר' }, { name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { name: 'רונן', company: 'אלביט', position: 'מזכיר' }, { name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { name: 'רונן', company: 'אלביט', position: 'מזכיר' }, { name: 'רונן', company: 'אלביט', position: 'מזכיר' },
    { name: 'רונן', company: 'אלביט', position: 'מזכיר' }, { name: 'רונן', company: 'אלביט', position: 'מזכיר' }]
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.company}</TableCell>
              <TableCell align="right">{row.position}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <DeleteIcon></DeleteIcon>
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
