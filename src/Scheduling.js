import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Backdrop, CircularProgress } from '@mui/material';
import Swal from "sweetalert2";
import { Icon, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function DenseTable() {
  const url = `http://localhost:64672/api/schedule`
  const [company, setCompany] = React.useState('חברה')
  const [candidate, setCandidate] = React.useState('מועמד')
  const [rows, setRows] = React.useState([])
  const navigate = useNavigate()
  const [showBackdrop, setShowBackdrop] = useState(false)

  const algorithm = () => {
    setShowBackdrop(true)
    console.log('start ' + showBackdrop)
    axios.get(url).then(res => {
      //resolve = true
      setRows(res.data.data)
      setShowBackdrop(false)
    })
  }

  const getRiverInformation = () => {
    //return new Promise((resolve) => {
      axios.get(url).then(res => {
        //resolve = true
        setRows(res.data.data)
      })
    //})
  }

  React.useEffect(() => {
    debugger
    algorithm()
  }, [])
  // React.useEffect(() => {
  //   let c;
  //   axios.get(url).then(res => {
  //     //אנא המתן
  //     setRows(res.data)
  //   })
  // }, [])
  const onClickRemove = (id) => {
    Swal.fire({
      title: '',
      icon: 'warning',
      text: 'בטוח שהנך רוצה למחוק רשומה זו מהטבלה?',
      confirmButtonText: 'אישור',
      showCancelButton: true,
      cancelButtonText: 'ביטול',
      confirmButtonClass: 'btn-danger',
      cancelButtonClass: 'btn-danger',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        remove(id)
      }
    })
  }
  const remove = (id) => {
    const copyRows = rows.filter((row) => row.rowId !== id);
    setRows(copyRows);
    alert("deleted")
    //צריך למחוק גם מהשרת לא???אין שם פונקציה כזו, בקונטרולר!!!! ך
  }

  return (
    <>
      <Backdrop

        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showBackdrop}
      >
        <CircularProgress color="inherit" />
        <h1 width='100vw'>אנא המתן...</h1>
      </Backdrop>
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
              <TableCell align="center" sx={{ fontSize: '21px', color: '#02c298' }}>חברה</TableCell>
              <TableCell align="center" sx={{ fontSize: '21px', color: '#02c298' }}>משרה</TableCell>
              <TableCell align="center" sx={{ fontSize: '21px', color: '#02c298' }}>שם מועמד</TableCell>
              <TableCell align="center" sx={{ fontSize: '21px', color: '#02c298' }}>מחיקת רשומה</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {

              rows &&
              rows.map((row, index) => (
                <TableRow
                  hover
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  hover >
                  <TableCell align="center" sx={{ fontSize: '1.120rem' }}>{row.company}</TableCell>
                  <TableCell align="center" sx={{ fontSize: '1.120rem' }}>{row.position}</TableCell>
                  <TableCell align="center" sx={{ fontSize: '1.120rem' }}>{row.name}</TableCell>
                  <TableCell align="center" sx={{ fontSize: '1.120rem' }}>
                    <IconButton onClick={() => { onClickRemove(row.rowId) }} sx={{ color: 'red' }}>
                      <DeleteIcon></DeleteIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
