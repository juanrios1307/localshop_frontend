import React,{Component} from 'react';
import '../assets/css/CreateAdvertisements.css'
import DashNav from "../components/DashNav";
import Axios from "axios";
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";
import UPLD from '../assets/images/upldimg.png'

class ActulizarProducto extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nombre:'',
            precio:'',
            descripcion:'',
            categoria:'',
            images:'',
            imagenFile:[],
            bool:false,
            c1:[],
            c2:[],
        }

        this.signupanunce = this.signupanunce.bind(this);
        this.files=this.files.bind(this);
        this.getUpload = this.getUpload.bind(this);

        for(var i=0;i<5;i++){
            this.state.c1.push(UPLD)
            this.state.c2.push(UPLD)
        }

    }

    componentDidMount() {
        this.getUpload()
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

    getUpload(){

        /*  for(var i=0;i<5;i++){
              this.state.c1.push(UPLD)
              this.state.c2.push(UPLD)
          }*/
    }

    files(files){
        for(var i=0;i<files.length;i++){
            this.state.imagenFile.push(files[i])
        }

        if(this.state.imagenFile.length>5 && this.state.imagenFile.length<=10){
            for(var i=0;i<5;i++){
                this.state.c1.pop()
                this.state.c1.unshift(this.state.imagenFile[i])
            }

            for(var i=5;i<this.state.imagenFile.length;i++){
                this.state.c2.pop()
                this.state.c2.unshift(this.state.imagenFile[i])
            }

        }else if(this.state.imagenFile.length<=5){
            for(var i=0;i<this.state.imagenFile.length;i++){
                this.state.c1.pop()
                this.state.c1.unshift(this.state.imagenFile[i])
            }

        }else if(this.state.imagenFile.length>10){

            for(var i=0;i<5;i++){
                this.state.c1.pop()
                this.state.c1.unshift(this.state.imagenFile[i])
            }

            for(var i=5;i<10;i++){
                this.state.c2.pop()
                this.state.c2.unshift(this.state.imagenFile[i])
            }
        }



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
                        <h8>Actualiza tu Anuncio</h8>
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
                            <div className="f-g">
                                <label htmlFor="budget">Unidades disponibles: </label>
                                <input type="number" name="quantity" required
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
                                            <img src={this.state.c1[0]}/>
                                            <img src={this.state.c1[1]}/>
                                            <img src={this.state.c1[2]}/>
                                            <img src={this.state.c1[3]}/>
                                            <img src={this.state.c1[4]}/>

                                        </div>
                                        <div className="imginserted">
                                            <img src={this.state.c2[0]}/>
                                            <img src={this.state.c2[1]}/>
                                            <img src={this.state.c2[2]}/>
                                            <img src={this.state.c2[3]}/>
                                            <img src={this.state.c2[4]}/>
                                        </div>
                                    </div>
                                    <div className="inpt">
                                        <input type="file" name="imagen" placeholder="imagen" required multiple
                                               onChange={(e) => this.files(e.target.files)} />
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset className="ft">
                                <button type="submit" className="btn">
                                    Actualizar
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
export default ActulizarProducto;