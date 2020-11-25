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

class InfoCompras extends React.Component {

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

        localStorage.removeItem("bool")
        localStorage.removeItem("productS")
        localStorage.removeItem("cantidadS")

        const bool=localStorage.getItem("boolAux")
        const product=localStorage.getItem("productSAux")
        const cantidad=localStorage.getItem("cantidadSAux")

        var data

        //const url = 'https://radiant-castle-07024.herokuapp.com/api/venta'
        const url = 'http://localhost:5000/api/venta'

        if(bool) {

            const config = {
                method: 'get',
                url: url,
                headers: {
                    'access-token': token,
                    'bool':"true"
                }
            };

            var response = await Axios(config);

            data = response.data.data;

            this.setState({precio :  response.data.total})

        }else{

            const config = {
                method: 'get',
                url: url,
                headers: {
                    'access-token': token,
                    'producto':product,
                    'cantidad':cantidad
                }
            };

            var response = await Axios(config);

            data = response.data.data;

            this.setState({precio:data.total})
        }

        if(data.length>1) {
            this.setState({

                    Content: data.map((producto) => (
                            <div className="resumen">
                                <h13 className="titu-c">{producto.producto}</h13>
                                <p>Precio unitario: ${producto.precio}</p>
                                <p>Vendedor: {producto.vendedor}</p>
                                <p>Telefono: {producto.telefono}</p>
                                <p>Cantidad: {producto.cantidad}</p>
                                <p>Total: ${producto.total}</p>
                                <p>Comisión: ${producto.comision}</p>
                            </div>
                        )
                    )
                }
            )

        }else{
            this.setState({

                    Content:(
                            <div className="resumen">
                                <h13 className="titu-c">{data.producto}</h13>
                                <p>Precio unitario: ${data.precio}</p>
                                <p>Vendedor: {data.vendedor}</p>
                                <p>Telefono: {data.telefono}</p>
                                <p>Cantidad: {data.cantidad}</p>
                                <p>Comisión: ${data.comision}</p>

                            </div>
                    )
                })
        }

        console.log("data: "+JSON.stringify(data))
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
                        <h8 className="h8-c">Resumen de la compra</h8>
                    </Grid>

                    <Grid item xs={12}>
                        <div className="resumen">
                            <h13 className="titu-c">Total Compra</h13>
                            <p>$ {this.state.precio}</p>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        {this.state.Content}
                    </Grid>

                    <Grid item xs={12}>
                        <button className="btn-pgr" onClick={(e)=>this.setState({bool: true})}>Continuar compra</button>
                    </Grid>

                </Grid>
            )
        }
        ;
    }

}

export default InfoCompras;