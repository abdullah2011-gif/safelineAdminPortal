import React, { useEffect, useState, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Axios from "axios";
import config from "./config";

import AdminLayout from "layouts/Admin.jsx";
import Login from "./views/Login/Loginandregister";

const AuthRoute = ({ component: Component, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [mainUser, setMainUser] = useState(null);
  const getUser = async () => {
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
    await Axios.post(`${config.url}v1/auth/admin`, null, {
      headers: { Authorization: user && "Bearer " + user.token },
    })
      .then((res) => {
        if (res.status == 200) {
          setMainUser(res.data);
        }
      })
      .catch((e) => {});
    setLoading(false);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        mainUser ? (
          <Component {...props} />
        ) : loading ? (
          <div className="loading" />
        ) : (
          <Redirect
            to={{
              pathname: "/auth/login",
            }}
          />
        )
      }
    />
  );
};

class App extends React.Component {
  render() {
    return (
      <Suspense>
        <Router>
          <Switch>
            <AuthRoute path="/admin" component={AdminLayout} />
            <Route path="/auth" component={Login} />
            <Redirect from="/" to="/auth/login" />
          </Switch>
        </Router>
      </Suspense>
    );
  }
}

export default App;
