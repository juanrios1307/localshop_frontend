import React from "react";
import Axios from "axios";
import '../assets/css/Listas.css';
import NavBar from "../components/NavBar";
import DashNav from "../components/DashNav";
import * as AiIcons from "react-icons/ai/index";
import * as FaIcons from "react-icons/fa/index";
import {Link, Redirect} from "react-router-dom";
import Swal from "sweetalert2";
import Rating from "@material-ui/lab/Rating";
import moment from "moment";

class ProductosBuscados extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Content: '',
            Ciudades: '',
            Categorias: '',

            producto:'',
            ciudad:'',
            categoria:'',
            promedio:'true',
            date:'true',
            precio:'true'
        };
        this.getData = this.getData.bind(this);
        this.getCategorias = this.getCategorias.bind(this);
        this.getCiudades = this.getCiudades.bind(this);
        this.getContent=this.getContent.bind(this)

        this.getFiltroCiudad = this.getFiltroCiudad.bind(this);
        this.getFiltroCategoria = this.getFiltroCategoria.bind(this);
        this.getFiltroPromedio = this.getFiltroPromedio.bind(this);
        this.getFiltroFecha = this.getFiltroFecha.bind(this);
        this.getFiltroPrecio = this.getFiltroPrecio.bind(this);


        this.savePub=this.savePub.bind(this);
        this.specificProduct=this.specificProduct.bind(this);
        this.crearChat=this.crearChat.bind(this);
    }

    componentDidMount() {
        this.getData();
        this.getCiudades();
        this.getCategorias();
    }

    async savePub(Save,e){
        e.preventDefault()
        const token=localStorage.getItem("token")


        if(token && token!==undefined){

            //const url = ''https://radiant-castle-07024.herokuapp.com/api/saving'
            const url = 'http://localhost:5000/api/saving'

            const config = {
                method: 'put',
                url: url ,
                headers: {
                    'access-token': token
                },
                data: {
                    "Save":Save,
                    "cantidad":1
                }
            };

            var response = await Axios(config);

            Swal.fire({
                title: response.data.data
            })

        }else{
            Swal.fire({
                title: "Por favor registrese antes de continuar"
            })

        }
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

        this.state.producto = localStorage.getItem("productoAux")
        this.setState({producto:localStorage.getItem("productoAux")})

        localStorage.removeItem("producto")

        //const url = 'https://radiant-castle-07024.herokuapp.com/api/main/'
        const url = 'http://localhost:5000/api/main/'

        const config = {
            method: 'get',
            url: url,
            headers: {
                'producto': this.state.producto,
                'promedio':this.state.promedio,
                'fecha':this.state.date,
                'precio':this.state.precio
            }
        };



       var response=await Axios(config);

       var data = response.data.data;

       this.getContent(data)

    }

    getContent(data){
        if(data.length>0) {
            this.setState({
                Content: data.map((producto) => (
                    <div className="media" key={producto._id}>
                        <img className="mr-3 imgList" src={producto.images[0]} alt='imagen'/>
                        <div className="media-body">
                            <h6 className="mt-0">{producto.nombre[0].toUpperCase() + producto.nombre.slice(1)}</h6>
                            <p className="card-text">{producto.categoria}</p>
                            <p className="card-text">Precio: ${producto.precio}</p>
                            <p className="card-text">Vendedor: {producto.user.nombre}</p>
                            <div className="rating-p">
                                <Rating name="read-only" value={producto.promedio} readOnly/>
                            </div>

                            <button type="button" className="btn btn-outline btn-list"
                                    onClick={(e) => this.crearChat(producto._id, e)}><AiIcons.AiFillMessage/></button>
                            <button type="button" className="btn btn-outline btn-list"
                                    onClick={(e) => this.specificProduct(producto._id)}><AiIcons.AiFillEye/></button>
                            <button type="button" className="btn btn-outline btn-list"
                                    onClick={(e) => this.savePub(producto._id, e)}><FaIcons.FaShoppingCart/></button>
                        </div>

                    </div>

                ))
            })
        }else{
            this.setState({
                Content: <div>
                    <h4 className="noProduct">Lo sentimos, no tenemos productos para mostrarte.</h4>
                    <h5 className="noProduct">Intenta una nueva busqueda !! </h5>
                </div>
            })
        }
    }

    async getCiudades(){
        //const url = 'https://radiant-castle-07024.herokuapp.com/api/filters/ciudad'
        const url = 'http://localhost:5000/api/filters/ciudad'

        const config = {
            method: 'get',
            url: url,
            headers: {
            }
        };


        var response=await Axios(config);

        var data = response.data.data;

        this.setState({
            Ciudades: data.map((ciudad) => (
                <option  value={ciudad} >{ciudad}</option>
            ))
        })
    }

    async getCategorias(){

        //const url = 'https://radiant-castle-07024.herokuapp.com/api/filters/categoria'
        const url = 'http://localhost:5000/api/filters/categoria'

        const config = {
            method: 'get',
            url: url,
            headers: {
            }
        };


        var response=await Axios(config);

        var data = response.data.data;

        this.setState({
            Categorias: data.map((categoria) => (
                <option  value={categoria} >{categoria}</option>
            ))
        })

    }

    async getFiltroCiudad(ciudad){

        this.state.ciudad=ciudad
        this.setState({ciudad:ciudad})

        //const url = 'https://radiant-castle-07024.herokuapp.com/api/filters/'
        const url = 'http://localhost:5000/api/filters/'

        const config = {
            method: 'get',
            url: url,
            headers: {
                'producto':  this.state.producto,
                'ciudad': this.state.ciudad,
                'categoria':this.state.categoria,
                'promedio':this.state.promedio,
                'fecha':this.state.date,
                'precio':this.state.precio
            }
        };


        var response=await Axios(config);

        var data = response.data.data;

        this.getContent(data)
    }

    async getFiltroCategoria(categoria){

        this.state.categoria=categoria
        this.setState({categoria:categoria})

        //const url = 'https://radiant-castle-07024.herokuapp.com/api/filters/'
        const url = 'http://localhost:5000/api/filters/'

        const config = {
            method: 'get',
            url: url,
            headers: {
                'producto':  this.state.producto,
                'ciudad': this.state.ciudad,
                'categoria':this.state.categoria,
                'promedio':this.state.promedio,
                'fecha':this.state.date,
                'precio':this.state.precio
            }
        };


        var response=await Axios(config);

        var data = response.data.data;

        this.getContent(data)
    }

    async getFiltroPrecio(precio){

        this.state.precio=precio
        this.setState({precio:precio})

        //const url = https://radiant-castle-07024.herokuapp.com/api/filters/precio'
        const url = 'http://localhost:5000/api/filters/precio'

        const config = {
            method: 'get',
            url: url,
            headers: {
                'producto':  this.state.producto,
                'ciudad': this.state.ciudad,
                'categoria':this.state.categoria,
                'promedio':this.state.promedio,
                'fecha':this.state.date,
                'precio':this.state.precio
            }
        };


        var response=await Axios(config);

        var data = response.data.data;

        this.getContent(data)
    }

    async getFiltroFecha(date){

        this.state.date=date
        this.setState({date:date})

        //const url = https://radiant-castle-07024.herokuapp.com/api/filters/fecha'
        const url = 'http://localhost:5000/api/filters/fecha'

        const config = {
            method: 'get',
            url: url,
            headers: {
                'producto':  this.state.producto,
                'ciudad': this.state.ciudad,
                'categoria':this.state.categoria,
                'promedio':this.state.promedio,
                'fecha':this.state.date,
                'precio':this.state.precio
            }
        };


        var response=await Axios(config);

        var data = response.data.data;

        this.getContent(data)
    }

    async getFiltroPromedio(promedio){

        this.state.promedio=promedio
        this.setState({promedio:promedio})

        //const url = https://radiant-castle-07024.herokuapp.com/api/filters/'
        const url = 'http://localhost:5000/api/filters/'

        const config = {
            method: 'get',
            url: url,
            headers: {
                'producto':  this.state.producto,
                'ciudad': this.state.ciudad,
                'categoria':this.state.categoria,
                'promedio':this.state.promedio,
                'fecha':this.state.date,
                'precio':this.state.precio
            }
        };


        var response=await Axios(config);

        var data = response.data.data;

        this.getContent(data)
    }

    render() {
        if (localStorage.getItem("productIDChat")) {
            return (
                <Redirect to="/chat"/>
            )
        } else {

            if (localStorage.getItem("token")) {
                if (localStorage.getItem("productID")) {
                    return (
                        <Redirect to="product"/>
                    )
                } else {

                    return (
                        <div>

                            <div item xs={12}>
                                <DashNav/>
                            </div>

                            <div className="sort">
                                <h8>Filtrar por</h8>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Valoración</label>
                                    <select className="form-control" onChange={(e) => this.getFiltroPromedio(e.target.value)} >
                                        <option  value="true" >Mayor - Menor</option>
                                        <option  value="false" >Menor - Mayor</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Fecha</label>
                                    <select className="form-control" onChange={(e) => this.getFiltroFecha(e.target.value)} >
                                        <option  value="false"  >Reciente - Antiguo</option>
                                        <option  value="true" >Antiguo - Reciente</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Precio</label>
                                    <select className="form-control" onChange={(e) => this.getFiltroPrecio(e.target.value)} >
                                        <option  value="true" >Mayor - Menor</option>
                                        <option  value="false" >Menor - Mayor</option>
                                    </select>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Categorias</label>
                                    <select className="form-control" onChange={(e) => this.getFiltroCategoria(e.target.value)} >
                                        <option value=" ">Todos</option>
                                        {this.state.Categorias}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Ciudad</label>
                                    <select className="form-control" onChange={(e) => this.getFiltroCiudad(e.target.value)} >
                                        <option value=" ">Todos</option>
                                        {this.state.Ciudades}
                                    </select>
                                </div>

                            </div>

                                <div item xs={12}>
                                {this.state.Content}
                            </div>

                        </div>
                    )
                }
            } else {
                if (localStorage.getItem("productID")) {
                    return (
                        <Redirect to="product"/>
                    )
                } else {
                    return (
                        <div>

                            <div item xs={12}>
                                <NavBar/>
                            </div>
                            <div className="sort">
                                <h8>Filtrar por</h8>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Valoración</label>
                                    <select className="form-control" onChange={(e) => this.getFiltroPromedio(e.target.value)} >
                                        <option  value="true" >Mayor - Menor</option>
                                        <option  value="false" >Menor - Mayor</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Fecha</label>
                                    <select className="form-control" onChange={(e) => this.getFiltroFecha(e.target.value)} >
                                        <option  value="true"  >Reciente - Antiguo</option>
                                        <option  value="false" >Antiguo - Reciente</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Precio</label>
                                    <select className="form-control" onChange={(e) => this.getFiltroPrecio(e.target.value)} >
                                        <option  value="true" >Mayor - Menor</option>
                                        <option  value="false" >Menor - Mayor</option>
                                    </select>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Categorias</label>
                                    <select className="form-control" onChange={(e) => this.getFiltroCategoria(e.target.value)} >
                                        <option value=" ">Todos</option>
                                        {this.state.Categorias}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Ciudad</label>
                                    <select className="form-control" onChange={(e) => this.getFiltroCiudad(e.target.value)} >
                                        <option value=" ">Todos</option>
                                        {this.state.Ciudades}
                                    </select>
                                </div>

                            </div>

                            <div item xs={12}>
                                {this.state.Content}
                            </div>

                        </div>
                    )
                }
            }
        }
        ;
    }
}

export default ProductosBuscados