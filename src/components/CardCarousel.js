import React,{Component} from 'react';
import '../assets/css/CardCarousel.css';
import Axios from "axios";
import moment from "moment";
import nofoto from "../assets/images/nofoto.png"


class CardCarousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Content: ''
        };
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {



        //const url = 'https://radiant-castle-07024.herokuapp.com/api/main/promproducts'

        const url = 'http://localhost:5000/api/main/promproducts'

        const config = {
            method: 'get',
            url: url
        };

        var response=await Axios(config);

        var data = response.data.data;

        if(data[0].promedio != 0) {
            this.setState({
                Content: data.map((producto) => (
                    <div className="card" key={producto._id}>
                        <div className="card-icon"><img src={producto.promedio>0?producto.images[0]:nofoto} alt="No imagen"/></div>
                        <div className="card-body">
                            <h5 className="card-title">{producto.promedio>0?producto.nombre[0].toUpperCase()+producto.nombre.slice(1):"No tenemos mas sugerencias para ti"}</h5>
                            <p className="card-text">{producto.promedio>0?producto.categoria:""}</p>
                            <p className="card-text">{producto.promedio>0?"Precio: $"+producto.precio:""}</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">{producto.promedio>0?"Subido "+moment(producto.date).format('DD/MM/YYYY'):""} </small>
                        </div>
                    </div>
                ))
            })
        }else{
            this.setState({Content:
                    <div className="div0">
                    <h5 className="card0">No tenemos sugerencias para ti !</h5>
                </div>})
        }

    }



    render() {
        return (
            <section className="card-deck">
                {this.state.Content}
            </section>
        );
    }
}
export default CardCarousel;