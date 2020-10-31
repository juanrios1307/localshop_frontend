import '../assets/css/Footer.css'
import React,{Component} from "react";

class Footer extends Component{

    render() {
        return(

            <section className="page-footer font-small unique-color-dark">

                <div className="container text-center text-md-left mt-5">

                    <div className="row mt-3">

                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                            <h6 className="text-uppercase font-weight-bold">LocalShop</h6>
                            <hr/>
                            <p>Contrata a verdaderos profesionales calificados a un precio realmente justo.</p>

                        </div>


                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">


                            <h6 className="text-uppercase font-weight-bold">Síguenos</h6>
                            <hr/>
                            <div>
                                <a className="fb-ic">
                                    <i className="fab fa-facebook-f white-text mr-4"> </i>
                                </a>


                                <a className="tw-ic">
                                    <i className="fab fa-twitter white-text mr-4"> </i>
                                </a>
                                <a className="ins-ic">
                                    <i className="fab fa-instagram white-text"> </i>
                                </a>
                            </div>

                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">


                            <h6 className="text-uppercase font-weight-bold">Contacto</h6>
                            <hr/>
                            <p>
                                <i className="fas fa-home mr-3"></i> Envigado, Antioquia, Colombia</p>
                            <p>
                                <i className="fas fa-envelope mr-3"></i> localshop@gmail.com</p>
                            <p>
                                <i className="fas fa-phone mr-3"></i> + 57 320 6795630</p>

                        </div>


                    </div>


                </div>

                <div className="footer-copyright text-center py-3">© 2020 Copyright:
                    <a href="/"> LocalShop.com</a>
                </div>


            </section>

        )
    }

}

export default Footer;