import React from 'react';
import '../assets/css/EditProfile.css';
import Axios from "axios";
import {Link} from 'react-router-dom';


class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newNombre:'',
            newTelefono:'',
            newCiudad:'',

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

        this.state.nombre=(data.nombre);
        this.state.ciudad=(data.ciudad);
        this.state.telefono=(data.telefono)

    }

    async actualizar(e){
        e.preventDefault()

        //const url='https://peaceful-ridge-86113.herokuapp.com/api/users'
        const url='http://localhost:5000/api/users'

        const token = localStorage.getItem("token")

        var data = '';

        if (this.state.newNombre.length > 0) {
            data = ({"nombre": this.state.newNombre});
            this.setState({newNombre:''})
        } else if (this.state.newTelefono.length > 0) {
            console.log(JSON.stringify(this.state.newTelefono));
            data = ({"telefono": this.state.newTelefono});
            this.setState({newTelefono:''})
        } else if (this.state.newCiudad.length > 0) {
            console.log(JSON.stringify(this.state.newCiudad));
            data = ({"ciudad": this.state.newCiudad});
            this.setState({newCiudad:''})
        }

        var config = {
            method: 'put',
            url: url,
            headers: {
                'access-token': token
            },
            data: data
        };

        const response=await Axios(config)

        const mensaje = response.data.data


        window.location.reload(false);
    }

    render(){
        return (
            <div className="edit">
                <form className="form" onSubmit={this.actualizar}>
                    <div className="f-group">
                        <label htmlFor="username">Nombre Completo: </label>
                        <input type="text" name="username" placeholder={this.state.nombre}
                               onChange={e => this.setState({newNombre:e.target.value})}/>
                    </div>
                    <div className="f-group">
                        <label htmlFor="phone">Teléfono: </label>
                        <input type="phone" name="phone" placeholder={this.state.telefono}
                               onChange={e => this.setState({newTelefono:e.target.value})}/>
                    </div>
                    <div className="f-group">
                        <label htmlFor="city">Ciudad: </label>
                        <input type="text" name="ciudad" placeholder={this.state.ciudad}
                               onChange={e => this.setState({newCiudad:e.target.value})}/>
                    </div>
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