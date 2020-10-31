import React,{Component} from 'react';
import '../assets/css/MainPage.css';
import BannerSection from "../components/BannerSection";
import Footer from "../components/Footer";
import CardCarousel from "../components/CardCarousel";
import NavBar from "../components/NavBar.js";

class MainPage extends Component {

    render(){
        return (
            <div>
                <header>
                    <NavBar/>
                </header>
                <div>
                    <BannerSection/>
                </div>
                <div>
                    <CardCarousel/>
                </div>
                <div>
                    <Footer/>
                </div>
            </div>
        );
    }
}
export default MainPage;