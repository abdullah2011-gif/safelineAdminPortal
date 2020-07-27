import React, { Component } from "react";
import { Grid, Row, Col, Image } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Apimanager from "../../NodeFunctions/Functions";
import SweetAlert from "react-bootstrap-sweetalert";
import config from "../../config";

class UserProfile extends Component {
  state = {
    emp_id: "",
    emp_name: "",
    emp_ssn: "",
    emp_email: "",
    emp_contact: "",
    picture_pathway: "",
    selectedFile: null,
    imgSrc: "",
  };
  getInitialState = () => {
    return { file: [] };
  };

  _onChange = (event) => {
    var f = event.target.files[0];
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    var url = file && reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        imgSrc: file ? [reader.result] : "",
        selectedFile: file,
      });
    }.bind(this);
  };
  updateform = (val) => {
    var warning = "";
    if (this.state.emp_name == "") {
      warning = "Please Enter Name";
    } else if (this.state.emp_email == "") {
      warning = "Please Enter Email";
    } else if (
      !(this.state.emp_ssn.match("^[0-9]*$") && this.state.emp_ssn != "")
    ) {
      warning = "Please Enter Valid Social Securiety Number";
    } else if (
      !(
        this.state.emp_contact.match("^[0-9]*$") && this.state.emp_contact != ""
      )
    ) {
      warning = "Please Enter Valid Contact";
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
    var Formdata = new FormData();
    Formdata.append("image", this.state.selectedFile);
    if (this.state.selectedFile) {
      new Apimanager()
        .postrouteFormdata(
          `Admin/employees/upload/employees/${this.state.emp_name}/${this.state.emp_id}`,
          Formdata
        )
        .then((res) => {
          if (res.status === 200) {
            new Apimanager()
              .PutrouteByid(`Admin/employees/${this.state.emp_id}`, this.state)
              .then((res) => {
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
          }
        })
        .catch((e) => console.log(e));
    } else {
      new Apimanager()
        .PutrouteByid(`Admin/employees/${this.state.emp_id}`, {
          emp_name: this.state.emp_name,
          emp_ssn: this.state.emp_ssn,
          emp_email: this.state.emp_email,
          emp_contact: this.state.emp_contact,
        })
        .then((res) => {
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
    }
  };
  submitform = () => {
    var warning = "";
    if (this.state.emp_name == "") {
      warning = "Please Enter Name";
    } else if (this.state.emp_email == "") {
      warning = "Please Enter Email";
    } else if (
      !(this.state.emp_ssn.match("^[0-9]*$") && this.state.emp_ssn != "")
    ) {
      warning = "Please Enter Valid Social Securiety Number";
    } else if (
      !(
        this.state.emp_contact.match("^[0-9]*$") && this.state.emp_contact != ""
      )
    ) {
      warning = "Please Enter Valid Contact";
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
    if (!this.state.selectedFile || this.state.selectedFile == null) {
      this.setState({
        alert: (
          <SweetAlert
            warning
            style={{ display: "block", marginTop: "100px" }}
            title="Please Select An Image !"
            onConfirm={() => this.setState({ alert: null })}
            onCancel={() => this.setState({ alert: null })}
            confirmBtnBsStyle="warning"
          ></SweetAlert>
        ),
      });
      return;
    }
    var Formdata = new FormData();
    Formdata.append("image", this.state.selectedFile);

    new Apimanager()
      .postroute("Admin/employees", {
        emp_name: this.state.emp_name,
        emp_ssn: this.state.emp_ssn,
        emp_email: this.state.emp_email,
        emp_contact: this.state.emp_contact,
      })

      .then((res) => {
        if (res.status == 200) {
          this.setState({
            ...res.data,
          });
        } else {
          this.setState({
            alert: (
              <SweetAlert
                danger
                style={{ display: "block", marginTop: "100px" }}
                title="Can't Create Category"
                onConfirm={() => this.setState({ alert: null })}
                onCancel={() => this.setState({ alert: null })}
                confirmBtnBsStyle="danger"
              ></SweetAlert>
            ),
          });
          return;
        }
      })
      .then(() => {
        new Apimanager()
          .postrouteFormdata(
            `Admin/employees/upload/employees/${this.state.emp_name}/${this.state.emp_id}`,
            Formdata
          )
          .then((res) => {
            if (res.status == 200) {
              this.setState({
                alert: (
                  <SweetAlert
                    success
                    style={{ display: "block", marginTop: "100px" }}
                    title="Account Created!"
                    onConfirm={() => this.setState({ alert: null })}
                    onCancel={() => this.setState({ alert: null })}
                    confirmBtnBsStyle="info"
                  ></SweetAlert>
                ),
              });
            } else {
              this.setState({
                alert: (
                  <SweetAlert
                    warning
                    style={{ display: "block", marginTop: "100px" }}
                    title="Account Created But Error In Image Uploading !"
                    onConfirm={() => this.setState({ alert: null })}
                    onCancel={() => this.setState({ alert: null })}
                    confirmBtnBsStyle="warning"
                  ></SweetAlert>
                ),
              });
            }
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };
  componentDidMount = () => {
    if (this.props.location.data) {
      const { data } = this.props.location;
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
                title="Add Account"
                content={
                  <form>
                    <Row>
                      <Col md={5}></Col>
                      <Col xs={6} md={4}>
                        <Image
                          src={
                            this.state.imgSrc
                              ? this.state.imgSrc
                              : this.state.picture_pathway
                              ? `${config.url}public/images/${this.state.picture_pathway}`
                              : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQJRm0mJ7HgVnAA17Be6O4-xfUa6LAtkR9k3lAI0tDgLwHQ0Ysi&usqp=CAU"
                          }
                          roundedCircle
                          style={{
                            width: 200,
                            height: 200,
                            borderWidth: 2,
                            borderRadius: 200,
                          }}
                        />
                      </Col>
                    </Row>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Employee Id",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Employee Id",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.emp_id,
                          disabled:
                            this.props.match.params.data == ":data"
                              ? false
                              : true,
                          onChange: (evt) => {
                            this.setState({ emp_id: evt.target.value });
                          },
                        },
                        {
                          label: "Employee Name",
                          type: "text",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.emp_name,
                          bsClass: "form-control",
                          placeholder: "Employee Name",
                          onChange: (evt) => {
                            this.setState({ emp_name: evt.target.value });
                          },
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "emp_email",
                          type: "text",
                          placeholder: "emp_email",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.emp_email,
                          onChange: (evt) => {
                            this.setState({ emp_email: evt.target.value });
                          },
                        },
                        {
                          label: "Social Security Number",
                          type: "text",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.emp_ssn,
                          bsClass: "form-control",
                          placeholder: "Social Security Number",
                          onChange: (evt) => {
                            this.setState({ emp_ssn: evt.target.value });
                          },
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6"]}
                      properties={[
                        {
                          label: "emp_contact",
                          type: "text",
                          placeholder: "emp_contact",
                          defaultValue:
                            this.props.match.params.data == ":data"
                              ? ""
                              : this.state.emp_contact,
                          onChange: (evt) => {
                            this.setState({ emp_contact: evt.target.value });
                          },
                        },
                      ]}
                    />

                    <Row>
                      <input
                        ref="file"
                        type="file"
                        name="user[image]"
                        multiple="true"
                        onChange={this._onChange}
                      />
                      <Col md={12}>
                        {!this.state.emp_id ? (
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
                        {this.state.alert}
                      </Col>
                    </Row>
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
