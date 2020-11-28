import React,{Component} from 'react';
import '../assets/css/PaymentMethods.css';
import DashNav from "../components/DashNav";
import Axios from "axios";
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Content: '',
            bool:false,
            producto:'',
            cantidad:'',
            metodoPago:'',
            exito:false,

            numero:0,
            cvc:0,
            mes:0,
            year:0,
            tipo:'',
            titular:''

        };

        this.getData = this.getData.bind(this);
        this.pagar = this.pagar.bind(this);
        this.verificartarjeta = this.verificartarjeta.bind(this);
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        const token = localStorage.getItem("token")

        localStorage.removeItem("bool")
        localStorage.removeItem("productS")
        localStorage.removeItem("cantidadS")

        this.setState({bool:localStorage.getItem("boolAux")})
        this.setState({metodoPago:localStorage.getItem("metodopago")})
        this.setState({producto:localStorage.getItem("productSAux")})
        this.setState({cantidad:localStorage.getItem("cantidadSAux")})

    }

    async verificartarjeta(e){
        e.preventDefault()

        const token = localStorage.getItem("token")
        //const url = 'https://radiant-castle-07024.herokuapp.com/api/venta/'
        const url = 'http://localhost:5000/api/verificartarjeta/'

        var config = {
            method: 'get',
            url: url,
            headers: {
                'access-token': token,
                'numero': this.state.numero,
                'cvc': this.state.cvc,
                'mes': this.state.mes,
                'year': this.state.year,
                'titular': this.state.titular
            },
        };

        var response = await Axios(config);

        var data = response.data.data;

        if(response.status==200){

            Swal.fire({
                title: response.data.data
            })

            this.pagar(e)

        }else{
            Swal.fire({
                title: response.data.data
            })
        }

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
                        <h8>Tarjeta de crédito</h8>
                    </div>
                    <div className="tcard">

                        <div className="tizq">
                            <form className="tizqf">
                                <input className="inpt-t" type="number" placeholder="Número de la tarjeta" required
                                       onChange={(e) => this.setState({numero: e.target.value})}/>
                                <div className="vldthr">
                                    <h6>Válido hasta</h6>
                                    <input className="inpt-ma" type="number" placeholder="MM" required
                                           onChange={(e) => this.setState({mes: e.target.value})}/>
                                    <h6>/</h6>
                                    <input className="inpt-ma" type="number" placeholder="AA" required
                                           onChange={(e) => this.setState({year: e.target.value})}/>
                                </div>
                                <input className="inpt-ta" type="text" placeholder="Nombre del titular" required
                                       onChange={(e) => this.setState({titular: e.target.value})}/>
                            </form>
                        </div>
                        <div className="tder">
                            <div className="lnb"/>
                            <form>
                                <input className="inpt-cvc" type="number" placeholder="CVC" required
                                       onChange={(e) => this.setState({cvc: e.target.value})}/>
                            </form>
                            <p>Últimos tres dígitos de la parte trasera</p>
                        </div>

                    </div>
                    <div className="btn-p">
                        <form onSubmit={this.verificartarjeta}>
                            <button className="btn-pgr">Continuar</button>
                        </form>
                    </div>
                </div>
            );
        }
    }
}
export default Card;