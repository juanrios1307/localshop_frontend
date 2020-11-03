import React,{Component} from 'react';
import '../assets/css/ForgotPasword.css';
import Logo from "../assets/images/Logo/BLACK PNG.png";
import {Link} from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            correo:'',
            pwd: '',
            confirmPwd:''
        };
        this.enviarForm = this.enviarForm.bind(this);
        this.validarPwd = this.validarPwd.bind(this);
    }

    async enviarForm(e) {

        e.preventDefault()

        const bool=this.validarPwd()

        if(!bool) {

            this.state.correo = localStorage.getItem("correo")

            //const url ='https://radiant-castle-07024.herokuapp.com/api/updatepwd'
            const url = 'http://localhost:5000/api/updatepwd/';

            var config = {
                method: 'put',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "correo": this.state.correo,
                    "pwd": this.state.pwd
                }
            };

            var response = await Axios(config);

            var data = response.data.data;

            Swal.fire({
                title: data
            })
        }

    }

    validarPwd(){
        var str=this.state.pwd
        var confirm=this.state.confirmPwd

        if(str !== confirm){
            Swal.fire({
                title: "Las contraseñas deben ser iguales"
            })
            return true
        }

        if (str.length < 6) {
            Swal.fire({
                title: "La contraseña debe contener al menos 6 caracteres"
            })
            return true
        } if (str.length > 50) {
            Swal.fire({
                title: "La contraseña debe contener menos de 50 caracteres"
            })
            return true
        } if (str.match(/\d/) == null) {
            Swal.fire({
                title: "La contraseña debe contener al menos 1 numero"
            })

            return true
        } if (str.match(/[a-zA-Z]/) == null) {
            Swal.fire({
                title: "La contraseña debe contener al menos 1 letra"
            })
            return true
        }


        return false
    }

    render(){
        return (
            <div className="pagforgot">
                <div className="forgotbox">
                    <img src={Logo} alt="logo"/>
                    <div  className="forgottitle">
                        <h8>Cambia tu contraseña</h8>
                    </div>
                    <form onSubmit={this.enviarForm} >
                        <label>Nueva Contraseña</label>
                        <input type="password" name="pwd" placeholder="Contraseña" required
                               onChange={e => this.setState({pwd: e.target.value})}/>
                        <label>Confirmar Contraseña</label>
                        <input type="password" name="pwd" placeholder="Confirmar Contraseña" required
                               onChange={e => this.setState({confirmPwd: e.target.value})}/>
                        <button type="submit">Guardar</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default ChangePassword;