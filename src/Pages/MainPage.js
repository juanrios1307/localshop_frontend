import React,{Component} from 'react';
import '../assets/css/MainPage.css';
import BannerSection from "../components/BannerSection";
import Footer from "../components/Footer";
import CardCarousel from "../components/CardCarousel";
import NavBar from "../components/NavBar.js";
import DashNav from "../components/DashNav";

class MainPage extends Component {

    render(){
        if(localStorage.getItem('token')){
            return (
                <div>
                    <header>
                        <DashNav/>
                    </header>
                    <div>
                        <BannerSection/>
                    </div>
                    <div  className="CardCarousel">
                        <CardCarousel/>
                    </div>
                    <div>
                        <Footer/>
                    </div>
                </div>
            );
        }else{
            return (
                <div>
                    <header>
                        <NavBar/>
                    </header>
                    <div>
                        <BannerSection/>
                    </div>
                    <div className="CardCarousel">
                        <CardCarousel/>
                    </div>
                    <div>
                        <Footer/>
                    </div>
                </div>
            );
        }

    }
}
export default MainPage;