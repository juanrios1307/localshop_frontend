import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Axios from "axios";

const StyledTableCell= withStyles(()=>({
    head:{
        color: 'white',
        background: 'black',
        textAlign: 'center'
    },
    body:{
        fontSize: 14,
    },
}))(TableCell);

function TableMaterial(props) {

    const [Content, setContent] = useState('');

    useEffect(() => {
        getData()
    }, []);

    const getData= async () => {


        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/main/promworkers'
        const url = 'http://localhost:5000/api/main/promworkers'

        const config = {
            method: 'get',
            url: url
        };

        var response = await Axios(config);

        var data = response.data.data;


        setContent( data.map((elemento) => (
            <TableRow key={elemento.id}>
                <TableCell><img src={elemento.imagen} width="40px" height="40px" alt="Imagen"/>{"  "}</TableCell>
                <TableCell align="center">{elemento.user.nombre}</TableCell>
                <TableCell align="center">{elemento.profesion}</TableCell>
            </TableRow>
        )))
    }


    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Publicaciones Destacadas</StyledTableCell>
                        <StyledTableCell>Vendedor</StyledTableCell>
                        <StyledTableCell>Precio</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Content}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableMaterial;