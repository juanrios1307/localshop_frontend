import React from 'react';
import {Line} from 'react-chartjs-2';
import '../assets/css/Graphics.css';

function Graphics(props) {
    const data={
        labels:["Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto"],
        datasets:[
            {
                label:"Publicaciones por Mes",
                fill: false,
                backgroundColor: '#ffb224',
                borderColor:'#ffb224',
                pointBorderColor:'#ffb224',
                pointBorderWidth:1,
                pointHoverRadius:5,
                pointHoverBackgroundColor:'#ffb224',
                pointHoverBorderColor:'#ffb224',
                pointRadius: 1,
                pointHitRadius: 10,
                data: [1, 2, 5, 10, 15, 20]
            }
        ]
    }
    return (
        <div className="containerGrafica">
            <Line data={data}/>
        </div>
    );
}

export default Graphics;