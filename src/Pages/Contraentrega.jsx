import React,{Component} from 'react';
import '../assets/css/PaymentMethods.css';
import DashNav from "../components/DashNav";
import Axios from "axios";
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";

class Contraentrega extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Content: '',
            bool:false,
            producto:'',
            cantidad:'',
            metodoPago:'',
            exito:false

        };

        this.getData = this.getData.bind(this);
        this.pagar = this.pagar.bind(this);
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        const token = localStorage.getItem("token")

        localStorage.removeItem("bool")
        localStorage.removeItem("productS")
        localStorage.removeItem("cantidadS")

        this.setState({bool:localStorage.getItem("boolAux")})
        this.setState({metodoPago:localStorage.getItem("metodopago")})
        this.setState({producto:localStorage.getItem("productSAux")})
        this.setState({cantidad:localStorage.getItem("cantidadSAux")})

    }

    async pagar(e){
        e.preventDefault()

        const token = localStorage.getItem("token")
        //const url = 'https://radiant-castle-07024.herokuapp.com/api/venta/'
        const url = 'http://localhost:5000/api/venta/'

        var config = {
            method: 'post',
            url: url,
            headers: {
                'access-token': token,
                'Content-Type': 'application/json'
            },
            data : this.state
        };

        var response = await Axios(config);

        var data = response.data.data;


        Swal.fire({
            title: response.data.data
        })

        localStorage.setItem("accept",response.status==200?true:false)
        localStorage.setItem("idVenta",response.data.id)

        this.setState({exito:true})

    }


    render(){
        if(this.state.exito==true){
            return(
                <Redirect to="/paystate" />
            )
        }else {
            return (
                <div>
                    <header>
                        <DashNav/>
                    </header>
                    <div className="TittleC">
                        <h8>Contra entrega</h8>
                    </div>
                    <div className="tcont">
                        <h8>Haz click en el botón "Continuar" para coordinar la entrega directamente con el vendedor
                        </h8>
                    </div>
                    <form onSubmit={this.pagar}>
                        <div className="btn-p">
                            <button className="btn-pgr" type="submit">Continuar</button>
                        </div>
                    </form>
                </div>
            );
        }
    }
}
export default Contraentrega;