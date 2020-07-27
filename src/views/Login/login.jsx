import React from "react";
import loginImg from "../../assets/img/logo.png";
import {Button } from 'react-bootstrap'
export class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} style={{width:130,height:110,marginTop:20}}/>
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="Enter Username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="Enter Password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <a></a>
          <Button onClick={()=>  window.location.href="/admin/dashboard"} className="btn">
            Login
          </Button>
        </div>
      </div>
    );
  }
}
