import React,{Component} from 'react';
import '../assets/css/CreateAdvertisements.css'
import DashNav from "../components/DashNav";
import Axios from "axios";
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";
import UPLD from '../assets/images/upldimg.png'

class ActualizarProducto extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bool:false,
            id:'',

            nombre:'',
            precio:'',
            stock:'',
            descripcion:'',
            categoria:'',
            images:'',
            imagenFile:[],

            nombreA:'',
            precioA:'',
            stockA:'',
            descripcionA:'',
            categoriaA:'',
            imagesA:'',
            imagenFileA:[],

            c1:[],
            c2:[],
        }

        this.files=this.files.bind(this);

        this.getData = this.getData.bind(this);
        this.actualizar = this.actualizar.bind(this);


    }



    componentDidMount() {
        this.getData()
    }



    async getData(){

        //const url = 'https://radiant-castle-07024.herokuapp.com/api/producto/'
        const url = 'http://localhost:5000/api/producto/'

        const token = localStorage.getItem("token")
        const id=localStorage.getItem("editIDAux")
        localStorage.removeItem("editID")

        this.setState({id:id})

        const config = {
            method: 'get',
            url: url+id,
            headers: {
                'access-token': token
            }
        };

        const res = await Axios(config);

        const data = res.data.data;

        console.log(JSON.stringify(data))

        this.setState({nombreA:data.nombre});
        this.setState({precioA:data.precio})
        this.setState({stockA:data.stock})
        this.setState({descripcionA:data.descripcion})
        this.setState({categoriaA:data.categoria})
        this.setState({imagesA:data.images})

        if(data.images.length>=5 && data.images.length<=10){

            for(var i=0;i<5;i++){
                this.state.c1.push(data.images[i])
            }

            for(var i=5;i<data.images.length;i++){
                this.state.c2.push(data.images[i])
            }

        }else if(data.images.length<5){

            for(var i=0;i<data.images.length;i++){
                this.state.c1.push(data.images[i])
            }

        }

    }

    async actualizar(e){

        e.preventDefault()

        //const url = 'https://radiant-castle-07024.herokuapp.com/api/producto/'
        const url = 'http://localhost:5000/api/producto/'

        const token = localStorage.getItem("token")
        const id=this.state.id

        if(this.state.nombre.length<=0){
            this.state.nombre=this.state.nombreA
        }
        if(this.state.precio.length<=0){
            this.state.precio=this.state.precioA
        }
        if(this.state.stock.length<=0){
            this.state.stock=this.state.stockA
        }
        if(this.state.descripcion.length<=0){
            this.state.descripcion=this.state.descripcionA
        }
        if(this.state.categoria.length<=0){
            this.state.categoria=this.state.categoriaA
        }if(this.state.images.length <=0){
            this.state.images=this.state.imagesA
        }

        var config = {
            method: 'put',
            url: url+id,
            headers: {
                'access-token': token
            },
            data: this.state
        };


        const response=await Axios(config)

        const mensaje = response.data.data

        Swal.fire({
            title: mensaje
        })

        this.setState({bool:true});

        window.location.reload()
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
                        <form className="form" onSubmit={this.actualizar}>
                            <div className="f-g">
                                <label htmlFor="name">Nombre del producto: </label>
                                <input type="text" name="name" required
                                       placeholder={this.state.nombreA}
                                       onChange={(e) => this.setState({nombre: e.target.value})}/>
                            </div>
                            <div className="f-g">
                                <label htmlFor="Description">Descripción: </label>
                                <input type="text" name="Description" required
                                       placeholder={this.state.descripcionA}
                                       onChange={(e) => this.setState({descripcion: e.target.value})}/>
                            </div>
                            <div className="f-g">
                                <label htmlFor="budget">Precio x Unidad: </label>
                                <input type="number" name="Price" required
                                       placeholder={this.state.precioA}
                                       onChange={(e) => this.setState({precio: e.target.value})}/>
                            </div>
                            <div className="f-g">
                                <label htmlFor="budget">Unidades disponibles: </label>
                                <input type="number" name="quantity" required
                                       placeholder={this.state.stockA}
                                       onChange={(e) => this.setState({stock: e.target.value})}/>
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
                                        <input type="file" name="imagen" placeholder="imagen" multiple
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
export default ActualizarProducto;