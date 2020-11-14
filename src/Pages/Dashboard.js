import React from 'react';
import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import DashNav from "../components/DashNav.js";
import 'fontsource-roboto';
import '../assets/css/Dashboard.css';
import PersonIcon from '@material-ui/icons/Person';
import PublicIcon from '@material-ui/icons/Public';
import AssessmentIcon from '@material-ui/icons/Assessment';
import CardsHeader from '../components/CardsHeader';
import Graphics from '../components/Graphics';
import TableMaterial from '../components/TableMaterial';
import EditProfile from "../components/EditProfile";
import Axios from "axios";


const styles = (theme) => ({
    root:{
        flexGrow: 1
    },
    iconos:{
        color: 'white'
    },
    container:{
        paddingTop: '40px',
        alignItems: 'center',
        marginRight: '3em',
        marginTop: '2em'
    },
    containerGrafica:{
        marginTop: '40px'
    },
    containerTabla:{
        marginTop: '1em'
    },
    containerButton:{
        alignItems: 'center'
    }
});

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: "...",
            ciudad: "...",
            anuncios: "..."
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {

        //const url = 'https://radiant-castle-07024.herokuapp.com/api/users'
        const url='http://localhost:5000/api/users'

        const token = localStorage.getItem("token")
        if (token) {
            const config = {
                method: 'get',
                url: url,
                headers: {
                    'access-token': token
                }
            };

            const res = await Axios(config);

            const data = res.data.data;

            this.setState({nombre:data.nombre});
            this.setState({ciudad:data.ciudad});
            this.setState({anuncios:data.Productos==undefined?0:data.Productos.length});
        }
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={3}>

                    <Grid item xs={12}>
                        <DashNav/>
                    </Grid>

                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                        <CardsHeader icono={<PersonIcon className={classes.iconos}/>} titulo="Nombre" texto={this.state.nombre}
                                     color="#060b26"
                                     font="white"/>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                        <CardsHeader icono={<PublicIcon className={classes.iconos}/>} titulo="Ciudad" texto={this.state.ciudad}
                                     color="#060b26"
                                     font="white"/>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                        <CardsHeader icono={<AssessmentIcon className={classes.iconos}/>} titulo="Cantidad de Anuncios"
                                     texto={this.state.anuncios}
                                     color="#060b26"
                                     font="white"/>
                    </Grid>

                    <Grid item xs={12} className={classes.container}>
                        <EditProfile/>
                    </Grid>

                    <Grid item xs={12} className={classes.container}>
                        <button className="buttonDash">Registrarse como vendedor</button>
                    </Grid>

                    <Grid item xs={0} sm={0} md={1} lg={1} xl={1}></Grid>

                    <Grid item xs={12} className={classes.containerTabla}>
                        <TableMaterial/>
                    </Grid>


                </Grid>
            </div>
        );


    }
}
export default withStyles(styles)(Dashboard);