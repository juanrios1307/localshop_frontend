import React,{Component} from 'react';
import '../assets/css/PaymentMethods.css';
import DashNav from "../components/DashNav";

class PaymentMethods extends Component {

    render(){
            return (
                <div>
                    <header>
                        <DashNav/>
                    </header>
                    <div className="TittleC">
                        <h8>Métodos de pago</h8>
                    </div>
                    <div className="inpt-p">
                        <form>
                            <fieldset>
                                <legend>¿Cómo deseas pagar?</legend>
                                <div className="form-c">
                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                        Contra-Entrega
                                    </label>
                                    <input className="form-check-input" type="radio" name="exampleRadios"
                                           id="exampleRadios1" value="option1"/>

                                </div>
                                <div className="form-c">
                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                        Gana o Efecty
                                    </label>
                                    <input className="form-check-input" type="radio" name="exampleRadios"
                                           id="exampleRadios2" value="option2"/>

                                </div>
                                <div className="form-c">
                                    <label className="form-check-label" htmlFor="exampleRadios3">
                                        Tarjeta de crédito
                                    </label>
                                    <input className="form-check-input" type="radio" name="exampleRadios"
                                           id="exampleRadios3" value="option3"/>

                                </div>
                            </fieldset>
                        </form>
                    </div>
                    <div className="btn-p">
                        <button className="btn-pgr">Continuar</button>
                    </div>
                </div>
            );
    }
}
export default PaymentMethods;