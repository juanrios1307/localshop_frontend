import React,{Component} from 'react';
import '../assets/css/ForgotPasword.css';
import Logo from '../assets/images/Logo/BLACK PNG.png';
import {Link} from 'react-router-dom';
import Axios from "axios";
import Swal from "sweetalert2";

class ForgotPasword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            correo: ''
        };
        this.enviarForm = this.enviarForm.bind(this);
    }

    async enviarForm(e) {
        e.preventDefault()

        //const url = 'https://radiant-castle-07024.herokuapp.com/api/updatepwd'
        const url = 'http://localhost:5000/api/updatepwd/';

        var config = {
            method: 'post',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "correo": this.state.correo
            }
        };

        var response = await Axios(config);

        var data = response.data.data;

        Swal.fire({
            icon: 'success',
            title: data
        })

        localStorage.setItem("correo",this.state.correo)
    }

    render(){
        return (
            <div className="pagforgot">
                <div className="forgotbox">
                    <img src={Logo} alt="logo"/>
                    <div  className="forgottitle">
                        <h8>¿Olvidaste tu contraseña?</h8>
                    </div>
                    <p>
                        ¡No hay problema! Ingresa tu correo electrónico y te mandaremos las instrucciones para que reestablezcas tu contraseña.
                    </p>
                    <form onSubmit={this.enviarForm} >
                        <input type="email" name="email" placeholder="Correo Electrónico" required
                               onChange={e => this.setState({correo: e.target.value})}/>
                        <button>Enviar Link</button>
                        <div className="loglink">
                            <Link to="/sing-up" className="linklog">Volver a Iniciar Sesión</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default ForgotPasword;