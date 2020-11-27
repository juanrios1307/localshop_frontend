import React,{Component} from 'react';
import '../assets/css/PaymentMethods.css';
import DashNav from "../components/DashNav";
import Check from "../assets/images/check.png";
import Cross from "../assets/images/Not.png";
import Axios from "axios";

class EstadoCompra extends Component {

    accept = true;

    render(){
        if(this.accept){
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
                <div className="status"><h8>! Compra realizada con exito ¡</h8></div>
                <div className="btn-stat">
                    <button className="btn-st">Mostrar recibo</button>
                    <button className="btn-st">Seguir comprando</button>
                    <button className="btn-st">Continuar</button>
                </div>
            </div>
        );
    }else{
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
                    <div className="status-w"><h8>Error en la compra</h8></div>
                    <div className="btn-stat">
                        <button className="btn-st">Reintentar</button>
                        <button className="btn-st">Cancelar</button>
                    </div>
                </div>
            );

        }

}

}
export default EstadoCompra;