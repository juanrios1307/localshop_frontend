import React from "react";
import Logo from '../assets/images/Logo/Logo Localshop negro.png'
import Axios from "axios";
import Swal from "sweetalert2";
import '../assets/css/RegisterSeller.scss'
import {Redirect} from "react-router-dom";

export class RegisterSeller extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            banco:'',
            cuentabanco:'',
            MetodosPago:[]
        }

        this.signupseller = this.signupseller.bind(this);

    }

    async signupseller(e) {
        e.preventDefault()

        const token = localStorage.getItem("token")


        //const url = 'https://radiant-castle-07024.herokuapp.com/api/users/seller'
        const url='http://localhost:5000/api/users/seller'


        var config = {
            method: 'put',
            url: url,
            headers: {
                'access-token': token
            },
            data: this.state
        };

        const response=await Axios(config)

        const mensaje = response.data.data

        console.log(mensaje)

        Swal.fire({
            title: mensaje
        })

        this.setState({bool:true})

    }


    render() {
        if (this.state.bool) {
            return <Redirect to='/misproductos' />
        } else {

            return (
                <div className="b-container" ref={this.props.containerRef}>
                    <div className="h">Vendedor</div>
                    <div className="cont">
                        <form className="form" onSubmit={this.signupseller}>
                            <h8 className="hh">Información de Pago</h8>
                            <div className="form-group">
                                <label className="lbl-r" htmlFor="username">Nombre del Banco *</label>
                                <input className="inpt-r" type="text" name="bank" placeholder="Nombre del Banco" required
                                       value={this.state.banco}
                                       onChange={(e) => this.setState({banco: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label className="lbl-r" htmlFor="password">Número de cuenta bancaria *</label>
                                <input className="inpt-r" type="number" name="banknumber" placeholder="Número de cuenta bancaria" required
                                       value={this.state.cuentabanco}
                                       onChange={(e) => this.setState({cuentabanco: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label className="lbl-ra" htmlFor="paymethod">Formas de pago aceptadas *</label>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" />
                                        <label className="form-check-label" htmlFor="inlineCheckbox1">Efectivo</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox2"
                                           value="option2"/>
                                        <label className="form-check-label" htmlFor="inlineCheckbox2">Tarjeta de credito</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox3"
                                           value="option3"/>
                                        <label className="form-check-label" htmlFor="inlineCheckbox3">PayPal</label>
                                </div>
                            </div>
                            <div className="footer">
                                <button type="submit" className="btn">
                                    Registrar
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            );
        }
    }
}
export default RegisterSeller;