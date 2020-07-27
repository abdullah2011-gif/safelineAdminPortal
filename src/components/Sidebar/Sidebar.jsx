/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap"

import AdminNavbarLinks from "../Navbars/AdminNavbarLinks.jsx";

import logo from "assets/img/reactlogo.png";
import { Dropdown } from "reactstrap";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height:50,
      dropdown:[],
      width: window.innerWidth
    };
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.setState({dropdown:this.props.routes})
  }
  render() {
    const sidebarBackground = {
      backgroundImage: "url(" + this.props.image + ")"
    };
    return (
      
      <div
        id="sidebar"
        className="sidebar"
        data-color={this.props.color}
        // data-image={this.props.image}
      >
        {console.log(this.props.color)}
          {this.props.hasImage ? (
            <div className="sidebar-background" style={sidebarBackground} />
          ) : (
            null
          )}
        <div className="logo" style={{height:'13%'}}>
          {/* <a
            href="https://www.creative-tim.com?ref=lbd-sidebar"
            className="simple-text logo-mini"
          > */}
            <div className="logo-img">
              <img src={logo} alt="logo_image" style={{width:"3000%",marginTop:9,height:'180%',tintColor:'#FFFFFF',marginLeft:'1500%'}} />
            </div>
          {/* </a> */}
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {this.state.width <= 991 ? <AdminNavbarLinks /> : null}
            {this.state.dropdown.map((prop, key) => {
              if (prop.children)
              return(
                <li
                className={
                  prop.upgrade
                    ? "active active-pro"
                    : this.activeRoute(prop.layout + prop.path)
                }
                key={key}
              >
                <Nav>
                <NavDropdown
                open={prop.dropdown}
                onToggle={()=>this.setState(prevState=>{
                  return{
                    dropdown:prevState.dropdown.map(item=>{
                      if(item.name==prop.name){
                        return{
                          ...item,
                          dropdown:!prop.dropdown
                        }
                      }else{
                          return{
                            ...item
                          }
                      }
                    })
                  }
                })}
                renderMenuOnMount
                // rootCloseEvent='none'
                // onClick={()=>{this.state.height==50? this.setState({height:190}):this.setState({height:50})}}
                  eventKey={2}
                  title={prop.name}
                  id="basic-nav-dropdown-right"
                >
                  {prop.children.map((prop,key)=>{
                  return  (
                    <div style={{backgroundColor: '#41371e',width:265}}>
                      <MenuItem onClick={()=>this.setState(prevState=>{
                  return{
                    dropdown:prevState.dropdown.map(item=>{
                        return{
                          ...item,
                          dropdown:false
                        }
                    })
                  }
                })}  eventKey={key}>
                        <NavLink onClick={()=>this.setState(prevState=>{
                  return{
                    dropdown:prevState.dropdown.map(item=>{
                      if(item.name==prop.name){
                        return{
                          ...item,
                          dropdown:!prop.dropdown
                        }
                      }else{
                          return{
                            ...item
                          }
                      }
                    })
                  }
                })}
                          to={prop.layout + prop.path}
                          className="nav-link"
                          activeClassName="active"
                        >
                          <div style={{backgroundColor: '#41371e'}}>
                          <i style={{color:'#FFFFFF',marginLeft:25}} className={prop.icon} />
                          <p style={{color:'#FFFFFF',marginLeft:10}} >{prop.name}</p>
                          </div>
                        </NavLink>
                    </MenuItem>
                    </div>)
                  })}
                </NavDropdown>
              </Nav>
              </li>
              )
              if (!prop.redirect)
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : this.activeRoute(prop.layout + prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              return null;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
