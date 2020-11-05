import React from "react";
import Axios from "axios";
import '../assets/css/Listas.css';
import {Grid} from "@material-ui/core";
import DashNav from "../components/DashNav";
import * as AiIcons from 'react-icons/ai';
import {Redirect} from "react-router-dom";
import moment from "moment";

class MisChats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Content: ''
        };
        this.getData = this.getData.bind(this);
        this.specificChat=this.specificChat.bind(this);

    }

    componentDidMount() {
        this.getData();
    }

    specificChat(id){
        localStorage.setItem("ChatID",id)
        localStorage.setItem("ChatIDAux",id)

        window.location.reload();
    }

    async getData() {

        const token = localStorage.getItem("token")

        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/chat'
        const url = 'http://localhost:5000/api/chat'

        const config = {
            method: 'get',
            url: url,
            headers: {
                'access-token': token
            }
        };

       var response=await Axios(config);

       var data = response.data.data;
       var bool = response.data.bool;

        this.setState({
            Content: data.map((chat,index) => (
                    <div className="media" key={chat._id}>
                        <div className="media-body">
                            <h4 className="mt-0">{bool[index]?chat.seller.nombre:chat.user.nombre}</h4>
                            <p className="card-text">{chat.Mensajes.length>0?(chat.Mensajes[chat.Mensajes.length-1].emisor=="user"?chat.user.nombre:chat.seller.nombre):1} : {chat.Mensajes.length>0?(chat.Mensajes[chat.Mensajes.length-1].mensaje):1}</p>

                            <button type="button" className="btn btn-outline btn-list" onClick={(e) => this.specificChat(chat._id)}><AiIcons.AiFillEye/></button>

                            <div className="card-footer">
                                <small className="text-muted">{chat.Mensajes.length>0?(moment(chat.Mensajes[chat.Mensajes.length-1].date).format('DD/MM/YYYY')):1}</small>
                            </div>
                        </div>

                    </div>

                ))
        })

    }

    render() {
        if (localStorage.getItem("ChatID")) {
            return (
                <Redirect to="/chat"/>
            )
        } else {

            return (
                <Grid container spacing={3}>

                    <Grid item xs={12}>
                        <DashNav/>
                    </Grid>


                    <Grid item xs={12}>
                        {this.state.Content}
                    </Grid>


                </Grid>
            )
        };
    }

}

export default MisChats