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

class MisProductos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Content: ''
        };
        this.getData = this.getData.bind(this);
        this.deleteAnuncio = this.deleteAnuncio.bind(this);
        this.specificProduct=this.specificProduct.bind(this);
        this.editAnuncio=this.editAnuncio.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async editAnuncio(id,e){

        localStorage.setItem("editID",id)
        window.location.reload()
    }

    async deleteAnuncio(id, e) {
        e.preventDefault()
        const token = localStorage.getItem("token")

        //const url = 'https://radiant-castle-07024.herokuapp.com/api/producto/'
        const url = 'http://localhost:5000/api/producto/'

        console.log(url + id)

        const config = {
            method: 'delete',
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

    async getData() {

        const token = localStorage.getItem("token")

        //const url = 'https://radiant-castle-07024.herokuapp.com/api/producto/'
        const url = 'http://localhost:5000/api/producto'

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
                                   onClick={(e) => this.editAnuncio(producto._id, e)}>
                               <AiIcons.AiFillEdit/>
                           </button>


                           <button type="button" className="btn btn-outline btn-list"
                                   onClick={(e) => this.deleteAnuncio(producto._id, e)}><AiIcons.AiFillDelete/></button>
                           <button type="button" className="btn btn-outline btn-list"
                                   onClick={(e) => this.specificProduct(producto._id)}><AiIcons.AiFillEye/></button>

                           <div className="card-footer">
                               <small
                                   className="text-muted">Subido {moment(producto.date).format('DD/MM/YYYY')} </small>
                           </div>

                       </div>

                   </div>

               ))
           })
       }else {
           this.setState({
               Content: <div>
                   <h4 className="noProduct">No tienes productos.</h4>
                   <h5 className="noProduct">Crealos desde el botón.</h5>
               </div>
           })
       }
    }

    render() {
        if (localStorage.getItem("editID")) {
            return(
                <Redirect to="/editAnunce" />
                )

        } else {
            if (localStorage.getItem("productID")) {
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

                        <Grid item xs={12} className='dashButtonDiv'>
                            <a href='/createProduct'>
                                <button className='buttonDash'>
                                    Publicar Productos
                                </button>
                            </a>
                        </Grid>


                    </Grid>
                )
            }
            ;
        }
    }

}

export default MisProductos