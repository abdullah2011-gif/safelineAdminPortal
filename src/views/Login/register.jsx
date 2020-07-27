import React from "react";
import loginImg from "../../assets/img/logo.png";

export class Register extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
          <img src={loginImg} style={{width:120,height:100,marginTop:10}}/>
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="Enter Username" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="Enter Email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="text" name="password" placeholder="Enter Password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button onClick={()=>  window.location.href="/admin/dashboard"}  type="button" className="btn">
            Register
          </button>
        </div>
      </div>
    );
  }
}
