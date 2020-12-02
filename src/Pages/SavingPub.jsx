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
            pago:'',
            cantidad:1,
            comprar:false,
            boolC:false
        };
        this.getData = this.getData.bind(this);
        this.deletePub = this.deletePub.bind(this);
        this.specificProduct=this.specificProduct.bind(this);
        this.crearChat=this.crearChat.bind(this);
        this.comprar=this.comprar.bind(this);
        this.actualizarCantidad=this.actualizarCantidad.bind(this);


    }

    componentDidMount() {
        this.getData();

        localStorage.removeItem("boolAux")
        localStorage.removeItem("productSAux")
        localStorage.removeItem("cantidadSAux")

    }

    async comprar(id,cantidad, e) {
        e.preventDefault()

        localStorage.setItem("productS",id)
        localStorage.setItem("productSAux",id)

        localStorage.setItem("cantidadSAux",cantidad)
        localStorage.setItem("cantidadS",cantidad)

        this.setState({bool:true})


    }

    comprarTodo(e) {
        e.preventDefault()

        if(this.state.boolC == true){
            localStorage.setItem("bool","true")
            localStorage.setItem("boolAux","true")

            this.setState({bool:true})
        }else{
            Swal.fire({
                title: "Debes agregar productos a tu carrito para comprarlos"
            })
        }

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
           this.setState({boolC:true})

           this.setState({

               Content: data.map((producto,index) => (
                   <div className="media" key={producto._id}>
                       <img className="mr-3 imgList" src={producto.images[0]} alt='imagen'/>
                       <div className="media-body">
                           <h6 className="mt-0"> {producto.nombre[0].toUpperCase() + producto.nombre.slice(1)}</h6>
                           <p className="card-text">{producto.categoria}</p>
                           <p className="card-text">Precio: ${producto.precio}</p>
                           <p className="card-text">Vendedor: {producto.user.nombre}</p>
                           <div className="rating-p">
                               <Rating name="read-only" value={producto.promedio} readOnly/>
                           </div>

                           <button type="button" className="btn btn-outline btn-list"
                                   onClick={(e) => this.comprar(producto._id,cantidades[index], e)}><AiIcons.AiFillDollarCircle/></button>
                           <button type="button" className="btn btn-outline btn-list"
                                   onClick={(e) => this.crearChat(producto._id, e)}><AiIcons.AiFillMessage/></button>
                           <button type="button" className="btn btn-outline btn-list"
                                   onClick={(e) => this.specificProduct(producto._id)}><AiIcons.AiFillEye/></button>
                           <button type="button" className="btn btn-outline btn-list"
                                   onClick={(e) => this.deletePub(producto._id, e)}><AiIcons.AiFillDelete/></button>
                           <form onSubmit={(e)=>this.actualizarCantidad(producto._id,this.state.cantidad,e)}>
                               <label className="lbl-q">Cantidad</label>
                               <input type="number" className="inpt-q" placeholder={cantidades[index]}
                                      required min="1" max={producto.stock}
                                      onChange={(e)=>this.setState({cantidad:e.target.value})}/>
                               <button type="submit" className="btn btn-outline btn-list" >Actualizar cantidad</button>
                           </form>
                           <div className="card-footer">
                               <small className="text-muted">Last updated 3 mins ago</small>
                           </div>
                       </div>

                   </div>

               ))
           })
       }else{
           this.setState({boolC:false})

           this.setState({
               Content: <div>
                   <h4 className="noProduct">No tienes productos guardados.</h4>
               </div>
           })
       }

    }

    render() {
        if(this.state.bool==true){
          return(
              <Redirect to="infopurchases" />
          )
        } else if(localStorage.getItem("productIDChat")){
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
                        <button className="btn-pgr"  onClick={(e) => this.comprarTodo(e)}>Pagar todo</button>
                    </Grid>

                    <Grid item xs={12}>
                        {this.state.Content}
                    </Grid>


                </Grid>
            )
        };
    }


}

export default SavingPub;