import React,{Component} from 'react';
import '../assets/css/PaymentMethods.css';
import DashNav from "../components/DashNav";
import Axios from "axios";

class Contraentrega extends Component {

    render(){
        return (
            <div>
                <header>
                    <DashNav/>
                </header>
                <div className="TittleC">
                    <h8>Contra entrega</h8>
                </div>
                <div className="tcont">
                    <h8>Haz click en el botón "Continuar" para coordinar la entrega directamente con el vendedor</h8>
                </div>
                <div className="btn-p">
                    <button className="btn-pgr">Continuar</button>
                </div>
            </div>
        );
    }
}
export default Contraentrega;