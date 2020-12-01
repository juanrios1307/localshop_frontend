import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Axios from "axios";
import nofoto from "../assets/images/nofoto.png";

const StyledTableCell= withStyles(()=>({
    head:{
        color: 'white',
        background: '#060b26',
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


        //const url = 'https://radiant-castle-07024.herokuapp.com/api/main/promproducts'
        const url = 'http://localhost:5000/api/main/promproducts'

        const config = {
            method: 'get',
            url: url
        };

        var response = await Axios(config);

        var data = response.data.data;

        if(data[0].promedio != 0) {
            setContent(data.map((producto) => (
                <TableRow key={producto.id}>
                    <TableCell><img src={producto.promedio>0?producto.images[0]:nofoto} width="40px" height="40px" alt="Imagen"/>{"  "}</TableCell>
                    <TableCell align="center">{producto.promedio>0?producto.nombre[0].toUpperCase()+producto.nombre.slice(1):"No tenemos mas sugerencias para ti"}</TableCell>
                    <TableCell align="center">{producto.promedio>0?"$"+producto.precio:""}</TableCell>
                </TableRow>
            )))
        }else{
            setContent(
                    <div className="div0">
                        <h5 className="card0">No tenemos sugerencias para ti !</h5>
                    </div>
            )
        }
    }


    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Publicaciones Destacadas</StyledTableCell>
                        <StyledTableCell>Producto</StyledTableCell>
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