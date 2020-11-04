import React,{Component} from 'react';
import '../assets/css/CardCarousel.css';
import Axios from "axios";
import moment from "moment";



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

        this.setState({
            Content: data.map((producto) => (
                <div className="card" key={producto._id}>
                    <div className="card-icon" ><img src={producto.images} alt="icon1"/></div>
                    <div className="card-body">
                        <h5 className="card-title">{producto.nombre}</h5>
                        <p className="card-text">{producto.categoria}</p>
                        <p className="card-text">Precio: ${producto.precio}</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">Subido {moment(producto.date).format('DD/MM/YYYY')} </small>
                    </div>
                </div>
            ))
        })

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