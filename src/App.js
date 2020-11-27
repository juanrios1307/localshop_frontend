import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import LoginRegisterPage from "./Pages/LoginRegisterPage";
import ForgotPasword from "./Pages/ForgotPasword";
import ChangePassword from "./Pages/ChangePassword";
import Dashboard from "./Pages/Dashboard";
import ProductosBuscados from "./Pages/ProductosBuscados";
import ProductoEspecifico from "./Pages/ProductoEspecifico";
import SavingPub from "./Pages/SavingPub";
import MisProductos from "./Pages/MisProductos";
import MisChats from "./Pages/MisChats";
import ChatEspecifico from "./Pages/ChatEspecifico";
import SubirProducto from "./Pages/SubirProducto";
import ActualizarProducto from "./Pages/ActualizarProducto";
import RegisterSeller from "./Pages/RegisterSeller";
import MisCompras from "./Pages/MisCompras";
import MisVentas from "./Pages/MisVentas";
import InfoCompras from "./Pages/InfoCompras";
import PaymentMethods from "./Pages/PaymentMethods";
import FacturaCompra from "./Pages/FacturaCompra";
import FacturaVenta from "./Pages/FacturaVenta";
import Card from "./Pages/Card";
import Contraentrega from "./Pages/Contraentrega";
import Giro from "./Pages/Giro";
import EstadoCompra from "./Pages/EstadoCompra";

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/sing-up" component={LoginRegisterPage} />
          <Route exact path="/forgotpwd" component={ForgotPasword}/>
          <Route exact path="/updatepwd" component={ChangePassword}/>
          <Route exact path="/dashboard" component={Dashboard} />

          <Route exact path="/signupseller" component={RegisterSeller}/>

          <Route exact path="/products" component={ProductosBuscados} />
          <Route exact path="/product" component={ProductoEspecifico} />

          <Route exact path="/shoppingCar" component={SavingPub} />
          <Route exact path="/infopurchases" component={InfoCompras}/>
          <Route exact path="/paymethod" component={PaymentMethods}/>

          <Route exact path="/card" component={Card}/>
          <Route exact path="/contraentrega" component={Contraentrega}/>
          <Route exact path="/giro" component={Giro}/>

          <Route exact path="/paystate" component={EstadoCompra}/>

          <Route exact path="/miscompras" component={MisCompras} />
          <Route exact path="/misventas" component={MisVentas} />
          <Route exact path="/facturac" component={FacturaCompra} />
          <Route exact path="/facturav" component={FacturaVenta} />

          <Route exact path="/misproductos" component={MisProductos} />
          <Route exact path="/createProduct" component={SubirProducto}/>
          <Route exact path="/editAnunce" component={ActualizarProducto}/>

          <Route exact path="/chats" component={MisChats} />
          <Route exact path="/chat" component={ChatEspecifico} />
      </Switch>

    </Router>
  );
}

export default App;
