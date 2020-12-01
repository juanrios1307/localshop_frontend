import React from "react";
import Axios from "axios";
import '../assets/css/Listas.css';
import {Grid} from "@material-ui/core";
import DashNav from "../components/DashNav";
import * as AiIcons from 'react-icons/ai';
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import {Label} from "@material-ui/icons";
import logo from "../assets/images/Logo/Logo Localshop blanco.png"
import moment from "moment";

class FacturaVenta extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Content: '',
            precio:0,
            bool:false

        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData()
    }

    async getData(){
        const token = localStorage.getItem("token")

        localStorage.removeItem("facturaID")

        const id=localStorage.getItem("facturaIDAux")


        //const url = 'https://radiant-castle-07024.herokuapp.com/api/venta/compras'
        const url = 'http://localhost:5000/api/venta/ventas/'



            const config = {
                method: 'get',
                url: url+id,
                headers: {
                    'access-token': token,
                }
            };

            var response = await Axios(config);

            var data = response.data.data[0];


            this.setState({precio:data.total})

             this.setState({

                 Content: (
                    <div>
                        <div className="resumen">
                            <h13 className="titu-c">Comprador</h13>
                            <p>{data.comprador.nombre}</p>
                            <p><b>Telefono:</b> {data.comprador.telefono}</p>
                            <p><b>Correo:</b> {data.comprador.correo}</p>
                        </div>


                        { data.productos.map((productos) => (
                            <div>

                                <div className="resumen">
                                    <h13 className="titu-c">Vendedor</h13>
                                    <p>{productos.vendedor.nombre}</p>
                                    <p><b>Telefono:</b> {productos.vendedor.telefono}</p>
                                    <p><b>Correo:</b> {productos.vendedor.correo}</p>
                                </div>

                                <div className="resumen">
                                    <h13 className="titu-c">{productos.producto.nombre[0].toUpperCase()+productos.producto.nombre.slice(1)}</h13>
                                    <p><b>Precio unitario:$</b>{productos.producto.precio}</p>
                                    <p><b>Cantidad:</b> {productos.cantidad}</p>

                                </div>

                            </div>
                        ))}

                        <div className="resumen">
                            <h13 className="titu-c">Informacion compra</h13>
                            <p><b>Metodo de pago: </b>{data.metodoPago}</p>
                            <p><b>Estado:</b> {data.estado}</p>
                            <p><b>Fecha compra: $</b>{moment(data.date).format('DD/MM/YYYY')} </p>
                            <p><b>Comisión: $</b>{data.comision}</p>
                        </div>
                    </div>
                )
            }
        )

    }

    render() {
        if (this.state.bool == true) {
            return(
                <Redirect to="/paymethod" />
            )
        } else {

            return (
                <Grid container>

                    <Grid item xs={12} className="dshnav">
                        <DashNav/>
                    </Grid>

                    <Grid item xs={12} className="TittleC">
                        <h8 className="h8-c">Factura de compra</h8>
                    </Grid>

                    <Grid item xs={12}>
                        <div className="resumen">
                            <h13 className="titu-c">Total:</h13>
                            <p>$ {this.state.precio}</p>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        {this.state.Content}
                    </Grid>

                    <Grid item xs={12}>
                        <img className="img-pgr" src={logo} alt="foto"/>
                    </Grid>

                </Grid>
            )
        }
        ;
    }

}

export default FacturaVenta;