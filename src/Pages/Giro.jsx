import React,{Component} from 'react';
import '../assets/css/PaymentMethods.css';
import DashNav from "../components/DashNav";
import Axios from "axios";

class Giro extends Component {

    render(){
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
                            <h8>Nombre: </h8>
                            <label>pedro</label>
                        </div>
                        <div className="infoes">
                            <h8 classname="hh8">Cédula: </h8>
                            <label>45674896</label>
                        </div>
                        <div className="infoes">
                            <h8 classname="hh8">Teléfono: </h8>
                            <label>34861231</label>
                        </div>
                        <div className="infoes">
                            <h8>Correo electrónico: </h8>
                            <label>juan78984@hotmail.com</label>
                        </div>
                    </div>
                </div>
                <div className="adver">*LocalShop no se hace responsable del proceso de compra y entrega de los productos</div>
                <div className="btn-p">
                    <button className="btn-pgr">Continuar</button>
                </div>
            </div>
        );
    }
}
export default Giro;