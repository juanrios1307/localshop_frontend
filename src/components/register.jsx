import React from "react";
import Logo from '../assets/images/Logo/BLACK PNG.png'
import Axios from "axios";
import Swal from "sweetalert2";


export class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nombre :'',
            correo:'',
            pwd:'',
            cpwd:'',
            telefono:'',
            ciudad:'',
            cedula:''
        }

        this.signinUser = this.signinUser.bind(this);
        this.validarPwd = this.validarPwd.bind(this)
    }

    async signinUser(e) {
        e.preventDefault()

        //const url = 'https://radiant-castle-07024.herokuapp.com/api/users'

        const url='http://localhost:5000/api/users'

        if(this.validarPwd()){

        }else {

            const response = await Axios.post(url, this.state)

            const mensaje = response.data.mensaje

            console.log(mensaje)

            Swal.fire({
                title: mensaje
            })

            this.setState({nombre :'',
                correo:'',
                pwd:'',
                cpwd:'',
                telefono:'',
                ciudad:'',
                cedula:''})

        }
    }

    validarPwd(){
        var str=this.state.pwd

        if(this.state.pwd !== this.state.cpwd ){
            Swal.fire({
                title: "Las contraseñas deben ser iguales. "
            })
            return true

        } if (str.length < 6) {
            Swal.fire({
                title: "La contraseña debe contener al menos 6 caracteres."
            })
            return true
        } if (str.length > 50) {
            Swal.fire({
                title: "La contraseña debe contener menos de 50 caracteres."
            })
            return true
        } if (str.match(/\d/) == null) {
            Swal.fire({
                title: "La contraseña debe contener al menos 1 numero."
            })

            return true
        } if (str.match(/[a-zA-Z]/) == null) {
            Swal.fire({
                title: "La contraseña debe contener al menos 1 letra."
            })
            return true
        }


        return false
    }


    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Registro</div>
                <div className="content">
                    <form className="form" onSubmit={this.signinUser}>
                        <div className="form-group">
                            <label htmlFor="username">Nombre Completo *</label>
                            <input type="text" name="name" placeholder="Nombre completo" required
                                   value={this.state.nombre}
                                   onChange={(e) => this.setState({nombre: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico *</label>
                            <input type="email" name="email" placeholder="Correo Electrónico" required
                                   value={this.state.correo}
                                   onChange={(e) => this.setState({correo: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña *</label>
                            <input type="password" name="password" placeholder="Contraseña" required
                                   value={this.state.pwd}
                                   onChange={(e) => this.setState({pwd: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Confirmar Contraseña *</label>
                            <input type="password" name="password" placeholder="Contraseña" required
                                   value={this.state.cpwd}
                                   onChange={(e) => this.setState({cpwd: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Teléfono *</label>
                            <input type="tel" name="phone" placeholder="Teléfono" required
                                   value={this.state.telefono}
                                   onChange={(e) => this.setState({telefono: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Ciudad *</label>
                            <input type="text" name="ciudad" placeholder="Ciudad" required
                                   value={this.state.ciudad}
                                   onChange={(e) => this.setState({ciudad: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ident">Cédula *</label>
                            <input type="number" name="ident" placeholder="Cédula" required
                                   value={this.state.cedula}
                                   onChange={(e) => this.setState({cedula: e.target.value})}/>
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
export default Register;