import React from "react";
import loginImg from "../../assets/img/logo.png";
import { Button } from "react-bootstrap";
import Axios from "axios";
import config from "../../config";
export class Login extends React.Component {
  state = { username: "", password: "" };
  onLoginPress = () => {
    Axios.post(`${config.url}v1/auth/adminlogin`, { ...this.state })
      .then((res) => {
        var { data, status } = res;
        if (status == 200) {
          localStorage.setItem("user", JSON.stringify(data.user));
          window.location.href = "/admin/dashboard";
        } else {
          localStorage.removeItem("user");
          alert("you are not authorized as admin!");
        }
      })
      .catch((e) => {
        alert("Network Error");
      });
  };
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img
              src={loginImg}
              style={{ width: 130, height: 110, marginTop: 20 }}
            />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                onChange={(evt) =>
                  this.setState({ username: evt.target.value })
                }
                type="text"
                name="username"
                placeholder="Enter Username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={(evt) =>
                  this.setState({ password: evt.target.value })
                }
                type="password"
                name="password"
                placeholder="Enter Password"
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <a></a>
          <Button onClick={this.onLoginPress} className="btn">
            Login
          </Button>
        </div>
      </div>
    );
  }
}
