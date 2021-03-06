import React,{Component} from 'react';
import '../assets/css/ProductoEspecifico.css';
import Rating from '@material-ui/lab/Rating';
import DashNav from "../components/DashNav";
import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa/index";
import Axios from "axios";
import Swal from "sweetalert2";
import Comentario from "../components/Comentario";
import {Redirect} from "react-router-dom";
import slide1 from "../assets/images/Slide1.png";
import slide3 from "../assets/images/Slide3.png";
import slide4 from "../assets/images/Slide4.png";
import slide5 from "../assets/images/Slide5.png";

class ProductoEspecifico extends Component {

    constructor(props) {
        super(props);
        this.state = {


            id:'',
            nombre:'',
            categoria:'',
            precio:'',
            stock:'',
            especificaciones:'',
            vendedor:'',
            ciudad:'',
            promedio:'',

            correo:'',
            telefono:'',

            images:'',
            imagen:'',
            carrusel:'',


            comment:'',
            rating:'',

            asunto:'',
            mensaje:''
        };
        this.getData = this.getData.bind(this);
        this.savePub=this.savePub.bind(this);
        this.comment=this.comment.bind(this);
        this.sendMessage=this.sendMessage.bind(this);
        this.crearChat=this.crearChat.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData(){
        this.state.id=localStorage.getItem("productIDAux")

        localStorage.removeItem("productID")

        if(this.state.id) {

            //const url =  'https://radiant-castle-07024.herokuapp.com/api/main/'
            const url = 'http://localhost:5000/api/main/'


            const config = {
                method: 'get',
                url: url,
                headers: {
                    "id": this.state.id
                }
            };

            const res = await Axios(config);

            const data = res.data.data;


            this.setState({nombre: data.nombre});
            this.setState({categoria: data.categoria});
            this.setState({precio: data.precio});
            this.setState({descripcion: data.descripcion});
            this.setState({vendedor: data.user.nombre});
            this.setState({promedio: data.promedio});
            this.setState({rating: data.promedio});

            this.setState({images: data.images});
            this.setState({imagen: data.images[0]});

            this.setState({ciudad: data.user.ciudad});
            this.setState({telefono: data.user.telefono});
            this.setState({correo: data.user.correo});

            this.setState({
                carrusel:data.images.map((imagen,index)=> (
                    <div className={index==0?"carousel-item active":"carousel-item"}>
                        <img src={imagen}  className="d-block w-100" alt="imagen de publicacion"/>
                    </div>

                    ))
            })



        }
    }

    async comment(e){
        e.preventDefault()


        const  token=localStorage.getItem("token")
        if(token && !token!=undefined){

            //const url =  'https://radiant-castle-07024.herokuapp.com/api/rate/'+this.state.id
            const url = 'http://localhost:5000/api/rate/'+this.state.id

            var config = {
                method: 'put',
                url: url,
                headers: {
                    'access-token': token,
                    'Content-Type': 'application/json'
                },
                data : {
                    "comment" : this.state.comment,
                    "rating" : this.state.rating
                }
            };

            const res = await Axios(config);

            const data = res.data.data;

            Swal.fire({
                title: data
            })

            window.location.reload()

        }else{
            Swal.fire({
                title: "Por favor registrese antes de continuar"
            })
        }
    }

    async savePub(Save,e){
        e.preventDefault()
        const token=localStorage.getItem("token")


        if(token && !token!=undefined){

            //const url =  'https://radiant-castle-07024.herokuapp.com/api/saving'
            const url = 'http://localhost:5000/api/saving'

            console.log(Save)

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

    async sendMessage(e){
        e.preventDefault()

        const  token=localStorage.getItem("token")
        if(token && !token!=undefined){

            //const url = 'https://radiant-castle-07024.herokuapp.com/api/contact/'+this.state.id
            const url = 'http://localhost:5000/api/contact/'+this.state.id

            var config = {
                method: 'post',
                url: url,
                headers: {
                    'access-token': token,
                    'Content-Type': 'application/json'
                },
                data : {
                    "asunto":this.state.asunto,
                    "mensaje":this.state.mensaje,

                }
            };

            const res = await Axios(config);

            const data = res.data.data;

            Swal.fire({
                title: data
            })


        }else{
            Swal.fire({
                title: "Por favor registrese antes de continuar"
            })
        }

    }

    crearChat(id,e){
        e.preventDefault()
        if(localStorage.getItem("token")) {
            localStorage.setItem("productIDChat", id)

            window.location.reload();
        }else{
            Swal.fire({
                icon: 'info',
                title: "Por favor registrese antes de continuar"
            })
        }
    }

    render() {
        if(localStorage.getItem("productIDChat")) {
            return (
                <Redirect to="chat"/>
            )
        }else {
                if (localStorage.getItem("token")) {
                    return (
                        <div className="allcontainer">
                            <DashNav/>
                            <div className="boxcontainer">
                                <div className="imgbox">
                                    <div id="carouselExampleControls" className="carousel slidess" data-ride="carousel">
                                        <div className="carousel-inner">
                                            {this.state.carrusel}
                                        </div>
                                        <a className="carousel-control-prev an" href="#carouselExampleControls"
                                           role="button" data-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a className="carousel-control-next an" href="#carouselExampleControls"
                                           role="button" data-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="inforbox">

                                    <div className="infoespec">
                                        <h8>{this.state.nombre}</h8>
                                        <hr/>
                                        <p>Categoria: {this.state.categoria}</p>
                                        <p>Precio: {this.state.precio}</p>
                                        <p>Descripcion: {this.state.descripcion}</p>
                                        <p>Vendedor: {this.state.vendedor}</p>
                                        <p>Ciudad: {this.state.ciudad}</p>
                                        <p >
                                            <Rating name="read-only" precision={0.5} value= {this.state.promedio} readOnly/>
                                        </p>
                                    </div>
                                    <div className="botnutl">
                                        <div className="btnsaesp">
                                            <button type="button" className="btn btn-outline btn-list"
                                                    onClick={(e) => this.crearChat(this.state.id, e)}>
                                                <AiIcons.AiFillMessage/>
                                            </button>
                                            <button type="button" className="btn btn-outline btn-list"
                                                    onClick={(e) => this.savePub(this.state.id, e)}>
                                                <FaIcons.FaShoppingCart/></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="coments-container">
                                <div className="comentbox">
                                    <div className="txtcoment">Comentarios y Valoraciones</div>
                                    <div className="comenta">
                                        <form onSubmit={this.comment}>
                                            <div className="rating">
                                                <Rating name="simple-controlled" className="stars" value={this.state.rating}
                                                        onChange={e => this.setState({rating: e.target.value})}/></div>
                                            <input type="text" required
                                                   onChange={e => this.setState({comment: e.target.value})}/>
                                            <button type="submit">Guardar</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="coments">
                                    <ul>
                                        <Comentario id={localStorage.getItem("productIDAux")}/>
                                    </ul>
                                </div>
                            </div>
                            <div className="contactbox">
                                <div className="contactbox-title">
                                    <h10>Contacto</h10>
                                </div>
                                <p>Teléfono: {this.state.telefono}</p>
                                <p>Correo: {this.state.correo}</p>
                                <form onSubmit={this.sendMessage}>
                                    <label>Asunto:</label>
                                    <input type="text" required onChange={e => this.setState({asunto: e.target.value})}/>
                                    <label>Mensaje:</label>
                                    <input type="text" required onChange={e => this.setState({mensaje: e.target.value})}/>
                                    <button type="submit">Enviar</button>
                                </form>
                            </div>

                            <Footer/>
                        </div>
                    );
                } else {
                    return (
                        <div className="allcontainer">
                            <NavBar/>
                            <div className="boxcontainer">
                                <div className="imgbox">
                                    <div id="carouselExampleControls" className="carousel slidess" data-ride="carousel">
                                        <div className="carousel-inner">
                                            {this.state.carrusel}
                                        </div>
                                        <a className="carousel-control-prev an" href="#carouselExampleControls"
                                           role="button" data-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a className="carousel-control-next an" href="#carouselExampleControls"
                                           role="button" data-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="inforbox">

                                    <div className="infoespec">
                                        <h8>{this.state.nombre}</h8>
                                        <hr/>
                                        <p>Categoria: {this.state.categoria}</p>
                                        <p>Precio: {this.state.precio}</p>
                                        <p>Descripcion: {this.state.descripcion}</p>
                                        <p>Vendedor: {this.state.vendedor}</p>
                                        <p>Ciudad: {this.state.ciudad}</p>
                                        <p >
                                            <Rating name="read-only" precision={0.5} value= {this.state.promedio} readOnly/>
                                        </p>
                                    </div>
                                    <div className="botnutl">
                                        <div className="btnsaesp">
                                            <button type="button" className="btn btn-outline btn-list"
                                                    onClick={(e) => this.crearChat(this.state.id, e)}>
                                                <AiIcons.AiFillMessage/>
                                            </button>
                                            <button type="button" className="btn btn-outline btn-list"
                                                    onClick={(e) => this.savePub(this.state.id, e)}>
                                                <FaIcons.FaShoppingCart/></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="coments-container">
                                <div className="comentbox">
                                    <div className="txtcoment">Comentarios y Valoraciones</div>
                                    <div className="comenta">
                                        <form onSubmit={this.comment}>
                                            <div className="rating">
                                                <Rating name="simple-controlled" className="stars" value={this.state.rating}
                                                        onChange={e => this.setState({rating: e.target.value})}/></div>
                                            <input type="text" required
                                                   onChange={e => this.setState({comment: e.target.value})}/>
                                            <button type="submit">Guardar</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="coments">
                                    <ul>
                                        <Comentario id={localStorage.getItem("productIDAux")}/>
                                    </ul>
                                </div>
                            </div>
                            <div className="contactbox">
                                <div className="contactbox-title">
                                    <h10>Contacto</h10>
                                </div>
                                <p>Teléfono: {this.state.telefono}</p>
                                <p>Correo: {this.state.correo}</p>
                                <form onSubmit={this.sendMessage}>
                                    <label>Asunto:</label>
                                    <input type="text" required onChange={e => this.setState({asunto: e.target.value})}/>
                                    <label>Mensaje:</label>
                                    <input type="text" required onChange={e => this.setState({mensaje: e.target.value})}/>
                                    <button type="submit">Enviar</button>
                                </form>
                            </div>

                            <Footer/>
                        </div>
                    );
                }
            }
        }
    }
export default ProductoEspecifico;