import React from "react";
import Axios from "axios";
import '../assets/css/Listas.css';
import {Grid} from "@material-ui/core";
import DashNav from "../components/DashNav";
import * as AiIcons from 'react-icons/ai';
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";
import Rating from "@material-ui/lab/Rating";

class SavingPub extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Content: '',
            pago:''
        };
        this.getData = this.getData.bind(this);
        this.deletePub = this.deletePub.bind(this);
        this.specificProduct=this.specificProduct.bind(this);
        this.crearChat=this.crearChat.bind(this);
        this.comprar=this.comprar.bind(this)

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

    async deletePub(id,e){
        e.preventDefault()
        const token = localStorage.getItem("token")

        //const url = 'https://radiant-castle-07024.herokuapp.com/api/saving/'
        const url = 'http://localhost:5000/api/saving/'

        console.log(url + id)

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


       if(data.length>0) {
           this.setState({

               Content: data.map((producto) => (
                   <div className="media" key={producto._id}>
                       <img className="mr-3 imgList" src={producto.images[0]} alt='imagen'/>
                       <div className="media-body">
                           <h6 className="mt-0"> {producto.nombre}</h6>
                           <p className="card-text">{producto.categoria}</p>
                           <p className="card-text">Precio: ${producto.precio}</p>
                           <p className="card-text">Vendedor: {producto.user.nombre}</p>
                           <div className="rating-p">
                               <Rating name="read-only" value={producto.promedio} readOnly/>
                           </div>






                           <button type="button" className="btn btn-outline btn-list"
                                   onClick={(e) => this.comprar(producto._id, e)}><AiIcons.AiFillDollarCircle/></button>
                           <button type="button" className="btn btn-outline btn-list"
                                   onClick={(e) => this.crearChat(producto._id, e)}><AiIcons.AiFillMessage/></button>
                           <button type="button" className="btn btn-outline btn-list"
                                   onClick={(e) => this.specificProduct(producto._id)}><AiIcons.AiFillEye/></button>
                           <button type="button" className="btn btn-outline btn-list"
                                   onClick={(e) => this.deletePub(producto._id, e)}><AiIcons.AiFillDelete/></button>
                           <label className="lbl-q">Cantidad</label><input type="number" className="inpt-q"required/>
                           <div className="card-footer">
                               <small className="text-muted">Last updated 3 mins ago</small>
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
                <Grid container spacing={3}>


                    <Grid item xs={12}>
                        <DashNav/>
                    </Grid>

                    <Grid item xs={12}>
                        <button className="btn-pgr">Pagar todo</button>
                    </Grid>

                    <Grid item xs={12}>
                        {this.state.Content}
                    </Grid>


                </Grid>
            )
        };
    }

}

export default SavingPub