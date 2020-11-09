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
            images:'',
            imagenFile:'',
            bool:false
        }

        this.signupanunce = this.signupanunce.bind(this);

    }




    async signupanunce(e) {
        e.preventDefault()

        const token = localStorage.getItem("token")

        //const url='https://radiant-castle-07024.herokuapp.com/api/producto'
        const url='http://localhost:5000/api/producto'


        var images=[]

        const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/localshop/image/upload';
        const UPLOAD_PRESET = 'y1b3maos';

        const formImages = new FormData();

        for(var i=0;i<this.state.imagenFile.length;i++){

            formImages.append('file', this.state.imagenFile[i]);
            formImages.append('upload_preset', UPLOAD_PRESET);
            const resI = await Axios.post(CLOUDINARY_URL, formImages);

            images.push(resI.data.secure_url)
        }


        try {

            this.setState({images:images});


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
            return <Redirect to='/misproductos'/>
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
                                <label htmlFor="name">Nombre del producto: </label>
                                <input type="text" name="name" required
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
                                <label htmlFor="city">Categoria: </label>
                                <select className="dropdown-toggle"  onChange={(e) => this.setState({categoria: e.target.value})} >
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