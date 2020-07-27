import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "../../components/Card/Card";
import { FormInputs } from "../../components/FormInputs/FormInputs";
import Button from "../../components/CustomButton/CustomButton";
import SweetAlert from "react-bootstrap-sweetalert";
import Apimanager from "../../NodeFunctions/Functions";

class UserProfile extends Component {
  state = {
    name: "",
    cus_id: "",
    F_name: "",
    L_name: "",
    Contact_no_1: "",
    Contact_no_2: "",
    city: "",
    state: "",
    social_security_number: "",
    insurance_number: "",
    E_mail: "",
    alert: null,
  };
  updateform = (val) => {
    var warning = "";
    if (this.state.E_mail == "") {
      warning = "Please Enter Email";
    } else if (this.state.F_name == "") {
      warning = "Please Enter First Name";
    } else if (this.state.L_name == "") {
      warning = "Please Enter Last Name";
    } else if (this.state.Contact_no_1 == "") {
      warning = "Please Enter Contact";
    } else if (this.state.city == "") {
      warning = "Please Enter city";
    } else if (this.state.state == "") {
      warning = "Please Enter State";
    } else if (
      !(
        this.state.social_security_number.match("^[0-9]*$") &&
        this.state.social_security_number != ""
      )
    ) {
      warning = "Please Enter Valid Social Securiety Number";
    } else if (
      !(
        this.state.insurance_number.match("^[0-9]*$") &&
        this.state.insurance_number != ""
      )
    ) {
      warning = "Please Enter Valid Insurance Number";
    } else {
      warning = "";
    }
    if (warning) {
      this.setState({
        alert: (
          <SweetAlert
            warning
            style={{ display: "block", marginTop: "100px" }}
            title={warning}
            onConfirm={() => this.setState({ alert: null })}
            onCancel={() => this.setState({ alert: null })}
            confirmBtnBsStyle="warning"
          ></SweetAlert>
        ),
      });
      return;
    }
    new Apimanager()
      .PutrouteByid(`customers/customer_info/${this.state.cus_id}`, this.state)
      .then((res) => {
        // console.log(res)
        if (res.status == 200) {
          this.setState({
            alert: (
              <SweetAlert
                success
                style={{ display: "block", marginTop: "100px" }}
                title="Data Updated!"
                onConfirm={() => this.setState({ alert: null })}
                onCancel={() => this.setState({ alert: null })}
                confirmBtnBsStyle="info"
              ></SweetAlert>
            ),
          });
        }
      })
      .catch((e) => console.log(e));
  };
  submitform = () => {
    var warning = "";
    if (this.state.E_mail == "") {
      warning = "Please Enter Email";
    } else if (this.state.F_name == "") {
      warning = "Please Enter First Name";
    } else if (this.state.L_name == "") {
      warning = "Please Enter Last Name";
    } else if (this.state.Contact_no_1 == "") {
      warning = "Please Enter Contact";
    } else if (this.state.city == "") {
      warning = "Please Enter city";
    } else if (this.state.state == "") {
      warning = "Please Enter State";
    } else if (
      !(
        this.state.social_security_number.match("^[0-9]*$") &&
        this.state.social_security_number != ""
      )
    ) {
      warning = "Please Enter Valid Social Securiety Number";
    } else if (
      !(
        this.state.insurance_number.match("^[0-9]*$") &&
        this.state.insurance_number != ""
      )
    ) {
      warning = "Please Enter Valid Insurance Number";
    } else {
      warning = "";
    }
    if (warning) {
      this.setState({
        alert: (
          <SweetAlert
            warning
            style={{ display: "block", marginTop: "100px" }}
            title={warning}
            onConfirm={() => this.setState({ alert: null })}
            onCancel={() => this.setState({ alert: null })}
            confirmBtnBsStyle="warning"
          ></SweetAlert>
        ),
      });
      return;
    }
    new Apimanager()
      .postroute("customers/customer_info", this.state)
      .then((res) => {
        if (res.status == 200) {
          this.setState({
            alert: (
              <SweetAlert
                success
                style={{ display: "block", marginTop: "100px" }}
                title="Membership Created!"
                onConfirm={() => this.setState({ alert: null })}
                onCancel={() => this.setState({ alert: null })}
                confirmBtnBsStyle="info"
              ></SweetAlert>
            ),
          });
        }
      })
      .catch((e) => console.log(e));
  };
  componentDidMount = () => {
    //  console.log(JSON.stringify(this.props.location.data)+"thats data i need")
    if (this.props.location.data) {
      const { data } = this.props.location;
      // var dataa = data.split(",");
      //  console.log(data.mem_name,"here i am");
      this.setState({
        ...data,
      });
    }
  };
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Add Closeit"
                content={
                  <form>
                    {/* <Row >
                      <Col  md={5}></Col>
                      <Col xs={6} md={4}>
                        <Image
                          src={`${config.url}public/images/public\\images\\categories\\2\\shoes-2.jpeg`}
                          roundedCircle
                          style={{width:200,height:200,
                          borderWidth: 2,
                          borderRadius: 200,}}
                        />
                      </Col>
                    </Row> */}
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Member Id",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Member Id",
                          defaultValue: this.state.cus_id,
                          disabled: true,
                          onChange: (evt) => {
                            this.setState({ cus_id: evt.target.value });
                          },
                        },
                        {
                          label: "Email",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Email",
                          defaultValue: this.state.E_mail,
                          disabled: true,
                          onChange: (evt) => {
                            this.setState({ E_mail: evt.target.value });
                          },
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "First Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "First Name",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.F_name,
                          onChange: (evt) => {
                            this.setState({ F_name: evt.target.value });
                          },
                        },
                        {
                          label: "Last Name",
                          type: "text",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.L_name,
                          bsClass: "form-control",
                          placeholder: "Member Name",
                          onChange: (evt) => {
                            this.setState({ L_name: evt.target.value });
                          },
                        },
                        {
                          label: "Email",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Email",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.E_mail,
                          disabled:
                            this.props.match.params.data == ":data"
                              ? false
                              : true,
                          onChange: (evt) => {
                            this.setState({ E_mail: evt.target.value });
                          },
                        },
                      ]}
                    />
                    {/* {console.log(this.state)} */}
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Member Contact (1)",
                          type: "text",
                          placeholder: "Member Contact (2)",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.Contact_no_1,
                          onChange: (evt) => {
                            this.setState({ Contact_no_1: evt.target.value });
                          },
                        },
                        {
                          label: "Member Contact (2)",
                          type: "text",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.Contact_no_2,
                          bsClass: "form-control",
                          placeholder: "Member Contact (2)",
                          onChange: (evt) => {
                            this.setState({ Contact_no_2: evt.target.value });
                          },
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "City",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "City",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.city,
                          onChange: (evt) => {
                            this.setState({ city: evt.target.value });
                          },
                        },
                        {
                          label: "State",
                          type: "text",
                          defaultValue: this.state.state,
                          bsClass: "form-control",
                          placeholder: "State",
                          onChange: (evt) => {
                            this.setState({ state: evt.target.value });
                          },
                        },
                      ]}
                    />
                    {/* {console.log(this.state)} */}
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Social Security Number",
                          type: "text",
                          placeholder: "Social Security Number",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.social_security_number,
                          onChange: (evt) => {
                            this.setState({
                              social_security_number: evt.target.value,
                            });
                          },
                        },
                        {
                          label: "Insurance Number",
                          type: "text",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.insurance_number,
                          bsClass: "form-control",
                          placeholder: "Insurance Number",
                          onChange: (evt) => {
                            this.setState({
                              insurance_number: evt.target.value,
                            });
                          },
                        },
                      ]}
                    />
                    {/* {console.log(this.state)} */}
                    <Row>
                      <Col md={12}>
                        <div>
                          {!this.state.cus_id ? (
                            <Button
                              onClick={() => this.submitform()}
                              bsStyle="warning"
                              style={{
                                marginLeft: "45%",
                                height: 40,
                                width: 120,
                              }}
                            >
                              Save
                            </Button>
                          ) : (
                            <Button
                              onClick={() => this.updateform()}
                              bsStyle="warning"
                              style={{
                                marginLeft: "45%",
                                height: 40,
                                width: 120,
                              }}
                            >
                              Update
                            </Button>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
        {this.state.alert}
      </div>
    );
  }
}

export default UserProfile;
