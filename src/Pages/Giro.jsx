import React,{Component} from 'react';
import '../assets/css/PaymentMethods.css';
import DashNav from "../components/DashNav";
import Axios from "axios";
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";

class Giro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Content: '',
            bool:false,
            producto:'',
            cantidad:'',
            metodoPago:'',
            exito:false,

            nombre:'',
            cedula:'',
            telefono:'',
            correo:''

        };

        this.getData = this.getData.bind(this);
        this.pagar = this.pagar.bind(this);
    }

    componentDidMount() {
        this.getData()
    }

    async getData() {
        const token = localStorage.getItem("token")

        localStorage.removeItem("bool")
        localStorage.removeItem("productS")
        localStorage.removeItem("cantidadS")

        this.setState({bool:localStorage.getItem("boolAux")})
        this.setState({metodoPago:localStorage.getItem("metodopago")})
        this.setState({producto:localStorage.getItem("productSAux")})
        this.setState({cantidad:localStorage.getItem("cantidadSAux")})

        this.state.producto=localStorage.getItem("productSAux")

        //const url =  'https://radiant-castle-07024.herokuapp.com/api/venta/giro'
        const url = 'http://localhost:5000/api/venta/giro'

        var data

        if(this.state.producto) {
            const config = {
                method: 'get',
                url: url,
                headers: {
                    'access-token': token,
                    "producto": this.state.producto
                }
            };

            const res = await Axios(config);
            data = res.data.data;

        }else{
            const config = {
                method: 'get',
                url: url,
                headers: {
                    'access-token': token,
                    "bool": "true"
                }
            };

            const res = await Axios(config);
            data = res.data.data;
        }

        this.setState({nombre: data.user.nombre});
        this.setState({cedula: data.user.cedula});
        this.setState({telefono: data.user.telefono});
        this.setState({correo: data.user.correo});

    }

    async pagar(e){
        e.preventDefault()

        const token = localStorage.getItem("token")
        //const url = 'https://radiant-castle-07024.herokuapp.com/api/venta/'
        const url = 'http://localhost:5000/api/venta/'

        var config = {
            method: 'post',
            url: url,
            headers: {
                'access-token': token,
                'Content-Type': 'application/json'
            },
            data : this.state
        };

        var response = await Axios(config);

        var data = response.data.data;


        Swal.fire({
            title: response.data.data
        })

        localStorage.setItem("accept",response.status==200?true:false)
        localStorage.setItem("idVenta",response.data.id)
        this.setState({exito:true})

    }


    render(){
        if(this.state.exito==true){
            return(
                <Redirect to="/paystate" />
            )
        }else {
            return (
                <div>
                    <header>
                        <DashNav/>
                    </header>
                    <div className="TittleC">
                        <h8>Giro</h8>
                    </div>
                    <div className="tinfg">
                        <div className="infog">Información para el giro</div>
                        <div className="infos">
                            <div className="infoes">
                                <h8>Nombre:</h8>
                                <label>{this.state.nombre}</label>
                            </div>
                            <div className="infoes">
                                <h8 classname="hh8">Cédula:</h8>
                                <label>{this.state.cedula}</label>
                            </div>
                            <div className="infoes">
                                <h8 classname="hh8">Teléfono:</h8>
                                <label>{this.state.telefono}</label>
                            </div>
                            <div className="infoes">
                                <h8>Correo electrónico:</h8>
                                <label>{this.state.correo}</label>
                            </div>
                        </div>
                    </div>
                    <div className="adver">*LocalShop no se hace responsable del proceso de compra y entrega de los
                        productos
                    </div>
                    <form onSubmit={this.pagar}>
                        <div className="btn-p">
                            <button className="btn-pgr">Continuar</button>
                        </div>
                    </form>
                </div>
            );
        }
    }
}
export default Giro;