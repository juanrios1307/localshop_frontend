import React from "react";
import Logo from '../assets/images/Logo/BLACK PNG.png'
import Axios from "axios";
import Swal from "sweetalert2";
import { Redirect, Link } from "react-router-dom";


export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            correo:'',
            pwd:'',
            toRedirect:false
        }

        this.login = this.login.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem("token")){
            this.setState({
                toRedirect:true
            })
        }
    }

    async login(e){
        e.preventDefault()


        //const url = 'https://radiant-castle-07024.herokuapp.com/api/login'
        const url='http://localhost:5000/api/login'

        const response = await Axios.post(
            url,
            this.state)

        const mensaje = response.data.mensaje
        const status=response.status



        if(status===200){
            Swal.fire({
                title: mensaje,
            })

            localStorage.setItem("token",response.data.token)

            this.setState({
                toRedirect:true
            })
        }else{
            console.log("I: "+mensaje)
            Swal.fire({
                title: mensaje,
            })
        }

    }



    render() {
        if(this.state.toRedirect){
            return <Redirect to='/dashboard' />
        }else{

            return (

                <div className="base-container" ref={this.props.containerRef}>
                    <div className="header">Iniciar Sesión</div>
                    <div className="content">
                        <div className="image">
                            <img src={Logo} alt="Login"/>
                        </div>
                        <form className="form" onSubmit={this.login} >
                            <div className="form-group">
                                <label htmlFor="email">Correo Electrónico</label>
                                <input type="email" name="email" placeholder="Correo Electrónico" required
                                       value={this.state.correo}
                                       onChange={(e) => this.setState({correo: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" name="password" placeholder="Contraseña" required
                                       value={this.state.pwd}
                                       onChange={(e) => this.setState({pwd: e.target.value})}/>
                            </div>
                            <div className="footer">
                                <Link to="/forgotpwd" className="forgotpwd">¿Olvidaste tu contraseña?</Link>
                                <hr/>
                                <button type="submit" className="btn">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            );

        }
    }
}
export default Login;