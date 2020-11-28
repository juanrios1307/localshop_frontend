import React,{Component} from 'react';
import '../assets/css/PaymentMethods.css';
import DashNav from "../components/DashNav";
import Check from "../assets/images/check.png";
import Cross from "../assets/images/Not.png";
import Axios from "axios";
import {Redirect} from "react-router-dom";

class EstadoCompra extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Content: '',
            recibo:false,
            buscar:false,
            miscompras:false,
            reintentar:false,
            cancelar:false,
            chat:false,

            accept : true

        };

        this.facturaCompra=this.facturaCompra.bind(this)

        this.setState({accept:localStorage.getItem("accept")})
    }

    componentDidMount() {

    }

    facturaCompra(){

        localStorage.setItem("facturaID",localStorage.getItem("idVenta"))
        localStorage.setItem("facturaIDAux",localStorage.getItem("idVenta"))

        window.location.reload();
    }


    render(){

        if(localStorage.getItem("facturaID")){
            return(
                <Redirect to="/facturac" />
            )
        }else if(this.state.miscompras){
            return(
                <Redirect to="/miscompras" />
            )
        }else if(this.state.buscar){
            return(
                <Redirect to="/products" />
            )
        }else if(this.state.reintentar){
            return(
                <Redirect to="/infopurchases" />
            )
        }else if(this.state.cancelar){
            return(
                <Redirect to="/shoppingCar" />
            )
        }else if(this.state.chat){
            return(
                <Redirect to="/chats" />
            )
        } else {

            if (this.state.accept) {
                return (
                    <div>
                        <header>
                            <DashNav/>
                        </header>
                        <div className="TittleC">
                            <h8>Estado de la compra</h8>
                        </div>
                        <div className="imgch">
                            <img src={Check}/>
                        </div>
                        <div className="status">
                            <h8>! Compra realizada con exito ¡</h8>
                        </div>
                        <div className="btn-stat">
                            <button className="btn-st" onClick={this.facturaCompra} >Mostrar recibo</button>


                            <button className="btn-st" onClick={(e) => this.setState({buscar: true})}>Seguir comprando</button>

                            <button className="btn-st" onClick={(e) => this.setState({miscompras: true})}>Continuar</button>

                            <button className="btn-st" onClick={(e) => this.setState({chat: true})}>Ir al chat</button>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <header>
                            <DashNav/>
                        </header>
                        <div className="TittleC">
                            <h8>Estado de la compra</h8>
                        </div>
                        <div className="imgch">
                            <img src={Cross}/>
                        </div>
                        <div className="status-w">
                            <h8>Error en la compra</h8>
                        </div>
                        <div className="btn-stat">
                            <button className="btn-st" onClick={(e) => this.setState({reintentar: true})}>Reintentar</button>

                            <button className="btn-st" onClick={(e) => this.setState({cancelar: true})}>Cancelar</button>
                        </div>
                    </div>
                );

            }
        }

}

}
export default EstadoCompra;