import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import LoginRegisterPage from "./Pages/LoginRegisterPage";
import ForgotPasword from "./Pages/ForgotPasword";
import ChangePassword from "./Pages/ChangePassword";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/sing-up" component={LoginRegisterPage} />
          <Route exact path="/forgotpwd" component={ForgotPasword}/>
          <Route exact path="/updatepwd" component={ChangePassword}/>
      </Switch>

    </Router>
  );
}

export default App;