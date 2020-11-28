import React,{Component} from 'react';
import '../assets/css/ChatEspecifico.css';
import DashNav from "../components/DashNav";
import Axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import throttle from 'lodash.throttle';

class ChatEspecifico extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Messages: '',
            id:'',
            mensaje:'',
            nombre:''
        };
        this.getMessages = throttle( this.getMessages.bind(this) , 1000);
        this.sendMessage = this.sendMessage.bind(this);
        this.crearChat = this.crearChat.bind(this);
    }

    componentDidMount() {
        this.getID();

        if(localStorage.getItem("productIDChat")){
            this.crearChat()
        }

        this.getMessages();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.getMessages()
    }

    getID(){
        this.state.id=localStorage.getItem("ChatIDAux")
        this.setState({id:localStorage.getItem("ChatIDAux")})
        localStorage.removeItem("ChatID")
    }

    async getMessages(){

        localStorage.removeItem("productIDChat")

        if(this.state.id) {
            const token = localStorage.getItem("token")

            //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/chat/'
            const url = 'http://localhost:5000/api/chat/'

            const config = {
                method: 'get',
                url: url+this.state.id,
                headers:{
                    'access-token': token
                }
            };

            const res = await Axios(config);

            const data = res.data.data;

            if(data[0].isUser===false) {

                this.setState({nombre:data[1].user.nombre})

                this.setState({
                    Messages: data[1].Mensajes.map((messages) => (

                            <li className={messages.emisor === "user" ? "user" : "worker"}>
                                <p className="messages">{messages.mensaje}</p>
                                <p className="date" >{
                                    moment(messages.date).format('DD/MM/YYYY') != moment().format('DD/MM/YYYY')?
                                        moment(messages.date).format('DD/MM/YYYY -  h:mm a'):
                                        "Hoy "+moment(messages.date).format('h:mm a')} </p>
                            </li>

                        )
                    )
                })

            }else{

                this.setState({nombre:data[1].seller.nombre})

                this.setState({
                    Messages: data[1].Mensajes.map((messages) => (

                            <li className={messages.emisor === "user" ? "worker" : "user"}>
                                <p className="messages">{messages.mensaje}</p>
                                <p className="date" >{
                                    moment(messages.date).format('DD/MM/YYYY') != moment().format('DD/MM/YYYY')?
                                    moment(messages.date).format('DD/MM/YYYY -  h:mm a'):
                                    "Hoy "+moment(messages.date).format('h:mm a')} </p>
                            </li>

                        )
                    )
                })
            }


        }
    }

    async crearChat(){
        const product=localStorage.getItem("productIDChat")
        localStorage.removeItem("productIDChat")


        const token=localStorage.getItem("token")

        if(product){

            //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/chat/'
            const url = 'http://localhost:5000/api/chat/'

            if(product) {
                var config = {
                    method: 'post',
                    url: url + product,
                    headers: {
                        'access-token': token,
                        'Content-Type': 'application/json',
                    }
                };
            }


            const response=await Axios(config)

            const mensaje = response.data.data

            this.setState({id:response.data.id})

            localStorage.setItem("ChatIDAux",response.data.id)

            if(response.status===200) {

                Swal.fire({
                    title: mensaje
                })

                this.getMessages()

            }
        }
    }

    async sendMessage(e){

        e.preventDefault()



       const token=localStorage.getItem("token")

        //const url = 'https://peaceful-ridge-86113.herokuapp.com/api/chat/'
        const url = 'http://localhost:5000/api/chat/'


        var config = {
            method: 'put',
            url: url+this.state.id,
            headers: {
                'access-token': token,
                'Content-Type': 'application/json'
            },
            data : {
                "mensaje":this.state.mensaje
            }
        };

        const res = await Axios(config);

        const data = res.data.data;


        if(res.status===200) {

        }else if(res.status===400){
            Swal.fire({
                title: data
            })
        }

        this.setState({mensaje:''})

        await this.getMessages();
    }


    render(){
        return (
            <div>
              <DashNav/>
              <div className="chatbox">
                  <div className="chattitle">
                      <div className="namechat">
                          {this.state.nombre}
                      </div>
                  </div>
                  <div className="chatlistbox">
                      <ul>
                          {this.state.Messages}
                      </ul>
                  </div>
                  <div className="chatinput">
                    <form onSubmit={this.sendMessage}>
                        <input type="text" value={this.state.mensaje} onChange={e => this.setState({mensaje: e.target.value})}/>
                        <button type="submit">Enviar</button>
                    </form>
                  </div>
              </div>
            </div>
        );
    }
}
export default ChatEspecifico;