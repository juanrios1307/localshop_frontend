import React,{Component} from 'react';
import '../assets/css/BannerSection.css';
import slide1 from '../assets/images/Slide1.png';
import slide2 from '../assets/images/Slide2.png'
import slide3 from '../assets/images/Slide3.png';
import slide4 from '../assets/images/Slide4.png';
import slide5 from '../assets/images/Slide5.png';

class BannerSection extends Component {

    render () {
        return (
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={slide1} alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={slide2} alt="Second slide"/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={slide3} alt="Second slide"/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={slide4} alt="Second slide"/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={slide5} alt="Second slide"/>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
}


export default BannerSection;
