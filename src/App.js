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

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/sing-up" component={LoginRegisterPage} />
          <Route exact path="/forgotpwd" component={ForgotPasword}/>
          <Route exact path="/updatepwd" component={ChangePassword}/>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/createProduct" component={SubirProducto}/>
          <Route exact path="/products" component={ProductosBuscados} />
          <Route exact path="/product" component={ProductoEspecifico} />

          <Route exact path="/shoppingCar" component={SavingPub} />

          <Route exact path="/misproductos" component={MisProductos} />

          <Route exact path="/chats" component={MisChats} />
          <Route exact path="/chat" component={ChatEspecifico} />
      </Switch>

    </Router>
  );
}

export default App;
