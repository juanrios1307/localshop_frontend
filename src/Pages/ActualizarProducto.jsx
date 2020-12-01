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
            images:[],
            imagenFile:[],

            nombreA:'',
            precioA:'',
            stockA:'',
            descripcionA:'',
            categoriaA:'',
            imagesA:[],
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

        for(var i=0;i<data.images.length;i++){
            this.state.c1.push(data.images[i])
            this.state.imagenFile.push(data.images[i])
        }


        this.setState({nombreA:data.nombre});
        this.setState({precioA:data.precio})
        this.setState({stockA:data.stock})
        this.setState({descripcionA:data.descripcion})
        this.setState({categoriaA:data.categoria})
        this.setState({imagesA:data.images})

    }

    async actualizar(e){

        e.preventDefault()

        //const url = 'https://radiant-castle-07024.herokuapp.com/api/producto/'
        const url = 'http://localhost:5000/api/producto/'

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

          this.setState({images:images})

        } catch (err) {
            console.error(err);
        }

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

    files(event){

        var files = event.target.files

        const imgl = this.state.imagenFile.length
        const fl = files.length

        if (fl > 0) {
            if (fl > 10) {
                Swal.fire({
                    title: "Solo puedes subir 10 imagenes de tu producto"
                })

                for (var i = 0; i < 10; i++) {
                    this.state.imagenFile.push(files[i]);
                }

                while (this.state.imagenFile.length > 10) {
                    this.state.imagenFile.shift()
                }

            } else {

                if ((imgl + fl) > 10) {
                    Swal.fire({
                        title: "Solo puedes subir 10 imagenes de tu producto"
                    })

                    for (var i = 0; i < fl; i++) {
                        this.state.imagenFile.push(files[i]);
                    }

                    while (this.state.imagenFile.length > 10) {
                        this.state.imagenFile.shift()
                    }

                } else {

                    for (var i = imgl; i < imgl + fl; i++) {
                        this.state.imagenFile.push(files[i - imgl]);
                    }
                }
            }

            for(var i=0;i<this.state.imagenFile.length;i++){
                if(this.state.imagesA.length >=i && this.state.imagenFile[i] == this.state.imagesA[i] ){

                    this.state.c1[i] =this.state.imagenFile[i]
                }else{

                   this.state.c1[i] =URL.createObjectURL(this.state.imagenFile[i])
                }
            }

            this.setState({
                boolImages: !this.state.boolImages
            })
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
                                <input type="text" name="name"
                                       placeholder={this.state.nombreA}
                                       onChange={(e) => this.setState({nombre: e.target.value})}/>
                            </div>
                            <div className="f-g">
                                <label htmlFor="Description">Descripción: </label>
                                <input type="text" name="Description"
                                       placeholder={this.state.descripcionA}
                                       onChange={(e) => this.setState({descripcion: e.target.value})}/>
                            </div>
                            <div className="f-g">
                                <label htmlFor="budget">Precio x Unidad: </label>
                                <input type="number" name="Price"  min="1"
                                       placeholder={this.state.precioA}
                                       onChange={(e) => this.setState({precio: e.target.value})}/>
                            </div>
                            <div className="f-g">
                                <label htmlFor="budget">Unidades disponibles: </label>
                                <input type="number" name="quantity" min="1"
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
                                    <option  value="infantil" >Infantil</option>
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
                                            <img src={this.state.c1[5]}/>
                                            <img src={this.state.c1[6]}/>
                                            <img src={this.state.c1[7]}/>
                                            <img src={this.state.c1[8]}/>
                                            <img src={this.state.c1[9]}/>
                                        </div>
                                    </div>
                                    <div className="inpt">
                                        <input type="file" name="imagen" placeholder="imagen" multiple
                                               accept="image/*"
                                               onChange={this.files} />
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