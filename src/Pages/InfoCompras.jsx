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
            pago:'',
            cantidad:1
        };
        this.getData = this.getData.bind(this);
        this.deletePub = this.deletePub.bind(this);
        this.specificProduct=this.specificProduct.bind(this);
        this.crearChat=this.crearChat.bind(this);
        this.comprar=this.comprar.bind(this);
        this.actualizarCantidad=this.actualizarCantidad.bind(this);

        this.setState({pago:
                <script
                    src="https://www.mercadopago.com.co/integrations/v1/web-payment-checkout.js"
                    data-preference-id='<%= global.id %>'>
                </script>
        })
    }

    componentDidMount() {
        this.getData();

    }

    async comprar(id, e) {

        // SDK de Mercado Pago
        const mercadopago = require ('mercadopago');

// Agrega credenciales
        mercadopago.configure({
            access_token: 'TEST-5322104039027334-102213-b38abd6af7adb752421cf1fd72dcf905-662089090'
        });

// Crea un objeto de preferencia
        let preference = {
            items: [
                {
                    title: 'Mi producto',
                    unit_price: 100,
                    quantity: 1,
                }
            ]
        };

        mercadopago.preferences.create(preference)
            .then(function(response){
// Este valor reemplazará el string "<%= global.id %>" en tu HTML
                global.id = response.body.id;
            }).catch(function(error){
            console.log(error);
        });

    }


    async actualizarCantidad(id,cantidad,e){
        e.preventDefault()

        const token = localStorage.getItem("token")

        //const url = 'https://radiant-castle-07024.herokuapp.com/api/saving/cantidad/'
        const url = 'http://localhost:5000/api/saving/cantidad/'

        const config = {
            method: 'put',
            url: url+id ,
            headers: {
                'access-token': token,
                "cantidad":cantidad
            }
        };

        var response = await Axios(config);

        Swal.fire({
            title: response.data.data
        })

        if(response.status==200){
            window.location.reload();
        }

    }

    async deletePub(id,e){
        e.preventDefault()
        const token = localStorage.getItem("token")

        //const url = 'https://radiant-castle-07024.herokuapp.com/api/saving/'
        const url = 'http://localhost:5000/api/saving/'


        const config = {
            method: 'put',
            url: url + id,
            headers: {
                'access-token': token
            }

        };

        var response = await Axios(config);

        Swal.fire({
            title: response.data.data
        })


        window.location.reload();


    }

    specificProduct(id){
        localStorage.setItem("productID",id)
        localStorage.setItem("productIDAux",id)

        window.location.reload();
    }

    crearChat(id,e){
        e.preventDefault()
        localStorage.setItem("productIDChat",id)

        window.location.reload();
    }

    async getData() {

        const token = localStorage.getItem("token")

        //const url = 'https://radiant-castle-07024.herokuapp.com/api/saving'
        const url = 'http://localhost:5000/api/saving'

        const config = {
            method: 'get',
            url: url,
            headers: {
                'access-token': token
            }
        };

        var response=await Axios(config);

        var data = response.data.data;
        var cantidades=response.data.cantidades;

        if(data.length>0) {
            this.setState({

                Content: data.map((producto,index) => (
                    <div className="media" key={producto._id}>
                        <img className="mr-3 imgList" src={producto.images[0]} alt='imagen'/>
                        <div className="media-body">
                            <h6 className="mt-0"> {producto.nombre}</h6>
                            <p className="card-text">Precio x Unidad: ${producto.precio}</p>
                            <p className="card-text">Vendedor: {producto.user.nombre}</p>
                            <p className="card-text">Cantidad: {producto.precio}</p>
                            <div className="rating-p">
                                <Rating name="read-only" value={producto.promedio} readOnly/>
                            </div>
                        </div>

                    </div>

                ))
            })
        }else{
            this.setState({
                Content: <div>
                    <h4 className="noProduct">No tienes productos guardados.</h4>
                </div>
            })
        }

    }

    render() {
        if(localStorage.getItem("productIDChat")){
            return (
                <Redirect to="/chat"/>
            )
        }else if (localStorage.getItem("productID")) {
            return (
                <Redirect to="/product"/>
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
                            <p>$50.000</p>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        {this.state.Content}
                    </Grid>

                    <Grid item xs={12}>
                        <button className="btn-pgr">Continuar compra</button>
                    </Grid>

                </Grid>
            )
        };
    }

}

export default InfoCompras;