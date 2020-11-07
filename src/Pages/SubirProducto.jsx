import React,{Component} from 'react';
import '../assets/css/CreateAdvertisements.css'
import DashNav from "../components/DashNav";
import Axios from "axios";
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";
import UPLD from '../assets/images/upldimg.png'

class SubirProducto extends Component {

    constructor(props) {
        super(props);

        this.state = {
            titulo :'',
            especificaciones:'',
            presupuesto:'',
            profesion:'',
            ciudad:'',
            imagen:'',
            imagenFile:'',
            bool:false
        }

        this.signupanunce = this.signupanunce.bind(this);

    }




    async signupanunce(e) {
        e.preventDefault()

        const token = localStorage.getItem("token")

        //const url='https://peaceful-ridge-86113.herokuapp.com/api/anunceswork'
        const url='http://localhost:5000/api/anunceswork'

        const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/eia/image/upload';
        const UPLOAD_PRESET = 't2rsbe8l';


        const formImages = new FormData();
        formImages.append('file', this.state.imagenFile);
        formImages.append('upload_preset', UPLOAD_PRESET);


        try {
            const resI = await Axios.post(CLOUDINARY_URL, formImages);
            this.setState({imagen:resI.data.secure_url});


        } catch (err) {
            console.error(err);
        }

        var config = {
            method: 'post',
            url: url,
            headers: {
                'access-token': token
            },
            data: this.state
        };

        const response=await Axios(config)

        const mensaje = response.data.data


        console.log(mensaje)
        Swal.fire({
            title: mensaje
        })

        this.setState({bool:true})

    }


    render() {
        if (this.state.bool) {
            return <Redirect to='/misanuncios'/>
        } else {
            return (
                <div>
                    <div>
                        <DashNav/>
                    </div>

                    <div className='TittleAN'>
                        <h8>Crea tu Anuncio</h8>
                        <hr/>
                    </div>
                    <div className='TittleIN'>
                        <h10>Información del producto</h10>
                    </div>
                    <div className="formato">
                        <form className="form" onSubmit={this.signupanunce}>
                            <div className="f-g">
                                <label htmlFor="title">Nombre del producto: </label>
                                <input type="text" name="username" required
                                       value={this.state.nombre}
                                       onChange={(e) => this.setState({nombre: e.target.value})}/>
                            </div>
                            <div className="f-g">
                                <label htmlFor="Description">Descripción: </label>
                                <input type="text" name="Description" required
                                       value={this.state.descripcion}
                                       onChange={(e) => this.setState({descripcion: e.target.value})}/>
                            </div>
                            <div className="f-g">
                                <label htmlFor="budget">Precio x Unidad: </label>
                                <input type="number" name="Price" required
                                       value={this.state.precio}
                                       onChange={(e) => this.setState({precio: e.target.value})}/>
                            </div>
                            <div className='TittleIN'>
                            </div>
                            <div className="f-g">
                                <label htmlFor="city" onChange={(e) => this.setState({categoria: e.target.value})}>Categoria: </label>
                                <select className="dropdown-toggle" >
                                    <option  value="comida" >Comida</option>
                                    <option  value="moda" >Moda</option>
                                    <option  value="tecnologia" >Tecnología</option>
                                    <option  value="vehiculos" >Vehículos</option>
                                    <option  value="intrumentos musicales" >Instrumentos Musicales</option>
                                    <option  value="deporte" >Deporte</option>
                                </select>
                            </div>
                            <hr/>
                            <div className="f-g">
                                <label htmlFor="username">Imagenes del producto:</label>
                            </div>
                            <fieldset>
                                <div className="imginput">
                                    <div className="imgs">
                                        <div className="imginserted">
                                            <img src={UPLD}/>
                                            <img src={UPLD}/>
                                            <img src={UPLD}/>
                                            <img src={UPLD}/>
                                            <img src={UPLD}/>
                                        </div>
                                        <div className="imginserted">
                                            <img src={UPLD}/>
                                            <img src={UPLD}/>
                                            <img src={UPLD}/>
                                            <img src={UPLD}/>
                                            <img src={UPLD}/>
                                        </div>
                                    </div>
                                    <div className="inpt">
                                        <input type="file" name="imagen" placeholder="imagen" required multiple
                                               onChange={(e) => this.setState({imagenFile: e.target.files})}/>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset className="ft">
                                <button type="submit" className="btn">
                                    Publicar
                                </button>
                            </fieldset>
                        </form>
                    </div>
                    <hr/>

                </div>
            );
        }
    }
}
export default SubirProducto;