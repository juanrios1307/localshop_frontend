import '../assets/css/Footer.css'
import React,{Component} from "react";

class Footer extends Component{

    render() {
        return(

            <section className="page-footer font-small unique-color-dark">

                <div>
                    <div className="container">


                        <div className="row py-4 d-flex align-items-center">


                            <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                                <h6 className="mb-0">Conectate a nuestras redes sociales!</h6>
                            </div>

                            <div className="col-md-6 col-lg-7 text-center text-md-right">


                                <a className="fb-ic">
                                    <i className="fab fa-facebook-f white-text mr-4"> </i>
                                </a>

                                <a className="tw-ic">
                                    <i className="fab fa-twitter white-text mr-4"> </i>
                                </a>

                                <a className="gplus-ic">
                                    <i className="fab fa-google-plus-g white-text mr-4"> </i>
                                </a>

                                <a className="li-ic">
                                    <i className="fab fa-linkedin-in white-text mr-4"> </i>
                                </a>

                                <a className="ins-ic">
                                    <i className="fab fa-instagram white-text"> </i>
                                </a>

                            </div>


                        </div>


                    </div>
                </div>


                <div className="container text-center text-md-left mt-5">

                    <div className="row mt-3">

                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                            <h6 className="text-uppercase font-weight-bold">QuickServices</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"/>
                            <p>Contrata a verdaderos profesionales calificados a un precio realmente justo.</p>

                        </div>


                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">


                            <h6 className="text-uppercase font-weight-bold">Links útiles</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"/>
                            <p>
                                <a href="/sing-up">Tu Cuenta</a>
                            </p>
                            <p>
                                <a href="/sing-up">Afiliate</a>
                            </p>
                            <p>
                                <a href="#">Sobre Nosotros</a>
                            </p>
                            <p>
                                <a href="/support">Ayuda</a>
                            </p>

                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">


                            <h6 className="text-uppercase font-weight-bold">Contacto</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"/>
                            <p>
                                <i className="fas fa-home mr-3"></i> Envigado, Antioquia, Colombia</p>
                            <p>
                                <i className="fas fa-envelope mr-3"></i> quickservices@gmail.com</p>
                            <p>
                                <i className="fas fa-phone mr-3"></i> + 57 315 8125800</p>

                        </div>


                    </div>


                </div>

                <div className="footer-copyright text-center py-3">© 2020 Copyright:
                    <a href="/"> QuickServices.com</a>
                </div>


            </section>

        )
    }

}

export default Footer;