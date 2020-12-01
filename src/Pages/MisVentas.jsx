import React from "react";
import Axios from "axios";
import '../assets/css/Listas.css';
import {Grid} from "@material-ui/core";
import DashNav from "../components/DashNav";
import moment from "moment"
import * as AiIcons from 'react-icons/ai';
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import * as FaIcons from "react-icons/fa/index";

class MisVentas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Content: '',
            pago:[]
        };
        this.getData = this.getData.bind(this);
        this.specificProduct=this.specificProduct.bind(this);
        this.facturaCompra=this.facturaCompra.bind(this);
        this.confirmarPago=this.confirmarPago.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    facturaCompra(id,e){
        e.preventDefault()

        localStorage.setItem("facturaID",id)
        localStorage.setItem("facturaIDAux",id)

        window.location.reload();

    }

    async confirmarPago(id, e) {

        const token = localStorage.getItem("token")

        //const url = 'https://radiant-castle-07024.herokuapp.com/api/venta/'
        const url = 'http://localhost:5000/api/venta/'

        const config = {
            method: 'put',
            url: url,
            headers: {
                'access-token': token,
                'id':id
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

    async getData() {

        const token = localStorage.getItem("token")

        //const url = 'https://radiant-castle-07024.herokuapp.com/api/venta/ventas'
        const url = 'http://localhost:5000/api/venta/ventas'

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
               Content: data.map((venta,index) => (
                   <div className="media" key={venta._id}>
                       <img className="mr-3 imgList" src={venta.productos[0].producto.images[0]} alt='imagen'/>
                       <div className="media-body">
                           <h6 className="mt-0"> {venta.productos[0].producto.nombre[0].toUpperCase() +venta.productos[0].producto.nombre.slice(1) }</h6>
                           <p className="card-text">Comprador: {venta.comprador.nombre}</p>
                           <p className="card-text">Total: ${venta.total}</p>
                           <div className="rating-p">
                               <Rating name="read-only" value={venta.productos[0].producto.promedio} readOnly/>
                           </div>

                           <button type="button" className="btn btn-outline btn-list"
                                   onClick={(e) => this.facturaCompra(venta._id, e)}><FaIcons.FaFileInvoice/></button>

                            <div className="hiddenDiv">
                               {venta.estado=="pendientepago"?
                                   this.state.pago.push(
                                       <div>
                                           <label className="lbl-q">Confirmar pago</label>
                                           <input type="checkbox" className="inpt-q" onChange={(e)=>this.confirmarPago(venta._id,e)}/>
                                       </div>)
                                   :
                                   this.state.pago.push(<div></div>)}
                            </div>

                           <div>
                               {this.state.pago[index]}
                           </div>

                           <div className="card-footer">
                               <small
                                   className="text-muted">Subido {moment(venta.date).format('DD/MM/YYYY')} </small>
                           </div>

                       </div>

                   </div>

               ))
           })
       }else {
           this.setState({
               Content: <div>
                   <h4 className="noProduct">No has vendido productos.</h4>
               </div>
           })
       }
    }

    render() {
            if(localStorage.getItem("facturaID")){
                return (
                    <Redirect to="facturav"/>
                )
            }else if (localStorage.getItem("productID")) {
                return (
                    <Redirect to="product"/>
                )
            } else {
                return (
                    <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <DashNav/>
                        </Grid>


                        <Grid item xs={12}>
                            {this.state.Content}
                        </Grid>


                    </Grid>
                )
            }

    }

}

export default MisVentas