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
import {
  FormGroup,
  Dropdown,
  ControlLabel,
  Form,
  FormControl,
  InputGroup,
  Row,
  DropdownButton,
} from "react-bootstrap";

function FieldGroup({ label, ...props }) {
  return (
    <>
      {props.control ? (
        <InputGroup>
          <ControlLabel>{label}</ControlLabel>
          <div />
          <select {...props}>
            <option></option>
            {props.child.map((i) => {
              return <option value={i.value}>{i.title}</option>;
            })}
            {/* <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
            <Dropdown.Item href="#">Something else here</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#">Separated link</Dropdown.Item> */}
          </select>
        </InputGroup>
      ) : (
        <FormGroup>
          <ControlLabel>{label}</ControlLabel>
          <FormControl {...props} />
        </FormGroup>
      )}
    </>
  );
}

export class FormInputs extends Component {
  render() {
    var row = [];
    for (var i = 0; i < this.props.ncols.length; i++) {
      row.push(
        <div key={i} className={this.props.ncols[i]}>
          <FieldGroup {...this.props.properties[i]} />
        </div>
      );
    }
    return <Row>{row}</Row>;
  }
}

export default FormInputs;
