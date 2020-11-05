import React from 'react';
import '../assets/css/EditProfile.css';
import Axios from "axios";
import Swal from "sweetalert2";
import Logo from "../assets/images/Logo/Logo Localshop negro.png";


class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            nombreA:'',
            telefonoA:'',
            ciudadA:'',

            nombre:'',
            telefono:'',
            ciudad:''
        };
        this.user = this.user.bind(this);
        this.actualizar = this.actualizar.bind(this);
    }


    componentDidMount() {
        this.user()
    }


    async user(){

        //const url='https://peaceful-ridge-86113.herokuapp.com/api/users'
        const url='http://localhost:5000/api/users'

        const token = localStorage.getItem("token")

        const config = {
            method: 'get',
            url: url,
            headers: {
                'access-token': token
            }
        };

        const res = await Axios(config);

        const data = res.data.data;

        this.setState({nombreA:data.nombre})
        this.setState({telefonoA:data.telefono})
        this.setState({ciudadA:data.ciudad})

    }

    async actualizar(e){
        e.preventDefault()

        //const url='https://radiant-castle-07024.herokuapp.com/api/users'
        const url='http://localhost:5000/api/users'

        const token = localStorage.getItem("token")


        if(this.state.nombre.length<=0){
            this.state.nombre=this.state.nombreA
        }
        if(this.state.telefono.length<=0){
            this.state.telefono=this.state.telefonoA
        }
        if(this.state.ciudad.length<=0){
            this.state.ciudad=this.state.ciudadA
        }

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

        Swal.fire({
            title: mensaje,
        })

        window.location.reload(false);
    }

    render(){
        return (
                <div className="edit">
                    <form className="form" onSubmit={this.actualizar}>
                        <div className="f-group">
                            <label htmlFor="username">Nombre Completo: </label>
                            <input type="text" name="username" placeholder={this.state.nombreA}
                                   onChange={e => this.setState({nombre:e.target.value})}/>
                        </div>
                        <div className="f-group">
                            <label htmlFor="phone">Teléfono: </label>
                            <input type="phone" name="phone" placeholder={this.state.telefonoA}
                                   onChange={e => this.setState({telefono:e.target.value})}/>
                        </div>
                        <div className="f-group">
                            <label htmlFor="city">Ciudad: </label>
                            <input type="text" name="ciudad" placeholder={this.state.ciudadA}
                                   onChange={e => this.setState({ciudad:e.target.value})}/>
                        </div>
                        <img src={Logo}/>
                        <div className="ftr">
                            <button type="submit" className="btn">
                                Editar
                            </button>
                        </div>
                    </form>

                </div>
        );
    }
}

export default EditProfile;