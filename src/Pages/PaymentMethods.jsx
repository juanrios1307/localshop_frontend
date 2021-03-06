import React,{Component} from 'react';
import '../assets/css/PaymentMethods.css';
import DashNav from "../components/DashNav";
import Axios from "axios";
import {Redirect} from "react-router-dom";

class PaymentMethods extends Component {


    constructor(props) {
        super(props);
        this.state = {
            Content: '',
            precio:0,
            bool:false,
            metodo:''

        };

        this.getData = this.getData.bind(this);
        this.pagar = this.pagar.bind(this);
        this.pago = this.pago.bind(this);
    }

    componentDidMount() {
        this.getData()
    }

    async getData(){
        const token = localStorage.getItem("token")

        localStorage.removeItem("bool")
        localStorage.removeItem("productS")
        localStorage.removeItem("cantidadS")

        const bool=localStorage.getItem("boolAux")
        const product=localStorage.getItem("productSAux")
        const cantidad=localStorage.getItem("cantidadSAux")

        var data

        //const url = 'https://radiant-castle-07024.herokuapp.com/api/venta/methods'
        const url = 'http://localhost:5000/api/venta/methods'

        if(bool) {

            const config = {
                method: 'get',
                url: url,
                headers: {
                    'access-token': token,
                    'bool':"true"
                }
            };

            var response = await Axios(config);

            data = response.data.data;



        }else{

            const config = {
                method: 'get',
                url: url,
                headers: {
                    'access-token': token,
                    'producto':product,
                    'cantidad':cantidad
                }
            };

            var response = await Axios(config);

            data = response.data.data;

        }


        if(Array.isArray(data[0])) {

            if (data[0].length > 0) {

                if (data[0].length > 1) {
                    this.setState({
                        Content: data[0].map((data) => (
                            <div className="form-c">
                                <label className="form-check-label" htmlFor="exampleRadios1">
                                    {data[0].toUpperCase()+data.slice(1)}
                                </label>
                                <input className="form-check-input" type="radio" name="exampleRadios"
                                       id="exampleRadios1" value={data} />

                            </div>
                        ))
                    })
                }
            } else {
                this.setState({
                    Content:
                        <div className="form-c">
                            <p>Debes comprar cada producto por separado,
                                no tenemos metodos de pago que acepten todos los vendedores</p>
                        </div>
                })

            }
        }else{
            this.setState({
                Content: data.map((data) => (
                    <div className="form-c">
                        <label className="form-check-label" htmlFor="exampleRadios1">
                            {data[0].toUpperCase()+data.slice(1)}
                        </label>
                        <input className="form-check-input" type="radio" name="exampleRadios"
                               id="exampleRadios1" value={data}/>

                    </div>
                ))
            })
        }
    }

    pagar(event){
        const metodo=event.target.value

        if(metodo=="tarjeta"){
            this.setState({metodo:"tarjeta"})
        }else if(metodo=="contraentrega"){
            this.setState({metodo:"contraentrega"})
        }else if(metodo=="giro"){
            this.setState({metodo:"giro"})
        }
    }

    pago(event){
        event.preventDefault()
        localStorage.setItem("metodopago",this.state.metodo)
        this.setState({bool:true})
    }

    render(){
        if(this.state.bool==true && this.state.metodo=="tarjeta"){
            return(
                <Redirect to="/card"/>
            )
        }else if(this.state.bool==true && this.state.metodo=="contraentrega") {
            return(
                <Redirect to="/contraentrega"/>
            )
        }else  if(this.state.bool==true && this.state.metodo=="giro") {
            return(
                <Redirect to="/giro"/>
            )
        }else {

            return (
                <div>
                    <header>
                        <DashNav/>
                    </header>
                    <div className="TittleC">
                        <h8>Métodos de pago</h8>
                    </div>
                    <div className="inpt-p">
                        <form onSubmit={this.pago}>
                            <fieldset onChange={this.pagar}>
                                <legend>¿Cómo deseas pagar?</legend>

                                {this.state.Content};

                            </fieldset>

                            <div className="btn-p">
                                <button className="btn-pgr" type="submit">Continuar</button>
                            </div>
                        </form>
                    </div>

                </div>
            );
        }
    }
}
export default PaymentMethods;