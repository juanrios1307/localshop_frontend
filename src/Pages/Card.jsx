import React,{Component} from 'react';
import '../assets/css/PaymentMethods.css';
import DashNav from "../components/DashNav";
import Axios from "axios";

class Card extends Component {

    render(){
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
                            <input className="inpt-t" type="number" placeholder="Número de la tarjeta" required/>
                            <div className="vldthr">
                                <h6>Válido hasta</h6>
                                <input className="inpt-ma" type="number" placeholder="MM" required/>
                                <h6>/</h6>
                                <input className="inpt-ma" type="number" placeholder="AA" required/>
                            </div>
                            <input className="inpt-ta" type="number" placeholder="Nombre del titular" required/>
                        </form>
                    </div>
                    <div className="tder">
                        <div className="lnb"/>
                        <form>
                            <input className="inpt-cvc" type="number" placeholder="CVC" required/>
                        </form>
                        <p>Últimos tres dígitos de la parte trasera</p>
                    </div>
                </div>
                <div className="btn-p">
                    <button className="btn-pgr">Continuar</button>
                </div>
            </div>
        );
    }
}
export default Card;